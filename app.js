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

  // Instant Universal Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle("active", searchQuery.length > 0);
      }
      renderDirectory();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.classList.remove("active");
        renderDirectory();
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
        const matchName = r.name.toLowerCase().includes(q);
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
      // Monogram Initials or Photo
      const initials = r.name
        .split(" ")
        .filter(w => w.length > 0 && !["and", "&", "the", "a", "sahab's"].includes(w.toLowerCase()))
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join("") || r.plot;

      const avatarHtml = r.photoUrl
        ? `<div class="row-avatar"><img src="${r.photoUrl}" alt="${r.name}"></div>`
        : `<div class="row-avatar">${initials}</div>`;

      // Micro badges
      let badgesHtml = '';
      if (r.hasEncroachment) {
        badgesHtml += `<span class="badge-encroach">Aakraman</span>`;
      }
      if (r.hasTenant) {
        badgesHtml += `<span class="badge-tenant">${r.tenantCount ? r.tenantCount + ' Tenants' : 'Tenant'}</span>`;
      }
      if (r.nuisanceAlert) {
        badgesHtml += `<span class="badge-nuisance" title="${r.nuisanceAlert}"><span class="material-symbols-rounded" style="font-size: 11px;">warning</span>Nuisance</span>`;
      }

      // Vehicles line
      const vehicleHtml = (r.vehicles && r.vehicles.length > 0)
        ? `<div class="vehicle-line">
             <span class="material-symbols-rounded">directions_car</span>
             <span class="vehicle-highlight">${r.vehicles.join(" • ")}</span>
           </div>`
        : `<div class="vehicle-line" style="color: var(--text-dim);">
             <span class="material-symbols-rounded" style="color: var(--text-dim);">no_crash</span>
             <span>No vehicle</span>
           </div>`;

      // 1-Tap Action URLs
      const msgText = encodeURIComponent(`Namaste ${r.name} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);

      return `
        <div class="plot-row" data-plot="${r.plot}" onclick="toggleRowExpand(this)">
          <div class="row-main">
            <div class="row-left">
              <div class="plot-tag">${r.plot}</div>
              ${avatarHtml}
              <div class="row-info">
                <div class="name-line">
                  <span class="name-text">${r.name}</span>
                  ${badgesHtml}
                </div>
                ${vehicleHtml}
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
                <span class="material-symbols-rounded">chat</span>
              </a>
            </div>
          </div>

          <!-- Seamless Accordion Details on Tap -->
          <div class="row-details">
            <div class="detail-item">
              <span>Relation / Occupancy:</span>
              <span>${r.relation}</span>
            </div>
            <div class="detail-item">
              <span>Police Verification:</span>
              <span style="color: ${r.policeVerified ? 'var(--emerald)' : 'var(--gold)'}; font-weight: 700;">
                ${r.policeVerifRef}
              </span>
            </div>
            <div class="detail-item">
              <span>Electricity Sanction:</span>
              <span>${r.loadKw} &bull; ${r.meterType}</span>
            </div>
            ${r.notes ? `
              <div class="detail-item" style="flex-direction: column; align-items: flex-start; gap: 0.15rem;">
                <span>Notes:</span>
                <span style="color: var(--text-muted); font-weight: normal;">${r.notes}</span>
              </div>
            ` : ''}
            ${r.nuisanceAlert ? `
              <div class="detail-alert-box">
                <span class="material-symbols-rounded" style="font-size: 15px; color: var(--gold); flex-shrink: 0;">report_problem</span>
                <span><strong>Public Nuisance Alert:</strong> ${r.nuisanceAlert}</span>
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

    contactsList.innerHTML = CIVIC_AND_TRADE_CONTACTS.map(c => {
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
                <span class="material-symbols-rounded">chat</span>
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
