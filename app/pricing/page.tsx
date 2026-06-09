"use client";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/marketing/Footer";
import PricingCards from "@/components/marketing/PricingCards";
import { Check } from "lucide-react";

/* ─── Palette tokens ─── */
const violet = "#6B4FE0";
const ink = "#1B1530";
const mute = "#6B6480";
const bg = "#FBF7F2";
const line = "#ECE6DE";

/* ─── Feature comparison data ─── */
const comparisonRows: { feature: string; agency: boolean; business: boolean }[] = [
  { feature: "Unlimited lead scanning", agency: true, business: false },
  { feature: "AI site builder", agency: true, business: false },
  { feature: "White-label client portal", agency: true, business: false },
  { feature: "Client management", agency: true, business: false },
  { feature: "Custom domain", agency: true, business: true },
  { feature: "Fast hosting", agency: true, business: true },
  { feature: "SSL certificate", agency: true, business: true },
  { feature: "Email support", agency: true, business: true },
  { feature: "Priority support", agency: true, business: false },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: bg }}>
      <Nav />

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="w-full px-6 pt-20 pb-4 text-center lg:px-8">
          <h1
            className="font-heading text-[40px] font-bold leading-tight tracking-tight md:text-[56px]"
            style={{ color: ink }}
          >
            Simple, transparent pricing
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl font-body text-lg"
            style={{ color: mute }}
          >
            Start free for 14 days. No credit card required.
          </p>
        </section>

        {/* ── Pricing cards ─────────────────────────────────── */}
        <PricingCards />

        {/* ── Feature comparison table ──────────────────────── */}
        <section className="w-full px-6 pb-24 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <h2
              className="mb-8 text-center font-heading text-[28px] font-bold leading-tight tracking-tight md:text-[36px]"
              style={{ color: ink }}
            >
              Feature comparison
            </h2>

            <div className="overflow-x-auto rounded-2xl shadow-[0_2px_12px_rgba(27,21,48,0.06)]">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr style={{ background: violet }}>
                    <th
                      className="px-6 py-4 font-heading text-sm font-semibold text-white"
                      style={{ borderTopLeftRadius: 16 }}
                    >
                      Feature
                    </th>
                    <th className="px-6 py-4 font-heading text-sm font-semibold text-white">
                      Agency ($129/mo)
                    </th>
                    <th
                      className="px-6 py-4 font-heading text-sm font-semibold text-white"
                      style={{ borderTopRightRadius: 16 }}
                    >
                      Business Hosting ($29/mo)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((row, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={row.feature}
                        style={{ background: isEven ? "#FFFFFF" : line }}
                      >
                        <td
                          className="px-6 py-4 font-body text-sm font-medium"
                          style={{ color: ink }}
                        >
                          {row.feature}
                        </td>
                        <td className="px-6 py-4">
                          {row.agency ? (
                            <Check size={18} style={{ color: violet }} />
                          ) : (
                            <span
                              className="font-body text-lg"
                              style={{ color: mute }}
                            >
                              &mdash;
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {row.business ? (
                            <Check size={18} style={{ color: violet }} />
                          ) : (
                            <span
                              className="font-body text-lg"
                              style={{ color: mute }}
                            >
                              &mdash;
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
