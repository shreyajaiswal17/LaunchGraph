import PageHeader from "@/components/PageHeader";
import { DATASET_LAST_REVIEWED } from "@/data/launches";
import { getTotalLaunches } from "@/lib/analytics";
import { ExternalLink, ShieldCheck, Calendar } from "lucide-react";

export const metadata = {
  title: "Methodology & Limitations — LaunchGraph",
  description:
    "Research principles, dataset provenance, classification taxonomy, and analytical boundaries of LaunchGraph.",
};

export default function MethodologyPage() {
  const totalLaunches = getTotalLaunches();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Research Governance"
        title="Methodology & limitations"
        description="Understand the research principles, data provenance standards, and analytical boundaries governing the LaunchGraph platform."
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/20">
          <ShieldCheck className="h-3.5 w-3.5 text-[#991b1b]" />
          <span>{totalLaunches} verified sources</span>
        </span>
      </PageHeader>

      <div className="space-y-6">
        {/* Dataset Scope & Provenance */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h2 className="text-base font-bold tracking-tight text-[#1a1a1a]">
              Dataset Scope & Provenance
            </h2>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">
                <ShieldCheck className="h-3.5 w-3.5 text-[#991b1b]" />
                {totalLaunches} Case Studies
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600">
                <Calendar className="h-3 w-3 text-neutral-500" />
                <span>Reviewed: {DATASET_LAST_REVIEWED}</span>
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            The current research dataset scope comprises <strong>nine publicly listed case studies</strong>. The dataset was retrieved directly from Social Capital Inc.’s public <a href="https://www.sociallcapital.com/work" target="_blank" rel="noopener noreferrer" className="text-[#991b1b] underline font-medium inline-flex items-center gap-0.5">Selected Work pages <ExternalLink className="h-3 w-3 inline" /></a>.
          </p>
          <div className="space-y-2 rounded-md border border-neutral-200 bg-neutral-50/80 p-4 text-xs text-neutral-700">
            <p className="font-semibold text-[#1a1a1a]">Provenance Boundaries:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li><strong>No private campaign data was used:</strong> Research is constrained strictly to open web artifacts.</li>
              <li><strong>No surrounding creator amplification is included yet:</strong> Secondary reposts, quote tweets, and affiliate creator waves are not cataloged in this initial release.</li>
              <li><strong>Portfolio anchor assets only:</strong> The analysis covers portfolio anchor assets, not complete campaign performance or conversion funnel metrics.</li>
            </ul>
          </div>
        </section>

        {/* Source Facts vs. Structured Manual Classifications */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold tracking-tight text-[#1a1a1a] mb-3">
            Source Facts vs. Structured Manual Classifications
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            We maintain a strict conceptual distinction between verifiable primary facts and qualitative analytical classifications:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
            <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-4 space-y-2">
              <h3 className="font-bold text-[#1a1a1a] uppercase tracking-wider text-[11px]">
                Primary Source Facts
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Objective attributes directly observable on the public record, including company name, publication date, displayed time, author handle, platform destination, and presence of native video.
              </p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-4 space-y-2">
              <h3 className="font-bold text-[#1a1a1a] uppercase tracking-wider text-[11px]">
                Analytical Classifications
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Categorizations such as <em>Opening Type</em>, <em>Hook Summary</em>, and <em>Narrative Structure</em> are derived via structured manual review to standardize patterns across heterogeneous launch posts.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4 text-xs text-neutral-700">
            <p className="leading-relaxed">
              Featured account roles were categorized using publicly available company and profile information. Account-role classification remains part of the external research layer rather than information supplied by Social Capital.
            </p>
          </div>
        </section>

        {/* Section: What LaunchGraph analyzes */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold tracking-tight text-[#1a1a1a] mb-3">
            What LaunchGraph Analyzes
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            LaunchGraph investigates how new technology product announcements are framed across public distribution channels. The platform maps message delivery, timing sequences, narrative structures, and credibility signals across observable anchor posts.
          </p>
          <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              LaunchGraph uses only publicly available information.
            </p>
          </div>
        </section>

        {/* Section: Public data sources */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold tracking-tight text-[#1a1a1a] mb-3">
            Public Data Sources & Engagement Signals
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            All data points originate exclusively from indexed, publicly accessible posts, videos, articles, and community discussions on major distribution platforms.
          </p>
          <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              Public engagement does not represent conversions, revenue, or campaign ROI.
            </p>
          </div>
        </section>

        {/* Section: Attribution confidence */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold tracking-tight text-[#1a1a1a] mb-3">
            Attribution Confidence & Agency Disclaimers
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            Each launch observation is assigned a confidence rating based on explicit public disclosures, temporal clustering, and direct narrative ties.
          </p>
          <div className="space-y-3">
            <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
              <p className="text-xs sm:text-sm text-neutral-700 font-medium">
                Attribution confidence reflects the strength of available public evidence.
              </p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
              <p className="text-xs sm:text-sm text-neutral-700 font-medium">
                Inclusion does not prove that Social Capital commissioned a post.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Role of AI */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold tracking-tight text-[#1a1a1a] mb-3">
            Role of AI
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            Automated language models assist with structural taxonomy, transcript parsing, and narrative categorization across large volumes of public communications.
          </p>
          <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              AI-generated classifications require manual review.
            </p>
          </div>
        </section>

        {/* Section: Limitations */}
        <section className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold tracking-tight text-[#1a1a1a] mb-3">
            Limitations
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            LaunchGraph is an external observational research instrument. It does not have access to private contracts, private correspondence, or unreleased product roadmaps.
          </p>
          <div className="rounded-md border border-neutral-200 bg-neutral-50/80 p-4">
            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              Observed patterns are external inferences, not claims about Social Capital’s internal processes.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
