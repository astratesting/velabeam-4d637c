"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Palette,
  Globe,
  Users,
  ChevronRight,
  Upload,
  X,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface BrandKit {
  logoUrl: string | null;
  accentColor: string;
  fromName: string;
  fontPair: string;
}

interface TeamMember {
  id: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  status: "Active" | "Pending";
}

export default function AgencyPage() {
  const router = useRouter();

  // Brand Kit State
  const [brandKit, setBrandKit] = useState<BrandKit>({
    logoUrl: null,
    accentColor: "#6B4FE0",
    fromName: "",
    fontPair: "manrope-source",
  });
  const [brandSaving, setBrandSaving] = useState(false);
  const [brandSaved, setBrandSaved] = useState(false);

  // Domain State
  const [domain, setDomain] = useState("");
  const [domainStatus, setDomainStatus] = useState<
    "none" | "pending" | "verified" | "error"
  >("none");
  const [verifying, setVerifying] = useState(false);

  // Team State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Member">("Member");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [brandRes, domainRes, teamRes] = await Promise.all([
          fetch("/api/agency/brand"),
          fetch("/api/agency/domain"),
          fetch("/api/agency/team"),
        ]);
        if (brandRes.ok) {
          const data = await brandRes.json();
          setBrandKit(data);
        }
        if (domainRes.ok) {
          const data = await domainRes.json();
          setDomain(data.domain || "");
          setDomainStatus(data.verified ? "verified" : data.domain ? "pending" : "none");
        }
        if (teamRes.ok) {
          const data = await teamRes.json();
          setTeamMembers(data);
        }
      } catch {
        // Use defaults
      }
    }
    fetchData();
  }, []);

  async function saveBrandKit() {
    setBrandSaving(true);
    setBrandSaved(false);
    try {
      const res = await fetch("/api/agency/brand", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandKit),
      });
      if (res.ok) setBrandSaved(true);
    } catch {
      // Save failed
    } finally {
      setBrandSaving(false);
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

  async function inviteTeamMember() {
    if (!inviteEmail) return;
    setInviting(true);
    try {
      const res = await fetch("/api/agency/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      if (res.ok) {
        const data = await res.json();
        setTeamMembers((prev) => [...prev, data]);
        setInviteEmail("");
      }
    } catch {
      // Invite failed
    } finally {
      setInviting(false);
    }
  }

  async function removeTeamMember(id: string) {
    try {
      await fetch(`/api/agency/team/${id}`, { method: "DELETE" });
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    } catch {
      // Remove failed
    }
  }

  const PRESET_COLORS = ["#6B4FE0", "#FF6B5B", "#F5B544", "#10B981", "#3B82F6"];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-[#1B1530]">Agency settings</h1>

      {/* Brand Kit Card */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6B4FE0]/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-[#6B4FE0]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1B1530]">
                Brand kit
              </h2>
              <p className="text-xs text-[#6B6480]">
                Customize your agency branding
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard/agency/brand")}
            className="text-sm text-[#6B4FE0] font-medium hover:underline flex items-center gap-1"
          >
            Full page <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
              Logo
            </label>
            <div className="border-2 border-dashed border-[#ECE6DE] rounded-xl p-4 text-center hover:border-[#6B4FE0]/30 transition-colors">
              {brandKit.logoUrl ? (
                <div className="relative inline-block">
                  <img
                    src={brandKit.logoUrl}
                    alt="Logo"
                    className="max-h-12 mx-auto"
                  />
                  <button
                    onClick={() =>
                      setBrandKit((prev) => ({ ...prev, logoUrl: null }))
                    }
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF6B5B] text-white flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload className="w-5 h-5 text-[#6B6480] mx-auto mb-1" />
                  <span className="text-xs text-[#6B6480]">Upload logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setBrandKit((prev) => ({ ...prev, logoUrl: url }));
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                Accent color
              </label>
              <div className="flex items-center gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() =>
                      setBrandKit((prev) => ({ ...prev, accentColor: color }))
                    }
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      brandKit.accentColor === color
                        ? "border-[#1B1530] scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={brandKit.accentColor}
                  onChange={(e) =>
                    setBrandKit((prev) => ({
                      ...prev,
                      accentColor: e.target.value,
                    }))
                  }
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                From name
              </label>
              <input
                type="text"
                value={brandKit.fromName}
                onChange={(e) =>
                  setBrandKit((prev) => ({ ...prev, fromName: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                placeholder="Your Agency Name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                Font pair
              </label>
              <select
                value={brandKit.fontPair}
                onChange={(e) =>
                  setBrandKit((prev) => ({ ...prev, fontPair: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] appearance-none"
              >
                <option value="manrope-source">Manrope + Source Sans 3</option>
                <option value="inter">Inter</option>
                <option value="playfair">Playfair + Lato</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={saveBrandKit}
            disabled={brandSaving}
            className="px-5 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50"
          >
            {brandSaving ? "Saving..." : "Save brand kit"}
          </button>
          {brandSaved && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
      </div>

      {/* Custom Domain Card */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6B4FE0]/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#6B4FE0]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1B1530]">
                Custom domain
              </h2>
              <p className="text-xs text-[#6B6480]">
                Use your own domain for published sites
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard/agency/domain")}
            className="text-sm text-[#6B4FE0] font-medium hover:underline flex items-center gap-1"
          >
            Full page <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
            Domain
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                setDomainStatus("none");
              }}
              className="flex-1 px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
              placeholder="yourdomain.com"
            />
            <button
              onClick={verifyDomain}
              disabled={verifying || !domain}
              className="px-5 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50"
            >
              {verifying ? "Verifying..." : "Verify"}
            </button>
          </div>
          {domainStatus === "verified" && (
            <p className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Domain verified successfully
            </p>
          )}
          {domainStatus === "error" && (
            <p className="mt-2 text-sm text-[#FF6B5B] flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Could not verify domain. Make sure the CNAME record is set correctly.
            </p>
          )}
        </div>

        {domain && domainStatus !== "verified" && (
          <div className="bg-[#FBF7F2] rounded-xl p-4">
            <p className="text-xs font-semibold text-[#1B1530] mb-2">
              CNAME Record
            </p>
            <p className="text-xs text-[#6B6480] mb-1">
              Add this CNAME record to your DNS settings:
            </p>
            <code className="text-xs bg-white px-3 py-1.5 rounded-lg border border-[#ECE6DE] inline-block mt-1">
              CNAME &rarr; sites.velabeam.app
            </code>
          </div>
        )}
      </div>

      {/* Team Members Card */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6B4FE0]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#6B4FE0]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1B1530]">
                Team members
              </h2>
              <p className="text-xs text-[#6B6480]">
                Manage who has access to your agency
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard/agency/team")}
            className="text-sm text-[#6B4FE0] font-medium hover:underline flex items-center gap-1"
          >
            Full page <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
            placeholder="colleague@email.com"
          />
          <select
            value={inviteRole}
            onChange={(e) =>
              setInviteRole(e.target.value as "Admin" | "Member")
            }
            className="px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] appearance-none"
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            onClick={inviteTeamMember}
            disabled={inviting || !inviteEmail}
            className="px-5 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Invite
          </button>
        </div>

        {teamMembers.length > 0 ? (
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FBF7F2]"
              >
                <div>
                  <p className="text-sm font-medium text-[#1B1530]">
                    {member.email}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#6B6480]">
                      {member.role}
                    </span>
                    <span
                      className={`inline-flex px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-[#F5B544]/10 text-[#F5B544]"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
                {member.role !== "Owner" && (
                  <button
                    onClick={() => removeTeamMember(member.id)}
                    className="p-2 rounded-lg text-[#6B6480] hover:text-[#FF6B5B] hover:bg-[#FF6B5B]/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#6B6480] text-center py-4">
            No team members yet. Invite someone to get started.
          </p>
        )}
      </div>
    </div>
  );
}
