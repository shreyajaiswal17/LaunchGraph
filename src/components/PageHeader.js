export default function PageHeader({
  title,
  description,
  eyebrow,
  children,
}) {
  return (
    <header className="mb-8 border-b border-neutral-200 pb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-wider uppercase text-[#991b1b]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1a1a]">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center gap-3 shrink-0 pt-1">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
