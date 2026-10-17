import React, { useState } from 'react';
import { X, Send, Info } from 'lucide-react';
import { Button } from './Button';
import { companyData } from '../../data/company';
import styles from './InquiryModal.module.css';

export function InquiryModal({ isOpen, onClose, initialSubject = '', serviceName = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: initialSubject || (serviceName ? `Technical Inquiry: ${serviceName}` : 'General Inquiry'),
    message: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Transparent email-client handoff as strictly mandated
    const recipient = companyData.contactChannels.inquiriesEmail;
    const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.fullName}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Company / Organization: ${formData.company || 'N/A'}\n` +
      `Interest / Solution: ${serviceName || 'General Corporate'}\n\n` +
      `Message:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 id="inquiry-title" className={styles.title}>
              {serviceName ? `Inquire: ${serviceName}` : 'Contact Technical Sales'}
            </h3>
            <p className={styles.subtitle}>
              Connect directly with OLOID engineering representatives across our regional hubs.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.body}>
          <div className={styles.inputRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="inquiry-name" className={styles.label}>
                Full Name *
              </label>
              <input
                id="inquiry-name"
                name="fullName"
                type="text"
                required
                placeholder="e.g. Eng. Tariq Al-Mansoor"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="inquiry-email" className={styles.label}>
                Corporate Email *
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="inquiry-phone" className={styles.label}>
                Phone / WhatsApp
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                placeholder="+964 781 000 0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="inquiry-company" className={styles.label}>
                Company / Organization
              </label>
              <input
                id="inquiry-company"
                name="company"
                type="text"
                placeholder="Enterprise or Ministry name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="inquiry-msg" className={styles.label}>
              Technical Specifications or Requirements *
            </label>
            <textarea
              id="inquiry-msg"
              name="message"
              required
              rows={4}
              placeholder="Please describe project scope, required standards (API/ASME), operating conditions, or timeline..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className={styles.notice}>
            <Info size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>Transparent Contact Dispatch:</strong> Submitting this form prepares your technical inquiry and launches your email client to send directly to <code>{companyData.contactChannels.inquiriesEmail}</code>. No third-party data tracking.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={Send}
              iconPosition="right"
            >
              Open Email &amp; Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InquiryModal;

