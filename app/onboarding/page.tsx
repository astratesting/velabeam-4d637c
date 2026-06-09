"use client";

import { useState, useCallback, useRef, type FormEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/* ─── Warm Catalyst palette ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const ink = "#1B1530";
const mute = "#6B6480";
const bg = "#FBF7F2";
const line = "#ECE6DE";

const TOTAL_STEPS = 4;

const CITIES = [
  "Santa Monica",
  "Venice",
  "Manhattan Beach",
  "Redondo Beach",
  "Long Beach",
  "Marina del Rey",
  "El Segundo",
  "Hermosa Beach",
];

const CATEGORIES = [
  "Restaurant",
  "Dentist",
  "Salon",
  "Plumber",
  "Roofer",
  "Auto Shop",
  "Law Firm",
  "Chiropractor",
  "Veterinarian",
  "Landscaping",
  "HVAC",
  "Electrician",
];

const SWATCHES = [
  { label: "Violet", value: "#6B4FE0" },
  { label: "Coral", value: "#FF6B5B" },
  { label: "Honey", value: "#F5B544" },
];

/* ─── Confetti ─── */
function Confetti() {
  const colors = [violet, coral, honey, "#FF8FD0", "#5BDFE0", "#A78BFA"];
  const pieces = Array.from({ length: 60 }, (_, i) => {
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 2 + Math.random() * 2;
    const size = 6 + Math.random() * 8;
    const rotation = Math.random() * 360;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: "-10px",
          width: size,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: 1,
          transform: `rotate(${rotation}deg)`,
          animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
          opacity: 0.9,
        }}
      />
    );
  });

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {pieces}
      </div>
    </>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [complete, setComplete] = useState(false);

  /* Step 1 fields */
  const [name, setName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [role, setRole] = useState("");

  /* Step 2 fields */
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState(violet);
  const [customColor, setCustomColor] = useState("");
  const [domain, setDomain] = useState("");

  /* Step 3 fields */
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /* ─── Logo drag/drop ─── */
  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  /* ─── Multi-select toggles ─── */
  function toggleCity(city: string) {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  /* ─── Validation ─── */
  function validateStep(): boolean {
    const next: Record<string, string> = {};

    if (step === 1) {
      if (!name.trim()) next.name = "Your name is required.";
      if (!agencyName.trim()) next.agencyName = "Agency name is required.";
      if (!role) next.role = "Please select a role.";
    }

    if (step === 2) {
      const hex = customColor || accentColor;
      if (customColor && !/^#([0-9A-Fa-f]{3}){1,2}$/.test(customColor)) {
        next.customColor = "Enter a valid hex color (e.g. #FF6B5B).";
      }
      setAccentColor(hex);
    }

    if (step === 3) {
      if (selectedCities.length < 1 || selectedCities.length > 3) {
        next.cities = "Pick 1-3 cities.";
      }
      if (selectedCategories.length < 1 || selectedCategories.length > 3) {
        next.categories = "Pick 1-3 categories.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      setErrors({});
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  }

  /* ─── Completion ─── */
  async function handleComplete() {
    setSubmitting(true);

    try {
      const payload = {
        name,
        agencyName,
        role,
        accentColor,
        domain: domain || undefined,
        cities: selectedCities,
        categories: selectedCategories,
      };

      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* proceed regardless */
    }

    setSubmitting(false);
    setShowConfetti(true);
    setComplete(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 2500);
  }

  /* ─── Checkbox component ─── */
  function Checkbox({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) {
    return (
      <label
        className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 select-none"
        style={{
          borderColor: checked ? violet : line,
          backgroundColor: checked ? `${violet}08` : "white",
        }}
      >
        <div
          className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150"
          style={{
            borderColor: checked ? violet : line,
            backgroundColor: checked ? violet : "transparent",
          }}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <span className="text-sm font-medium" style={{ color: ink }}>
          {label}
        </span>
      </label>
    );
  }

  /* ─── Render ─── */
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: bg }}>
      {showConfetti && <Confetti />}

      <div className="flex flex-col items-center w-full max-w-[640px] mx-auto px-6 py-12">
        {/* ── Progress dots ── */}
        <div className="flex items-center gap-3 mb-10">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i + 1 <= step ? honey : line,
                boxShadow: i + 1 <= step ? `0 0 6px ${honey}60` : "none",
              }}
            />
          ))}
        </div>

        {/* ── Completion state ── */}
        {complete ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center mt-20">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: `linear-gradient(135deg, ${violet}, ${coral})` }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--vb-font-heading)", color: ink }}
            >
              You&apos;re ready!
            </h2>
            <p className="text-base mb-2" style={{ color: mute }}>
              Your agency is set up. Redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* ── Step content ── */}
            <div className="w-full flex-1">
              {/* STEP 1 — You */}
              {step === 1 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--vb-font-heading)", color: ink }}
                  >
                    You
                  </h2>
                  <p className="text-sm mb-8" style={{ color: mute }}>
                    Tell us a bit about yourself.
                  </p>

                  <div className="flex flex-col gap-5">
                    <Input
                      label="Your name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="Agency name"
                      placeholder="Coastal Digital"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      error={errors.agencyName}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-sm font-medium"
                        style={{ color: ink }}
                      >
                        Role
                      </label>
                      <div className="flex gap-3">
                        {["Solo developer", "Agency"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setRole(opt)}
                            className="flex-1 h-10 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer"
                            style={{
                              borderColor: role === opt ? violet : line,
                              backgroundColor: role === opt ? `${violet}10` : "white",
                              color: role === opt ? violet : ink,
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.role && (
                        <p className="text-xs font-medium" style={{ color: coral }}>
                          {errors.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 — Your brand */}
              {step === 2 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--vb-font-heading)", color: ink }}
                  >
                    Your brand
                  </h2>
                  <p className="text-sm mb-8" style={{ color: mute }}>
                    Customize how your agency looks.
                  </p>

                  <div className="flex flex-col gap-6">
                    {/* Logo upload */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium" style={{ color: ink }}>
                        Logo
                      </label>
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleFileSelect}
                        className="flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150 hover:border-violet"
                        style={{
                          borderColor: line,
                          backgroundColor: "white",
                        }}
                      >
                        {logoPreview ? (
                          <div className="flex flex-col items-center gap-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="w-16 h-16 object-contain rounded-lg"
                            />
                            <span className="text-xs" style={{ color: mute }}>
                              {logoFile?.name}
                            </span>
                          </div>
                        ) : (
                          <>
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={mute}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mb-2"
                            >
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span className="text-sm font-medium" style={{ color: mute }}>
                              Drop your logo here or click to upload
                            </span>
                          </>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    {/* Accent color */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium" style={{ color: ink }}>
                        Accent color
                      </label>
                      <div className="flex items-center gap-3">
                        {SWATCHES.map((sw) => (
                          <button
                            key={sw.value}
                            type="button"
                            onClick={() => {
                              setAccentColor(sw.value);
                              setCustomColor("");
                            }}
                            className="w-10 h-10 rounded-full border-2 transition-all duration-150 cursor-pointer"
                            style={{
                              backgroundColor: sw.value,
                              borderColor: accentColor === sw.value && !customColor ? ink : "transparent",
                              transform: accentColor === sw.value && !customColor ? "scale(1.15)" : "scale(1)",
                            }}
                            title={sw.label}
                          />
                        ))}
                        <div className="flex items-center gap-2 ml-2">
                          <Input
                            placeholder="#000000"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            className="w-28"
                            error={errors.customColor}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Domain */}
                    <Input
                      label="Agency domain"
                      placeholder="sites.youragency.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      helperText="Optional. Connect later if you prefer."
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 — Where you fish */}
              {step === 3 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--vb-font-heading)", color: ink }}
                  >
                    Where you fish
                  </h2>
                  <p className="text-sm mb-8" style={{ color: mute }}>
                    Pick 1-3 cities and 1-3 categories.
                  </p>

                  {/* Cities */}
                  <div className="mb-6">
                    <h3
                      className="text-sm font-semibold mb-3"
                      style={{ color: ink }}
                    >
                      Cities
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {CITIES.map((city) => (
                        <Checkbox
                          key={city}
                          label={city}
                          checked={selectedCities.includes(city)}
                          onChange={() => toggleCity(city)}
                        />
                      ))}
                    </div>
                    {errors.cities && (
                      <p className="text-xs font-medium mt-2" style={{ color: coral }}>
                        {errors.cities}
                      </p>
                    )}
                  </div>

                  {/* Categories */}
                  <div>
                    <h3
                      className="text-sm font-semibold mb-3"
                      style={{ color: ink }}
                    >
                      Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((cat) => (
                        <Checkbox
                          key={cat}
                          label={cat}
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                      ))}
                    </div>
                    {errors.categories && (
                      <p className="text-xs font-medium mt-2" style={{ color: coral }}>
                        {errors.categories}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4 — Payment */}
              {step === 4 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--vb-font-heading)", color: ink }}
                  >
                    Payment
                  </h2>
                  <p className="text-sm mb-8" style={{ color: mute }}>
                    Optional. Skip if you&apos;re not ready.
                  </p>

                  <div
                    className="rounded-xl p-6 border text-center"
                    style={{ borderColor: line, backgroundColor: "white" }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${honey}15` }}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={honey}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    </div>
                    <p className="text-sm mb-1 font-semibold" style={{ color: ink }}>
                      Add a payment method to continue after your 14-day trial.
                    </p>
                    <p className="text-xs mb-6" style={{ color: mute }}>
                      No charge until your trial ends. Cancel anytime.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        /* Simple toast via alert-style inline for now */
                        const el = document.createElement("div");
                        el.textContent = "Payment setup coming soon";
                        el.style.cssText = `
                          position:fixed;top:20px;right:20px;z-index:9999;
                          background:${honey}18;border-left:4px solid ${honey};
                          color:${ink};padding:12px 20px;border-radius:12px;
                          font-size:14px;font-weight:500;box-shadow:0 4px 12px rgba(0,0,0,0.1);
                        `;
                        document.body.appendChild(el);
                        setTimeout(() => el.remove(), 3000);
                      }}
                    >
                      Add card
                    </Button>
                  </div>

                  <p className="text-sm text-center mt-6" style={{ color: mute }}>
                    <button
                      type="button"
                      onClick={handleComplete}
                      className="font-semibold cursor-pointer transition-colors duration-150"
                      style={{ color: violet }}
                    >
                      Skip for now
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* ── Navigation buttons ── */}
            {step < 4 && (
              <div className="flex items-center justify-between gap-4 mt-10 w-full">
                {step > 1 ? (
                  <Button variant="ghost" size="lg" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                <Button variant="primary" size="lg" onClick={handleNext}>
                  Next
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="flex items-center justify-between gap-4 mt-10 w-full">
                <Button variant="ghost" size="lg" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  loading={submitting}
                  onClick={handleComplete}
                >
                  Finish
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
