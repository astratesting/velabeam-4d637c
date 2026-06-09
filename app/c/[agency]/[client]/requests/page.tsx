"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Send } from "lucide-react";

interface ChangeRequest {
  id: string;
  body: string;
  status: string;
  createdAt: string;
  resolvedAt: string | null;
}

interface ClientData {
  id: string;
  agencyId: string;
  businessName: string;
  changeRequests: ChangeRequest[];
}

export default function ClientRequestsPage() {
  const params = useParams();
  const agencySlug = params.agency as string;
  const clientSlug = params.client as string;

  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requestBody, setRequestBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const loadClient = useCallback(async () => {
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
  }, [agencySlug, clientSlug]);

  useEffect(() => {
    loadClient();
  }, [loadClient]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!client || !requestBody.trim()) return;

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/change-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: client.id,
          agencyId: client.agencyId,
          body: requestBody.trim(),
        }),
      });

      if (res.ok) {
        setRequestBody("");
        setSubmitSuccess(true);
        // Reload to show the new request in history
        await loadClient();
        // Clear success message after a moment
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        const data = await res.json().catch(() => null);
        setSubmitError(
          data?.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function statusBadge(status: string) {
    const styles: Record<string, { bg: string; text: string }> = {
      OPEN: { bg: "rgba(245, 181, 68, 0.15)", text: "#E0A234" },
      DONE: { bg: "rgba(107, 79, 224, 0.1)", text: "#6B4FE0" },
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 bg-[#ECE6DE] rounded animate-pulse" />
        <div className="h-48 bg-[#ECE6DE] rounded-2xl animate-pulse" />
        <div className="h-64 bg-[#ECE6DE] rounded-2xl animate-pulse" />
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

  const requests = client.changeRequests || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1B1530] font-[family-name:var(--font-heading)] tracking-tight">
          Request a Change
        </h1>
        <p className="mt-1 text-[#6B6480] text-sm">
          Describe what you&apos;d like updated on your site and your agency
          will take care of it.
        </p>
      </div>

      {/* New request form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#ECE6DE] bg-white p-6 shadow-[var(--vb-shadow-warm)]"
      >
        <label
          htmlFor="request-body"
          className="block text-sm font-semibold text-[#1B1530] mb-2"
        >
          What would you like changed?
        </label>
        <textarea
          id="request-body"
          rows={5}
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          placeholder="e.g. Please update the business hours on my site to show we're open on Saturdays from 10am-4pm..."
          className="w-full rounded-xl border border-[#ECE6DE] bg-[#FBF7F2] px-4 py-3 text-sm text-[#1B1530] placeholder:text-[#6B6480]/50 focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/30 focus:border-[#6B4FE0] transition-shadow resize-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <div>
            {submitError && (
              <p className="text-sm text-[#E04040]">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-sm text-[#2DB67D] font-medium">
                Request submitted successfully!
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={submitting || !requestBody.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, #6B4FE0 0%, #FF6B5B 100%)",
              boxShadow: submitting
                ? "none"
                : "0 2px 8px rgba(107, 79, 224, 0.25)",
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(107, 79, 224, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(107, 79, 224, 0.25)";
            }}
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>

      {/* Request history */}
      <div>
        <h2 className="text-sm font-semibold text-[#6B6480] uppercase tracking-wide mb-3">
          Request History
        </h2>

        {requests.length === 0 ? (
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
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1B1530] font-[family-name:var(--font-heading)] mb-1">
              No change requests yet
            </h3>
            <p className="text-sm text-[#6B6480]">
              Use the form above to submit your first request.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border border-[#ECE6DE] bg-white p-5 transition-colors hover:border-[#6B4FE0]/20"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    {statusBadge(request.status)}
                    <span className="text-xs text-[#6B6480]">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>
                  {request.resolvedAt && (
                    <span className="text-xs text-[#6B6480]">
                      Resolved {formatDate(request.resolvedAt)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#1B1530] leading-relaxed whitespace-pre-wrap">
                  {request.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
