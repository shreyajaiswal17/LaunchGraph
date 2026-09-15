import { notFound } from "next/navigation";
import Link from "next/link";
import { launches } from "@/data/launches";
import {
  getLaunchBySlug,
  getRelatedLaunches,
  formatOpeningType,
  formatPlatform,
  formatAccountType,
} from "@/lib/analytics";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  ArrowLeft,
  ExternalLink,
  Check,
  Minus,
  Calendar,
  Clock,
  ShieldCheck,
  FileText,
  Sparkles,
  Info,
  Layers,
  Network,
} from "lucide-react";

export function generateStaticParams() {
  return launches.map((launch) => ({
    slug: launch.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const launch = getLaunchBySlug(resolvedParams.slug);

  if (!launch) {
    return {
      title: "Launch Not Found — LaunchGraph",
    };
  }

  return {
    title: `${launch.company} Launch Analysis — LaunchGraph`,
    description: launch.hookSummary,
  };
}

export default async function LaunchDetailPage({ params }) {
  const resolvedParams = await params;
  const launch = getLaunchBySlug(resolvedParams.slug);

  if (!launch) {
    notFound();
  }

  const relatedLaunches = getRelatedLaunches(launch.slug, 3);

  return (
    <div className="space-y-8">
      {/* Back Navigation Link */}
      <div>
        <Link
          href="/launches"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#991b1b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1 rounded-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to all launches</span>
        </Link>
      </div>

      {/* 1. Header */}
      <PageHeader
        eyebrow={`${launch.month} • ${formatPlatform(launch.platform)}`}
        title={launch.company}
        description={`Featured anchor account: ${launch.featuredAccount} (${launch.featuredHandle})`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge variant="default">
            {formatAccountType(launch.accountType)}
          </StatusBadge>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/20">
            <ShieldCheck className="h-3.5 w-3.5 text-[#991b1b]" aria-hidden="true" />
            <span>Confirmed portfolio entry</span>
          </span>
          <a
            href={launch.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${launch.company} case study on Social Capital (opens in new tab)`}
            className="inline-flex items-center gap-1 rounded-md bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#333333] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2"
          >
            <span>Case Study</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </PageHeader>

      {/* 2 & 3. Two-Column Desktop Grid for Framing & Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Launch Framing */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#991b1b]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
                  Launch Framing & Hook
                </h2>
              </div>
              <span className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-700">
                {formatOpeningType(launch.openingType)}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Hook Summary
              </span>
              <p className="text-base font-medium text-[#1a1a1a] leading-snug">
                &ldquo;{launch.hookSummary}&rdquo;
              </p>
            </div>

            <div className="space-y-2 rounded-md border border-neutral-200 bg-neutral-50/70 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Classification Rationale
                </span>
                <StatusBadge variant="neutral">Structured manual classification</StatusBadge>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {launch.classificationRationale}
              </p>
            </div>
          </div>

          {/* Credibility Signals */}
          <div className="border-t border-neutral-100 pt-4 space-y-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block">
              Observed Credibility Signals
            </span>
            <div className="flex flex-wrap gap-2">
              {launch.credibilitySignals.map((sig, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 shadow-2xs"
                >
                  {sig}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Evidence Signals & Binary Attributes */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Layers className="h-4 w-4 text-[#991b1b]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
              Observable Evidence Signals
            </h2>
          </div>

          <div className="divide-y divide-neutral-100 text-xs">
            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-neutral-700">Founder-led anchor account</span>
              {launch.accountType === "founder" ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]">
                  <Check className="h-4 w-4" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Minus className="h-4 w-4" /> No (Company handle)
                </span>
              )}
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-neutral-700">Funding / investor-backing proof</span>
              {launch.containsFundingProof ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]">
                  <Check className="h-4 w-4" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Minus className="h-4 w-4" /> No
                </span>
              )}
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-neutral-700">Product / feature announcement</span>
              {launch.containsProductAnnouncement ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]">
                  <Check className="h-4 w-4" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Minus className="h-4 w-4" /> No
                </span>
              )}
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-neutral-700">Founder journey / origin story</span>
              {launch.containsFounderStory ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]">
                  <Check className="h-4 w-4" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Minus className="h-4 w-4" /> No
                </span>
              )}
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="font-medium text-neutral-700">Native embedded video asset</span>
              {launch.containsVideo ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#991b1b]">
                  <Check className="h-4 w-4" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Minus className="h-4 w-4" /> No
                </span>
              )}
            </div>
          </div>

          <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-3.5 text-xs text-neutral-500">
            <p>
              Attributes verified against direct observable content of the primary anchor post.
            </p>
          </div>
        </section>
      </div>

      {/* 4 & 5. Source Facts & Research Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 4. Source Facts */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <FileText className="h-4 w-4 text-[#991b1b]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
              Primary Source Facts
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-md border border-neutral-100 bg-neutral-50 px-3 py-2">
              <div className="flex items-center gap-2 text-neutral-600">
                <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                <span className="font-medium">Publication Date:</span>
              </div>
              <span className="font-semibold text-[#1a1a1a]">
                {launch.publishedDate}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md border border-neutral-100 bg-neutral-50 px-3 py-2 gap-1">
              <div className="flex items-center gap-2 text-neutral-600">
                <Clock className="h-3.5 w-3.5 text-neutral-500" />
                <span className="font-medium">Displayed Time:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1a1a1a]">
                  {launch.displayedTime}
                </span>
                {!launch.timeZoneKnown && (
                  <span className="text-[11px] text-neutral-400 italic">
                    (Timezone not specified by source)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="font-semibold text-neutral-500 uppercase tracking-wide text-[11px] block">
                Source Facts Checklist
              </span>
              <ul className="space-y-1.5">
                {launch.sourceFacts.map((fact, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-neutral-700 bg-neutral-50/70 rounded px-2.5 py-1.5 border border-neutral-100"
                  >
                    <Check className="h-3.5 w-3.5 text-[#991b1b] shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Research Notes & Scope */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Info className="h-4 w-4 text-[#991b1b]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
                Research Notes & Methodology
              </h2>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block">
                Case Study Observation Note
              </span>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-3.5 rounded-md border border-neutral-200">
                {launch.researchNotes}
              </p>
            </div>
          </div>

          <div className="rounded-md border border-neutral-200 bg-neutral-50/70 p-4 text-xs text-neutral-600 space-y-1">
            <p className="font-semibold text-[#1a1a1a]">Scope Boundary:</p>
            <p className="leading-relaxed">
              This page analyzes a portfolio anchor asset, not the complete campaign or downstream conversion metrics.
            </p>
          </div>
        </section>
      </div>

      {/* 6. Related Launches */}
      {relatedLaunches.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-[#991b1b]" />
              <h2 className="text-base font-bold text-[#1a1a1a]">
                Related Launches in Portfolio
              </h2>
            </div>
            <span className="text-xs text-neutral-500">
              Matched by narrative opening & evidence signals
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedLaunches.map((item) => (
              <Link
                key={item.slug}
                href={`/launches/${item.slug}`}
                className="group flex flex-col justify-between rounded-lg border border-neutral-200 bg-white p-5 shadow-xs transition-all hover:border-[#991b1b]/40 hover:shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">
                      {item.month}
                    </span>
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700">
                      {formatOpeningType(item.openingType)}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#991b1b] transition-colors">
                    {item.company}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {item.hookSummary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>{item.featuredAccount}</span>
                  <span className="font-semibold text-[#991b1b] group-hover:underline">
                    View &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
