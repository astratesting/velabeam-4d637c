"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Rocket,
  Users,
  Globe,
  Building2,
  CreditCard,
  ChevronRight,
  MessageCircle,
  BookOpen,
} from "lucide-react";

interface ArticleCategory {
  key: string;
  label: string;
  icon: React.ElementType;
  articles: { title: string; href: string }[];
}

const CATEGORIES: ArticleCategory[] = [
  {
    key: "getting-started",
    label: "Getting Started",
    icon: Rocket,
    articles: [
      { title: "How to set up your agency", href: "#" },
      { title: "Connecting your first lead source", href: "#" },
      { title: "Understanding the dashboard", href: "#" },
      { title: "Quick start guide", href: "#" },
    ],
  },
  {
    key: "lead-management",
    label: "Lead Management",
    icon: Users,
    articles: [
      { title: "Scanning for local leads", href: "#" },
      { title: "Importing leads from CSV", href: "#" },
      { title: "Lead status workflow", href: "#" },
      { title: "Filtering and searching leads", href: "#" },
    ],
  },
  {
    key: "site-builder",
    label: "Site Builder",
    icon: Globe,
    articles: [
      { title: "Choosing a template", href: "#" },
      { title: "Customizing site content", href: "#" },
      { title: "Publishing and sharing sites", href: "#" },
    ],
  },
  {
    key: "client-portal",
    label: "Client Portal",
    icon: Building2,
    articles: [
      { title: "Setting up the client portal", href: "#" },
      { title: "White-label configuration", href: "#" },
      { title: "Client communication tools", href: "#" },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    icon: CreditCard,
    articles: [
      { title: "Understanding plans and pricing", href: "#" },
      { title: "Managing client invoices", href: "#" },
      { title: "Payment methods and payouts", href: "#" },
    ],
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = CATEGORIES.map((cat) => ({
    ...cat,
    articles: cat.articles.filter((a) =>
      searchQuery
        ? a.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    ),
  })).filter((cat) => cat.articles.length > 0);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1B1530] mb-2">
          Help center
        </h1>
        <p className="text-[#6B6480] mb-6">
          Find answers to common questions and learn how to get the most out of
          VelaBeam.
        </p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6480]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#ECE6DE] bg-white text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredCategories.map((category) => (
          <div
            key={category.key}
            className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-[#FBF7F2] border-b border-[#ECE6DE]">
              <category.icon className="w-5 h-5 text-[#6B4FE0]" />
              <h2 className="text-sm font-semibold text-[#1B1530]">
                {category.label}
              </h2>
            </div>
            <div className="divide-y divide-[#ECE6DE]">
              {category.articles.map((article, i) => (
                <a
                  key={i}
                  href={article.href}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-[#FBF7F2] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#6B6480]" />
                    <span className="text-sm text-[#1B1530] group-hover:text-[#6B4FE0] transition-colors">
                      {article.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B6480] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Book a call CTA */}
      <div className="rounded-2xl border border-[#6B4FE0]/20 bg-[#6B4FE0]/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-6 h-6 text-[#6B4FE0] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-[#1B1530]">
              Book a 15-min onboarding call
            </h3>
            <p className="text-sm text-[#6B6480] mt-1">
              Get a personal walkthrough of VelaBeam. We will help you set up
              your agency and find your first leads.
            </p>
          </div>
        </div>
        <button className="px-6 py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] hover:opacity-90 transition-opacity text-sm shrink-0">
          Book a call
        </button>
      </div>

      {/* No results */}
      {filteredCategories.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="w-8 h-8 text-[#6B6480] mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-[#1B1530] mb-1">
            No results found
          </h3>
          <p className="text-sm text-[#6B6480]">
            Try a different search term or browse the categories above.
          </p>
        </div>
      )}
    </div>
  );
}
