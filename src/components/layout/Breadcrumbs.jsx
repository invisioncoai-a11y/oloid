import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <div className="container">
        <ol className={styles.list}>
          <li className={styles.item}>
            <Link to="/" className={styles.link} title="Home">
              <Home size={13} style={{ display: 'inline', verticalAlign: '-1px' }} />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className={styles.item}>
                <ChevronRight size={12} className={styles.separator} />
                {isLast || !item.path ? (
                  <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumbs;

