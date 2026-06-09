"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ─── FAQ data ─── */
const faqs = [
  {
    question: "Do I own the sites I create?",
    answer:
      "Yes. Every site you publish is yours. You control the content, the domain, and the client relationship.",
  },
  {
    question: "Can I move a site off VelaBeam?",
    answer:
      "Yes. You can export the static HTML at any time. There's no lock-in.",
  },
  {
    question: "What if the business wants edits?",
    answer:
      "Your client gets a portal where they can request changes. You approve and publish.",
  },
  {
    question: "Do I need my own hosting?",
    answer:
      "No. VelaBeam hosts all published sites. You can also use a custom domain.",
  },
  {
    question: "How does lead scanning work?",
    answer:
      "VelaBeam scans public business listings to find companies without websites. You see results in your dashboard.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. 14 days of the Agency plan, no credit card required.",
  },
  {
    question: "Can I white-label the client portal?",
    answer:
      "Yes. Upload your logo, set your colors, and optionally use your own domain.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "You can subscribe to continue, or downgrade to keep access to existing sites.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="w-full bg-vb-bg">
      <div className="mx-auto max-w-[720px] px-6 py-20 lg:px-8">
        <h2
          className="mb-12 text-center font-heading text-[32px] font-bold leading-tight tracking-tight md:text-[40px]"
          style={{ color: "#1B1530" }}
        >
          Frequently asked questions
        </h2>

        <div
          className="divide-y rounded-2xl bg-white"
          style={{ borderColor: "#ECE6DE" }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question}>
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-vb-bg/60"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-heading text-base font-semibold leading-snug md:text-lg"
                    style={{ color: "#1B1530" }}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className="shrink-0 transition-transform duration-300 ease-in-out"
                    style={{
                      color: "#6B6480",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p
                    className="px-6 pb-5 font-body text-sm leading-relaxed md:text-base"
                    style={{ color: "#6B6480" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
