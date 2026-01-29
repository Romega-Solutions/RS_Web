import Link from 'next/link';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'navbar' | 'social' | 'footer-schedule';
  icon?: LucideIcon;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
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
}: ButtonProps) {
  // Base styles with conditional width
  const widthStyles = fullWidth ? 'w-full' : 'w-full max-w-[400px]';
  const baseStyles = `${widthStyles} inline-flex items-center justify-center font-semibold transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2`;
  
  const variantStyles = {
    primary: 'h-[50px] sm:h-[57px] text-[18px] sm:text-[22.5px] px-4 sm:px-8 rounded-[12px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 drop-shadow-xl transition duration-300',
    secondary: 'h-[50px] sm:h-[57px] text-[18px] sm:text-[22.5px] px-4 sm:px-8 rounded-[12px] border-2 border-rs-primary-600 text-rs-primary-600 bg-rs-primary-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    navbar: 'h-[46px] px-[10px] lg:px-[28px] lg:min-w-[172px] text-[18px] rounded-xl border-[1.5px] border-rs-primary-600 bg-rs-primary-500 text-white shadow-[0_2px_7px_2px_rgba(18,91,161,0.3)] hover:bg-rs-primary-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-rs-primary-600 focus:ring-offset-2',
    social: 'px-3 lg:px-4 py-2 text-[14px] lg:text-[12px] font-medium rounded-md border border-rs-neutral-400 bg-rs-neutral-100 text-rs-neutral-600 hover:bg-[#e6f0f3] hover:text-[#1e293b] hover:shadow-lg hover:scale-105 hover:border-[#4880b8] active:bg-[#dbeafe] active:scale-95 transition gap-2 focus:outline-none focus:ring-2 focus:ring-[#4880b8] focus:ring-offset-2',
    'footer-schedule': 'h-[50px] px-4 py-2 text-base lg:text-[18px] font-semibold rounded-lg border-[1.5px] border-rs-primary-600 bg-rs-primary-500 text-white shadow hover:bg-[#0062b1] hover:scale-105 active:bg-[#005999] active:scale-95 transition-all duration-200 gap-2 focus:outline-none focus:ring-2 focus:ring-[#4880b8] focus:ring-offset-2',
  };

  // Icon sizing based on variant
  const iconSizeStyles = {
    primary: 'w-5 sm:w-[27px] h-5 sm:h-[27px] mr-2',
    secondary: 'w-5 sm:w-[27px] h-5 sm:h-[27px] mr-2',
    navbar: 'w-[22px] h-[22px] mr-1',
    social: 'w-4 lg:w-5 h-4 lg:h-5',
    'footer-schedule': 'w-5 lg:w-6 h-5 lg:h-6',
  };

  const iconBaseStyles = `${iconSizeStyles[variant]} flex-shrink-0 transition-all duration-300`;
  
  // Icon color transitions matching hover states
  const iconColorStyles = {
    primary: 'text-white',
    secondary: 'text-rs-primary-600 group-hover:text-white',
    navbar: 'text-white',
    social: 'text-rs-neutral-600 group-hover:text-[#1e293b]',
    'footer-schedule': 'text-white',
  };

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
      {...linkProps}
    >
      {Icon && (
        <Icon
          className={`${iconBaseStyles} ${iconColorStyles[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </Link>
  );
}
