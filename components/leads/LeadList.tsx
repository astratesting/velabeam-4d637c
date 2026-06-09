"use client";

import { Phone, Globe, MapPin, Utensils, Scissors, Wrench, Car, HardHat, Stethoscope, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const line = "#ECE6DE";
const bg = "#FBF7F2";

/* ─── Category icon map ─── */
const categoryIcons: Record<string, typeof Utensils> = {
  Restaurant: Utensils,
  Dentist: Stethoscope,
  Salon: Scissors,
  Plumber: Wrench,
  Roofer: HardHat,
  "Auto Shop": Car,
};
const defaultIcon = Building2;

/* ─── Status badge map ─── */
const statusBadge: Record<string, { variant: "default" | "success" | "warning" | "muted"; label: string }> = {
  NEW: { variant: "default", label: "New" },
  CONTACTED: { variant: "success", label: "Contacted" },
  WON: { variant: "warning", label: "Won" },
  LOST: { variant: "muted", label: "Lost" },
};

/* ─── Types ─── */
export interface Lead {
  id: string;
  businessName: string;
  category: string;
  phone?: string | null;
  email?: string | null;
  address?: string;
  distance?: number | null;
  status?: string;
  lat?: number;
  lng?: number;
  [key: string]: unknown;
}

export interface LeadListProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
}

/* ─── Helpers ─── */
function formatDistance(miles: number | null | undefined): string {
  if (miles == null) return "";
  if (miles < 0.1) return "< 0.1 mi";
  if (miles < 1) return `${Math.round(miles * 10) / 10} mi`;
  return `${miles.toFixed(1)} mi`;
}

/* ─── Component ─── */
export function LeadList({ leads, onLeadClick }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 rounded-2xl border"
        style={{ borderColor: line, backgroundColor: bg }}
      >
        <MapPin size={32} style={{ color: mute }} />
        <p className="mt-3 text-sm font-medium" style={{ color: ink }}>
          No leads found
        </p>
        <p className="mt-1 text-xs" style={{ color: mute }}>
          Adjust your filters or expand your search area
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {leads.map((lead) => {
        const Icon = categoryIcons[lead.category] ?? defaultIcon;
        const status = statusBadge[lead.status ?? "NEW"] ?? statusBadge.NEW;

        return (
          <div
            key={lead.id}
            role="button"
            tabIndex={0}
            onClick={() => onLeadClick?.(lead)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onLeadClick?.(lead);
              }
            }}
            className="flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-150 hover:shadow-md group"
            style={{ borderColor: line, backgroundColor: "white" }}
          >
            {/* Category icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
              style={{ backgroundColor: `${violet}12` }}
            >
              <Icon size={18} style={{ color: violet }} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-sm font-semibold truncate"
                  style={{ color: ink }}
                >
                  {lead.businessName}
                </span>
                <Badge variant="muted" className="text-[10px]">
                  {lead.category}
                </Badge>
                <Badge variant="warning" className="text-[10px]">
                  No website
                </Badge>
              </div>

              <div className="flex items-center gap-3 mt-1">
                {lead.phone && (
                  <span
                    className="inline-flex items-center gap-1 text-xs"
                    style={{ color: mute }}
                  >
                    <Phone size={11} />
                    {lead.phone}
                  </span>
                )}
                {lead.distance != null && (
                  <span
                    className="inline-flex items-center gap-1 text-xs"
                    style={{ color: mute }}
                  >
                    <MapPin size={11} />
                    {formatDistance(lead.distance)}
                  </span>
                )}
              </div>
            </div>

            {/* Status + Action */}
            <div className="flex items-center gap-3 shrink-0">
              <Badge variant={status.variant}>{status.label}</Badge>
              <Link
                href={`/dashboard/sites/new?leadId=${lead.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button size="sm" variant="primary">
                  <Globe size={14} />
                  Generate site
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LeadList;
