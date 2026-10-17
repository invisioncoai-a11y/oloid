import React from 'react';
import styles from './Badge.module.css';

export function Badge({
  children,
  variant = 'brand',
  icon: Icon,
  className = ''
}) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;

