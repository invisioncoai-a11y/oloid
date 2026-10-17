import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon } from '../ui/Icons';
import { companyData } from '../../data/company';
import { footerNavigation } from '../../data/navigation';
import styles from './Footer.module.css';

const currentYear = new Date().getFullYear();

export function Footer() {

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.topGrid}>
          {/* Brand & Overview */}
          <div className={styles.brandCol}>
            <Link to="/" aria-label="OLOID Home">
              <img
                src="/assets/brand/oloid-logo-white.png"
                alt="OLOID"
                className={styles.logo}
                width="145"
                height="44"
              />
            </Link>
            <p className={styles.brandText}>
              Premier international engineering, industrial technology, and petroleum services company modernizing major industrial infrastructure through world-class OEM partnerships.
            </p>

            <div className={styles.socials}>
              <a
                href={companyData.contactChannels.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Connect on LinkedIn"
              >
                <LinkedInIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} opacity={0.7} />
              </a>
            </div>
          </div>

          {/* Core Divisions & Services */}
          <div>
            <h4 className={styles.colTitle}>Solutions &amp; Divisions</h4>
            <ul className={styles.linkList}>
              {footerNavigation.divisions.map((link) => (
                <li key={link.label} className={styles.linkItem}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className={styles.colTitle}>Company</h4>
            <ul className={styles.linkList}>
              {footerNavigation.company.map((link) => (
                <li key={link.label} className={styles.linkItem}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Hubs & Verified Contact */}
          <div>
            <h4 className={styles.colTitle}>Regional Presence</h4>
            <div className={styles.officeList}>
              {companyData.offices.slice(0, 3).map((office) => (
                <div key={office.id} className={styles.officeItem}>
                  <span className={styles.officeCity}>
                    <MapPin size={12} color="var(--color-brand-primary)" />
                    {office.city}, {office.country}
                  </span>
                  <span>{office.address}</span>
                  <span>
                    Tel: <a href={`tel:${office.tel}`}>{office.tel}</a>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; {currentYear} {companyData.legalName}. All rights reserved. Registered domain: <a href="https://oloid.company" style={{ color: 'var(--color-brand-cyan)' }}>oloid.company</a>
          </div>

          <div className={styles.legalLinks}>
            {footerNavigation.legal.map((item) => (
              <Link key={item.label} to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
