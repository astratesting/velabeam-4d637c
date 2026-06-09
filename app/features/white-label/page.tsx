import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/marketing/Footer";
import Button from "@/components/ui/Button";
import {
  Image,
  Globe,
  Monitor,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "White Label — Your Brand, Front and Center | VelaBeam",
  description:
    "Clients see your logo, your colors, and your domain. VelaBeam stays invisible.",
};

const features = [
  {
    icon: Image,
    title: "Custom logo and accent color",
    description:
      "Upload your logo and set an accent color. Every screen your client sees matches your agency brand.",
  },
  {
    icon: Globe,
    title: "Custom domain (CNAME)",
    description:
      "Point dashboard.youragency.com to VelaBeam. Clients never see our URL.",
  },
  {
    icon: Monitor,
    title: "Branded client portal",
    description:
      "Your clients log in to a portal that looks and feels like your own product — because it is.",
  },
  {
    icon: Mail,
    title: "White-labeled emails",
    description:
      "Every notification, invoice, and update goes out from your brand. No VelaBeam branding anywhere.",
  },
];

export default function WhiteLabelPage() {
  return (
    <>
      <Nav />

      <main className="bg-vb-bg">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,181,68,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-vb-honey/20 px-4 py-1.5 text-sm font-semibold text-vb-ink">
              White Label
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-vb-ink sm:text-5xl lg:text-6xl">
              Your brand, front and center.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-vb-muted sm:text-xl">
              Clients see your logo, your colors, and your domain. VelaBeam
              stays invisible.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg">Brand it your way</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section className="border-t border-vb-line bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Total control over the client experience
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-vb-muted">
              From login to invoice, every touchpoint is yours.
            </p>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-vb-line bg-vb-bg p-6 transition-all hover:border-vb-honey/40 hover:shadow-warm"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-vb-honey/15 text-vb-honey transition-colors group-hover:bg-vb-honey group-hover:text-white">
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

        {/* ─── Honest note ─── */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              No fake screenshots. No mockups.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-vb-muted">
              We don&apos;t use fake screenshots or mock client portals. Try it
              yourself with a free trial and see the real thing — your brand, on
              our infrastructure, in under ten minutes.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg">Start your free trial</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="border-t border-vb-line bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Sell VelaBeam as your own
            </h2>
            <p className="mt-4 text-lg text-vb-muted">
              White-labeling is included on the Agency plan. Start free, upgrade
              when you&apos;re ready.
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg">Brand it your way</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
