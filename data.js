// Arjunpuri 1st Link Road - Official Verified Resident & Plot Database
const RESIDENTS_DATA = [
  {
    plot: "31",
    name: "Gaurav, Pramod & Rekha",
    relation: "Resident Owners",
    phone: "+91 89469 68876",
    rawPhone: "918946968876",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "Co-Living Verified Tenants",
    policeVerified: true,
    policeVerifRef: "Police Ref: 682357 / 682358",
    hasEncroachment: false,
    vehicles: [
      "RJ 45 CU 9353 (Grey Nissan Magnite)",
      "RJ 14 WB 3851 (Grey Maruti Esteem)",
      "RJ 14 WB 6095 (Maroon Honda Aviator)"
    ],
    loadKw: "7 kW (3-Phase)",
    meterType: "Smart Meter",
    notes: "Community Coordinator, IT & Remote CCTV Hub, Solar",
    nuisanceAlert: ""
  },
  {
    plot: "30",
    name: "Ashok Gupta",
    relation: "Resident Owner",
    phone: "+91 98290 75229",
    rawPhone: "919829075229",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 CK 2863 (Maruti Suzuki Dzire)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Permanent Resident, 2 Tenants on premises",
    nuisanceAlert: ""
  },
  {
    plot: "29",
    name: "Plot 29 Residence",
    relation: "Resident",
    phone: "+91 96944 73000",
    rawPhone: "919694473000",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 05 CC 7937 (Black Kia Seltos)"
    ],
    loadKw: "10 kW (3-Phase)",
    meterType: "Smart Meter",
    notes: "MLA Associated Residence, Drainage chamber fixed",
    nuisanceAlert: ""
  },
  {
    plot: "28",
    name: "Plot 28 Residence",
    relation: "Tenanted Residence",
    phone: "+91 75973 02948",
    rawPhone: "917597302948",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "Has Tenants",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [],
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "Has tenants, No encroachment",
    nuisanceAlert: ""
  },
  {
    plot: "24",
    name: "Sokhiya Family (Varsha, Sonu, Hardik, Ranveer, Sakshi, Pankaj & Ashish)",
    relation: "Resident Owners",
    phone: "+91 93145 30593",
    rawPhone: "919314530593",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied (7 Members)",
    policeVerified: true,
    policeVerifRef: "Verified Resident Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 45 CN 9300 (White Tata Harrier)",
      "RJ 45 CN 4767 (Skoda Rapid)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Active community member, front parking",
    nuisanceAlert: ""
  },
  {
    plot: "23",
    name: "Gupta Family (Daya Gupta, Kaushalya Gupta, Mohini & Vishal)",
    relation: "Resident Family",
    phone: "+91 99280 22998",
    rawPhone: "919928022998",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 1,
    tenantInfo: "1 Tenant",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 WC 4501 (Silver Renault Kwid)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Underground cabling proponent, no encroachment",
    nuisanceAlert: ""
  },
  {
    plot: "22",
    name: "Saini Ji",
    relation: "Resident & PG Operator",
    phone: "+91 93145 30593",
    rawPhone: "919314530593",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 6,
    tenantInfo: "PG with 6 Tenants",
    policeVerified: true,
    policeVerifRef: "PG Verification on File",
    hasEncroachment: false,
    vehicles: [],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Student PG accommodation, no vehicles, no encroachment",
    nuisanceAlert: ""
  },
  {
    plot: "21",
    name: "Chaudhary Couple, Rahul Saini & Nikhil Saini",
    relation: "Resident & Tenants",
    phone: "+91 94617 83436",
    rawPhone: "919461783436",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 CF 1967 (Red Maruti Suzuki WagonR)"
    ],
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "No encroachment, 2 tenants",
    nuisanceAlert: ""
  },
  {
    plot: "20",
    name: "Corner Plot (Encroachment & Multiple Tenants)",
    relation: "Tenanted Property",
    phone: "+91 94617 83436",
    rawPhone: "919461783436",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 4,
    tenantInfo: "4 Tenants",
    policeVerified: false,
    policeVerifRef: "Pending Verification",
    hasEncroachment: true,
    vehicles: [
      "RJ 14 CK 6124 (Maruti Suzuki Alto)",
      "RJ 14 UX 8634 (Maruti Suzuki XL6)",
      "RJ 45 CD 2225 (Gray Maruti Suzuki Ignis)"
    ],
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "Aakraman (Encroachment) with 4 tenants. Vehicles parked outside.",
    nuisanceAlert: "Public nuisance issue due to persistent garbage accumulation around corner."
  },
  {
    plot: "18",
    name: "Rajesh Taparia",
    relation: "Family Head",
    phone: "+91 93148 35023",
    rawPhone: "919314835023",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 XC 6807 (Maruti Suzuki Alto)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Active in civic coordination & underground cabling",
    nuisanceAlert: ""
  },
  {
    plot: "AA 16",
    name: "Golden (Kailash Villa)",
    relation: "Resident Owner",
    phone: "+91 92140 75229",
    rawPhone: "919214075229",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "No Tenants (Owner Only)",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 CH 9849"
    ],
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "Kailash Villa, Longstanding resident, designated front parking",
    nuisanceAlert: ""
  },
  {
    plot: "15A",
    name: "Madan Mohan, Sushila & Nishant Kumawat",
    relation: "Resident Family",
    phone: "+91 90241 10043",
    rawPhone: "919024110043",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 QD 6299 (Red TVS Jupiter)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Kumawat Family Residence",
    nuisanceAlert: ""
  },
  {
    plot: "B13",
    name: "Anil Chandwar & Naman Chandwar",
    relation: "Resident Owners",
    phone: "+91 97856 07150",
    rawPhone: "919785607150",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 LC 9770 (Hyundai Accent)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Chandwar Family Residence",
    nuisanceAlert: ""
  },
  {
    plot: "A14",
    name: "Ashish Bambani",
    relation: "Resident Owner",
    phone: "+91 98870 00785",
    rawPhone: "919887000785",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "Black Honda City"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Permanent Resident",
    nuisanceAlert: ""
  },
  {
    plot: "14A",
    name: "Varalika Compu Power Systems",
    relation: "Commercial Enterprise",
    phone: "+91 94134 90448",
    rawPhone: "919413490448",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Commercial Unit",
    policeVerified: true,
    policeVerifRef: "Registered Enterprise",
    hasEncroachment: false,
    vehicles: [],
    loadKw: "11 kW (3-Phase)",
    meterType: "Commercial 3-Phase",
    notes: "Power backup, inverter & IT systems enterprise",
    nuisanceAlert: ""
  },
  {
    plot: "12A",
    name: "Kuldeep Boolchandani",
    relation: "Property Owner",
    phone: "+91 97820 23549",
    rawPhone: "919782023549",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 4,
    tenantInfo: "At least 4 Tenants",
    policeVerified: false,
    policeVerifRef: "Pending Verification",
    hasEncroachment: true,
    vehicles: [],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Has encroachment. At least 4 tenants residing. Lane terminus.",
    nuisanceAlert: ""
  },
  {
    plot: "A32",
    name: "Rathore Sahab's Home",
    relation: "Resident Owner",
    phone: "+91 99822 31470",
    rawPhone: "919982231470",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 1,
    tenantInfo: "1 Tenant",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [
      "RJ 60 CC 8594",
      "White Tata Nexon"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Rathore Sahab, 1 tenant residing",
    nuisanceAlert: ""
  },
  {
    plot: "48A",
    name: "Plot 48A",
    relation: "Premises",
    phone: "+91 88909 43688",
    rawPhone: "918890943688",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Clean Record",
    policeVerified: true,
    policeVerifRef: "Verified",
    hasEncroachment: false,
    vehicles: [],
    loadKw: "5 kW",
    meterType: "Electronic Meter",
    notes: "No vehicles, no encroachment",
    nuisanceAlert: ""
  },
  {
    plot: "4",
    name: "Pushpendra (Cafe & Library PG)",
    relation: "PG Operator & Cafe Owner",
    phone: "+91 80008 60490",
    rawPhone: "918000860490",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 18,
    tenantInfo: "PG with 15 to 20 Tenants",
    policeVerified: false,
    policeVerifRef: "Tenant Verification Required",
    hasEncroachment: true,
    vehicles: [],
    loadKw: "11 kW (Commercial)",
    meterType: "Commercial 3-Phase",
    notes: "Vinay Library, Radhe Radhe Cafe. High tenant density (15-20). Has encroachment. No permanent vehicles.",
    nuisanceAlert: "Encroachment and pedestrian movement congestion due to commercial setup."
  }
];

// Direct 1-Click Government Grievance Launchers (No tracking bloat)
const GRIEVANCE_PORTALS = [
  {
    dept: "JVVNL Electricity (बिजली विभाग)",
    issue: "Sparking, Cable Hanging, Voltage Fluctuation & Underground Line Demand",
    icon: "bolt",
    url: "https://bijlimitra.jvvnl.org/",
    tollFree: "1912",
    actionLabel: "Lodge JVVNL Complaint (Bijli Mitra)"
  },
  {
    dept: "Jal Vibhag / PHED (जल विभाग)",
    issue: "Low Drinking Water Pressure, Pipeline Leaks, Dirty Water Supply",
    icon: "water_drop",
    url: "https://sampark.rajasthan.gov.in/",
    tollFree: "181",
    actionLabel: "Report Water Problem (PHED / Sampark 181)"
  },
  {
    dept: "Jaipur Nagar Nigam Greater (नगर निगम)",
    issue: "Garbage Van Not Coming, Street Sweeping, Malba Clearance, Streetlights",
    icon: "delete_sweep",
    url: "https://jaipurmc.org/",
    tollFree: "0141-2742823",
    actionLabel: "Lodge Nagar Nigam Complaint"
  },
  {
    dept: "Rajasthan Sampark Master Portal (राजस्थान संपर्क)",
    issue: "All State Department Grievances & Direct Escalation to CM Helpline",
    icon: "gavel",
    url: "https://sampark.rajasthan.gov.in/",
    tollFree: "181",
    actionLabel: "Open Rajasthan Sampark 181"
  },
  {
    dept: "JDA Enforcement Cell (जयपुर विकास प्राधिकरण)",
    issue: "Road Encroachment, Illegal Commercial Cabins & Pathway Blockage",
    icon: "domain",
    url: "https://jdaservice.rajasthan.gov.in/CitizenServices/DTSView/SubmitEnforcement_Temp",
    tollFree: "0141-2569696",
    actionLabel: "File JDA Encroachment Complaint"
  }
];

// Local Authorities, Parshad, Karyakarta & Trades Helpers
const CIVIC_AND_TRADE_CONTACTS = [
  {
    role: "Area Ward Parshad (पार्षद)",
    name: "Prem Chand (पार्षद)",
    category: "authority",
    icon: "how_to_reg",
    phone: "+91 97857 40980",
    rawPhone: "919785740980",
    office: "Ward 141, Nagar Nigam Greater",
    duty: "Road approvals, drainage allocation, colony meetings"
  },
  {
    role: "Area BJP Karyakarta (कार्यकर्ता)",
    name: "Gokul Mishra (कार्यकर्ता)",
    category: "authority",
    icon: "campaign",
    phone: "+91 93519 41910",
    rawPhone: "919351941910",
    office: "Imli Phatak Area Unit",
    duty: "MLA liaison, public grievances, street sweeping drive"
  },
  {
    role: "Sanitation Inspector / SI (नगर निगम)",
    name: "Roop Narayan Ji (SI नगर निगम)",
    category: "authority",
    icon: "cleaning_services",
    phone: "+91 87648 79857",
    rawPhone: "8764879857",
    office: "Jaipur Greater Health Dept",
    duty: "Garbage vans, lane sweepers, malba challans"
  },
  {
    role: "JEN Electricity (कनिष्ठ अभियंता)",
    name: "Rahul Ji (JEN पावरहाउस)",
    category: "authority",
    icon: "bolt",
    phone: "Powerhouse CD-II Desk",
    rawPhone: "918946968876",
    office: "JVVNL Powerhouse CD-II, Jaipur",
    duty: "Underground cabling, transformer tripping & pillar boxes"
  },
  {
    role: "Colony Electrician (बिजली मिस्त्री)",
    name: "Om Prakash (इलेक्ट्रीशियन)",
    category: "trade",
    icon: "electric_bolt",
    phone: "+91 94134 90448",
    rawPhone: "919413490448",
    office: "Imli Phatak Service Station",
    duty: "Domestic short-circuits, MCB fixes, appliance repairs"
  },
  {
    role: "Colony Plumber (नल व पाइप मिस्त्री)",
    name: "Plumbing Services (प्लम्बर)",
    category: "trade",
    icon: "plumbing",
    phone: "+91 89469 68876",
    rawPhone: "918946968876",
    office: "Local Community Line",
    duty: "Water tank valves, leakage, motor repairs, pipeline choke"
  },
  {
    role: "Mason / Rajmistri (राजमिस्त्री)",
    name: "Masonry & Civil Repairs (राजमिस्त्री)",
    category: "trade",
    icon: "handyman",
    phone: "+91 89469 68876",
    rawPhone: "918946968876",
    office: "Local Mason Guild",
    duty: "Chamber repair, naali cement work, brickwork"
  },
  {
    role: "Scrap & Malba Dealer (कबाड़ी)",
    name: "Rashid Khan (कबाड़ी)",
    category: "trade",
    icon: "recycling",
    phone: "+91 92143 59268",
    rawPhone: "919214359268",
    office: "Sahakar Marg Scrap Depot",
    duty: "Iron rods, construction scrap & household waste pickup"
  },
  {
    role: "Police Emergency & Beat",
    name: "Emergency Police Beat (टोंक फाटक थाना)",
    category: "authority",
    icon: "local_police",
    phone: "112 / 100",
    rawPhone: "112",
    office: "Local Police Station",
    duty: "Evening anti-social loitering, lane obstruction, security"
  }
];
