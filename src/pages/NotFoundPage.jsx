import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Layers, Phone } from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The requested page could not be found on the OLOID corporate website."
      />

      <section
        className="section"
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        <div className="container-narrow">
          <div
            style={{
              fontSize: '5rem',
              fontWeight: 'var(--font-weight-extrabold)',
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: 'var(--space-2)'
            }}
          >
            404
          </div>

          <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-3)' }}>
            Page Not Found
          </h1>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto var(--space-8) auto', lineHeight: '1.6' }}>
            The URL you requested could not be located on the OLOID portal. It may have been moved, updated, or re-indexed during our corporate modernization.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-12)' }}>
            <Button to="/" variant="primary" icon={Home} size="md">
              Return to Homepage
            </Button>
            <Button to="/products-services" variant="outline" icon={Layers} size="md">
              Browse Solutions Catalog
            </Button>
            <Button to="/contact" variant="secondary" icon={Phone} size="md">
              Contact Engineering Desk
            </Button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-6)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
            Looking for something specific? Consult our <Link to="/sitemap" style={{ color: 'var(--color-brand-primary)', fontWeight: '600' }}>Complete Corporate Sitemap</Link>.
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
