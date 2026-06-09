"use client";

import type React from "react";
import { Star, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const line = "#ECE6DE";

/* ─── Status badge map ─── */
const statusBadge: Record<string, { variant: "default" | "success" | "warning" | "muted"; label: string }> = {
  NEW: { variant: "default", label: "New" },
  CONTACTED: { variant: "success", label: "Contacted" },
  WON: { variant: "warning", label: "Won" },
  LOST: { variant: "muted", label: "Lost" },
};

/* ─── Types ─── */
export interface LeadDetail {
  id: string;
  businessName: string;
  category: string;
  address?: string;
  phone?: string | null;
  email?: string | null;
  hours?: string | Record<string, { open: string; close: string } | null> | null;
  rating?: number | null;
  status?: string;
  lat?: number;
  lng?: number;
  [key: string]: unknown;
}

export interface LeadDrawerProps {
  lead: LeadDetail | null;
  open: boolean;
  onClose: () => void;
}

/* ─── Helpers ─── */
function parseHours(
  hours: string | Record<string, { open: string; close: string } | null> | null | undefined,
): Record<string, { open: string; close: string } | null> | null {
  if (!hours) return null;
  if (typeof hours === "string") {
    try {
      return JSON.parse(hours);
    } catch {
      return null;
    }
  }
  return hours;
}

function formatDayName(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1, 3);
}

function renderStars(rating: number): React.ReactElement[] {
  const stars: React.ReactElement[] = [];
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={honey}
          style={{ color: honey }}
        />,
      );
    } else if (i === full && hasHalf) {
      stars.push(
        <span key={i} className="relative inline-block" style={{ width: 16, height: 16 }}>
          <Star
            size={16}
            style={{ color: line }}
            className="absolute inset-0"
          />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star
              size={16}
              fill={honey}
              style={{ color: honey }}
            />
          </span>
        </span>,
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={16}
          style={{ color: line }}
        />,
      );
    }
  }

  return stars;
}

/* ─── Component ─── */
export function LeadDrawer({ lead, open, onClose }: LeadDrawerProps) {
  const parsedHours = lead ? parseHours(lead.hours) : null;
  const status = statusBadge[lead?.status ?? "NEW"] ?? statusBadge.NEW;

  return (
    <Drawer open={open} onClose={onClose} title={lead?.businessName ?? ""}>
      {!lead ? null : (
        <div className="flex flex-col gap-6">
          {/* Category + Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default">{lead.category}</Badge>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>

          {/* Address */}
          {lead.address && (
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: mute }} />
              <span className="text-sm" style={{ color: ink }}>
                {lead.address}
              </span>
            </div>
          )}

          {/* Phone */}
          {lead.phone && (
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0" style={{ color: mute }} />
              <a
                href={`tel:${lead.phone}`}
                className="text-sm font-medium transition-colors hover:underline"
                style={{ color: violet }}
              >
                {lead.phone}
              </a>
            </div>
          )}

          {/* Email */}
          {lead.email && (
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0" style={{ color: mute }} />
              <a
                href={`mailto:${lead.email}`}
                className="text-sm font-medium transition-colors hover:underline"
                style={{ color: violet }}
              >
                {lead.email}
              </a>
            </div>
          )}

          {/* Hours */}
          {parsedHours && Object.keys(parsedHours).length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock size={16} style={{ color: mute }} />
                <span className="text-sm font-semibold" style={{ color: ink }}>
                  Hours
                </span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(parsedHours).map(([day, schedule]) => (
                    <tr key={day}>
                      <td
                        className="py-1 pr-3 font-medium whitespace-nowrap"
                        style={{ color: ink }}
                      >
                        {formatDayName(day)}
                      </td>
                      <td className="py-1" style={{ color: mute }}>
                        {schedule
                          ? `${schedule.open} - ${schedule.close}`
                          : "Closed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Rating */}
          {lead.rating != null && lead.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {renderStars(lead.rating)}
              </div>
              <span className="text-sm font-medium" style={{ color: ink }}>
                {lead.rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Divider */}
          <hr style={{ borderColor: line }} />

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link href={`/dashboard/sites/new?leadId=${lead.id}`} className="w-full">
              <Button variant="primary" className="w-full">
                <Globe size={16} />
                Generate site
              </Button>
            </Link>

            {(lead.status === "NEW" || !lead.status) && (
              <Button variant="secondary" className="w-full">
                <Phone size={16} />
                Mark as contacted
              </Button>
            )}

            {(lead.status === "NEW" || lead.status === "CONTACTED" || !lead.status) && (
              <Button variant="secondary" className="w-full">
                Mark as won
              </Button>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}

export default LeadDrawer;
