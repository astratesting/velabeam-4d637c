"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import HarborHero from "@/components/illustrations/HarborHero";

export default function Hero() {
  return (
    <section className="w-full bg-vb-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 px-6 py-20 md:flex-row md:gap-16 md:py-28 lg:px-8">
        {/* ── Left: Copy & CTAs ─────────────────────────────── */}
        <div className="flex flex-1 flex-col items-start gap-6">
          <h1
            className="font-heading text-[36px] leading-[44px] tracking-tight md:text-[56px] md:leading-[64px]"
            style={{ color: "#1B1530" }}
          >
            Ship a local business site in 10 minutes.
          </h1>

          <p
            className="font-body max-w-lg text-base md:text-lg"
            style={{ color: "#6B6480" }}
          >
            Find businesses without websites. Generate a site with AI. Hand it
            to the client.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-xl px-8 text-base font-semibold"
              >
                Start free trial
              </Button>
            </Link>

            <Button variant="ghost" size="lg" className="rounded-xl px-6 text-base font-medium">
              Watch 90s demo
            </Button>
          </div>

          <p
            className="mt-2 font-body text-sm"
            style={{ color: "#6B6480" }}
          >
            Built for solo developers and small agencies
          </p>
        </div>

        {/* ── Right: Illustration in browser mockup ─────────── */}
        <div className="flex-1 w-full max-w-lg">
          <div className="overflow-hidden rounded-2xl bg-white shadow-warm-lg">
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 border-b px-4 py-3"
              style={{ borderColor: "#ECE6DE" }}
            >
              <span className="h-3 w-3 rounded-full" style={{ background: "#FF6B5B" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#F5B544" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#6B4FE0" }} />
            </div>

            {/* Illustration */}
            <div className="px-4 pb-6 pt-2">
              <HarborHero className="animate-float w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
