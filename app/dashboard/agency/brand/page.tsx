"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Palette,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";

interface BrandKit {
  logoUrl: string | null;
  accentColor: string;
  fromName: string;
  fontPair: string;
}

const PRESET_COLORS = ["#6B4FE0", "#FF6B5B", "#F5B544", "#10B981", "#3B82F6"];

export default function BrandKitPage() {
  const router = useRouter();
  const [brandKit, setBrandKit] = useState<BrandKit>({
    logoUrl: null,
    accentColor: "#6B4FE0",
    fromName: "",
    fontPair: "manrope-source",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchBrandKit() {
      try {
        const res = await fetch("/api/agency/brand");
        if (res.ok) {
          const data = await res.json();
          setBrandKit(data);
        }
      } catch {
        // Use defaults
      }
    }
    fetchBrandKit();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/agency/brand", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brandKit),
      });
      if (res.ok) setSaved(true);
    } catch {
      // Save failed
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => router.push("/dashboard/agency")}
        className="inline-flex items-center gap-2 text-sm text-[#6B6480] hover:text-[#1B1530] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to agency settings
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#6B4FE0]/10 flex items-center justify-center">
          <Palette className="w-5 h-5 text-[#6B4FE0]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1B1530]">Brand kit</h1>
          <p className="text-sm text-[#6B6480]">
            Customize your agency branding across all published sites
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 space-y-6">
        {/* Logo */}
        <div>
          <label className="text-sm font-medium text-[#1B1530] mb-2 block">
            Agency logo
          </label>
          <div className="border-2 border-dashed border-[#ECE6DE] rounded-xl p-8 text-center hover:border-[#6B4FE0]/30 transition-colors">
            {brandKit.logoUrl ? (
              <div className="relative inline-block">
                <img
                  src={brandKit.logoUrl}
                  alt="Logo"
                  className="max-h-16 mx-auto"
                />
                <button
                  onClick={() =>
                    setBrandKit((prev) => ({ ...prev, logoUrl: null }))
                  }
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#FF6B5B] text-white flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <Upload className="w-8 h-8 text-[#6B6480] mx-auto mb-2" />
                <span className="text-sm text-[#6B6480]">
                  Click to upload your agency logo
                </span>
                <p className="text-xs text-[#6B6480]/70 mt-1">
                  PNG, SVG, or JPG. Max 2MB.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setBrandKit((prev) => ({ ...prev, logoUrl: url }));
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="text-sm font-medium text-[#1B1530] mb-2 block">
            Accent color
          </label>
          <div className="flex items-center gap-3">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setBrandKit((prev) => ({ ...prev, accentColor: color }))
                }
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  brandKit.accentColor === color
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
                value={brandKit.accentColor}
                onChange={(e) =>
                  setBrandKit((prev) => ({
                    ...prev,
                    accentColor: e.target.value,
                  }))
                }
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
          </div>
          <p className="text-xs text-[#6B6480] mt-2">
            This color will be used as the primary accent across all your
            published sites.
          </p>
        </div>

        {/* From Name */}
        <div>
          <label className="text-sm font-medium text-[#1B1530] mb-1.5 block">
            From name
          </label>
          <input
            type="text"
            value={brandKit.fromName}
            onChange={(e) =>
              setBrandKit((prev) => ({ ...prev, fromName: e.target.value }))
            }
            className="w-full px-3 py-2 rounded-xl border border-[#ECE6DE] text-sm text-[#1B1530] focus:outline-none focus:ring-2 focus:ring-[#6B4FE0]/20 focus:border-[#6B4FE0]"
            placeholder="Your Agency Name"
          />
          <p className="text-xs text-[#6B6480] mt-1">
            Used in emails and client communications.
          </p>
        </div>

        {/* Font Pair */}
        <div>
          <label className="text-sm font-medium text-[#1B1530] mb-2 block">
            Default font pair
          </label>
          <div className="space-y-2">
            {[
              { key: "manrope-source", label: "Manrope + Source Sans 3" },
              { key: "inter", label: "Inter" },
              { key: "playfair", label: "Playfair + Lato" },
            ].map((fp) => (
              <button
                key={fp.key}
                onClick={() =>
                  setBrandKit((prev) => ({ ...prev, fontPair: fp.key }))
                }
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  brandKit.fontPair === fp.key
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

        {/* Save */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#ECE6DE]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl text-white font-semibold bg-[#6B4FE0] hover:bg-[#5a3fcf] transition-colors text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save brand kit"}
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Changes saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
