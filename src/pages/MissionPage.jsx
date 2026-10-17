import React from 'react';
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { contentRepository } from '../services/contentRepository';

export function MissionPage() {
  const company = contentRepository.getCompany();
  const values = contentRepository.getValues();
  const divisions = contentRepository.getDivisions();

  return (
    <>
      <SEO
        title="Our Mission & Values — Modernizing Industrial Standards"
        description="Discover OLOID's corporate mission to modernize major industrial sectors, our vision to be the premiere technology provider, and our dual-division operational structure."
        canonical="/mission"
      />

      <Breadcrumbs items={[{ label: 'Company', path: '/about' }, { label: 'Our Mission & Values' }]} />

      {/* Hero Mission & Vision */}
      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Mission &amp; Vision"
            title="A Clear Mandate to"
            titleGradientText="Modernize Critical Industries"
            description="OLOID was founded with an uncompromising purpose: to elevate regional industrial infrastructure to the highest international standards of safety, efficiency, and technological maturity."
          />

          <div className="grid-2" style={{ marginTop: 'var(--space-8)' }}>
            {/* Mission Card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'var(--color-brand-primary)' }} />
              <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-3)' }}>Our Corporate Mission</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: 'var(--font-size-md)', flex: 1 }}>
                {company.mission}
              </p>
              <div style={{ paddingTop: 'var(--space-4)', marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Targeted Industrial Sectors
                </span>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 4 }}>
                  Petroleum &bull; Natural Gas &bull; Petrochemicals &bull; Power Utilities &bull; Water Networks &bull; Heavy Metallurgy
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div
              style={{
                background: 'var(--gradient-surface-dark)',
                color: '#ffffff',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'var(--color-brand-cyan)' }} />
              <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: 'rgba(22, 143, 245, 0.2)', color: 'var(--color-brand-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-xl)', color: '#ffffff', marginBottom: 'var(--space-3)' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-inverse-muted)', lineHeight: '1.7', fontSize: 'var(--font-size-md)', flex: 1 }}>
                {company.vision}
              </p>
              <div style={{ paddingTop: 'var(--space-4)', marginTop: 'var(--space-4)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-brand-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Long-Term Strategic Impact
                </span>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-inverse-muted)', marginTop: 4 }}>
                  Sustainable Technology Transfer &bull; Local Engineering Empowerment &bull; Enduring OEM Joint Ventures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Division Operating Structure */}
      <section className="section section-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Division Architecture"
            title="Two Specialized Engineering Divisions"
            description="To ensure total operational focus, OLOID operates through two distinct divisions. Each maintains its own dedicated commercial engineering staff, application specialists, and certified after-sales technicians."
          />

          <div className="grid-2">
            {divisions.map((div) => {
              const IconComp = div.icon === 'Cpu' ? Cpu : Wrench;
              return (
                <div
                  key={div.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-8)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComp size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 'var(--font-size-xl)' }}>{div.title}</h3>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', fontWeight: '600' }}>
                        Dedicated Sales Force &amp; Field Staff
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6', marginBottom: 'var(--space-6)' }}>
                    {div.description}
                  </p>

                  <h5 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                    Primary Division Deliverables
                  </h5>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-6) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {div.keyCapabilities.map((cap, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={14} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    to={`/products-services?cat=${div.id === 'mechanical' ? 'mechanical-rotating-equipment' : 'electrical-control-instrumentation'}`}
                    variant="outline"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Explore Division Capabilities
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Core Principles"
            title="The Values that Anchor Every"
            titleGradientText="OLOID Solution"
            description="Our engineering standards are grounded in uncompromising ethics, client trust, operational safety, and responsive agility."
          />

          <div className="grid-4">
            {values.map((val) => (
              <div
                key={val.id}
                style={{
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                  <ShieldCheck size={20} />
                </div>
                <h4 style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-2)' }}>{val.title}</h4>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1 }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default MissionPage;
