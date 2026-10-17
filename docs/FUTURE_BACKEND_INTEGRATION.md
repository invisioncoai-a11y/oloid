# Future Backend & CMS Integration Blueprint

## 1. Overview & Architectural Readiness

The OLOID corporate website currently runs entirely on local, static data modules in compliance with project requirements. However, the frontend architecture was intentionally structured to ensure that a future backend (Node.js, Express, NestJS), database (MySQL, PostgreSQL), and Content Management System (Strapi, Directus, or Custom Admin) can be integrated **without rewriting or redesigning any presentation components**.

---

## 2. Decoupled Repository Migration Strategy

In the current implementation, components fetch data synchronously via `src/services/contentRepository.js`:

```javascript
// Current Static Implementation
export const contentRepository = {
  getAllServices: () => productsAndServicesData,
  getServiceBySlug: (slug) => productsAndServicesData.find(s => s.slug === slug),
  // ...
};
```

### Phase 1: Upgrading Repository to Asynchronous Promises
When connecting to a real API endpoint, `contentRepository.js` can be refactored to query remote endpoints using `fetch` or `axios`:

```javascript
// Future API-Connected Implementation
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.oloid.company/v1';

export const contentRepository = {
  getAllServices: async () => {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) throw new Error('Failed to load services');
    return res.json();
  },

  getServiceBySlug: async (slug) => {
    const res = await fetch(`${API_BASE_URL}/services/${slug}`);
    if (!res.ok) return null;
    return res.json();
  },

  submitInquiry: async (inquiryData) => {
    const res = await fetch(`${API_BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return res.json();
  }
};
```

### Phase 2: Integrating React Query / TanStack Query (Recommended)
For seamless caching, automatic background re-validation, and optimistic updates, introduce TanStack Query into `src/app/App.jsx`:

```jsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

// In any page or component:
export function ProductsCatalog() {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services', activeCategory],
    queryFn: () => contentRepository.getServicesByCategory(activeCategory)
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <ProductsGrid services={services} />;
}
```

---

## 3. Relational Database Schema Design (MySQL / PostgreSQL)

The data structures in `src/data/` were modeled to map directly to standard relational tables.

```sql
-- 1. Operating Divisions
CREATE TABLE divisions (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  headline VARCHAR(255),
  description TEXT,
  icon VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Service & Product Categories
CREATE TABLE service_categories (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_title VARCHAR(128),
  tagline VARCHAR(255),
  description TEXT
);

-- 3. Products & Services
CREATE TABLE products_and_services (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  category_id VARCHAR(64) REFERENCES service_categories(id),
  division_id VARCHAR(64) REFERENCES divisions(id),
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  description LONGTEXT,
  image_url VARCHAR(512),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Product Technical Specifications (EAV or JSON)
CREATE TABLE product_specifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(64) REFERENCES products_and_services(id) ON DELETE CASCADE,
  spec_label VARCHAR(128) NOT NULL,
  spec_value VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0
);

-- 5. Strategic Partners & OEMs
CREATE TABLE partners (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(128),
  headquarters VARCHAR(255),
  category VARCHAR(128),
  website_url VARCHAR(512),
  logo_url VARCHAR(512),
  description TEXT,
  is_featured BOOLEAN DEFAULT FALSE
);

-- 6. News & Announcements
CREATE TABLE news_articles (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  body_content LONGTEXT NOT NULL,
  publish_date DATE NOT NULL,
  category VARCHAR(128),
  location VARCHAR(255),
  image_url VARCHAR(512),
  is_featured BOOLEAN DEFAULT FALSE
);

-- 7. Contact & Technical Inquiries
CREATE TABLE customer_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  company VARCHAR(255),
  target_division VARCHAR(128),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  status ENUM('new', 'in_review', 'contacted', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Headless CMS Integration Options

Instead of building a custom CRUD admin interface from scratch, OLOID can connect a Headless CMS:

1. **Strapi (Self-Hosted on VPS / Node.js):**
   - Instant REST and GraphQL APIs.
   - Built-in media library for high-resolution industrial photography.
   - Role-Based Access Control (RBAC) for editorial vs. engineering staff.
2. **Directus (Instant API on top of existing MySQL/PostgreSQL):**
   - Zero-overhead wrapper over the SQL schema defined above.
   - Excellent data validation and revision history.

---

## 5. Security & Production Considerations

When transitioning to an active backend:
- **CORS Policy:** Restrict API access strictly to `https://oloid.company` (and `http://localhost:5173` in development).
- **Rate Limiting:** Enforce strict IP rate limiting (e.g. `express-rate-limit`) on inquiry submissions (`/api/inquiries`) to prevent spam.
- **Input Sanitization:** Sanitize all inquiry form submissions using `DOMPurify` or validator middleware to block XSS and SQL injection.
- **Authentication:** For the administrative panel, utilize JWT or HTTP-only session cookies with secure and SameSite flags enabled.
- **Email Notifications:** Integrate SendGrid, AWS SES, or Hostinger SMTP to immediately relay customer inquiries to `contact@oloid.company`.

