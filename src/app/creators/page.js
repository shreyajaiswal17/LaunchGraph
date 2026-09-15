import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import { launches } from "@/data/launches";
import { formatPlatform, formatAccountType, getAccountTypeDistribution } from "@/lib/analytics";
import { ExternalLink, UserCheck, ShieldAlert, User, Building } from "lucide-react";

export const metadata = {
  title: "Featured Accounts — LaunchGraph",
  description:
    "Featured accounts associated with public product launch anchor posts across technology companies.",
};

export default function FeaturedAccountsPage() {
  const accountStats = getAccountTypeDistribution();

  // Get unique accounts by handle / name
  const featuredAccounts = launches.reduce((acc, launch) => {
    if (!acc.some((item) => item.featuredHandle === launch.featuredHandle)) {
      acc.push(launch);
    }
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Observed Launch Anchors"
        title="Featured Accounts"
        description="Understand how publicly observable accounts participate as primary anchors across verified technology product launches."
      >
        <StatusBadge variant="neutral">
          {featuredAccounts.length} Verified Accounts
        </StatusBadge>
      </PageHeader>

      {/* Account Type Distribution Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Total Featured Accounts
            </span>
            <UserCheck className="h-4 w-4 text-[#991b1b]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1a1a1a]">
              {featuredAccounts.length}
            </span>
            <span className="text-xs text-neutral-500">
              unique public anchors
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Individual Accounts
            </span>
            <User className="h-4 w-4 text-[#991b1b]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1a1a1a]">
              {accountStats.individualCount}
            </span>
            <span className="text-xs text-neutral-500">
              ({Math.round((accountStats.individualCount / accountStats.total) * 100)}% founder accounts)
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Company Accounts
            </span>
            <Building className="h-4 w-4 text-[#991b1b]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1a1a1a]">
              {accountStats.companyCount}
            </span>
            <span className="text-xs text-neutral-500">
              ({Math.round((accountStats.companyCount / accountStats.total) * 100)}% corporate handle)
            </span>
          </div>
        </div>
      </div>

      {/* Scope & Terminology Notice */}
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-[#991b1b] mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Research Classification Note
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              These profiles represent <strong>featured launch accounts</strong> that authored the anchor posts in the verified case study dataset. This page does not attempt to identify or map Social Capital’s complete creator network, nor does it classify every featured account as an influencer or agency partner.
            </p>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredAccounts.map((account) => (
          <div
            key={account.featuredHandle}
            className="flex flex-col justify-between rounded-lg border border-neutral-200 bg-white p-5 shadow-xs hover:border-neutral-300 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold text-sm">
                    {account.featuredAccount
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1a1a]">
                      {account.featuredAccount}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {account.featuredHandle}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                  {formatAccountType(account.accountType)}
                </span>
              </div>

              <div className="space-y-2 border-t border-neutral-100 pt-3 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span className="text-neutral-400">Associated Launch:</span>
                  <Link
                    href={`/launches/${account.slug}`}
                    className="font-semibold text-[#1a1a1a] hover:text-[#991b1b] hover:underline"
                  >
                    {account.company} ({account.month})
                  </Link>
                </div>
                <div className="flex items-center justify-between text-neutral-600">
                  <span className="text-neutral-400">Platform:</span>
                  <span className="font-medium text-neutral-700">
                    {formatPlatform(account.platform)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-neutral-100 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <UserCheck className="h-3.5 w-3.5 text-[#991b1b]" />
                <span>Anchor author</span>
              </div>

              <a
                href={account.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 hover:text-[#991b1b] transition-colors"
              >
                <span>View Case Study</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
