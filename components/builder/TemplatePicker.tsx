"use client";

import { Utensils, Smile, Scissors, Wrench, Home, Car, Globe } from "lucide-react";

interface TemplateOption {
  key: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const templates: TemplateOption[] = [
  {
    key: "restaurant",
    name: "Restaurant",
    description: "Menus, reservations, and mouth-watering photo galleries.",
    icon: Utensils,
  },
  {
    key: "dentist",
    name: "Dentist",
    description: "Appointments, services, and patient trust signals.",
    icon: Smile,
  },
  {
    key: "salon",
    name: "Salon",
    description: "Stylist profiles, booking, and before-and-after showcases.",
    icon: Scissors,
  },
  {
    key: "plumber",
    name: "Plumber",
    description: "Service areas, emergency callouts, and reviews.",
    icon: Wrench,
  },
  {
    key: "roofer",
    name: "Roofer",
    description: "Project galleries, estimates, and seasonal promotions.",
    icon: Home,
  },
  {
    key: "auto",
    name: "Auto Shop",
    description: "Service menus, certifications, and appointment scheduling.",
    icon: Car,
  },
  {
    key: "generic",
    name: "Generic",
    description: "A clean, flexible layout for any local business.",
    icon: Globe,
  },
];

interface TemplatePickerProps {
  selected: string;
  onSelect: (key: string) => void;
}

export default function TemplatePicker({ selected, onSelect }: TemplatePickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((tpl) => {
        const isSelected = selected === tpl.key;
        const Icon = tpl.icon;

        return (
          <button
            key={tpl.key}
            type="button"
            onClick={() => onSelect(tpl.key)}
            className={`flex flex-col items-start gap-3 rounded-xl border-2 p-5 text-left transition-all duration-150 cursor-pointer hover:shadow-md ${
              isSelected
                ? "border-[#6B4FE0] bg-[#6B4FE0]/[0.05]"
                : "border-[#ECE6DE] bg-white hover:border-[#6B6480]"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                isSelected
                  ? "bg-[#6B4FE0] text-white"
                  : "bg-[#FBF7F2] text-[#6B6480]"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p
                className={`font-semibold ${
                  isSelected ? "text-[#6B4FE0]" : "text-[#1B1530]"
                }`}
              >
                {tpl.name}
              </p>
              <p className="mt-1 text-sm text-[#6B6480]">{tpl.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
