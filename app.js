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
  const notifToggleBtn = document.getElementById("notif-toggle-btn");
  const notifIcon = document.getElementById("notif-icon");
  const notifBanner = document.getElementById("notif-banner");

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
      brandSub: "Link Road • Ward 145 • Jaipur 302015",
      plotsCount: "Plots",
      searchPlaceholder: "Search: Plot, Name, Vehicle No., or Phone...",
      allPlots: "Plots",
      vehicles: "Vehicles",
      tenants: "Tenants & PGs",
      encroachments: "Encroachments",
      nuisanceFilter: "Nuisance",
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
      contactsSub: "Police Emergency, Helplines, Trades & Local Services:",
      noPlotsFound: "No matching plots found",
      noPlotsHint: "Search by plot (20, 31), name, or vehicle number",
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
      nuisancePlaceholder: "Add or update public nuisance alert for this plot...",
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
      cleanRecord: "Clean Record",
      notifBannerTitle: "Stay Updated on Arjunpuri 1st",
      notifBannerDesc: "Enable notifications to receive instant updates on colony development milestones, maintenance alerts & emergency notices.",
      notifAllowBtn: "Allow Notifications",
      notifGrantedTitle: "Arjunpuri 1st Colony Updates",
      notifGrantedMsg: "Notifications enabled! You will receive live updates on colony development and notices.",
      notifStatusActive: "Notifications are active! You will receive live colony updates and emergency alerts."
    },
    hi: {
      brandSub: "लिंक रोड • वार्ड 145 • जयपुर 302015",
      plotsCount: "प्लॉट",
      searchPlaceholder: "खोजें: प्लॉट, नाम, गाड़ी नंबर, या मोबाइल...",
      allPlots: "प्लॉट",
      vehicles: "वाहन",
      tenants: "किरायेदार",
      encroachments: "अतिक्रमण",
      nuisanceFilter: "उपद्रव अलर्ट",
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
      contactsSub: "पुलिस, आपातकालीन व स्थानीय मिस्त्री / घरेलू सहायता:",
      noPlotsFound: "कोई प्लॉट नहीं मिला",
      noPlotsHint: "प्लॉट (20, 31), नाम, या वाहन नंबर से खोजें",
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
      nuisancePlaceholder: "इस प्लॉट के लिए सार्वजनिक उपद्रव या शिकायत दर्ज करें...",
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
      cleanRecord: "स्वच्छ रिकॉर्ड",
      notifBannerTitle: "अर्जुनपुरी 1st के नए अपडेट्स प्राप्त करें",
      notifBannerDesc: "कॉलोनी विकास कार्यों, प्रगति अपडेट्स और आपातकालीन सूचनाओं के लिए नोटिफिकेशन की अनुमति दें।",
      notifAllowBtn: "सूचनाएं चालू करें",
      notifGrantedTitle: "अर्जुनपुरी 1st कॉलोनी अपडेट",
      notifGrantedMsg: "सूचनाएं सक्रिय हैं! आपको कॉलोनी प्रगति और आवश्यक सूचनाएं तुरंत प्राप्त होंगी।",
      notifStatusActive: "सूचनाएं सक्रिय हैं! आपको कॉलोनी के लाइव अपडेट्स और अलर्ट प्राप्त होते रहेंगे।"
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
      nuisance: "nuisanceFilter",
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

    // Notification banner translations
    const notifTitle = document.getElementById("notif-banner-title");
    const notifDesc = document.getElementById("notif-banner-desc");
    const notifBtnText = document.getElementById("notif-btn-allow-text");
    if (notifTitle) notifTitle.textContent = t("notifBannerTitle");
    if (notifDesc) notifDesc.textContent = t("notifBannerDesc");
    if (notifBtnText) notifBtnText.textContent = t("notifAllowBtn");

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

  // Custom Progress Milestones
  let customProgressData = [];
  try {
    customProgressData = JSON.parse(localStorage.getItem("arjunpuri_custom_progress")) || [];
  } catch (e) {
    customProgressData = [];
  }

  // Custom Contacts Data
  let customContacts = [];
  try {
    customContacts = JSON.parse(localStorage.getItem("arjunpuri_custom_contacts")) || [];
  } catch (e) {
    customContacts = [];
  }

  // Persistent Deleted Media Tracking
  function getDeletedStaticIssues() {
    try {
      return JSON.parse(localStorage.getItem("arjunpuri_deleted_static_issues") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveDeletedStaticIssue(url) {
    if (!url) return;
    const list = getDeletedStaticIssues();
    if (!list.includes(url)) {
      list.push(url);
      try {
        localStorage.setItem("arjunpuri_deleted_static_issues", JSON.stringify(list));
      } catch (e) {}
    }
  }

  function getDeletedMilestonePhotos() {
    try {
      return JSON.parse(localStorage.getItem("arjunpuri_deleted_milestone_photos") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveDeletedMilestonePhoto(url) {
    if (!url) return;
    const list = getDeletedMilestonePhotos();
    if (!list.includes(url)) {
      list.push(url);
      try {
        localStorage.setItem("arjunpuri_deleted_milestone_photos", JSON.stringify(list));
      } catch (e) {}
    }
  }

  function getDeletedPlotPhotos() {
    try {
      return JSON.parse(localStorage.getItem("arjunpuri_deleted_plot_photos") || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveDeletedPlotPhoto(url, plot) {
    if (url) {
      const list = getDeletedPlotPhotos();
      if (!list.includes(url)) {
        list.push(url);
        try {
          localStorage.setItem("arjunpuri_deleted_plot_photos", JSON.stringify(list));
        } catch (e) {}
      }
    }
    if (plot) {
      try {
        localStorage.setItem(`arjunpuri_plot_photo_deleted_${plot}`, "true");
      } catch (e) {}
    }
  }

  function getEditedIssueCaptions() {
    try {
      const stored = localStorage.getItem("arjunpuri_edited_issue_captions");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {};
  }

  function saveEditedIssueCaption(key, caption) {
    if (!key) return;
    const captions = getEditedIssueCaptions();
    captions[key] = caption;
    try {
      localStorage.setItem("arjunpuri_edited_issue_captions", JSON.stringify(captions));
    } catch (e) {}
  }

  function getAllPlotIssues(plot) {
    const defaultData = RESIDENTS_DATA.find(r => r.plot === plot);
    const rawStatic = (defaultData && defaultData.issues) || [];
    const deletedList = getDeletedStaticIssues();
    const staticIssues = rawStatic.filter(iss => !deletedList.includes(iss.url));
    const clientList = CLIENT_ISSUES[plot] || [];
    const captionMap = getEditedIssueCaptions();
    return [...staticIssues, ...clientList].map(iss => {
      const key = iss.id || iss.url;
      if (captionMap && captionMap[key] !== undefined) {
        return { ...iss, caption: captionMap[key] };
      }
      return iss;
    });
  }
  window.getAllPlotIssues = getAllPlotIssues;

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

  function getPlotTenantCount(plot, fallback = 0) {
    try {
      const v = localStorage.getItem(`arjunpuri_tenants_${plot}`);
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

    if (type === "warnings") {
      try {
        localStorage.setItem(`arjunpuri_warn_${plot}`, nextVal.toString());
      } catch (e) {}
    } else if (type === "tenants") {
      try {
        localStorage.setItem(`arjunpuri_tenants_${plot}`, nextVal.toString());
      } catch (e) {}
      const resident = RESIDENTS_DATA.find(r => r.plot === plot);
      if (resident) {
        resident.tenantCount = nextVal;
        resident.hasTenant = nextVal > 0;
      }
      const badgeEl = document.getElementById(`badge-tenant-${safePlot}`);
      if (badgeEl) {
        if (nextVal > 0) {
          badgeEl.textContent = `${nextVal} ${t("tenantsText")}`;
          badgeEl.style.display = "inline-flex";
        } else {
          badgeEl.style.display = "none";
        }
      }
    }
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

  function getPlotNuisance(plot, fallback = "") {
    try {
      const v = localStorage.getItem(`arjunpuri_nuisance_${plot}`);
      if (v !== null) return v;
    } catch (e) {}
    return fallback;
  }

  window.saveNuisance = function(plot) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const textarea = document.getElementById(`nuisance-input-${safePlot}`);
    const statusEl = document.getElementById(`nuisance-status-${safePlot}`);
    if (!textarea) return;

    const val = textarea.value.trim();
    try {
      localStorage.setItem(`arjunpuri_nuisance_${plot}`, val);
    } catch (e) {}

    if (statusEl) {
      statusEl.innerHTML = `<span class="material-symbols-rounded" style="font-size: 13px; vertical-align: middle;">check_circle</span> ${t("saved")}`;
      setTimeout(() => {
        statusEl.innerHTML = "";
      }, 2500);
    }
  };

  window.handleNuisanceInput = function(plot) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const textarea = document.getElementById(`nuisance-input-${safePlot}`);
    if (!textarea) return;
    try {
      localStorage.setItem(`arjunpuri_nuisance_${plot}`, textarea.value);
    } catch (e) {}
  };

  function getPlotVehicles(plot, fallback = []) {
    try {
      const stored = localStorage.getItem(`arjunpuri_vehicles_${plot}`);
      if (stored !== null) return JSON.parse(stored);
    } catch (e) {}
    return fallback;
  }

  function savePlotVehicles(plot, list) {
    try {
      localStorage.setItem(`arjunpuri_vehicles_${plot}`, JSON.stringify(list));
    } catch (e) {}
  }

  window.handleVehicleInput = function(plot, idx, val) {
    const defaultData = RESIDENTS_DATA.find(r => r.plot === plot);
    const list = getPlotVehicles(plot, (defaultData && defaultData.vehicles) || []);
    if (idx >= 0 && idx < list.length) {
      list[idx] = val;
      savePlotVehicles(plot, list);
    }
  };

  window.saveVehicleEdit = function(plot, idx) {
    const safePlot = plot.replace(/[^a-zA-Z0-9]/g, "_");
    const input = document.getElementById(`vehicle-input-${safePlot}-${idx}`);
    if (!input) return;
    const val = input.value.trim();
    const defaultData = RESIDENTS_DATA.find(r => r.plot === plot);
    const list = getPlotVehicles(plot, (defaultData && defaultData.vehicles) || []);
    if (idx >= 0 && idx < list.length) {
      list[idx] = val;
      savePlotVehicles(plot, list);
    }
    input.style.borderColor = "var(--emerald)";
    setTimeout(() => {
      if (input) input.style.borderColor = "";
    }, 1200);
  };

  window.addVehicle = function(plot) {
    const defaultData = RESIDENTS_DATA.find(r => r.plot === plot);
    const list = getPlotVehicles(plot, (defaultData && defaultData.vehicles) || []);
    const promptMsg = currentLang === "hi"
      ? "नया वाहन नंबर व मॉडल दर्ज करें (उदा. RJ 14 CQ 2182 Baleno):"
      : "Enter vehicle number & model (e.g. RJ 14 CQ 2182 Baleno):";
    const res = prompt(promptMsg, "RJ ");
    if (res && res.trim() && res.trim() !== "RJ") {
      list.push(res.trim());
      savePlotVehicles(plot, list);
      renderDirectory();
    }
  };

  window.deleteVehicle = function(plot, idx) {
    const confirmMsg = currentLang === "hi" 
      ? "क्या आप इस वाहन को हटाना चाहते हैं?" 
      : "Remove this vehicle?";
    if (!confirm(confirmMsg)) return;

    const defaultData = RESIDENTS_DATA.find(r => r.plot === plot);
    const list = getPlotVehicles(plot, (defaultData && defaultData.vehicles) || []);
    if (idx >= 0 && idx < list.length) {
      list.splice(idx, 1);
      savePlotVehicles(plot, list);
      renderDirectory();
    }
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

      window.showPortalNotification(
        `Plot ${plot} Issue Logged`,
        newIssue.caption || "A new photo/video issue was recorded.",
        { tag: `issue-${newIssue.id}` }
      );
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
  const slideshowCaptionEdit = document.getElementById("slideshow-caption-edit");
  const slideshowCaptionInput = document.getElementById("slideshow-caption-input");
  const slideshowCaptionStatus = document.getElementById("slideshow-caption-status");
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

  window.openPlotPhotoSlideshow = function(plot) {
    const r = RESIDENTS_DATA.find(item => item.plot === plot);
    if (!r) return;
    const isPhotoDeleted = getDeletedPlotPhotos().includes(r.plotPhoto || r.photoUrl) || 
      localStorage.getItem(`arjunpuri_plot_photo_deleted_${plot}`) === "true";
    if (isPhotoDeleted) return;

    let photos = r.plotPhotos && r.plotPhotos.length > 0 
      ? r.plotPhotos 
      : (r.plotPhoto || r.photoUrl ? [r.plotPhoto || r.photoUrl] : []);
    photos = photos.filter(p => !getDeletedPlotPhotos().includes(p));
    if (photos.length === 0) return;

    activeSlideshowPlot = plot;
    activeSlideshowIssues = photos.map((pUrl, idx) => ({
      url: pUrl,
      type: "image",
      caption: `Plot ${plot}`,
      filepath: "",
      isPlotPhoto: true
    }));
    activeSlideshowIndex = 0;
    if (slideshowModal) slideshowModal.style.display = "flex";
    updateSlideshowUI();
  };

  window.closeSlideshow = function() {
    if (slideshowModal) slideshowModal.style.display = "none";
    if (slideshowMediaWrapper) slideshowMediaWrapper.innerHTML = "";
    if (slideshowCaptionInput) slideshowCaptionInput.value = "";
    if (slideshowCaptionStatus) slideshowCaptionStatus.innerHTML = "";
    activeSlideshowPlot = null;
    activeSlideshowIssues = [];
  };

  window.navigateSlideshow = function(direction) {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) return;
    const len = activeSlideshowIssues.length;
    activeSlideshowIndex = (activeSlideshowIndex + direction + len) % len;
    updateSlideshowUI();
  };

  window.handleCaptionInput = function(val) {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) return;
    const issue = activeSlideshowIssues[activeSlideshowIndex];
    if (!issue || issue.isPlotPhoto || activeSlideshowPlot === "Progress") return;
    const key = issue.id || issue.url;
    issue.caption = val;
    saveEditedIssueCaption(key, val);
  };

  window.saveCurrentIssueCaption = async function() {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) return;
    const issue = activeSlideshowIssues[activeSlideshowIndex];
    if (!issue || issue.isPlotPhoto || activeSlideshowPlot === "Progress") return;

    const input = document.getElementById("slideshow-caption-input");
    const val = input ? input.value.trim() : (issue.caption || "");
    const key = issue.id || issue.url;

    issue.caption = val;
    saveEditedIssueCaption(key, val);

    if (issue.isCustom && issue.id) {
      await mediaDB.addIssue(issue);
      if (CLIENT_ISSUES[activeSlideshowPlot]) {
        const found = CLIENT_ISSUES[activeSlideshowPlot].find(i => i.id === issue.id);
        if (found) found.caption = val;
      }
    }

    renderDirectory();

    const statusEl = document.getElementById("slideshow-caption-status");
    if (statusEl) {
      statusEl.innerHTML = `<span class="material-symbols-rounded" style="font-size: 14px; vertical-align: middle;">check_circle</span> Saved`;
      setTimeout(() => {
        if (statusEl) statusEl.innerHTML = "";
      }, 2000);
    }
  };

  function updateSlideshowUI() {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) {
      closeSlideshow();
      return;
    }
    const issue = activeSlideshowIssues[activeSlideshowIndex];
    if (slideshowPlotTitle) {
      if (activeSlideshowPlot === "Progress") {
        slideshowPlotTitle.textContent = `${t("dockProgress")} Milestone`;
      } else if (issue.isPlotPhoto) {
        slideshowPlotTitle.textContent = `Plot ${activeSlideshowPlot}`;
      } else {
        slideshowPlotTitle.textContent = `Plot ${activeSlideshowPlot}`;
      }
    }
    if (slideshowCounter) {
      slideshowCounter.textContent = `${activeSlideshowIndex + 1} of ${activeSlideshowIssues.length}`;
    }

    const isIssuePhoto = !issue.isPlotPhoto && activeSlideshowPlot !== "Progress";
    if (isIssuePhoto) {
      if (slideshowCaption) slideshowCaption.style.display = "none";
      if (slideshowCaptionEdit) slideshowCaptionEdit.style.display = "flex";
      if (slideshowCaptionInput) {
        slideshowCaptionInput.value = issue.caption || "";
      }
      if (slideshowCaptionStatus) {
        slideshowCaptionStatus.innerHTML = "";
      }
    } else {
      if (slideshowCaptionEdit) slideshowCaptionEdit.style.display = "none";
      if (slideshowCaption) {
        slideshowCaption.style.display = "block";
        if (issue.isPlotPhoto) {
          slideshowCaption.textContent = `Plot ${activeSlideshowPlot}`;
        } else {
          slideshowCaption.textContent = issue.caption || `Plot ${activeSlideshowPlot}`;
        }
      }
    }

    if (slideshowFilepath) {
      slideshowFilepath.textContent = "";
    }

    if (slideshowMediaWrapper) {
      if (issue.type === "video") {
        slideshowMediaWrapper.innerHTML = `
          <video src="${issue.url}" controls autoplay playsinline style="max-width: 100%; max-height: 100%;"></video>
        `;
      } else {
        slideshowMediaWrapper.innerHTML = `
          <img src="${issue.url}" alt="${issue.caption || 'Photo'}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        `;
      }
    }

    // Download Handler
    if (slideshowDownloadBtn) {
      slideshowDownloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = issue.url;
        a.download = `arjunpuri_plot_${activeSlideshowPlot}_${activeSlideshowIndex + 1}${issue.type === 'video' ? '.mp4' : '.jpg'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }

    // Delete Handler (for all photos: plot photo, issues, or progress)
    if (slideshowDeleteBtn) {
      slideshowDeleteBtn.style.display = "inline-flex";
      slideshowDeleteBtn.onclick = () => window.deleteActiveSlideshowPhoto();
    }
    const slideshowDeleteBtnTop = document.getElementById("slideshow-delete-btn-top");
    if (slideshowDeleteBtnTop) {
      slideshowDeleteBtnTop.style.display = "inline-flex";
      slideshowDeleteBtnTop.onclick = () => window.deleteActiveSlideshowPhoto();
    }
  }

  // Universal Delete Action for Active Slideshow Photo
  window.deleteActiveSlideshowPhoto = async function() {
    if (!activeSlideshowIssues || activeSlideshowIssues.length === 0) return;
    const issue = activeSlideshowIssues[activeSlideshowIndex];
    if (!issue) return;

    const confirmMsg = currentLang === "hi" 
      ? "क्या आप इस फ़ोटो को हटाना चाहते हैं?" 
      : "Delete this photo?";
    if (!confirm(confirmMsg)) return;

    if (issue.isPlotPhoto) {
      saveDeletedPlotPhoto(issue.url, activeSlideshowPlot);
      closeSlideshow();
      renderDirectory();
      return;
    }

    if (activeSlideshowPlot === "Progress") {
      const targetUrl = issue.url;
      const customIdx = customProgressData.findIndex(m => m.photoUrl === targetUrl);
      if (customIdx >= 0) {
        customProgressData[customIdx].photoUrl = "";
        try {
          localStorage.setItem("arjunpuri_custom_progress", JSON.stringify(customProgressData));
        } catch (e) {}
      }
      saveDeletedMilestonePhoto(targetUrl);
      closeSlideshow();
      renderProgress();
    } else {
      if (issue.isCustom && issue.id) {
        await mediaDB.deleteIssue(issue.id);
        CLIENT_ISSUES[activeSlideshowPlot] = (CLIENT_ISSUES[activeSlideshowPlot] || []).filter(i => i.id !== issue.id);
      } else {
        saveDeletedStaticIssue(issue.url);
      }
      activeSlideshowIssues = getAllPlotIssues(activeSlideshowPlot);
      if (activeSlideshowIssues.length === 0) {
        closeSlideshow();
      } else {
        activeSlideshowIndex = Math.min(activeSlideshowIndex, activeSlideshowIssues.length - 1);
        updateSlideshowUI();
      }
      renderDirectory();
    }
  };

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

    RESIDENTS_DATA.forEach(r => {
      r.vehicles = getPlotVehicles(r.plot, r.vehicles || []);
      const savedTenants = getPlotTenantCount(r.plot, null);
      if (savedTenants !== null) {
        r.tenantCount = savedTenants;
        r.hasTenant = savedTenants > 0;
      }
    });

    let filtered = RESIDENTS_DATA.filter(r => {
      // Filter Pill logic
      if (currentFilter === "vehicles" && (!r.vehicles || r.vehicles.length === 0)) return false;
      if (currentFilter === "tenants" && !r.hasTenant) return false;
      if (currentFilter === "encroachment" && !r.hasEncroachment) return false;
      if (currentFilter === "nuisance") {
        const nAlert = getPlotNuisance(r.plot, r.nuisanceAlert || "");
        if (!nAlert || !nAlert.trim()) return false;
      }
      if (currentFilter === "verified" && (!r.hasTenant || !r.policeVerified)) return false;

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
        const savedNuisance = getPlotNuisance(r.plot, r.nuisanceAlert || "");
        const matchNuisance = savedNuisance && savedNuisance.toLowerCase().includes(q);
        const matchTenant = r.tenantInfo && r.tenantInfo.toLowerCase().includes(q);
        return matchPlot || matchName || matchPhone || matchMembers || matchVehicles || matchNotes || matchNuisance || matchTenant;
      }
      return true;
    });

    if (plotCounter) {
      if (currentFilter === "all" && !searchQuery) {
        plotCounter.textContent = `${RESIDENTS_DATA.length} ${t("plotsCount")}`;
      } else {
        plotCounter.textContent = `${filtered.length} / ${RESIDENTS_DATA.length} ${t("plotsCount")}`;
      }
    }

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

      const plotPhotoSrc = r.plotPhoto || r.photoUrl;
      const isPhotoDeleted = getDeletedPlotPhotos().includes(plotPhotoSrc) || 
        localStorage.getItem(`arjunpuri_plot_photo_deleted_${r.plot}`) === "true";
      const avatarHtml = (!isPhotoDeleted && plotPhotoSrc)
        ? `<div class="row-avatar" onclick="event.stopPropagation(); openPlotPhotoSlideshow('${r.plot}')" title="Click to view Plot ${r.plot} photo"><img src="${plotPhotoSrc}" alt="${surnameDisplay}"></div>`
        : `<div class="row-avatar">${initials}</div>`;

      const nuisanceAlertVal = getPlotNuisance(r.plot, r.nuisanceAlert || "");
      const tenantCountVal = getPlotTenantCount(r.plot, r.tenantCount || 0);

      // Badges & Filter callouts
      let badgesHtml = '';
      if (currentFilter === "vehicles" && r.vehicles && r.vehicles.length > 0) {
        badgesHtml += `<div class="filter-detail-badge vehicles"><span class="material-symbols-rounded" style="font-size: 13px;">directions_car</span> ${r.vehicles.join(" • ")}</div>`;
      } else if (currentFilter === "tenants" && r.hasTenant) {
        badgesHtml += `<div class="filter-detail-badge tenants"><span class="material-symbols-rounded" style="font-size: 13px;">key</span> ${r.tenantInfo || (r.tenantCount + ' Tenants')}</div>`;
      } else if (currentFilter === "encroachment" && r.hasEncroachment) {
        badgesHtml += `<div class="filter-detail-badge encroachment"><span class="material-symbols-rounded" style="font-size: 13px;">report</span> ${r.encroachmentType || 'Atikraman'}</div>`;
      } else if (currentFilter === "nuisance") {
        if (nuisanceAlertVal && nuisanceAlertVal.trim()) {
          badgesHtml += `<div class="filter-detail-badge nuisance"><span class="material-symbols-rounded" style="font-size: 13px;">warning</span> ${nuisanceAlertVal}</div>`;
        }
      } else if (currentFilter === "verified" && r.hasTenant && r.policeVerified) {
        badgesHtml += `<div class="filter-detail-badge tenants"><span class="material-symbols-rounded" style="font-size: 13px;">verified</span> Verified (${r.tenantCount || 1} Tenants)</div>`;
      } else {
        if (r.hasEncroachment) {
          const encLabel = r.encroachmentType || "Atikraman";
          badgesHtml += `<span class="icon-encroach" title="Atikraman (अतिक्रमण): ${encLabel}"><span class="material-symbols-rounded">report</span></span>`;
        }
        if (nuisanceAlertVal && nuisanceAlertVal.trim()) {
          badgesHtml += `<span class="icon-nuisance" title="${nuisanceAlertVal}"><span class="material-symbols-rounded">warning</span></span>`;
        }
        if (r.hasTenant) {
          const tenantStr = tenantCountVal ? `${tenantCountVal} ${t("tenantsText")}` : t("tenantsText");
          badgesHtml += `<span class="badge-tenant" id="badge-tenant-${safePlot}">${tenantStr}</span>`;
        } else {
          badgesHtml += `<span class="badge-tenant" id="badge-tenant-${safePlot}" style="display: none;">0 ${t("tenantsText")}</span>`;
        }
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
            <!-- Compact Governance Counters (Warnings & Tenants) -->
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

              <div class="counter-box tenant-counter-box">
                <span class="counter-label">${t("tenantsText")}</span>
                <div class="stepper-controls">
                  <button class="stepper-btn minus" onclick="updateCounter('${r.plot}', 'tenants', -1)" title="Decrease Tenants">
                    <span class="material-symbols-rounded" style="font-size: 13px;">remove</span>
                  </button>
                  <span class="stepper-value" id="val-tenants-${safePlot}">${tenantCountVal}</span>
                  <button class="stepper-btn plus" onclick="updateCounter('${r.plot}', 'tenants', 1)" title="Increase Tenants">
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

            <!-- Registered Vehicles (Editable, Add & Delete) -->
            <div class="vehicles-section" id="vehicles-section-${safePlot}">
              <div class="vehicles-header">
                <div class="vehicles-header-title">
                  <span class="material-symbols-rounded">directions_car</span>
                  <span>${t("carsVehicles")}</span>
                  <span class="vehicles-count-badge" id="vehicles-count-${safePlot}">(${(r.vehicles || []).length})</span>
                </div>
                <button class="btn-add-vehicle" onclick="addVehicle('${r.plot}')" title="Add Vehicle">
                  <span class="material-symbols-rounded">add</span>
                  <span>Add</span>
                </button>
              </div>
              <div class="vehicles-list" id="vehicles-list-${safePlot}">
                ${(!r.vehicles || r.vehicles.length === 0) ? `
                  <div class="no-vehicles-text">${currentLang === "hi" ? "कोई वाहन दर्ज नहीं" : "No registered vehicles"}</div>
                ` : r.vehicles.map((v, idx) => `
                  <div class="vehicle-item-row" id="vehicle-row-${safePlot}-${idx}">
                    <span class="material-symbols-rounded vehicle-car-icon">directions_car</span>
                    <input 
                      type="text" 
                      class="vehicle-input" 
                      id="vehicle-input-${safePlot}-${idx}" 
                      value="${v.replace(/"/g, '&quot;')}" 
                      placeholder="e.g. RJ 14 CQ 1234 (Model)"
                      oninput="handleVehicleInput('${r.plot}', ${idx}, this.value)"
                      onchange="saveVehicleEdit('${r.plot}', ${idx})"
                      onkeydown="if(event.key==='Enter'){saveVehicleEdit('${r.plot}', ${idx}); this.blur();}"
                    />
                    <button class="btn-vehicle-action save" onclick="saveVehicleEdit('${r.plot}', ${idx})" title="Save">
                      <span class="material-symbols-rounded">check</span>
                    </button>
                    <button class="btn-vehicle-action delete" onclick="deleteVehicle('${r.plot}', ${idx})" title="Delete">
                      <span class="material-symbols-rounded">delete</span>
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>

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

            <!-- Public Nuisance Alert (Editable) -->
            <div class="editable-notes-section nuisance-section" onclick="event.stopPropagation()">
              <div class="notes-header">
                <div class="notes-header-left">
                  <span class="material-symbols-rounded" style="font-size: 16px; color: var(--gold);">warning</span>
                  <span>${t("nuisanceLabel")}</span>
                </div>
                <button class="btn-save-note" onclick="saveNuisance('${r.plot}')" title="Save Nuisance Alert">
                  <span class="material-symbols-rounded" style="font-size: 14px;">check</span>
                  <span>${t("save")}</span>
                </button>
              </div>
              <textarea 
                id="nuisance-input-${safePlot}" 
                class="note-textarea nuisance-textarea" 
                placeholder="${t("nuisancePlaceholder")}" 
                rows="2"
                oninput="handleNuisanceInput('${r.plot}')"
              >${nuisanceAlertVal}</textarea>
              <div class="note-save-status" id="nuisance-status-${safePlot}"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Row Expand Toggle
  window.toggleRowExpand = function(rowEl) {
    rowEl.classList.toggle("expanded");
  };

  // Progress Timeline View & Form Management (customProgressData declared above)
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

    window.showPortalNotification(
      `New Milestone: ${newMilestone.title}`,
      newMilestone.note || "New civic milestone added to Arjunpuri 1st.",
      { tag: `prog-${newMilestone.id}` }
    );
  };

  let editingProgressId = null;

  function getDeletedMilestoneIds() {
    try {
      return JSON.parse(localStorage.getItem("arjunpuri_deleted_milestone_ids")) || [];
    } catch (e) {
      return [];
    }
  }

  function getEditedMilestones() {
    try {
      return JSON.parse(localStorage.getItem("arjunpuri_edited_milestones")) || {};
    } catch (e) {
      return {};
    }
  }

  window.startEditProgress = function(id) {
    editingProgressId = id;
    renderProgress();
  };

  window.cancelEditProgress = function() {
    editingProgressId = null;
    renderProgress();
  };

  window.saveEditProgress = function(id) {
    const dateEl = document.getElementById(`edit-prog-date-${id}`);
    const statusEl = document.getElementById(`edit-prog-status-${id}`);
    const titleEl = document.getElementById(`edit-prog-title-${id}`);
    const noteEl = document.getElementById(`edit-prog-note-${id}`);
    if (!titleEl || !noteEl) return;

    const newDate = dateEl ? dateEl.value.trim() : "";
    const newStatus = statusEl ? statusEl.value.trim() : "Completed";
    const newTitle = titleEl.value.trim();
    const newNote = noteEl.value.trim();
    if (!newTitle) return;

    // If custom progress milestone, also update customProgressData
    const cIdx = customProgressData.findIndex(m => m.id === id);
    if (cIdx >= 0) {
      customProgressData[cIdx].title = newTitle;
      customProgressData[cIdx].note = newNote;
      if (newDate) customProgressData[cIdx].date = newDate;
      if (newStatus) customProgressData[cIdx].status = newStatus;
      try {
        localStorage.setItem("arjunpuri_custom_progress", JSON.stringify(customProgressData));
      } catch (e) {}
    }

    // Always record in editedMilestones
    const edited = getEditedMilestones();
    edited[id] = {
      date: newDate,
      status: newStatus,
      title: newTitle,
      note: newNote
    };
    try {
      localStorage.setItem("arjunpuri_edited_milestones", JSON.stringify(edited));
    } catch (e) {}

    editingProgressId = null;
    renderProgress();
  };

  window.deleteProgress = function(id) {
    const confirmMsg = currentLang === "hi" 
      ? "क्या आप इस प्रगति माइलस्टोन को हटाना चाहते हैं?" 
      : "Are you sure you want to delete this progress milestone?";
    if (!confirm(confirmMsg)) return;

    const sId = String(id);

    // Check if custom
    const cIdx = customProgressData.findIndex(m => String(m.id) === sId);
    if (cIdx >= 0) {
      customProgressData.splice(cIdx, 1);
      try {
        localStorage.setItem("arjunpuri_custom_progress", JSON.stringify(customProgressData));
      } catch (e) {}
    }

    // Also remove from edited map if it was edited
    const edited = getEditedMilestones();
    if (edited[sId]) {
      delete edited[sId];
      try {
        localStorage.setItem("arjunpuri_edited_milestones", JSON.stringify(edited));
      } catch (e) {}
    }

    // Also mark in deleted ids
    const deletedIds = getDeletedMilestoneIds().map(String);
    if (!deletedIds.includes(sId)) {
      deletedIds.push(sId);
      try {
        localStorage.setItem("arjunpuri_deleted_milestone_ids", JSON.stringify(deletedIds));
      } catch (e) {}
    }

    if (editingProgressId === id) editingProgressId = null;
    renderProgress();
  };

  function escapeProgressAttr(str) {
    return (str || "").replace(/"/g, '&quot;');
  }

  function escapeProgressText(str) {
    return (str || "").replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderProgress() {
    if (!progressTimelineList) return;

    const delMilestonePhotos = getDeletedMilestonePhotos();
    const delMilestoneIds = getDeletedMilestoneIds();
    const editedMap = getEditedMilestones();

    const defaultMilestones = (typeof PROGRESS_DATA !== "undefined" ? PROGRESS_DATA : (window.PROGRESS_DATA || []));
    const rawList = [...customProgressData, ...defaultMilestones];
    const allMilestones = rawList
      .filter(m => !delMilestoneIds.includes(m.id))
      .map(m => {
        let item = { ...m };
        if (editedMap[m.id]) {
          item = { ...item, ...editedMap[m.id] };
        }
        if (item.photoUrl && delMilestonePhotos.includes(item.photoUrl)) {
          item.photoUrl = "";
        }
        return item;
      });

    allMilestones.sort((a, b) => new Date(b.date) - new Date(a.date));

    let filtered = allMilestones;
    if (searchQuery) {
      filtered = filtered.filter(m => 
        (m.title || "").toLowerCase().includes(searchQuery) ||
        (m.note || "").toLowerCase().includes(searchQuery) ||
        (m.date || "").includes(searchQuery)
      );
    }

    if (filtered.length === 0) {
      progressTimelineList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 38px; color: var(--text-dim); margin-bottom: 0.4rem;">history_toggle_off</span>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--text-main);">${currentLang === "hi" ? "कोई प्रगति माइलस्टोन नहीं मिला" : "No progress milestones found"}</p>
        </div>
      `;
      return;
    }

    progressTimelineList.innerHTML = filtered.map(m => {
      const isEditing = editingProgressId === m.id;

      if (isEditing) {
        return `
          <div class="timeline-item" id="milestone-${m.id}">
            <div class="timeline-marker"></div>
            <div class="timeline-card">
              <div class="timeline-inline-edit" onclick="event.stopPropagation()">
                <div style="font-size: 0.76rem; font-weight: 700; color: var(--gold); margin-bottom: 0.15rem;">
                  <span class="material-symbols-rounded" style="font-size: 14px; vertical-align: middle;">edit</span>
                  ${currentLang === "hi" ? "माइलस्टोन संपादित करें" : "Edit Milestone"}
                </div>
                <div class="inline-edit-row">
                  <input type="date" class="progress-input-sm" id="edit-prog-date-${m.id}" value="${m.date}">
                  <input type="text" class="progress-input-sm" id="edit-prog-status-${m.id}" value="${escapeProgressAttr(m.status || 'Completed')}" placeholder="Status">
                </div>
                <input type="text" class="progress-input-sm" id="edit-prog-title-${m.id}" value="${escapeProgressAttr(m.title)}" placeholder="Milestone Title">
                <textarea class="progress-textarea-sm" id="edit-prog-note-${m.id}" rows="3" placeholder="Milestone Details">${escapeProgressText(m.note)}</textarea>
                <div class="inline-edit-actions">
                  <button class="btn-progress-save" onclick="saveEditProgress('${m.id}')">
                    <span class="material-symbols-rounded" style="font-size: 14px;">check</span> ${currentLang === "hi" ? "सहेजें" : "Save"}
                  </button>
                  <button class="btn-progress-cancel" onclick="cancelEditProgress()">
                    <span class="material-symbols-rounded" style="font-size: 14px;">close</span> ${currentLang === "hi" ? "रद्द करें" : "Cancel"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div class="timeline-item" id="milestone-${m.id}">
          <div class="timeline-marker"></div>
          <div class="timeline-card">
            <div class="timeline-top-row">
              <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap;">
                <span class="timeline-date-badge">${m.date}</span>
                <span class="timeline-status-badge">${m.status || "Completed"}</span>
              </div>
              <div class="timeline-card-actions" onclick="event.stopPropagation()">
                <button class="btn-card-action edit" onclick="startEditProgress('${m.id}')" title="${currentLang === "hi" ? "संपादित करें" : "Edit"}">
                  <span class="material-symbols-rounded">edit</span>
                </button>
                <button class="btn-card-action delete" onclick="deleteProgress('${m.id}')" title="${currentLang === "hi" ? "हटाएं" : "Delete"}">
                  <span class="material-symbols-rounded">delete</span>
                </button>
              </div>
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
      `;
    }).join("");
  }

  // -------------------------------------------------------------
  // 9. Grievances Renderer
  // -------------------------------------------------------------
  function renderGrievances() {
    if (!grievanceList) return;
    const subTitle = document.querySelector("#view-grievances div");
    if (subTitle) subTitle.textContent = t("grievanceSub");

    grievanceList.innerHTML = GRIEVANCE_PORTALS.map(g => {
      const isWa = g.url && g.url.includes("wa.me");
      let actionText = "Portal";
      let actionIcon = "open_in_new";
      let actionClass = "btn-open-sm";

      if (isWa) {
        actionText = currentLang === "hi" ? "व्हाट्सएप" : "WhatsApp";
        actionIcon = "chat";
        actionClass = "btn-open-sm wa";
      } else if (g.dept.includes("Smart Meter")) {
        actionText = "Smart Meter";
      } else if (g.dept.includes("PHED") || g.dept.includes("Jal Vibhag")) {
        actionText = currentLang === "hi" ? "पानी 181" : "Water 181";
      } else if (g.dept.includes("Sampark")) {
        actionText = "Sampark 181";
      } else if (g.dept.includes("JDA")) {
        actionText = "JDA Portal";
      } else {
        actionText = currentLang === "hi" ? "पोर्टल" : "Portal";
      }

      const callText = currentLang === "hi" ? "कॉल" : "Call";
      const callDisplay = g.tollFree.length <= 5 ? `${callText} ${g.tollFree}` : callText;

      return `
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
          <div class="grievance-actions">
            <a href="${g.url}" target="_blank" class="${actionClass}">
              <span class="material-symbols-rounded">${actionIcon}</span>
              <span>${actionText}</span>
            </a>
            <a href="tel:${g.tollFree}" class="btn-call-sm" title="${t("call")}">
              <span class="material-symbols-rounded">call</span>
              <span>${callDisplay}</span>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  // -------------------------------------------------------------
  // 10. Contacts Renderer & Custom Contacts Management
  // -------------------------------------------------------------
  window.toggleAddContactForm = function(force) {
    const card = document.getElementById("contact-form-card");
    const label = document.getElementById("label-add-contact");
    if (!card) return;
    const isShow = typeof force === "boolean" ? force : (card.style.display === "none");
    card.style.display = isShow ? "block" : "none";
    if (label) {
      label.textContent = isShow 
        ? (currentLang === "hi" ? "फॉर्म बंद करें" : "Close Form")
        : (currentLang === "hi" ? "नया संपर्क जोड़ें" : "Add Contact");
    }
  };

  window.handleAddContactSubmit = function(e) {
    if (e) e.preventDefault();
    const nameEl = document.getElementById("contact-name");
    const roleEl = document.getElementById("contact-role");
    const phoneEl = document.getElementById("contact-phone");
    const catEl = document.getElementById("contact-category");
    const dutyEl = document.getElementById("contact-duty");
    if (!nameEl || !roleEl || !phoneEl) return;

    const name = nameEl.value.trim();
    const role = roleEl.value.trim();
    const phone = phoneEl.value.trim();
    const rawPhone = phone.replace(/[^0-9]/g, "");
    const category = catEl ? catEl.value : "trade";
    const duty = dutyEl ? dutyEl.value.trim() : role;
    if (!name || !phone) return;

    const newContact = {
      id: "contact_" + Date.now(),
      name: name,
      role: role,
      phone: phone,
      rawPhone: rawPhone,
      category: category,
      icon: category === "authority" ? "badge" : "handyman",
      office: category === "authority" ? "Official Authority" : "Local Services",
      duty: duty,
      isCustom: true
    };

    customContacts.unshift(newContact);
    try {
      localStorage.setItem("arjunpuri_custom_contacts", JSON.stringify(customContacts));
    } catch (err) {}

    nameEl.value = "";
    roleEl.value = "";
    phoneEl.value = "";
    if (dutyEl) dutyEl.value = "";
    toggleAddContactForm(false);
    renderContacts();
  };

  window.deleteCustomContact = function(id) {
    const confirmMsg = currentLang === "hi" 
      ? "क्या आप इस संपर्क को हटाना चाहते हैं?" 
      : "Delete this contact?";
    if (!confirm(confirmMsg)) return;

    customContacts = customContacts.filter(c => c.id !== id);
    try {
      localStorage.setItem("arjunpuri_custom_contacts", JSON.stringify(customContacts));
    } catch (e) {}
    renderContacts();
  };

  function renderContacts() {
    if (!contactsList) return;
    const subTitle = document.querySelector("#view-contacts .contacts-top-bar div");
    if (subTitle) subTitle.textContent = t("contactsSub");

    let allContacts = [...customContacts, ...CIVIC_AND_TRADE_CONTACTS];
    let filtered = allContacts;
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
              <span class="material-symbols-rounded">${c.icon || "contacts"}</span>
            </div>
            <div>
              <div class="utility-title">${c.name} ${c.isCustom ? `<span style="font-size: 0.68rem; padding: 2px 6px; background: rgba(234,179,8,0.15); color: var(--gold); border-radius: 4px; font-weight: 700;">Custom</span>` : ''}</div>
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
            ${c.isCustom ? `
              <button class="btn-delete-contact" onclick="deleteCustomContact('${c.id}')" title="Delete Contact">
                <span class="material-symbols-rounded" style="font-size: 17px;">delete</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // -------------------------------------------------------------
  // Notification Access & Service Worker System
  // -------------------------------------------------------------
  async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("./sw.js");
      } catch (err) {
        console.warn("ServiceWorker registration:", err);
      }
    }
  }

  function updateNotificationUI() {
    if (!("Notification" in window)) {
      if (notifToggleBtn) notifToggleBtn.style.display = "none";
      if (notifBanner) notifBanner.style.display = "none";
      return;
    }

    const permission = Notification.permission;
    if (permission === "granted") {
      if (notifIcon) notifIcon.textContent = "notifications_active";
      if (notifToggleBtn) {
        notifToggleBtn.classList.add("active");
        notifToggleBtn.setAttribute("title", t("notifStatusActive"));
      }
      if (notifBanner) notifBanner.style.display = "none";
    } else if (permission === "denied") {
      if (notifIcon) notifIcon.textContent = "notifications_off";
      if (notifToggleBtn) {
        notifToggleBtn.classList.remove("active");
        notifToggleBtn.setAttribute("title", "Notifications blocked (reset in browser settings)");
      }
      if (notifBanner) notifBanner.style.display = "none";
    } else {
      if (notifIcon) notifIcon.textContent = "notifications";
      if (notifToggleBtn) {
        notifToggleBtn.classList.remove("active");
        notifToggleBtn.setAttribute("title", "Enable Notifications");
      }
      let dismissed = false;
      try {
        dismissed = localStorage.getItem("arjunpuri_notif_banner_dismissed") === "true";
      } catch (e) {}

      if (!dismissed && notifBanner) {
        setTimeout(() => {
          if (typeof Notification !== "undefined" && Notification.permission === "default" && notifBanner) {
            notifBanner.style.display = "flex";
          }
        }, 1500);
      }
    }
  }

  window.requestNotificationAccess = async function() {
    if (!("Notification" in window)) {
      alert("This browser does not support web notifications.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      updateNotificationUI();
      if (permission === "granted") {
        if (notifBanner) notifBanner.style.display = "none";
        window.showPortalNotification(
          t("notifGrantedTitle"),
          t("notifGrantedMsg"),
          { tag: "arjunpuri-welcome" }
        );
      } else if (permission === "denied") {
        if (notifBanner) notifBanner.style.display = "none";
      }
    } catch (e) {
      console.warn("Notification request error:", e);
    }
  };

  window.handleNotifBtnClick = function() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      window.showPortalNotification(
        t("notifGrantedTitle"),
        t("notifStatusActive"),
        { tag: "arjunpuri-status" }
      );
    } else {
      window.requestNotificationAccess();
    }
  };

  window.dismissNotifBanner = function() {
    if (notifBanner) notifBanner.style.display = "none";
    try {
      localStorage.setItem("arjunpuri_notif_banner_dismissed", "true");
    } catch (e) {}
  };

  window.showPortalNotification = async function(title, body, options = {}) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    const notifOpts = {
      body: body,
      icon: "map.jpg",
      badge: "map.jpg",
      tag: options.tag || "arjunpuri-update",
      vibrate: [200, 100, 200],
      ...options
    };

    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          reg.showNotification(title, notifOpts);
          return;
        }
      } catch (e) {}
    }

    try {
      new Notification(title, notifOpts);
    } catch (e) {}
  };

  // Register service worker and initialize notification state
  registerServiceWorker();
  updateNotificationUI();

  // Initial Language Setup & Render
  applyLanguage(currentLang);
});
