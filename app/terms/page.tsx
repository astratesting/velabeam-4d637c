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
  { id: "acceptance-of-terms", label: "Acceptance of Terms" },
  { id: "description-of-service", label: "Description of Service" },
  { id: "account-registration", label: "Account Registration" },
  { id: "payment-and-billing", label: "Payment and Billing" },
  { id: "user-content", label: "User Content" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact-us", label: "Contact Us" },
];

export default function TermsPage() {
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
            Terms of Service
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
            {/* ── Acceptance of Terms ──────────────────────────── */}
            <section id="acceptance-of-terms" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Acceptance of Terms
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  By accessing or using the VelaBeam platform (&ldquo;Service&rdquo;), you
                  agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you
                  do not agree to all of these Terms, you may not access or use the Service.
                  These Terms constitute a legally binding agreement between you
                  (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and
                  VelaBeam Inc. (&ldquo;VelaBeam,&rdquo; &ldquo;we,&rdquo;
                  &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                </p>
                <p>
                  We reserve the right to modify these Terms at any time. When we make
                  material changes, we will notify you by updating the effective date and,
                  where appropriate, by sending a notice to your registered email address.
                  Your continued use of the Service after any changes constitutes your
                  acceptance of the revised Terms.
                </p>
              </div>
            </section>

            {/* ── Description of Service ──────────────────────── */}
            <section id="description-of-service" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Description of Service
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  VelaBeam provides a website-building platform that enables businesses and
                  agencies to create, manage, and host professional websites. Our platform
                  includes tools for site design, content management, custom domain
                  configuration, SSL certificate provisioning, and related hosting services.
                </p>
                <p>
                  We may offer additional features such as AI-assisted site building, lead
                  generation tools, white-label client portals, and analytics dashboards.
                  The specific features available to you depend on your subscription plan.
                </p>
                <p>
                  We continually improve the Service and may add, modify, or discontinue
                  features at our discretion. We will make reasonable efforts to notify you of
                  significant changes that materially affect your use of the Service.
                </p>
              </div>
            </section>

            {/* ── Account Registration ────────────────────────── */}
            <section id="account-registration" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Account Registration
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  To use the Service, you must create an account by providing accurate and
                  complete information, including your name, email address, and business
                  details. You must be at least 18 years of age to register for an account.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of your account
                  credentials, including your password. You agree to notify us immediately at{" "}
                  <a
                    href="mailto:security@velabeam.com"
                    className="underline transition-colors duration-150"
                    style={{ color: violet }}
                  >
                    security@velabeam.com
                  </a>{" "}
                  if you become aware of any unauthorized access to or use of your account.
                  You are fully responsible for all activities that occur under your account,
                  whether or not you authorized them.
                </p>
                <p>
                  We reserve the right to suspend or terminate accounts that provide false or
                  misleading information, or that violate these Terms.
                </p>
              </div>
            </section>

            {/* ── Payment and Billing ─────────────────────────── */}
            <section id="payment-and-billing" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Payment and Billing
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  VelaBeam offers both free trial and paid subscription plans. Paid plans are
                  billed on a recurring monthly or annual basis, depending on the billing
                  cycle you select at the time of purchase. All payments are processed through
                  our third-party payment processor, Stripe.
                </p>
                <p>
                  By subscribing to a paid plan, you authorize us (through Stripe) to charge
                  your payment method on a recurring basis at the then-current rate until you
                  cancel. Subscription fees are non-refundable except as expressly stated in
                  these Terms or as required by applicable law.
                </p>
                <p>
                  We reserve the right to change our pricing at any time. If we increase the
                  price of your subscription plan, we will provide at least 30 days&apos;
                  notice before the change takes effect. If you do not agree to the new
                  pricing, you may cancel your subscription before the next billing cycle.
                </p>
                <p>
                  If your payment method fails or your account is past due, we may suspend or
                  restrict your access to the Service until payment is successfully processed.
                  We may also charge interest on overdue amounts at the rate of 1.5% per month
                  or the maximum rate permitted by law, whichever is lower.
                </p>
              </div>
            </section>

            {/* ── User Content ────────────────────────────────── */}
            <section id="user-content" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                User Content
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  You retain full ownership of all content you create, upload, or publish
                  through the Service (&ldquo;User Content&rdquo;). This includes text,
                  images, videos, designs, and any other materials you add to your website.
                  VelaBeam does not claim ownership over your User Content.
                </p>
                <p>
                  By using the Service, you grant VelaBeam a limited, non-exclusive,
                  royalty-free license to host, store, display, and transmit your User Content
                  solely for the purpose of providing and improving the Service. This license
                  terminates when you delete your User Content or close your account, except
                  to the extent that your content has been shared with others through the
                  Service and they have not deleted it.
                </p>
                <p>
                  You are solely responsible for the accuracy, legality, and appropriateness
                  of your User Content. You represent and warrant that you have all necessary
                  rights, licenses, and permissions to upload and publish your User Content
                  through the Service, and that doing so does not infringe or violate any
                  third-party rights.
                </p>
              </div>
            </section>

            {/* ── Acceptable Use ──────────────────────────────── */}
            <section id="acceptable-use" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Acceptable Use
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  You agree to use the Service only for lawful purposes and in compliance with
                  all applicable laws and regulations. You must not use the Service to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Upload, transmit, or distribute any content that is illegal, harmful,
                    threatening, abusive, defamatory, obscene, or otherwise objectionable.
                  </li>
                  <li>
                    Impersonate any person or entity, or falsely represent your affiliation
                    with any person or entity.
                  </li>
                  <li>
                    Upload or transmit viruses, malware, or other malicious code that could
                    damage or interfere with the operation of the Service or any third-party
                    systems.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any part of the Service, other user
                    accounts, or any systems or networks connected to the Service.
                  </li>
                  <li>
                    Use the Service to send unsolicited communications, spam, or phishing
                    messages.
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of the Service, or
                    attempt to do so.
                  </li>
                  <li>
                    Scrape, crawl, or use automated tools to extract data from the Service
                    without our prior written consent.
                  </li>
                </ul>
                <p>
                  We reserve the right to investigate and take appropriate action, including
                  suspending or terminating your account, if we determine that you have
                  violated these acceptable use requirements.
                </p>
              </div>
            </section>

            {/* ── Intellectual Property ────────────────────────── */}
            <section id="intellectual-property" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Intellectual Property
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  The VelaBeam platform, including its software, design, branding, logos,
                  documentation, and all other proprietary content (collectively, the
                  &ldquo;VelaBeam Materials&rdquo;), is owned by VelaBeam Inc. and is
                  protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  Subject to your compliance with these Terms, VelaBeam grants you a limited,
                  non-exclusive, non-transferable, revocable license to access and use the
                  Service for your internal business purposes. This license does not include
                  the right to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Modify, adapt, translate, reverse-engineer, decompile, or disassemble any
                    part of the VelaBeam platform.
                  </li>
                  <li>
                    Create derivative works based on the VelaBeam Materials.
                  </li>
                  <li>
                    Sublicense, sell, resell, or otherwise commercially exploit the Service
                    or VelaBeam Materials without our prior written consent.
                  </li>
                  <li>
                    Remove, alter, or obscure any copyright, trademark, or other proprietary
                    notices on or in the Service.
                  </li>
                </ul>
                <p>
                  Any feedback, suggestions, or ideas you provide regarding the Service may be
                  used by VelaBeam without obligation to you.
                </p>
              </div>
            </section>

            {/* ── Limitation of Liability ─────────────────────── */}
            <section id="limitation-of-liability" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Limitation of Liability
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  <strong style={{ color: ink }}>Disclaimer of Warranties.</strong> THE
                  SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS
                  AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS,
                  IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, VELABEAM
                  DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that the Service will be uninterrupted, error-free, or
                  secure, or that any defects will be corrected. We do not make any warranties
                  regarding the accuracy, reliability, or completeness of any content
                  available through the Service.
                </p>
                <p>
                  <strong style={{ color: ink }}>Limitation of Damages.</strong> TO THE MAXIMUM
                  EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL VELABEAM, ITS
                  DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE
                  FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
                  INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO
                  USE THE SERVICE.
                </p>
                <p>
                  IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY EXCEED THE AMOUNT YOU HAVE
                  PAID TO VELABEAM IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT
                  GIVING RISE TO THE CLAIM. THIS LIMITATION APPLIES REGARDLESS OF THE THEORY
                  OF LIABILITY, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY,
                  OR OTHERWISE.
                </p>
              </div>
            </section>

            {/* ── Termination ──────────────────────────────────── */}
            <section id="termination" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Termination
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  Either you or VelaBeam may terminate your account and these Terms at any
                  time, with or without cause, by providing written notice to the other party.
                </p>
                <p>
                  You may terminate your account at any time by contacting us at{" "}
                  <a
                    href="mailto:support@velabeam.com"
                    className="underline transition-colors duration-150"
                    style={{ color: violet }}
                  >
                    support@velabeam.com
                  </a>{" "}
                  or by using the account deletion feature available in your dashboard. Upon
                  termination, your access to the Service will be revoked and your User
                  Content will be deleted from our active systems within 30 days, except as
                  otherwise required by law.
                </p>
                <p>
                  We may suspend or terminate your account immediately, without prior notice,
                  if we determine that you have violated these Terms, engaged in fraudulent or
                  illegal activity, or if your actions pose a risk to the Service or other
                  users. We will make reasonable efforts to notify you of any termination
                  unless prohibited by law or court order.
                </p>
                <p>
                  Upon termination, all provisions of these Terms that by their nature should
                  survive termination shall survive, including ownership provisions, warranty
                  disclaimers, indemnification obligations, and limitations of liability. Any
                  outstanding fees owed to VelaBeam remain due and payable after termination.
                </p>
              </div>
            </section>

            {/* ── Governing Law ────────────────────────────────── */}
            <section id="governing-law" className="mb-12">
              <h2
                className="mb-4 font-heading text-[24px] font-bold leading-tight tracking-tight"
                style={{ color: ink }}
              >
                Governing Law
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed" style={{ color: mute }}>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of
                  the State of California, United States, without regard to its conflict of
                  law principles.
                </p>
                <p>
                  Any dispute arising out of or relating to these Terms or the Service shall
                  be resolved exclusively in the state or federal courts located in San
                  Francisco County, California. You consent to the personal jurisdiction of
                  these courts and waive any objection to venue in such courts.
                </p>
                <p>
                  You agree that any dispute resolution proceedings will be conducted only on
                  an individual basis and not in a class, consolidated, or representative
                  action. If for any reason a claim proceeds in court rather than arbitration,
                  you and VelaBeam each waive the right to a jury trial.
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
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#FFFFFF", border: `1px solid ${line}` }}
                >
                  <p className="mb-1 font-body text-base" style={{ color: ink }}>
                    VelaBeam Legal Team
                  </p>
                  <p className="font-body text-base">
                    Email:{" "}
                    <a
                      href="mailto:legal@velabeam.com"
                      className="underline transition-colors duration-150"
                      style={{ color: violet }}
                    >
                      legal@velabeam.com
                    </a>
                  </p>
                </div>
                <p>
                  We aim to respond to all legal inquiries within 5 business days.
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
