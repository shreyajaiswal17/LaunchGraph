"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  Users,
  Network,
  ShieldCheck,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Launches",
    href: "/launches",
    icon: Rocket,
  },
  {
    label: "Featured Accounts",
    href: "/creators",
    icon: Users,
  },
  {
    label: "Message Patterns",
    href: "/patterns",
    icon: Network,
  },
  {
    label: "Methodology",
    href: "/methodology",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Sidebar navigation"
      className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-neutral-200 bg-[#fbfbfb] md:flex"
    >
      {/* Brand Header */}
      <div className="flex h-16 flex-col justify-center border-b border-neutral-200 px-6">
        <Link
          href="/"
          className="group inline-flex flex-col rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2"
        >
          <span className="text-lg font-bold tracking-tight text-[#1a1a1a] transition-colors group-hover:text-[#991b1b]">
            LaunchGraph
          </span>
          <span className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
            Launch Intelligence
          </span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1 ${
                isActive
                  ? "bg-neutral-200/70 text-[#1a1a1a] font-semibold border-l-2 border-[#991b1b] pl-2.5"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-[#991b1b]" : "text-neutral-500"
                }`}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Label */}
      <div className="border-t border-neutral-200 px-6 py-4">
        <p className="text-xs text-neutral-400 font-medium">
          Public-data research tool
        </p>
      </div>
    </aside>
  );
}
