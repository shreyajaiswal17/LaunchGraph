import PageHeader from "@/components/PageHeader";
import MetricCard from "@/components/MetricCard";
import InsightPanel from "@/components/InsightPanel";
import PortfolioTimeline from "@/components/PortfolioTimeline";
import SignalPrevalenceChart from "@/components/SignalPrevalenceChart";
import OpeningTypeChart from "@/components/OpeningTypeChart";
import {
  getTotalLaunches,
  getFounderAccountStats,
  getVideoStats,
  getFundingProofStats,
} from "@/lib/analytics";
import {
  FileCheck2,
  Users,
  Video,
  DollarSign,
  ExternalLink,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  const totalLaunches = getTotalLaunches();
  const founderStats = getFounderAccountStats();
  const videoStats = getVideoStats();
  const fundingStats = getFundingProofStats();

  return (
    <div className="space-y-8">
      {/* 1. Page Header */}
      <PageHeader
        eyebrow="Public launch intelligence"
        title="How high-distribution technology launches are framed"
        description="LaunchGraph analyzes the anchor accounts, narrative structures, credibility signals, and media formats visible across Social Capital’s public selected work."
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/20">
          <ShieldCheck className="h-3.5 w-3.5 text-[#991b1b]" aria-hidden="true" />
          <span>{totalLaunches} verified sources</span>
        </span>
      </PageHeader>

      {/* 2. Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Confirmed Case Studies"
          value={totalLaunches}
          subtext="Public records"
          description="Analyzed from Social Capital's selected work"
          icon={FileCheck2}
        />
        <MetricCard
          title="Founder-Led Anchors"
          value={`${founderStats.percentage}%`}
          subtext={`(${founderStats.count}/${totalLaunches})`}
          description="Launches anchored directly on founder accounts"
          icon={Users}
        />
        <MetricCard
          title="Video-Led Launches"
          value={`${videoStats.percentage}%`}
          subtext={`(${videoStats.count}/${totalLaunches})`}
          description="Launches utilizing embedded video assets"
          icon={Video}
        />
        <MetricCard
          title="Funding / Backing Proof"
          value={`${fundingStats.percentage}%`}
          subtext={`(${fundingStats.count}/${totalLaunches})`}
          description="Posts explicitly disclosing funding or investor backing"
          icon={DollarSign}
        />
      </div>

      {/* 3. Emerging Launch Architecture Insight */}
      <InsightPanel />

      {/* 4. Selected-Work Timeline */}
      <PortfolioTimeline />

      {/* 5. Visualizations: Signal Prevalence + Opening Narrative Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SignalPrevalenceChart />
        <OpeningTypeChart />
      </div>

      {/* 6. Data Provenance Banner */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#991b1b]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
                Data Provenance & Research Governance
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All metrics and charts are computed strictly from {totalLaunches} publicly observable case studies on Social Capital’s Selected Work page. No private campaign data or unverified surrounding creator posts are incorporated.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/methodology"
              className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Methodology →
            </Link>
            <a
              href="https://www.sociallcapital.com/work"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Social Capital Selected Work (opens in new tab)"
              className="inline-flex items-center gap-1 rounded-md bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#333333] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2"
            >
              <span>Selected Work</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
