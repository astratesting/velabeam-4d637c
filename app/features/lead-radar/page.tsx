import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/marketing/Footer";
import Button from "@/components/ui/Button";
import {
  MapPin,
  Filter,
  Zap,
  Download,
} from "lucide-react";

export const metadata = {
  title: "Lead Radar — Find Businesses Without Websites | VelaBeam",
  description:
    "VelaBeam scans public listings to find local businesses without websites. See them on a map, filter by category, and reach out with one click.",
};

const highlights = [
  {
    icon: MapPin,
    title: "Map view with color-coded pins",
    description:
      "See every lead plotted on an interactive map. Color codes show priority, category, and outreach status at a glance.",
  },
  {
    icon: Filter,
    title: "Filters by category and distance",
    description:
      "Narrow results by industry, zip code, radius, and whether the business has an existing online presence.",
  },
  {
    icon: Zap,
    title: 'One-click "Generate site"',
    description:
      "Found a great lead? Click once to spin up a tailored website draft using AI Builder — no manual work required.",
  },
  {
    icon: Download,
    title: "Export leads as CSV",
    description:
      "Pull your filtered lead list into a spreadsheet for CRM import, mail-merge campaigns, or team sharing.",
  },
];

export default function LeadRadarPage() {
  return (
    <>
      <Nav />

      <main className="bg-vb-bg">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          {/* Background gradient */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,79,224,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-vb-violet/10 px-4 py-1.5 text-sm font-semibold text-vb-violet">
              Lead Radar
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-vb-ink sm:text-5xl lg:text-6xl">
              Find businesses that need you.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-vb-muted sm:text-xl">
              VelaBeam scans public listings to find local businesses without
              websites. See them on a map, filter by category, and reach out
              with one click.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg">Start finding leads today</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Feature Highlights ─── */}
        <section className="border-t border-vb-line bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Everything you need to fill your pipeline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-vb-muted">
              Lead Radar gives you a real-time view of businesses in your area
              that are ready for a website.
            </p>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-vb-line bg-vb-bg p-6 transition-all hover:border-vb-violet/30 hover:shadow-warm"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-vb-violet/10 text-vb-violet transition-colors group-hover:bg-vb-violet group-hover:text-white">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-vb-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-vb-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              From search to outreach in minutes
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Scan",
                  desc: "Choose a location and category. Lead Radar pulls live data.",
                },
                {
                  step: "2",
                  title: "Filter",
                  desc: "Refine by distance, industry, and online presence status.",
                },
                {
                  step: "3",
                  title: "Reach out",
                  desc: "Generate a site preview or export the list — your call.",
                },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vb-violet text-lg font-bold text-white">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-vb-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-vb-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="border-t border-vb-line bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Ready to find your next client?
            </h2>
            <p className="mt-4 text-lg text-vb-muted">
              Start your free trial and discover businesses near you that need a
              website — today.
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg">Start finding leads today</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
