const badgeVariants = {
  subtle: // For dark sections
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30",
  light: // For light backgrounds
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200/50 hover:bg-white hover:border-gray-300/50 shadow-sm hover:shadow-md",
};

// Animated icon component
const AnimatedIcon = ({ variant = "subtle" }) => {
  const iconColor = variant === "subtle" ? "text-white" : "text-gray-600";
  
  return (
    <div className={`${iconColor} transition-colors duration-300`}>
      {variant === "subtle" ? (
        // Flag icon for subtle version
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="animate-pulse"
        >
          <path 
            d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <line 
            x1="4" 
            y1="22" 
            x2="4" 
            y2="15" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // Layers icon for light version
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="animate-pulse"
        >
          <path 
            d="M12 2L2 7L12 12L22 7L12 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M2 17L12 22L22 17" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M2 12L12 17L22 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

function Badge({ 
  className = "", 
  variant = "light", 
  children, 
  showIcon = true,
  ...props 
}) {
  const baseClasses = badgeVariants[variant] || badgeVariants.light;
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <div className={finalClasses} {...props}>
      {showIcon && <AnimatedIcon variant={variant} />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
