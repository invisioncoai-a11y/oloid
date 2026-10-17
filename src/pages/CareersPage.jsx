import React from 'react';
import { 
  Users, 
  Award, 
  GraduationCap, 
  Globe, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { contentRepository } from '../services/contentRepository';

export function CareersPage() {
  const careers = contentRepository.getCareers();

  const getApplicationMailto = (positionTitle) => {
    const subject = encodeURIComponent(`Application for Position: ${positionTitle}`);
    const body = encodeURIComponent(
      `Dear OLOID Talent Acquisition Team,\n\n` +
      `I am writing to express my interest in the ${positionTitle} opportunity at OLOID.\n\n` +
      `Please find my professional background summary below:\n` +
      `- Full Name:\n` +
      `- Current Location:\n` +
      `- Phone / WhatsApp:\n` +
      `- Years of Relevant Experience:\n` +
      `- Key Engineering Qualifications (e.g. B.Sc., TÜV, API):\n\n` +
      `I have attached my comprehensive Curriculum Vitae (CV) and certifications for your consideration.\n\n` +
      `Best regards,\n[Your Name]`
    );

    return `mailto:${careers.applicationEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <SEO
        title="Careers & Opportunities — Join OLOID"
        description="Build your career in international industrial technology and engineering services. Explore career opportunities with OLOID across Baghdad, Basra, and Amman."
        canonical="/careers"
      />

      <Breadcrumbs items={[{ label: 'Careers' }]} />

      {/* Hero */}
      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Join Our Engineering Team"
            title="Advance Your Career at the Forefront of"
            titleGradientText="Industrial Modernization"
            description={careers.subheadline}
          />

          {/* Culture Pillars */}
          <div className="grid-4" style={{ marginTop: 'var(--space-8)' }}>
            {careers.cultureHighlights.map((cult, idx) => {
              const icons = [Award, GraduationCap, Users, Globe];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  style={{
                    padding: 'var(--space-6)',
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-primary-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                    <IconComp size={22} />
                  </div>
                  <h4 style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-2)' }}>{cult.title}</h4>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1 }}>
                    {cult.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Disciplines */}
      <section className="section section-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Current Openings"
            title="Open Technical &amp; Operational Roles"
            description="We are actively reviewing candidate profiles for qualified instrumentation engineers, rotating equipment technicians, and technical coordinators."
          />

          <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {careers.openDisciplines.map((job) => (
              <div
                key={job.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-8)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
                  <div>
                    <Badge variant="brand" style={{ marginBottom: 'var(--space-2)' }}>{job.division}</Badge>
                    <h3 style={{ fontSize: 'var(--font-size-xl)' }}>{job.title}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={13} color="var(--color-brand-primary)" />
                        {job.locations.join(' / ')}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} color="var(--color-brand-primary)" />
                        {job.type}
                      </span>
                      <span>Min: {job.experience}</span>
                    </div>
                  </div>

                  <Button
                    href={getApplicationMailto(job.title)}
                    variant="primary"
                    size="sm"
                    icon={Send}
                    iconPosition="right"
                  >
                    Apply via Email
                  </Button>
                </div>

                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {job.summary}
                </p>

                <div>
                  <h5 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                    Candidate Profile &amp; Requirements:
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={13} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* General Application Banner */}
          <div
            style={{
              maxWidth: '880px',
              margin: 'var(--space-12) auto 0 auto',
              padding: 'var(--space-8)',
              background: 'var(--gradient-surface-dark)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center'
            }}
          >
            <Mail size={32} color="var(--color-brand-cyan)" style={{ margin: '0 auto var(--space-3) auto' }} />
            <h3 style={{ color: '#ffffff', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
              Don't See Your Exact Discipline Listed?
            </h3>
            <p style={{ color: 'var(--text-inverse-muted)', fontSize: 'var(--font-size-sm)', maxWidth: '580px', margin: '0 auto var(--space-6) auto', lineHeight: '1.6' }}>
              We regularly onboard specialized rotating equipment technicians, certified metrologists, and automation programmers. Submit a spontaneous application with your CV to <strong>{careers.applicationEmail}</strong>.
            </p>
            <Button
              href={`mailto:${careers.applicationEmail}?subject=Spontaneous%20Application%20-%20OLOID%20Engineering`}
              variant="outlineLight"
              size="md"
              icon={Send}
              iconPosition="right"
            >
              Submit CV Directly to {careers.applicationEmail}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CareersPage;
