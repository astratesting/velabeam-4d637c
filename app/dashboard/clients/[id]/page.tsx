"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Folder,
  Settings,
  ExternalLink,
} from "lucide-react";

interface ClientDetail {
  id: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  address: string | null;
  siteStatus: "Draft" | "Live" | "Paused";
  siteId: string | null;
  siteSlug: string | null;
  mrr: number;
  renewalDate: string | null;
  lastLogin: string | null;
  whiteLabelPortal: boolean;
}

interface Invoice {
  id: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  description: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

type TabKey = "overview" | "sites" | "invoices" | "messages" | "files";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "Overview", icon: Settings },
  { key: "sites", label: "Sites", icon: Globe },
  { key: "invoices", label: "Invoices", icon: FileText },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "files", label: "Files", icon: Folder },
];

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [whiteLabelEnabled, setWhiteLabelEnabled] = useState(false);

  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await fetch(`/api/clients/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setClient(data);
          setWhiteLabelEnabled(data.whiteLabelPortal || false);
        }
      } catch {
        // Client will remain null
      } finally {
        setLoading(false);
      }
    }
    fetchClient();
  }, [params.id]);

  useEffect(() => {
    if (activeTab === "invoices" && client) {
      fetch(`/api/clients/${client.id}/invoices`)
        .then((r) => r.json())
        .then((data) => setInvoices(data))
        .catch(() => {});
    }
    if (activeTab === "messages" && client) {
      fetch(`/api/clients/${client.id}/messages`)
        .then((r) => r.json())
        .then((data) => setMessages(data))
        .catch(() => {});
    }
  }, [activeTab, client]);

  async function toggleWhiteLabel() {
    if (!client) return;
    const newValue = !whiteLabelEnabled;
    setWhiteLabelEnabled(newValue);
    try {
      await fetch(`/api/clients/${client.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whiteLabelPortal: newValue }),
      });
    } catch {
      setWhiteLabelEnabled(!newValue);
    }
  }

  const statusColors: Record<string, string> = {
    Draft: "bg-[#6B4FE0]/10 text-[#6B4FE0]",
    Live: "bg-[#F5B544]/10 text-[#F5B544]",
    Paused: "bg-[#6B6480]/10 text-[#6B6480]",
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="space-y-6 animate-pulse">
          <div className="h-10 w-20 bg-[#ECE6DE] rounded-xl" />
          <div className="h-8 w-64 bg-[#ECE6DE] rounded" />
          <div className="h-12 bg-[#ECE6DE] rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-[#ECE6DE] rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h2 className="text-xl font-bold text-[#1B1530] mb-2">
            Client not found
          </h2>
          <p className="text-[#6B6480] mb-4">
            The client you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/clients")}
            className="text-sm font-semibold text-[#6B4FE0] hover:underline"
          >
            Back to clients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => router.push("/dashboard/clients")}
        className="inline-flex items-center gap-2 text-sm text-[#6B6480] hover:text-[#1B1530] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to clients
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[#1B1530]">
          {client.businessName}
        </h1>
        <span
          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium self-start ${statusColors[client.siteStatus]}`}
        >
          {client.siteStatus}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-[#6B4FE0] text-white"
                : "text-[#6B6480] hover:bg-[#F5F2EE]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-[#6B4FE0]" />
                <span className="text-sm text-[#6B6480]">MRR</span>
              </div>
              <p className="text-3xl font-bold text-[#1B1530]">
                ${client.mrr.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-[#6B4FE0]" />
                <span className="text-sm text-[#6B6480]">Renewal date</span>
              </div>
              <p className="text-lg font-semibold text-[#1B1530]">
                {client.renewalDate
                  ? new Date(client.renewalDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No renewal date"}
              </p>
            </div>
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-[#6B4FE0]" />
                <span className="text-sm text-[#6B6480]">Site</span>
              </div>
              {client.siteSlug ? (
                <a
                  href={`https://${client.siteSlug}.velabeam.app`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#6B4FE0] hover:underline flex items-center gap-1"
                >
                  {client.siteSlug}.velabeam.app
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <p className="text-sm text-[#6B6480]">No site published</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#1B1530] mb-4">
              Contact information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6B4FE0]" />
                <div>
                  <p className="text-xs text-[#6B6480]">Email</p>
                  <p className="text-sm text-[#1B1530]">
                    {client.contactEmail}
                  </p>
                </div>
              </div>
              {client.contactPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#6B4FE0]" />
                  <div>
                    <p className="text-xs text-[#6B6480]">Phone</p>
                    <p className="text-sm text-[#1B1530]">
                      {client.contactPhone}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6B4FE0]" />
                <div>
                  <p className="text-xs text-[#6B6480]">Contact</p>
                  <p className="text-sm text-[#1B1530]">
                    {client.contactName}
                  </p>
                </div>
              </div>
              {client.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#6B4FE0]" />
                  <div>
                    <p className="text-xs text-[#6B6480]">Address</p>
                    <p className="text-sm text-[#1B1530]">{client.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "sites" && (
        <div className="space-y-4">
          {client.siteId ? (
            <div
              onClick={() =>
                router.push(`/dashboard/sites/${client.siteId}`)
              }
              className="rounded-2xl border border-[#ECE6DE] bg-white p-6 hover:border-[#6B4FE0]/30 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#1B1530]">
                    {client.businessName}
                  </h3>
                  {client.siteSlug && (
                    <p className="text-sm text-[#6B6480] mt-1">
                      {client.siteSlug}.velabeam.app
                    </p>
                  )}
                </div>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[client.siteStatus]}`}
                >
                  {client.siteStatus}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-8 text-center">
              <Globe className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
              <p className="text-sm text-[#6B6480]">
                No sites yet for this client.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="space-y-4">
          {invoices.length > 0 ? (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FBF7F2]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                      Description
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6480] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-t border-[#ECE6DE]"
                    >
                      <td className="px-4 py-3.5 text-sm text-[#6B6480]">
                        {new Date(inv.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-[#1B1530]">
                        {inv.description}
                      </td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#1B1530]">
                        ${inv.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            inv.status === "Paid"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : inv.status === "Pending"
                              ? "bg-[#F5B544]/10 text-[#F5B544]"
                              : "bg-[#FF6B5B]/10 text-[#FF6B5B]"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-8 text-center">
              <FileText className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
              <p className="text-sm text-[#6B6480]">No invoices yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "messages" && (
        <div className="space-y-4">
          {messages.length > 0 ? (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6B4FE0]/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-[#6B4FE0]">
                      {msg.sender.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1B1530]">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-[#6B6480]">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B6480] mt-1">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-8 text-center">
              <MessageSquare className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
              <p className="text-sm text-[#6B6480]">No messages yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "files" && (
        <div className="rounded-2xl border border-[#ECE6DE] bg-white p-8 text-center">
          <Folder className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
          <p className="text-sm text-[#6B6480]">No files uploaded yet.</p>
        </div>
      )}

      {/* White-label portal toggle */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#1B1530]">
              White-label portal
            </h3>
            <p className="text-xs text-[#6B6480] mt-1">
              Enable a branded client portal for {client.businessName}. They can
              view their site, invoices, and messages.
            </p>
          </div>
          <button
            onClick={toggleWhiteLabel}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              whiteLabelEnabled ? "bg-[#6B4FE0]" : "bg-[#ECE6DE]"
            }`}
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                whiteLabelEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
