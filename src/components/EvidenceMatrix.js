import Link from "next/link";
import { launches } from "@/data/launches";
import { Check, Minus, ExternalLink, Info } from "lucide-react";

export default function EvidenceMatrix() {
  return (
    <div id="evidence-matrix" className="space-y-4 scroll-mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-[#1a1a1a]">
            Launch Evidence Matrix
          </h3>
          <p className="text-xs text-neutral-500">
            Observation matrix across all {launches.length} verified case studies
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50/80 text-neutral-700 font-semibold">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">
                  Company
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Founder-Led
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Funding / Backing
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Product Announce
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Founder Story
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Video
                </th>
                <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                  Source Link
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {launches.map((item) => (
                <tr
                  key={item.slug}
                  className="hover:bg-neutral-50/60 transition-colors"
                >
                  <td className="py-3.5 pl-4 pr-3 sm:pl-6 font-semibold text-[#1a1a1a]">
                    <Link
                      href={`/launches/${item.slug}`}
                      className="hover:text-[#991b1b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1 rounded-sm"
                    >
                      {item.company}
                    </Link>
                    <div className="text-[11px] font-normal text-neutral-400">
                      {item.month} &bull; {item.featuredHandle}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-center">
                    {item.accountType === "founder" ? (
                      <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-label="Yes, founder-led" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-label="No, company account" />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-center">
                    {item.containsFundingProof ? (
                      <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-label="Yes, contains funding proof" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-label="No funding proof" />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-center">
                    {item.containsProductAnnouncement ? (
                      <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-label="Yes, contains product announcement" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-label="No product announcement" />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-center">
                    {item.containsFounderStory ? (
                      <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-label="Yes, contains founder story" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-label="No founder story" />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-center">
                    {item.containsVideo ? (
                      <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-label="Yes, contains video" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-label="No video" />
                    )}
                  </td>
                  <td className="whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.company} public case study on Social Capital (opens in new tab)`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-[#991b1b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1 rounded-sm"
                    >
                      <span>Public Case Study</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="border-t border-neutral-200 bg-neutral-50/70 p-4">
          <div className="flex items-start gap-2.5">
            <Info className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-600 leading-relaxed">
              <strong>Matrix Legend:</strong>{" "}
              <Check className="inline h-3.5 w-3.5 text-[#991b1b] align-middle" aria-hidden="true" />
              {" "}indicates attribute presence;{" "}
              <Minus className="inline h-3.5 w-3.5 text-neutral-400 align-middle" aria-hidden="true" />
              {" "}indicates attribute absence. All entries represent structured manual classifications derived strictly from publicly observable case study artifacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
