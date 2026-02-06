import Link from 'next/link';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './Button.module.css';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'navbar' | 'social' | 'footer-schedule';
  icon?: LucideIcon;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  external = false,
  ariaLabel,
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  // BEM class construction
  const buttonClasses = [
    styles.button,                              // Block
    styles[`button--${variant}`],               // Modifier: variant
    fullWidth && styles['button--full-width'],  // Modifier: fullWidth
    !fullWidth && styles['button--max-width'],  // Modifier: max-width (default)
    disabled && styles['button--disabled'],     // Modifier: disabled
    className,                                   // Additional custom classes
  ]
    .filter(Boolean)
    .join(' ');

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      href={disabled ? '#' : href}
      className={buttonClasses}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...linkProps}
    >
      {Icon && (
        <Icon
          className={styles.button__icon}  // Element
          aria-hidden="true"
        />
      )}
      <span className={styles.button__text}>  {/* Element */}
        {children}
      </span>
    </Link>
  );
}
