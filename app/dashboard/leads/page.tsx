"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  Radar,
} from "lucide-react";

interface Lead {
  id: string;
  businessName: string;
  category: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: "New" | "Contacted" | "Won" | "Lost";
  hasWebsite: boolean;
}

function LeadListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#ECE6DE] bg-white animate-pulse"
        >
          <div className="h-4 w-32 bg-[#ECE6DE] rounded" />
          <div className="h-4 w-20 bg-[#ECE6DE] rounded" />
          <div className="h-5 w-24 bg-[#ECE6DE] rounded-full" />
          <div className="ml-auto h-4 w-28 bg-[#ECE6DE] rounded" />
        </div>
      ))}
    </div>
  );
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const params = new URLSearchParams();
        if (categoryFilter) params.set("category", categoryFilter);
        if (statusFilter) params.set("status", statusFilter);
        if (hasEmail) params.set("hasEmail", "true");
        if (hasPhone) params.set("hasPhone", "true");

        const res = await fetch(`/api/leads?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch {
        // Leads will remain empty
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, [categoryFilter, statusFilter, hasEmail, hasPhone]);

  const filteredLeads = leads.filter((lead) =>
    searchQuery
      ? lead.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const categories = Array.from(new Set(leads.map((l) => l.category)));

  if (!loading && leads.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-[#6B4FE0]/10 flex items-center justify-center mb-6">
            <MapPin className="w-10 h-10 text-[#6B4FE0]" />
          </div>
          <h2 className="text-xl font-bold text-[#1B1530] mb-2">
            No leads yet
          </h2>
          <p className="text-[#6B6480] mb-6 max-w-md">
            Scan for leads to get started. Discover local businesses that need a
            website.
          </p>
          <button
            onClick={() => {
              fetch("/api/leads/scan", { method: "POST" }).then(() => {
                window.location.reload();
              });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] hover:opacity-90 transition-opacity"
          >
            <Radar className="w-4 h-4" />
            Scan now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#1B1530]">Leads</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6480]" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-[#ECE6DE] bg-white text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm text-[#6B6480]">
          <Filter className="w-4 h-4" />
          Filters
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-[#ECE6DE] bg-white text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6480] pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-[#ECE6DE] bg-white text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
          >
            <option value="">All statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6480] pointer-events-none" />
        </div>

        <label className="flex items-center gap-2 text-sm text-[#1B1530] cursor-pointer">
          <input
            type="checkbox"
            checked={hasEmail}
            onChange={(e) => setHasEmail(e.target.checked)}
            className="w-4 h-4 rounded border-[#ECE6DE] text-[#6B4FE0] focus:ring-[#6B4FE0]/20"
          />
          Has email
        </label>

        <label className="flex items-center gap-2 text-sm text-[#1B1530] cursor-pointer">
          <input
            type="checkbox"
            checked={hasPhone}
            onChange={(e) => setHasPhone(e.target.checked)}
            className="w-4 h-4 rounded border-[#ECE6DE] text-[#6B4FE0] focus:ring-[#6B4FE0]/20"
          />
          Has phone
        </label>
      </div>

      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Area - Left 60% */}
        <div className="lg:w-[60%]">
          <div className="rounded-2xl border border-[#ECE6DE] bg-[#F5F2EE] h-[400px] lg:h-[600px] flex flex-col items-center justify-center gap-3">
            <MapPin className="w-8 h-8 text-[#6B6480]" />
            <span className="text-sm text-[#6B6480]">Map view</span>
            <span className="text-xs text-[#6B6480]/70">
              {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}{" "}
              found
            </span>
          </div>
        </div>

        {/* List Area - Right 40% */}
        <div className="lg:w-[40%]">
          {loading ? (
            <LeadListSkeleton />
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="p-4 rounded-xl border border-[#ECE6DE] bg-white hover:border-[#6B4FE0]/30 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#1B1530] truncate">
                        {lead.businessName}
                      </h3>
                      <p className="text-xs text-[#6B6480] mt-0.5">
                        {lead.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!lead.hasWebsite && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[#FF6B5B]/10 text-[#FF6B5B]">
                          No website
                        </span>
                      )}
                      <StatusBadge status={lead.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#6B6480]">
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </span>
                    )}
                    {lead.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/sites/new?leadId=${lead.id}`);
                      }}
                      className="text-xs font-semibold text-[#6B4FE0] hover:text-[#5a3fcf] transition-colors flex items-center gap-1"
                    >
                      Generate site
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lead Drawer */}
      {selectedLead && (
        <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Lead["status"] }) {
  const colors: Record<Lead["status"], string> = {
    New: "bg-[#6B4FE0]/10 text-[#6B4FE0]",
    Contacted: "bg-[#F5B544]/10 text-[#F5B544]",
    Won: "bg-emerald-500/10 text-emerald-600",
    Lost: "bg-[#6B6480]/10 text-[#6B6480]",
  };
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function LeadDrawer({
  lead,
  onClose,
}: {
  lead: Lead;
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white border-l border-[#ECE6DE] h-full overflow-y-auto p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1B1530]">
              {lead.businessName}
            </h2>
            <p className="text-sm text-[#6B6480]">{lead.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6B6480] hover:text-[#1B1530] transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
              Status
            </label>
            <div className="mt-1">
              <StatusBadge status={lead.status} />
            </div>
          </div>

          {lead.address && (
            <div>
              <label className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Address
              </label>
              <p className="text-sm text-[#1B1530] mt-1">{lead.address}</p>
            </div>
          )}

          {lead.phone && (
            <div>
              <label className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Phone
              </label>
              <p className="text-sm text-[#1B1530] mt-1">{lead.phone}</p>
            </div>
          )}

          {lead.email && (
            <div>
              <label className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Email
              </label>
              <p className="text-sm text-[#1B1530] mt-1">{lead.email}</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#ECE6DE] space-y-3">
          <button
            onClick={() =>
              router.push(`/dashboard/sites/new?leadId=${lead.id}`)
            }
            className="w-full px-4 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] hover:opacity-90 transition-opacity text-sm"
          >
            Generate site
          </button>
          <button
            onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium hover:border-[#6B4FE0]/30 transition-colors text-sm"
          >
            View full details
          </button>
        </div>
      </div>
    </div>
  );
}
