# VelaBeam — Complete Build Plan

## 1. PRODUCT

VelaBeam is an automated website creation platform that turns "I need a website" cold leads into deployed, hosted, branded sites with zero manual build time. Freelance web developers and 1–5 person agencies (the ICP from the $3.17B AI website builder market) log in, see a pipeline of local businesses that have been scanned and verified to lack a website, click one button to generate an industry-specific site, optionally white-label the agency, and hand it to the client from a built-in CRM. The specific pain it solves is the 9M US small businesses without a website and the freelancers/agencies who currently spend 6–15 hours per client on repetitive build work — VelaBeam collapses that to under 10 minutes per site while giving the agency a recurring revenue surface ($19–$39/mo hosting passed through or marked up).

## 2. WHO IT'S FOR

**Primary ICP:** Solo freelance web developers and tiny digital agencies (1–5 people) who pitch local businesses (restaurants, dentists, salons, plumbers, roofers, auto shops) and build their sites manually. They are price-sensitive, time-poor, allergic to enterprise UX, and want to (a) spend less time per build, (b) look more professional to clients, (c) earn recurring revenue without becoming a hosting company.

**How this shapes the product:**
- Dashboard opens on a single **Today** view with one primary CTA: "Find leads near me." No enterprise nav.
- Tone is direct, salesy, optimistic — "Ship 3 sites this afternoon" not "Orchestrate your digital pipeline."
- Every screen has a "what does this do in 10 seconds" explainer; no jargon.
- Agency branding is front-and-center (logo, color, domain) so the freelancer looks like the vendor, not VelaBeam.
- Pricing surfaces a 14-day trial of Agency tier with no card required.

## 3. LOOK & FEEL

**Visual system:**
- **Vibe:** Warm Catalyst — friendly, rounded, optimistic, illustrated. Soft, never clinical. Feels like a co-pilot, not a tool.
- **Palette:**
  - `--vb-bg`: `#FBF7F2` (warm off-white)
  - `--vb-surface`: `#FFFFFF`
  - `--vb-violet`: `#6B4FE0` (primary action)
  - `--vb-coral`: `#FF6B5B` (accent / warmth)
  - `--vb-honey`: `#F5B544` (highlight / success)
  - `--vb-ink`: `#1B1530` (text)
  - `--vb-mute`: `#6B6480` (secondary text)
  - `--vb-line`: `#ECE6DE` (borders)
  - Gradients: violet→coral for primary CTAs, honey→coral for "warm" badges.
- **Typography:** `Manrope` (headings, 600/700, tight tracking) + `Source Sans 3` (body, 400/500, generous line-height 1.6). Display sizes: 56/64 hero, 40/48 section, 24/30 card title, 16/24 body, 14/20 small.
- **Spacing:** 4px base unit; cards use 24px padding, sections 96px vertical, max-width 1200px, 12-col grid with 24px gutters.
- **Surfaces:** 16px radius on cards, 12px on inputs, 999px on pills. Shadows are warm-tinted: `0 8px 24px rgba(107, 79, 224, 0.08)`.
- **Iconography:** Lucide icons, 1.5px stroke, rounded line caps. Custom harbor motif (anchor, sail, lighthouse, beam, wave) used as section dividers and empty states.
- **Imagery:** Soft 3D illustrations (light pastel, rounded, friendly — no stock photos of "team meeting"). Saturated product mockups on the marketing site, muted device frames in-app.
- **Motion:** 200ms ease-out on hover, 400ms ease-in-out on page transitions, subtle 6s float on hero illustration. Skeleton loaders in honey. Confetti (violet + coral) on first site publish.

**Screen-by-screen layout:**

**Marketing home (`/`)**
- Sticky top nav: logo (sail + beam), links (Product, Pricing, For Agencies, Sign in), primary CTA "Start free trial."
- Hero: left = H1 "Ship a local business site in 10 minutes." subhead "Find businesses without websites. Generate a site with AI. Hand it to the client." primary CTA "Start free trial," secondary "Watch 90s demo." Right = floating browser mockup of a generated restaurant site with a violet beam sweeping across the harbor illustration below.
- Social proof bar: neutral "Built for solo developers and small agencies" + 3 logo placeholder slots labeled "Your agency name here" (no fake logos).
- Feature row: 3 cards — Lead Radar (violet), AI Builder (coral), White-label Client Hub (honey) — each with a 1-line value prop and a small illustration.
- "How it works" 3-step strip with harbor anchors between steps.
- Pricing preview: 2 cards (Agency $129/mo, Business hosting $29/mo) with "Most popular" honey ribbon on Agency.
- FAQ (8 questions, real objections: "Do I own the site?" "Can I move it?" "What if the business wants edits?")
- Footer: product / company / legal columns, status dot, copyright.

**Pricing (`/pricing`)**
- Two-tier toggle (Monthly | Annual −20%). Agency card on left, Business on right. Both show feature comparison table below. "Start 14-day trial" CTA on Agency; "Talk to sales" on Business (which is the per-site hosting tier, not a SaaS seat).

**Auth (`/signin`, `/signup`)**
- Single column, 480px wide, on the left; right side has a warm gradient panel with a "Welcome aboard" illustration. Email + password (or magic link), Google button, "By continuing you agree to Terms and Privacy." Inline validation, no full-page reloads.

**Onboarding (`/onboarding`)**
- 4 steps, progress dots in honey:
  1. **You** — name, agency name, role (solo / agency).
  2. **Your brand** — upload logo (drag-drop), pick a violet/coral/honey accent, agency domain (optional).
  3. **Where you fish** — pick 1–3 cities + 1–3 business categories (restaurants, dentists, etc.). This seeds the lead radar.
  4. **Payment** — optional, skippable. Adds card for after trial.
- Confetti + "You're ready" on completion → routed to dashboard.

**Dashboard home (`/dashboard`)**
- Top bar: agency logo (editable inline), search ("Search leads, clients, sites…"), notifications bell, avatar menu.
- Left rail (collapsible): Home, Leads, Sites, Clients, Agency, Billing, Help. Icons in violet, active item has a coral left bar and `--vb-bg` background.
- Main area = **Today**:
  - 3 stat tiles (Leads this week / Sites in progress / MRR) with delta arrows in honey.
  - Primary CTA card: "Scan for new leads in [your city]" with a violet→coral gradient button.
  - "Recent activity" feed (honey bullets).
  - "Next step" prompt: e.g. "You have 4 unviewed leads" with a single button.

**Leads (`/dashboard/leads`)**
- Map (left, 60%) + list (right, 40%) split. Map shows pins colored by status (new=violet, contacted=honey, won=coral, lost=mute). List rows: business name, category icon, "No website" badge (coral), distance, "Generate site" button.
- Filters: category, distance, has-phone, has-email, status.
- Row click → lead drawer (right slide-over) with scraped data (name, address, phone, hours, rating, social links) and primary action "Generate site."

**Site builder (`/dashboard/sites/new?leadId=...`)**
- 3-step wizard:
  1. **Template** — industry card grid (Restaurant, Dentist, Salon, Plumber, Roofer, Auto, Generic). Each card shows a mini preview.
  2. **Content** — auto-filled from lead data, editable inline. Sections: Hero, About, Services, Hours, Map, Contact, Testimonials (left empty with "Add manually" + "Skip").
  3. **Brand** — color picker, font pair (limited to Manrope/Source Sans/Inter/Playfair), logo upload.
- Live preview on the right (60% width desktop). Bottom bar: "Save draft" (ghost), "Publish to [client].velabeam.app" (primary violet). Publish triggers a 4-second confetti + success modal with the live URL and a "Share with client" email composer (pre-filled to the lead's email).

**Sites (`/dashboard/sites`)**
- Grid of site cards (thumbnail, business name, status pill: Draft/Live/Paused, MRR contribution, last edited). Top-right: "New site" button.

**Clients (`/dashboard/clients`)**
- Table view: business name, contact, site status, MRR, renewal date, last login. Row click → client detail page with tabs: Overview, Sites, Invoices, Messages, Files. A "White-label portal" toggle lets the client log in at the agency's own domain and see only their site, invoices, and a "Request change" form.

**Agency settings (`/dashboard/agency`)**
- Brand kit (logo, colors, font, email "from" name).
- Custom domain (CNAME instructions shown in a copy-pasteable code block).
- Team members (invite by email, role: Owner / Editor / Viewer).
- White-label email (uses agency's SMTP optional; default is VelaBeam relay with agency From name).
- Payout details (Stripe Connect).

**Billing (`/dashboard/billing`)**
- Current plan, MRR breakdown, invoice history, payment method, "Upgrade" / "Cancel" actions.

**Help (`/dashboard/help`)**
- Search + categorized articles + "Book a 15-min onboarding call" CTA.

**Public client portal (`/c/[agency]/[client]`)**
- White-labeled login → client's site preview, invoices, request-change form. Uses the agency's brand.

**Legal pages (`/privacy`, `/terms`)**
- Two-column layout: left sticky TOC, right scrolling content. Warm off-white background, no marketing chrome beyond the footer.

**404 / 500**
- Friendly harbor illustration + "This page drifted out to sea" + "Take me home" button.

## 4. USER FLOWS

**Flow A — Sign up → first site**
1. Land on `/` → click "Start free trial" → `/signup`.
2. Submit email + password (or Google) → NextAuth creates account, signs in, redirects to `/onboarding`.
3. Complete 4 onboarding steps → confetti → `/dashboard`.
4. Empty state shows "Scan for leads" CTA.
5. Click CTA → lead scan job runs (mock initially: returns 8 seeded local businesses with `has_website: false`) → `/dashboard/leads` populated.
6. Click a lead row → drawer opens → click "Generate site" → `/dashboard/sites/new`.
7. Pick template "Restaurant" → step 2 auto-fills name/address/phone from lead data → step 3 picks brand colors (violet default) → live preview renders.
8. Click "Publish" → site goes live at `{slug}.velabeam.app` → success modal with URL and share button.
9. Optionally: click "Email to client" → pre-filled mailto/email send → client receives white-labeled link.

**Flow B — Onboard agency + white-label**
1. `/dashboard/agency` → upload logo, set accent color, set custom domain `sites.youragency.com`.
2. Modal shows CNAME instructions; user adds DNS, clicks "Verify" → status flips to "Verified" (mock: auto-success).
3. New sites now publish to the custom domain. Client portal reads agency's brand.

**Flow C — Client management**
1. Site is live → row in `/dashboard/clients` shows MRR $29, renewal in 30 days.
2. Client logs in to portal, requests a change ("Update hours").
3. Request appears in agency dashboard as a honey badge on the client row.
4. Agency edits site, marks request done, client gets email.

**States to handle for every form/list:** loading (honey skeleton), empty (illustrated + single CTA), error (coral inline message), success (toast top-right, 3s).

## 5. PAGES / ROUTES

| Route | Purpose | Layout |
|---|---|---|
| `/` | Marketing home | Hero, features, pricing preview, FAQ, footer |
| `/pricing` | Full pricing | 2 tier cards + comparison table |
| `/for-agencies` | Pillar page | Benefits, testimonials (real, none yet — empty honest placeholders), CTA |
| `/features/lead-radar` | Feature detail | Long-form, illustrations, CTA |
| `/features/ai-builder` | Feature detail | Demo video embed, CTA |
| `/features/white-label` | Feature detail | Screenshot carousel, CTA |
| `/signin` | Sign in | Centered form + illustration panel |
| `/signup` | Sign up | Same |
| `/onboarding` | 4-step wizard | Stepper + step content + back/next |
| `/dashboard` | Today view | Stats + primary CTA + activity |
| `/dashboard/leads` | Lead pipeline | Map + list + filters |
| `/dashboard/leads/[id]` | Lead detail (drawer) | Slide-over |
| `/dashboard/sites` | Site list | Card grid |
| `/dashboard/sites/new` | Builder wizard | 3 steps + live preview |
| `/dashboard/sites/[id]` | Site editor | Inline edit + preview |
| `/dashboard/clients` | Client table | Table |
| `/dashboard/clients/[id]` | Client detail | Tabs |
| `/dashboard/agency` | Agency settings | Sections |
| `/dashboard/agency/brand` | Brand kit | Logo, colors, fonts |
| `/dashboard/agency/domain` | Custom domain | DNS instructions |
| `/dashboard/agency/team` | Team | Invite + role list |
| `/dashboard/billing` | Billing | Plan, invoices, payment |
| `/dashboard/help` | Help center | Search + articles |
| `/c/[agency]/[client]` | White-label client portal | Branded login → dashboard |
| `/c/[agency]/[client]/site` | Client's live site | Public |
| `/c/[agency]/[client]/billing` | Client invoices | Table |
| `/c/[agency]/[client]/requests` | Change requests | Form + history |
| `/privacy` | Privacy | TOC + content |
| `/terms` | Terms | TOC + content |
| `/api/auth/[...nextauth]` | NextAuth handler | NextAuth v5 |
| `/api/leads/scan` | POST trigger lead scan | JSON |
| `/api/leads` | GET/POST leads | JSON |
| `/api/sites` | GET/POST sites | JSON |
| `/api/sites/[id]/publish` | POST publish | JSON |
| `/api/clients` | GET/POST clients | JSON |
| `/api/billing/checkout` | POST Stripe checkout | JSON |
| `/api/webhooks/stripe` | Stripe webhook | JSON |
| `/404`, `/500` | Error pages | Illustrated |

## 6. CORE FEATURES

**F1 — Lead Radar (lead generation)**
- User picks city + categories in onboarding (editable later).
- "Scan" button triggers `/api/leads/scan` which (production) queries a places API; (MVP) returns 8–12 seeded `LocalBusiness` rows with `has_website: false`, real-looking but synthetic data.
- Each lead has: `id, name, category, address, city, lat, lng, phone, email, hours, rating, has_website, source, status, createdAt`.
- Map view uses Leaflet + OpenStreetMap tiles (no API key required) with custom harbor-pin markers.
- Filters: category, distance (slider), status, has-email, has-phone.
- "Generate site" button on each lead pre-fills the builder.

**F2 — AI Website Builder**
- 3-step wizard: template → content → brand.
- Templates are React components in `/components/templates/`: `restaurant.tsx`, `dentist.tsx`, `salon.tsx`, `plumber.tsx`, `roofer.tsx`, `auto.tsx`, `generic.tsx`. Each accepts a `SiteData` prop and renders a complete page.
- Content step auto-fills `SiteData` from lead fields (name → hero title, address → contact, phone → phone, hours → hours table, category → services list).
- Brand step: color (3 swatches + custom hex), font pair (Manrope+Source Sans default, Inter, Playfair), logo (drag-drop, stored in `/public/uploads/` for MVP, or S3 in prod).
- Live preview renders the selected template with current `SiteData` in a sandboxed iframe.
- "Publish" compiles to a static HTML snapshot stored at `sites/{slug}/index.html` (MVP) and serves it at `{slug}.velabeam.app` (production: Next.js subdomain routing via middleware + DNS wildcard).

**F3 — White-label Agency Tools**
- Per-agency `brand` object: `logoUrl, accentColor, fromName, customDomain, status`.
- Custom domain: user adds CNAME, system polls (or auto-verifies in MVP), flips `status: verified`. All client-facing pages and emails use the brand.
- Client portal at `/c/{agencySlug}/{clientSlug}` reads the agency brand from a server-side lookup and renders the agency's logo, colors, and domain in the browser tab.

**F4 — Client Management**
- Client = a `LocalBusiness` that has a published site. Fields: `id, agencyId, leadId, businessName, contactName, contactEmail, siteId, mrr, status (active/paused/churned), renewalAt, createdAt`.
- Dashboard shows MRR sum, renewals due in 7 days, open change requests.
- Client detail tabs: Overview, Sites, Invoices (list + download), Messages (simple thread), Files.
- Change request form: client submits text → appears in agency dashboard → agency resolves → client notified.

**F5 — Auth (NextAuth.js v5)**
- Email + password (Credentials provider with bcrypt hashing) + Google OAuth.
- Session via JWT, 30-day expiry, refreshed on activity.
- Role-based middleware: `/dashboard/*` requires signed-in user; `/c/[agency]/[client]/*` requires matching client session.
- On signup, a `User` row and an `Agency` row are created in a Prisma transaction; `User.agencyId` is set.

**F6 — Billing (Stripe)**
- Two products: `agency_monthly` ($129) and `agency_annual` ($1290), `business_hosting` ($29).
- `/api/billing/checkout` creates a Stripe Checkout session.
- `/api/webhooks/stripe` handles `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted` → updates `Agency.plan` and `Client.mrr`.
- Trial: 14 days, no card required to start; downgrade prompt at day 12.

**F7 — Onboarding**
- 4 persisted steps in `User.onboardingStep` (0–3) and `Agency.profileComplete` boolean.
- Skippable payment step, but the wizard can't be exited without completing the first 3.

## 7. DATA MODEL (Prisma)

```
User {
  id, email (unique), passwordHash, name, image, role (OWNER|EDITOR|VIEWER),
  agencyId, onboardingStep (0..3), createdAt
}

Agency {
  id, name, slug (unique), ownerId,
  brand: { logoUrl, accentColor, fromName, fontPair },
  customDomain (unique, nullable), customDomainStatus (pending|verified|failed),
  plan (TRIAL|AGENCY|BUSINESS), stripeCustomerId, planRenewsAt, createdAt
}

LocalBusiness (Lead) {
  id, agencyId, name, category, address, city, lat, lng,
  phone, email, hours (json), rating, hasWebsite, source,
  status (NEW|CONTACTED|WON|LOST), createdAt
}

Site {
  id, agencyId, clientId (nullable), leadId (nullable),
  slug (unique), templateKey, data (json), brand (json),
  status (DRAFT|LIVE|PAUSED), publishedAt, customDomain (nullable), createdAt
}

Client {
  id, agencyId, businessName, contactName, contactEmail,
  siteId, mrr, status (ACTIVE|PAUSED|CHURNED), renewalAt, createdAt
}

Invoice {
  id, agencyId, clientId (nullable), amount, currency, status,
  stripeInvoiceId, paidAt, createdAt
}

ChangeRequest {
  id, clientId, agencyId, body, status (OPEN|DONE), createdAt, resolvedAt
}

DomainVerification {
  id, agencyId, domain, token, verifiedAt
}
```

Relationships: `Agency 1—N User`, `Agency 1—N LocalBusiness`, `Agency 1—N Site`, `Agency 1—N Client`, `Site 1—1 Client`, `Client 1—N Invoice`, `Client 1—N ChangeRequest`.

## 8. AUTH

- **NextAuth.js v5** (no Clerk). `app/api/auth/[...nextauth]/route.ts` exports the handlers.
- Providers: `Credentials` (email + bcrypt password) and `Google` (OAuth).
- Adapter: `@auth/prisma-adapter` with the Prisma schema above (need to add `Account`, `Session`, `VerificationToken` models per NextAuth docs).
- Strategy: `jwt` for credentials, `database` fallback for OAuth. Session callback injects `agencyId` and `role`.
- Middleware: `middleware.ts` at the repo root uses `auth()` from NextAuth v5 to gate `/dashboard/*` and `/c/*`.
- Password hashing: `bcryptjs` (12 rounds). Signup also creates the Agency in a transaction.

## 9. FILES (concrete tree)

```
app/
  layout.tsx
  page.tsx
  globals.css
  pricing/page.tsx
  for-agencies/page.tsx
  features/lead-radar/page.tsx
  features/ai-builder/page.tsx
  features/white-label/page.tsx
  signin/page.tsx
  signup/page.tsx
  onboarding/page.tsx
  dashboard/
    layout.tsx
    page.tsx
    leads/page.tsx
    leads/[id]/page.tsx
    sites/page.tsx
    sites/new/page.tsx
    sites/[id]/page.tsx
    clients/page.tsx
    clients/[id]/page.tsx
    agency/page.tsx
    agency/brand/page.tsx
    agency/domain/page.tsx
    agency/team/page.tsx
    billing/page.tsx
    help/page.tsx
  c/[agency]/[client]/layout.tsx
  c/[agency]/[client]/page.tsx
  c/[agency]/[client]/site/page.tsx
  c/[agency]/[client]/billing/page.tsx
  c/[agency]/[client]/requests/page.tsx
  privacy/page.tsx
  terms/page.tsx
  not-found.tsx
  error.tsx
  api/
    auth/[...nextauth]/route.ts
    leads/route.ts
    leads/scan/route.ts
    sites/route.ts
    sites/[id]/publish/route.ts
    clients/route.ts
    clients/[id]/route.ts
    billing/checkout/route.ts
    webhooks/stripe/route.ts
    upload/route.ts
components/
  ui/Button.tsx
  ui/Card.tsx
  ui/Input.tsx
  ui/Select.tsx
  ui/Modal.tsx
  ui/Drawer.tsx
  ui/Toast.tsx
  ui/Skeleton.tsx
  ui/Badge.tsx
  ui/Tabs.tsx
  ui/Table.tsx
  layout/Nav.tsx
  layout/DashboardShell.tsx
  layout/Sidebar.tsx
  layout/TopBar.tsx
  marketing/Hero.tsx
  marketing/FeatureRow.tsx
  marketing/PricingCards.tsx
  marketing/FAQ.tsx
  marketing/Footer.tsx
  illustrations/HarborHero.tsx
  illustrations/SailLogo.tsx
  illustrations/AnchorDivider.tsx
  illustrations/EmptyLeads.tsx
  illustrations/EmptySites.tsx
  builder/TemplatePicker.tsx
  builder/ContentEditor.tsx
  builder/BrandEditor.tsx
  builder/LivePreview.tsx
  builder/PublishBar.tsx
  templates/restaurant.tsx
  templates/dentist.tsx
  templates/salon.tsx
  templates/plumber.tsx
  templates/roofer.tsx
  templates/auto.tsx
  templates/generic.tsx
  leads/LeadMap.tsx
  leads/LeadList.tsx
  leads/LeadFilters.tsx
  leads/LeadDrawer.tsx
  clients/ClientTable.tsx
  clients/ClientTabs.tsx
  agency/BrandKitForm.tsx
  agency/DomainForm.tsx
  agency/TeamTable.tsx
lib/
  auth.ts
  prisma.ts
  stripe.ts
  leads.ts
  sites.ts
  slug.ts
  validators.ts
  utils.ts
prisma/
  schema.prisma
  seed.ts
public/
  illustrations/
  uploads/ (gitignored)
styles/
  tokens.css
middleware.ts
.env.example
package.json
tsconfig.json
tailwind.config.ts
postcss.config.js
next.config.mjs
```

## 10. ACCEPTANCE

- [ ] User can sign up with email/password or Google, gets a session, lands in onboarding.
- [ ] Onboarding completes 4 steps, persists `onboardingStep=3` and `profileComplete=true`, redirects to `/dashboard`.
- [ ] Dashboard renders 3 stat tiles, primary "Scan leads" CTA, and a recent-activity feed; shows empty state honestly when no data.
- [ ] Lead scan returns ≥8 leads with `hasWebsite: false`; leads render on a Leaflet map + sortable list with filters.
- [ ] Lead row click opens a drawer with scraped fields; "Generate site" pre-fills the builder.
- [ ] Builder wizard has 3 steps (template, content, brand), live preview updates as the user edits, and "Publish" creates a `Site` with `status: LIVE` and returns a public URL.
- [ ] Published site renders the selected template with the lead's data and is reachable at `/c/{agency}/{client}/site` (MVP) or `{slug}.velabeam.app` (prod).
- [ ] Agency settings: logo upload, accent color, custom domain field; CNAME instructions shown in a copy block; "Verify" flips status to verified.
- [ ] Client table lists every published site with MRR + renewal date; client detail has Overview/Sites/Invoices/Messages/Files tabs.
- [ ] White-label client portal at `/c/{agency}/{client}` renders the agency's logo, color, and name; client can submit a change request that appears in the agency dashboard.
- [ ] Stripe checkout session can be created for the Agency plan; webhook updates `Agency.plan` and `Client.mrr`.
- [ ] All forms have loading/empty/error/success states; no fake testimonials, logos, user counts, or revenue claims anywhere.
- [ ] Privacy and Terms pages exist and are linked from the footer and signup.
- [ ] Lighthouse on `/` ≥ 90 performance, ≥ 95 accessibility; warm Catalyst palette tokens applied consistently; Manrope + Source Sans 3 loaded.
- [ ] `pnpm build` completes with no type errors; Prisma migrations apply cleanly to a fresh SQLite (dev) and PostgreSQL (prod) schema.
- [ ] Middleware blocks unauthenticated access to `/dashboard/*` and gates `/c/*` to the matching client session.

FILES: ["app/layout.tsx","app/page.tsx","app/globals.css","app/pricing/page.tsx","app/for-agencies/page.tsx","app/features/lead-radar/page.tsx","app/features/ai-builder/page.tsx","app/features/white-label/page.tsx","app/signin/page.tsx","app/signup/page.tsx","app/onboarding/page.tsx","app/dashboard/layout.tsx","app/dashboard/page.tsx","app/dashboard/leads/page.tsx","app/dashboard/leads/[id]/page.tsx","app/dashboard/sites/page.tsx","app/dashboard/sites/new/page.tsx","app/dashboard/sites/[id]/page.tsx","app/dashboard/clients/page.tsx","app/dashboard/clients/[id]/page.tsx","app/dashboard/agency/page.tsx","app/dashboard/agency/brand/page.tsx","app/dashboard/agency/domain/page.tsx","app/dashboard/agency/team/page.tsx","app/dashboard/billing/page.tsx","app/dashboard/help/page.tsx","app/c/[agency]/[client]/layout.tsx","app/c/[agency]/[client]/page.tsx","app/c/[agency]/[client]/site/page.tsx","app/c/[agency]/[client]/billing/page.tsx","app/c/[agency]/[client]/requests/page.tsx","app/privacy/page.tsx","app/terms/page.tsx","app/not-found.tsx","app/error.tsx","app/api/auth/[...nextauth]/route.ts","app/api/leads/route.ts","app/api/leads/scan/route.ts","app/api/sites/route.ts","app/api/sites/[id]/publish/route.ts","app/api/clients/route.ts","app/api/clients/[id]/route.ts","app/api/billing/checkout/route.ts","app/api/webhooks/stripe/route.ts","app/api/upload/route.ts","components/ui/Button.tsx","components/ui/Card.tsx","components/ui/Input.tsx","components/ui/Select.tsx","components/ui/Modal.tsx","components/ui/Drawer.tsx","components/ui/Toast.tsx","components/ui/Skeleton.tsx","components/ui/Badge.tsx","components/ui/Tabs.tsx","components/ui/Table.tsx","components/layout/Nav.tsx","components/layout/DashboardShell.tsx","components/layout/Sidebar.tsx","components/layout/TopBar.tsx","components/marketing/Hero.tsx","components/marketing/FeatureRow.tsx","components/marketing/PricingCards.tsx","components/marketing/FAQ.tsx","components/marketing/Footer.tsx","components/illustrations/HarborHero.tsx","components/illustrations/SailLogo.tsx","components/illustrations/AnchorDivider.tsx","components/illustrations/EmptyLeads.tsx","components/illustrations/EmptySites.tsx","components/builder/TemplatePicker.tsx","components/builder/ContentEditor.tsx","components/builder/BrandEditor.tsx","components/builder/LivePreview.tsx","components/builder/PublishBar.tsx","components/templates/restaurant.tsx","components/templates/dentist.tsx","components/templates/salon.tsx","components/templates/plumber.tsx","components/templates/roofer.tsx","components/templates/auto.tsx","components/templates/generic.tsx","components/leads/LeadMap.tsx","components/leads/LeadList.tsx","components/leads/LeadFilters.tsx","components/leads/LeadDrawer.tsx","components/clients/ClientTable.tsx","components/clients/ClientTabs.tsx","components/agency/BrandKitForm.tsx","components/agency/DomainForm.tsx","components/agency/TeamTable.tsx","lib/auth.ts","lib/prisma.ts","lib/stripe.ts","lib/leads.ts","lib/sites.ts","lib/slug.ts","lib/validators.ts","lib/utils.ts","prisma/schema.prisma","prisma/seed.ts","styles/tokens.css","middleware.ts","tailwind.config.ts","next.config.mjs","package.json","tsconfig.json","postcss.config.js",".env.example"]