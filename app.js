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
  const civicContactsList = document.getElementById("civic-contacts-list");
  const petitionsList = document.getElementById("petitions-list");
  const directorySearchInput = document.getElementById("directory-search");
  const vehicleSearchInput = document.getElementById("vehicle-search");
  const detailModal = document.getElementById("detail-modal");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const tabButtons = document.querySelectorAll("#section-tabs .tab-btn");
  const filterPills = document.querySelectorAll("#filter-pills .pill-btn");
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

  // Init Counts
  const totalPlotsCountEl = document.getElementById("total-plots-count");
  const verifiedPlotsCountEl = document.getElementById("verified-plots-count");
  if (totalPlotsCountEl) totalPlotsCountEl.textContent = RESIDENTS_DATA.length;
  if (verifiedPlotsCountEl) {
    const verified = RESIDENTS_DATA.filter(r => r.status === "Verified").length;
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
      if (currentTab === "civic") renderCivicContacts();
      if (currentTab === "petitions") renderPetitions();
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
      if (currentFilter === "owner" && r.type !== "Owner") return false;
      if (currentFilter === "tenant" && r.type !== "Tenanted") return false;
      if (currentFilter === "verified" && r.status !== "Verified") return false;
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
      const isVerified = r.status === "Verified";
      const statusClass = isVerified ? "status-verified" : "status-pending";
      const statusIcon = isVerified ? "verified" : "pending_actions";

      const vehicleChips = (r.vehicles && r.vehicles.length > 0)
        ? r.vehicles.map(v => `<span class="meta-chip vehicle"><span class="material-symbols-rounded" style="font-size: 14px;">directions_car</span>${v}</span>`).join("")
        : "";

      const whatsappText = encodeURIComponent(`Namaste ${r.name} ji, regarding Arjunpuri 1st (Plot ${r.plot})...`);

      return `
        <div class="plot-card" data-plot="${r.plot}">
          <div class="card-header">
            <div class="plot-badge">
              <span class="material-symbols-rounded" style="font-size: 18px;">home</span>
              ${r.plot}
            </div>
            <div class="status-badge ${statusClass}">
              <span class="material-symbols-rounded" style="font-size: 14px;">${statusIcon}</span>
              ${r.status}
            </div>
          </div>

          <div class="resident-name">${r.name}</div>
          <div class="resident-relation">${r.relation} &bull; ${r.type}</div>

          <div class="meta-tags">
            ${vehicleChips}
            <span class="meta-chip power">
              <span class="material-symbols-rounded" style="font-size: 14px;">bolt</span>
              ${r.loadKw}
            </span>
            <span class="meta-chip">
              <span class="material-symbols-rounded" style="font-size: 14px;">speed</span>
              ${r.meterType}
            </span>
          </div>

          <div class="card-actions">
            <a href="tel:${r.phone}" class="action-btn btn-call" title="Call ${r.name}">
              <span class="material-symbols-rounded">call</span>
              Call
            </a>
            <a href="https://wa.me/${r.rawPhone}?text=${whatsappText}" target="_blank" class="action-btn btn-whatsapp" title="WhatsApp ${r.name}">
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

  // Render Vehicles
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

      const whatsappText = encodeURIComponent(`Namaste ${r.name} ji, your vehicle is parked in Arjunpuri 1st lane, could you please adjust it?`);

      return `
        <div class="plot-card">
          <div class="card-header">
            <div class="plot-badge">
              <span class="material-symbols-rounded" style="font-size: 18px;">home</span>
              ${r.plot}
            </div>
            <span class="meta-chip" style="color: var(--primary);">Plot Registered</span>
          </div>

          <div style="margin-bottom: 0.85rem;">
            ${platesList}
          </div>

          <div class="resident-name">${r.name}</div>
          <div class="resident-relation">${r.relation} &bull; ${r.phone}</div>

          <div class="card-actions" style="margin-top: 1rem;">
            <a href="tel:${r.phone}" class="action-btn btn-call">
              <span class="material-symbols-rounded">call</span>
              Call Owner
            </a>
            <a href="https://wa.me/${r.rawPhone}?text=${whatsappText}" target="_blank" class="action-btn btn-whatsapp">
              <span class="material-symbols-rounded">chat</span>
              Message Owner
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Civic Contacts
  function renderCivicContacts() {
    if (!civicContactsList) return;

    civicContactsList.innerHTML = CIVIC_CONTACTS.map(c => {
      const waText = encodeURIComponent(`Namaste ${c.name} ji, regarding Arjunpuri 1st Link Road civic matter...`);
      return `
        <div class="civic-card">
          <div class="civic-info">
            <div class="civic-role">${c.role}</div>
            <div class="civic-name">${c.name}</div>
            <div style="font-size: 0.85rem; color: var(--text-main); font-weight: 600; margin-bottom: 0.25rem;">
              <span class="material-symbols-rounded" style="font-size: 15px; color: var(--primary);">business</span>
              ${c.office}
            </div>
            <div class="civic-duty">${c.duty}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <a href="tel:${c.rawPhone}" class="action-btn btn-call" style="min-width: 100px;">
              <span class="material-symbols-rounded">call</span>
              Call
            </a>
            ${c.rawPhone.length > 5 ? `
              <a href="https://wa.me/${c.rawPhone}?text=${waText}" target="_blank" class="action-btn btn-whatsapp" style="min-width: 110px;">
                <span class="material-symbols-rounded">chat</span>
                WhatsApp
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Petitions
  function renderPetitions() {
    if (!petitionsList) return;

    petitionsList.innerHTML = CIVIC_PETITIONS.map(p => `
      <div class="petition-card">
        <div class="petition-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="status-badge status-verified">
              <span class="material-symbols-rounded" style="font-size: 14px;">check_circle</span>
              ${p.status}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-dim); font-weight: 600;">Ref: ${p.id}</span>
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">
            <span class="material-symbols-rounded" style="font-size: 14px;">calendar_today</span>
            ${p.date}
          </span>
        </div>

        <div class="petition-title">${p.title}</div>
        <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-bottom: 0.5rem;">
          <span class="material-symbols-rounded" style="font-size: 15px;">account_balance</span>
          ${p.department} &bull; ${p.target}
        </div>

        <div class="petition-summary">${p.summary}</div>

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="meta-chip">
            <span class="material-symbols-rounded" style="font-size: 14px;">attachment</span>
            ${p.evidencePhotos} Evidence Photos Attached
          </span>
        </div>
      </div>
    `).join("");
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
          <span style="font-size: 0.85rem; color: var(--text-muted);">${r.relation} &bull; ${r.type}</span>
        </div>
      </div>

      <div class="detail-row">
        <span>Contact Phone</span>
        <span>${r.phone}</span>
      </div>
      <div class="detail-row">
        <span>Police Verification</span>
        <span style="color: var(--success); display: inline-flex; align-items: center; gap: 0.25rem;">
          <span class="material-symbols-rounded" style="font-size: 16px;">verified</span>
          ${r.policeVerifRef}
        </span>
      </div>
      <div class="detail-row">
        <span>Aadhaar / ID Card</span>
        <span style="color: var(--primary); display: inline-flex; align-items: center; gap: 0.25rem;">
          <span class="material-symbols-rounded" style="font-size: 16px;">badge</span>
          ${r.aadhaarStatus}
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
        <span>Notes & Facilities</span>
        <span style="text-align: left; color: var(--text-muted); font-size: 0.85rem; font-weight: normal; background: rgba(255, 255, 255, 0.04); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          ${r.notes || "No special notes recorded."}
        </span>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
        <a href="tel:${r.phone}" class="action-btn btn-call" style="padding: 0.75rem;">
          <span class="material-symbols-rounded">call</span>
          Call Direct
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

  // Toast Function
  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // Initial Render
  renderDirectory();
});
