import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Clock, 
  Globe2, 
  Info
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { contentRepository } from '../services/contentRepository';
import styles from './ContactPage.module.css';

export function ContactPage() {
  const company = contentRepository.getCompany();
  const offices = contentRepository.getOffices();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    division: 'General Inquiry',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipient = company.contactChannels.inquiriesEmail;
    const emailSubject = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.fullName} [${formData.division}]`
    );
    const emailBody = encodeURIComponent(
      `Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Company / Organization: ${formData.company || 'N/A'}\n` +
      `Target Division: ${formData.division}\n\n` +
      `Message Details:\n${formData.message}\n\n` +
      `Dispatched via OLOID Corporate Portal (https://oloid.company)`
    );

    window.location.href = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <>
      <SEO
        title="Contact Us — Regional Offices & Global Technical Support"
        description="Connect with OLOID's corporate offices in Baghdad, Basra, Baiji, Amman, and the United Kingdom. Inquire on equipment, technical proposals, or partnership opportunities."
        canonical="/contact"
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <section className="section" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-16)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Global Contact &amp; Support"
            title="Connect with OLOID"
            titleGradientText="Engineering Teams"
            description="Our specialized sales and technical support teams across Iraq, Jordan, and the UK are ready to assist with technical specifications, equipment procurement, and field service requests."
          />

          <div className="grid-2" style={{ gap: 'var(--space-12)', alignItems: 'flex-start', marginTop: 'var(--space-8)' }}>
            {/* Interactive Inquiry Form */}
            <div className={styles.inquiryCard}>
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
                Send a Technical Inquiry
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                Please provide your project specifications below. Submitting will open your default email client to send directly to <strong>{company.contactChannels.inquiriesEmail}</strong>.
              </p>

              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formRow}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Eng. Tariq Al-Mansoor"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+964 781 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company or Ministry"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Primary Division of Interest
                  </label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                  >
                    <option value="Mechanical Division">Mechanical Division (Valves, Pumps, Compressors, Exchangers)</option>
                    <option value="Instrumentation & Controls">Instrumentation &amp; Controls (SCADA, Leak Detection, Fiscal Metering)</option>
                    <option value="Upstream Solutions">Upstream Solutions (Wellheads, ESPs, EPF Skids)</option>
                    <option value="Specialized Engineering Services">Specialized Field Services (Commissioning, Calibration, Valve Testing)</option>
                    <option value="OEM Partnership / Representation">OEM Partnership / Representation</option>
                    <option value="General Inquiry">General Corporate Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Quotation Request: Pipeline SCADA & Leak Detection"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Message &amp; Technical Requirements *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Detail your requirements, operational parameters, standards, or project timeline..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Honest Static Dispatch Info */}
                <div className={styles.directEmailCallout}>
                  <Info size={16} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong>Direct Mail Dispatch:</strong> Clicking submit triggers your native mail client (Outlook/Apple Mail/webmail) with pre-filled content addressed to <code>{company.contactChannels.inquiriesEmail}</code>.
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  iconPosition="right"
                >
                  Dispatch Inquiry via Email Client
                </Button>
              </form>
            </div>

            {/* Quick Contact & Verified Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Primary Inquiries Box */}
              <div className={styles.deskCard}>
                <h3 style={{ color: '#ffffff', fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
                  Central Communication Desk
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'rgba(22, 143, 245, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-cyan)' }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-brand-cyan)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        General Correspondence
                      </div>
                      <a href={`mailto:${company.contactChannels.primaryEmail}`} style={{ color: '#ffffff', fontWeight: '600' }}>
                        {company.contactChannels.primaryEmail}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'rgba(22, 143, 245, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-cyan)' }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-brand-cyan)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        Headquarters Phone
                      </div>
                      <a href={`tel:${company.contactChannels.primaryPhone}`} style={{ color: '#ffffff', fontWeight: '600' }}>
                        {company.contactChannels.primaryPhone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'rgba(22, 143, 245, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-cyan)' }}>
                      <Globe2 size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--color-brand-cyan)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                        Official Domain
                      </div>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>
                        https://oloid.company
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours & Support Standard */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <Clock size={20} color="var(--color-brand-primary)" />
                  <h4 style={{ margin: 0, fontSize: 'var(--font-size-base)' }}>Operational Response Standards</h4>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Regional technical support teams operate Sunday through Thursday (08:00 to 17:00 GMT+3). Emergency turnaround field support for refinery shutdowns and pipeline alarms is available 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Regional Hubs Cards Grid */}
          <div style={{ marginTop: 'var(--space-16)' }}>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-6)' }}>
              Verified Regional Operational Hubs
            </h3>

            <div className="grid-3">
              {offices.map((office) => (
                <div
                  key={office.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-6)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <MapPin size={18} color="var(--color-brand-primary)" />
                      <h4 style={{ margin: 0 }}>{office.city}, {office.country}</h4>
                    </div>
                    {office.isHeadquarters && (
                      <Badge variant="brand">HQ</Badge>
                    )}
                  </div>

                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-primary)', fontWeight: '600', marginBottom: 'var(--space-3)' }}>
                    {office.type}
                  </span>

                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-4)', flex: 1 }}>
                    {office.address}
                  </p>

                  <div style={{ paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 'var(--font-size-xs)' }}>
                    <div>
                      <strong>Tel:</strong> <a href={`tel:${office.tel}`}>{office.tel}</a>
                    </div>
                    {office.fax && (
                      <div><strong>Fax:</strong> {office.fax}</div>
                    )}
                    {office.mbl && (
                      <div><strong>Mbl:</strong> {office.mbl}</div>
                    )}
                    <div>
                      <strong>Email:</strong> <a href={`mailto:${office.email}`}>{office.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
