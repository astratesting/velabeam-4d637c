"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Globe,
  Building2,
  Landmark,
  CreditCard,
  HelpCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  agencyLogo?: string | null;
}

const sidebarItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Sites", href: "/dashboard/sites", icon: Globe },
  { label: "Clients", href: "/dashboard/clients", icon: Building2 },
  { label: "Agency", href: "/dashboard/agency", icon: Landmark },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export default function Sidebar({ open, onClose, agencyLogo }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-vb-line bg-white
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button on mobile */}
        <div className="flex h-16 items-center justify-between border-b border-vb-line px-4 lg:px-6">
          {agencyLogo ? (
            <img
              src={agencyLogo}
              alt="Agency logo"
              className="h-8 max-w-[140px] object-contain"
            />
          ) : (
            <span className="font-heading text-lg font-extrabold tracking-tight text-vb-ink">
              VelaBeam
            </span>
          )}
          <button
            type="button"
            className="rounded-md p-1.5 text-vb-muted hover:text-vb-ink lg:hidden"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      relative flex items-center gap-3 rounded-input px-3 py-2.5 text-sm font-medium transition-colors
                      ${
                        active
                          ? "border-l-[3px] border-vb-coral bg-vb-bg text-vb-ink pl-[9px]"
                          : "border-l-[3px] border-transparent text-vb-muted hover:bg-vb-bg hover:text-vb-ink pl-[9px]"
                      }
                    `}
                  >
                    <Icon size={18} className={active ? "text-vb-coral" : ""} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
