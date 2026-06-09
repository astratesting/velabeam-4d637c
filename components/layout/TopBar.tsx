"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";

interface TopBarProps {
  onToggleSidebar: () => void;
  agencyLogo?: string | null;
  notificationCount?: number;
}

export default function TopBar({
  onToggleSidebar,
  agencyLogo,
  notificationCount = 0,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-vb-line bg-white px-4 sm:px-6">
      {/* Left: hamburger + agency logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md p-2 text-vb-muted hover:text-vb-ink lg:hidden"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>

        {agencyLogo ? (
          <div className="group relative">
            <img
              src={agencyLogo}
              alt="Agency logo"
              className="h-8 max-w-[140px] cursor-pointer rounded object-contain"
            />
            <span className="pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap rounded bg-vb-ink px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Click to edit logo
            </span>
          </div>
        ) : (
          <button
            type="button"
            className="rounded-input border border-dashed border-vb-line px-3 py-1.5 text-xs font-medium text-vb-muted transition-colors hover:border-vb-violet hover:text-vb-violet"
          >
            + Add logo
          </button>
        )}
      </div>

      {/* Center: search */}
      <div className="mx-4 hidden max-w-md flex-1 sm:block">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-vb-muted"
          />
          <input
            type="text"
            placeholder="Search leads, clients, sites..."
            className="w-full rounded-input border border-vb-line bg-vb-bg py-2 pl-9 pr-4 text-sm text-vb-ink placeholder:text-vb-muted/60 focus:border-vb-violet focus:outline-none focus:ring-1 focus:ring-vb-violet/30"
          />
        </div>
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-md p-2 text-vb-muted transition-colors hover:text-vb-ink"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-vb-honey px-1 text-[10px] font-bold leading-none text-vb-ink">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        {/* Avatar menu */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            className="flex items-center gap-2 rounded-input px-2 py-1.5 transition-colors hover:bg-vb-bg"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vb-violet text-sm font-semibold text-white">
              A
            </div>
            <ChevronDown
              size={14}
              className={`hidden text-vb-muted transition-transform sm:block ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-card border border-vb-line bg-white shadow-warm animate-fade-in">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-vb-muted transition-colors hover:bg-vb-bg hover:text-vb-ink"
                onClick={() => setMenuOpen(false)}
              >
                <Settings size={16} />
                Settings
              </Link>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-vb-muted transition-colors hover:bg-vb-bg hover:text-vb-ink"
                onClick={() => setMenuOpen(false)}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
