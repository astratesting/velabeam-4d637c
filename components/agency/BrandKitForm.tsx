"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Upload, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const line = "#ECE6DE";

/* ─── Preset swatches ─── */
const presetColors = [
  { label: "Violet", value: "#6B4FE0" },
  { label: "Coral", value: "#FF6B5B" },
  { label: "Honey", value: "#F5B544" },
];

/* ─── Font pair options ─── */
const fontPairOptions = [
  { value: "manrope-source", label: "Manrope + Source Sans" },
  { value: "inter", label: "Inter" },
  { value: "playfair", label: "Playfair Display" },
];

/* ─── Types ─── */
export interface BrandKitValues {
  logoUrl?: string;
  accentColor: string;
  fromName: string;
  fontPair: string;
}

export interface BrandKitFormProps {
  onSave: (values: BrandKitValues) => void;
}

/* ─── Component ─── */
export function BrandKitForm({ onSave }: BrandKitFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState(presetColors[0].value);
  const [customHex, setCustomHex] = useState("");
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [fromName, setFromName] = useState("");
  const [fontPair, setFontPair] = useState(fontPairOptions[0].value);

  function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handlePresetClick(hex: string) {
    setIsCustomColor(false);
    setAccentColor(hex);
    setCustomHex("");
  }

  function handleCustomHexChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setCustomHex(val);
    setIsCustomColor(true);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setAccentColor(val);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      logoUrl: logoPreview ?? undefined,
      accentColor,
      fromName,
      fontPair,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Logo Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: ink }}>
          Logo
        </label>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center w-20 h-20 rounded-xl border-2 border-dashed overflow-hidden"
            style={{
              borderColor: logoPreview ? violet : line,
              backgroundColor: "#FBF7F2",
            }}
          >
            {logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <Upload size={20} style={{ color: mute }} />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={14} />
              Upload logo
            </Button>
            <span className="text-xs" style={{ color: mute }}>
              PNG, SVG, or WebP. Max 2 MB.
            </span>
          </div>
        </div>
      </div>

      {/* Accent Color */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: ink }}>
          Accent color
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          {presetColors.map((preset) => {
            const isSelected = !isCustomColor && accentColor === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => handlePresetClick(preset.value)}
                className="relative w-9 h-9 rounded-full cursor-pointer transition-transform hover:scale-110"
                style={{
                  backgroundColor: preset.value,
                  boxShadow: isSelected
                    ? `0 0 0 2px white, 0 0 0 4px ${preset.value}`
                    : "none",
                }}
                title={preset.label}
              >
                {isSelected && (
                  <Check
                    size={16}
                    className="absolute inset-0 m-auto"
                    style={{ color: "white" }}
                  />
                )}
              </button>
            );
          })}

          <div className="flex items-center gap-2 ml-2">
            <div
              className="w-9 h-9 rounded-full border shrink-0"
              style={{
                backgroundColor:
                  isCustomColor && /^#[0-9A-Fa-f]{6}$/.test(customHex)
                    ? customHex
                    : "#transparent",
                borderColor: line,
              }}
            />
            <Input
              placeholder="#6B4FE0"
              value={customHex}
              onChange={handleCustomHexChange}
              className="w-28 font-mono text-xs"
              maxLength={7}
            />
          </div>
        </div>
      </div>

      {/* From Name */}
      <Input
        label="From name"
        placeholder="Your Agency Name"
        value={fromName}
        onChange={(e) => setFromName(e.target.value)}
        helperText="Used as the sender name in emails to clients"
      />

      {/* Font Pair */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium" style={{ color: ink }}>
          Font pair
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {fontPairOptions.map((option) => {
            const isSelected = fontPair === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFontPair(option.value)}
                className="flex items-center justify-center px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-150"
                style={{
                  borderColor: isSelected ? violet : line,
                  backgroundColor: isSelected ? `${violet}10` : "white",
                  color: isSelected ? violet : ink,
                  boxShadow: isSelected ? `0 0 0 1px ${violet}` : "none",
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save */}
      <div className="pt-2">
        <Button type="submit" className="w-full sm:w-auto">
          Save brand settings
        </Button>
      </div>
    </form>
  );
}

export default BrandKitForm;
