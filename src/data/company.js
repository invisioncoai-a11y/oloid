/**
 * OLOID Corporate Profile & Operational Data
 * All verified company details, historical footprint, divisions, and verified regional hubs.
 */

export const companyData = {
  name: "OLOID",
  legalName: "OLOID Industrial and Petroleum Services",
  shortName: "OLOID",
  domain: "https://oloid.company",
  tagline: "Engineering, Industrial Technology & Petroleum Services",
  foundedYear: 2011,
  
  meta: {
    title: "OLOID — Engineering, Industrial Technology & Petroleum Services",
    description: "OLOID modernizes major industrial sectors including Oil & Gas, petrochemicals, power, and water through global engineering partnerships and certified technical services.",
  },

  summary: "OLOID is dedicated to modernizing and developing the major industrial sectors of energy, Oil & Gas, petrochemicals, mechanical & rotating equipment, utilities, and high-spec manufacturing. By building long-term, value-added relationships with leading international technology partners from the U.S.A., Canada, Europe, CIS, and the Far East, we deliver best-of-breed equipment, turnkey systems integration, and dedicated after-sales support.",

  history: "Established in 2011, OLOID was founded by industrial veterans with decades of senior engineering experience across Middle Eastern and international energy corridors. Originating with strategic ties to prominent industrial development groups with over 30 years of regional operating pedigree, OLOID quickly built an expansive footprint with established offices in Baghdad, Basra, Baiji, Amman, and the United Kingdom.",

  mission: "To make a lasting difference in the modernization of critical industrial infrastructure—including petroleum, power generation, water transmission, steel fabrication, and major process manufacturing—by introducing world-class technologies, global engineering know-how, and enduring OEM joint ventures.",

  vision: "To be the premier industrial and petroleum technology provider in the region, setting the benchmark for engineering integrity, lifecycle operational reliability, and technology transfer to international standards.",

  values: [
    {
      id: "excellence",
      title: "Engineering Excellence",
      description: "Partnering exclusively with certified global OEMs and adhering to strict international engineering standards (API, ASME, ISO, IEC)."
    },
    {
      id: "integrity",
      title: "Integrity & Long-Term Trust",
      description: "Cultivating transparent, mutually rewarding relationships with clients, national operators, and multinational technology providers."
    },
    {
      id: "safety",
      title: "HSE & Environmental Stewardship",
      description: "Prioritizing zero-incident operations, industrial effluent treatment, emissions reduction, and environmental sustainability across all field works."
    },
    {
      id: "agility",
      title: "Agility & Dedicated Support",
      description: "Providing localized field engineering, responsive spare parts availability, and lifecycle after-sales support through dedicated division teams."
    }
  ],

  divisions: [
    {
      id: "mechanical",
      title: "Mechanical Division",
      slug: "mechanical-division",
      headline: "High-spec rotating equipment, compression, turbines, and fluid control.",
      description: "Dedicated to the engineering, supply, installation, and overhaul of mechanical rotating machinery, industrial valves, process heat transfer systems, and filtration units.",
      keyCapabilities: [
        "Centrifugal, positive displacement, and multiphase pump systems",
        "Industrial gas and steam turbines & reciprocating compressors",
        "High-pressure API 6D / 6A valves, actuators, and smart positioners",
        "Process heat exchangers, cooling towers, and environmental treatment packages",
        "High-pressure piping, flanges, fittings, and flow elements"
      ],
      icon: "Wrench"
    },
    {
      id: "instrumentation-controls",
      title: "Instrumentation & Controls Division",
      slug: "instrumentation-controls-division",
      headline: "Advanced automation, fiscal metering, SCADA, and safety systems.",
      description: "Equipped with specialized software engineers and field automation technicians delivering turnkey control, safety instrumented systems (SIS), and fiscal custody transfer solutions.",
      keyCapabilities: [
        "Pipeline SCADA, acoustic leak detection, and hydraulic modeling",
        "Fiscal metering skids, ultrasonic flow meters, and gas chromatographs",
        "Distributed Control Systems (DCS), PLCs, and fail-safe ESD panels",
        "Industrial communications, fiber networks, and explosion-proof PA/GA systems",
        "Plant-wide Fire & Gas detection (FGS) and environmental CEMS"
      ],
      icon: "Cpu"
    }
  ],

  stats: [
    { value: "15+", label: "Years Industry Pedigree", subtext: "Established operational track record" },
    { value: "17+", label: "Global OEM Partners", subtext: "From USA, Europe, Canada & Asia" },
    { value: "5", label: "Regional Operational Hubs", subtext: "Baghdad, Basra, Baiji, Amman, UK" },
    { value: "100%", label: "Verified Scope Coverage", subtext: "Full lifecycle engineering support" }
  ],

  coreSpecialties: [
    "Mechanical & Rotating Machinery",
    "Pipeline SCADA & Leak Detection",
    "Custody Transfer Fiscal Metering",
    "Upstream Wellhead & Artificial Lift",
    "Turnkey Automation & Systems Integration",
    "Compressor Overhaul & Field Engineering"
  ],

  offices: [
    {
      id: "baghdad",
      city: "Baghdad",
      country: "Iraq",
      type: "Corporate Headquarters & Central Engineering",
      address: "PO Box 6036, Almansour, Yarmouk District, Baghdad, Iraq",
      tel: "+964 1 5522166",
      fax: "+964 1 5416444",
      mbl: "+964 781 3305470 / 69",
      email: "baghdad@oloid.company",
      isHeadquarters: true,
      coordinates: { lat: 33.3152, lng: 44.3661 }
    },
    {
      id: "basra",
      city: "Basra",
      country: "Iraq",
      type: "Southern Energy Operations & Field Service Hub",
      address: "Aljazair Intersection, Behind the Elections High Commission, Basra, Iraq",
      tel: "+964 781 3305470",
      email: "basra@oloid.company",
      isHeadquarters: false,
      coordinates: { lat: 30.5085, lng: 47.7804 }
    },
    {
      id: "baiji",
      city: "Baiji",
      country: "Iraq",
      type: "Northern Industrial & Refining Liaison Office",
      address: "Industrial Refining District, Baiji, Salah al-Din Governorate, Iraq",
      tel: "+964 770 1991198",
      email: "baiji@oloid.company",
      isHeadquarters: false,
      coordinates: { lat: 34.9297, lng: 43.4914 }
    },
    {
      id: "amman",
      city: "Amman",
      country: "Jordan",
      type: "Regional Levant & Commercial Procurement Hub",
      address: "52 Abdel Hamid Sharaf St, Shmeisani, PO Box 143332, Amman 11814, Jordan",
      tel: "+962 6 567 7910",
      fax: "+962 6 567 7911",
      email: "amman@oloid.company",
      isHeadquarters: false,
      coordinates: { lat: 31.9566, lng: 35.9457 }
    },
    {
      id: "magor-uk",
      city: "Magor (Newport / Wales)",
      country: "United Kingdom",
      type: "European Engineering & Supply Chain Office",
      address: "1st Floor Ty Cornell, The Square, Magor, NP26 3HY, United Kingdom",
      tel: "+44 1633 882814 / 880832",
      fax: "+44 1633 881632",
      email: "uk@oloid.company",
      isHeadquarters: false,
      coordinates: { lat: 51.5833, lng: -2.8333 }
    }
  ],

  contactChannels: {
    primaryEmail: "info@oloid.company",
    inquiriesEmail: "contact@oloid.company",
    careersEmail: "careers@oloid.company",
    partnersEmail: "partners@oloid.company",
    primaryPhone: "+964 1 5522166",
    secondaryPhone: "+964 781 3305470",
    linkedin: "https://www.linkedin.com/company/oloid-company"
  }
};

