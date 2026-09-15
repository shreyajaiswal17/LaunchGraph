import { getTotalLaunches, getFounderFundingProofStats } from "@/lib/analytics";
import StatusBadge from "@/components/StatusBadge";
import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InsightPanel() {
  const total = getTotalLaunches();
  const founderFunding = getFounderFundingProofStats();

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-600">
          <Lightbulb className="h-5 w-5 text-[#991b1b]" />
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-[#1a1a1a]">
              Emerging launch architecture
            </h2>
            <StatusBadge variant="accent">
              Evidence-backed external inference
            </StatusBadge>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-neutral-700 font-medium">
            Across the selected-work dataset, <strong>{founderFunding.totalFounders} of {total}</strong> anchor posts use an individual founder account. Among those founder-led posts, <strong>{founderFunding.count}</strong> include funding or investor-backing proof. This suggests that Social Capital’s public launch work frequently combines personal distribution with institutional credibility, rather than treating them as separate messages.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
            <p className="leading-relaxed">
              Note: This pattern describes observable structures in the public portfolio and does not represent a confirmed internal rule or comprehensive campaign performance.
            </p>
            <Link
              href="/patterns#evidence-matrix"
              className="inline-flex items-center gap-1 font-semibold text-[#991b1b] hover:underline shrink-0"
            >
              <span>View Evidence Matrix</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
