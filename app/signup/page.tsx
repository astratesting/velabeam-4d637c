"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
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

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) {
      next.name = "Name is required.";
    }
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrors({ general: data?.message || "Something went wrong. Please try again." });
        setLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (signInRes?.error) {
        setErrors({ general: "Account created but sign-in failed. Please sign in manually." });
      } else {
        router.push("/dashboard");
      }
    } catch {
      setLoading(false);
      setErrors({ general: "Network error. Please check your connection and try again." });
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
    setGoogleLoading(false);
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: bg }}>
      {/* ── Left: Form column ── */}
      <div className="flex flex-col justify-center w-full max-w-[480px] px-8 sm:px-12 lg:px-16 py-12">
        <div className="w-full max-w-[360px] mx-auto">
          {/* Logo / brand */}
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--vb-font-heading)", color: ink }}
          >
            VelaBeam
          </h1>
          <p className="text-sm mb-8" style={{ color: mute }}>
            Create your account
          </p>

          {errors.general && (
            <div
              className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
              style={{ backgroundColor: `${coral}12`, color: coral, border: `1px solid ${coral}30` }}
            >
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label="Name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Create account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: line }} />
            <span className="text-xs font-medium" style={{ color: mute }}>
              Or continue with
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: line }} />
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border text-sm font-semibold transition-all duration-150 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              borderColor: line,
              backgroundColor: "white",
              color: ink,
            }}
          >
            {/* Google SVG icon */}
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 4.5 29.6 2.5 24 2.5 12.4 2.5 3 11.9 3 23.5S12.4 44.5 24 44.5c11 0 20.5-8 20.5-22 0-1.4-.2-2.5-.4-3.5z" fill="#FFC107"/>
              <path d="M5.3 14.7l7.4 5.4C14.5 16.2 18.9 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.5 29.6 3.5 24 3.5 15.6 3.5 8.4 8.2 5.3 14.7z" fill="#FF3D00"/>
              <path d="M24 44.5c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.5C29.5 35.7 26.9 36.5 24 36.5c-6.1 0-11.2-3.9-13-9.3l-7.4 5.7C6.5 39.1 14.6 44.5 24 44.5z" fill="#4CAF50"/>
              <path d="M44.5 20H24v8.5h11.8c-1 3.1-2.8 5.7-5.2 7.5l6.6 5.5c4.5-4.1 7.3-10.2 7.3-17.5 0-1.4-.2-2.5-.4-3.5z" fill="#1976D2"/>
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Footer links */}
          <p className="text-sm text-center mt-6" style={{ color: mute }}>
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold" style={{ color: violet }}>
              Sign in
            </Link>
          </p>

          <p className="text-xs text-center mt-4" style={{ color: mute }}>
            By continuing you agree to{" "}
            <Link href="/terms" style={{ color: violet }}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" style={{ color: violet }}>
              Privacy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* ── Right: Gradient panel ── */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${violet}, ${coral})`,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 400,
            height: 400,
            background: honey,
            top: -80,
            right: -80,
          }}
        />
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 250,
            height: 250,
            background: "white",
            bottom: -60,
            left: -60,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Sail illustration using styled divs */}
          <div className="relative mb-10" style={{ width: 140, height: 180 }}>
            {/* Sail */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "60px solid transparent",
                borderRight: "60px solid transparent",
                borderBottom: "140px solid rgba(255,255,255,0.25)",
                position: "absolute",
                bottom: 30,
                left: 10,
              }}
            />
            {/* Mast */}
            <div
              style={{
                width: 4,
                height: 160,
                backgroundColor: "rgba(255,255,255,0.5)",
                borderRadius: 2,
                position: "absolute",
                bottom: 10,
                left: 68,
              }}
            />
            {/* Hull */}
            <div
              style={{
                width: 120,
                height: 20,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "0 0 60px 60px",
                position: "absolute",
                bottom: 0,
                left: 10,
              }}
            />
            {/* Flag */}
            <div
              style={{
                width: 30,
                height: 20,
                backgroundColor: honey,
                opacity: 0.7,
                position: "absolute",
                top: 10,
                left: 70,
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
            />
          </div>

          <h2
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--vb-font-heading)", color: "white" }}
          >
            Welcome aboard
          </h2>
          <p className="text-base max-w-[300px]" style={{ color: "rgba(255,255,255,0.85)" }}>
            Launch your agency in minutes. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
