"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Globe,
  CheckCircle,
  AlertCircle,
  Copy,
} from "lucide-react";

export default function CustomDomainPage() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [domainStatus, setDomainStatus] = useState<
    "none" | "pending" | "verified" | "error"
  >("none");
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDomain() {
      try {
        const res = await fetch("/api/agency/domain");
        if (res.ok) {
          const data = await res.json();
          setDomain(data.domain || "");
          setDomainStatus(
            data.verified ? "verified" : data.domain ? "pending" : "none"
          );
        }
      } catch {
        // Use defaults
      }
    }
    fetchDomain();
  }, []);

  async function saveDomain() {
    try {
      await fetch("/api/agency/domain", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      setDomainStatus("pending");
    } catch {
      // Save failed
    }
  }

  async function verifyDomain() {
    setVerifying(true);
    try {
      const res = await fetch("/api/agency/domain/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (res.ok) {
        const data = await res.json();
        setDomainStatus(data.verified ? "verified" : "error");
      } else {
        setDomainStatus("error");
      }
    } catch {
      setDomainStatus("error");
    } finally {
      setVerifying(false);
    }
  }

  function copyCname() {
    navigator.clipboard.writeText("sites.velabeam.app");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => router.push("/dashboard/agency")}
        className="inline-flex items-center gap-2 text-sm text-[#6B6480] hover:text-[#1B1530] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to agency settings
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#6B4FE0]/10 flex items-center justify-center">
          <Globe className="w-5 h-5 text-[#6B4FE0]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1B1530]">Custom domain</h1>
          <p className="text-sm text-[#6B6480]">
            Use your own domain for published sites
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-6">
        {/* Domain Input */}
        <div>
          <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
            Your domain
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                if (domainStatus !== "none") setDomainStatus("none");
              }}
              className="flex-1 px-3 py-2.5 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
              placeholder="yourdomain.com"
            />
            <button
              onClick={saveDomain}
              disabled={!domain}
              className="px-5 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium text-sm disabled:opacity-50 hover:border-[#6B4FE0]/30 transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        {/* DNS Instructions */}
        <div className="bg-[#FBF7F2] rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-[#1B1530]">
            DNS Configuration
          </h3>
          <p className="text-sm text-[#6B6480]">
            To connect your domain, add a CNAME record in your DNS provider
            settings pointing to VelaBeam.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-[#ECE6DE]">
              <div>
                <p className="text-xs font-medium text-[#6B6480] mb-0.5">
                  Record type
                </p>
                <p className="text-sm font-semibold text-[#1B1530]">CNAME</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-[#ECE6DE]">
              <div>
                <p className="text-xs font-medium text-[#6B6480] mb-0.5">
                  Name / Host
                </p>
                <p className="text-sm font-semibold text-[#1B1530]">@</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-[#ECE6DE]">
              <div>
                <p className="text-xs font-medium text-[#6B6480] mb-0.5">
                  Value / Target
                </p>
                <p className="text-sm font-semibold text-[#1B1530] font-mono">
                  sites.velabeam.app
                </p>
              </div>
              <button
                onClick={copyCname}
                className="p-2 rounded-lg text-[#6B6480] hover:text-[#6B4FE0] hover:bg-[#6B4FE0]/10 transition-colors"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-[#6B6480]">
            DNS changes may take up to 48 hours to propagate. Most providers
            update within a few minutes.
          </p>
        </div>

        {/* Verify Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={verifyDomain}
            disabled={verifying || !domain}
            className="px-6 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50"
          >
            {verifying ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify domain"
            )}
          </button>

          {domainStatus === "verified" && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Domain verified successfully
            </span>
          )}
          {domainStatus === "error" && (
            <span className="text-sm text-[#FF6B5B] flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Could not verify. Check your DNS settings and try again.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
