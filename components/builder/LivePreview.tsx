"use client";

import RestaurantTemplate from "@/components/templates/restaurant";
import DentistTemplate from "@/components/templates/dentist";
import SalonTemplate from "@/components/templates/salon";
import PlumberTemplate from "@/components/templates/plumber";
import RooferTemplate from "@/components/templates/roofer";
import AutoTemplate from "@/components/templates/auto";
import GenericTemplate from "@/components/templates/generic";

interface SiteData {
  heroTitle: string;
  heroSubtitle?: string;
  about?: string;
  services: string[];
  phone?: string;
  email?: string;
  address?: string;
  hours?: Record<string, string>;
}

interface SiteBrand {
  primaryColor: string;
  accentColor: string;
  fontPair: string;
  logoUrl?: string;
}

const templateMap: Record<string, React.ComponentType<{ data: any }>> = {
  restaurant: RestaurantTemplate,
  dentist: DentistTemplate,
  salon: SalonTemplate,
  plumber: PlumberTemplate,
  roofer: RooferTemplate,
  auto: AutoTemplate,
  generic: GenericTemplate,
};

interface LivePreviewProps {
  templateKey: string;
  data: SiteData;
  brand: SiteBrand;
}

export default function LivePreview({ templateKey, data, brand }: LivePreviewProps) {
  const TemplateComponent = templateMap[templateKey] ?? GenericTemplate;

  const slug = (data.heroTitle || "yoursite")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div className="overflow-hidden rounded-xl border border-[#ECE6DE] bg-white shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-[#ECE6DE] bg-[#FBF7F2] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF6B5B]" />
          <span className="h-3 w-3 rounded-full bg-[#F5B544]" />
          <span className="h-3 w-3 rounded-full bg-[#4ECDC4]" />
        </div>
        <div className="flex-1 rounded-md border border-[#ECE6DE] bg-white px-3 py-1 text-center text-xs text-[#6B6480]">
          {slug || "yoursite"}.velabeam.app
        </div>
      </div>
      <div
        className="min-h-[500px] overflow-auto"
        style={
          {
            "--primary": brand.primaryColor,
            "--accent": brand.accentColor,
          } as React.CSSProperties
        }
      >
        <TemplateComponent data={data as any} />
      </div>
    </div>
  );
}
