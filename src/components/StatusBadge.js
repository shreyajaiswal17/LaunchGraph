export default function StatusBadge({
  children,
  variant = "default",
  className = "",
}) {
  const variantStyles = {
    default: "bg-neutral-100 text-neutral-700 border-neutral-200",
    accent: "bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/20",
    neutral: "bg-neutral-50 text-neutral-600 border-neutral-200",
    outline: "bg-transparent text-neutral-600 border-neutral-300",
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedVariant} ${className}`}
    >
      {children}
    </span>
  );
}
