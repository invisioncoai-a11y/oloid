# OLOID Corporate Website

[![Production Domain](https://img.shields.io/badge/Domain-https%3A%2F%2Foloid.company-blue.svg)](https://oloid.company)
[![Framework](https://img.shields.io/badge/Framework-React%2019-61dafb.svg)](https://react.dev)
[![Build Tool](https://img.shields.io/badge/Build%20Tool-Vite%208-646cff.svg)](https://vitejs.dev)
[![Architecture](https://img.shields.io/badge/Architecture-Static%20%2F%20API--Ready-success.svg)](#architecture)
[![Deployment](https://img.shields.io/badge/Deployment-Hostinger%20Static-orange.svg)](#hostinger-deployment-guide)

A complete, production-ready corporate website designed and developed for **OLOID** ([https://oloid.company](https://oloid.company)), an international engineering, industrial technology, and petroleum services company.

---

## 1. Project Overview

- **Brand:** OLOID
- **Tagline:** Engineering, Industrial Technology & Petroleum Services
- **Production Domain:** `https://oloid.company`
- **Frontend Stack:** React 19 (JavaScript / JSX) + Vite 8 + React Router + CSS Modules
- **Data Architecture:** 100% local, static JavaScript data modules decoupled via a unified `contentRepository` service layer.
- **Reference Website:** Analyzed and achieved 100% content coverage of `https://www.taqamideast.com/`.

---

## 2. Brand Identity & Design System

The visual design was crafted from the uploaded official OLOID logo:
- **Primary Blue:** `#168FF5`
- **Sky / Cyan Accent:** `#50ABFE`
- **Deep Cerulean:** `#0165C3`
- **Deep Slate Navy:** `#1C304B` / `#16263B` / `#0B192B`
- **Light Surfaces:** `#FFFFFF` / `#F6F9FC`
- **Typography:** Plus Jakarta Sans & JetBrains Mono

Assets located in `public/assets/brand/`:
- `oloid-logo.png`: Transparent high-resolution full logo
- `oloid-logo-white.png`: High-contrast version for dark headers and footers
- `oloid-symbol.png`: Isolated drop / oloid brand emblem
- `favicon.ico` & `favicon.svg`: Multi-resolution and scalable SVG favicons

---

## 3. Implemented Routes & Website Sections

1. **Home (`/`)**:
   - Hero section with verified corporate headline and lead narrative
   - Rotating capabilities ticker (Battery recycling, Steel fabrication, Smelting, Technical solutions)
   - Key statistics bar (15+ Years, 17+ OEMs, 5 Hubs, 100% Scope)
   - Dual Operational Divisions showcase (Mechanical and Instrumentation & Controls)
   - Featured industrial equipment and services grid
   - Strategic Global Partners grid
   - Verified Regional Footprint
   - Latest News and Exhibition highlights
   - Interactive Technical Proposal CTA
2. **About Us (`/about`)**:
   - Corporate history (founded 2011) and executive background
   - Value-Added Reseller (VAR) & Joint Venture business model
   - Regional footprint and corporate milestones timeline
3. **Our Mission (`/mission`)**:
   - Modernization mission, corporate vision, and 4 core values
   - Detailed operational architecture of the Mechanical and Instrumentation & Controls divisions
4. **Our Partners (`/partners`)**:
   - Filterable directory covering all 17 international OEMs audited from reference
   - Search by name, country, and technology discipline
   - Verified descriptions, product lists, and official OEM outbound links
5. **Products & Services (`/products-services`)**:
   - Multi-category catalog with tab filters and live search
   - Mechanical & Rotating Equipment, Control & Instrumentation, Upstream & Drilling, Specialized Engineering Services
6. **Product & Service Details (`/products-services/:slug`)**:
   - Reusable technical layout for all 16 solution areas
   - Complete technical parameters, standards (API/ASME), applications, OEM brands, and inquiry handoff
7. **News & Events (`/news`)**:
   - Historical and contemporary exhibition reports (National Iraq Energy Expo, 3rd Basra Oil & Gas Exhibition, Regional Expansion)
8. **News Detail (`/news/:slug`)**:
   - Full editorial layout with dates, locations, co-exhibiting partners, and related news
9. **Careers / Join Us (`/careers`)**:
   - Culture pillars, open disciplines, candidate requirements, and direct email application workflow
10. **Contact Us (`/contact`)**:
    - Central communication desk, verified office cards for Baghdad, Basra, Baiji, Amman, and UK
    - Interactive inquiry form with client validation and transparent email-client handoff
11. **Sitemap (`/sitemap`)**:
    - Complete human-readable directory index
12. **404 Not Found (`*`)**:
    - Branded error screen with recovery navigation links

---

## 4. Development & Build Commands

### Prerequisites
- Node.js `v18.0.0` or later (tested on Node v24)
- npm `v9.0.0` or later

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Starts the Vite local development server with Hot Module Replacement (HMR) at `http://localhost:5173`.

### Generate Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken static production bundle in `dist/`.

### Preview Production Build
```bash
npm run preview
```
Serves the `dist/` directory locally to verify static assets and routing.

---

## 5. Hostinger Deployment Guide

The OLOID website is statically pre-built and requires **no Node.js runtime or backend server** on the hosting provider.

### Step 1: Generate Production Build
Run in your local repository:
```bash
npm run build
```
This produces the self-contained static directory: `dist/`.

### Step 2: Access Hostinger File Manager
1. Log in to your Hostinger hPanel.
2. Navigate to **Websites** &rarr; select **oloid.company** &rarr; open **File Manager**.
3. Open the `public_html` root directory.

### Step 3: Upload Assets
Upload all files and subdirectories directly from your local `dist/` folder into `public_html`:
```text
public_html/
├── assets/
│   ├── brand/
│   ├── images/
│   ├── partners/
│   └── [hashed js and css files]
├── .htaccess          <-- Essential for React Router SPA refresh support!
├── favicon.ico
├── favicon.svg
├── index.html
├── robots.txt
└── sitemap.xml
```

> [!IMPORTANT]
> Ensure `.htaccess` is uploaded to `public_html`. The `.htaccess` file handles URL rewrites so that direct visits or page refreshes on nested routes (such as `/products-services/valves-actuators-smart-positioners`) resolve smoothly to `index.html`.

### Step 4: Verify Domain & SSL
1. In Hostinger hPanel, verify that the domain points to your hosting directory.
2. Under **Security**, ensure **SSL Certificate (Let's Encrypt)** is active and "Force HTTPS" is enabled.
3. Test direct navigation to `https://oloid.company/about`, `https://oloid.company/products-services`, and `https://oloid.company/contact` to verify SPA route refresh.

---

## 6. Project Documentation

Comprehensive engineering documentation is included in `docs/`:
- [`docs/CONTENT_AUDIT.md`](./docs/CONTENT_AUDIT.md): Complete audit of `taqamideast.com`, URL mapping, and content preservation logs.
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md): Frontend architectural overview, styling system, component hierarchy, and design decisions.
- [`docs/FUTURE_BACKEND_INTEGRATION.md`](./docs/FUTURE_BACKEND_INTEGRATION.md): Technical roadmap for integrating a Node.js/Express API, MySQL/PostgreSQL database, and headless CMS without rewriting the frontend.
