export default function Loading() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-(--rs-neutral-50)"
    >
      {/* Loading Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div 
          className="w-20 h-20 rounded-full border-4 animate-spin"
          style={{ 
            borderColor: 'var(--rs-primary-200)',
            borderTopColor: 'transparent'
          }}
        />
        {/* Inner Ring */}
        <div 
          className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 animate-spin"
          style={{ 
            borderColor: 'var(--rs-primary-500)',
            borderBottomColor: 'transparent',
            animationDirection: 'reverse',
            animationDuration: '0.8s'
          }}
        />
      </div>

      {/* Loading Text */}
      <p
        className="mt-6 text-lg font-medium animate-pulse"
        style={{ 
          fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
          color: 'var(--rs-primary-600)'
        }}
      >
        Loading...
      </p>
    </div>
  );
}
