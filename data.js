// Arjunpuri 1st Link Road - Official Verified Resident & Plot Database
const RESIDENTS_DATA = [
  {
    plot: "31",
    surname: "Singhs",
    members: "Gaurav, Pramod & Rekha",
    relation: "Resident Owner",
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
    notes: "",
    nuisanceAlert: ""
  },
  {
    plot: "30",
    surname: "Guptas",
    members: "Ashok Gupta & Family",
    relation: "Resident Owner",
    phone: "+91 98290 75229",
    rawPhone: "919829075229",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "2 Tenants",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: true,
    vehicles: [
      "RJ 14 CK 2863 (Maruti Suzuki Dzire)"
    ],
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "2 Tenants on premises",
    nuisanceAlert: ""
  },
  {
    plot: "29",
    surname: "MLAs",
    members: "MLA Associated Family",
    relation: "Resident Owner",
    phone: "+91 96944 73000",
    rawPhone: "919694473000",
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
    loadKw: "10 kW (3-Phase)",
    meterType: "Smart Meter",
    notes: "Drainage chamber L-joint connection completed",
    nuisanceAlert: ""
  },
  {
    plot: "28",
    surname: "Radhe Radhe",
    members: "Radhe Radhe Residence",
    relation: "Tenanted Property",
    phone: "+91 75973 02948",
    rawPhone: "917597302948",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 2,
    tenantInfo: "Has Tenants",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [],
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "Has tenants, No encroachment",
    nuisanceAlert: ""
  },
  {
    plot: "24",
    surname: "Sokhiyas",
    members: "Varsha, Sonu, Hardik, Ranveer, Sakshi, Pankaj & Ashish Sokhiya",
    relation: "Resident Owner",
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
    notes: "Front parking dedicated",
    nuisanceAlert: ""
  },
  {
    plot: "23",
    surname: "Guptas",
    members: "Daya Gupta, Kaushalya Gupta, Mohini & Vishal Gupta",
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
    surname: "Sainis (PG)",
    members: "Saini Ji & PG Students",
    relation: "Resident Owner",
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
    surname: "Sainis & Chaudharys",
    members: "Chaudhary couple, Rahul Saini, Nikhil Saini",
    relation: "Resident Owner",
    phone: "+91 94617 83436",
    rawPhone: "919461783436",
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
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "No encroachment, 2 tenants",
    nuisanceAlert: ""
  },
  {
    plot: "20",
    surname: "Corner Plot (Tenants)",
    members: "4 Tenants Outside",
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
    surname: "Taparias",
    members: "Rajesh Taparia & Family",
    relation: "Resident Owner",
    phone: "+91 93148 35023",
    rawPhone: "919314835023",
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
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Active in civic coordination & underground cabling",
    nuisanceAlert: ""
  },
  {
    plot: "AA 16",
    surname: "Agrawals (Kailash Villa)",
    members: "Golden & Family",
    relation: "Resident Owner",
    phone: "+91 92140 75229",
    rawPhone: "919214075229",
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
    loadKw: "7 kW",
    meterType: "Electronic Meter",
    notes: "Kailash Villa, Longstanding resident, designated front parking",
    nuisanceAlert: ""
  },
  {
    plot: "15A",
    surname: "Kumawats",
    members: "Madan Mohan, Sushila & Nishant Kumawat",
    relation: "Resident Owner",
    phone: "+91 90241 10043",
    rawPhone: "919024110043",
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
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Kumawat Family Residence",
    nuisanceAlert: ""
  },
  {
    plot: "B13",
    surname: "Chandwars",
    members: "Anil Chandwar & Naman Chandwar",
    relation: "Resident Owner",
    phone: "+91 97856 07150",
    rawPhone: "919785607150",
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
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Chandwar Family Residence",
    nuisanceAlert: ""
  },
  {
    plot: "A14",
    surname: "Bambanis",
    members: "Ashish Bambani",
    relation: "Resident Owner",
    phone: "+91 98870 00785",
    rawPhone: "919887000785",
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
    loadKw: "7 kW",
    meterType: "Smart Meter",
    notes: "Permanent Resident",
    nuisanceAlert: ""
  },
  {
    plot: "14A",
    surname: "Varalika Compu Power",
    members: "Varalika Compu Power Systems",
    relation: "Commercial Unit",
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
    surname: "Boolchandanis",
    members: "Kuldeep Boolchandani (4 Tenants)",
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
    surname: "Rathores",
    members: "Rathore Sahab's Home",
    relation: "Resident Owner",
    phone: "+91 99822 31470",
    rawPhone: "919982231470",
    photoUrl: "",
    hasTenant: true,
    tenantCount: 1,
    tenantInfo: "1 Tenant",
    policeVerified: true,
    policeVerifRef: "Verified Record",
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
    surname: "Plot 48A",
    members: "Plot 48A Residence",
    relation: "Resident Owner",
    phone: "+91 88909 43688",
    rawPhone: "918890943688",
    photoUrl: "",
    hasTenant: false,
    tenantCount: 0,
    tenantInfo: "Clean Record",
    policeVerified: true,
    policeVerifRef: "Verified Record",
    hasEncroachment: false,
    vehicles: [],
    loadKw: "5 kW",
    meterType: "Electronic Meter",
    notes: "No vehicles, no encroachment",
    nuisanceAlert: ""
  },
  {
    plot: "4",
    surname: "Pushpendra (Cafe & PG)",
    members: "Pushpendra (15-20 Tenants)",
    relation: "Commercial / PG",
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
  },

  // --- COLONY RESIDENTS & COORDINATORS ---
  {
    role: "Colony Liaison / Resident",
    name: "Dinesh Ji Arjunpuri",
    category: "colony",
    icon: "groups",
    phone: "+91 85040 71231",
    rawPhone: "8504071231",
    office: "Arjunpuri 1st Community",
    duty: "Colony matters, coordination & resident welfare"
  },
  {
    role: "Colony Liaison / Resident",
    name: "N N Arjunpuri",
    category: "colony",
    icon: "groups",
    phone: "+91 92516 87044",
    rawPhone: "9251687044",
    office: "Arjunpuri 1st Community",
    duty: "Colony liaison & community coordination"
  },
  {
    role: "Plot 14A / Commercial Resident",
    name: "Goyal Ji Arjunpuri",
    category: "colony",
    icon: "home",
    phone: "+91 94134 90448",
    rawPhone: "9413490448",
    office: "Plot 14A (Varalika Compu Power)",
    duty: "Resident owner, commercial power systems"
  }
];
