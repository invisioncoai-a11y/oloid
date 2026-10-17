import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { InquiryModal } from '../components/ui/InquiryModal';
import { contentRepository } from '../services/contentRepository';

export function ProductsServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('');

  const categories = contentRepository.getCategories();
  const allServices = contentRepository.getAllServices();

  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', slug);
    }
    setSearchParams(searchParams);
  };

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.categorySlug === selectedCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.partnerBrands.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleInquire = (serviceTitle) => {
    setSelectedServiceForModal(serviceTitle);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Products & Services — Industrial Equipment & Field Engineering"
        description="Explore OLOID's complete catalog of rotating equipment, valves, SCADA leak detection, fiscal metering skids, upstream wellheads, and certified maintenance services."
        canonical="/products-services"
      />

      <Breadcrumbs items={[{ label: 'Products & Services' }]} />

      {/* Header */}
      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-8)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Equipment &amp; Technical Services"
            title="Complete Portfolio of"
            titleGradientText="Engineered Solutions"
            description="Our line of services includes the supply of industrial equipment, materials, and field services to major industrial sectors including Oil & Gas, petrochemicals, chemicals, water, power, and primary metals."
          />

          {/* Sales Philosophy Quote from Reference Site */}
          <div
            style={{
              padding: 'var(--space-4) var(--space-6)',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '4px solid var(--color-brand-primary)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              marginBottom: 'var(--space-8)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)'
            }}
          >
            <strong>Our Sales &amp; Engineering Philosophy:</strong> "To help you get what you want with the best solution to fit your exact operational needs, environmental criteria, and lifecycle expectations."
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: selectedCategory === 'all' ? '600' : '500',
                backgroundColor: selectedCategory === 'all' ? 'var(--color-brand-primary)' : '#ffffff',
                color: selectedCategory === 'all' ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid',
                borderColor: selectedCategory === 'all' ? 'var(--color-brand-primary)' : 'var(--border-light)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              All Categories ({allServices.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: selectedCategory === cat.slug ? '600' : '500',
                  backgroundColor: selectedCategory === cat.slug ? 'var(--color-brand-primary)' : '#ffffff',
                  color: selectedCategory === cat.slug ? '#ffffff' : 'var(--text-primary)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.slug ? 'var(--color-brand-primary)' : 'var(--border-light)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.shortTitle}
              </button>
            ))}
          </div>

          {/* Search bar & results tally */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search solutions, standards, or OEMs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>

            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              Displaying <strong>{filteredServices.length}</strong> industrial equipment classes &amp; services
            </div>
          </div>

          {/* Products & Services Grid */}
          <div className="grid-2">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-brand-navy-dark)' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(11, 25, 43, 0.85)',
                      backdropFilter: 'blur(4px)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-brand-cyan)',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    {service.category}
                  </div>
                </div>

                <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
                    <Link to={`/products-services/${service.slug}`} style={{ color: 'inherit' }}>
                      {service.title}
                    </Link>
                  </h3>

                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-4)', flex: 1 }}>
                    {service.summary}
                  </p>

                  {/* Highlights */}
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 'var(--space-2)' }}>
                      Highlighted Engineering Features:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {service.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                          <CheckCircle2 size={13} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Partner Brands */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>OEMs:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {service.partnerBrands.map((brand, bIdx) => (
                        <span key={bIdx} style={{ fontSize: '11px', backgroundColor: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)', marginTop: 'auto' }}>
                    <Button
                      to={`/products-services/${service.slug}`}
                      variant="primary"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Engineering Specs
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInquire(service.title)}
                    >
                      Inquire on Scope
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={selectedServiceForModal}
      />
    </>
  );
}

export default ProductsServicesPage;
