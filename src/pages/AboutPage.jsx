import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Handshake, 
  Factory, 
  MapPin 
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { contentRepository } from '../services/contentRepository';

export function AboutPage() {
  const offices = contentRepository.getOffices();

  const milestones = [
    {
      year: "2011",
      title: "Company Foundation",
      description: "Established in 2011 by senior energy veterans to bridge international engineering OEMs with the rapidly modernizing Middle Eastern energy sector."
    },
    {
      year: "2012",
      title: "Regional Network Expansion",
      description: "Inaugurated dedicated technical liaison offices in Baghdad and Basra; prominent participation at the 3rd Basra International Oil & Gas Exhibition."
    },
    {
      year: "2013",
      title: "OEM Distributorship Agreements",
      description: "Formed strategic representation and VAR pacts with global leaders including Cameron Jiskoot, Cook Compression, Atmos International, and VEGA."
    },
    {
      year: "Present",
      title: "Integrated Turnkey Capabilities",
      description: "Full lifecycle engineering across two dedicated operating divisions (Mechanical and Instrumentation & Controls), with expanded service hubs across Iraq, Jordan, and the UK."
    }
  ];

  return (
    <>
      <SEO
        title="About Us — Corporate Profile & Pedigree"
        description="Learn about OLOID's corporate foundation, decades of regional industrial experience, joint ventures, and Value-Added Reseller partnerships with global OEMs."
        canonical="/about"
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Page Header */}
      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Corporate Profile"
            title="Decades of Regional Pedigree,"
            titleGradientText="Global Engineering Precision"
            description="Founded in 2011, OLOID delivers high-specification industrial technologies and engineering services across the Middle East from strategic offices in Baghdad, Basra, Baiji, Amman, and the United Kingdom."
          />

          <div className="grid-2" style={{ alignItems: 'center', marginTop: 'var(--space-8)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-4)', lineHeight: '1.25' }}>
                Bridging World-Leading Technology with Critical Regional Infrastructure
              </h3>
              <p style={{ marginBottom: 'var(--space-4)', lineHeight: '1.7' }}>
                OLOID was established with the focused objective of modernizing and developing major industrial sectors including Oil &amp; Gas, petrochemicals, chemicals, electrical power, water transmission, and primary metals.
              </p>
              <p style={{ marginBottom: 'var(--space-4)', lineHeight: '1.7' }}>
                Through the extensive experience of OLOID’s leadership and technical founders—accumulated over decades of serving high-demand energy corridors—we have successfully formed joint ventures and secured exclusive distributorship and Value-Added Reseller (VAR) partnerships with Tier-1 OEMs from the United States, Canada, Europe, CIS, and the Far East.
              </p>
              <p style={{ marginBottom: 'var(--space-6)', lineHeight: '1.7' }}>
                We are committed to our customers and manufacturing partners with trust, operational integrity, and uncompromising quality as our utmost targets.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Button to="/mission" variant="primary" icon={ArrowRight} iconPosition="right">
                  Our Mission &amp; Values
                </Button>
                <Button to="/partners" variant="outline">
                  View Strategic Partners
                </Button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-xl)'
                }}
              >
                <img
                  src="/assets/images/pic4.jpg"
                  alt="OLOID Executive and Engineering Presence"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model: VAR & Joint Ventures */}
      <section className="section section-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Our Operating Model"
            title="Value-Added Reseller &amp;"
            titleGradientText="Joint Venture Partnerships"
            description="We go beyond standard equipment brokerage. OLOID embeds deep local engineering, diagnostic support, and field services into every OEM technology we introduce."
          />

          <div className="grid-3">
            <div style={{ background: '#ffffff', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Handshake size={24} />
              </div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Direct OEM Distributorship</h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Direct authorized agreements with international manufacturers, providing certified warranties, genuine factory spare parts, and direct engineering access.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Factory size={24} />
              </div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Local Field Engineering</h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                On-the-ground engineering presence across Baghdad, Basra, and Baiji, capable of loop checking, valve testing, calibration, and 24/7 turnaround response.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <ShieldCheck size={24} />
              </div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Regulatory Compliance &amp; HSE</h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Strict compliance with international engineering codes (API, ASME, ISO, IEC, NACE) and local environmental regulations for zero-incident execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Evolution Timeline */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Milestones"
            title="A History of Continuous"
            titleGradientText="Engineering Evolution"
            description="From our establishment in 2011 to our present multi-hub operating structure, OLOID has continually expanded its technical depth."
          />

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '90px', textAlign: 'right' }}>
                  <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'var(--color-brand-primary)' }}>
                    {m.year}
                  </span>
                </div>
                <div style={{ width: '2px', backgroundColor: 'var(--border-light)', alignSelf: 'stretch', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '-5px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-brand-primary)' }} />
                </div>
                <div style={{ flex: 1, paddingBottom: 'var(--space-4)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-1)' }}>{m.title}</h4>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Regional Hubs */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            theme="dark"
            eyebrow="Regional Reach"
            title="Strategic Office Footprint"
            description="Our offices across Iraq, Jordan, and the United Kingdom coordinate international logistics, local engineering dispatch, and contract administration."
          />

          <div className="grid-3">
            {offices.map((office) => (
              <div
                key={office.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <MapPin size={18} color="var(--color-brand-cyan)" />
                  <h4 style={{ color: '#ffffff' }}>{office.city}, {office.country}</h4>
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', marginBottom: 'var(--space-3)', fontWeight: '600' }}>
                  {office.type}
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-inverse-muted)', marginBottom: 'var(--space-4)', lineHeight: '1.5' }}>
                  {office.address}
                </p>
                <div style={{ fontSize: 'var(--font-size-xs)', color: '#ffffff' }}>
                  Tel: <a href={`tel:${office.tel}`} style={{ color: 'var(--color-brand-cyan)' }}>{office.tel}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
