"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

export interface SiteBrand {
  primaryColor: string;
  accentColor: string;
  fontPair: string;
  logoUrl?: string;
}

const presetColors = [
  { label: "Violet", value: "#6B4FE0" },
  { label: "Coral", value: "#FF6B5B" },
  { label: "Teal", value: "#4ECDC4" },
];

const fontOptions = [
  "Manrope + Source Sans 3",
  "Inter",
  "Playfair Display + Source Sans 3",
];

interface BrandEditorProps {
  brand: SiteBrand;
  onChange: (brand: SiteBrand) => void;
}

export default function BrandEditor({ brand, onChange }: BrandEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hexInput, setHexInput] = useState(brand.primaryColor);

  function update<K extends keyof SiteBrand>(key: K, value: SiteBrand[K]) {
    onChange({ ...brand, [key]: value });
  }

  function handlePresetClick(color: string) {
    setHexInput(color);
    update("primaryColor", color);
  }

  function handleHexChange(value: string) {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      update("primaryColor", value);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    update("logoUrl", url);
  }

  return (
    <div className="space-y-6">
      {/* Primary Color */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#1B1530]">
          Primary Color
        </label>
        <div className="flex items-center gap-3">
          {presetColors.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => handlePresetClick(preset.value)}
              className={`h-9 w-9 rounded-full border-2 transition-all ${
                brand.primaryColor === preset.value
                  ? "border-[#1B1530] scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: preset.value }}
              title={preset.label}
              aria-label={`Select ${preset.label} color`}
            />
          ))}
          <div className="relative ml-2">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6B6480]">
              #
            </span>
            <input
              type="text"
              value={hexInput.replace("#", "")}
              onChange={(e) => handleHexChange(`#${e.target.value}`)}
              maxLength={6}
              className="w-28 rounded-lg border border-[#ECE6DE] bg-white py-2 pl-7 pr-3 text-sm text-[#1B1530] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
              placeholder="6B4FE0"
            />
          </div>
        </div>
      </div>

      {/* Font Pair */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Font Pair
        </label>
        <select
          value={brand.fontPair}
          onChange={(e) => update("fontPair", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Logo
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#ECE6DE] bg-[#FBF7F2] px-4 py-6 transition-colors hover:border-[#6B4FE0]"
        >
          {brand.logoUrl ? (
            <img
              src={brand.logoUrl}
              alt="Logo preview"
              className="h-16 w-16 rounded-lg object-contain"
            />
          ) : (
            <>
              <Upload className="h-6 w-6 text-[#6B6480]" />
              <span className="text-sm text-[#6B6480]">
                Click to upload logo
              </span>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
