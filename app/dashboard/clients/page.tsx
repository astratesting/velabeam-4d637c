"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, ExternalLink } from "lucide-react";

interface Client {
  id: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  siteStatus: "Draft" | "Live" | "Paused";
  mrr: number;
  renewalDate: string | null;
  lastLogin: string | null;
}

function TableSkeleton() {
  return (
    <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden animate-pulse">
      <div className="h-12 bg-[#F5F2EE]" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-14 border-t border-[#ECE6DE] px-4 flex items-center">
          <div className="h-4 w-32 bg-[#ECE6DE] rounded" />
        </div>
      ))}
    </div>
  );
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch {
        // Clients will remain empty
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  const statusColors: Record<string, string> = {
    Draft: "bg-[#6B4FE0]/10 text-[#6B4FE0]",
    Live: "bg-[#F5B544]/10 text-[#F5B544]",
    Paused: "bg-[#6B6480]/10 text-[#6B6480]",
  };

  if (!loading && clients.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-[#6B4FE0]/10 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-[#6B4FE0]" />
          </div>
          <h2 className="text-xl font-bold text-[#1B1530] mb-2">
            No clients yet
          </h2>
          <p className="text-[#6B6480] mb-6 max-w-md">
            Publish a site to add your first client. Clients are automatically
            added when you generate and publish a site from a lead.
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
      <h1 className="text-2xl font-bold text-[#1B1530]">Clients</h1>

      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FBF7F2]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                    Business name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                    Site status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                    MRR
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                    Renewal date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                    Last login
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() =>
                      router.push(`/dashboard/clients/${client.id}`)
                    }
                    className="border-t border-[#ECE6DE] hover:bg-[#FBF7F2] cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-[#1B1530]">
                        {client.businessName}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-sm text-[#1B1530]">
                          {client.contactName}
                        </p>
                        <p className="text-xs text-[#6B6480]">
                          {client.contactEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[client.siteStatus]}`}
                      >
                        {client.siteStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-[#1B1530]">
                        ${client.mrr.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-[#6B6480]">
                        {client.renewalDate
                          ? new Date(client.renewalDate).toLocaleDateString()
                          : "--"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-[#6B6480]">
                        {client.lastLogin
                          ? new Date(client.lastLogin).toLocaleDateString()
                          : "Never"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
