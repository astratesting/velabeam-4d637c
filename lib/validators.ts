import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const onboardingStep1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  agencyName: z.string().min(2, "Agency name must be at least 2 characters"),
  role: z.enum(["solo", "agency"]),
});

export const onboardingStep3Schema = z.object({
  cities: z.array(z.string()).min(1, "Pick at least 1 city"),
  categories: z.array(z.string()).min(1, "Pick at least 1 category"),
});

export const siteDataSchema = z.object({
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().optional(),
  about: z.string().optional(),
  services: z.array(z.string()),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  hours: z.record(z.string()).optional(),
  socialLinks: z.record(z.string()).optional(),
});

export const changeRequestSchema = z.object({
  body: z.string().min(10, "Please describe the change in at least 10 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type OnboardingStep1 = z.infer<typeof onboardingStep1Schema>;
export type OnboardingStep3 = z.infer<typeof onboardingStep3Schema>;
export type SiteData = z.infer<typeof siteDataSchema>;
