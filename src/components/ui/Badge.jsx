const badgeVariants = {
  default:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors bg-gray-50 text-gray-600 border border-gray-200",
  secondary:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors bg-slate-50 text-slate-600 border border-slate-200",
  destructive:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors bg-red-50 text-red-600 border border-red-200",
  outline:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border border-gray-200 text-gray-600",
};

function Badge({ className = "", variant = "default", ...props }) {
  const baseClasses = badgeVariants[variant] || badgeVariants.default;
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return <div className={finalClasses} {...props} />;
}

export { Badge, badgeVariants };
