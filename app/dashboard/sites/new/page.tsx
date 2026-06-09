"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Palette,
  Type,
  Layout,
  Monitor,
  Smartphone,
  Upload,
  PartyPopper,
  X,
  Share2,
} from "lucide-react";

interface LeadData {
  businessName: string;
  category: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: Record<string, string> | null;
}

interface SiteForm {
  template: string;
  businessName: string;
  heroSubtitle: string;
  aboutText: string;
  services: string;
  phone: string;
  email: string;
  address: string;
  hours: Record<string, string>;
  accentColor: string;
  fontPair: string;
  logoUrl: string | null;
}

const TEMPLATES = [
  { key: "restaurant", name: "Restaurant", icon: "🍽️" },
  { key: "dentist", name: "Dentist", icon: "🦷" },
  { key: "salon", name: "Salon", icon: "💇" },
  { key: "plumber", name: "Plumber", icon: "🔧" },
  { key: "roofer", name: "Roofer", icon: "🏠" },
  { key: "auto", name: "Auto", icon: "🚗" },
  { key: "generic", name: "Generic", icon: "✨" },
];

const FONT_PAIRS = [
  { key: "manrope-source", label: "Manrope + Source Sans 3", heading: "Manrope", body: "Source Sans 3" },
  { key: "inter", label: "Inter", heading: "Inter", body: "Inter" },
  { key: "playfair", label: "Playfair + Lato", heading: "Playfair Display", body: "Lato" },
];

const PRESET_COLORS = ["#6B4FE0", "#FF6B5B", "#F5B544"];

export default function SiteBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  const [form, setForm] = useState<SiteForm>({
    template: "generic",
    businessName: "",
    heroSubtitle: "Professional services you can trust",
    aboutText: "",
    services: "",
    phone: "",
    email: "",
    address: "",
    hours: {
      Monday: "9:00 AM - 5:00 PM",
      Tuesday: "9:00 AM - 5:00 PM",
      Wednesday: "9:00 AM - 5:00 PM",
      Thursday: "9:00 AM - 5:00 PM",
      Friday: "9:00 AM - 5:00 PM",
      Saturday: "Closed",
      Sunday: "Closed",
    },
    accentColor: "#6B4FE0",
    fontPair: "manrope-source",
    logoUrl: null,
  });

  useEffect(() => {
    if (!leadId) return;
    async function fetchLead() {
      try {
        const res = await fetch(`/api/leads/${leadId}`);
        if (res.ok) {
          const lead: LeadData = await res.json();
          setForm((prev) => ({
            ...prev,
            businessName: lead.businessName || prev.businessName,
            phone: lead.phone || prev.phone,
            email: lead.email || prev.email,
            address: lead.address || prev.address,
            hours: lead.hours || prev.hours,
            heroSubtitle: `Welcome to ${lead.businessName}`,
          }));
        }
      } catch {
        // Use defaults
      }
    }
    fetchLead();
  }, [leadId]);

  const updateForm = useCallback((updates: Partial<SiteForm>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Draft", leadId }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/sites/${data.id}`);
      }
    } catch {
      // Save failed
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    setPublishing(true);
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "Draft", leadId }),
      });
      if (res.ok) {
        const data = await res.json();
        const pubRes = await fetch(`/api/sites/${data.id}/publish`, {
          method: "POST",
        });
        if (pubRes.ok) {
          const pubData = await pubRes.json();
          setPublishedUrl(pubData.url || `https://${data.slug}.velabeam.app`);
          setShowSuccess(true);
        }
      }
    } catch {
      // Publish failed
    } finally {
      setPublishing(false);
    }
  }

  const currentFontPair = FONT_PAIRS.find((f) => f.key === form.fontPair) || FONT_PAIRS[0];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/sites")}
          className="text-[#6B6480] hover:text-[#1B1530] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-[#1B1530]">
          {leadId ? "Generate site" : "New site"}
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {[
          { num: 1, label: "Template", icon: Layout },
          { num: 2, label: "Content", icon: Type },
          { num: 3, label: "Brand", icon: Palette },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <button
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                step === s.num
                  ? "bg-[#6B4FE0] text-white"
                  : step > s.num
                  ? "bg-[#6B4FE0]/10 text-[#6B4FE0]"
                  : "bg-[#ECE6DE] text-[#6B6480]"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
            {i < 2 && <div className="w-8 h-px bg-[#ECE6DE]" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Form */}
        <div className="lg:w-[40%] space-y-6">
          {/* Step 1: Template */}
          {step === 1 && (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
              <h2 className="text-lg font-semibold text-[#1B1530] mb-4">
                Choose a template
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => updateForm({ template: t.key })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      form.template === t.key
                        ? "border-[#6B4FE0] bg-[#6B4FE0]/5"
                        : "border-[#ECE6DE] hover:border-[#6B4FE0]/30"
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <p className="text-sm font-medium text-[#1B1530] mt-2">
                      {t.name}
                    </p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full px-4 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm flex items-center justify-center gap-2"
              >
                Next: Content
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Content */}
          {step === 2 && (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[#1B1530] mb-2">
                Site content
              </h2>

              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                  Business name
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => updateForm({ businessName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                  Hero subtitle
                </label>
                <input
                  type="text"
                  value={form.heroSubtitle}
                  onChange={(e) => updateForm({ heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                  placeholder="Tagline or subtitle"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                  About text
                </label>
                <textarea
                  value={form.aboutText}
                  onChange={(e) => updateForm({ aboutText: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0] resize-none"
                  placeholder="Tell visitors about this business..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                  Services
                </label>
                <input
                  type="text"
                  value={form.services}
                  onChange={(e) => updateForm({ services: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                  placeholder="Comma-separated services"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm({ phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
                  Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateForm({ address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                  placeholder="123 Main St, City, State"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-2 block">
                  Business hours
                </label>
                <div className="space-y-2">
                  {Object.entries(form.hours).map(([day, time]) => (
                    <div key={day} className="flex items-center gap-2">
                      <span className="text-xs text-[#6B6480] w-20 shrink-0">
                        {day}
                      </span>
                      <input
                        type="text"
                        value={time}
                        onChange={(e) =>
                          updateForm({
                            hours: { ...form.hours, [day]: e.target.value },
                          })
                        }
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#ECE6DE] text-xs text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Next: Brand
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Brand */}
          {step === 3 && (
            <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-6">
              <h2 className="text-lg font-semibold text-[#1B1530]">
                Branding
              </h2>

              {/* Color */}
              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-2 block">
                  Accent color
                </label>
                <div className="flex items-center gap-3">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateForm({ accentColor: color })}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        form.accentColor === color
                          ? "border-[#1B1530] scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-xs text-[#6B6480]">Custom</span>
                    <input
                      type="color"
                      value={form.accentColor}
                      onChange={(e) =>
                        updateForm({ accentColor: e.target.value })
                      }
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Font Pair */}
              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-2 block">
                  Font pair
                </label>
                <div className="space-y-2">
                  {FONT_PAIRS.map((fp) => (
                    <button
                      key={fp.key}
                      onClick={() => updateForm({ fontPair: fp.key })}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                        form.fontPair === fp.key
                          ? "border-[#6B4FE0] bg-[#6B4FE0]/5"
                          : "border-[#ECE6DE] hover:border-[#6B4FE0]/30"
                      }`}
                    >
                      <span className="text-sm font-medium text-[#1B1530]">
                        {fp.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="text-sm font-medium text-[#1B1530] mb-2 block">
                  Logo
                </label>
                <div className="border-2 border-dashed border-[#ECE6DE] rounded-xl p-6 text-center hover:border-[#6B4FE0]/30 transition-colors">
                  {form.logoUrl ? (
                    <div className="relative">
                      <img
                        src={form.logoUrl}
                        alt="Logo"
                        className="max-h-16 mx-auto"
                      />
                      <button
                        onClick={() => updateForm({ logoUrl: null })}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FF6B5B] text-white flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-6 h-6 text-[#6B6480] mx-auto mb-2" />
                      <span className="text-sm text-[#6B6480]">
                        Click to upload logo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            updateForm({ logoUrl: url });
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium text-sm disabled:opacity-50"
                >
                  Save draft
                </button>
                <button
                  onClick={handlePublish}
                  disabled={publishing || !form.businessName}
                  className="flex-1 px-4 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {publishing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publishing...
                    </span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Publish to {form.businessName.toLowerCase().replace(/\s+/g, "-") || "site"}
                      .velabeam.app
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Live Preview */}
        <div className="lg:w-[60%]">
          <div className="rounded-2xl border border-[#ECE6DE] bg-white overflow-hidden">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F5F2EE] border-b border-[#ECE6DE]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF6B5B]" />
                <div className="w-3 h-3 rounded-full bg-[#F5B544]" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-lg px-3 py-1 text-xs text-[#6B6480] text-center">
                  {form.businessName
                    ? `${form.businessName.toLowerCase().replace(/\s+/g, "-")}.velabeam.app`
                    : "your-site.velabeam.app"}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    previewDevice === "desktop"
                      ? "bg-white text-[#6B4FE0]"
                      : "text-[#6B6480]"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    previewDevice === "mobile"
                      ? "bg-white text-[#6B4FE0]"
                      : "text-[#6B6480]"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div
              className={`mx-auto transition-all ${
                previewDevice === "mobile" ? "max-w-sm" : "max-w-full"
              }`}
            >
              <SitePreview form={form} fontPair={currentFontPair} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ECE6DE] px-6 py-4 flex items-center justify-between z-40">
        <button
          onClick={() => router.push("/dashboard/sites")}
          className="text-sm text-[#6B6480] hover:text-[#1B1530] transition-colors"
        >
          Cancel
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium text-sm disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing || !form.businessName}
            className="px-5 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {publishing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publishing...
              </span>
            ) : (
              <>
                Publish to {form.businessName.toLowerCase().replace(/\s+/g, "-") || "site"}
                .velabeam.app
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F5B544]/20 flex items-center justify-center mx-auto mb-4">
              <PartyPopper className="w-8 h-8 text-[#F5B544]" />
            </div>
            <h2 className="text-xl font-bold text-[#1B1530] mb-2">
              Site published!
            </h2>
            <p className="text-sm text-[#6B6480] mb-6">
              Your site is live at{" "}
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B4FE0] font-medium hover:underline"
              >
                {publishedUrl}
              </a>
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm"
              >
                View live site
              </a>
              <button
                onClick={() => {
                  const subject = encodeURIComponent(
                    `Your new website is live!`
                  );
                  const body = encodeURIComponent(
                    `Hi! Your new website is live at ${publishedUrl}. Check it out!`
                  );
                  window.open(`mailto:?subject=${subject}&body=${body}`);
                }}
                className="px-4 py-2.5 rounded-xl border border-[#ECE6DE] text-[#1B1530] font-medium text-sm flex items-center justify-center gap-2 hover:border-[#6B4FE0]/30 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share with client
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  router.push("/dashboard/sites");
                }}
                className="text-sm text-[#6B6480] hover:text-[#1B1530] transition-colors"
              >
                Back to sites
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SitePreview({
  form,
  fontPair,
}: {
  form: SiteForm;
  fontPair: (typeof FONT_PAIRS)[0];
}) {
  const services = form.services
    ? form.services.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="min-h-[600px]"
      style={
        {
          "--accent": form.accentColor,
          fontFamily: fontPair.body,
        } as React.CSSProperties
      }
    >
      {/* Hero */}
      <div
        className="p-8 text-center text-white"
        style={{ backgroundColor: form.accentColor }}
      >
        {form.logoUrl && (
          <img
            src={form.logoUrl}
            alt="Logo"
            className="max-h-12 mx-auto mb-4"
          />
        )}
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: fontPair.heading }}
        >
          {form.businessName || "Business Name"}
        </h1>
        <p className="text-white/80 text-sm">{form.heroSubtitle}</p>
      </div>

      {/* About */}
      {form.aboutText && (
        <div className="p-6">
          <h2
            className="text-lg font-semibold text-[#1B1530] mb-2"
            style={{ fontFamily: fontPair.heading }}
          >
            About
          </h2>
          <p className="text-sm text-[#6B6480] leading-relaxed">
            {form.aboutText}
          </p>
        </div>
      )}

      {/* Services */}
      {services.length > 0 && (
        <div className="px-6 pb-6">
          <h2
            className="text-lg font-semibold text-[#1B1530] mb-3"
            style={{ fontFamily: fontPair.heading }}
          >
            Services
          </h2>
          <div className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${form.accentColor}15`,
                  color: form.accentColor,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div className="px-6 pb-6">
        <h2
          className="text-lg font-semibold text-[#1B1530] mb-3"
          style={{ fontFamily: fontPair.heading }}
        >
          Contact
        </h2>
        <div className="space-y-2 text-sm text-[#6B6480]">
          {form.phone && <p>Phone: {form.phone}</p>}
          {form.email && <p>Email: {form.email}</p>}
          {form.address && <p>Address: {form.address}</p>}
        </div>
      </div>

      {/* Hours */}
      {form.hours && Object.keys(form.hours).length > 0 && (
        <div className="px-6 pb-6">
          <h2
            className="text-lg font-semibold text-[#1B1530] mb-3"
            style={{ fontFamily: fontPair.heading }}
          >
            Hours
          </h2>
          <div className="space-y-1">
            {Object.entries(form.hours).map(([day, time]) => (
              <div
                key={day}
                className="flex justify-between text-sm text-[#6B6480]"
              >
                <span>{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="p-4 text-center text-xs text-white/70"
        style={{ backgroundColor: form.accentColor }}
      >
        Powered by VelaBeam
      </div>
    </div>
  );
}
