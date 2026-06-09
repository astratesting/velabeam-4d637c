"use client";

import { Globe, FileText, MessageSquare, FolderOpen, CreditCard } from "lucide-react";
import { Tabs, type Tab } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";
const line = "#ECE6DE";

/* ─── Status badge map ─── */
const siteStatusBadge: Record<
  string,
  { variant: "default" | "success" | "warning" | "muted"; label: string }
> = {
  draft: { variant: "muted", label: "Draft" },
  building: { variant: "success", label: "Building" },
  live: { variant: "default", label: "Live" },
  paused: { variant: "warning", label: "Paused" },
};

/* ─── Types ─── */
export interface ClientSite {
  id: string;
  name: string;
  url?: string | null;
  status?: string;
}

export interface ClientData {
  id: string;
  businessName: string;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  mrr?: number | null;
  renewalDate?: string | null;
  siteStatus?: string;
  sites?: ClientSite[];
  [key: string]: unknown;
}

export interface ClientTabsProps {
  client: ClientData;
}

/* ─── Helpers ─── */
function formatMRR(cents: number | null | undefined): string {
  if (cents == null) return "--";
  const dollars = cents / 100;
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "--";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ─── Empty State ─── */
function EmptyState({ icon: Icon, message }: { icon: typeof FileText; message: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 rounded-xl border"
      style={{ borderColor: line, backgroundColor: "#FBF7F2" }}
    >
      <Icon size={28} style={{ color: mute }} />
      <p className="mt-3 text-sm" style={{ color: mute }}>
        {message}
      </p>
    </div>
  );
}

/* ─── Tab Contents ─── */
function OverviewTab({ client }: { client: ClientData }) {
  const siteStatus =
    siteStatusBadge[client.siteStatus ?? "draft"] ?? siteStatusBadge.draft;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* MRR */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: mute }}>
          Monthly Recurring Revenue
        </span>
        <span className="text-2xl font-bold tabular-nums" style={{ color: ink }}>
          {formatMRR(client.mrr)}
        </span>
      </div>

      {/* Renewal Date */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: mute }}>
          Renewal Date
        </span>
        <span className="text-lg font-medium" style={{ color: ink }}>
          {formatDate(client.renewalDate)}
        </span>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: mute }}>
          Contact
        </span>
        <span className="text-sm font-medium" style={{ color: ink }}>
          {client.contactName ?? "--"}
        </span>
        {client.contactEmail && (
          <a
            href={`mailto:${client.contactEmail}`}
            className="text-sm transition-colors hover:underline"
            style={{ color: violet }}
          >
            {client.contactEmail}
          </a>
        )}
        {client.contactPhone && (
          <a
            href={`tel:${client.contactPhone}`}
            className="text-sm transition-colors hover:underline"
            style={{ color: violet }}
          >
            {client.contactPhone}
          </a>
        )}
      </div>

      {/* Site Status */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: mute }}>
          Site Status
        </span>
        <Badge variant={siteStatus.variant}>{siteStatus.label}</Badge>
      </div>
    </div>
  );
}

function SitesTab({ client }: { client: ClientData }) {
  const sites = client.sites ?? [];

  if (sites.length === 0) {
    return <EmptyState icon={Globe} message="No sites yet" />;
  }

  return (
    <div className="flex flex-col gap-3">
      {sites.map((site) => {
        const status =
          siteStatusBadge[site.status ?? "draft"] ?? siteStatusBadge.draft;

        return (
          <div
            key={site.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl border"
            style={{ borderColor: line, backgroundColor: "white" }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold" style={{ color: ink }}>
                {site.name}
              </span>
              {site.url && (
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors hover:underline"
                  style={{ color: violet }}
                >
                  {site.url}
                </a>
              )}
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        );
      })}
    </div>
  );
}

function InvoicesTab() {
  return <EmptyState icon={CreditCard} message="No invoices yet" />;
}

function MessagesTab() {
  return <EmptyState icon={MessageSquare} message="No messages yet" />;
}

function FilesTab() {
  return <EmptyState icon={FolderOpen} message="No files uploaded yet" />;
}

/* ─── Component ─── */
export function ClientTabs({ client }: ClientTabsProps) {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      content: <OverviewTab client={client} />,
    },
    {
      id: "sites",
      label: "Sites",
      content: <SitesTab client={client} />,
    },
    {
      id: "invoices",
      label: "Invoices",
      content: <InvoicesTab />,
    },
    {
      id: "messages",
      label: "Messages",
      content: <MessagesTab />,
    },
    {
      id: "files",
      label: "Files",
      content: <FilesTab />,
    },
  ];

  return <Tabs tabs={tabs} defaultTab="overview" />;
}

export default ClientTabs;
