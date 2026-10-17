import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InquiryModal } from '../components/ui/InquiryModal';
import { contentRepository } from '../services/contentRepository';

export function ProductServiceDetailPage() {
  const { slug } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const service = contentRepository.getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <SEO title="Solution Not Found" />
        <h2>Engineering Solution Not Found</h2>
        <p style={{ margin: 'var(--space-4) 0 var(--space-6) 0', color: 'var(--text-muted)' }}>
          The requested product or service specification could not be located in our current catalog.
        </p>
        <Button to="/products-services" variant="primary" icon={ArrowLeft}>
          Return to Products &amp; Services Catalog
        </Button>
      </div>
    );
  }

  const related = contentRepository.getRelatedServices(slug, 3);

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": service.title,
    "image": `https://oloid.company${service.image}`,
    "description": service.summary,
    "brand": {
      "@type": "Brand",
      "name": "OLOID"
    },
    "category": service.category
  };

  return (
    <>
      <SEO
        title={`${service.title} — Technical Specifications`}
        description={service.summary}
        canonical={`/products-services/${service.slug}`}
        schema={schema}
      />

      <Breadcrumbs
        items={[
          { label: 'Products & Services', path: '/products-services' },
          { label: service.category, path: `/products-services?cat=${service.categorySlug}` },
          { label: service.title }
        ]}
      />

      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          {/* Header & Badges */}
          <div style={{ maxWidth: '880px', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <Badge variant="brand">{service.category}</Badge>
              {service.partnerBrands.map((brand, idx) => (
                <Badge key={idx} variant="outline">{brand}</Badge>
              ))}
            </div>

            <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-4)', lineHeight: '1.2' }}>
              {service.title}
            </h1>

            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {service.summary}
            </p>
          </div>

          {/* Main Content Layout */}
          <div className="grid-2" style={{ alignItems: 'flex-start', gap: 'var(--space-12)' }}>
            <div>
              {/* Image banner */}
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  marginBottom: 'var(--space-8)',
                  boxShadow: 'var(--shadow-md)',
                  maxHeight: '380px',
                  backgroundColor: 'var(--color-brand-navy-dark)'
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Detailed Description */}
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-3)' }}>
                Engineering Overview
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: 'var(--space-8)', fontSize: 'var(--font-size-md)' }}>
                {service.description}
              </p>

              {/* Key Features */}
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
                Performance &amp; Design Highlights
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {service.keyFeatures.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ lineHeight: '1.5' }}>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Industrial Applications */}
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
                Typical Operating Applications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                {service.applications.map((app, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    &bull; {app}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar with Specifications & CTA */}
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Technical Specifications Table */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-light)' }}>
                  Technical Parameters
                </h4>

                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {service.specifications.map((spec, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <dt style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {spec.label}
                      </dt>
                      <dd style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                  <Button
                    variant="primary"
                    fullWidth
                    size="md"
                    onClick={() => setModalOpen(true)}
                  >
                    Request Technical Datasheet
                  </Button>
                </div>
              </div>

              {/* Partner Technology Alliance Box */}
              <div
                style={{
                  background: 'var(--color-brand-primary-light)',
                  border: '1px solid rgba(22, 143, 245, 0.25)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-brand-primary)', fontWeight: 'bold', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>
                  <ShieldCheck size={16} />
                  <span>Authorized OEM Representation</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-4)' }}>
                  Supplied under official distributorship and Value-Added Reseller partnerships with certified original equipment manufacturers. Includes factory warranties and local commissioning support.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {service.partnerBrands.map((b, idx) => (
                    <span key={idx} style={{ fontSize: '11px', background: '#ffffff', padding: '3px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(22, 143, 245, 0.2)', fontWeight: '600' }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Solutions */}
          {related.length > 0 && (
            <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-12)', borderTop: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-6)' }}>
                Related Solutions in {service.category}
              </h3>

              <div className="grid-3">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <h4 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-2)' }}>
                      <Link to={`/products-services/${rel.slug}`} style={{ color: 'inherit' }}>
                        {rel.title}
                      </Link>
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: 'var(--space-4)', flex: 1 }}>
                      {rel.summary}
                    </p>
                    <Link
                      to={`/products-services/${rel.slug}`}
                      style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      <span>View Specifications</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={service.title}
      />
    </>
  );
}

export default ProductServiceDetailPage;
