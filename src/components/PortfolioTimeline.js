import Link from "next/link";
import { launches } from "@/data/launches";
import { formatOpeningType } from "@/lib/analytics";
import { Calendar, ArrowRight } from "lucide-react";

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
    <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6" aria-labelledby="selected-work-timeline-title">
      <div className="border-b border-neutral-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#991b1b]" aria-hidden="true" />
            <h2 id="selected-work-timeline-title" className="text-sm font-bold uppercase tracking-wider text-neutral-600">
              Selected-work timeline
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Chronology of the nine case studies publicly listed at the time of this research.
          </p>
        </div>
      </div>

      <div className="relative space-y-6 border-l-2 border-neutral-200 pl-6">
        {sortedLaunches.map((item) => (
          <div key={item.slug} className="relative group">
            <div className="absolute -left-7.75 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#991b1b] ring-2 ring-neutral-200" />

            <div className="rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 space-y-2 transition-all group-hover:bg-white group-hover:border-neutral-300">
              <span className="text-xs font-bold text-[#991b1b]">
                {formatMonthYear(item.publishedDate)}
              </span>

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

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
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

    </section>
  );
}
