"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { launches as allLaunches } from "@/data/launches";
import {
  formatOpeningType,
  formatPlatform,
  formatAccountType,
} from "@/lib/analytics";
import { ExternalLink, Check, Minus, RotateCcw, Filter } from "lucide-react";

export default function LaunchTable() {
  const [selectedAccountType, setSelectedAccountType] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedOpeningType, setSelectedOpeningType] = useState("all");

  // Get unique filter options dynamically from data
  const accountTypeOptions = useMemo(() => {
    return Array.from(new Set(allLaunches.map((item) => item.accountType)));
  }, []);

  const platformOptions = useMemo(() => {
    return Array.from(new Set(allLaunches.map((item) => item.platform)));
  }, []);

  const openingTypeOptions = useMemo(() => {
    return Array.from(new Set(allLaunches.map((item) => item.openingType)));
  }, []);

  // Filtered dataset
  const filteredLaunches = useMemo(() => {
    return allLaunches.filter((item) => {
      const matchAccount =
        selectedAccountType === "all" || item.accountType === selectedAccountType;
      const matchPlatform =
        selectedPlatform === "all" || item.platform === selectedPlatform;
      const matchOpening =
        selectedOpeningType === "all" || item.openingType === selectedOpeningType;
      return matchAccount && matchPlatform && matchOpening;
    });
  }, [selectedAccountType, selectedPlatform, selectedOpeningType]);

  const hasActiveFilters =
    selectedAccountType !== "all" ||
    selectedPlatform !== "all" ||
    selectedOpeningType !== "all";

  const handleResetFilters = () => {
    setSelectedAccountType("all");
    setSelectedPlatform("all");
    setSelectedOpeningType("all");
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500 mr-1">
              <Filter className="h-3.5 w-3.5 text-neutral-400" />
              <span>Filters</span>
            </div>

            {/* Account Type Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
              <label htmlFor="filter-account" className="text-xs text-neutral-600 font-medium">
                Account:
              </label>
              <select
                id="filter-account"
                value={selectedAccountType}
                onChange={(e) => setSelectedAccountType(e.target.value)}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-medium text-[#1a1a1a] focus:border-[#991b1b] focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
              >
                <option value="all">All Accounts</option>
                {accountTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {formatAccountType(type)}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
              <label htmlFor="filter-platform" className="text-xs text-neutral-600 font-medium">
                Platform:
              </label>
              <select
                id="filter-platform"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-medium text-[#1a1a1a] focus:border-[#991b1b] focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
              >
                <option value="all">All Platforms</option>
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {formatPlatform(platform)}
                  </option>
                ))}
              </select>
            </div>

            {/* Opening Type Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
              <label htmlFor="filter-opening" className="text-xs text-neutral-600 font-medium">
                Opening Type:
              </label>
              <select
                id="filter-opening"
                value={selectedOpeningType}
                onChange={(e) => setSelectedOpeningType(e.target.value)}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-medium text-[#1a1a1a] focus:border-[#991b1b] focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
              >
                <option value="all">All Opening Types</option>
                {openingTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {formatOpeningType(type)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Counts & Reset */}
          <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
            <span className="text-xs font-medium text-neutral-500">
              Showing <strong className="text-[#1a1a1a]">{filteredLaunches.length}</strong> of {allLaunches.length} launches
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50/75 text-neutral-600 font-semibold">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">
                  Company
                </th>
                <th scope="col" className="px-3 py-3.5">
                  Month
                </th>
                <th scope="col" className="px-3 py-3.5">
                  Featured Account
                </th>
                <th scope="col" className="px-3 py-3.5">
                  Type
                </th>
                <th scope="col" className="px-3 py-3.5">
                  Platform
                </th>
                <th scope="col" className="px-3 py-3.5">
                  Opening Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Video
                </th>
                <th scope="col" className="px-3 py-3.5 text-center">
                  Funding Proof
                </th>
                <th scope="col" className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {filteredLaunches.length > 0 ? (
                filteredLaunches.map((item) => (
                  <tr
                    key={item.slug}
                    className="hover:bg-neutral-50/60 transition-colors"
                  >
                    <td className="py-3.5 pl-4 pr-3 sm:pl-6 font-semibold text-[#1a1a1a]">
                      <Link
                        href={`/launches/${item.slug}`}
                        className="hover:text-[#991b1b] hover:underline"
                      >
                        {item.company}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-neutral-600">
                      {item.month}
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="font-medium text-[#1a1a1a]">
                        {item.featuredAccount}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {item.featuredHandle}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 capitalize">
                        {formatAccountType(item.accountType)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-neutral-600">
                      {formatPlatform(item.platform)}
                    </td>
                    <td className="px-3 py-3.5 text-neutral-700">
                      <span className="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-700">
                        {formatOpeningType(item.openingType)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-center">
                      {item.containsVideo ? (
                        <span className="inline-flex items-center justify-center" aria-label="Video present">
                          <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center" aria-label="No video">
                          <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-hidden="true" />
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-center">
                      {item.containsFundingProof ? (
                        <span className="inline-flex items-center justify-center" aria-label="Funding proof present">
                          <Check className="mx-auto h-4 w-4 text-[#991b1b]" aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center" aria-label="No funding proof">
                          <Minus className="mx-auto h-4 w-4 text-neutral-300" aria-hidden="true" />
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.company} case study on Social Capital (opens in new tab)`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-[#991b1b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1 rounded-sm"
                      >
                        <span>Case Study</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-neutral-600">
                      No launches match the selected filter criteria.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
