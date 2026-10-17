import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { mainNavLinks } from '../../data/navigation';
import { companyData } from '../../data/company';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleMouseEnter = (label) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className="container">
          <div className={styles.inner}>
            {/* Brand Logo */}
            <Link to="/" className={styles.logoLink} aria-label="OLOID Corporate Home">
              <img
                src="/assets/brand/oloid-logo.png"
                alt="OLOID Industrial and Petroleum Services"
                className={styles.logoImg}
                width="145"
                height="44"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav} aria-label="Main Navigation">
              {mainNavLinks.map((item) => {
                const hasSub = item.dropdown && item.dropdown.length > 0;
                const isOpen = activeDropdown === item.label;

                if (hasSub) {
                  return (
                    <div
                      key={item.label}
                      className={styles.navItem}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        className={`${styles.navLink} ${
                          location.pathname.startsWith(item.path) ? styles.navLinkActive : ''
                        }`}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={14}
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 150ms ease'
                          }}
                        />
                      </button>

                      {isOpen && (
                        <div
                          className={`${styles.dropdown} ${
                            item.label === 'Products & Services' ? styles.dropdownWide : ''
                          }`}
                        >
                          <div className={styles.dropdownContent}>
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.path}
                                className={styles.dropdownItem}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className={styles.dropdownLabel}>{sub.label}</span>
                                {sub.description && (
                                  <span className={styles.dropdownDesc}>{sub.description}</span>
                                )}
                              </Link>
                            ))}
                          </div>
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
                    end={item.path === '/'}
                  >
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Actions / CTA */}
            <div className={styles.actions}>
              <a
                href={`tel:${companyData.contactChannels.primaryPhone}`}
                className={styles.navLink}
                title="Call OLOID"
              >
                <Phone size={15} color="var(--color-brand-primary)" />
                <span style={{ fontSize: 'var(--font-size-xs)' }}>
                  {companyData.contactChannels.primaryPhone}
                </span>
              </a>

              <Button
                to="/contact"
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={mainNavLinks}
      />
    </>
  );
}

export default Navbar;
