import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { X, ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { companyData } from '../../data/company';
import styles from './MobileMenu.module.css';

export function MobileMenu({ isOpen, onClose, navLinks = [] }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Close menu automatically when route actually changes
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [location.pathname, isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSubmenu = (label) => {
    setOpenSubmenu(prev => (prev === label ? null : label));
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className={styles.header}>
          <Link to="/" onClick={onClose}>
            <img src="/assets/brand/oloid-logo.png" alt="OLOID" className={styles.logo} />
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {navLinks.map((item) => {
            const hasSub = item.dropdown && item.dropdown.length > 0;
            const isSubOpen = openSubmenu === item.label;

            if (hasSub) {
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className={styles.navLink}
                    onClick={() => toggleSubmenu(item.label)}
                    aria-expanded={isSubOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isSubOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 200ms ease'
                      }}
                    />
                  </button>
                  {isSubOpen && (
                    <div className={styles.submenu}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className={styles.subItem}
                          onClick={onClose}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                onClick={onClose}
                end={item.path === '/'}
              >
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.contactItem}>
            <Phone size={16} color="var(--color-brand-primary)" />
            <a href={`tel:${companyData.contactChannels.primaryPhone}`}>
              {companyData.contactChannels.primaryPhone}
            </a>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} color="var(--color-brand-primary)" />
            <a href={`mailto:${companyData.contactChannels.primaryEmail}`}>
              {companyData.contactChannels.primaryEmail}
            </a>
          </div>

          <Button
            to="/contact"
            variant="primary"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
            onClick={onClose}
          >
            Request Consultation
          </Button>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
