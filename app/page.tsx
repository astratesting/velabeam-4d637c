import Nav from "@/components/layout/Nav";
import Hero from "@/components/marketing/Hero";
import FeatureRow from "@/components/marketing/FeatureRow";
import PricingCards from "@/components/marketing/PricingCards";
import FAQ from "@/components/marketing/FAQ";
import Footer from "@/components/marketing/Footer";
import { AnchorDivider } from "@/components/illustrations/AnchorDivider";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-6">
          <AnchorDivider className="my-16" />
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-center text-[#1B1530] mb-4">
            Everything you need to ship fast
          </h2>
          <p className="text-center text-[#6B6480] text-lg mb-12 max-w-2xl mx-auto">
            Three powerful tools, one simple workflow.
          </p>
          <FeatureRow />
          <AnchorDivider className="my-16" />
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-center text-[#1B1530] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-[#6B6480] text-lg mb-12 max-w-2xl mx-auto">
            Start free for 14 days. No credit card required.
          </p>
          <PricingCards />
          <AnchorDivider className="my-16" />
          <div id="faq" className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-center text-[#1B1530] mb-4">
              Questions? We&apos;ve got answers.
            </h2>
            <p className="text-center text-[#6B6480] text-lg mb-12">
              Everything you need to know about VelaBeam.
            </p>
            <FAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
