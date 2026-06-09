"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

interface SiteData {
  id: string;
  slug: string;
  templateKey: string;
  data: string;
  brand: string;
  status: string;
  publishedAt: string | null;
  customDomain: string | null;
}

interface ClientData {
  id: string;
  businessName: string;
  siteId: string | null;
  site: SiteData | null;
}

function TemplateSkeleton() {
  return (
    <div className="animate-pulse space-y-8 py-20 px-6">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <div className="h-10 w-3/4 mx-auto bg-[#ECE6DE] rounded-lg" />
        <div className="h-5 w-1/2 mx-auto bg-[#ECE6DE] rounded" />
      </div>
      <div className="mx-auto max-w-4xl grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-[#ECE6DE] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const TEMPLATE_COMPONENTS: Record<string, any> = {
  generic: dynamic(() => import("@/components/templates/generic"), { loading: () => <TemplateSkeleton /> }),
  auto: dynamic(() => import("@/components/templates/auto"), { loading: () => <TemplateSkeleton /> }),
  dentist: dynamic(() => import("@/components/templates/dentist"), { loading: () => <TemplateSkeleton /> }),
  plumber: dynamic(() => import("@/components/templates/plumber"), { loading: () => <TemplateSkeleton /> }),
  restaurant: dynamic(() => import("@/components/templates/restaurant"), { loading: () => <TemplateSkeleton /> }),
  roofer: dynamic(() => import("@/components/templates/roofer"), { loading: () => <TemplateSkeleton /> }),
  salon: dynamic(() => import("@/components/templates/salon"), { loading: () => <TemplateSkeleton /> }),
};

export default function ClientSitePage() {
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

  if (loading) {
    return <TemplateSkeleton />;
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

  if (!client.site) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5B544]/10">
          <svg
            className="h-10 w-10 text-[#F5B544]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1B1530] font-[family-name:var(--font-heading)] mb-2">
          Your site is being set up
        </h2>
        <p className="text-[#6B6480] text-sm max-w-md mx-auto">
          Your website is currently being prepared. Check back soon or contact
          your agency for more details.
        </p>
      </div>
    );
  }

  let templateData: Record<string, unknown> = {};
  try {
    templateData = JSON.parse(client.site.data);
  } catch {
    templateData = {};
  }

  const templateKey = client.site.templateKey.toLowerCase().replace(/[^a-z0-9]/g, "");
  const TemplateComponent = TEMPLATE_COMPONENTS[templateKey];

  if (!TemplateComponent) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#6B4FE0]/10">
          <svg
            className="h-10 w-10 text-[#6B4FE0]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1B1530] font-[family-name:var(--font-heading)] mb-2">
          Template not found
        </h2>
        <p className="text-[#6B6480] text-sm max-w-md mx-auto">
          The template &ldquo;{client.site.templateKey}&rdquo; could not be
          loaded. Please contact your agency.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden shadow-[var(--vb-shadow-warm)]">
      {/* Site status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1B1530] text-white text-xs">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor:
                client.site.status === "PUBLISHED" ? "#2DB67D" : "#F5B544",
            }}
          />
          <span className="text-white/70">{client.site.status}</span>
        </div>
        <span className="text-white/40 font-mono">
          {client.site.customDomain || `${client.site.slug}.velabeam.com`}
        </span>
      </div>

      {/* Rendered template */}
      <div className="max-h-[75vh] overflow-y-auto">
        <TemplateComponent data={templateData} />
      </div>
    </div>
  );
}
