"use client";

import { useState } from "react";
import { Globe, Copy, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const line = "#ECE6DE";

/* ─── Types ─── */
export type DomainVerificationStatus = "pending" | "verified" | "failed";

const statusBadgeMap: Record<
  DomainVerificationStatus,
  { variant: "default" | "success" | "warning" | "muted"; label: string }
> = {
  pending: { variant: "success", label: "Pending" },
  verified: { variant: "success", label: "Verified" },
  failed: { variant: "warning", label: "Failed" },
};

export interface DomainFormProps {
  onSave: (domain: string) => void;
}

/* ─── Component ─── */
export function DomainForm({ onSave }: DomainFormProps) {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<DomainVerificationStatus>("pending");
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const cnameRecord = "cname.velabeam.app";

  function handleCopy() {
    navigator.clipboard.writeText(cnameRecord).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleVerify() {
    if (!domain.trim()) return;
    setVerifying(true);
    // Simulate verification - in production this would call an API
    setTimeout(() => {
      setVerifying(false);
      // Random result for demo; real impl checks DNS
      setStatus("pending");
    }, 1500);
  }

  function handleSave() {
    if (!domain.trim()) return;
    onSave(domain.trim());
  }

  const statusBadge = statusBadgeMap[status];

  return (
    <div className="flex flex-col gap-6">
      {/* Domain Input */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Custom domain"
            placeholder="sites.youragency.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            helperText="Enter the domain where client sites will be served"
          />
        </div>
        <div className="flex items-center gap-2 pb-0.5">
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>
      </div>

      {/* CNAME Instructions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Globe size={16} style={{ color: violet }} />
          <span className="text-sm font-semibold" style={{ color: ink }}>
            DNS Configuration
          </span>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-xl border" style={{ borderColor: line, backgroundColor: "#FBF7F2" }}>
          <p className="text-sm" style={{ color: ink }}>
            Add a CNAME record pointing to:
          </p>
          <div className="flex items-center gap-2">
            <code
              className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
              style={{ backgroundColor: "white", color: violet, border: `1px solid ${line}` }}
            >
              {cnameRecord}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-center w-9 h-9 rounded-lg border cursor-pointer transition-colors hover:bg-black/5"
              style={{ borderColor: line }}
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={14} style={{ color: "#22C55E" }} />
              ) : (
                <Copy size={14} style={{ color: mute }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Verify + Save */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={handleVerify}
          loading={verifying}
          disabled={!domain.trim()}
        >
          Verify DNS
        </Button>
        <Button
          onClick={handleSave}
          disabled={!domain.trim() || status !== "verified"}
        >
          Save domain
        </Button>
      </div>

      {/* Propagation note */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl" style={{ backgroundColor: `${honey}15` }}>
        <Info size={16} className="mt-0.5 shrink-0" style={{ color: honey }} />
        <p className="text-xs leading-relaxed" style={{ color: ink }}>
          DNS changes may take up to 48 hours to propagate. If verification fails
          immediately, please wait and try again later.
        </p>
      </div>
    </div>
  );
}

export default DomainForm;
