"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-neutral-200 bg-[#fbfbfb] px-4 md:hidden">
      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className="inline-flex flex-col"
      >
        <span className="text-base font-bold tracking-tight text-[#1a1a1a]">
          LaunchGraph
        </span>
        <span className="text-[10px] font-medium tracking-wide text-neutral-500 uppercase">
          Launch Intelligence
        </span>
      </Link>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Mobile Drawer / Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-40 flex flex-col bg-[#fbfbfb]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav
            id="mobile-nav-menu"
            className="flex-1 space-y-1 px-4 py-6"
            aria-label="Mobile Navigation Menu"
          >
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
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991b1b] focus-visible:ring-offset-1 ${
                    isActive
                      ? "bg-neutral-200/80 text-[#1a1a1a] font-semibold border-l-2 border-[#991b1b] pl-2.5"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? "text-[#991b1b]" : "text-neutral-500"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-neutral-200 px-6 py-4">
            <p className="text-xs text-neutral-400 font-medium">
              Public-data research tool
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
