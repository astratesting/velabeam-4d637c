import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/marketing/Footer";

/* ─── Palette tokens ─── */
const violet = "#6B4FE0";
const ink = "#1B1530";
const mute = "#6B6480";
const bg = "#FBF7F2";
const line = "#ECE6DE";

/* ─── TOC sections ─── */
const tocSections = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-your-information", label: "How We Use Your Information" },
  { id: "data-sharing", label: "Data Sharing" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights" },
  { id: "cookies", label: "Cookies" },
  { id: "security", label: "Security" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes-to-this-policy", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: bg }}>
      {/* ── Header ──────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md"
        style={{ borderBottom: `1px solid ${line}` }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm transition-colors duration-150 hover:opacity-80"
            style={{ color: mute }}
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <span className="font-heading text-lg font-bold" style={{ color: ink }}>
            VelaBeam
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-16 lg:px-8">
        {/* ── Page heading ───────────────────────────────────── */}
        <div className="mb-12">
          <h1
            className="font-heading text-[36px] font-bold leading-tight tracking-tight md:text-[48px]"
            style={{ color: ink }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 font-body text-base" style={{ color: mute }}>
            Effective date: June 2026
          </p>
        </div>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left: sticky TOC */}
          <nav className="shrink-0 lg:sticky lg:top-24 lg:w-[240px] lg:self-start">
            <h2
              className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider"
              style={{ color: ink }}
            >
              Contents
            </h2>
            <ul className="flex flex-col gap-2">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-1.5 font-body text-sm transition-colors duration-150 hover:opacity-80"
                    style={{ color: mute }}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: scrolling content */}
          <article className="min-w-0 flex-1">
            {/* ── Information We Collect ────────────────────────── */}
            <section id="information-we-collect" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Information We Collect
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  When you create an account or use VelaBeam, we collect personal information
                  that you voluntarily provide to us. This includes your full name, email
                  address, business name, and any other details you enter while building or
                  managing your website through our platform.
                </p>
                <p>
                  We also collect certain information automatically when you visit our website
                  or use our services. This includes your IP address, browser type, operating
                  system, referring URLs, pages visited, and the dates and times of your
                  visits. We gather this data through server logs and similar tracking
                  technologies.
                </p>
                <p>
                  If you subscribe to a paid plan, our third-party payment processor (Stripe)
                  collects your billing information, including credit or debit card details.
                  We do not store your full payment card number on our servers.
                </p>
              </div>
            </section>

            {/* ── How We Use Your Information ───────────────────── */}
            <section id="how-we-use-your-information" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                How We Use Your Information
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  We use the information we collect to provide, maintain, and improve the
                  VelaBeam platform. Specifically, we use your data to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Create and manage your account, and authenticate your access to the
                    platform.
                  </li>
                  <li>
                    Deliver the website-building and hosting services you have requested.
                  </li>
                  <li>
                    Process subscription payments and send billing-related communications.
                  </li>
                  <li>
                    Respond to your inquiries, provide customer support, and send important
                    service announcements.
                  </li>
                  <li>
                    Analyze usage trends and improve the functionality, performance, and
                    user experience of our platform.
                  </li>
                  <li>
                    Detect, prevent, and address technical issues, fraud, or security
                    threats.
                  </li>
                  <li>
                    Comply with legal obligations and enforce our Terms of Service.
                  </li>
                </ul>
              </div>
            </section>

            {/* ── Data Sharing ──────────────────────────────────── */}
            <section id="data-sharing" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Data Sharing
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  We do not sell your personal information to third parties. However, we may
                  share your data with the following categories of service providers as
                  necessary to operate our business:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong style={{ color: ink }}>Payment Processors.</strong> We use Stripe
                    to process subscription payments. Stripe handles your billing information
                    in accordance with its own privacy policy.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Hosting and Infrastructure Providers.</strong>{" "}
                    We use cloud infrastructure providers to host the VelaBeam platform and
                    your website content.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Analytics Providers.</strong> We may use
                    analytics services to understand how users interact with our platform,
                    which helps us improve our services.
                  </li>
                </ul>
                <p>
                  We may also disclose your information if required to do so by law, or if we
                  believe in good faith that such disclosure is reasonably necessary to comply
                  with legal process, respond to claims, or protect the rights, property, or
                  safety of VelaBeam, our users, or the public.
                </p>
              </div>
            </section>

            {/* ── Data Retention ────────────────────────────────── */}
            <section id="data-retention" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Data Retention
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  We retain your personal information for as long as your account is active or
                  as needed to provide you with our services. If you delete your account, we
                  will remove your personal data from our active systems within 30 days,
                  except where we are required to retain certain information for legal,
                  accounting, or compliance purposes.
                </p>
                <p>
                  We may retain anonymized or aggregated data that cannot be used to identify
                  you for analytics and platform improvement purposes indefinitely.
                </p>
              </div>
            </section>

            {/* ── Your Rights ───────────────────────────────────── */}
            <section id="your-rights" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Your Rights
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  Depending on your location, you may have the following rights regarding your
                  personal data under applicable data protection laws, including the General
                  Data Protection Regulation (GDPR):
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong style={{ color: ink }}>Right of Access.</strong> You may request a
                    copy of the personal data we hold about you.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Right to Rectification.</strong> You may
                    request that we correct inaccurate or incomplete personal data.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Right to Erasure.</strong> You may request
                    that we delete your personal data, subject to certain legal exceptions.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Right to Restrict Processing.</strong> You
                    may request that we limit how we use your personal data in certain
                    circumstances.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Right to Data Portability.</strong> You may
                    request a copy of your data in a structured, commonly used, and
                    machine-readable format.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Right to Object.</strong> You may object to
                    our processing of your personal data where we rely on legitimate interests
                    as the legal basis.
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:privacy@velabeam.com"
                    className="underline transition-colors duration-150"
                    style={{ color: violet }}
                  >
                    privacy@velabeam.com
                  </a>
                  . We will respond to your request within 30 days.
                </p>
                <p>
                  If you are located in the European Economic Area (EEA) and believe we have
                  not adequately addressed your concerns, you have the right to lodge a
                  complaint with your local data protection supervisory authority.
                </p>
              </div>
            </section>

            {/* ── Cookies ───────────────────────────────────────── */}
            <section id="cookies" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Cookies
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  VelaBeam uses cookies and similar tracking technologies to operate and
                  secure the platform. Cookies are small text files stored on your device when
                  you visit our website.
                </p>
                <p>We use the following types of cookies:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong style={{ color: ink }}>Essential Cookies.</strong> These cookies are
                    necessary for the platform to function correctly. They enable core features
                    such as authentication, session management, and security. You cannot opt
                    out of these cookies while using VelaBeam.
                  </li>
                  <li>
                    <strong style={{ color: ink }}>Analytics Cookies.</strong> These cookies help
                    us understand how visitors interact with our website by collecting and
                    reporting information anonymously. We use this data to improve the platform.
                  </li>
                </ul>
                <p>
                  Most web browsers allow you to control cookies through their settings. You
                  can typically set your browser to refuse all cookies or to indicate when a
                  cookie is being sent. However, if you disable essential cookies, some parts
                  of the platform may not function properly.
                </p>
              </div>
            </section>

            {/* ── Security ──────────────────────────────────────── */}
            <section id="security" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Security
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  We take the security of your personal data seriously and implement
                  industry-standard measures to protect it. These measures include encryption
                  of data in transit using TLS, encryption of sensitive data at rest, access
                  controls that limit who can view personal information, and regular security
                  audits of our infrastructure.
                </p>
                <p>
                  While we strive to protect your personal information, no method of
                  transmission over the Internet or method of electronic storage is 100%
                  secure. We cannot guarantee the absolute security of your data, but we are
                  committed to promptly notifying affected users in the event of a data
                  breach as required by applicable law.
                </p>
              </div>
            </section>

            {/* ── Children's Privacy ────────────────────────────── */}
            <section id="childrens-privacy" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Children&apos;s Privacy
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  VelaBeam is not intended for use by individuals under the age of 18. We do
                  not knowingly collect personal information from children under 18. If we
                  become aware that we have collected personal data from a child under 18
                  without verification of parental consent, we will take steps to delete that
                  information promptly.
                </p>
                <p>
                  If you are a parent or guardian and believe that your child has provided us
                  with personal information, please contact us at{" "}
                  <a
                    href="mailto:privacy@velabeam.com"
                    className="underline transition-colors duration-150"
                    style={{ color: violet }}
                  >
                    privacy@velabeam.com
                  </a>{" "}
                  so we can take appropriate action.
                </p>
              </div>
            </section>

            {/* ── Changes to This Policy ────────────────────────── */}
            <section id="changes-to-this-policy" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Changes to This Policy
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in
                  our practices, legal requirements, or other operational reasons. When we make
                  material changes, we will notify you by updating the effective date at the
                  top of this page and, where appropriate, by sending a notice to the email
                  address associated with your account.
                </p>
                <p>
                  We encourage you to review this page periodically to stay informed about how
                  we protect your information. Your continued use of the VelaBeam platform
                  after any changes to this policy constitutes your acceptance of those
                  changes.
                </p>
              </div>
            </section>

            {/* ── Contact Us ────────────────────────────────────── */}
            <section id="contact-us" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Contact Us
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy
                  Policy or our data practices, please reach out to us:
                </p>
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#FFFFFF", border: `1px solid ${line}` }}
                >
                  <p className="mb-1 font-body text-base" style={{ color: ink }}>
                    VelaBeam Privacy Team
                  </p>
                  <p className="font-body text-base">
                    Email:{" "}
                    <a
                      href="mailto:privacy@velabeam.com"
                      className="underline transition-colors duration-150"
                      style={{ color: violet }}
                    >
                      privacy@velabeam.com
                    </a>
                  </p>
                </div>
                <p>
                  We aim to respond to all privacy-related inquiries within 5 business days.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
