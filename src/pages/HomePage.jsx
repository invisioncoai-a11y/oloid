import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Cpu, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { InquiryModal } from '../components/ui/InquiryModal';
import { contentRepository } from '../services/contentRepository';
import styles from './HomePage.module.css';

export function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const company = contentRepository.getCompany();
  const stats = contentRepository.getStats();
  const divisions = contentRepository.getDivisions();
  const allServices = contentRepository.getAllServices();
  const featuredServices = contentRepository.getFeaturedServices();
  const featuredPartners = contentRepository.getAllPartners().slice(0, 12);
  const recentNews = contentRepository.getRecentNews(2);

  const rotatingCapabilities = [
    "Mechanical & Rotating Machinery",
    "Pipeline SCADA & Leak Detection",
    "Fiscal Custody Transfer Metering",
    "Lead Acid Battery Recycling Systems",
    "Structural Steel & Modular Skids",
    "Upstream Artificial Lift & ESPs"
  ];

  return (
    <>
      <SEO
        title="OLOID — Engineering, Industrial Technology & Petroleum Services"
        description={company.meta.description}
        canonical="/"
      />

      {/* Hero Section */}
      <section className={styles.hero} aria-label="Hero Overview">
        <div className={styles.heroBg} />
        <div className={styles.heroGlow} />

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <Sparkles size={14} />
              <span>International Engineering &amp; Industrial Technology</span>
            </div>

            <h1 className={styles.heroTitle}>
              Modernizing Critical <br />
              <span className="text-gradient">Industrial &amp; Energy</span> Infrastructure
            </h1>

            <p className={styles.heroLead}>
              {company.summary}
            </p>

            <div className={styles.heroCtas}>
              <Button
                to="/products-services"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Explore Products &amp; Services
              </Button>

              <Button
                to="/partners"
                variant="outlineLight"
                size="lg"
              >
                Our Global Partners
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => setModalOpen(true)}
              >
                Request Technical Proposal
              </Button>
            </div>

            {/* Verified Capabilities Ticker */}
            <div className={styles.tickerContainer}>
              <span className={styles.tickerLabel}>Core Capabilities:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {rotatingCapabilities.map((item, idx) => (
                  <span key={idx} className={styles.tickerItem}>
                    <CheckCircle2 size={13} color="var(--color-brand-cyan)" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className={styles.statsSection} aria-label="Key Performance Indicators">
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSubtext}>{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Operational Divisions */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Integrated Engineering Architecture"
            title="Two Specialized Operating Divisions,"
            titleGradientText="One Unified Standard"
            description="OLOID organizes its engineering capabilities into two complementary divisions, each staffed by dedicated sales engineers, application specialists, and field commissioning technicians."
          />

          <div className={styles.divisionsGrid}>
            {divisions.map((div) => {
              const IconComponent = div.icon === 'Cpu' ? Cpu : Wrench;
              return (
                <div key={div.id} className={styles.divisionCard}>
                  <div className={styles.divisionIconWrapper}>
                    <IconComponent size={28} />
                  </div>

                  <h3 className={styles.divisionTitle}>{div.title}</h3>
                  <div className={styles.divisionHeadline}>{div.headline}</div>
                  <p className={styles.divisionDesc}>{div.description}</p>

                  <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                    Core Engineering Disciplines
                  </h4>

                  <ul className={styles.capabilityList}>
                    {div.keyCapabilities.map((cap, cIdx) => (
                      <li key={cIdx} className={styles.capabilityItem}>
                        <CheckCircle2 size={15} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)' }}>
                    <Button
                      to={`/products-services?cat=${div.id === 'mechanical' ? 'mechanical-rotating-equipment' : 'electrical-control-instrumentation'}`}
                      variant="outline"
                      size="sm"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      View Division Solutions
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products & Solutions */}
      <section className="section section-surface">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div>
              <Badge variant="brand" style={{ marginBottom: 'var(--space-2)' }}>
                Field-Proven Equipment &amp; Services
              </Badge>
              <h2>
                Engineered Solutions for <span className="text-gradient">Severe Operating Demands</span>
              </h2>
            </div>

            <Button
              to="/products-services"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
            >
              Browse Full Catalog ({allServices.length} Solutions)
            </Button>
          </div>

          <div className="grid-3">
            {featuredServices.map((service) => (
              <div key={service.id} className={styles.servicePreviewCard}>
                <div className={styles.serviceImgWrapper}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.serviceImg}
                    loading="lazy"
                  />
                </div>

                <div className={styles.serviceBody}>
                  <span className={styles.serviceCategory}>{service.category}</span>
                  <h3 className={styles.serviceTitle}>
                    <Link to={`/products-services/${service.slug}`} style={{ color: 'inherit' }}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className={styles.serviceSummary}>{service.summary}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                      {service.partnerBrands.slice(0, 2).join(', ')}
                    </span>
                    <Link
                      to={`/products-services/${service.slug}`}
                      style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                    >
                      <span>Specifications</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Global Partners Grid */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Global Technology Alliances"
            title="Partnering with World Leaders in"
            titleGradientText="Industrial Technology"
            description="OLOID acts as a proactive, agile distributor and Value-Added Reseller (VAR) for international OEMs across the United States, Europe, Canada, and Asia."
          />

          <div className={styles.partnersGrid}>
            {featuredPartners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerBox}
                title={`${partner.name} - ${partner.category}`}
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={styles.partnerLogo}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.partnerNameFallback}>
                    {partner.name}
                  </div>
                )}
                <span className={styles.partnerCountry}>{partner.country}</span>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Button
              to="/partners"
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore All 17 Partner Profiles
            </Button>
          </div>
        </div>
      </section>

      {/* Regional Footprint & Presence */}
      <section className="section section-dark">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <Badge variant="dark" style={{ marginBottom: 'var(--space-3)' }}>
                Established Footprint
              </Badge>
              <h2 style={{ color: '#ffffff', marginBottom: 'var(--space-4)' }}>
                Strategic Operational Hubs Across <span className="text-gradient">Iraq, Jordan &amp; the UK</span>
              </h2>
              <p style={{ color: 'var(--text-inverse-muted)', marginBottom: 'var(--space-6)', lineHeight: '1.7' }}>
                With permanent engineering offices and technical field personnel stationed in Baghdad, Basra, Baiji, Amman, and the United Kingdom, OLOID delivers localized responsiveness with international engineering standards.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
                {company.offices.map((office) => (
                  <div
                    key={office.id}
                    style={{
                      padding: 'var(--space-4)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong style={{ color: '#ffffff', fontSize: 'var(--font-size-sm)' }}>
                        {office.city}, {office.country}
                      </strong>
                      <span style={{ fontSize: '11px', color: 'var(--color-brand-cyan)' }}>
                        {office.isHeadquarters ? 'Headquarters' : 'Regional Hub'}
                      </span>
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-inverse-muted)' }}>
                      {office.address} &bull; Tel: {office.tel}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
              >
                Access Global Contact Directory
              </Button>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: 'var(--shadow-dark-card)'
                }}
              >
                <img
                  src="/assets/images/pic4.jpg"
                  alt="OLOID Regional Engineering Operations"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Conference Highlights */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div>
              <Badge variant="brand" style={{ marginBottom: 'var(--space-2)' }}>
                Industry Engagements
              </Badge>
              <h2>Latest News &amp; International Exhibitions</h2>
            </div>
            <Button to="/news" variant="outline" size="sm">
              View All News
            </Button>
          </div>

          <div className="grid-2">
            {recentNews.map((news) => (
              <div
                key={news.id}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', fontWeight: 'bold' }}>
                    {news.date}
                  </span>
                  <Badge variant="outline">{news.category}</Badge>
                </div>

                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-3)', lineHeight: '1.3' }}>
                  <Link to={`/news/${news.slug}`} style={{ color: 'inherit' }}>
                    {news.title}
                  </Link>
                </h3>

                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', flex: 1 }}>
                  {news.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                    {news.location}
                  </span>
                  <Link
                    to={`/news/${news.slug}`}
                    style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                  >
                    <span>Read Full Report</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Call to Action Banner */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <h2 style={{ color: '#ffffff', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-4)' }}>
              Partner with OLOID for Your Next Industrial Mandate
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '640px', fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-8)' }}>
              Whether you are an international OEM seeking verified Middle Eastern representation or a plant operator requiring certified equipment and field engineering, our technical teams are standing by.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setModalOpen(true)}
              >
                Request Technical Proposal
              </Button>
              <Button
                to="/contact"
                variant="outlineLight"
                size="lg"
              >
                Contact Regional Offices
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSubject="Proposal Inquiry from OLOID Homepage"
      />
    </>
  );
}

export default HomePage;
