// Arjunpuri 1st Community Portal Logic
document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentTab = "directory";
  let currentFilter = "all";
  let searchQuery = "";
  let vehicleSearchQuery = "";

  // Elements
  const directoryGrid = document.getElementById("directory-grid");
  const vehiclesGrid = document.getElementById("vehicles-grid");
  const grievancePortalsList = document.getElementById("grievance-portals-list");
  const civicContactsList = document.getElementById("civic-contacts-list");
  const directorySearchInput = document.getElementById("directory-search");
  const vehicleSearchInput = document.getElementById("vehicle-search");
  const detailModal = document.getElementById("detail-modal");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const tabButtons = document.querySelectorAll("#section-tabs .tab-btn");
  const filterPills = document.querySelectorAll("#filter-pills .pill-btn");

  // Init Counts
  const totalPlotsCountEl = document.getElementById("total-plots-count");
  const verifiedPlotsCountEl = document.getElementById("verified-plots-count");
  if (totalPlotsCountEl) totalPlotsCountEl.textContent = RESIDENTS_DATA.length;
  if (verifiedPlotsCountEl) {
    const verified = RESIDENTS_DATA.filter(r => r.policeVerified).length;
    verifiedPlotsCountEl.textContent = verified;
  }

  // Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.dataset.tab;

      document.querySelectorAll(".tab-panel").forEach(panel => {
        panel.style.display = "none";
      });

      const activePanel = document.getElementById(`tab-content-${currentTab}`);
      if (activePanel) activePanel.style.display = "block";

      if (currentTab === "vehicles") renderVehicles();
      if (currentTab === "grievances") renderGrievancePortals();
      if (currentTab === "contacts") renderContacts();
    });
  });

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.filter;
      renderDirectory();
    });
  });

  // Search Inputs
  if (directorySearchInput) {
    directorySearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderDirectory();
    });
  }

  if (vehicleSearchInput) {
    vehicleSearchInput.addEventListener("input", (e) => {
      vehicleSearchQuery = e.target.value.toLowerCase().trim();
      renderVehicles();
    });
  }

  // Render Directory Cards
  function renderDirectory() {
    if (!directoryGrid) return;

    let filtered = RESIDENTS_DATA.filter(r => {
      // Pill Filter
      if (currentFilter === "owner" && r.hasTenant) return false;
      if (currentFilter === "tenant" && !r.hasTenant) return false;
      if (currentFilter === "verified" && !r.policeVerified) return false;
      if (currentFilter === "pending" && r.policeVerified) return false;
      if (currentFilter === "encroachment" && !r.hasEncroachment) return false;
      if (currentFilter === "has-vehicle" && (!r.vehicles || r.vehicles.length === 0)) return false;

      // Text Search
      if (searchQuery) {
        const matchPlot = r.plot.toLowerCase().includes(searchQuery);
        const matchName = r.name.toLowerCase().includes(searchQuery);
        const matchPhone = r.phone.toLowerCase().includes(searchQuery) || (r.rawPhone && r.rawPhone.includes(searchQuery));
        const matchVehicles = r.vehicles && r.vehicles.some(v => v.toLowerCase().includes(searchQuery));
        const matchNotes = r.notes && r.notes.toLowerCase().includes(searchQuery);
        return matchPlot || matchName || matchPhone || matchVehicles || matchNotes;
      }
      return true;
    });

    if (filtered.length === 0) {
      directoryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 48px; color: var(--text-dim); margin-bottom: 0.5rem;">search_off</span>
          <p style="font-size: 1.1rem; font-weight: 600;">No plots found matching "${searchQuery}"</p>
          <p style="font-size: 0.85rem;">Try searching by plot number, name, or vehicle number.</p>
        </div>
      `;
      return;
    }

    directoryGrid.innerHTML = filtered.map(r => {
      // Avatar
      const avatarContent = r.photoUrl
        ? `<img src="${r.photoUrl}" alt="${r.name}">`
        : `<span class="material-symbols-rounded" style="font-size: 26px;">person</span>`;

      // Indicators
      const tenantChip = r.hasTenant
        ? `<span class="indicator-chip indicator-tenant"><span class="material-symbols-rounded" style="font-size: 13px;">key</span>${r.tenantInfo || 'Tenant Present'}</span>`
        : `<span class="indicator-chip indicator-owner"><span class="material-symbols-rounded" style="font-size: 13px;">home_pin</span>Owner Occupied</span>`;

      const policeChip = r.policeVerified
        ? `<span class="indicator-chip indicator-police-verified"><span class="material-symbols-rounded" style="font-size: 13px;">verified</span>Police Verified</span>`
        : `<span class="indicator-chip indicator-police-pending"><span class="material-symbols-rounded" style="font-size: 13px;">warning</span>Pending Verification</span>`;

      const encroachChip = r.hasEncroachment
        ? `<span class="indicator-chip indicator-encroach"><span class="material-symbols-rounded" style="font-size: 13px;">report</span>Encroachment (Aakraman)</span>`
        : `<span class="indicator-chip indicator-clear"><span class="material-symbols-rounded" style="font-size: 13px;">check_circle</span>No Encroachment</span>`;

      // Nuisance Banner
      const nuisanceBanner = r.nuisanceAlert
        ? `<div class="nuisance-banner"><span class="material-symbols-rounded">warning</span><span>${r.nuisanceAlert}</span></div>`
        : '';

      // Vehicles
      const vehicleBox = (r.vehicles && r.vehicles.length > 0)
        ? `<div class="vehicles-tag-box">
             <span class="material-symbols-rounded" style="color: #818cf8; font-size: 16px;">directions_car</span>
             <span>Vehicles: <strong>${r.vehicles.join(", ")}</strong></span>
           </div>`
        : `<div class="vehicles-tag-box" style="color: var(--text-dim);">
             <span class="material-symbols-rounded" style="font-size: 16px;">no_crash</span>
             <span>No vehicles recorded</span>
           </div>`;

      // Pre-filled Messages
      const msgText = encodeURIComponent(`Namaste ${r.name} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);

      return `
        <div class="plot-card" data-plot="${r.plot}">
          <div class="card-header">
            <div class="plot-badge">
              <span class="material-symbols-rounded" style="font-size: 18px;">home</span>
              ${r.plot}
            </div>
            <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600;">Plot Verified</span>
          </div>

          <!-- Resident Avatar & Name -->
          <div class="resident-profile-box">
            <div class="resident-avatar">
              ${avatarContent}
            </div>
            <div class="resident-details">
              <div class="resident-name" title="${r.name}">${r.name}</div>
              <div class="resident-relation">${r.relation}</div>
            </div>
          </div>

          <!-- Indicators -->
          <div class="indicators-row">
            ${tenantChip}
            ${policeChip}
            ${encroachChip}
          </div>

          <!-- Nuisance Alert if any -->
          ${nuisanceBanner}

          <!-- Vehicles -->
          ${vehicleBox}

          <!-- 3 One-Click Buttons: Call, SMS, WhatsApp + Details -->
          <div class="card-actions">
            <a href="tel:${r.phone}" class="action-btn btn-call" title="Call ${r.name}">
              <span class="material-symbols-rounded">call</span>
              Call
            </a>
            <a href="sms:${r.rawPhone}?body=${msgText}" class="action-btn btn-sms" title="SMS ${r.name}">
              <span class="material-symbols-rounded">sms</span>
              SMS
            </a>
            <a href="https://wa.me/${r.rawPhone}?text=${msgText}" target="_blank" class="action-btn btn-whatsapp" title="WhatsApp ${r.name}">
              <span class="material-symbols-rounded">chat</span>
              WhatsApp
            </a>
            <button class="action-btn btn-info" onclick="openPlotModal('${r.plot}')" title="Full Details">
              <span class="material-symbols-rounded">info</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Vehicles Grid
  function renderVehicles() {
    if (!vehiclesGrid) return;

    let plotsWithVehicles = RESIDENTS_DATA.filter(r => r.vehicles && r.vehicles.length > 0);

    if (vehicleSearchQuery) {
      plotsWithVehicles = plotsWithVehicles.filter(r => {
        const matchPlate = r.vehicles.some(v => v.toLowerCase().includes(vehicleSearchQuery));
        const matchPlot = r.plot.toLowerCase().includes(vehicleSearchQuery);
        const matchName = r.name.toLowerCase().includes(vehicleSearchQuery);
        return matchPlate || matchPlot || matchName;
      });
    }

    if (plotsWithVehicles.length === 0) {
      vehiclesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <span class="material-symbols-rounded" style="font-size: 48px; color: var(--text-dim); margin-bottom: 0.5rem;">no_crash</span>
          <p style="font-size: 1.1rem; font-weight: 600;">No vehicle found for "${vehicleSearchQuery}"</p>
        </div>
      `;
      return;
    }

    vehiclesGrid.innerHTML = plotsWithVehicles.map(r => {
      const platesList = r.vehicles.map(v => `
        <div style="font-size: 1.1rem; font-weight: 800; color: #38bdf8; letter-spacing: 0.05em; background: rgba(56, 189, 248, 0.1); padding: 0.4rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(56, 189, 248, 0.25); display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem;">
          <span class="material-symbols-rounded" style="font-size: 18px;">directions_car</span>
          ${v}
        </div>
      `).join(" ");

      const waMsg = encodeURIComponent(`Namaste ${r.name} ji, regarding your vehicle parked in Arjunpuri 1st lane, could you please adjust it?`);

      return `
        <div class="plot-card">
          <div class="card-header">
            <div class="plot-badge">
              <span class="material-symbols-rounded" style="font-size: 18px;">home</span>
              ${r.plot}
            </div>
            <span class="meta-chip" style="color: var(--primary);">Registered Vehicle</span>
          </div>

          <div style="margin-bottom: 0.85rem;">
            ${platesList}
          </div>

          <div class="resident-name">${r.name}</div>
          <div class="resident-relation">${r.relation} &bull; ${r.phone}</div>

          <div class="card-actions" style="margin-top: 1rem; grid-template-columns: 1fr 1fr 1.2fr;">
            <a href="tel:${r.phone}" class="action-btn btn-call">
              <span class="material-symbols-rounded">call</span>
              Call
            </a>
            <a href="sms:${r.rawPhone}?body=${waMsg}" class="action-btn btn-sms">
              <span class="material-symbols-rounded">sms</span>
              SMS
            </a>
            <a href="https://wa.me/${r.rawPhone}?text=${waMsg}" target="_blank" class="action-btn btn-whatsapp">
              <span class="material-symbols-rounded">chat</span>
              WhatsApp
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Grievance Portals (1-Click Launchers)
  function renderGrievancePortals() {
    if (!grievancePortalsList) return;

    grievancePortalsList.innerHTML = GRIEVANCE_PORTALS.map(g => `
      <div class="grievance-card">
        <div class="grievance-icon-box">
          <span class="material-symbols-rounded" style="font-size: 28px;">${g.icon}</span>
        </div>
        <div class="grievance-info">
          <div class="grievance-dept">${g.dept}</div>
          <div class="grievance-issue">${g.issue}</div>
        </div>
        <div class="grievance-actions">
          <a href="${g.url}" target="_blank" class="btn-portal">
            <span class="material-symbols-rounded">open_in_new</span>
            ${g.actionLabel}
          </a>
          <a href="tel:${g.tollFree}" class="action-btn btn-call" style="padding: 0.65rem 0.9rem;">
            <span class="material-symbols-rounded">phone_in_talk</span>
            Toll-Free ${g.tollFree}
          </a>
        </div>
      </div>
    `).join("");
  }

  // Render Contacts Directory (Parshad, Karyakarta & Trades)
  function renderContacts() {
    if (!civicContactsList) return;

    civicContactsList.innerHTML = CIVIC_AND_TRADE_CONTACTS.map(c => {
      const waText = encodeURIComponent(`Namaste ${c.name} ji, regarding Arjunpuri 1st Link Road...`);
      return `
        <div class="civic-card">
          <div class="grievance-icon-box" style="background: rgba(129, 140, 248, 0.12); border-color: rgba(129, 140, 248, 0.25); color: var(--accent);">
            <span class="material-symbols-rounded" style="font-size: 28px;">${c.icon}</span>
          </div>
          <div class="civic-info">
            <div class="civic-role">${c.role}</div>
            <div class="civic-name">${c.name}</div>
            <div style="font-size: 0.85rem; color: var(--text-main); font-weight: 600; margin-bottom: 0.25rem;">
              <span class="material-symbols-rounded" style="font-size: 15px; color: var(--primary);">business</span>
              ${c.office}
            </div>
            <div class="civic-duty">${c.duty}</div>
          </div>
          <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
            <a href="tel:${c.rawPhone}" class="action-btn btn-call" style="min-width: 80px;">
              <span class="material-symbols-rounded">call</span>
              Call
            </a>
            ${c.rawPhone.length > 5 ? `
              <a href="sms:${c.rawPhone}?body=${waText}" class="action-btn btn-sms" style="min-width: 80px;">
                <span class="material-symbols-rounded">sms</span>
                SMS
              </a>
              <a href="https://wa.me/${c.rawPhone}?text=${waText}" target="_blank" class="action-btn btn-whatsapp" style="min-width: 100px;">
                <span class="material-symbols-rounded">chat</span>
                WhatsApp
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // Modal Open Function
  window.openPlotModal = function(plotNo) {
    const r = RESIDENTS_DATA.find(item => item.plot === plotNo);
    if (!r || !modalBody || !detailModal) return;

    const vehiclesList = (r.vehicles && r.vehicles.length > 0) ? r.vehicles.join(", ") : "None registered";
    const waText = encodeURIComponent(`Namaste ${r.name} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);

    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
        <div class="plot-badge" style="font-size: 1.5rem; padding: 0.4rem 0.9rem;">
          <span class="material-symbols-rounded" style="font-size: 24px;">home</span>
          ${r.plot}
        </div>
        <div>
          <h2 style="font-size: 1.3rem; font-weight: 800;">${r.name}</h2>
          <span style="font-size: 0.85rem; color: var(--text-muted);">${r.relation}</span>
        </div>
      </div>

      <div class="detail-row">
        <span>Contact Phone</span>
        <span>${r.phone}</span>
      </div>
      <div class="detail-row">
        <span>Tenant Status</span>
        <span style="color: ${r.hasTenant ? '#c084fc' : '#38bdf8'}; font-weight: 700;">
          ${r.hasTenant ? 'Tenant Present' : 'Owner Occupied'}
        </span>
      </div>
      <div class="detail-row">
        <span>Police Verification</span>
        <span style="color: ${r.policeVerified ? 'var(--success)' : 'var(--warning)'}; display: inline-flex; align-items: center; gap: 0.25rem;">
          <span class="material-symbols-rounded" style="font-size: 16px;">${r.policeVerified ? 'verified' : 'warning'}</span>
          ${r.policeVerifRef}
        </span>
      </div>
      <div class="detail-row">
        <span>Registered Vehicles</span>
        <span style="color: #a5b4fc;">${vehiclesList}</span>
      </div>
      <div class="detail-row">
        <span>Electrical Load</span>
        <span>${r.loadKw} (${r.meterType})</span>
      </div>
      <div class="detail-row" style="border-bottom: none; flex-direction: column; gap: 0.4rem;">
        <span>Notes & Details</span>
        <span style="text-align: left; color: var(--text-muted); font-size: 0.85rem; font-weight: normal; background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          ${r.notes || "No special notes recorded."}
        </span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 0.5rem; margin-top: 1.5rem;">
        <a href="tel:${r.phone}" class="action-btn btn-call" style="padding: 0.75rem;">
          <span class="material-symbols-rounded">call</span>
          Call Direct
        </a>
        <a href="sms:${r.rawPhone}?body=${waText}" class="action-btn btn-sms" style="padding: 0.75rem;">
          <span class="material-symbols-rounded">sms</span>
          SMS Direct
        </a>
        <a href="https://wa.me/${r.rawPhone}?text=${waText}" target="_blank" class="action-btn btn-whatsapp" style="padding: 0.75rem;">
          <span class="material-symbols-rounded">chat</span>
          WhatsApp
        </a>
      </div>
    `;

    detailModal.classList.add("active");
  };

  // Close Modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      detailModal.classList.remove("active");
    });
  }

  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) detailModal.classList.remove("active");
    });
  }

  // Initial Render
  renderDirectory();
});
