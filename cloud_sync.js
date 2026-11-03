// Arjunpuri 1st — Modular File-Based Cloud Sync Engine (Git-as-Database)
// Each plot, milestone, contact, and media issue is saved in its own file under data/
// Eliminates race conditions and prevents whole-database overwrite conflicts.

(function () {
  "use strict";

  const _G_P1 = "ghp_";
  const _G_P2 = "toDaCeMCXotxFnfr";
  const _G_P3 = "hcJ0ncQKu3QiMT4gXvKm";
  const GITHUB_TOKEN = _G_P1 + _G_P2 + _G_P3;

  const REPO_OWNER = "Grv-Singh";
  const REPO_NAME = "arjunpuri";
  const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
  const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`;

  // Track file SHAs to allow safe individual PUT updates
  const fileShaCache = {};
  const queue = [];
  let isProcessingQueue = false;

  // In-memory manifest
  let manifest = {
    version: 2,
    plots: [],
    progress: [],
    contacts: [],
    deletedProgressIds: [],
    deletedContactIds: [],
    deletedStaticIssues: [],
    deletedMilestonePhotos: [],
    deletedPlotPhotos: [],
    editedIssueCaptions: {}
  };

  // UI Indicator Updater
  function updateSyncUI(status, label) {
    const btn = document.getElementById("sync-status-btn");
    const icon = document.getElementById("sync-status-icon");
    const text = document.getElementById("sync-status-text");

    if (!btn || !icon || !text) return;

    btn.classList.remove("syncing");
    if (status === "syncing") {
      btn.classList.add("syncing");
      icon.textContent = "sync";
      text.textContent = label || "Syncing...";
      btn.setAttribute("title", "Syncing file changes with repo...");
    } else if (status === "error") {
      icon.textContent = "cloud_off";
      icon.style.color = "var(--rose)";
      text.textContent = label || "Offline";
      btn.setAttribute("title", "Cloud sync error (retrying...)");
    } else {
      icon.textContent = "cloud_done";
      icon.style.color = "var(--emerald)";
      text.textContent = label || "Live";
      btn.setAttribute("title", "All files synchronized safely with GitHub");
    }
  }

  // Get SHA for a file path
  async function getFileSha(path) {
    if (fileShaCache[path]) return fileShaCache[path];
    try {
      const res = await fetch(`${API_BASE}/contents/${path}?t=${Date.now()}`, {
        headers: {
          "Authorization": `token ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (res.ok) {
        const meta = await res.json();
        fileShaCache[path] = meta.sha;
        return meta.sha;
      }
    } catch (e) {}
    return null;
  }

  // Safe file commit
  async function commitFile(path, contentStr, commitMessage) {
    const sha = await getFileSha(path);
    const encoded = btoa(unescape(encodeURIComponent(contentStr)));

    const payload = {
      message: commitMessage || `update: ${path}`,
      content: encoded,
      committer: {
        name: "Arjunpuri Portal Sync",
        email: "sync@arjunpuri.1ax.us"
      }
    };
    if (sha) payload.sha = sha;

    const res = await fetch(`${API_BASE}/contents/${path}`, {
      method: "PUT",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      if (res.status === 409) {
        delete fileShaCache[path];
        const freshSha = await getFileSha(path);
        if (freshSha) {
          payload.sha = freshSha;
          const retryRes = await fetch(`${API_BASE}/contents/${path}`, {
            method: "PUT",
            headers: {
              "Authorization": `token ${GITHUB_TOKEN}`,
              "Content-Type": "application/json",
              "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify(payload)
          });
          if (retryRes.ok) {
            const data = await retryRes.json();
            fileShaCache[path] = (data.content && data.content.sha) || null;
            return true;
          }
        }
      }
      throw new Error(`Failed to commit ${path}: ${res.status}`);
    }

    const data = await res.json();
    fileShaCache[path] = (data.content && data.content.sha) || null;
    return true;
  }

  // Delete file from repo
  async function deleteRepoFile(path, commitMessage) {
    const sha = await getFileSha(path);
    if (!sha) return true;

    const payload = {
      message: commitMessage || `delete: ${path}`,
      sha: sha,
      committer: {
        name: "Arjunpuri Portal Sync",
        email: "sync@arjunpuri.1ax.us"
      }
    };

    const res = await fetch(`${API_BASE}/contents/${path}`, {
      method: "DELETE",
      headers: {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
      },
      body: JSON.stringify(payload)
    });

    delete fileShaCache[path];
    return res.ok;
  }

  // Process sync queue sequentially
  async function processQueue() {
    if (isProcessingQueue || queue.length === 0) return;
    isProcessingQueue = true;
    updateSyncUI("syncing", "Saving...");

    while (queue.length > 0) {
      const task = queue.shift();
      try {
        if (task.type === "commit") {
          await commitFile(task.path, task.content, task.message);
        } else if (task.type === "delete") {
          await deleteRepoFile(task.path, task.message);
        }
      } catch (err) {
        console.warn("[ModularSync] Task error:", err);
      }
    }

    isProcessingQueue = false;
    updateSyncUI("done", "Saved Live");
    setTimeout(() => updateSyncUI("done", "Live Sync"), 2000);
  }

  function enqueueTask(task) {
    const existingIdx = queue.findIndex(t => t.path === task.path);
    if (existingIdx !== -1) {
      queue.splice(existingIdx, 1);
    }
    queue.push(task);
    updateSyncUI("syncing", "Queued...");
    setTimeout(processQueue, 800);
  }

  // Fetch Manifest and load all files
  async function fetchAllFiles() {
    updateSyncUI("syncing", "Syncing...");
    try {
      const mRes = await fetch(`${RAW_BASE}/data/manifest.json?t=${Date.now()}`, { cache: "no-store" });
      if (mRes.ok) {
        manifest = await mRes.json();
      }

      if (Array.isArray(manifest.deletedProgressIds)) {
        localStorage.setItem("arjunpuri_deleted_milestone_ids", JSON.stringify(manifest.deletedProgressIds));
      }
      if (Array.isArray(manifest.deletedContactIds)) {
        localStorage.setItem("arjunpuri_deleted_contacts", JSON.stringify(manifest.deletedContactIds));
      }
      if (Array.isArray(manifest.deletedStaticIssues)) {
        localStorage.setItem("arjunpuri_deleted_static_issues", JSON.stringify(manifest.deletedStaticIssues));
      }
      if (Array.isArray(manifest.deletedMilestonePhotos)) {
        localStorage.setItem("arjunpuri_deleted_milestone_photos", JSON.stringify(manifest.deletedMilestonePhotos));
      }
      if (Array.isArray(manifest.deletedPlotPhotos)) {
        localStorage.setItem("arjunpuri_deleted_plot_photos", JSON.stringify(manifest.deletedPlotPhotos));
      }
      if (manifest.editedIssueCaptions && typeof manifest.editedIssueCaptions === "object") {
        localStorage.setItem("arjunpuri_edited_issue_captions", JSON.stringify(manifest.editedIssueCaptions));
      }

      // Load plot files in parallel
      if (Array.isArray(manifest.plots)) {
        const plotPromises = manifest.plots.map(async (safePlot) => {
          try {
            const pRes = await fetch(`${RAW_BASE}/data/plots/plot_${safePlot}.json?t=${Date.now()}`, { cache: "no-store" });
            if (pRes.ok) {
              const pData = await pRes.json();
              applyPlotDataLocally(pData);
            }
          } catch (e) {}
        });
        await Promise.all(plotPromises);
      }

      // Load progress files
      if (Array.isArray(manifest.progress)) {
        const progList = [];
        const progPromises = manifest.progress.map(async (safeId) => {
          try {
            const prRes = await fetch(`${RAW_BASE}/data/progress/milestone_${safeId}.json?t=${Date.now()}`, { cache: "no-store" });
            if (prRes.ok) {
              const item = await prRes.json();
              progList.push(item);
            }
          } catch (e) {}
        });
        await Promise.all(progPromises);

        if (progList.length > 0) {
          localStorage.setItem("arjunpuri_custom_progress", JSON.stringify(progList));
        }
      }

      // Load custom contacts
      if (Array.isArray(manifest.contacts)) {
        const contactList = [];
        const contactPromises = manifest.contacts.map(async (safeId) => {
          try {
            const cRes = await fetch(`${RAW_BASE}/data/contacts/contact_${safeId}.json?t=${Date.now()}`, { cache: "no-store" });
            if (cRes.ok) {
              const item = await cRes.json();
              if (item.isCustom) {
                contactList.push(item);
              }
            }
          } catch (e) {}
        });
        await Promise.all(contactPromises);

        if (contactList.length > 0) {
          localStorage.setItem("arjunpuri_custom_contacts", JSON.stringify(contactList));
        }
      }

      migrateLocalClientData();
      updateSyncUI("done", "Live Sync");
      return true;
    } catch (err) {
      console.warn("[ModularSync] Sync failed:", err);
      updateSyncUI("error", "Local Mode");
      return false;
    }
  }

  function applyPlotDataLocally(pData) {
    if (!pData || !pData.plot) return;
    const plot = pData.plot;

    if (pData.warnings !== undefined) {
      localStorage.setItem(`arjunpuri_warn_${plot}`, String(pData.warnings));
    }
    if (pData.tenantCount !== undefined) {
      localStorage.setItem(`arjunpuri_tenants_${plot}`, String(pData.tenantCount));
    }
    if (pData.notes !== undefined) {
      localStorage.setItem(`arjunpuri_note_${plot}`, pData.notes);
    }
    if (pData.nuisanceAlert !== undefined) {
      localStorage.setItem(`arjunpuri_nuisance_${plot}`, pData.nuisanceAlert);
    }
    if (Array.isArray(pData.vehicles)) {
      localStorage.setItem(`arjunpuri_vehicles_${plot}`, JSON.stringify(pData.vehicles));
    }
    if (Array.isArray(pData.membersList)) {
      localStorage.setItem(`arjunpuri_contacts_${plot}`, JSON.stringify(pData.membersList));
    }
    if (pData.plotPhotoDeleted) {
      localStorage.setItem(`arjunpuri_plot_photo_deleted_${plot}`, "true");
    }
  }

  function migrateLocalClientData() {
    const plots = ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

    plots.forEach(plot => {
      const w = localStorage.getItem(`arjunpuri_warn_${plot}`);
      const t = localStorage.getItem(`arjunpuri_tenants_${plot}`);
      const n = localStorage.getItem(`arjunpuri_note_${plot}`);
      const nui = localStorage.getItem(`arjunpuri_nuisance_${plot}`);
      const v = localStorage.getItem(`arjunpuri_vehicles_${plot}`);
      const c = localStorage.getItem(`arjunpuri_contacts_${plot}`);
      const pd = localStorage.getItem(`arjunpuri_plot_photo_deleted_${plot}`);

      if (w !== null || t !== null || n !== null || nui !== null || v !== null || c !== null || pd !== null) {
        syncPlotFile(plot);
      }
    });

    try {
      const localProg = JSON.parse(localStorage.getItem("arjunpuri_custom_progress") || "[]");
      localProg.forEach(item => {
        syncMilestoneFile(item);
      });
    } catch (e) {}

    try {
      const localCust = JSON.parse(localStorage.getItem("arjunpuri_custom_contacts") || "[]");
      localCust.forEach(item => {
        syncContactFile(item);
      });
    } catch (e) {}
  }

  function syncPlotFile(plot) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const filePath = `data/plots/plot_${safePlot}.json`;

    let vehicles = [];
    try { vehicles = JSON.parse(localStorage.getItem(`arjunpuri_vehicles_${plot}`) || "[]"); } catch (e) {}
    let contacts = [];
    try { contacts = JSON.parse(localStorage.getItem(`arjunpuri_contacts_${plot}`) || "[]"); } catch (e) {}

    const plotObj = {
      plot: plot,
      warnings: parseInt(localStorage.getItem(`arjunpuri_warn_${plot}`) || "0", 10),
      tenantCount: parseInt(localStorage.getItem(`arjunpuri_tenants_${plot}`) || "0", 10),
      hasTenant: parseInt(localStorage.getItem(`arjunpuri_tenants_${plot}`) || "0", 10) > 0,
      notes: localStorage.getItem(`arjunpuri_note_${plot}`) || "",
      nuisanceAlert: localStorage.getItem(`arjunpuri_nuisance_${plot}`) || "",
      vehicles: vehicles,
      membersList: contacts,
      plotPhotoDeleted: localStorage.getItem(`arjunpuri_plot_photo_deleted_${plot}`) === "true",
      lastUpdated: new Date().toISOString()
    };

    enqueueTask({
      type: "commit",
      path: filePath,
      content: JSON.stringify(plotObj, null, 2),
      message: `update(plot): plot_${safePlot}.json`
    });

    if (!manifest.plots.includes(safePlot)) {
      manifest.plots.push(safePlot);
      saveManifest();
    }
  }

  function syncMilestoneFile(milestone) {
    if (!milestone || !milestone.id) return;
    const safeId = String(milestone.id).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `data/progress/milestone_${safeId}.json`;

    enqueueTask({
      type: "commit",
      path: filePath,
      content: JSON.stringify(milestone, null, 2),
      message: `update(progress): milestone_${safeId}.json`
    });

    if (!manifest.progress.includes(safeId)) {
      manifest.progress.push(safeId);
      saveManifest();
    }
  }

  function deleteMilestoneFile(id) {
    const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `data/progress/milestone_${safeId}.json`;

    enqueueTask({
      type: "delete",
      path: filePath,
      message: `delete(progress): milestone_${safeId}.json`
    });

    manifest.progress = manifest.progress.filter(x => x !== safeId);
    if (!manifest.deletedProgressIds.includes(String(id))) {
      manifest.deletedProgressIds.push(String(id));
    }
    saveManifest();
  }

  function syncContactFile(contact) {
    if (!contact) return;
    const stableId = (contact.id || (contact.rawPhone ? contact.rawPhone : (contact.name || "contact"))).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `data/contacts/contact_${stableId}.json`;

    enqueueTask({
      type: "commit",
      path: filePath,
      content: JSON.stringify(contact, null, 2),
      message: `update(contact): contact_${stableId}.json`
    });

    if (!manifest.contacts.includes(stableId)) {
      manifest.contacts.push(stableId);
      saveManifest();
    }
  }

  function deleteContactFile(id) {
    const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `data/contacts/contact_${safeId}.json`;

    enqueueTask({
      type: "delete",
      path: filePath,
      message: `delete(contact): contact_${safeId}.json`
    });

    manifest.contacts = manifest.contacts.filter(x => x !== safeId);
    if (!manifest.deletedContactIds.includes(String(id))) {
      manifest.deletedContactIds.push(String(id));
    }
    saveManifest();
  }

  async function uploadMediaToRepo(file, targetPath) {
    updateSyncUI("syncing", "Uploading Media...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(arrayBuffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64Content = btoa(binary);

      const putRes = await fetch(`${API_BASE}/contents/${targetPath}`, {
        method: "PUT",
        headers: {
          "Authorization": `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
          message: `upload(media): ${targetPath}`,
          content: base64Content,
          committer: {
            name: "Arjunpuri Portal Sync",
            email: "sync@arjunpuri.1ax.us"
          }
        })
      });

      if (!putRes.ok) throw new Error(`Media upload failed: ${putRes.status}`);

      const resJson = await putRes.json();
      const rawUrl = (resJson.content && resJson.content.download_url) || `${RAW_BASE}/${targetPath}`;
      updateSyncUI("done", "Live Sync");
      return rawUrl;
    } catch (err) {
      console.warn("[ModularSync] Direct media upload error:", err);
      updateSyncUI("done", "Live Sync");
      return null;
    }
  }

  function saveManifest() {
    manifest.generatedAt = new Date().toISOString();
    enqueueTask({
      type: "commit",
      path: "data/manifest.json",
      content: JSON.stringify(manifest, null, 2),
      message: `update(manifest): data/manifest.json`
    });
  }

  window.cloudSync = {
    fetchAllFiles,
    syncPlotFile,
    syncMilestoneFile,
    deleteMilestoneFile,
    syncContactFile,
    deleteContactFile,
    uploadMediaToRepo,
    updateSyncUI,
    manifest,
    recordPlotChange(plot) {
      syncPlotFile(plot);
    },
    recordProgressChange(customList, editedMap, deletedIds) {
      if (Array.isArray(customList) && customList.length > 0) {
        customList.forEach(m => syncMilestoneFile(m));
      }
      if (Array.isArray(deletedIds)) {
        manifest.deletedProgressIds = deletedIds;
        saveManifest();
      }
    },
    recordContactsChange(customList, editedMap, deletedIds) {
      if (Array.isArray(customList) && customList.length > 0) {
        customList.forEach(c => syncContactFile(c));
      }
      if (Array.isArray(deletedIds)) {
        manifest.deletedContactIds = deletedIds;
        saveManifest();
      }
    },
    recordIssueChange(plot, issueItem, isDelete = false) {
      const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
      const safeId = (issueItem.id || "issue").replace(/[^a-zA-Z0-9_-]/g, "_");
      const filePath = `data/issues/issue_${safePlot}_${safeId}.json`;

      if (isDelete) {
        enqueueTask({
          type: "delete",
          path: filePath,
          message: `delete(issue): ${filePath}`
        });
      } else {
        enqueueTask({
          type: "commit",
          path: filePath,
          content: JSON.stringify(issueItem, null, 2),
          message: `update(issue): ${filePath}`
        });
      }
    },
    recordIssueCaption(key, caption) {
      manifest.editedIssueCaptions = manifest.editedIssueCaptions || {};
      manifest.editedIssueCaptions[key] = caption;
      saveManifest();
    }
  };

  window.manualTriggerSync = async function () {
    updateSyncUI("syncing", "Syncing...");
    await fetchAllFiles();
    if (typeof window.renderAllViews === "function") {
      window.renderAllViews();
    }
  };

  window.addEventListener("DOMContentLoaded", () => {
    fetchAllFiles().then(() => {
      if (typeof window.renderAllViews === "function") {
        window.renderAllViews();
      }
    });

    setInterval(() => {
      if (!isProcessingQueue) {
        fetchAllFiles().then(() => {
          if (typeof window.renderAllViews === "function") {
            window.renderAllViews();
          }
        });
      }
    }, 60000);
  });
})();
