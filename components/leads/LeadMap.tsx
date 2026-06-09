"use client";

import { MapPin } from "lucide-react";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";

/* ─── Types ─── */
interface LeadLocation {
  lat: number;
  lng: number;
  [key: string]: unknown;
}

export interface LeadMapProps {
  leads: LeadLocation[];
  className?: string;
}

/* ─── Component ─── */
export function LeadMap({ leads, className = "" }: LeadMapProps) {
  return (
    <div
      className={[
        "relative flex flex-col items-center justify-center",
        "w-full min-h-[480px] rounded-2xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: "#E8E4DE" }}
    >
      {/* Lead count badge */}
      <div
        className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: `${violet}18`,
          color: violet,
        }}
      >
        <MapPin size={12} />
        {leads.length} {leads.length === 1 ? "lead" : "leads"}
      </div>

      {/* Placeholder content */}
      <div className="flex flex-col items-center gap-3 text-center px-6">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full"
          style={{ backgroundColor: `${violet}15` }}
        >
          <MapPin size={24} style={{ color: violet }} />
        </div>
        <p className="text-sm font-medium" style={{ color: ink }}>
          Map view — integrate Leaflet for interactive map
        </p>
        <p className="text-xs" style={{ color: mute }}>
          {leads.length} {leads.length === 1 ? "location" : "locations"} plotted
        </p>
      </div>
    </div>
  );
}

export default LeadMap;
