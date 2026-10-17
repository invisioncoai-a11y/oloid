import React from 'react';
import styles from './Card.module.css';

export function Card({
  children,
  variant = 'default', // 'default', 'surface', 'dark'
  padded = true,
  interactive = false,
  className = '',
  onClick,
  ...rest
}) {
  const classes = [
    styles.card,
    styles[variant],
    padded ? styles.padded : '',
    interactive ? (variant === 'dark' ? styles.interactiveDark : styles.interactive) : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {children}
    </div>
  );
}

export default Card;

