"use client";

import { Radar, Wand2, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

/* ─── Feature definitions ─── */
const features = [
  {
    icon: Radar,
    title: "Lead Radar",
    description:
      "Discover local businesses without websites in your area.",
    accentColor: "#6B4FE0",
  },
  {
    icon: Wand2,
    title: "AI Builder",
    description:
      "Generate a complete, industry-specific website in one click.",
    accentColor: "#FF6B5B",
  },
  {
    icon: Palette,
    title: "White-label Client Hub",
    description:
      "Your brand, your domain, your client experience.",
    accentColor: "#F5B544",
  },
] as const;

export default function FeatureRow() {
  return (
    <section className="w-full bg-vb-bg">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {features.map(({ icon: Icon, title, description, accentColor }) => (
          <Card
            key={title}
            className="group relative overflow-hidden transition-shadow duration-200 hover:shadow-warm-lg"
          >
            {/* Colored accent border-top */}
            <div
              className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
              style={{ background: accentColor }}
            />

            <CardContent className="flex flex-col gap-4 pt-8">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${accentColor}15` }}
              >
                <Icon size={22} style={{ color: accentColor }} />
              </div>

              <h3
                className="font-heading text-lg font-semibold leading-tight"
                style={{ color: "#1B1530" }}
              >
                {title}
              </h3>

              <p className="font-body text-sm leading-relaxed" style={{ color: "#6B6480" }}>
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
