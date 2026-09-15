import Link from "next/link";
import { launches } from "@/data/launches";
import { formatOpeningType } from "@/lib/analytics";
import { Calendar, ArrowRight, Info } from "lucide-react";

/**
 * Formats an ISO date string (YYYY-MM-DD) as "Month YYYY", e.g. "Feb 2025".
 * No time component is included because source timezones are unspecified.
 */
function formatMonthYear(isoDateStr) {
  // Parse as UTC to avoid timezone-driven date-shift
  const [year, month] = isoDateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function PortfolioTimeline() {
  // Sort by publishedDate ascending (earliest to latest) — non-mutating
  const sortedLaunches = [...launches].sort(
    (a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
  );

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-neutral-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#991b1b]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
              Selected-Work Timeline
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Chronology of the nine case studies publicly listed at the time of this research.
          </p>
        </div>
        <span className="text-xs font-semibold text-neutral-400">
          Feb 2025 &ndash; Mar 2026
        </span>
      </div>

      {/* Timeline Layout */}
      {/* Desktop Grid / Flowing Timeline */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {sortedLaunches.map((item, index) => (
          <div
            key={item.slug}
            className="relative flex flex-col justify-between rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 transition-all hover:border-[#991b1b]/40 hover:bg-white hover:shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#991b1b]">
                  {item.month}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  #{index + 1}
                </span>
              </div>

              <div>
                <Link
                  href={`/launches/${item.slug}`}
                  className="text-sm font-bold text-[#1a1a1a] hover:text-[#991b1b] hover:underline"
                >
                  {item.company}
                </Link>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.featuredAccount}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-medium text-neutral-700 shadow-2xs">
                  {formatOpeningType(item.openingType)}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <span>{formatMonthYear(item.publishedDate)}</span>
              <Link
                href={`/launches/${item.slug}`}
                className="font-medium text-[#991b1b] hover:underline inline-flex items-center gap-0.5"
                aria-label={`View ${item.company} launch details`}
              >
                <span>Details</span>
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / Tablet Vertical Timeline */}
      <div className="lg:hidden relative pl-6 border-l-2 border-neutral-200 space-y-6">
        {sortedLaunches.map((item) => (
          <div key={item.slug} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#991b1b] ring-2 ring-neutral-200" />

            <div className="rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 space-y-2 transition-all group-hover:bg-white group-hover:border-neutral-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#991b1b]">
                  {item.month}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {formatMonthYear(item.publishedDate)}
                </span>
              </div>

              <div>
                <Link
                  href={`/launches/${item.slug}`}
                  className="text-sm font-bold text-[#1a1a1a] hover:text-[#991b1b] hover:underline"
                >
                  {item.company}
                </Link>
                <p className="text-xs text-neutral-500">
                  Featured Account: {item.featuredAccount}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-[11px] font-medium text-neutral-700">
                  {formatOpeningType(item.openingType)}
                </span>
                <Link
                  href={`/launches/${item.slug}`}
                  className="text-xs font-semibold text-[#991b1b] hover:underline inline-flex items-center gap-0.5"
                  aria-label={`View ${item.company} launch details`}
                >
                  <span>View launch</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Observational Notice */}
      <div className="rounded-md border border-neutral-200 bg-neutral-50/70 p-3.5">
        <div className="flex items-start gap-2 text-xs text-neutral-600">
          <Info className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            This timeline illustrates the publication sequence across the nine publicly listed case study records. It does not represent an exhaustive census of all client work or launch campaigns undertaken during this timeframe.
          </p>
        </div>
      </div>
    </section>
  );
}
