"use client";

import { Eye } from "lucide-react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";

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
export interface Client {
  id: string;
  businessName: string;
  contactName?: string | null;
  contactEmail?: string | null;
  siteStatus?: string;
  mrr?: number | null;
  renewalDate?: string | null;
  [key: string]: unknown;
}

export interface ClientTableProps {
  clients: Client[];
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ─── Component ─── */
export function ClientTable({ clients }: ClientTableProps) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Business name</Th>
          <Th>Contact</Th>
          <Th>Site status</Th>
          <Th>MRR</Th>
          <Th>Renewal date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clients.length === 0 ? (
          <Tr>
            <Td colSpan={6} className="text-center py-12">
              <span className="text-sm" style={{ color: mute }}>
                No clients yet
              </span>
            </Td>
          </Tr>
        ) : (
          clients.map((client) => {
            const siteStatus =
              siteStatusBadge[client.siteStatus ?? "draft"] ?? siteStatusBadge.draft;

            return (
              <Tr key={client.id}>
                <Td>
                  <span className="font-semibold" style={{ color: ink }}>
                    {client.businessName}
                  </span>
                </Td>
                <Td>
                  <div className="flex flex-col">
                    <span className="text-sm" style={{ color: ink }}>
                      {client.contactName ?? "--"}
                    </span>
                    {client.contactEmail && (
                      <span className="text-xs" style={{ color: mute }}>
                        {client.contactEmail}
                      </span>
                    )}
                  </div>
                </Td>
                <Td>
                  <Badge variant={siteStatus.variant}>{siteStatus.label}</Badge>
                </Td>
                <Td>
                  <span className="font-medium tabular-nums" style={{ color: ink }}>
                    {formatMRR(client.mrr)}
                  </span>
                </Td>
                <Td>
                  <span className="text-sm" style={{ color: mute }}>
                    {formatDate(client.renewalDate)}
                  </span>
                </Td>
                <Td>
                  <Link href={`/dashboard/clients/${client.id}`}>
                    <Button size="sm" variant="ghost">
                      <Eye size={14} />
                      View
                    </Button>
                  </Link>
                </Td>
              </Tr>
            );
          })
        )}
      </Tbody>
    </Table>
  );
}

export default ClientTable;
