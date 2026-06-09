import Nav from "@/components/layout/Nav";
import Footer from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";
import { Radar, Wand2, Palette } from "lucide-react";

/* ─── Palette tokens ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const ink = "#1B1530";
const mute = "#6B6480";
const bg = "#FBF7F2";
const line = "#ECE6DE";

/* ─── Benefits data ─── */
const benefits = [
  {
    title: "Find leads instantly",
    description:
      "Scan your area for businesses without websites. See them on a map with contact info, ratings, and hours.",
    icon: Radar,
    iconBg: violet,
  },
  {
    title: "Build sites in minutes",
    description:
      "Pick an industry template, auto-fill from lead data, customize the brand, and publish. Zero design skills needed.",
    icon: Wand2,
    iconBg: coral,
  },
  {
    title: "Look professional",
    description:
      "White-label the entire experience. Your logo, your colors, your domain. Clients see you, not us.",
    icon: Palette,
    iconBg: honey,
  },
];

export default function ForAgenciesPage() {
  return (
    <div className="min-h-screen" style={{ background: bg }}>
      <Nav />

      <main>
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="w-full px-6 pt-24 pb-16 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1
              className="font-heading text-[40px] font-bold leading-tight tracking-tight md:text-[56px]"
              style={{ color: ink }}
            >
              Built for agencies that ship fast.
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed"
              style={{ color: mute }}
            >
              VelaBeam gives solo developers and small teams the tools to find
              leads, build sites, and manage clients &mdash; all in one place.
            </p>
          </div>
        </section>

        {/* ── Benefits grid ─────────────────────────────────── */}
        <section className="w-full px-6 pb-24 lg:px-8">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center rounded-2xl bg-white px-8 py-10 text-center shadow-[0_2px_12px_rgba(27,21,48,0.06)]"
                >
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ background: `${benefit.iconBg}18` }}
                  >
                    <Icon size={28} style={{ color: benefit.iconBg }} />
                  </div>
                  <h3
                    className="mb-3 font-heading text-lg font-semibold"
                    style={{ color: ink }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: mute }}
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────── */}
        <section
          className="w-full px-6 py-20 lg:px-8"
          style={{ background: "#FFFFFF" }}
        >
          <div className="mx-auto max-w-[1100px]">
            <h2
              className="mb-12 text-center font-heading text-[28px] font-bold leading-tight tracking-tight md:text-[36px]"
              style={{ color: ink }}
            >
              What our early users say
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex min-h-[160px] items-center justify-center rounded-2xl border px-8 py-10 text-center"
                  style={{
                    borderColor: line,
                    background: bg,
                  }}
                >
                  <p
                    className="font-body text-sm italic leading-relaxed"
                    style={{ color: mute }}
                  >
                    Coming soon &mdash; we&rsquo;re gathering real feedback from
                    our first users.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="w-full px-6 py-24 text-center lg:px-8">
          <div className="mx-auto max-w-xl">
            <h2
              className="mb-6 font-heading text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
              style={{ color: ink }}
            >
              Ready to try VelaBeam?
            </h2>
            <a href="/signup">
              <Button size="lg" className="rounded-xl px-10">
                Start free trial
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
