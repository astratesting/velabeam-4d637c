"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Plus,
  Trash2,
  Shield,
  User,
} from "lucide-react";

interface TeamMember {
  id: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  status: "Active" | "Pending";
}

export default function TeamPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Member">("Member");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/agency/team");
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data);
        }
      } catch {
        // Team will remain empty
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

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

  async function updateRole(id: string, role: string) {
    try {
      const res = await fetch(`/api/agency/team/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        setTeamMembers((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, role: role as TeamMember["role"] } : m
          )
        );
      }
    } catch {
      // Update failed
    }
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
          <Users className="w-5 h-5 text-[#6B4FE0]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1B1530]">Team members</h1>
          <p className="text-sm text-[#6B6480]">
            Manage who has access to your agency dashboard
          </p>
        </div>
      </div>

      {/* Invite Form */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#1B1530]">
          Invite a team member
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-3 py-2.5 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
            placeholder="colleague@email.com"
          />
          <select
            value={inviteRole}
            onChange={(e) =>
              setInviteRole(e.target.value as "Admin" | "Member")
            }
            className="px-3 py-2.5 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] appearance-none"
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            onClick={inviteTeamMember}
            disabled={inviting || !inviteEmail}
            className="px-5 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {inviting ? "Sending..." : "Send invite"}
          </button>
        </div>
        <p className="text-xs text-[#6B6480]">
          Members can view leads, sites, and clients. Admins can also manage
          billing and agency settings.
        </p>
      </div>

      {/* Team List */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden">
        <div className="px-6 py-4 bg-[#FBF7F2] border-b border-[#ECE6DE]">
          <h2 className="text-sm font-semibold text-[#1B1530]">
            Team ({teamMembers.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-[#ECE6DE]" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-40 bg-[#ECE6DE] rounded" />
                  <div className="h-3 w-20 bg-[#ECE6DE] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="divide-y divide-[#ECE6DE]">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 px-6 py-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#6B4FE0]/10 flex items-center justify-center shrink-0">
                  {member.role === "Owner" || member.role === "Admin" ? (
                    <Shield className="w-5 h-5 text-[#6B4FE0]" />
                  ) : (
                    <User className="w-5 h-5 text-[#6B4FE0]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1B1530] truncate">
                    {member.email}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-[#F5B544]/10 text-[#F5B544]"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {member.role !== "Owner" && (
                    <>
                      <select
                        value={member.role}
                        onChange={(e) =>
                          updateRole(member.id, e.target.value)
                        }
                        className="px-2 py-1.5 rounded-lg border border-[#ECE6DE] text-xs text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] appearance-none"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                      </select>
                      <button
                        onClick={() => removeTeamMember(member.id)}
                        className="p-2 rounded-lg text-[#6B6480] hover:text-[#FF6B5B] hover:bg-[#FF6B5B]/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {member.role === "Owner" && (
                    <span className="text-xs text-[#6B6480] px-2 py-1">
                      Owner
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Users className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
            <p className="text-sm text-[#6B6480]">
              No team members yet. Invite someone to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
