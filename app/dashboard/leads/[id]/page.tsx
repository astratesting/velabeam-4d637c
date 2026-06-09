"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Globe,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

interface LeadDetail {
  id: string;
  businessName: string;
  category: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: Record<string, string> | null;
  rating: number | null;
  reviewCount: number | null;
  status: "New" | "Contacted" | "Won" | "Lost";
  source: string | null;
  website: string | null;
  hasWebsite: boolean;
}

function DetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-[#ECE6DE] rounded" />
      <div className="h-4 w-40 bg-[#ECE6DE] rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-16 bg-[#ECE6DE] rounded" />
            <div className="h-5 w-48 bg-[#ECE6DE] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchLead() {
      try {
        const res = await fetch(`/api/leads/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setLead(data);
        }
      } catch {
        // Lead will remain null
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [params.id]);

  async function updateStatus(status: string) {
    if (!lead) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLead((prev) => (prev ? { ...prev, status: status as LeadDetail["status"] } : prev));
      }
    } catch {
      // Status update failed
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-6 h-10 w-20 bg-[#ECE6DE] rounded-xl animate-pulse" />
        <DetailSkeleton />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-xl font-bold text-[#1B1530] mb-2">
            Lead not found
          </h2>
          <p className="text-[#6B6480] mb-4">
            The lead you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/leads")}
            className="text-sm font-semibold text-[#6B4FE0] hover:underline"
          >
            Back to leads
          </button>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    New: "bg-[#6B4FE0]/10 text-[#6B4FE0]",
    Contacted: "bg-[#F5B544]/10 text-[#F5B544]",
    Won: "bg-emerald-500/10 text-emerald-600",
    Lost: "bg-[#6B6480]/10 text-[#6B6480]",
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard/leads")}
        className="inline-flex items-center gap-2 text-sm text-[#6B6480] hover:text-[#1B1530] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to leads
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1530]">
            {lead.businessName}
          </h1>
          <p className="text-[#6B6480] mt-1">{lead.category}</p>
        </div>
        <span
          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium self-start ${statusColors[lead.status]}`}
        >
          {lead.status}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lead.address && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#6B4FE0] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Address
              </p>
              <p className="text-sm text-[#1B1530] mt-1">{lead.address}</p>
            </div>
          </div>
        )}

        {lead.phone && (
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#6B4FE0] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Phone
              </p>
              <p className="text-sm text-[#1B1530] mt-1">{lead.phone}</p>
            </div>
          </div>
        )}

        {lead.email && (
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#6B4FE0] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Email
              </p>
              <p className="text-sm text-[#1B1530] mt-1">{lead.email}</p>
            </div>
          </div>
        )}

        {lead.rating !== null && (
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#F5B544] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Rating
              </p>
              <p className="text-sm text-[#1B1530] mt-1 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(lead.rating!)
                        ? "text-[#F5B544] fill-[#F5B544]"
                        : "text-[#ECE6DE]"
                    }`}
                  />
                ))}
                <span className="ml-1 text-[#6B6480]">
                  ({lead.reviewCount ?? 0} reviews)
                </span>
              </p>
            </div>
          </div>
        )}

        {lead.source && (
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-[#6B4FE0] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Source
              </p>
              <p className="text-sm text-[#1B1530] mt-1">{lead.source}</p>
            </div>
          </div>
        )}

        {lead.hasWebsite && lead.website && (
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-[#6B4FE0] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#6B6480] uppercase tracking-wider">
                Website
              </p>
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6B4FE0] hover:underline mt-1 block"
              >
                {lead.website}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hours */}
      {lead.hours && Object.keys(lead.hours).length > 0 && (
        <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1B1530] mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#6B4FE0]" />
            Business Hours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="flex items-center justify-between py-2 px-3 rounded-lg even:bg-[#FBF7F2]"
              >
                <span className="text-sm font-medium text-[#1B1530]">
                  {day}
                </span>
                <span className="text-sm text-[#6B6480]">
                  {lead.hours![day] || "Closed"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#1B1530]">Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              router.push(`/dashboard/sites/new?leadId=${lead.id}`)
            }
            className="px-6 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] hover:opacity-90 transition-opacity text-sm"
          >
            Generate site
          </button>

          {lead.status !== "Contacted" && (
            <button
              onClick={() => updateStatus("Contacted")}
              disabled={updating}
              className="px-6 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium hover:border-[#F5B544]/30 transition-colors text-sm disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4 inline mr-1.5" />
              Mark as contacted
            </button>
          )}

          {lead.status !== "Won" && (
            <button
              onClick={() => updateStatus("Won")}
              disabled={updating}
              className="px-6 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium hover:border-emerald-300 transition-colors text-sm disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4 inline mr-1.5" />
              Mark as won
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
