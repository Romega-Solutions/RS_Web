interface AvatarPlaceholderProps {
  size?: number;
  className?: string;
  variant?: 'male' | 'female' | 'neutral';
}

export default function AvatarPlaceholder({ 
  size = 80, 
  className = '',
  variant = 'neutral' 
}: AvatarPlaceholderProps) {
  const colors = {
    male: { bg: '#E0F2FE', icon: '#0369A1' },
    female: { bg: '#FCE7F3', icon: '#BE185D' },
    neutral: { bg: '#E5E7EB', icon: '#6B7280' }
  };

  const { bg, icon } = colors[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Profile placeholder"
    >
      {/* Background circle */}
      <circle cx="40" cy="40" r="40" fill={bg} />
      
      {/* User icon */}
      <g transform="translate(20, 15)">
        {/* Head */}
        <circle cx="20" cy="15" r="10" fill={icon} />
        {/* Body */}
        <path
          d="M 8,35 C 8,28 12,25 20,25 C 28,25 32,28 32,35 L 32,45 L 8,45 Z"
          fill={icon}
        />
      </g>
    </svg>
  );
}
