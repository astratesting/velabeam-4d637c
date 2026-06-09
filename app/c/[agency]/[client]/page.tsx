"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Globe, CreditCard, PencilLine } from "lucide-react";

interface ClientData {
  id: string;
  businessName: string;
  contactName: string | null;
  contactEmail: string | null;
  mrr: number;
  status: string;
  siteId: string | null;
  site: {
    id: string;
    slug: string;
    status: string;
    templateKey: string;
  } | null;
  invoices: Array<{
    id: string;
    amount: number;
    status: string;
  }>;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 animate-pulse">
      <div className="h-5 w-40 bg-[#ECE6DE] rounded mb-4" />
      <div className="h-4 w-56 bg-[#ECE6DE] rounded mb-2" />
      <div className="h-4 w-32 bg-[#ECE6DE] rounded" />
    </div>
  );
}

export default function ClientPortalHome() {
  const params = useParams();
  const router = useRouter();
  const agencySlug = params.agency as string;
  const clientSlug = params.client as string;

  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const basePath = `/c/${agencySlug}/${clientSlug}`;

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
    const styles: Record<string, { bg: string; text: string; dot: string }> = {
      ACTIVE: { bg: "rgba(45, 182, 125, 0.1)", text: "#2DB67D", dot: "#2DB67D" },
      PUBLISHED: { bg: "rgba(45, 182, 125, 0.1)", text: "#2DB67D", dot: "#2DB67D" },
      DRAFT: { bg: "rgba(107, 100, 128, 0.1)", text: "#6B6480", dot: "#6B6480" },
      PAUSED: { bg: "rgba(245, 181, 68, 0.1)", text: "#E0A234", dot: "#F5B544" },
    };
    const style = styles[status.toUpperCase()] || styles.DRAFT;
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: style.dot }}
        />
        {status}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-72 bg-[#ECE6DE] rounded animate-pulse" />
        <SkeletonCard />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
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
          We couldn&apos;t find a client matching &ldquo;{clientSlug}&rdquo; for
          this agency.
        </p>
      </div>
    );
  }

  const displayName =
    client.businessName ||
    clientSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const siteStatus = client.site?.status || client.status;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1530] font-[family-name:var(--font-heading)] tracking-tight">
          Welcome to your client portal
        </h1>
        <p className="mt-1 text-[#6B6480] text-sm">
          Manage your site, billing, and requests all in one place.
        </p>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 shadow-[var(--vb-shadow-warm)]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#1B1530] font-[family-name:var(--font-heading)]">
              {displayName}
            </h2>
            {client.contactName && (
              <p className="mt-1 text-sm text-[#6B6480]">
                Contact: {client.contactName}
              </p>
            )}
          </div>
          {statusBadge(siteStatus)}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6B6480] font-medium mb-1">
              Monthly Recurring Revenue
            </p>
            <p className="text-2xl font-bold text-[#1B1530] font-[family-name:var(--font-heading)]">
              ${client.mrr.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6B6480] font-medium mb-1">
              Invoices
            </p>
            <p className="text-2xl font-bold text-[#1B1530] font-[family-name:var(--font-heading)]">
              {client.invoices?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="text-sm font-semibold text-[#6B6480] uppercase tracking-wide mb-3">
          Quick Links
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <LinkCard
            icon={<Globe className="h-5 w-5" />}
            title="View your site"
            description="Preview your live website"
            onClick={() => router.push(`${basePath}/site`)}
          />
          <LinkCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Billing"
            description="View invoices and payment history"
            onClick={() => router.push(`${basePath}/billing`)}
          />
          <LinkCard
            icon={<PencilLine className="h-5 w-5" />}
            title="Request a change"
            description="Submit an update or change request"
            onClick={() => router.push(`${basePath}/requests`)}
          />
        </div>
      </div>
    </div>
  );
}

function LinkCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border border-[#ECE6DE] bg-white p-5 transition-all hover:border-[#6B4FE0] hover:shadow-[var(--vb-shadow-card)] cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6B4FE0]/[0.08] text-[#6B4FE0] transition-colors group-hover:bg-[#6B4FE0] group-hover:text-white">
          {icon}
        </div>
        <span className="text-sm font-semibold text-[#1B1530] font-[family-name:var(--font-heading)]">
          {title}
        </span>
      </div>
      <p className="text-xs text-[#6B6480] leading-relaxed">{description}</p>
    </button>
  );
}
