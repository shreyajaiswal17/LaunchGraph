import PageHeader from "@/components/PageHeader";
import LaunchTable from "@/components/LaunchTable";
import { getTotalLaunches } from "@/lib/analytics";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Launches — LaunchGraph",
  description:
    "Compare the timing, featured accounts, and narratives associated with selected technology product launches.",
};

export default function LaunchesPage() {
  const totalLaunches = getTotalLaunches();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dataset"
        title="Launches"
        description="Compare the timing, featured accounts, and narratives associated with selected technology product launches."
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/20">
          <ShieldCheck className="h-3.5 w-3.5 text-[#991b1b]" />
          <span>{totalLaunches} verified sources</span>
        </span>
      </PageHeader>

      <LaunchTable />
    </div>
  );
}
