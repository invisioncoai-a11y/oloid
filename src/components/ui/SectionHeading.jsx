import React from 'react';
import styles from './SectionHeading.module.css';

export function SectionHeading({
  eyebrow,
  title,
  titleGradientText,
  description,
  align = 'center',
  theme = 'light',
  className = ''
}) {
  return (
    <div className={`${styles.container} ${styles[align]} ${className}`}>
      {eyebrow && (
        <div className={`${styles.eyebrow} ${theme === 'dark' ? styles.eyebrowDark : ''}`}>
          <span>{eyebrow}</span>
        </div>
      )}

      {title && (
        <h2 className={`${styles.title} ${theme === 'dark' ? styles.titleDark : styles.titleLight}`}>
          {title}{' '}
          {titleGradientText && (
            <span className="text-gradient">{titleGradientText}</span>
          )}
        </h2>
      )}

      {description && (
        <p className={`${styles.description} ${theme === 'dark' ? styles.descDark : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;

