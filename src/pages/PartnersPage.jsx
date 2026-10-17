import React, { useState } from 'react';
import { 
  Handshake, 
  ExternalLink, 
  Globe, 
  ArrowRight,
  Search
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { InquiryModal } from '../components/ui/InquiryModal';
import { contentRepository } from '../services/contentRepository';
import styles from './PartnersPage.module.css';

export function PartnersPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const partners = contentRepository.getAllPartners();

  const categories = [
    'All',
    'Custody Transfer & Sampling',
    'Reciprocating Compressor Solutions',
    'Industrial Air & Gas Compression',
    'Engineered Severe-Service Valves',
    'Fiscal Flow Metering',
    'Pipeline Leak & Theft Detection',
    'Electrical Motors & Power Distribution',
    'Radar Level & Pressure Instrumentation',
    'Cooling Towers & Heat Recovery'
  ];

  const filteredPartners = partners.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Our Strategic Partners — Global OEM Alliances"
        description="Explore OLOID's international technology partners and OEMs across the USA, UK, Germany, France, Italy, and Switzerland."
        canonical="/partners"
      />

      <Breadcrumbs items={[{ label: 'Our Partners' }]} />

      {/* Page Header */}
      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Global Alliances"
            title="Strategic Technology Partners &amp;"
            titleGradientText="International OEMs"
            description="OLOID's core philosophy is to create enduring, mutually rewarding partnerships with international leaders in industrial technology. We serve as a proactive, agile, and result-oriented partner in regional markets."
          />

          {/* Partnership Philosophy Banner */}
          <div
            style={{
              background: 'var(--color-brand-primary-light)',
              border: '1px solid rgba(22, 143, 245, 0.25)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              marginTop: 'var(--space-8)',
              marginBottom: 'var(--space-10)'
            }}
          >
            <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-brand-primary)', fontWeight: 'bold', fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                <Handshake size={16} />
                <span>Our Partnership Philosophy</span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-md)', lineHeight: '1.7', fontStyle: 'italic' }}>
                "We are always keen to discover new solutions to introduce to our market. To meet the expanding technical demands of local and regional operators, we build and cultivate long-term, value-added relationships with leading international industrial technology and engineering services partners."
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search by OEM name, country, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
              </div>

              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                Showing <strong>{filteredPartners.length}</strong> of {partners.length} verified OEMs
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--color-brand-primary)' : 'var(--border-light)',
                    backgroundColor: selectedCategory === cat ? 'var(--color-brand-primary)' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Partners Directory Grid */}
          <div className="grid-2">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className={styles.partnerCard}
              >
                <div className={styles.partnerHeader}>
                  <div className={styles.partnerHeaderInfo}>
                    <h3 className={styles.partnerTitle}>{partner.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                      <Globe size={13} color="var(--color-brand-primary)" />
                      <span>{partner.country}</span>
                      <span>&bull;</span>
                      <span>{partner.headquarters}</span>
                    </div>
                  </div>

                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={styles.partnerLogo}
                      loading="lazy"
                    />
                  ) : (
                    <Badge variant="brand">{partner.category.split(' ')[0]}</Badge>
                  )}
                </div>

                <div style={{ marginBottom: 'var(--space-2)' }}>
                  <Badge variant="outline">{partner.category}</Badge>
                </div>

                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-4)', flex: 1 }}>
                  {partner.description}
                </p>

                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 'var(--space-2)' }}>
                    Key Technology Scope:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {partner.products.map((prod, pIdx) => (
                      <span
                        key={pIdx}
                        style={{
                          fontSize: '11px',
                          background: 'var(--bg-secondary)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.partnerFooter}>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    <span>OEM Official Website</span>
                    <ExternalLink size={12} />
                  </a>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModalOpen(true)}
                  >
                    Inquire on Products
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* OEM Partnership Callout */}
          <div className={styles.oemCallout}>
            <h3 style={{ color: '#ffffff', fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-3)' }}>
              Are You an International OEM Seeking Middle East Market Leadership?
            </h3>
            <p style={{ color: 'var(--text-inverse-muted)', maxWidth: '680px', margin: '0 auto var(--space-6) auto', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
              We welcome dialogue with forward-thinking engineering and technology providers. Partnering with OLOID grants you immediate access to qualified client networks, pre-qualification support, and certified local field engineers.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setModalOpen(true)}
              icon={ArrowRight}
              iconPosition="right"
            >
              Discuss Partnership Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSubject="Partnership / OEM Inquiry"
      />
    </>
  );
}

export default PartnersPage;
