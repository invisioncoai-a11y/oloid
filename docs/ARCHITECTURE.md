# OLOID Frontend Architecture Documentation

## 1. System Philosophy

The OLOID corporate website is built as an ultra-fast, highly accessible, production-grade Static Single Page Application (SPA). It is architected around three foundational engineering principles:

1. **Separation of Content and Presentation:** No website copy, specs, office details, or partner listings are hardcoded within React JSX components. All content is stored in declarative, type-safe data modules and accessed via an abstract repository pattern.
2. **Component Modularity & Composition:** UI elements are structured into atomic design tokens, reusable UI primitives, and encapsulated feature views using CSS Modules to eliminate style leakage and magic numbers.
3. **API-Ready Decoupling:** The present static architecture can transition to an asynchronous REST/GraphQL backend or CMS with zero visual component redesign.

---

## 2. Directory Structure

```text
oloid-website/
├── public/
│   ├── assets/
│   │   ├── brand/               # Official OLOID logos, symbols, favicons
│   │   ├── images/              # High-spec industrial photography assets
│   │   └── partners/            # Partner OEM logos
│   ├── .htaccess                # Hostinger Apache/LiteSpeed SPA fallback rules
│   ├── favicon.ico              # Multi-resolution ICO favicon
│   ├── favicon.svg              # Vector SVG favicon
│   ├── robots.txt               # Crawler instructions
│   └── sitemap.xml              # Machine-readable XML sitemap
│
├── src/
│   ├── app/
│   │   ├── App.jsx              # Application root with createBrowserRouter
│   │   └── routes.jsx           # Route declarations with React.lazy code splitting
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── RootLayout.jsx   # Shell with skip link, navbar, main outlet, footer
│   │   │   ├── Footer.jsx       # Corporate footer with office directory
│   │   │   ├── Breadcrumbs.jsx  # Accessible breadcrumb trail
│   │   │   ├── ScrollToTop.jsx  # Route change scroll restoration
│   │   │   └── ErrorBoundary.jsx# Production crash containment
│   │   │
│   │   ├── navigation/
│   │   │   ├── Navbar.jsx       # Sticky header with desktop dropdowns
│   │   │   └── MobileMenu.jsx   # Accessible drawer with scroll-lock & accordion
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx       # Polymorphic button (button / Link / anchor)
│   │       ├── Card.jsx         # Surface / elevation card with hover states
│   │       ├── Badge.jsx        # Pill tags for categories and status
│   │       ├── SectionHeading.jsx# Eyebrow, title with gradient accent, description
│   │       ├── SEO.jsx          # Dynamic document title, meta tags, and schema
│   │       ├── InquiryModal.jsx # Accessible contact modal with email handoff
│   │       └── Icons.jsx        # Custom SVG icon implementations
│   │
│   ├── data/
│   │   ├── company.js           # Corporate profile, mission, vision, offices
│   │   ├── services.js          # 4 categories, 16 detailed solutions & specs
│   │   ├── partners.js          # 17 international OEMs with domains & products
│   │   ├── news.js              # Exhibition reports and announcements
│   │   ├── careers.js           # Culture pillars, job profiles, requirements
│   │   └── navigation.js        # Menu links and footer grouping configuration
│   │
│   ├── services/
│   │   └── contentRepository.js # Decoupled data access layer
│   │
│   ├── styles/
│   │   ├── tokens.css           # Brand palette, spacing, elevations, typography
│   │   ├── typography.css       # Heading hierarchy, body scales, utilities
│   │   └── global.css           # CSS reset, container grids, focus rings
│   │
│   └── main.jsx                 # Application entry point
│
├── docs/
│   ├── CONTENT_AUDIT.md
│   ├── ARCHITECTURE.md
│   └── FUTURE_BACKEND_INTEGRATION.md
│
├── .htaccess                    # Root deployment rewrite copy
├── package.json
├── vite.config.js
└── README.md
```

---

## 3. Data & Repository Pattern

All data access is mediated through `src/services/contentRepository.js`. Components never access static data files directly; instead, they query repository methods:

```javascript
import { contentRepository } from '../services/contentRepository';

export function SolutionsView() {
  const categories = contentRepository.getCategories();
  const services = contentRepository.getAllServices();
  const featured = contentRepository.getFeaturedServices();
  // ...
}
```

### Architectural Benefits:
1. **Zero Component Refactoring:** When transitioning to remote APIs, `contentRepository` methods can return Promises or use React Query/SWR hooks without altering component JSX.
2. **Schema Consistency:** Data structures for products, partners, and news mirror relational database schemas (primary keys, foreign keys, slugs, ISO dates).
3. **Single Source of Truth:** Changes to company emails, office telephone numbers, or partner details propagate across the entire website instantaneously.

---

## 4. Routing & Performance Strategy

### Dynamic Route Splitting via `React.lazy`
To minimize the initial JavaScript footprint, the router utilizes asynchronous chunk loading:
- The `HomePage` and core layout elements are loaded eagerly in the main bundle for sub-second First Contentful Paint (FCP).
- Secondary pages (`AboutPage`, `MissionPage`, `PartnersPage`, `ProductsServicesPage`, `ProductServiceDetailPage`, `NewsPage`, `NewsDetailPage`, `CareersPage`, `ContactPage`, `SitemapPage`) are split into individual chunks loaded on-demand with accessible `<Suspense>` spinners.

### Route Restoration
`ScrollToTop` listens to location changes and resets window position to `(0, 0)`, resolving the standard SPA scroll retention defect.

---

## 5. Design System & Styling Architecture

### CSS Modules
All component styles use scoped CSS Modules (`Component.module.css`). This prevents class name collisions, enables dead code elimination, and guarantees that styling changes are isolated to individual components.

### Centralized Design Tokens (`tokens.css`)
- **Brand Colors:** Exact colors extracted from the uploaded OLOID logo:
  - Electric Primary Blue: `#168FF5`
  - Sky / Cyan Accent: `#50ABFE`
  - Deep Navy Slate: `#233752` / `#1C304B` / `#0B192B`
  - Crisp White & Light Surface: `#FFFFFF` / `#F6F9FC`
- **Spacing Scale:** Modular 4px scale (`--space-1` through `--space-32`).
- **Typography:** `Plus Jakarta Sans` via Google Fonts preconnect with fallback to standard sans-serif system fonts.

---

## 6. Accessibility & SEO Compliance

### WCAG 2.2 AA Compliance
- **Skip Link:** `<a href="#main-content" className="skip-link">` allows keyboard users to bypass navigation.
- **Focus Rings:** Distinct `:focus-visible` outline rings with 3px offset.
- **Semantic Structure:** Proper hierarchy of `<h1>` through `<h6>`, `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>`.
- **Keyboard Navigation:** Mobile menus and inquiry dialogs trap focus, close on `Escape`, and handle `aria-expanded` and `aria-modal`.
- **Reduced Motion:** Global `@media (prefers-reduced-motion: reduce)` rule disables non-essential animations.

### Search Engine Optimization (SEO)
- Route-specific `<SEO>` component updates `document.title`, meta descriptions, canonical URLs, and Open Graph tags.
- Built-in Schema.org JSON-LD generation for `Organization`, `Product`, and `NewsArticle`.
- Pre-generated `public/sitemap.xml` covering all 29 public routes.

