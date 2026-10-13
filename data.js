// Arjunpuri 1st Link Road - Official Verified Resident & Plot Database
const RESIDENTS_DATA = [
  {
    plot: "34",
    surname: "Pareeks",
    members: "Praveen Kumar Pareek, Siddharth Pareek & Himanshu Pareek",
    relation: "Resident Owner",
    phone: "+91 98870 48542",
    rawPhone: "9887048542",
    membersList: [
      { name: "Siddharth Pareek", phone: "+91 98870 48542", rawPhone: "9887048542", role: "Resident" },
      { name: "Siddharth Pareek (Alternate)", phone: "+91 76197 71121", rawPhone: "7619771121", role: "Alt Number" },
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 45 CQ 2182 (Maruti Suzuki Baleno)",
      "GJ 01 RL 4038 (Maruti Suzuki Alto)"
    ],
    notes: "Colony-wide garbage accumulates outside.",
    nuisanceAlert: "Entire colony garbage dumping point outside."
  },
  {
    plot: "31",
    surname: "Jagrawals",
    members: "Gaurav Singh, Pramod Jagrawal & Rekha",
    relation: "Resident Owner",
    phone: "+91 89469 68876",
    rawPhone: "918946968876",
    membersList: [
      { name: "Gaurav Singh", phone: "+91 89469 68876", rawPhone: "918946968876", role: "Resident" },
      { name: "Pramod Jagrawal", phone: "+91 99299 90041", rawPhone: "919929990041", role: "Resident Owner" },
      { name: "Rekha", phone: "+91 94140 40522", rawPhone: "919414040522", role: "Resident" }
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: true,
    policeVerifRef: "Police Ref: 682357 / 682358",
    hasEncroachment: false,
    vehicles: [
      "RJ 45 CU 9353 (Grey Nissan Magnite)",
      "RJ 14 WB 3851 (Grey Maruti Esteem)",
      "RJ 14 WB 6095 (Maroon Honda Aviator)"
    ],
    notes: "Tenant Verification: Police Ref: 682357 / 682358. Vehicle wash water runoff onto street.",
    nuisanceAlert: ""
  },
  {
    plot: "30",
    surname: "Guptas",
    members: "Ashok Gupta & Ashish Gupta",
    relation: "Resident Owner",
    phone: "+91 98290 75229",
    rawPhone: "9829075229",
    membersList: [
      { name: "Ashok Gupta", phone: "+91 98290 75229", rawPhone: "9829075229", role: "Resident Owner" },
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: true,
    encroachmentType: "Advertisement Board & Rubble",
    vehicles: [
      "RJ 14 CK 2863 (Maruti Suzuki Dzire)"
    ],
    notes: "Construction rubble and advertisement board outside.",
    nuisanceAlert: "Advertisement board & rubble outside."
  },
  {
    plot: "29",
    surname: "MLAs",
    members: "MLA Associated Family",
    relation: "Resident Owner",
    phone: "+91 96944 73000",
    rawPhone: "9694473000",
    membersList: [
      { name: "MLA Associated Family", phone: "+91 96944 73000", rawPhone: "9694473000", role: "Resident Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 05 CC 7937 (Black Kia Seltos)"
    ],
    notes: "Food waste and wrappers dumped outside.",
    nuisanceAlert: "Persistent food waste & wrapper dumping outside."
  },
  {
    plot: "28",
    surname: "Plot 28",
    members: "Resident Family & Tenants",
    relation: "Tenanted Property",
    phone: "+91 75973 02948",
    rawPhone: "917597302948",
    membersList: [
      { name: "Resident Family & Tenants", phone: "+91 75973 02948", rawPhone: "917597302948", role: "Resident" }
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "Has Tenants",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 34 CB 1048 (Hyundai Venue)"
    ],
    notes: "Has tenants. No encroachment.",
    nuisanceAlert: ""
  },
  {
    plot: "27",
    surname: "Radhe Krishna Girls PG",
    members: "Pushpendra (Radhe Krishna Girls PG & Cafe)",
    relation: "PG & Commercial Cafe",
    phone: "+91 95882 57792",
    rawPhone: "9588257792",
    membersList: [
      { name: "Pushpendra", phone: "+91 95882 57792", rawPhone: "9588257792", role: "PG & Cafe Owner" },
      { name: "Pushpendra (Alternate)", phone: "+91 80008 60490", rawPhone: "8000860490", role: "Alt Number" }
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 10,
    tenantInfo: "PG with 10 Tenants",
    policeVerified: false,
    policeVerifRef: "Tenant Verification Required",
    hasEncroachment: true,
    encroachmentType: "Chabutra, Cafe & Pipe Discharge",
    vehicles: [
      "RJ 14 KE 1074 (HERO Honda Splendor plus)"
    ],
    notes: "Radhe Krishna Girls PG & Cafe. Chabutra encroachment, road pipe water discharge.",
    nuisanceAlert: "Commercial cafe waste, raised chabutra and road waste water."
  },
  {
    plot: "26",
    surname: "Chaudharys",
    members: "Raj Choudhary",
    relation: "Resident Owner",
    phone: "+91 88906 72644",
    rawPhone: "8890672644",
    membersList: [
      { name: "Raj Choudhary", phone: "+91 88906 72644", rawPhone: "8890672644", role: "Resident Owner" },
      { name: "Raj Choudhary (Alternate)", phone: "+91 94617 83436", rawPhone: "9461783436", role: "Alt Number" }
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 CF 1967 (Red Maruti Suzuki WagonR)"
    ],
    notes: "No encroachment. 2 tenants.",
    nuisanceAlert: ""
  },
  {
    plot: "25",
    surname: "Sainis (PG)",
    members: "Saini Ji, Rahul Saini & PG Tenants",
    relation: "Student PG Accommodation",
    phone: "+91 63506 56029",
    rawPhone: "6350656029",
    membersList: [
      { name: "Rahul Saini", phone: "+91 63506 56029", rawPhone: "6350656029", role: "Resident" },
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 6,
    tenantInfo: "PG with 6 Tenants",
    policeVerified: true,
    policeVerifRef: "PG Verification on File",
    hasEncroachment: false,
    vehicles: [],
    notes: "Eight big stones outside the house to restrict parking (नौ बड़े पत्थर पार्किंग रोकते हैं).",
    nuisanceAlert: "Large stones placed on street to restrict parking."
  },
  {
    plot: "24",
    surname: "Guptas",
    members: "Daya Gupta, Kaushalya Gupta, Mohini, Vishal & P. Gupta",
    relation: "Resident Family",
    phone: "+91 93145 30593",
    rawPhone: "9314530593",
    membersList: [
      { name: "P. Gupta", phone: "+91 93145 30593", rawPhone: "9314530593", role: "Admin / Resident" },
    ],
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
    notes: "Construction rubble and waste outside.",
    nuisanceAlert: "Construction rubble and waste outside."
  },
  {
    plot: "23",
    surname: "Sokhiyas",
    members: "Varsha, Sonu, Hardik, Ganvesh, Sakshi, Pankaj & Ashish Sokhiya",
    relation: "Resident Owner",
    phone: "+91 97832 26728",
    rawPhone: "9783226728",
    membersList: [
      { name: "Varsha Sokhiya", phone: "+91 97832 26728", rawPhone: "9783226728", role: "Admin / Resident" },
      { name: "Pankaj Sokhiya", phone: "+91 93145 30593", rawPhone: "9314530593", role: "Resident" },
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied (7 Members)",
    policeVerified: true,
    policeVerifRef: "Verified Resident Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 45 CN 9300 (White Tata Harrier)",
      "RJ 45 CN 4767 (Skoda Rapid)",
      "RJ 45 CX 1315 (Maruti Suzuki Grand Vitara)"
    ],
    notes: "Active in colony improvement.",
    nuisanceAlert: ""
  },
  {
    plot: "20",
    surname: "Patnis",
    members: "Yogesh Patni & 2 Tenants",
    relation: "Resident Owner & 2 Tenants (Corner Plot)",
    phone: "+91 93148 35023",
    rawPhone: "9314835023",
    membersList: [
      { name: "Yogesh Patni", phone: "+91 93148 35023", rawPhone: "9314835023", role: "Owner (Corner Plot)" }
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: false,
    policeVerifRef: "Pending Verification",
    hasEncroachment: true,
    encroachmentType: "Corner Encroachment & Rubble",
    vehicles: [
      "RJ 14 CK 6124 (Maruti Suzuki Alto)",
      "RJ 14 UX 8634 (Maruti Suzuki XL6)",
      "RJ 45 CD 2225 (Gray Maruti Suzuki Ignis)"
    ],
    notes: "Public nuisance issue due to garbage accumulation, stagnant dirty water trough. Few construction rubble outside.",
    nuisanceAlert: "Garbage accumulation, stagnant dirty water trough & construction rubble."
  },
  {
    plot: "19",
    surname: "Jains (Plot 19)",
    members: "Praduman Jain (PK Jain)",
    relation: "Resident Owner",
    phone: "+91 98206 95225",
    rawPhone: "9820695225",
    membersList: [
      { name: "Praduman Jain (PK Jain)", phone: "+91 98206 95225", rawPhone: "9820695225", role: "Resident Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 45 CH 3474 (Maruti Suzuki Celerio)"
    ],
    notes: "Praduman Jain (PK Jain) residence.",
    nuisanceAlert: ""
  },
  {
    plot: "18",
    surname: "Burdaks",
    members: "Harjiram Burdak",
    relation: "Resident Owner",
    phone: "+91 93148 35023",
    rawPhone: "9314835023",
    membersList: [
      { name: "Harjiram Burdak", phone: "+91 93148 35023", rawPhone: "9314835023", role: "Resident Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 XC 6807 (Maruti Suzuki Alto)"
    ],
    notes: "Waste accumulation outside.",
    nuisanceAlert: "Waste accumulation outside premises."
  },
  {
    plot: "A-17",
    surname: "Sethiyas",
    members: "Neetu Sethia & Sethiya Ji",
    relation: "Tenanted Property",
    phone: "+91 90241 10043",
    rawPhone: "9024110043",
    membersList: [
      { name: "Neetu Sethia", phone: "+91 90241 10043", rawPhone: "9024110043", role: "Resident Owner" },
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 6,
    tenantInfo: "6 Tenants",
    policeVerified: false,
    policeVerifRef: "Pending Verification",
    hasEncroachment: false,
    vehicles: [
      "RJ 60 CD 4541 (Hyundai i20)",
      "RJ 60 CD 8970 (Maruti Suzuki Brezza)",
      "RJ 14 CW 8141"
    ],
    notes: "6 tenants residing on premises.",
    nuisanceAlert: ""
  },
  {
    plot: "AA 16",
    surname: "Agrawals (Kailash Villa)",
    members: "Golden",
    relation: "Resident Owner",
    phone: "+91 92140 75229",
    rawPhone: "9214075229",
    membersList: [
      { name: "Golden", phone: "+91 92140 75229", rawPhone: "9214075229", role: "Resident Owner (Kailash Villa)" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "No Tenants (Owner Only)",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 CH 9849"
    ],
    notes: "Kailash Villa. Long-standing vehicle parked outside.",
    nuisanceAlert: ""
  },
  {
    plot: "15A",
    surname: "Kumawats",
    members: "Madan Mohan Kumawat, Sushila Kumawat & Nishant Kumawat",
    relation: "Resident Owner",
    phone: "+91 90241 10043",
    rawPhone: "9024110043",
    membersList: [
      { name: "Madan Mohan Kumawat", phone: "+91 90241 10043", rawPhone: "9024110043", role: "Resident Owner" },
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 QD 6299 (Red TVS Jupiter)"
    ],
    notes: "Kumawat Family Residence.",
    nuisanceAlert: ""
  },
  {
    plot: "A14",
    surname: "Bambanis",
    members: "Ashish Bambani",
    relation: "Resident Owner",
    phone: "+91 98870 00785",
    rawPhone: "9887000785",
    membersList: [
      { name: "Ashish Bambani", phone: "+91 98870 00785", rawPhone: "9887000785", role: "Resident Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "Black Honda City"
    ],
    notes: "Permanent Resident.",
    nuisanceAlert: ""
  },
  {
    plot: "14A",
    surname: "Varalika Compu Power",
    members: "Varalika Compu Power Systems",
    relation: "Commercial Enterprise",
    phone: "+91 94134 90448",
    rawPhone: "9413490448",
    membersList: [
      { name: "Goyal Ji", phone: "+91 94134 90448", rawPhone: "9413490448", role: "Varalika Compu Power" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Commercial Unit",
    policeVerified: true,
    policeVerifRef: "Registered Enterprise",
    hasEncroachment: false,
    vehicles: [],
    notes: "Power backup, inverter & IT systems enterprise.",
    nuisanceAlert: ""
  },
  {
    plot: "B13",
    surname: "Chandwars",
    members: "Pradeep Jain Chandwar, Anil Chandwar & Naman Chandwar",
    relation: "Resident Owner",
    phone: "+91 94143 44976",
    rawPhone: "9414344976",
    membersList: [
      { name: "Pradeep Jain Chandwar", phone: "+91 94143 44976", rawPhone: "9414344976", role: "Resident Owner" },
      { name: "Anil Chandwar", phone: "+91 97856 07150", rawPhone: "9785607150", role: "Resident" },
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 14 LC 9770 (Hyundai Accent)"
    ],
    notes: "Remove three telephone poles outside Plot B-13. Also clear the area of trash.",
    nuisanceAlert: "Telephone poles and area trash buildup outside."
  },
  {
    plot: "12A",
    surname: "Boolchandanis",
    members: "Neeraj Boolchandani",
    relation: "Property Owner",
    phone: "+91 97820 23549",
    rawPhone: "9782023549",
    membersList: [
      { name: "Neeraj Boolchandani", phone: "+91 97820 23549", rawPhone: "9782023549", role: "Property Owner" }
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 4,
    tenantInfo: "Rented to Multiple Tenants",
    policeVerified: false,
    policeVerifRef: "Pending Verification",
    hasEncroachment: true,
    encroachmentType: "Boundary Rubble & Debris",
    vehicles: [
      "Tenants' Vehicles Present"
    ],
    notes: "Boundary: Garbage and construction rubble. Has encroachment. Rented out to many tenants.",
    nuisanceAlert: "Boundary garbage and construction rubble."
  },
  {
    plot: "A10",
    surname: "Plot A10 (PG)",
    members: "Fully Rented PG",
    relation: "Commercial PG Property",
    phone: "",
    rawPhone: "",
    membersList: [
    ],
    photoUrl: "",
    hasTenant: true,
    tenantCount: 6,
    tenantInfo: "6 Tenants (Rented Completely)",
    policeVerified: false,
    policeVerifRef: "Tenant Verification Required",
    hasEncroachment: false,
    vehicles: [],
    notes: "PG rented out completely, 6 tenants.",
    nuisanceAlert: ""
  },
  {
    plot: "C10",
    surname: "Jagannath Ji",
    members: "Jagannath Ji and others",
    relation: "Resident Owner",
    phone: "+91 94140 75229",
    rawPhone: "9414075229",
    membersList: [
      { name: "Jagannath Ji", phone: "+91 94140 75229", rawPhone: "9414075229", role: "Resident Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Family Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [],
    notes: "Jagannath Ji and others residence.",
    nuisanceAlert: ""
  },
  {
    plot: "9",
    surname: "Singhanias",
    members: "Dr. G D Singhania, Sunita Singhania & Ishika Singhania",
    relation: "Resident Owner",
    phone: "+91 83869 77101",
    rawPhone: "8386977101",
    membersList: [
      { name: "Ishika Singhania", phone: "+91 83869 77101", rawPhone: "8386977101", role: "Resident" },
      { name: "Dr. G D Singhania", phone: "+91 98290 75229", rawPhone: "9829075229", role: "Resident Owner" },
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [],
    notes: "Dr. G D Singhania and Sunita Singhania residence.",
    nuisanceAlert: ""
  },
  {
    plot: "A32",
    surname: "Agrwals",
    members: "Agrwals",
    relation: "Resident Owner",
    phone: "+91 99822 31470",
    rawPhone: "9982231470",
    membersList: [
      { name: "Agrwal Family", phone: "+91 99822 31470", rawPhone: "9982231470", role: "Resident Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Owner Occupied",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [
      "RJ 60 CC 8594",
      "White Tata Nexon"
    ],
    notes: "Presence of construction rubble.",
    nuisanceAlert: "Presence of construction rubble outside."
  },
  {
    plot: "A-33",
    surname: "Plot A-33",
    members: "Premises",
    relation: "Property",
    phone: "+91 99822 31470",
    rawPhone: "9982231470",
    membersList: [
      { name: "Plot A-33 Premises", phone: "+91 99822 31470", rawPhone: "9982231470", role: "Owner" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Premises",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [],
    notes: "Construction rubble present outside.",
    nuisanceAlert: "Construction rubble present outside."
  },
  {
    plot: "48A",
    surname: "Plot 48A",
    members: "Plot 48A Residence",
    relation: "Resident Owner",
    phone: "+91 88909 43688",
    rawPhone: "918890943688",
    membersList: [
      { name: "Plot 48A Residence", phone: "+91 88909 43688", rawPhone: "8890943688", role: "Resident" }
    ],
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Clean Record",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [],
    notes: "No vehicles. No encroachment.",
    nuisanceAlert: ""
  }
];

// Direct 1-Click Government Grievance Launchers & Utility Portals
const GRIEVANCE_PORTALS = [
  {
    dept: "JVVNL Smart Meter Portal (स्मार्ट मीटर लॉगिन)",
    issue: "Live Consumption, Daily kWh Readings, Balance & Recharge",
    icon: "electric_meter",
    url: "https://cp.jvvnldhundaramisp.in/",
    tollFree: "1912",
    actionLabel: "Open Smart Meter Dashboard"
  },
  {
    dept: "JVVNL Electricity (बिजली विभाग)",
    issue: "Sparking, Cable Hanging, Voltage Fluctuation & Underground Demand",
    icon: "bolt",
    url: "https://bijlimitra.jvvnl.org/",
    tollFree: "1912",
    actionLabel: "Lodge JVVNL Complaint (Bijli Mitra)"
  },
  {
    dept: "Jal Vibhag / PHED (जल विभाग - वार्ड 145)",
    issue: "Key 1: 140730900524 • Key 2: 140730900535 | Water Helpline 181",
    icon: "water_drop",
    url: "https://sampark.rajasthan.gov.in/",
    tollFree: "181",
    actionLabel: "Report Water Problem (Helpline 181)"
  },
  {
    dept: "Jaipur Nagar Nigam Greater (नगर निगम - वार्ड 145)",
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

// Local Authorities, Vigilance, Helplines, Trades & Colony Contacts (Ward 145)
const CIVIC_AND_TRADE_CONTACTS = [
  // --- ELECTRICITY & POWER ---
  {
    role: "JEN Electricity (कनिष्ठ अभियंता)",
    name: "Rahul Ji (JEN विद्युत विभाग)",
    category: "authority",
    icon: "bolt",
    phone: "+91 94133 90122",
    rawPhone: "9413390122",
    office: "JVVNL Powerhouse CD-II, Jaipur",
    duty: "Underground cabling, transformer tripping & pillar boxes"
  },
  {
    role: "JVVNL Lineman (लाइनमैन विद्युत विभाग)",
    name: "Sunil Thapa (सुनील थापा)",
    category: "authority",
    icon: "electrical_services",
    phone: "+91 96028 47270",
    rawPhone: "9602847270",
    office: "JVVNL Powerhouse Area Unit",
    duty: "Local line fault repair, jumper replacement, phase restoration"
  },

  // --- CIVIC & LOCAL BODY ---
  {
    role: "Area Ward Parshad (पार्षद)",
    name: "Prem Chand (पार्षद)",
    category: "authority",
    icon: "how_to_reg",
    phone: "+91 97857 40980",
    rawPhone: "9785740980",
    office: "Ward 145, Nagar Nigam Greater",
    duty: "Road approvals, drainage allocation, colony meetings"
  },
  {
    role: "Area BJP Karyakarta (कार्यकर्ता)",
    name: "Gokul Mishra (कार्यकर्ता)",
    category: "authority",
    icon: "campaign",
    phone: "+91 93519 41910",
    rawPhone: "9351941910",
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
    office: "Ward 145 Health Dept",
    duty: "Garbage vans, lane sweepers, malba challans"
  },
  {
    role: "Sanitation Staff (सफाई कर्मचारी नगर निगम)",
    name: "Dilip Sarsar (दिलीप सरसर - नगर निगम)",
    category: "authority",
    icon: "mop",
    phone: "+91 99501 87959",
    rawPhone: "9950187959",
    office: "Ward 145 Sanitation Team",
    duty: "Lane sweeping, drainage silt cleaning & waste disposal"
  },

  // --- EMERGENCY & HELPLINES ---
  {
    role: "Police Emergency & Beat",
    name: "Police Emergency 112 / 100",
    category: "authority",
    icon: "local_police",
    phone: "112 / 100",
    rawPhone: "112",
    office: "Local Police Beat & Control Room",
    duty: "Evening anti-social loitering, lane obstruction, security"
  },
  {
    role: "Emergency Ambulance (एम्बुलेंस)",
    name: "Medical Ambulance 102",
    category: "authority",
    icon: "emergency",
    phone: "102",
    rawPhone: "102",
    office: "Rajasthan Emergency Medical Service",
    duty: "Immediate emergency hospital transport & patient care"
  },
  {
    role: "Fire Brigade (अग्निशमन सेवा)",
    name: "Fire Emergency 101",
    category: "authority",
    icon: "local_fire_department",
    phone: "101",
    rawPhone: "101",
    office: "Jaipur Fire Service Control Room",
    duty: "Transformer fire, electrical short circuits, emergency rescue"
  },
  {
    role: "Childline (बाल सुरक्षा हेल्पलाइन)",
    name: "Childline 1098",
    category: "authority",
    icon: "child_care",
    phone: "1098",
    rawPhone: "1098",
    office: "Ministry of Women & Child Development",
    duty: "Child protection, child labour reporting, distress relief"
  },
  {
    role: "ACB Rajasthan (भ्रष्टाचार निरोधक ब्यूरो)",
    name: "ACB Anti-Corruption Rajasthan",
    category: "authority",
    icon: "policy",
    phone: "1064 • WA +91 94135 02834",
    rawPhone: "9413502834",
    office: "Anti-Corruption Bureau, Rajasthan",
    duty: "Bribe demand reporting, government officer vigilance",
    customMsg: "Sir, reporting corruption / bribe demand issue in government department..."
  },
  {
    role: "CBI Jaipur Vigilance (सीबीआई भ्रष्टाचार डेस्क)",
    name: "CBI Jaipur Corruption Desk",
    category: "authority",
    icon: "shield",
    phone: "+91 94140 22600 / 0141-2228315",
    rawPhone: "9414022600",
    office: "Central Bureau of Investigation, Jaipur Branch",
    duty: "Central government corruption complaints & fraud reporting"
  },
  {
    role: "FSSAI Food Safety (खाद्य सुरक्षा हेल्पलाइन)",
    name: "FSSAI Toll-Free 1800112100",
    category: "authority",
    icon: "restaurant",
    phone: "1800112100",
    rawPhone: "1800112100",
    office: "Food Safety and Standards Authority of India",
    duty: "Commercial food adulteration, expired products & hygiene complaints"
  },

  // --- TRADES & ESSENTIAL SERVICES ---
  {
    role: "Water Tank Supplier (पानी टैंकर)",
    name: "Water Tank Supply (पानी टैंकर)",
    category: "trade",
    icon: "local_shipping",
    phone: "+91 97846 88331",
    rawPhone: "9784688331",
    office: "Local Sweet Water Supply",
    duty: "Emergency sweet water tanker supply (मीठे पानी का टैंकर)"
  },
  {
    role: "Water Tank Cleaner (पानी टंकी सफाई)",
    name: "Water Tank Cleaning Service (टंकी सफाई)",
    category: "trade",
    icon: "sanitizer",
    phone: "+91 77423 06456",
    rawPhone: "7742306456",
    office: "Professional Tank Cleaning",
    duty: "Underground sump & overhead sintex tank scrubbing & UV cleaning"
  },
  {
    role: "Refrigerator / AC / Appliances (एसी व फ्रिज मिस्त्री)",
    name: "AC & Home Appliances Repair (एसी, फ्रिज)",
    category: "trade",
    icon: "ac_unit",
    phone: "+91 94619 02505",
    rawPhone: "9461902505",
    office: "Home Appliance Repair Service",
    duty: "AC servicing, gas filling, refrigerator & appliance repairs"
  },
  {
    role: "RO Water Purifier (आर.ओ. मिस्त्री)",
    name: "RO Water Purifier Service (आर.ओ.)",
    category: "trade",
    icon: "water",
    phone: "+91 98280 84367",
    rawPhone: "9828084367",
    office: "Area Water Purifier Solutions",
    duty: "Filter replacement, membrane service & water TDS calibration"
  },
  {
    role: "Electrician (बिजली मिस्त्री)",
    name: "Om Prakash Electrician (इलेक्ट्रीशियन)",
    category: "trade",
    icon: "electric_bolt",
    phone: "+91 98292 64008",
    rawPhone: "9829264008",
    office: "Imli Phatak Electrical Works",
    duty: "House wiring, tripping, MCB, switchboard & invertor fixes"
  },
  {
    role: "Carpenter / Khati (कारपेंटर / बढ़ई)",
    name: "Carpenter Services (कारपेंटर)",
    category: "trade",
    icon: "carpenter",
    phone: "+91 96539 67275",
    rawPhone: "9653967275",
    office: "Woodwork & Furniture Service",
    duty: "Door locks, cupboards, modular woodwork & wooden repair"
  },
  {
    role: "Painter (पेंटर / रंगाई-पुताई)",
    name: "Painter Services (पेंटर)",
    category: "trade",
    icon: "format_paint",
    phone: "+91 99823 31426",
    rawPhone: "9982331426",
    office: "Painting & Wall Putty",
    duty: "Wall putty, emulsion, waterproof exterior paint & polish"
  },
  {
    role: "Mason / Rajmistri (राजमिस्त्री)",
    name: "Masonry & Civil Works (राजमिस्त्री)",
    category: "trade",
    icon: "construction",
    phone: "+91 98280 87470",
    rawPhone: "9828087470",
    office: "Local Mason Services",
    duty: "Tile fitting, plaster, naali / chamber repair & civil work"
  },
  {
    role: "House Help / Maid (घरेलू सहायिका)",
    name: "Sandhya (संध्या - घरेलू सहायिका)",
    category: "trade",
    icon: "cleaning_services",
    phone: "+91 93390 85223",
    rawPhone: "9339085223",
    office: "Arjunpuri Area Domestic Staff",
    duty: "Housekeeping, cleaning, utensil washing & domestic assistance"
  },
  {
    role: "House Help / Maid (घरेलू सहायिका)",
    name: "Bai (बाई - घरेलू सहायिका)",
    category: "trade",
    icon: "cleaning_services",
    phone: "+91 63679 83945",
    rawPhone: "6367983945",
    office: "Arjunpuri Area Domestic Staff",
    duty: "Housekeeping, cleaning, utensil washing & cooking assistance"
  },
  {
    role: "Scrap & Malba Dealer (कबाड़ी)",
    name: "Rashid Khan (कबाड़ी)",
    category: "trade",
    icon: "recycling",
    phone: "+91 92143 59268",
    rawPhone: "9214359268",
    office: "Sahakar Marg Scrap Depot",
    duty: "Iron rods, construction scrap & household waste pickup"
  }
];
