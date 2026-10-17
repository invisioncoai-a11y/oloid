import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { contentRepository } from '../services/contentRepository';

export function SitemapPage() {
  const allServices = contentRepository.getAllServices();
  const partners = contentRepository.getAllPartners();
  const news = contentRepository.getAllNews();

  return (
    <>
      <SEO
        title="Sitemap — Public Website Directory"
        description="Complete public index of all OLOID corporate pages, engineering solutions, partner profiles, and publications."
        canonical="/sitemap"
      />

      <Breadcrumbs items={[{ label: 'Sitemap' }]} />

      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Directory Index"
            title="OLOID Corporate Sitemap"
            description="Comprehensive listing of all publicly accessible pages, solutions, and publications."
          />

          <div className="grid-3" style={{ marginTop: 'var(--space-8)' }}>
            {/* Core Corporate Pages */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-light)' }}>
                Corporate Pages
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <li><Link to="/">Home Page</Link></li>
                <li><Link to="/about">About Us &amp; Pedigree</Link></li>
                <li><Link to="/mission">Our Mission, Vision &amp; Values</Link></li>
                <li><Link to="/partners">Global Strategic Partners</Link></li>
                <li><Link to="/products-services">Products &amp; Services Catalog</Link></li>
                <li><Link to="/news">News &amp; Events Archive</Link></li>
                <li><Link to="/careers">Careers &amp; Opportunities</Link></li>
                <li><Link to="/contact">Contact &amp; Regional Offices</Link></li>
              </ul>
            </div>

            {/* Products & Services */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-light)' }}>
                Products &amp; Technical Services ({allServices.length})
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxHeight: '350px', overflowY: 'auto' }}>
                {allServices.map((s) => (
                  <li key={s.id}>
                    <Link to={`/products-services/${s.slug}`} style={{ fontSize: 'var(--font-size-xs)' }}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Partners & News */}
            <div style={{ background: '#ffffff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-light)' }}>
                Strategic Partners ({partners.length})
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-6) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', maxHeight: '200px', overflowY: 'auto' }}>
                {partners.map((p) => (
                  <li key={p.id}>
                    <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--font-size-xs)' }}>
                      {p.name} ({p.country})
                    </a>
                  </li>
                ))}
              </ul>

              <h3 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-3)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-light)' }}>
                News Articles
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {news.map((n) => (
                  <li key={n.id}>
                    <Link to={`/news/${n.slug}`} style={{ fontSize: 'var(--font-size-xs)' }}>
                      {n.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SitemapPage;
