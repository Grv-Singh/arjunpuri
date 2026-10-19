// Arjunpuri 1st — High Performance Minimalist Community App & Governance Portal
document.addEventListener("DOMContentLoaded", async () => {
  // State
  let currentFilter = "all";
  let searchQuery = "";
  let currentTab = "directory";
  let currentLang = "hi"; // Default to Hindi or loaded from localStorage
  try {
    currentLang = localStorage.getItem("arjunpuri-lang") || "hi";
  } catch (e) {}

  // Elements
  const directoryList = document.getElementById("directory-list");
  const grievanceList = document.getElementById("grievance-list");
  const contactsList = document.getElementById("contacts-list");
  const progressTimelineList = document.getElementById("progress-timeline-list");
  const progressDate = document.getElementById("progress-date");
  const progressTitle = document.getElementById("progress-title");
  const progressNote = document.getElementById("progress-note");
  const progressFile = document.getElementById("progress-file");
  const progressFileLabel = document.getElementById("progress-file-label");
  const progressFormPreview = document.getElementById("progress-form-preview");
  const searchInput = document.getElementById("main-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const filterPills = document.querySelectorAll("#filter-strip .micro-pill");
  const dockBtns = document.querySelectorAll(".bottom-dock .dock-btn");
  const plotCounter = document.getElementById("plot-counter");
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const langIndicator = document.getElementById("lang-indicator");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");

  if (progressDate) {
    progressDate.value = new Date().toISOString().split("T")[0];
  }

  // Official WhatsApp Vector Logo
  const WA_SVG = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:block;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.11.82.83-3.03-.19-.31a8.2 8.2 0 0 1-1.26-4.46c0-4.54 3.7-8.24 8.24-8.24m-3.55 4.14c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.02 2.84 1.16 3.03c.14.19 1.97 3.16 4.88 4.3 2.41.95 2.9.76 3.42.71.52-.05 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.31-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49z"/></svg>`;

  // -------------------------------------------------------------
  // 1. Multi-Language (Hindi <-> English) Translation System
  // -------------------------------------------------------------
  const I18N = {
    en: {
      brandSub: "Arjunpuri 1st Link Road • Ward 145 • Jaipur 302015",
      plotsCount: "Plots",
      searchPlaceholder: "Search: Plot, Name, Vehicle No. (8634), or Phone...",
      allPlots: "All Plots",
      vehicles: "Vehicles",
      tenants: "Tenants & PGs",
      encroachments: "Encroachments",
      verified: "Police Verified",
      dockDirectory: "Directory",
      dockProgress: "Progress",
      dockGrievance: "Grievance",
      dockContacts: "Contacts",
      progressHeading: "Colony Progress & Milestones",
      progressSub: "Timeline of community progress, civic works, and key milestones:",
      addProgressTitle: "Add New Progress Milestone",
      progressDateLabel: "Date:",
      progressTitleLabel: "Milestone Title:",
      progressNoteLabel: "Description / Details:",
      progressUploadPhoto: "Attach Photo",
      progressSubmitBtn: "Add to Timeline",
      grievanceSub: "1-Click Government Grievance Portals (Electricity, Water, Nagar Nigam):",
      contactsSub: "Councilor, Workers, Police & Local Tradesmen Assistance:",
      noPlotsFound: "No matching plots found",
      noPlotsHint: "Search by plot (20, 31), name, or vehicle number (8634, 9300)",
      noContactsFound: "No matching contacts",
      warnings: "Warnings",
      issues: "Issues",
      notes: "Notes:",
      save: "Save",
      saved: "Saved!",
      addMedia: "Add",
      uploadTitle: "Upload Photo/Video or Take Picture",
      contactsHeader: "Contacts:",
      status: "Status:",
      tenantVerification: "Tenant Verification:",
      statusVerified: "Verified",
      statusPending: "Pending",
      carsVehicles: "Cars / Vehicles:",
      atkLabel: "Atikraman (अतिक्रमण):",
      nuisanceLabel: "Public Nuisance Alert:",
      notePlaceholder: "Add or update notes for this plot...",
      call: "Call",
      sms: "SMS",
      whatsapp: "WhatsApp",
      lodge: "Lodge",
      relation_Resident_Owner: "Resident Owner",
      relation_PG_Cafe: "PG & Commercial Cafe",
      relation_PG_Student: "Student PG Accommodation",
      relation_Family_Occupied: "Family Occupied",
      relation_Resident_Family: "Resident Family",
      relation_Corner_Plot: "Resident Owner & 2 Tenants (Corner Plot)",
      tenantsText: "Tenants",
      ownerOccupied: "Owner Occupied",
      cleanRecord: "Clean Record"
    },
    hi: {
      brandSub: "अर्जुनपुरी 1st लिंक रोड • वार्ड 145 • जयपुर 302015",
      plotsCount: "प्लॉट",
      searchPlaceholder: "खोजें: प्लॉट, नाम, गाड़ी नंबर (8634), या मोबाइल...",
      allPlots: "सभी प्लॉट",
      vehicles: "वाहन",
      tenants: "किरायेदार",
      encroachments: "अतिक्रमण",
      verified: "सत्यापित",
      dockDirectory: "डायरेक्टरी",
      dockProgress: "प्रगति",
      dockGrievance: "शिकायतें",
      dockContacts: "संपर्क",
      progressHeading: "कॉलोनी प्रगति एवं विकास कार्य",
      progressSub: "कॉलोनी विकास, सुधार कार्य एवं ऐतिहासिक माइलस्टोन टाइमलाइन:",
      addProgressTitle: "नया प्रगति कार्य / माइलस्टोन जोड़ें",
      progressDateLabel: "दिनांक:",
      progressTitleLabel: "कार्य शीर्षक:",
      progressNoteLabel: "विवरण / जानकारी:",
      progressUploadPhoto: "फोटो जोड़ें",
      progressSubmitBtn: "टाइमलाइन में जोड़ें",
      grievanceSub: "1-क्लिक सरकारी शिकायत पोर्टल (बिजली, पानी, नगर निगम):",
      contactsSub: "पार्षद, कार्यकर्ता, पुलिस व स्थानीय मिस्त्री सहायता:",
      noPlotsFound: "कोई प्लॉट नहीं मिला",
      noPlotsHint: "प्लॉट (20, 31), नाम, या वाहन नंबर (8634) से खोजें",
      noContactsFound: "कोई संपर्क नहीं मिला",
      warnings: "चेतावनी",
      issues: "समस्याएं",
      notes: "टिप्पणी:",
      save: "सहेजें",
      saved: "सहेजा गया!",
      addMedia: "जोड़ें",
      uploadTitle: "फोटो/वीडियो अपलोड करें या सीधे फोटो खींचें",
      contactsHeader: "संपर्क:",
      status: "स्थिति:",
      tenantVerification: "किरायेदार सत्यापन:",
      statusVerified: "सत्यापित",
      statusPending: "लंबित",
      carsVehicles: "कार / वाहन:",
      atkLabel: "अतिक्रमण (Atikraman):",
      nuisanceLabel: "सार्वजनिक उपद्रव चेतावनी:",
      notePlaceholder: "इस प्लॉट के लिए टिप्पणी दर्ज या संपादित करें...",
      call: "कॉल करें",
      sms: "एसएमएस",
      whatsapp: "व्हाट्सएप",
      lodge: "दर्ज करें",
      relation_Resident_Owner: "निवासी मालिक",
      relation_PG_Cafe: "पीजी एवं वाणिज्यिक कैफे",
      relation_PG_Student: "विद्यार्थी पीजी आवास",
      relation_Family_Occupied: "पारिवारिक निवास",
      relation_Resident_Family: "निवासी परिवार",
      relation_Corner_Plot: "निवासी मालिक व 2 किरायेदार (कॉर्नर प्लॉट)",
      tenantsText: "किरायेदार",
      ownerOccupied: "मालिक का निवास",
      cleanRecord: "स्वच्छ रिकॉर्ड"
    }
  };

  function t(key, fallback = "") {
    return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en && I18N.en[key]) || fallback || key;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    try {
      localStorage.setItem("arjunpuri-lang", lang);
    } catch (e) {}

    // Update Lang button indicator: shows target switch language
    if (langIndicator) {
      langIndicator.textContent = lang === "hi" ? "EN" : "HI";
    }
    if (langToggleBtn) {
      langToggleBtn.setAttribute("title", lang === "hi" ? "Switch to English" : "हिंदी में देखें");
    }

    // Static DOM translations
    const brandSub = document.querySelector(".brand-titles span");
    if (brandSub) brandSub.innerHTML = t("brandSub");

    if (plotCounter) {
      plotCounter.textContent = `${RESIDENTS_DATA.length} ${t("plotsCount")}`;
    }

    if (searchInput) {
      searchInput.setAttribute("placeholder", t("searchPlaceholder"));
    }

    // Filter pills
    const pillMap = {
      all: "allPlots",
      vehicles: "vehicles",
      tenants: "tenants",
      encroachment: "encroachments",
      verified: "verified"
    };
    filterPills.forEach(pill => {
      const f = pill.dataset.filter;
      const key = pillMap[f];
      if (key) {
        const icon = pill.querySelector(".material-symbols-rounded")?.outerHTML || "";
        pill.innerHTML = `${icon} ${t(key)}`;
      }
    });

    // Dock buttons
    const dockMap = {
      directory: "dockDirectory",
      progress: "dockProgress",
      grievances: "dockGrievance",
      contacts: "dockContacts"
    };
    dockBtns.forEach(btn => {
      const tab = btn.dataset.tab;
      const key = dockMap[tab];
      if (key) {
        const icon = btn.querySelector(".material-symbols-rounded")?.outerHTML || "";
        btn.innerHTML = `${icon} ${t(key)}`;
      }
    });

    // Re-render active view
    if (currentTab === "progress") renderProgress();
    else if (currentTab === "grievances") renderGrievances();
    else if (currentTab === "contacts") renderContacts();
    else renderDirectory();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      applyLanguage(currentLang === "hi" ? "en" : "hi");
    });
  }

  // -------------------------------------------------------------
  // 2. IndexedDB Media Storage for Issues (Zero-Dependency)
  // -------------------------------------------------------------
  class ArjunpuriMediaDB {
    constructor() {
      this.dbName = "ArjunpuriMediaDB";
      this.version = 1;
      this.db = null;
    }

    async init() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          resolve(null);
          return;
        }
        const request = window.indexedDB.open(this.dbName, this.version);
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains("issues")) {
            const store = db.createObjectStore("issues", { keyPath: "id" });
            store.createIndex("plot", "plot", { unique: false });
          }
        };
        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };
        request.onerror = () => {
          resolve(null);
        };
      });
    }

    async addIssue(issue) {
      if (!this.db) return false;
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(["issues"], "readwrite");
          const store = tx.objectStore("issues");
          store.put(issue);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }

    async getIssuesForPlot(plot) {
      if (!this.db) return [];
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(["issues"], "readonly");
          const store = tx.objectStore("issues");
          const index = store.index("plot");
          const req = index.getAll(plot);
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) {
          resolve([]);
        }
      });
    }

    async deleteIssue(id) {
      if (!this.db) return false;
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(["issues"], "readwrite");
          const store = tx.objectStore("issues");
          store.delete(id);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
  }

  const mediaDB = new ArjunpuriMediaDB();
  await mediaDB.init();

  // In-memory cache of client-uploaded issues by plot
  const CLIENT_ISSUES = {};
  for (const r of RESIDENTS_DATA) {
    const list = await mediaDB.getIssuesForPlot(r.plot);
    CLIENT_ISSUES[r.plot] = list;
  }

  function getAllPlotIssues(plot) {
    const defaultData = RESIDENTS_DATA.find(r => r.plot === plot);
    const staticIssues = (defaultData && defaultData.issues) || [];
    const clientList = CLIENT_ISSUES[plot] || [];
    return [...staticIssues, ...clientList];
  }

  // -------------------------------------------------------------
  // 3. Theme Toggle (Dark / Light)
  // -------------------------------------------------------------
  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.textContent = "dark_mode";
      if (themeToggleBtn) themeToggleBtn.setAttribute("title", "Switch to Dark Theme");
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "light_mode";
      if (themeToggleBtn) themeToggleBtn.setAttribute("title", "Switch to Light Theme");
    }
    try {
      localStorage.setItem("arjunpuri-theme", theme);
    } catch (e) {}
  }

  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("arjunpuri-theme") || "dark";
  } catch (e) {}
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      applyTheme(isLight ? "dark" : "light");
    });
  }

  // -------------------------------------------------------------
  // 4. Instant Universal Search
  // -------------------------------------------------------------
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("active", searchQuery.length > 0);
      }
      if (currentTab === "contacts") {
        renderContacts();
      } else if (currentTab === "progress") {
        renderProgress();
      } else {
        renderDirectory();
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.classList.remove("active");
        if (currentTab === "contacts") {
          renderContacts();
        } else if (currentTab === "progress") {
          renderProgress();
        } else {
          renderDirectory();
        }
        searchInput.focus();
      }
    });
  }

  // Micro Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.filter;
      renderDirectory();
    });
  });

  // Bottom Dock Navigation
  dockBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dockBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.tab;

      document.querySelectorAll(".view-panel").forEach(panel => {
        panel.style.display = "none";
      });

      const targetView = document.getElementById(`view-${currentTab}`);
      if (targetView) targetView.style.display = "block";

      if (currentTab === "progress") renderProgress();
      else if (currentTab === "grievances") renderGrievances();
      else if (currentTab === "contacts") renderContacts();
      else renderDirectory();
    });
  });

  // -------------------------------------------------------------
  // 5. Governance Steppers (Warnings) & Notes Helpers
  // -------------------------------------------------------------
  function getPlotWarnings(plot, fallback = 0) {
    try {
      const v = localStorage.getItem(`arjunpuri_warn_${plot}`);
      if (v !== null) return parseInt(v, 10);
    } catch (e) {}
    return fallback;
  }

  function getPlotNote(plot, fallback = "") {
    try {
      const v = localStorage.getItem(`arjunpuri_note_${plot}`);
      if (v !== null) return v;
    } catch (e) {}
    return fallback;
  }

  window.updateCounter = function(plot, type, delta) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const elId = `val-${type}-${safePlot}`;
    const el = document.getElementById(elId);
    if (!el) return;

    let current = parseInt(el.textContent, 10) || 0;
    let nextVal = Math.max(0, current + delta);
    el.textContent = nextVal;

    try {
      localStorage.setItem(`arjunpuri_warn_${plot}`, nextVal.toString());
    } catch (e) {}
  };

  window.saveNote = function(plot) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const textarea = document.getElementById(`note-input-${safePlot}`);
    const statusEl = document.getElementById(`note-status-${safePlot}`);
    if (!textarea) return;

    const val = textarea.value.trim();
    try {
      localStorage.setItem(`arjunpuri_note_${plot}`, val);
    } catch (e) {}

    if (statusEl) {
      statusEl.innerHTML = `<span class="material-symbols-rounded" style="font-size: 13px; vertical-align: middle;">check_circle</span> ${t("saved")}`;
      setTimeout(() => {
        statusEl.innerHTML = "";
      }, 2500);
    }
  };

  window.handleNoteInput = function(plot) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const textarea = document.getElementById(`note-input-${safePlot}`);
    if (!textarea) return;
    try {
      localStorage.setItem(`arjunpuri_note_${plot}`, textarea.value);
    } catch (e) {}
  };

  // -------------------------------------------------------------
  // 6. Issues Media Upload & Slideshow System
  // -------------------------------------------------------------
  window.handleIssueUpload = function(plot, inputEl) {
    if (!inputEl || !inputEl.files || inputEl.files.length === 0) return;
    const file = inputEl.files[0];
    const isVideo = file.type.startsWith("video/");
    const safePlotFolder = `plot-${plot.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);
    const cleanFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const organizedFilePath = `assets/issues/${safePlotFolder}/issue_${timestamp}_${cleanFilename}`;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const newIssue = {
        id: `issue_${plot}_${Date.now()}`,
        plot: plot,
        url: dataUrl,
        type: isVideo ? "video" : "image",
        caption: `${isVideo ? "Video Issue" : "Photo Issue"} (${plot})`,
        date: new Date().toISOString().slice(0, 10),
        filepath: organizedFilePath,
        isCustom: true
      };

      await mediaDB.addIssue(newIssue);
      if (!CLIENT_ISSUES[plot]) CLIENT_ISSUES[plot] = [];
      CLIENT_ISSUES[plot].push(newIssue);

      // Re-render and automatically open slideshow showing this new issue
      renderDirectory();
      const allIssues = getAllPlotIssues(plot);
      openSlideshow(plot, allIssues.length - 1);
    };
    reader.readAsDataURL(file);
    inputEl.value = "";
  };

  // Active Slideshow State
  let activeSlideshowPlot = null;
  let activeSlideshowIndex = 0;
  let activeSlideshowIssues = [];

  const slideshowModal = document.getElementById("slideshow-modal");
  const slideshowPlotTitle = document.getElementById("slideshow-plot-title");
  const slideshowCounter = document.getElementById("slideshow-counter");
  const slideshowMediaWrapper = document.getElementById("slideshow-media-wrapper");
  const slideshowCaption = document.getElementById("slideshow-caption");
  const slideshowFilepath = document.getElementById("slideshow-filepath");
  const slideshowDownloadBtn = document.getElementById("slideshow-download-btn");
  const slideshowDeleteBtn = document.getElementById("slideshow-delete-btn");

  window.openSlideshow = function(plot, index = 0) {
    const issues = getAllPlotIssues(plot);
    if (!issues || issues.length === 0) return;

    activeSlideshowPlot = plot;
    activeSlideshowIssues = issues;
    activeSlideshowIndex = Math.max(0, Math.min(index, issues.length - 1));

    if (slideshowModal) slideshowModal.style.display = "flex";
    updateSlideshowUI();
  };

  window.openProgressSlideshow = function(photoUrl, titleEncoded) {
    const title = decodeURIComponent(titleEncoded);
    activeSlideshowPlot = "Progress";
    activeSlideshowIssues = [{ url: photoUrl, type: "image", caption: title, filepath: photoUrl }];
    activeSlideshowIndex = 0;
    if (slideshowModal) slideshowModal.style.display = "flex";
    updateSlideshowUI();
  };

  window.closeSlideshow = function() {
    if (slideshowModal) slideshowModal.style.display = "none";
    if (slideshowMediaWrapper) slideshowMediaWrapper.innerHTML = "";
    activeSlideshowPlot = null;
    activeSlideshowIssues = [];
  };

  window.navigateSlideshow = function(direction) {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) return;
    const len = activeSlideshowIssues.length;
    activeSlideshowIndex = (activeSlideshowIndex + direction + len) % len;
    updateSlideshowUI();
  };

  function updateSlideshowUI() {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) {
      closeSlideshow();
      return;
    }
    const issue = activeSlideshowIssues[activeSlideshowIndex];
    if (slideshowPlotTitle) {
      slideshowPlotTitle.textContent = activeSlideshowPlot === "Progress"
        ? `${t("dockProgress")} Milestone`
        : `${t("issues")} — Plot ${activeSlideshowPlot}`;
    }
    if (slideshowCounter) {
      slideshowCounter.textContent = `${activeSlideshowIndex + 1} / ${activeSlideshowIssues.length}`;
    }
    if (slideshowCaption) {
      slideshowCaption.textContent = issue.caption || `Plot ${activeSlideshowPlot} Issue`;
    }
    if (slideshowFilepath) {
      const cleanPlotFolder = `plot-${(activeSlideshowPlot || "").toString().replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
      slideshowFilepath.textContent = issue.filepath || issue.url || `assets/issues/${cleanPlotFolder}/`;
    }

    if (slideshowMediaWrapper) {
      if (issue.type === "video") {
        slideshowMediaWrapper.innerHTML = `
          <video src="${issue.url}" controls autoplay playsinline style="max-width: 100%; max-height: 100%;"></video>
        `;
      } else {
        slideshowMediaWrapper.innerHTML = `
          <img src="${issue.url}" alt="${issue.caption || 'Issue'}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        `;
      }
    }

    // Download Handler
    if (slideshowDownloadBtn) {
      slideshowDownloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = issue.url;
        a.download = `arjunpuri_${activeSlideshowPlot}_issue_${activeSlideshowIndex + 1}${issue.type === 'video' ? '.mp4' : '.jpg'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }

    // Delete Handler (for client uploaded files)
    if (slideshowDeleteBtn) {
      if (issue.isCustom && issue.id) {
        slideshowDeleteBtn.style.display = "inline-flex";
        slideshowDeleteBtn.onclick = async () => {
          await mediaDB.deleteIssue(issue.id);
          CLIENT_ISSUES[activeSlideshowPlot] = (CLIENT_ISSUES[activeSlideshowPlot] || []).filter(i => i.id !== issue.id);
          activeSlideshowIssues = getAllPlotIssues(activeSlideshowPlot);
          if (activeSlideshowIssues.length === 0) {
            closeSlideshow();
          } else {
            activeSlideshowIndex = Math.min(activeSlideshowIndex, activeSlideshowIssues.length - 1);
            updateSlideshowUI();
          }
          renderDirectory();
        };
      } else {
        slideshowDeleteBtn.style.display = "none";
      }
    }
  }

  // Keyboard navigation for slideshow
  document.addEventListener("keydown", (e) => {
    if (!slideshowModal || slideshowModal.style.display === "none") return;
    if (e.key === "ArrowLeft") navigateSlideshow(-1);
    else if (e.key === "ArrowRight") navigateSlideshow(1);
    else if (e.key === "Escape") closeSlideshow();
  });

  // Touch Swipe navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  if (slideshowModal) {
    slideshowModal.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slideshowModal.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        navigateSlideshow(1); // Swipe left -> Next
      } else if (touchEndX - touchStartX > 45) {
        navigateSlideshow(-1); // Swipe right -> Prev
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------
  // 7. Directory Renderer
  // -------------------------------------------------------------
  function renderDirectory() {
    if (!directoryList) return;

    let filtered = RESIDENTS_DATA.filter(r => {
      // Filter Pill logic
      if (currentFilter === "vehicles" && (!r.vehicles || r.vehicles.length === 0)) return false;
      if (currentFilter === "tenants" && !r.hasTenant) return false;
      if (currentFilter === "encroachment" && !r.hasEncroachment) return false;
      if (currentFilter === "verified" && !r.policeVerified) return false;

      // Universal Search matching
      if (searchQuery) {
        const q = searchQuery;
        const matchPlot = r.plot.toLowerCase().includes(q);
        const matchName = ((r.surname || "") + " " + (r.members || "") + " " + (r.name || "")).toLowerCase().includes(q);
        const matchPhone = (r.phone && r.phone.toLowerCase().includes(q)) || (r.rawPhone && r.rawPhone.includes(q));
        const matchMembers = r.membersList && r.membersList.some(m => 
          (m.name && m.name.toLowerCase().includes(q)) ||
          (m.phone && m.phone.toLowerCase().includes(q)) ||
          (m.rawPhone && m.rawPhone.includes(q)) ||
          (m.role && m.role.toLowerCase().includes(q))
        );
        const matchVehicles = r.vehicles && r.vehicles.some(v => v.toLowerCase().includes(q));
        const savedNote = getPlotNote(r.plot, r.notes || "");
        const matchNotes = savedNote && savedNote.toLowerCase().includes(q);
        const matchNuisance = r.nuisanceAlert && r.nuisanceAlert.toLowerCase().includes(q);
        const matchTenant = r.tenantInfo && r.tenantInfo.toLowerCase().includes(q);
        return matchPlot || matchName || matchPhone || matchMembers || matchVehicles || matchNotes || matchNuisance || matchTenant;
      }
      return true;
    });

    if (filtered.length === 0) {
      directoryList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 38px; color: var(--text-dim); margin-bottom: 0.4rem;">search_off</span>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--text-main);">${t("noPlotsFound")}</p>
          <p style="font-size: 0.78rem;">${t("noPlotsHint")}</p>
        </div>
      `;
      return;
    }

    directoryList.innerHTML = filtered.map(r => {
      const safePlot = r.plot.replace(/[^a-zA-Z0-9]/g, "_");
      const surnameDisplay = r.surname || r.name;
      const initials = surnameDisplay
        .split(" ")
        .filter(w => w.length > 0 && !["and", "&", "the", "a", "sahab's"].includes(w.toLowerCase()))
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join("") || r.plot;

      const avatarHtml = r.photoUrl
        ? `<div class="row-avatar"><img src="${r.photoUrl}" alt="${surnameDisplay}"></div>`
        : `<div class="row-avatar">${initials}</div>`;

      // Badges
      let badgesHtml = '';
      if (r.hasEncroachment) {
        const encLabel = r.encroachmentType || "Atikraman";
        badgesHtml += `<span class="icon-encroach" title="Atikraman (अतिक्रमण): ${encLabel}"><span class="material-symbols-rounded">report</span></span>`;
      }
      if (r.nuisanceAlert) {
        badgesHtml += `<span class="icon-nuisance" title="${r.nuisanceAlert}"><span class="material-symbols-rounded">warning</span></span>`;
      }
      if (r.hasTenant) {
        const tenantStr = r.tenantCount ? `${r.tenantCount} ${t("tenantsText")}` : t("tenantsText");
        badgesHtml += `<span class="badge-tenant">${tenantStr}</span>`;
      }

      // 1-Tap Action URLs
      const msgText = encodeURIComponent(`Namaste ${surnameDisplay} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);

      // Dynamic Governance values
      const warningsVal = getPlotWarnings(r.plot, r.warnings || 0);
      const plotNoteVal = getPlotNote(r.plot, r.notes || "");
      const issuesList = getAllPlotIssues(r.plot);

      // Relation / Status translation
      let relationDisplay = r.relation;
      if (currentLang === "hi") {
        if (r.relation.includes("Resident Owner") && r.relation.includes("Corner Plot")) {
          relationDisplay = t("relation_Corner_Plot");
        } else if (r.relation.includes("PG & Commercial Cafe")) {
          relationDisplay = t("relation_PG_Cafe");
        } else if (r.relation.includes("Student PG")) {
          relationDisplay = t("relation_PG_Student");
        } else if (r.relation.includes("Resident Owner")) {
          relationDisplay = t("relation_Resident_Owner");
        } else if (r.relation.includes("Resident Family")) {
          relationDisplay = t("relation_Resident_Family");
        }
      }

      return `
        <div class="plot-row" data-plot="${r.plot}" onclick="toggleRowExpand(this)">
          <div class="row-main">
            <div class="row-left">
              <div class="plot-tag">${r.plot}</div>
              ${avatarHtml}
              <div class="row-info">
                <div class="name-line">
                  <span class="name-text">${surnameDisplay}</span>
                  ${badgesHtml}
                </div>
              </div>
            </div>

            <!-- Clean Expand Indicator -->
            <div class="row-expand-indicator">
              <span class="material-symbols-rounded chevron-icon">expand_more</span>
            </div>
          </div>

          <!-- Accordion Details -->
          <div class="row-details">
            <!-- Compact Warning Counter -->
            <div class="governance-counters" onclick="event.stopPropagation()">
              <div class="counter-box warning-box">
                <span class="counter-label">${t("warnings")}</span>
                <div class="stepper-controls">
                  <button class="stepper-btn minus" onclick="updateCounter('${r.plot}', 'warnings', -1)" title="Decrease Warnings">
                    <span class="material-symbols-rounded" style="font-size: 13px;">remove</span>
                  </button>
                  <span class="stepper-value" id="val-warnings-${safePlot}">${warningsVal}</span>
                  <button class="stepper-btn plus" onclick="updateCounter('${r.plot}', 'warnings', 1)" title="Increase Warnings">
                    <span class="material-symbols-rounded" style="font-size: 13px;">add</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Issues Section with Small Boxes, Add Media & Slideshow -->
            <div class="issues-section" onclick="event.stopPropagation()">
              <div class="issues-header">
                <div class="issues-header-left">
                  <span class="material-symbols-rounded" style="font-size: 17px; color: var(--rose);">photo_library</span>
                  <span>${t("issues")}</span>
                  <span class="issues-count-badge">${issuesList.length}</span>
                </div>
                <label class="btn-add-issue" title="${t("uploadTitle")}">
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    capture="environment" 
                    style="display: none;" 
                    onchange="handleIssueUpload('${r.plot}', this)"
                  >
                  <span class="material-symbols-rounded" style="font-size: 14px;">add_a_photo</span>
                  <span>${t("addMedia")}</span>
                </label>
              </div>

              <div class="issues-thumb-strip">
                ${issuesList.map((issue, idx) => `
                  <div class="issue-thumb-box" onclick="openSlideshow('${r.plot}', ${idx})" title="${issue.caption || 'View Issue'}">
                    ${issue.type === 'video' ? `
                      <video src="${issue.url}" preload="metadata" muted></video>
                      <span class="material-symbols-rounded video-indicator">play_arrow</span>
                    ` : `
                      <img src="${issue.url}" alt="Issue ${idx + 1}" loading="lazy">
                    `}
                  </div>
                `).join("")}
                <label class="issue-thumb-box add-box" title="${t("uploadTitle")}">
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    capture="environment" 
                    style="display: none;" 
                    onchange="handleIssueUpload('${r.plot}', this)"
                  >
                  <span class="material-symbols-rounded" style="font-size: 20px;">add</span>
                </label>
              </div>
            </div>

            <!-- Publicly Editable Notes -->
            <div class="editable-notes-section" onclick="event.stopPropagation()">
              <div class="notes-header">
                <div class="notes-header-left">
                  <span class="material-symbols-rounded" style="font-size: 16px; color: var(--gold);">edit_note</span>
                  <span>${t("notes")}</span>
                </div>
                <button class="btn-save-note" onclick="saveNote('${r.plot}')" title="Save Note">
                  <span class="material-symbols-rounded" style="font-size: 14px;">check</span>
                  <span>${t("save")}</span>
                </button>
              </div>
              <textarea 
                id="note-input-${safePlot}" 
                class="note-textarea" 
                placeholder="${t("notePlaceholder")}" 
                rows="2"
                oninput="handleNoteInput('${r.plot}')"
              >${plotNoteVal}</textarea>
              <div class="note-save-status" id="note-status-${safePlot}"></div>
            </div>

            <!-- Registered Vehicles -->
            ${(r.vehicles && r.vehicles.length > 0) ? `
              <div class="detail-item" style="align-items: flex-start; margin-top: 0.4rem;">
                <span>${t("carsVehicles")}</span>
                <span style="text-align: right; color: #f1f5f9; font-weight: 600;">
                  ${r.vehicles.map(v => `<div style="font-size: 0.76rem; line-height: 1.35;">${v}</div>`).join("")}
                </span>
              </div>
            ` : ''}

            <!-- Individual Members & Contacts with Profile Pictures -->
            ${(() => {
              const verifiedMembers = (r.membersList || []).filter(m => m.phone && m.phone.trim() !== "");
              if (verifiedMembers.length === 0) return '';
              return `
                <div class="members-section">
                  <div class="members-header">
                    <span class="material-symbols-rounded">contacts</span>
                    <span>${t("contactsHeader")}</span>
                  </div>
                  <div class="members-grid">
                    ${verifiedMembers.map(m => {
                      const mMsg = encodeURIComponent(`Namaste ${m.name} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);
                      return `
                        <div class="member-card">
                          ${m.photoUrl ? `<img src="${m.photoUrl}" alt="${m.name}" class="member-avatar-mini">` : ''}
                          <div class="member-details">
                            <div class="member-top-row">
                              <span class="member-name-text">${m.name}</span>
                              ${m.role ? `<span class="member-badge">${m.role}</span>` : ''}
                            </div>
                            <div class="member-phone-row">
                              <span class="material-symbols-rounded member-phone-icon">call</span>
                              <span class="member-phone-val">${m.phone}</span>
                            </div>
                          </div>
                          <div class="member-action-btns" onclick="event.stopPropagation()">
                            <a href="tel:${m.phone}" class="btn-icon call" title="${t("call")} ${m.name}">
                              <span class="material-symbols-rounded">call</span>
                            </a>
                            <a href="sms:${m.rawPhone}?body=${mMsg}" class="btn-icon sms" title="${t("sms")} ${m.name}">
                              <span class="material-symbols-rounded">sms</span>
                            </a>
                            <a href="https://wa.me/${m.rawPhone}?text=${mMsg}" target="_blank" class="btn-icon wa" title="${t("whatsapp")} ${m.name}">
                              ${WA_SVG}
                            </a>
                          </div>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              `;
            })()}

            <div class="detail-item">
              <span>${t("status")}</span>
              <span>${relationDisplay}</span>
            </div>

            ${r.hasTenant ? `
              <div class="detail-item">
                <span>${t("tenantVerification")}</span>
                ${r.policeVerified ? `
                  <span class="indicator-badge verified">
                    <span class="material-symbols-rounded">check_circle</span>
                    ${t("statusVerified")}
                  </span>
                ` : `
                  <span class="indicator-badge pending">
                    <span class="material-symbols-rounded">pending</span>
                    ${t("statusPending")}
                  </span>
                `}
              </div>
            ` : ''}

            ${r.hasEncroachment ? `
              <div class="detail-alert-box" style="border-color: rgba(244, 63, 94, 0.35); background: rgba(244, 63, 94, 0.08); color: #fca5a5;">
                <span class="material-symbols-rounded" style="font-size: 15px; color: var(--rose); flex-shrink: 0;">report</span>
                <span><strong>${t("atkLabel")}</strong> ${r.encroachmentType || 'Lane obstruction recorded outside.'}</span>
              </div>
            ` : ''}

            ${r.nuisanceAlert ? `
              <div class="detail-alert-box">
                <span class="material-symbols-rounded" style="font-size: 15px; color: var(--gold); flex-shrink: 0;">warning</span>
                <span><strong>${t("nuisanceLabel")}</strong> ${r.nuisanceAlert}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // Row Expand Toggle
  window.toggleRowExpand = function(rowEl) {
    rowEl.classList.toggle("expanded");
  };

  // -------------------------------------------------------------
  // 8. Progress Timeline View & Form Management
  // -------------------------------------------------------------
  let customProgressData = [];
  try {
    customProgressData = JSON.parse(localStorage.getItem("arjunpuri_custom_progress")) || [];
  } catch (e) {
    customProgressData = [];
  }

  let selectedProgressPhotoData = "";

  window.handleProgressFileSelect = function(inputEl) {
    if (!inputEl || !inputEl.files || inputEl.files.length === 0) return;
    const file = inputEl.files[0];
    if (progressFileLabel) {
      progressFileLabel.textContent = file.name.slice(0, 16) + "...";
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedProgressPhotoData = e.target.result;
      if (progressFormPreview) {
        progressFormPreview.style.display = "block";
        progressFormPreview.innerHTML = `<img src="${selectedProgressPhotoData}" alt="Preview">`;
      }
    };
    reader.readAsDataURL(file);
  };

  window.handleProgressSubmit = function(e) {
    e.preventDefault();
    if (!progressDate || !progressTitle || !progressNote) return;

    const dateVal = progressDate.value.trim();
    const titleVal = progressTitle.value.trim();
    const noteVal = progressNote.value.trim();
    if (!dateVal || !titleVal || !noteVal) return;

    const newMilestone = {
      id: `prog-usr-${Date.now()}`,
      date: dateVal,
      title: titleVal,
      note: noteVal,
      photoUrl: selectedProgressPhotoData || "",
      status: "Community Logged",
      isCustom: true
    };

    customProgressData.unshift(newMilestone);
    try {
      localStorage.setItem("arjunpuri_custom_progress", JSON.stringify(customProgressData));
    } catch (e) {}

    // Reset Form
    progressTitle.value = "";
    progressNote.value = "";
    if (progressFile) progressFile.value = "";
    if (progressFileLabel) progressFileLabel.textContent = t("progressUploadPhoto");
    if (progressFormPreview) {
      progressFormPreview.style.display = "none";
      progressFormPreview.innerHTML = "";
    }
    selectedProgressPhotoData = "";
    progressDate.value = new Date().toISOString().split("T")[0];

    renderProgress();
  };

  function renderProgress() {
    if (!progressTimelineList) return;

    const allMilestones = [...customProgressData, ...(window.PROGRESS_DATA || [])];
    allMilestones.sort((a, b) => new Date(b.date) - new Date(a.date));

    let filtered = allMilestones;
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchQuery) ||
        m.note.toLowerCase().includes(searchQuery) ||
        m.date.includes(searchQuery)
      );
    }

    if (filtered.length === 0) {
      progressTimelineList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 38px; color: var(--text-dim); margin-bottom: 0.4rem;">history_toggle_off</span>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--text-main);">No progress milestones found</p>
        </div>
      `;
      return;
    }

    progressTimelineList.innerHTML = filtered.map(m => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-card">
          <div class="timeline-top-row">
            <span class="timeline-date-badge">${m.date}</span>
            <span class="timeline-status-badge">${m.status || "Completed"}</span>
          </div>
          <div class="timeline-title">${m.title}</div>
          <div class="timeline-note">${m.note}</div>
          ${m.photoUrl ? `
            <div class="timeline-media" onclick="openProgressSlideshow('${m.photoUrl}', '${encodeURIComponent(m.title)}')">
              <img src="${m.photoUrl}" alt="${m.title}" loading="lazy">
            </div>
          ` : ''}
        </div>
      </div>
    `).join("");
  }

  // -------------------------------------------------------------
  // 9. Grievances Renderer
  // -------------------------------------------------------------
  function renderGrievances() {
    if (!grievanceList) return;
    const subTitle = document.querySelector("#view-grievances div");
    if (subTitle) subTitle.textContent = t("grievanceSub");

    grievanceList.innerHTML = GRIEVANCE_PORTALS.map(g => `
      <div class="utility-card">
        <div class="utility-left">
          <div class="utility-icon">
            <span class="material-symbols-rounded">${g.icon}</span>
          </div>
          <div>
            <div class="utility-title">${g.dept}</div>
            <div class="utility-desc">${g.issue}</div>
          </div>
        </div>
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          <a href="${g.url}" target="_blank" class="btn-open">
            <span class="material-symbols-rounded" style="font-size: 14px;">open_in_new</span>
            ${t("lodge")}
          </a>
          <a href="tel:${g.tollFree}" class="btn-icon call" title="${t("call")}">
            <span class="material-symbols-rounded">call</span>
          </a>
        </div>
      </div>
    `).join("");
  }

  // -------------------------------------------------------------
  // 10. Contacts Renderer
  // -------------------------------------------------------------
  function renderContacts() {
    if (!contactsList) return;
    const subTitle = document.querySelector("#view-contacts div");
    if (subTitle) subTitle.textContent = t("contactsSub");

    let filtered = CIVIC_AND_TRADE_CONTACTS;
    if (searchQuery) {
      filtered = filtered.filter(c => {
        const matchName = (c.name || "").toLowerCase().includes(searchQuery);
        const matchRole = (c.role || "").toLowerCase().includes(searchQuery);
        const matchDuty = (c.duty || "").toLowerCase().includes(searchQuery);
        const matchPhone = (c.phone || "").toLowerCase().includes(searchQuery) || (c.rawPhone || "").includes(searchQuery);
        return matchName || matchRole || matchDuty || matchPhone;
      });
    }

    if (filtered.length === 0) {
      contactsList.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 32px; color: var(--text-dim); margin-bottom: 0.3rem;">search_off</span>
          <p style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">${t("noContactsFound")}</p>
        </div>
      `;
      return;
    }

    contactsList.innerHTML = filtered.map(c => {
      const waMsg = encodeURIComponent(c.customMsg || `Namaste ${c.name} ji, regarding Arjunpuri 1st Link Road...`);
      return `
        <div class="utility-card">
          <div class="utility-left">
            <div class="utility-icon" style="color: var(--cyan);">
              <span class="material-symbols-rounded">${c.icon}</span>
            </div>
            <div>
              <div class="utility-title">${c.name}</div>
              <div class="utility-desc">${c.role} &bull; ${c.office}</div>
            </div>
          </div>
          <div class="row-actions">
            <a href="tel:${c.rawPhone}" class="btn-icon call" title="${t("call")}">
              <span class="material-symbols-rounded">call</span>
            </a>
            ${c.rawPhone.length > 5 ? `
              <a href="sms:${c.rawPhone}?body=${waMsg}" class="btn-icon sms" title="${t("sms")}">
                <span class="material-symbols-rounded">sms</span>
              </a>
              <a href="https://wa.me/${c.rawPhone}?text=${waMsg}" target="_blank" class="btn-icon wa" title="${t("whatsapp")}">
                ${WA_SVG}
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // Initial Language Setup & Render
  applyLanguage(currentLang);
});
