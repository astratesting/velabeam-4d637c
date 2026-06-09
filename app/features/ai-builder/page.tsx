import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/marketing/Footer";
import Button from "@/components/ui/Button";
import {
  LayoutTemplate,
  Sparkles,
  Palette,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "AI Builder — From Lead to Live Site in Minutes | VelaBeam",
  description:
    "Pick an industry template, auto-fill content from the lead's data, customize the brand, and publish. No design skills needed.",
};

const steps = [
  {
    icon: LayoutTemplate,
    number: "01",
    title: "Pick a template",
    description:
      "Choose from industry-specific templates — restaurant, salon, plumber, dentist, and more. Each one is conversion-optimized out of the box.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Auto-filled content",
    description:
      "VelaBeam pulls the business name, address, hours, and services from public data. The draft is ready before you even start editing.",
  },
  {
    icon: Palette,
    number: "03",
    title: "Brand it",
    description:
      "Adjust colors, upload a logo, and pick fonts. Every template adapts to the brand identity you set — no CSS knowledge required.",
  },
  {
    icon: Globe,
    number: "04",
    title: "Publish",
    description:
      "One click. SSL included. The site goes live on a custom domain or a VelaBeam subdomain instantly.",
  },
];

export default function AIBuilderPage() {
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
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,91,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-vb-coral/10 px-4 py-1.5 text-sm font-semibold text-vb-coral">
              AI Builder
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-vb-ink sm:text-5xl lg:text-6xl">
              From lead to live site in minutes.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-vb-muted sm:text-xl">
              Pick an industry template, auto-fill content from the lead&apos;s
              data, customize the brand, and publish. No design skills needed.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg">Build your first site</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Step-by-step ─── */}
        <section className="border-t border-vb-line bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-center text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Four steps. Zero friction.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-vb-muted">
              AI Builder handles the heavy lifting so you can focus on selling,
              not designing.
            </p>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-vb-line bg-vb-bg p-6 transition-all hover:border-vb-coral/30 hover:shadow-warm"
                >
                  <span className="absolute right-4 top-4 text-5xl font-extrabold text-vb-line select-none">
                    {step.number}
                  </span>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-vb-coral/10 text-vb-coral transition-colors group-hover:bg-vb-coral group-hover:text-white">
                    <step.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-vb-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-vb-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why templates work ─── */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Templates that convert
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-vb-muted">
              Every template is designed for small-business goals: phone calls,
              form submissions, and directions. No bloated animations or
              unnecessary pages.
            </p>
            <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
              {[
                {
                  stat: "7",
                  label: "Industry templates",
                  detail: "Restaurant, salon, dentist, plumber, roofer, auto shop, and a generic option.",
                },
                {
                  stat: "<5",
                  label: "Minutes to publish",
                  detail: "Auto-fill does the work. You just review and tweak.",
                },
                {
                  stat: "100%",
                  label: "Mobile responsive",
                  detail: "Every template looks great on phones, tablets, and desktops.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-vb-line bg-white p-6"
                >
                  <div className="text-3xl font-extrabold text-vb-violet">
                    {item.stat}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-vb-ink">
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm text-vb-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="border-t border-vb-line bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-vb-ink sm:text-4xl">
              Build without boundaries
            </h2>
            <p className="mt-4 text-lg text-vb-muted">
              Sign up free and publish your first client site today. No credit
              card required.
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg">Build your first site</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
