"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  DollarSign,
  Calendar,
  ArrowUpRight,
  Receipt,
  Plus,
} from "lucide-react";

interface BillingData {
  plan: string;
  price: number;
  renewalDate: string;
  totalMrr: number;
  invoices: Invoice[];
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  description: string;
}

function BillingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-[#ECE6DE] rounded-2xl" />
        <div className="h-40 bg-[#ECE6DE] rounded-2xl" />
      </div>
      <div className="h-60 bg-[#ECE6DE] rounded-2xl" />
    </div>
  );
}

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBilling() {
      try {
        const res = await fetch("/api/billing");
        if (res.ok) {
          const data = await res.json();
          setBilling(data);
        }
      } catch {
        // Billing will remain null
      } finally {
        setLoading(false);
      }
    }
    fetchBilling();
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#1B1530]">Billing</h1>

      {loading ? (
        <BillingSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Plan Card */}
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#6B4FE0]" />
                <h2 className="text-lg font-semibold text-[#1B1530]">
                  Current plan
                </h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-[#1B1530]">
                    {billing?.plan || "Free"}
                  </p>
                  <p className="text-sm text-[#6B6480]">
                    {billing?.price
                      ? `$${billing.price}/month`
                      : "No active subscription"}
                  </p>
                </div>
                {billing?.renewalDate && (
                  <div className="flex items-center gap-2 text-sm text-[#6B6480]">
                    <Calendar className="w-4 h-4" />
                    Renews{" "}
                    {new Date(billing.renewalDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button className="px-4 py-2 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm">
                    Upgrade
                  </button>
                  {billing?.plan && billing.plan !== "Free" && (
                    <button className="px-4 py-2 rounded-xl border border-[#ECE6DE] text-[#6B6480] font-medium text-sm hover:border-[#FF6B5B]/30 hover:text-[#FF6B5B] transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* MRR Breakdown Card */}
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-[#6B4FE0]" />
                <h2 className="text-lg font-semibold text-[#1B1530]">
                  MRR breakdown
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-[#1B1530]">
                    ${(billing?.totalMrr ?? 0).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-0.5 text-sm font-medium text-[#F5B544] mb-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Monthly recurring revenue
                  </span>
                </div>
                <p className="text-sm text-[#6B6480]">
                  Total MRR from all active client sites.
                </p>
              </div>
            </div>
          </div>

          {/* Invoice History */}
          <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden">
            <div className="px-6 py-4 bg-[#FBF7F2] border-b border-[#ECE6DE] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#6B4FE0]" />
              <h2 className="text-sm font-semibold text-[#1B1530]">
                Invoice history
              </h2>
            </div>
            {billing?.invoices && billing.invoices.length > 0 ? (
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
                  {billing.invoices.map((inv) => (
                    <tr key={inv.id} className="border-t border-[#ECE6DE]">
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
            ) : (
              <div className="p-8 text-center">
                <Receipt className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
                <p className="text-sm text-[#6B6480]">No invoices yet.</p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-[#6B4FE0]" />
              <h2 className="text-lg font-semibold text-[#1B1530]">
                Payment method
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B6480]">
                  No payment method on file.
                </p>
                <p className="text-xs text-[#6B6480] mt-1">
                  Add a card to upgrade your plan and accept client payments.
                </p>
              </div>
              <button className="px-4 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add card
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
