/**
 * OLOID Products & Services Data Module
 * Comprehensive coverage of all mechanical, electrical, upstream, and specialized industrial services.
 */

export const serviceCategories = [
  {
    id: "mechanical",
    slug: "mechanical-rotating-equipment",
    title: "Mechanical & Rotating Equipment",
    shortTitle: "Mechanical",
    icon: "Settings",
    tagline: "Engineered rotating machinery, compression, fluid management, and heavy thermal systems.",
    description: "OLOID supplies, installs, and maintains heavy industrial rotating equipment for petrochemical complexes, oil refineries, power stations, and water infrastructure."
  },
  {
    id: "instrumentation",
    slug: "electrical-control-instrumentation",
    title: "Electrical, Control & Instrumentation",
    shortTitle: "Control & Instrumentation",
    icon: "Cpu",
    tagline: "Turnkey automation, SCADA pipeline monitoring, fiscal metering, and safety systems.",
    description: "End-to-end electrical, telemetry, and automated control packages designed to optimize process throughput, ensure custody transfer accuracy, and safeguard plant assets."
  },
  {
    id: "upstream",
    slug: "upstream-drilling-completion",
    title: "Upstream, Drilling & Completion",
    shortTitle: "Upstream & Drilling",
    icon: "Layers",
    tagline: "High-pressure wellhead equipment, artificial lift solutions, and field production systems.",
    description: "Engineered upstream solutions for harsh reservoir conditions, artificial lift optimization, early oil production facilities, and completion well integrity."
  },
  {
    id: "services",
    slug: "specialized-industrial-services",
    title: "Specialized Engineering Services",
    shortTitle: "Engineering Services",
    icon: "Wrench",
    tagline: "Field commissioning, valve overhaul, precision calibration, and certified technical manpower.",
    description: "Multidisciplinary field engineering services delivering factory acceptance, site integration, non-destructive testing, calibration, and plant maintenance."
  }
];

export const productsAndServicesData = [
  // --- Category 1: Mechanical & Rotating Equipment ---
  {
    id: "valves-actuators",
    slug: "valves-actuators-smart-positioners",
    category: "Mechanical & Rotating Equipment",
    categorySlug: "mechanical-rotating-equipment",
    title: "Valves, Actuators & Smart Positioners",
    summary: "Heavy-duty API 6D/6A pipeline valves, high-performance ball, gate, globe, and check valves equipped with digital smart positioners.",
    description: "OLOID partners with premier manufacturers such as Pibiviesse and Cameron to supply severe-service valves tailored for crude oil pipelines, gas dehydration plants, and petrochemical complexes. Our scope includes trunnion-mounted ball valves, triple-offset butterfly valves, rising stem gate valves, and choke valves with pneumatic, electric, or electro-hydraulic actuators featuring HART and Foundation Fieldbus protocols.",
    keyFeatures: [
      "Sizes ranging from 1/2\" to 56\" with ASME pressure classes 150# through 2500# and API 10,000 PSI",
      "Metal-to-metal seating for abrasive slurry and high-temperature hydrocarbon services",
      "Intelligent electro-pneumatic positioners with diagnostic partial stroke testing (PST)",
      "Fire-safe certified according to API 607, API 6FA, and ISO 10497",
      "Full material traceability with NACE MR0175 / ISO 15156 sour service compliance"
    ],
    specifications: [
      { label: "Design Standards", value: "API 6D, API 6A, ASME B16.34, ISO 14313" },
      { label: "Pressure Rating", value: "Class 150 to Class 2500 (API 2,000 to 15,000 PSI)" },
      { label: "Body Materials", value: "WCB, LCC, Duplex 2205, Super Duplex, Inconel 625 Clad" },
      { label: "Actuation Types", value: "Pneumatic Scotch Yoke, Electric Quarter-Turn, Hydraulic" }
    ],
    applications: [
      "Crude oil export pipelines and manifold isolation",
      "High-pressure natural gas transmission and compression stations",
      "Refinery hydrocracker and catalytic reformer units",
      "Emergency Shutdown (ESD) and High Integrity Pressure Protection (HIPPS)"
    ],
    partnerBrands: ["Pibiviesse", "Cameron", "Cook Compression"],
    image: "/assets/images/p11-b.jpg"
  },
  {
    id: "industrial-pumps",
    slug: "industrial-pumps-multiphase-systems",
    category: "Mechanical & Rotating Equipment",
    categorySlug: "mechanical-rotating-equipment",
    title: "Industrial Pumps & Multiphase Systems",
    summary: "API 610 centrifugal process pumps, positive displacement transfer pumps, and multiphase booster skids.",
    description: "High-reliability fluid handling packages engineered for continuous service in harsh desert and maritime environments. OLOID delivers heavy-duty single and multistage centrifugal pumps, progressive cavity pumps, high-pressure injection pumps, and twin-screw multiphase transfer stations that handle combined oil, gas, and produced water streams without pre-separation.",
    keyFeatures: [
      "Full compliance with API 610 (OH2, BB1, BB2, BB3, BB5) standards",
      "Multiphase boosting capability handling Gas Volume Fractions (GVF) up to 98%",
      "Mechanical seals compliant with API 682 with dual pressurized barrier fluid plans",
      "High-efficiency hydraulics minimizing parasitic power consumption across variable loads",
      "Robust baseplates with integrated vibration and temperature monitoring instrumentation"
    ],
    specifications: [
      { label: "Standard", value: "API 610, ISO 13709, API 676" },
      { label: "Capacity Range", value: "Up to 5,500 m³/hr" },
      { label: "Differential Head", value: "Up to 3,200 meters" },
      { label: "Operating Temperature", value: "-40°C to +400°C" }
    ],
    applications: [
      "Main pipeline crude oil export pumping",
      "Produced water re-injection and aquifer water disposal",
      "Boiler feedwater and condensate return in thermal power plants",
      "Refinery bottoms transfer and hydrocarbon loading terminals"
    ],
    partnerBrands: ["CompAir", "Cameron"],
    image: "/assets/images/pic4.jpg"
  },
  {
    id: "turbines-compressors",
    slug: "turbines-compressors-rotating-trains",
    category: "Mechanical & Rotating Equipment",
    categorySlug: "mechanical-rotating-equipment",
    title: "Turbines, Compressors & Gas Drives",
    summary: "Heavy-duty industrial gas and steam turbines, reciprocating process gas compressors, and rotary screw packages.",
    description: "Integrated rotating machinery packages built for demanding gas compression, reinjection, and on-site power generation. Through partnerships with global compression leaders including Cook Compression and CompAir, OLOID supplies reciprocating and centrifugal compressors, complete with gas coolers, scrubbers, pulsation dampening bottles, and computerized control panels.",
    keyFeatures: [
      "API 618 reciprocating compressors for hydrogen, flare gas, and high-ratio lift gas",
      "API 617 centrifugal compressors with dry gas seal systems and magnetic bearings",
      "Engineered valve upgrades, piston rings, and rider bands from Cook Compression",
      "Continuous condition monitoring including Bentley Nevada vibration protection",
      "Skid-mounted acoustic enclosures for noise attenuation down to 85 dBA"
    ],
    specifications: [
      { label: "Design Standards", value: "API 618, API 617, API 619, ASME Sec. VIII" },
      { label: "Power Ratings", value: "500 kW to 25 MW per machine train" },
      { label: "Discharge Pressure", value: "Up to 350 bar (5,075 PSI)" },
      { label: "Gas Compositions", value: "Sweet/Sour Natural Gas, H2, CO2, Hydrocarbon gas mixes" }
    ],
    applications: [
      "Associated petroleum gas (APG) capture and flare reduction projects",
      "Pipeline gas gathering and transmission booster stations",
      "Refinery catalytic hydrodesulfurization (HDS) recycle gas loops",
      "Combined heat and power (CHP) industrial cogeneration"
    ],
    partnerBrands: ["Cook Compression", "CompAir"],
    image: "/assets/images/oil_field_saudi.jpg"
  },
  {
    id: "process-equipment",
    slug: "heat-exchangers-cooling-towers-effluent-treatment",
    category: "Mechanical & Rotating Equipment",
    categorySlug: "mechanical-rotating-equipment",
    title: "Heat Exchangers, Cooling Towers & Process Units",
    summary: "Shell and tube heat exchangers, air-cooled fin-fan coolers, industrial cooling towers, and environmental effluent units.",
    description: "Thermal transfer and environmental treatment infrastructure for refineries and utility plants. Partnering with Hamon and leading heat transfer specialists, OLOID provides custom-designed shell & tube exchangers (TEMA standard), induced-draft wet cooling towers, air-cooled heat exchangers (ACHE), and oily wastewater effluent purification packages.",
    keyFeatures: [
      "TEMA R, C, and B designs engineered with ASME Section VIII Division 1 & 2 stamps",
      "Heavy duty induced draft cooling towers with anti-fouling film fill for saline water",
      "Direct and indirect dry cooling systems for arid desert water-conservation projects",
      "Complete oil-water separation, DAF (Dissolved Air Flotation), and biological treatment skids",
      "High corrosion resistance metallurgy: Titanium, Inconel, 90/10 Cu-Ni, and Super Ferritic"
    ],
    specifications: [
      { label: "Codes", value: "TEMA, ASME Section VIII, API 660, API 661" },
      { label: "Thermal Duty", value: "Custom engineered from 1 MWth to 500 MWth" },
      { label: "Cooling Tower Types", value: "Crossflow, Counterflow, Air-Cooled Condensers (ACC)" },
      { label: "Cooling Media", value: "Treated River Water, Brackish Water, Seawater, Hydrocarbon fluids" }
    ],
    applications: [
      "Crude oil distillation column condensers and reboilers",
      "Thermal and combined-cycle power station turbine exhaust cooling",
      "Refinery wastewater remediation and Zero Liquid Discharge (ZLD) plants",
      "Petrochemical synthesis cooling circuits"
    ],
    partnerBrands: ["Hamon", "Lectrodryer"],
    image: "/assets/images/mission.jpg"
  },
  {
    id: "dryers-filtration",
    slug: "industrial-dryers-filtration-systems",
    category: "Mechanical & Rotating Equipment",
    categorySlug: "mechanical-rotating-equipment",
    title: "Industrial Dryers & High-Efficiency Filtration",
    summary: "Desiccant gas dryers, membrane dehydration units, coalescing separator filters, and generator hydrogen driers.",
    description: "Instrument air and process gas must meet stringent dew-point and particulate standards to prevent line hydrate formation and instrument failure. OLOID supplies twin-tower heatless and heated desiccant dryers from Lectrodryer, alongside multi-stage gas coalescers, particulate filter separators, and automatic backwash liquid strainers.",
    keyFeatures: [
      "Pressure dew point suppression down to -40°C or -70°C (-100°F)",
      "High-efficiency micro-fiber coalescing elements with 99.99% aerosol removal efficiency",
      "Specialized generator hydrogen dryers for high-output utility turbogenerators",
      "Differential pressure transmitter feedback for predictive element replacement",
      "Skidded packages pre-piped, pre-wired, and pressure-tested prior to dispatch"
    ],
    specifications: [
      { label: "Standards", value: "ASME B31.3, ASME Sec. VIII, ISO 8573.1 Class 1-2" },
      { label: "Pressure Range", value: "7 bar to 200 bar" },
      { label: "Flow Capacity", value: "50 Nm³/hr to 50,000 Nm³/hr" },
      { label: "Desiccant Types", value: "Activated Alumina, Molecular Sieve 4A/13X, Silica Gel" }
    ],
    applications: [
      "Plant instrument air supply networks",
      "Natural gas dehydration prior to long-distance pipeline transport",
      "Hydrogen gas purification for power generator cooling loops",
      "Fuel gas conditioning for gas turbine combustion systems"
    ],
    partnerBrands: ["Lectrodryer", "CompAir"],
    image: "/assets/images/p11-b.jpg"
  },

  // --- Category 2: Electrical, Control & Instrumentation ---
  {
    id: "scada-leak-detection",
    slug: "pipeline-scada-leak-detection-systems",
    category: "Electrical, Control & Instrumentation",
    categorySlug: "electrical-control-instrumentation",
    title: "Pipeline SCADA & Advanced Leak Detection",
    summary: "Turnkey pipeline supervisory control, data acquisition, and real-time computational transient leak detection (LDS).",
    description: "In collaboration with Atmos International—the undisputed global leader in pipeline leak and theft detection—OLOID provides industry-proven pipeline integrity systems. Our solutions integrate field RTUs, satellite/fiber communications, dynamic hydraulic simulation, and acoustic pressure wave monitoring to rapidly detect and locate leaks within minutes.",
    keyFeatures: [
      "Atmos Pipe statistical mass-balance and acoustic pressure-wave detection",
      "Pinpoint leak location accuracy within ±50 meters of actual rupture or theft tapping",
      "Full capability on liquid crude, refined products, multiphase pipelines, and high-pressure gas",
      "Robust detection during shut-in, transient packing/unpacking, and continuous pumping",
      "Integration with redundant master SCADA servers, historian databases, and GIS mapping"
    ],
    specifications: [
      { label: "Detection Technology", value: "Corrected Volume Balance, Pressure Wave, Negative Pressure Wave" },
      { label: "Response Time", value: "Under 2 minutes for ruptures; under 15 minutes for minor leaks" },
      { label: "Standards Compliance", value: "API 1130, API 1175, TRFL 2017, CSA Z662" },
      { label: "Communications", value: "OPC UA, Modbus TCP, DNP3, Satellite VSAT, Fiber Optic" }
    ],
    applications: [
      "Cross-country crude oil and condensate export pipelines",
      "Refined petroleum distribution networks (gasoline, diesel, jet fuel)",
      "Strategic natural gas transmission trunklines",
      "Theft detection and illegal tap identification in remote rights-of-way"
    ],
    partnerBrands: ["Atmos International", "Omniflow"],
    image: "/assets/images/oil_field_saudi.jpg"
  },
  {
    id: "fiscal-metering",
    slug: "fiscal-custody-transfer-metering-systems",
    category: "Electrical, Control & Instrumentation",
    categorySlug: "electrical-control-instrumentation",
    title: "Custody Transfer & Fiscal Metering Systems",
    summary: "Turnkey fiscal metering skids, ultrasonic flow measurement, bi-directional pipe provers, and flow computers.",
    description: "Custody transfer systems are the financial cash registers of the petroleum industry. OLOID engineers, packages, and commissions high-accuracy fiscal metering skids featuring ultrasonic meters, Coriolis mass meters, and Cameron Jiskoot fiscal sampling systems, paired with OMNI flow computers and master meter proving loops.",
    keyFeatures: [
      "Measurement uncertainties down to ±0.15% for liquid hydrocarbons and ±0.3% for natural gas",
      "Integrated Cameron Jiskoot isokinetic crude oil sampling for BS&W verification",
      "Multi-stream fiscal flow computers (OMNI 6000/7000) with dual redundant networking",
      "Bi-directional compact pipe provers for on-line meter factor calibration",
      "Complete fiscal supervisory software with automated batch reporting and audit logging"
    ],
    specifications: [
      { label: "Standards", value: "API MPMS, ISO 5167, AGA Report 9/7/3, OIML R117" },
      { label: "Uncertainty", value: "±0.10% to ±0.20% mass or volume" },
      { label: "Flow Meters", value: "Multi-path Ultrasonic, Coriolis, Helical Turbine (Faure Herman)" },
      { label: "Sampling", value: "Cameron Jiskoot 210 / 710 series isokinetic samplers" }
    ],
    applications: [
      "Crude oil marine export terminals and tanker loading jetties",
      "Cross-border natural gas pipeline custody transfer stations",
      "Refinery feedstock allocation and final product blending",
      "Railcar and tank truck automated top/bottom loading gantries"
    ],
    partnerBrands: ["Cameron", "Faure Herman", "Omniflow", "Seametrics"],
    image: "/assets/images/p11-b.jpg"
  },
  {
    id: "process-instrumentation",
    slug: "process-instruments-sensors-gauges",
    category: "Electrical, Control & Instrumentation",
    categorySlug: "electrical-control-instrumentation",
    title: "Process Instruments: Sensors, Gauges & Level Systems",
    summary: "Precision field transmitters for pressure, temperature, level, flow, and chemical process analyzers.",
    description: "Accurate field sensing is essential for safe process automation. OLOID supplies process instrumentation from world-renowned manufacturers including VEGA (radar and radiometric level measurement), Rüeger (precision temperature sensing), Optek (inline photometers and turbidimeters), and Thermo Fisher (chemical spectroscopy and nucleonic density analyzers).",
    keyFeatures: [
      "80 GHz non-contact radar level transmitters for foaming crude and high-dust silos from VEGA",
      "Precision RTDs, thermocouples, and bimetallic thermometers from Rüeger",
      "Inline photometric turbidity and color absorption sensors from Optek-Danulat",
      "SIL2 / SIL3 certified functional safety transmitter architectures",
      "HART, Foundation Fieldbus, and Profibus PA communication interfaces"
    ],
    specifications: [
      { label: "Level Technologies", value: "80 GHz Radar, Guided Wave Radar, Radiometric, Hydrostatic" },
      { label: "Temperature", value: "-200°C to +1600°C (Pt100, Thermocouples Types K, N, S, B)" },
      { label: "Certifications", value: "ATEX, IECEx, FM, SIL 2 / SIL 3" },
      { label: "Ingress Protection", value: "IP66 / IP67 / IP68 stainless steel field housings" }
    ],
    applications: [
      "Crude storage tank farm inventory monitoring (ATG)",
      "High-pressure separator vessel level and interface control",
      "Petrochemical distillation column thermal profiling",
      "Water treatment turbidity, pH, conductivity, and dissolved oxygen monitoring"
    ],
    partnerBrands: ["VEGA", "Rüeger", "Optek", "Thermo Fisher", "Arkon"],
    image: "/assets/images/mission.jpg"
  },
  {
    id: "automation-plc-sis",
    slug: "automation-plc-dcs-safety-systems",
    category: "Electrical, Control & Instrumentation",
    categorySlug: "electrical-control-instrumentation",
    title: "PLCs, DCS & Safety Instrumented Systems (SIS)",
    summary: "Programmable logic controllers, distributed control systems, emergency shutdown (ESD), and burner management systems.",
    description: "Integrated control architectures designed to maximize uptime while maintaining fail-safe reliability. OLOID’s automation engineering team delivers customized PLC, DCS, and SIS panels utilizing hardware from leading international OEMs, providing complete software programming, Human Machine Interface (HMI) screens, and factory acceptance testing.",
    keyFeatures: [
      "Triple Modular Redundant (TMR) safety architectures rated SIL3 according to IEC 61508/61511",
      "High-availability hot-standby redundant processor configurations",
      "Ergonomic operator HMI consoles conforming to ISA 101 high-performance graphics standards",
      "Complete Sequence of Events (SOE) recording with 1-millisecond timestamp resolution",
      "Secure cyber-hardened network gateways complying with IEC 62443"
    ],
    specifications: [
      { label: "Safety Rating", value: "SIL 2 / SIL 3 (IEC 61508 / IEC 61511)" },
      { label: "Architecture", value: "1oo2D, 2oo3 (TMR), Dual Redundant 1oo2" },
      { label: "Protocols", value: "Modbus TCP, Ethernet/IP, Profinet, IEC 61850, OPC UA" },
      { label: "Panels", value: "Rittal form factor with NEMA 4X / IP55-65 environmental ratings" }
    ],
    applications: [
      "Emergency Shutdown (ESD) and Depressuring (EDP) systems",
      "Compressor antisurge and turbine speed governing systems",
      "Wellhead control panels (WHCP) with multi-well hydraulic control",
      "Fired heater and boiler burner management systems (BMS)"
    ],
    partnerBrands: ["CG Global", "Omniflow"],
    image: "/assets/images/oil_field_saudi.jpg"
  },
  {
    id: "electrical-motors-drives",
    slug: "motors-variable-frequency-drives",
    category: "Electrical, Control & Instrumentation",
    categorySlug: "electrical-control-instrumentation",
    title: "Electrical Motors, VFDs & Transformers",
    summary: "Medium and low voltage induction motors, variable frequency drives (VFDs), and heavy industrial power transformers.",
    description: "Through partnerships with CG Global (Crompton Greaves) and leading electrical OEMs, OLOID supplies energy-efficient electric motors, explosion-proof hazardous area drives, medium voltage soft starters, and power distribution transformers engineered for harsh industrial operating environments.",
    keyFeatures: [
      "Low and medium voltage explosion-proof motors certified Ex d, Ex e, and Ex nA",
      "Active front end (AFE) VFDs providing low harmonic distortion (IEEE 519 compliance)",
      "High ambient temperature design rated for continuous +55°C desert operation",
      "Oil-immersed and cast resin dry-type transformers up to 50 MVA and 132 kV",
      "Integrated motor management relays with comprehensive thermal and bearing protection"
    ],
    specifications: [
      { label: "Standards", value: "IEC 60034, NEMA MG-1, IEEE 841, API 541 / API 547" },
      { label: "Power Range", value: "0.75 kW to 15,000 kW (LV & MV up to 13.8 kV)" },
      { label: "Efficiency Class", value: "IE3 Premium Efficiency & IE4 Super Premium" },
      { label: "Enclosure", value: "TEFC (IP55/IP56/IP66) Cast Iron Frame" }
    ],
    applications: [
      "Main oil pipeline pumps and water injection drivers",
      "Refinery compressor motor trains and cooling tower fan drives",
      "Substation power step-down and industrial distribution",
      "Harsh desert outdoor pump jacks and artificial lift surface drives"
    ],
    partnerBrands: ["CG Global"],
    image: "/assets/images/pic4.jpg"
  },

  // --- Category 3: Upstream, Drilling & Completion ---
  {
    id: "upstream-wellheads",
    slug: "wellheads-chokes-christmas-trees",
    category: "Upstream, Drilling & Completion",
    categorySlug: "upstream-drilling-completion",
    title: "Wellheads, Chokes & Christmas Trees (C-Trees)",
    summary: "API 6A surface wellheads, production Christmas trees, positive/adjustable chokes, and emergency shutdown valves.",
    description: "Crucial surface barriers controlling reservoir flow at high pressure and corrosive acid conditions. OLOID supplies API 6A certified wellhead housings, casing spools, tubing heads, manual and actuated gate valves, and choke assemblies suitable for sweet, sour (H2S), and CO2 injection service.",
    keyFeatures: [
      "Working pressures up to 15,000 PSI with temperature classes L through U (-46°C to +121°C)",
      "C-Tree configurations tailored for natural flow, gas lift, or ESP artificial lift completions",
      "Tungsten carbide choke trims engineered for severe erosion and sand production service",
      "Integrated emergency surface safety valves (SSV) with hydraulic fail-safe closure",
      "Full API Spec 6A Product Specification Levels (PSL 1, 2, 3, 3G, and 4)"
    ],
    specifications: [
      { label: "Standard", value: "API Spec 6A, NACE MR0175, ISO 10423" },
      { label: "Working Pressure", value: "2,000 PSI to 15,000 PSI" },
      { label: "Material Class", value: "AA through HH (Carbon steel to solid Inconel 718)" },
      { label: "PSL Levels", value: "PSL 1, PSL 2, PSL 3, PSL 3G, PSL 4" }
    ],
    applications: [
      "Onshore crude oil production wells and high-pressure gas wells",
      "Water and gas injection wells for reservoir pressure maintenance",
      "Acid gas reinjection completions",
      "Thermal recovery and steam-assisted gravity drainage (SAGD)"
    ],
    partnerBrands: ["Cameron", "Pibiviesse"],
    image: "/assets/images/oil_field_saudi.jpg"
  },
  {
    id: "artificial-lift-esp",
    slug: "electric-submersible-pumps-artificial-lift",
    category: "Upstream, Drilling & Completion",
    categorySlug: "upstream-drilling-completion",
    title: "Electric Submersible Pumps (ESP) & Artificial Lift",
    summary: "High-volume downhole electric submersible pumps, gas separators, surface controllers, and gas lift mandrels.",
    description: "Maximizing hydrocarbon recovery as reservoir pressures decline. OLOID delivers electric submersible pump (ESP) systems, high-temperature downhole motors, rotary gas separators, protector seals, and side-pocket gas lift mandrels engineered for mature fields and high water-cut operations.",
    keyFeatures: [
      "High run-life multi-stage centrifugal pumps handling up to 35,000 BPD",
      "Severe abrasion-resistant bearings and ceramic bushings for sand-laden crude",
      "Downhole sensor pods transmitting real-time intake/discharge pressure, temp, and vibration",
      "Surface variable speed drive (VSD) panels with automated pump curve tracking",
      "Gas lift side pocket mandrels and check valves for continuous and intermittent gas lift"
    ],
    specifications: [
      { label: "Flow Capacity", value: "100 BPD to 35,000 BPD" },
      { label: "Motor Power", value: "30 HP to 1,500 HP (Voltages up to 5,000V)" },
      { label: "Reservoir Temp", value: "Rated up to 220°C (428°F)" },
      { label: "Metallurgy", value: "Ni-Resist, Duplex stainless steel, Monel coatings" }
    ],
    applications: [
      "Mature oil field waterflood production optimization",
      "Heavy crude oil artificial lift with high viscosity",
      "Deep reservoir high-temperature production",
      "Dewatering of unconventional gas reservoirs"
    ],
    partnerBrands: ["Cameron"],
    image: "/assets/images/pic4.jpg"
  },
  {
    id: "early-production-facilities",
    slug: "early-production-facilities-separation",
    category: "Upstream, Drilling & Completion",
    categorySlug: "upstream-drilling-completion",
    title: "Early Production Facilities (EPF) & Skids",
    summary: "Modular early production skids, 2-phase/3-phase test separators, degassing stations, and indirect bath heaters.",
    description: "Accelerating time-to-first-oil. OLOID delivers fast-track skidded Early Production Facilities (EPF) that allow operators to produce, separate, treat, and meter oil and gas while permanent central processing facilities (CPF) are designed and constructed.",
    keyFeatures: [
      "Self-contained 3-phase horizontal separator skids with automated level & dump controls",
      "Indirect water bath heaters and crude oil electrostatic coalescer skids",
      "Skidded fuel gas conditioning and emergency flaring systems",
      "Fast field deployment with pre-commissioned plug-and-play piping and cabling",
      "Modular expandability matching field appraisal and production ramp-up"
    ],
    specifications: [
      { label: "Capacity", value: "5,000 BPD to 25,000 BPD per train" },
      { label: "Design Codes", value: "ASME Section VIII Div 1, API 12J, API 12K" },
      { label: "Separation", value: "3-Phase (Oil / Water / Gas) with retention time optimization" },
      { label: "Mounting", value: "Structural oilfield oil-skid with ISO lifting lugs" }
    ],
    applications: [
      "Appraisal well testing and extended production testing (EWT)",
      "Remote field commercialization prior to permanent pipeline links",
      "Temporary processing during central plant turnaround and shutdowns",
      "Associated gas sweetening and field power generation"
    ],
    partnerBrands: ["Cameron", "Lectrodryer", "Omniflow"],
    image: "/assets/images/oil_field_saudi.jpg"
  },

  // --- Category 4: Specialized Industrial Engineering Services ---
  {
    id: "systems-integration-commissioning",
    slug: "systems-integration-commissioning-services",
    category: "Specialized Engineering Services",
    categorySlug: "specialized-industrial-services",
    title: "Systems Integration & Plant Commissioning",
    summary: "Turnkey automation engineering, panel building, Factory Acceptance Testing (FAT), and field commissioning (SAT).",
    description: "Bridging the gap between OEM equipment and reliable operational facility startup. OLOID provides complete engineering lifecycle support: functional requirement specifications (FRS), loop diagram design, control panel fabrication, software integration, cold loop checks, hot commissioning, and final Site Acceptance Testing (SAT).",
    keyFeatures: [
      "Experienced certified automation and instrumentation engineers on-site",
      "Integrated FAT simulation verifying 100% of I/O logic prior to shipment",
      "Comprehensive redline markups, as-built documentation, and instrument datasheets",
      "Seamless DCS/SCADA third-party protocol translation (Modbus, Profibus, DNP3)",
      "Post-commissioning operational handover and operator training curriculums"
    ],
    specifications: [
      { label: "Standards", value: "IEC 61511, ISA-84, IEEE, ISO 9001" },
      { label: "Scope", value: "Engineering, Procurement, Software, FAT, SAT, Startup" },
      { label: "Industries", value: "Oil & Gas, Petrochemical, Water Transmission, Steel Mills" },
      { label: "Staff", value: "Certified TUV Rheinland Functional Safety Engineers" }
    ],
    applications: [
      "Grassroots central processing facility (CPF) automation",
      "Legacy DCS and PLC migration and hot-cutover projects",
      "Pipeline pumping station instrumentation and remote control integration",
      "Water desalination and distribution SCADA retrofits"
    ],
    partnerBrands: ["Atmos International", "CG Global", "Omniflow"],
    image: "/assets/images/mission.jpg"
  },
  {
    id: "valve-actuator-maintenance",
    slug: "valve-actuator-maintenance-overhaul",
    category: "Specialized Engineering Services",
    categorySlug: "specialized-industrial-services",
    title: "Valve & Actuator Maintenance, Lapping & Testing",
    summary: "In-situ valve testing, seat lapping, pressure testing, actuator overhaul, and relief valve recertification.",
    description: "Maintaining safety and sealing integrity across critical process lines. OLOID operates mobile valve service workshops and regional service centers equipped for valve disassembly, precision lapping, seat replacement, hydrostatic shell testing, seat leakage testing, and automated PSV relief valve popping certification.",
    keyFeatures: [
      "Mobile containerized test benches capable of on-site testing up to 10,000 PSI",
      "In-situ portable flange facing and valve seat lapping without removing pipe bodies",
      "Pneumatic and hydraulic actuator cylinder resealing and diagnostic calibration",
      "Full compliance with API 598 valve inspection and testing protocols",
      "Electronic test certificate generation with trace audit data for regulatory compliance"
    ],
    specifications: [
      { label: "Testing Codes", value: "API 598, API 6D, ASME B16.34, API 527" },
      { label: "Test Pressures", value: "Hydrostatic up to 1,000 bar (15,000 PSI); Pneumatic up to 400 bar" },
      { label: "Sizes Handled", value: "1/2\" up to 48\" flanged, welded, and threaded ends" },
      { label: "Valve Types", value: "Ball, Gate, Globe, Check, Control, Butterfly, PSV" }
    ],
    applications: [
      "Plant annual maintenance turnarounds (TAR) and shutdowns",
      "Pipeline valve integrity inspection and preventive servicing",
      "Emergency high-pressure gas relief valve testing and recertification",
      "Severe service choke and control valve trim refurbishment"
    ],
    partnerBrands: ["Pibiviesse", "Cameron", "Cook Compression"],
    image: "/assets/images/p11-b.jpg"
  },
  {
    id: "metering-calibration-certification",
    slug: "metering-instrument-calibration-services",
    category: "Specialized Engineering Services",
    categorySlug: "specialized-industrial-services",
    title: "Instrumentation & Metering Calibration Services",
    summary: "Accredited on-site calibration of fiscal flow meters, pressure transmitters, temperature sensors, and analyzers.",
    description: "Accuracy and traceability are non-negotiable in process accounting and safety systems. OLOID field metrologists utilize master calibration instruments traceable to NIST and international standards to perform on-site and laboratory calibrations of flow meters, pressure transmitters, multivariable transmitters, and gas chromatographs.",
    keyFeatures: [
      "Certified master prover loops for liquid hydrocarbon meter factor verification",
      "High-precision deadweight testers and automated pressure calibrators",
      "Dry-block temperature calibrators and precision RTD reference standards",
      "Certified gas blend calibration for inline gas chromatographs and gas analyzers",
      "Detailed calibration certificates recording as-found / as-left data and uncertainty"
    ],
    specifications: [
      { label: "Traceability", value: "NIST, PTB, UKAS Traceable Reference Standards" },
      { label: "Standards", value: "API MPMS Chapter 4 (Proving), ISO 17025 Compliant" },
      { label: "Scope", value: "Flow, Pressure, Temperature, Level, Analytical Instruments" },
      { label: "Documentation", value: "Formal calibration certificates with calculated measurement uncertainty" }
    ],
    applications: [
      "Fiscal and custody transfer annual certification audits",
      "Refinery mass balance and loss control reconciliation",
      "Environmental continuous emissions monitoring (CEMS) linearity tests",
      "Safety instrumented loop calibration and proof test verification"
    ],
    partnerBrands: ["Faure Herman", "VEGA", "Rüeger", "Optek", "Seametrics"],
    image: "/assets/images/pic4.jpg"
  },
  {
    id: "manpower-technical-consultancy",
    slug: "technical-manpower-consultancy-services",
    category: "Specialized Engineering Services",
    categorySlug: "specialized-industrial-services",
    title: "Technical Manpower Supply & Consultancy",
    summary: "Certified instrumentation technicians, rotating machinery engineers, commissioning specialists, and environmental advisors.",
    description: "Supporting project teams with specialized engineering talent and consultancy. OLOID provides highly trained, certified technical personnel—including rotating machinery specialists, instrumentation engineers, DCS programmers, and environmental consultants—for short-term turnarounds and long-term operating contracts.",
    keyFeatures: [
      "Rigorous technical vetting, certification verification, and safety training",
      "TÜV certified functional safety engineers and API certified inspectors",
      "Industrial wastewater treatment and environmental effluent consultancy",
      "Complete logistics, visa clearance, medical screening, and field support handled in-house",
      "Rapid mobilization to plant sites across Iraq, Jordan, and the Gulf region"
    ],
    specifications: [
      { label: "Disciplines", value: "Mechanical Rotating, Instrumentation & Controls, Electrical, HSE" },
      { label: "Qualifications", value: "B.Sc. Engineering, TÜV FS Eng, API 510/570/653, CompEx Hazardous Area" },
      { label: "Engagement", value: "Turnaround support, commissioning teams, full-year secondment" },
      { label: "Coverage", value: "Baghdad, Basra, Baiji, regional Middle East operations" }
    ],
    applications: [
      "Major refinery and petrochemical plant turnarounds (TAR)",
      "Field commissioning and startup supervision for international EPC contractors",
      "Environmental compliance auditing and waste management planning",
      "Long-term rotating equipment predictive maintenance operations"
    ],
    partnerBrands: ["Hamon", "Cook Compression", "Atmos International"],
    image: "/assets/images/mission.jpg"
  }
];

