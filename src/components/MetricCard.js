export default function MetricCard({
  title,
  value,
  subtext,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider">
          {title}
        </p>
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-50 border border-neutral-200 text-neutral-600">
            <Icon className="h-4 w-4 text-[#991b1b]" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1a]">
          {value}
        </span>
        {subtext && (
          <span className="text-xs sm:text-sm font-medium text-neutral-500">
            {subtext}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
