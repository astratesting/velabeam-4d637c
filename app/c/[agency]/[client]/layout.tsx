"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

interface AgencyBrand {
  name: string;
  logoUrl: string | null;
  accentColor: string;
}

const NAV_ITEMS = [
  { label: "My Site", href: "site" },
  { label: "Billing", href: "billing" },
  { label: "Request Changes", href: "requests" },
] as const;

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const agencySlug = params.agency as string;
  const clientSlug = params.client as string;

  const [brand, setBrand] = useState<AgencyBrand | null>(null);

  const basePath = `/c/${agencySlug}/${clientSlug}`;
  const accentColor = brand?.accentColor || "#6B4FE0";

  useEffect(() => {
    async function loadBrand() {
      try {
        const res = await fetch(
          `/api/clients?agency=${encodeURIComponent(agencySlug)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === "object" && !Array.isArray(data)) {
            setBrand({
              name: data.agencyName || agencySlug,
              logoUrl: data.agencyLogoUrl || null,
              accentColor: data.agencyAccentColor || "#6B4FE0",
            });
          } else {
            setBrand({
              name: agencySlug
                .split("-")
                .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" "),
              logoUrl: null,
              accentColor: "#6B4FE0",
            });
          }
        } else {
          setBrand({
            name: agencySlug
              .split("-")
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            logoUrl: null,
            accentColor: "#6B4FE0",
          });
        }
      } catch {
        setBrand({
          name: agencySlug
            .split("-")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          logoUrl: null,
          accentColor: "#6B4FE0",
        });
      }
    }

    loadBrand();
  }, [agencySlug]);

  function isActive(href: string) {
    return pathname === `${basePath}/${href}`;
  }

  return (
    <div className="min-h-screen bg-[#FBF7F2] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#ECE6DE]">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          {/* Agency branding */}
          <div className="flex items-center gap-3">
            {brand?.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-8 w-8 rounded-lg object-contain"
              />
            ) : (
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {brand?.name?.charAt(0) || agencySlug.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-lg font-semibold text-[#1B1530] font-[family-name:var(--font-heading)]">
              {brand?.name || agencySlug}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`${basePath}/${item.href}`}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: active
                      ? `${accentColor}12`
                      : "transparent",
                    color: active ? accentColor : "#6B6480",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "#F5F3F0";
                      e.currentTarget.style.color = "#1B1530";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#6B6480";
                    }
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#ECE6DE] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-center">
          <p className="text-xs text-[#6B6480]">
            Powered by{" "}
            <a
              href="https://velabeam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#ECE6DE] hover:text-[#6B4FE0] transition-colors"
            >
              VelaBeam
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
