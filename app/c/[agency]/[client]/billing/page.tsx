"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  stripeInvoiceId: string | null;
  paidAt: string | null;
  createdAt: string;
}

interface ClientData {
  id: string;
  businessName: string;
  mrr: number;
  status: string;
  invoices: Invoice[];
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-20 bg-[#ECE6DE] rounded-2xl" />
      <div className="h-64 bg-[#ECE6DE] rounded-2xl" />
    </div>
  );
}

export default function ClientBillingPage() {
  const params = useParams();
  const agencySlug = params.agency as string;
  const clientSlug = params.client as string;

  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadClient() {
      try {
        const res = await fetch(
          `/api/clients?agency=${encodeURIComponent(agencySlug)}&client=${encodeURIComponent(clientSlug)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const match = data.find(
              (c: ClientData) =>
                c.businessName
                  .toLowerCase()
                  .replace(/\s+/g, "-") === clientSlug ||
                c.id === clientSlug
            );
            if (match) {
              setClient(match);
            } else {
              setError(true);
            }
          } else if (data && data.id) {
            setClient(data);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadClient();
  }, [agencySlug, clientSlug]);

  function statusBadge(status: string) {
    const styles: Record<string, { bg: string; text: string }> = {
      PAID: { bg: "rgba(45, 182, 125, 0.1)", text: "#2DB67D" },
      OPEN: { bg: "rgba(245, 181, 68, 0.1)", text: "#E0A234" },
      PENDING: { bg: "rgba(245, 181, 68, 0.1)", text: "#E0A234" },
      VOID: { bg: "rgba(107, 100, 128, 0.1)", text: "#6B6480" },
      UNCOLLECTED: { bg: "rgba(224, 64, 64, 0.1)", text: "#E04040" },
    };
    const style = styles[status.toUpperCase()] || styles.OPEN;
    return (
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        {status}
      </span>
    );
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatCurrency(amount: number, currency: string = "usd") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-[#ECE6DE] rounded animate-pulse" />
        <TableSkeleton />
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-[#1B1530] font-[family-name:var(--font-heading)] mb-2">
          Client not found
        </h2>
        <p className="text-[#6B6480] text-sm">
          We couldn&apos;t find client data for this portal.
        </p>
      </div>
    );
  }

  const invoices = client.invoices || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1530] font-[family-name:var(--font-heading)] tracking-tight">
          Billing
        </h1>
        <p className="mt-1 text-[#6B6480] text-sm">
          View your current plan and invoice history.
        </p>
      </div>

      {/* Current plan card */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 shadow-[var(--vb-shadow-warm)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6B6480] font-medium mb-1">
              Current Plan
            </p>
            <p className="text-lg font-semibold text-[#1B1530] font-[family-name:var(--font-heading)]">
              {client.businessName} - Standard Plan
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-[#6B6480] font-medium mb-1">
              Monthly Rate
            </p>
            <p className="text-2xl font-bold text-[#6B4FE0] font-[family-name:var(--font-heading)]">
              ${client.mrr.toFixed(2)}
              <span className="text-sm font-normal text-[#6B6480]">
                /mo
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#ECE6DE] flex items-center gap-4 text-sm text-[#6B6480]">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor:
                client.status === "ACTIVE"
                  ? "rgba(45, 182, 125, 0.1)"
                  : "rgba(245, 181, 68, 0.1)",
              color:
                client.status === "ACTIVE" ? "#2DB67D" : "#E0A234",
            }}
          >
            {client.status}
          </span>
          <span>
            {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} on
            record
          </span>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B6480] uppercase tracking-wide mb-3">
          Invoice History
        </h2>

        {invoices.length === 0 ? (
          <div className="rounded-2xl border border-[#ECE6DE] bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#6B6480]/[0.06]">
              <svg
                className="h-8 w-8 text-[#6B6480]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1B1530] font-[family-name:var(--font-heading)] mb-1">
              No invoices yet
            </h3>
            <p className="text-sm text-[#6B6480]">
              Invoices will appear here once billing begins.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden shadow-[var(--vb-shadow-warm)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ECE6DE] bg-[#FBF7F2]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B6480]">
                    Date
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B6480]">
                    Description
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#6B6480]">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[#6B6480]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE6DE]">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-[#FBF7F2]/50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm text-[#1B1530] whitespace-nowrap">
                      {formatDate(invoice.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#6B6480]">
                      {invoice.stripeInvoiceId
                        ? `Invoice ${invoice.stripeInvoiceId.slice(-8).toUpperCase()}`
                        : `Invoice #${invoice.id.slice(-6).toUpperCase()}`}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-[#1B1530] text-right whitespace-nowrap">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {statusBadge(invoice.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
