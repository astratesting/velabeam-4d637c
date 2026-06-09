"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  Plus,
  Clock,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";

interface Site {
  id: string;
  businessName: string;
  template: string;
  status: "Draft" | "Live" | "Paused";
  lastEdited: string;
  slug: string;
}

function SiteCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 animate-pulse">
      <div className="h-5 w-32 bg-[#ECE6DE] rounded mb-3" />
      <div className="h-4 w-20 bg-[#ECE6DE] rounded mb-2" />
      <div className="h-3 w-24 bg-[#ECE6DE] rounded" />
    </div>
  );
}

export default function SitesPage() {
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSites() {
      try {
        const res = await fetch("/api/sites");
        if (res.ok) {
          const data = await res.json();
          setSites(data);
        }
      } catch {
        // Sites will remain empty
      } finally {
        setLoading(false);
      }
    }
    fetchSites();
  }, []);

  const statusColors: Record<string, string> = {
    Draft: "bg-[#6B4FE0]/10 text-[#6B4FE0]",
    Live: "bg-[#F5B544]/10 text-[#F5B544]",
    Paused: "bg-[#6B6480]/10 text-[#6B6480]",
  };

  if (!loading && sites.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-[#6B4FE0]/10 flex items-center justify-center mb-6">
            <Globe className="w-10 h-10 text-[#6B4FE0]" />
          </div>
          <h2 className="text-xl font-bold text-[#1B1530] mb-2">
            No sites yet
          </h2>
          <p className="text-[#6B6480] mb-6 max-w-md">
            Generate your first site from a lead. It only takes a few minutes.
          </p>
          <button
            onClick={() => router.push("/dashboard/leads")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] hover:opacity-90 transition-opacity"
          >
            Find leads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B1530]">Sites</h1>
        <button
          onClick={() => router.push("/dashboard/sites/new")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          New site
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SiteCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map((site) => (
            <div
              key={site.id}
              onClick={() => router.push(`/dashboard/sites/${site.id}`)}
              className="rounded-2xl border border-[#ECE6DE] bg-white p-6 hover:border-[#6B4FE0]/30 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#1B1530] truncate">
                  {site.businessName}
                </h3>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[site.status]}`}
                >
                  {site.status}
                </span>
              </div>
              <p className="text-sm text-[#6B6480] mb-2">{site.template}</p>
              <div className="flex items-center gap-2 text-xs text-[#6B6480]">
                <Clock className="w-3.5 h-3.5" />
                Last edited {new Date(site.lastEdited).toLocaleDateString()}
              </div>
              {site.status === "Live" && (
                <a
                  href={`https://${site.slug}.velabeam.app`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#6B4FE0] hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  {site.slug}.velabeam.app
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
