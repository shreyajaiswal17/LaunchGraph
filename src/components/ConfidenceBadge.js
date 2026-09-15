import { ShieldCheck, ShieldAlert } from "lucide-react";
import { getTotalLaunches } from "@/lib/analytics";

export default function ConfidenceBadge({
  confidence = "confirmed",
  children,
  className = "",
}) {
  const isConfirmed = confidence === "confirmed";
  const totalLaunches = getTotalLaunches();
  const label = children || (isConfirmed ? `${totalLaunches} verified sources` : confidence.replace(/_/g, " "));

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
        isConfirmed
          ? "bg-[#991b1b]/10 text-[#991b1b] border-[#991b1b]/20"
          : "bg-neutral-100 text-neutral-600 border-neutral-200"
      } ${className}`}
    >
      {isConfirmed ? (
        <ShieldCheck className="h-3.5 w-3.5 text-[#991b1b]" />
      ) : (
        <ShieldAlert className="h-3.5 w-3.5 text-neutral-500" />
      )}
      <span>{label}</span>
    </span>
  );
}
