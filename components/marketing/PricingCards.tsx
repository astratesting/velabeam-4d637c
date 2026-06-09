"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

/* ─── Plan data ─── */
const plans = [
  {
    name: "Agency",
    monthlyPrice: 129,
    annualPrice: 1032,
    popular: true,
    cta: { label: "Start 14-day trial", href: "/signup" },
    features: [
      "Unlimited leads",
      "AI site builder",
      "White-label portal",
      "Client management",
      "Custom domain",
      "Priority support",
    ],
  },
  {
    name: "Business Hosting",
    monthlyPrice: 29,
    annualPrice: 278,
    popular: false,
    cta: { label: "Talk to sales", href: "#contact" },
    features: [
      "Fast hosting",
      "SSL",
      "Custom domain",
      "Email support",
    ],
  },
] as const;

export default function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="w-full bg-vb-bg">
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8">
        {/* ── Billing toggle ────────────────────────────────── */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <h2
            className="font-heading text-center text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
            style={{ color: "#1B1530" }}
          >
            Simple, transparent pricing
          </h2>

          <div
            className="mt-4 inline-flex items-center gap-3 rounded-full px-1 py-1"
            style={{ background: "#ECE6DE" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                !annual ? "bg-white shadow-sm" : ""
              }`}
              style={{ color: !annual ? "#1B1530" : "#6B6480" }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                annual ? "bg-white shadow-sm" : ""
              }`}
              style={{ color: annual ? "#1B1530" : "#6B6480" }}
            >
              Annual{" "}
              <span
                className="ml-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{ background: "#F5B54420", color: "#F5B544" }}
              >
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* ── Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const period = annual ? "/yr" : "/mo";

            return (
              <Card
                key={plan.name}
                className="relative flex flex-col overflow-hidden"
              >
                {/* Popular ribbon */}
                {plan.popular && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: "#F5B544", color: "#1B1530" }}
                  >
                    Most popular
                  </div>
                )}

                <CardHeader className="pb-0">
                  <h3
                    className="font-heading text-lg font-semibold"
                    style={{ color: "#1B1530" }}
                  >
                    {plan.name}
                  </h3>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6 pt-4">
                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-heading text-[40px] font-bold leading-none"
                      style={{ color: "#1B1530" }}
                    >
                      {formatCurrency(price)}
                    </span>
                    <span className="font-body text-sm" style={{ color: "#6B6480" }}>
                      {period}
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 font-body text-sm"
                        style={{ color: "#1B1530" }}
                      >
                        <Check
                          size={16}
                          className="shrink-0"
                          style={{ color: "#6B4FE0" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto pt-2">
                  <Link href={plan.cta.href} className="w-full">
                    <Button
                      variant={plan.popular ? "primary" : "secondary"}
                      size="lg"
                      className="w-full rounded-xl"
                    >
                      {plan.cta.label}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
