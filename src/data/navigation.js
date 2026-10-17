/**
 * OLOID Navigation Data & Hierarchy
 * Defines header navigation links, dropdowns, and footer link groupings.
 */

export const mainNavLinks = [
  { label: "Home", path: "/" },
  {
    label: "Company",
    path: "/about",
    dropdown: [
      { label: "About Us", path: "/about", description: "Company history, executive profile, and international network" },
      { label: "Our Mission & Values", path: "/mission", description: "Corporate vision, engineering principles, and dual divisions" }
    ]
  },
  {
    label: "Products & Services",
    path: "/products-services",
    dropdown: [
      { label: "All Products & Services", path: "/products-services", description: "Complete overview of our 4 industrial sectors" },
      { label: "Mechanical & Rotating", path: "/products-services?cat=mechanical-rotating-equipment", description: "Valves, pumps, turbines, compressors, and heat exchangers" },
      { label: "Control & Instrumentation", path: "/products-services?cat=electrical-control-instrumentation", description: "SCADA leak detection, fiscal metering, and PLCs" },
      { label: "Upstream & Drilling", path: "/products-services?cat=upstream-drilling-completion", description: "Wellheads, ESP artificial lift, and early production facilities" },
      { label: "Specialized Services", path: "/products-services?cat=specialized-industrial-services", description: "Commissioning, calibration, valve testing, and engineering manpower" }
    ]
  },
  { label: "Partners", path: "/partners" },
  { label: "News", path: "/news" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" }
];

export const footerNavigation = {
  divisions: [
    { label: "Mechanical & Rotating Machinery", path: "/products-services?cat=mechanical-rotating-equipment" },
    { label: "Control & Instrumentation", path: "/products-services?cat=electrical-control-instrumentation" },
    { label: "Upstream & Drilling Solutions", path: "/products-services?cat=upstream-drilling-completion" },
    { label: "Specialized Engineering Services", path: "/products-services?cat=specialized-industrial-services" },
    { label: "Pipeline SCADA & Leak Detection", path: "/products-services/pipeline-scada-leak-detection-systems" },
    { label: "Fiscal Custody Transfer Metering", path: "/products-services/fiscal-custody-transfer-metering-systems" }
  ],
  company: [
    { label: "About OLOID", path: "/about" },
    { label: "Mission, Vision & Values", path: "/mission" },
    { label: "Global Technology Partners", path: "/partners" },
    { label: "Latest News & Events", path: "/news" },
    { label: "Join Our Team (Careers)", path: "/careers" },
    { label: "Global Office Network", path: "/contact" }
  ],
  legal: [
    { label: "Sitemap", path: "/sitemap" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" }
  ]
};

