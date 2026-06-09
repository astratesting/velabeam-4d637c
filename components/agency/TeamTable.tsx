"use client";

import { useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const line = "#ECE6DE";

/* ─── Role options ─── */
const roleOptions: SelectOption[] = [
  { value: "Owner", label: "Owner" },
  { value: "Editor", label: "Editor" },
  { value: "Viewer", label: "Viewer" },
];

/* ─── Types ─── */
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isCurrentUser?: boolean;
}

export interface TeamTableProps {
  members: TeamMember[];
  onInvite?: (email: string, role: string) => void;
  onRemove?: (memberId: string) => void;
}

/* ─── Component ─── */
export function TeamTable({ members, onInvite, onRemove }: TeamTableProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    onInvite?.(inviteEmail.trim(), inviteRole);
    setInviteEmail("");
    setInviteRole("Editor");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Invite Section */}
      <form
        onSubmit={handleInvite}
        className="flex flex-col sm:flex-row items-end gap-3 p-4 rounded-xl border"
        style={{ borderColor: line, backgroundColor: "white" }}
      >
        <div className="flex-1 w-full sm:w-auto">
          <Input
            label="Email address"
            type="email"
            placeholder="colleague@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-40">
          <Select
            label="Role"
            options={roleOptions}
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={!inviteEmail.trim()} className="w-full sm:w-auto">
          <UserPlus size={16} />
          Invite
        </Button>
      </form>

      {/* Members Table */}
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.length === 0 ? (
            <Tr>
              <Td colSpan={4} className="text-center py-12">
                <span className="text-sm" style={{ color: mute }}>
                  No team members yet
                </span>
              </Td>
            </Tr>
          ) : (
            members.map((member) => (
              <Tr key={member.id}>
                <Td>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ color: ink }}>
                      {member.name}
                    </span>
                    {member.isCurrentUser && (
                      <Badge variant="default" className="text-[10px]">
                        You
                      </Badge>
                    )}
                  </div>
                </Td>
                <Td>
                  <span className="text-sm" style={{ color: mute }}>
                    {member.email}
                  </span>
                </Td>
                <Td>
                  <Badge
                    variant={
                      member.role === "Owner"
                        ? "default"
                        : member.role === "Editor"
                          ? "success"
                          : "muted"
                    }
                  >
                    {member.role}
                  </Badge>
                </Td>
                <Td>
                  {member.role !== "Owner" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemove?.(member.id)}
                      className="text-[${coral}]"
                      style={{ color: coral }}
                    >
                      <Trash2 size={14} />
                      Remove
                    </Button>
                  )}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
}

export default TeamTable;
