import PageHeader from "@/components/PageHeader";
import EvidenceMatrix from "@/components/EvidenceMatrix";
import OpeningTypeChart from "@/components/OpeningTypeChart";
import SignalPrevalenceChart from "@/components/SignalPrevalenceChart";
import { ShieldAlert, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Message Patterns — LaunchGraph",
  description:
    "Compare content formats, narratives, hooks, and product demonstrations across verified launch posts.",
};

export default function PatternsPage() {
  return (
    <div className="space-y-8">
      {/* 1. Page Header */}
      <PageHeader
        eyebrow="Taxonomy & Evidence"
        title="Message Patterns"
        description="Compare content formats, narrative hooks, credibility signals, and product demonstrations observed across verified launch anchor posts."
      />

      {/* 2. Short Explanation of Manually Reviewed Classifications */}
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-[#991b1b] mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Taxonomy Classification Standards
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every launch post in the dataset has undergone structured manual review to categorize its primary narrative opening, proof elements, and media format. These classifications provide an analytical framework for comparing heterogeneous launch communications across technology sectors.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Evidence Matrix */}
      <EvidenceMatrix />

      {/* 4. Visualizations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OpeningTypeChart />
        <SignalPrevalenceChart />
      </div>

      {/* 5. Limitations Note */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs">
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-[#991b1b] shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1a1a1a]">
              Research Scope & Analytical Boundaries
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Observed patterns are external inferences derived from 9 publicly available case study records. They do not constitute statements regarding Social Capital’s internal operating procedures, proprietary creative frameworks, or unreleased campaign outcomes.
            </p>
            <div className="pt-1">
              <Link
                href="/methodology"
                className="text-xs font-semibold text-[#991b1b] hover:underline"
              >
                Review research methodology & limitations &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
