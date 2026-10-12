// Arjunpuri 1st — High Performance Minimalist Community App
document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentFilter = "all";
  let searchQuery = "";
  let currentTab = "directory";

  // Elements
  const directoryList = document.getElementById("directory-list");
  const grievanceList = document.getElementById("grievance-list");
  const contactsList = document.getElementById("contacts-list");
  const searchInput = document.getElementById("main-search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const filterPills = document.querySelectorAll("#filter-strip .micro-pill");
  const dockBtns = document.querySelectorAll(".bottom-dock .dock-btn");
  const plotCounter = document.getElementById("plot-counter");

  if (plotCounter) {
    plotCounter.textContent = `${RESIDENTS_DATA.length} Plots`;
  }

  // Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");

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

  // Instant Universal Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("active", searchQuery.length > 0);
      }
      if (currentTab === "contacts") {
        renderContacts();
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

      if (currentTab === "grievances") renderGrievances();
      if (currentTab === "contacts") renderContacts();
    });
  });

  // Render Directory
  // Official WhatsApp Vector Logo
  const WA_SVG = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:block;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.11.82.83-3.03-.19-.31a8.2 8.2 0 0 1-1.26-4.46c0-4.54 3.7-8.24 8.24-8.24m-3.55 4.14c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.02 2.84 1.16 3.03c.14.19 1.97 3.16 4.88 4.3 2.41.95 2.9.76 3.42.71.52-.05 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.22-.62.07-.29-.14-1.21-.45-2.31-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49z"/></svg>`;

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
        const matchVehicles = r.vehicles && r.vehicles.some(v => v.toLowerCase().includes(q));
        const matchNotes = r.notes && r.notes.toLowerCase().includes(q);
        const matchNuisance = r.nuisanceAlert && r.nuisanceAlert.toLowerCase().includes(q);
        const matchTenant = r.tenantInfo && r.tenantInfo.toLowerCase().includes(q);
        return matchPlot || matchName || matchPhone || matchVehicles || matchNotes || matchNuisance || matchTenant;
      }
      return true;
    });

    if (filtered.length === 0) {
      directoryList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 38px; color: var(--text-dim); margin-bottom: 0.4rem;">search_off</span>
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--text-main);">No matching plots found</p>
          <p style="font-size: 0.78rem;">Search by plot (20, 31), name, or vehicle number (8634, 9300)</p>
        </div>
      `;
      return;
    }

    directoryList.innerHTML = filtered.map(r => {
      // Surname for main title and monogram avatar
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

      // Outside icons / micro badges (Icon only for encroachment outside!)
      let badgesHtml = '';
      if (r.hasEncroachment) {
        const encLabel = r.encroachmentType || "Atikraman";
        badgesHtml += `<span class="icon-encroach" title="Atikraman (अतिक्रमण): ${encLabel}"><span class="material-symbols-rounded">report</span></span>`;
      }
      if (r.nuisanceAlert) {
        badgesHtml += `<span class="icon-nuisance" title="${r.nuisanceAlert}"><span class="material-symbols-rounded">warning</span></span>`;
      }
      if (r.hasTenant) {
        badgesHtml += `<span class="badge-tenant">${r.tenantCount ? r.tenantCount + ' Tenants' : 'Tenant'}</span>`;
      }

      // 1-Tap Action URLs
      const msgText = encodeURIComponent(`Namaste ${surnameDisplay} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);

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

            <!-- 3 Simple Micro-Buttons (Call, SMS, WhatsApp) -->
            <div class="row-actions" onclick="event.stopPropagation()">
              <a href="tel:${r.phone}" class="btn-icon call" title="Call">
                <span class="material-symbols-rounded">call</span>
              </a>
              <a href="sms:${r.rawPhone}?body=${msgText}" class="btn-icon sms" title="SMS">
                <span class="material-symbols-rounded">sms</span>
              </a>
              <a href="https://wa.me/${r.rawPhone}?text=${msgText}" target="_blank" class="btn-icon wa" title="WhatsApp">
                ${WA_SVG}
              </a>
            </div>
          </div>

          <!-- Seamless Accordion Details on Tap -->
          <div class="row-details">
            ${(r.vehicles && r.vehicles.length > 0) ? `
              <div class="detail-item" style="align-items: flex-start;">
                <span>Cars / Vehicles:</span>
                <span style="text-align: right; color: #f1f5f9; font-weight: 600;">
                  ${r.vehicles.map(v => `<div style="font-size: 0.76rem; line-height: 1.35;">${v}</div>`).join("")}
                </span>
              </div>
            ` : ''}
            <div class="detail-item">
              <span>Residents / Family:</span>
              <span style="color: #38bdf8;">${r.members || r.name}</span>
            </div>
            <div class="detail-item">
              <span>Status:</span>
              <span>${r.relation}</span>
            </div>
            ${r.hasTenant ? `
              <div class="detail-item">
                <span>Tenant Verification:</span>
                <span style="color: ${r.policeVerified ? 'var(--emerald)' : 'var(--gold)'}; font-weight: 700;">
                  ${r.policeVerifRef}
                </span>
              </div>
            ` : ''}
            ${r.hasEncroachment ? `
              <div class="detail-alert-box" style="border-color: rgba(244, 63, 94, 0.35); background: rgba(244, 63, 94, 0.08); color: #fca5a5;">
                <span class="material-symbols-rounded" style="font-size: 15px; color: var(--rose); flex-shrink: 0;">report</span>
                <span><strong>Atikraman (अतिक्रमण):</strong> ${r.encroachmentType || 'Lane obstruction recorded outside.'}</span>
              </div>
            ` : ''}
            ${r.nuisanceAlert ? `
              <div class="detail-alert-box">
                <span class="material-symbols-rounded" style="font-size: 15px; color: var(--gold); flex-shrink: 0;">warning</span>
                <span><strong>Public Nuisance Alert:</strong> ${r.nuisanceAlert}</span>
              </div>
            ` : ''}
            ${r.notes ? `
              <div class="detail-item" style="flex-direction: column; align-items: flex-start; gap: 0.15rem;">
                <span>Notes:</span>
                <span style="color: var(--text-muted); font-weight: normal;">${r.notes}</span>
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

  // Render Grievances
  function renderGrievances() {
    if (!grievanceList) return;

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
            Lodge
          </a>
          <a href="tel:${g.tollFree}" class="btn-icon call" title="Call Toll Free">
            <span class="material-symbols-rounded">call</span>
          </a>
        </div>
      </div>
    `).join("");
  }

  // Render Contacts
  function renderContacts() {
    if (!contactsList) return;

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
          <p style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">No matching contacts</p>
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
            <a href="tel:${c.rawPhone}" class="btn-icon call" title="Call">
              <span class="material-symbols-rounded">call</span>
            </a>
            ${c.rawPhone.length > 5 ? `
              <a href="sms:${c.rawPhone}?body=${waMsg}" class="btn-icon sms" title="SMS">
                <span class="material-symbols-rounded">sms</span>
              </a>
              <a href="https://wa.me/${c.rawPhone}?text=${waMsg}" target="_blank" class="btn-icon wa" title="WhatsApp">
                ${WA_SVG}
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // Initial Render
  renderDirectory();
});
