import Link from "next/link";
import { getTotalLaunches } from "@/lib/analytics";
import { DATASET_LAST_REVIEWED } from "@/data/launches";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const totalLaunches = getTotalLaunches();

  return (
    <footer className="mt-16 border-t border-neutral-200 bg-[#fbfbfb] py-10 text-xs text-neutral-600">
      <div className="space-y-6">
        {/* Top row: brand + links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#1a1a1a]">
                LaunchGraph
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700">
                <ShieldCheck className="h-3 w-3 text-[#991b1b]" aria-hidden="true" />
                {totalLaunches} verified sources
              </span>
            </div>
            <p className="text-neutral-500">
              Independent public-data research prototype
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <Link
              href="/methodology"
              className="text-neutral-700 hover:text-[#991b1b] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2"
            >
              Methodology &amp; Limitations
            </Link>
            <a
              href="https://www.sociallcapital.com/work"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Social Capital Selected Work (opens in new tab)"
              className="inline-flex items-center gap-1 text-neutral-700 hover:text-[#991b1b] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2"
            >
              <span>Social Capital Selected Work</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom row: disclaimer + scope + review date */}
        <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 text-[11px] text-neutral-400">
          <div className="space-y-1">
            <p>Not affiliated with or endorsed by Social Capital Inc.</p>
            <p>
              Dataset covers{" "}
              <span className="font-medium text-neutral-600">{totalLaunches} case studies</span>
              {" "}from Social Capital&apos;s public selected work.
            </p>
          </div>
          <p className="shrink-0">
            Dataset last reviewed:{" "}
            <span className="font-mono text-neutral-600 font-medium">
              {DATASET_LAST_REVIEWED}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
