# BUILD SPEC — Advocate Website (Beta v1)
**This document is self-contained.** It is written to be handed directly to an
autonomous coding agent (Antigravity) with no additional verbal instructions.
Every decision an agent would normally have to ask about is answered here. Where
a judgment call was made on the client's behalf, it's marked **[DECISION]** so
it can be reviewed before build starts.

---

## 0. What This Project Is

A bilingual (Bangla + English) marketing/reference website for a practicing
advocate in Dhaka, Bangladesh. It exists to build trust and drive a WhatsApp
message or phone call — nothing more, nothing less. It is **not** a web app.

**This is Beta v1 — the first published version.** Scope is intentionally
frozen to what's in this document. Anything not listed here is a future phase,
listed separately in Section 12, and must not be built now without the client's
sign-off.

---

## 1. Tech Stack — Decision & Justification

**[DECISION] Stack: plain HTML5 + CSS3 + vanilla JavaScript. No framework.**

| Option considered | Verdict | Why |
|---|---|---|
| React / Next.js | Rejected | Needs a build step and/or Node runtime. Adds deploy complexity for a 4-page brochure site with zero app state. Wrong tool for this job. |
| WordPress | Rejected | Client explicitly does not want a database or admin/login system. WordPress is a database-backed CMS by definition — disqualified on the client's own requirement. |
| Static site generator (Astro/Eleventy/Hugo) | Rejected | Would add a build pipeline for content that changes rarely (a lawyer's bio and services don't change weekly). Unnecessary tooling overhead for this scope. |
| **Plain HTML/CSS/JS** | **Selected** | Zero dependencies, zero build step, uploads directly to Hostinger via File Manager/FTP exactly like the client's current site. Fastest possible page loads. No security surface (no CMS to get hacked, no database to leak). Matches "no backend, no database" requirement exactly. |

**Hard constraints carried over from earlier discussion — do not violate these:**
- No database of any kind.
- No login/signup/authentication anywhere.
- No contact form that POSTs to a server or third-party form service. Contact
  is via `wa.me` WhatsApp deep links, `tel:` links, and `mailto:` links only.
- No CMS/admin panel.
- Hosting is Hostinger shared hosting. Deployment = upload files to
  `public_html/`. No SSH build steps, no Node process running in production.

**Animation library decision:** **[DECISION]** no animation library (no GSAP,
no AOS, no Framer Motion). Use native CSS transitions/keyframes plus the
browser's `IntersectionObserver` API for scroll-triggered reveals. Reasoning:
this site has ~5 animated behaviors total (see Section 5) — pulling in a
20–50kb dependency for that is not justified, and vanilla implementations load
faster and have no supply-chain risk. If the agent finds a specific animation
that's genuinely hard in vanilla CSS/JS, flag it rather than silently adding a
dependency.

---

## 2. Non-Negotiable Design Direction: "Not AI-Generated"

This is a real requirement, not a vibe — be specific about what to avoid and
what to do instead.

**Avoid (these read as generated/templated):**
- Cream background (`#F4F1EA`-ish) paired with a terracotta/clay accent
  (`#D97757`-ish). This combination is extremely overused by AI page builders.
- Pure black background with a single neon-green or neon-purple accent.
- Glassmorphism (frosted-glass blur cards), floating gradient blobs, or
  overly rounded "SaaS-app" corners on everything.
- Generic numbered circle badges (① ② ③) used as decoration rather than
  because the content is genuinely a sequence.
- Stock clipart of scales-of-justice, gavels, or a generic "lawyer shaking
  hands with client" stock photo. These appear on every low-effort law-firm
  template site and undercut credibility rather than building it.
- Lorem ipsum or filler copy left in the shipped version.
- Centered-everything layouts with no asymmetry.
- Excessive or decorative animation — motion for its own sake reads as
  "AI made this flashy," not as professional.

**Do instead — this project's actual visual identity (already established, keep it):**
- Palette rooted in Bangladeshi judicial/legal materials, not a generic SaaS
  palette: deep forest ink-green, oxblood/court-stamp red, muted brass,
  warm parchment paper tone. See Section 4 for exact hex values.
- A signature motif drawn from the subject itself: a rotated circular
  court-seal/stamp graphic (already built as inline SVG — reuse it, don't
  replace it with a stock icon), and section labels styled as case-file
  entries ("নথি ০১ / FILE 01") because that's literally how legal documents
  are indexed in this profession — it's structural, not decorative.
- Restraint: one bold signature element (the seal), everything else quiet and
  disciplined. Do not add a second "big idea" competing with it.
- Typography with real personality: Fraunces (display) + Libre Franklin
  (body) for English, Noto Serif Bengali + Hind Siliguri for Bangla — not
  system-default sans-serif, not Inter.

**Benchmark references — use these two as the standard for "looks like a
real, decent firm's site, not a template":**
- `https://legaladvicebd.com/` — study its information density, credential
  presentation, and use of a real named advocate with real bar/court details.
  This is the better of the two references for structure and trust-building.
- `https://legalexpert.com.bd/` — weaker reference; useful mainly for seeing
  what generic persuasion copy looks like so it can be avoided. Do not copy
  its single-page "why choose us" listicle structure.

---

## 3. Site Architecture

```
public_html/
├── index.html      Home
├── about.html       About / Bio / Credentials
├── services.html     All practice areas (anchored sections)
├── contact.html     WhatsApp / phone / email / map
├── style.css         All design tokens + styles
├── script.js         Language toggle, mobile nav, scroll animations
├── favicon.ico       (derived from client's logo — see Section 7)
├── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
└── /assets/
    ├── /logo/         client-provided logo files (see Section 7)
    └── /photos/        advocate headshot, office photo if provided
```

**Page count decision [DECISION]:** 4 pages, not one page-per-practice-area.
Services live as anchored sections within `services.html`
(`services.html#family`, `#property`, etc.) rather than separate URLs. This
keeps Beta v1 lean. **Future phase (do not build now):** if the client wants
to rank in search for specific terms like "divorce lawyer Dhaka," split each
practice area into its own page later — that's an SEO-driven decision to make
after the site is live and has data, not before.

---

## 4. Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#17241D` | body text, footer background |
| `--ink-soft` | `#3A4A42` | secondary/muted text |
| `--parchment` | `#EDEAE0` | page background |
| `--parchment-deep` | `#E2DDCC` | subtle background variation |
| `--brass` | `#9C7A2E` | accents, file-number labels, active states |
| `--oxblood` | `#6B2530` | primary CTA buttons, link hover |
| `--forest` | `#1F3B30` | nav bar, hero, contact section backgrounds |
| `--hairline` | `#C9C2AE` | borders, dividers |
| `--paper-white` | `#F7F5EF` | card backgrounds on alternate sections |

Do not introduce new colors outside this set without updating this table.

### Typography
| Role | Font | Fallback |
|---|---|---|
| English display | Fraunces | serif |
| English body | Libre Franklin | sans-serif |
| Bangla display | Noto Serif Bengali | serif |
| Bangla body | Hind Siliguri | sans-serif |

Loaded via Google Fonts CDN `<link>` tags — no local font files needed, no
build step to bundle fonts.

### Spacing & Layout
- Max content width: `1120px`, centered, `28px` side padding on mobile.
- Section vertical padding: `84px` desktop, scale down to `~48px` on mobile.
- Breakpoint: `860px` is the primary mobile/desktop split (nav collapses to
  hamburger, 3-column grids collapse to 1 column below this width).

---

## 5. Animation Spec (frontend-only, vanilla CSS/JS)

Every animated behavior in the site, specified precisely so it's implemented
consistently rather than ad hoc:

1. **Page-load hero entrance:** hero headline, subcopy, and CTA buttons fade
   up (`opacity 0→1`, `translateY 12px→0`) with a ~100ms stagger between
   elements. Duration ~450ms, ease-out. Runs once on load, not on every scroll.
2. **Scroll-triggered reveal:** practice-area cards, ledger rows, and contact
   cards fade up into place as they enter the viewport. Implement with
   `IntersectionObserver`, trigger once per element (unobserve after firing),
   threshold ~0.15. Do **not** re-trigger the animation if the user scrolls
   back up and down again — that reads as glitchy, not polished.
2. **Language toggle:** when switching বাং/EN, cross-fade the text content
   (~150ms opacity transition) rather than an instant hard swap. Keep it
   subtle — this happens often, so it must never feel slow or heavy.
4. **Hover states:** buttons and cards lift slightly (`translateY(-2px)`) with
   a soft shadow on hover; nav links get an underline that draws in from the
   left rather than appearing instantly. Keep transitions short — 150–200ms.
5. **Mobile nav open/close:** slide + fade, ~220ms ease.
6. **WhatsApp floating button:** static by default. Optional very subtle
   pulse/glow to draw the eye — if implemented, keep the pulse slow (2–3s
   cycle) and low-amplitude. If in doubt, leave it static rather than risk it
   reading as a spammy "chat bubble" widget — restraint over flashiness.

**Mandatory:** wrap all of the above in a
`@media (prefers-reduced-motion: reduce)` override that disables transforms
and shortens/removes transitions for users who've requested reduced motion.
This is an accessibility requirement, not optional polish.

---

## 6. Functional Requirements ("robust and proper functionality")

Concretely, "robust" means production-grade static-site engineering, not
backend features. Specifically:

- **Responsive:** correct layout and legible text from ~360px mobile width up
  through large desktop. Test at 360px, 768px, 1024px, 1440px minimum.
- **Accessible:** semantic HTML (proper heading hierarchy, `<nav>`, `<main>`,
  `<footer>` landmarks), visible keyboard focus states on all interactive
  elements, sufficient color contrast (check `--ink-soft` text on
  `--parchment` background meets WCAG AA), `alt` text on all images,
  `aria-label`s on icon-only buttons (hamburger menu, WhatsApp float button).
- **Cross-browser:** must work correctly in Chrome, Safari, and Firefox on
  both desktop and mobile (this audience will be majority mobile, majority
  Chrome/Android — prioritize testing there).
- **Fast:** no render-blocking resources beyond the font `<link>` tags; no
  unoptimized multi-MB images (see Section 7 for image specs); no unused CSS.
  Target: page should be interactive in under 2 seconds on a typical mobile
  connection in Bangladesh (assume 4G, not fiber).
- **Working state persistence:** the language choice (বাং/EN) should persist
  across page navigation within the site (via `localStorage`, already
  specified in Section 1) so a visitor who picks English on the homepage
  doesn't get reset to Bangla on the About page.
- **No dead links / no console errors:** every internal link must resolve;
  browser console must be clean of JS errors on every page.
- **404 handling:** include a simple `404.html` with a link back to the
  homepage, in case Hostinger's default error page would otherwise show.
- **SEO basics:** unique `<title>` and meta description per page (already
  drafted, needs real content per Section 8), `robots.txt`, `sitemap.xml`
  listing all 4 pages, Open Graph tags (`og:title`, `og:description`,
  `og:image`) so links shared on WhatsApp/Facebook render a preview card.

---

## 7. Assets — Who Provides What

### From the client's friend (the advocate) — required, do not fabricate:
- **Logo** — the advocate already has a logo; he must supply it.
  - **Format needed:** vector if available (SVG or AI/EPS) preferred; if only
    a raster version exists, need it as **PNG with transparent background**,
    at minimum 512×512px so it can be downscaled cleanly for favicon use.
  - **Variants needed:** a version that reads clearly on the dark forest-green
    nav bar (i.e. light/white version) plus the standard version for light
    backgrounds, if he has both. If only one version exists, that's fine —
    flag to the agent that it may need a simple color-adjusted variant
    generated for the dark nav background.
  - Used for: nav wordmark/logo slot, `favicon.ico`, `apple-touch-icon.png`,
    Open Graph share image.
- **Professional photo** (optional but recommended) — headshot for
  `about.html`. If not provided, the page ships without one; do not use a
  stock photo as a substitute.
- All content listed in Section 8 below.

### Sourced freely by the agent — do not need the client for these:
- **Functional icons** (WhatsApp, phone, email, map pin, hamburger menu, etc.)
  — source from a free, open-license icon set. **[DECISION]** recommended:
  **Lucide** or **Heroicons** (both MIT-licensed, no attribution required,
  widely used, consistent stroke-based style that matches this design's
  restrained aesthetic). Avoid icon sets that require attribution or paid
  licensing (e.g. Font Awesome Pro). A custom inline WhatsApp glyph is already
  built in the current files — reuse it rather than pulling in an external
  icon font just for one icon.
- **Google Maps embed** — generated directly from the real chamber address
  (see Section 8) via Google Maps → Share → Embed a map. No account/API key
  needed for the basic embed.
- **Google Fonts** — loaded via CDN, no local hosting needed.

---

## 8. Content Checklist — Full List of What to Get From the Advocate

This is the complete list. Nothing else is needed from him beyond this and the
logo above. Treat every item as required unless marked optional.

**Identity**
- [ ] Full name — exact Bangla spelling and exact English spelling
- [ ] Professional title (e.g. "Advocate, Supreme Court of Bangladesh" — confirm exact wording he wants)
- [ ] Chamber/firm name, if he practices under one
- [ ] Year he was called to the bar / started practicing

**Contact**
- [ ] WhatsApp number, with country code
- [ ] Office phone number(s) — landline and/or mobile if different from WhatsApp
- [ ] Email address
- [ ] Chamber address — District Court chamber, and separately, High Court
      chamber address if he has both (legaladvicebd.com lists both — decide
      if that applies to him)
- [ ] Working days/hours (e.g. "Sat–Thu, 10am–8pm, Friday closed")

**Credentials — for the About page**
- [ ] Law degree(s), university name(s), graduation year(s)
- [ ] Bar Council enrollment number and year
- [ ] Which courts he regularly appears before
- [ ] 2–3 short paragraphs, in his own words or dictated, about his practice
      philosophy and experience — **do not let an AI invent this bio**; it
      needs to be factually accurate about a real licensed professional
- [ ] Any professional memberships, awards, or notable affiliations he wants listed (optional)

**Practice areas — for the Services page**
- [ ] Confirm or correct this draft list: Family Law, Property & Land Matters,
      Corporate & Company Registration, Cheque Dishonour Cases, Civil
      Litigation, Notary Services
- [ ] For each: 2–4 sentences of real detail on what he actually handles
- [ ] Any practice area to add or remove

**Optional but strengthens the site**
- [ ] 1–3 real client testimonials, with the client's consent to publish
      (never fabricate these — both reference sites lean heavily on
      testimonials, but only real, consented ones should go up)
- [ ] Social links (Facebook page, LinkedIn) if he wants them in the footer
- [ ] Professional headshot photo

**Legal/compliance — worth him checking, not something to assume**
- [ ] Whether the Bangladesh Bar Council has any advertising restrictions for
      advocates (some bar associations restrict things like superlative
      claims — "best law firm" — or testimonials). Confirm before publishing
      any comparative or superlative language.

---

## 9. Bilingual Implementation Detail

Already implemented via `data-lang="bn"` / `data-lang="en"` attributes on
every bilingual text element, toggled by setting `lang` on the `<html>` tag
and controlled by `script.js`, persisted via `localStorage`. Default language
on first visit: Bangla (matches the client's current site's primary audience).

**[DECISION]** — single set of pages with a toggle, not separate `/bn/` and
`/en/` URLs. Tradeoff: simpler to maintain, but separate URLs would index
better in search per language. Flagged in Section 12 as a future
reconsideration if SEO becomes a priority.

---

## 10. Acceptance Checklist (before this goes live)

- [ ] All `[bracketed placeholders]` replaced with real content — zero
      placeholder text remains anywhere in the shipped HTML
- [ ] Logo in place in nav, favicon, and Open Graph image
- [ ] All phone/WhatsApp/email links point to real, working contact info
- [ ] Google Maps embed points to the real chamber address, not a generic
      "Dhaka, Bangladesh" search
- [ ] Site tested on an actual Android phone in Chrome (primary audience)
- [ ] Language toggle works correctly on every page and persists across
      navigation
- [ ] No console errors on any page
- [ ] `prefers-reduced-motion` verified to disable animation
- [ ] Lighthouse (Chrome DevTools) run on the homepage — should score well on
      Performance and Accessibility given the lightweight stack; investigate
      and fix anything scoring notably low
- [ ] robots.txt and sitemap.xml present and correct
- [ ] Client (advocate) has reviewed and approved every page's actual text
      before publishing — this is legal/professional content about a real
      person's credentials and services

---

## 11. Deployment (Hostinger)

1. Log into Hostinger → hPanel → File Manager (or connect via FTP client).
2. Navigate to `public_html/`.
3. Upload all files flat: `index.html`, `about.html`, `services.html`,
   `contact.html`, `style.css`, `script.js`, `favicon.ico`,
   `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, and the `/assets/`
   folder.
4. Confirm `index.html` is at the web root (not nested in a subfolder).
5. Visit the live domain and click through every page/link/button as a final
   smoke test.

No build command, no `npm install`, no environment variables, no database
setup. This is the entire deployment process.

---

## 12. Explicitly Out of Scope for Beta v1 (future phases — do not build now)

- Individual SEO landing pages per practice area
- Blog/articles section (would require a CMS or hand-written pages)
- Testimonials section (pending real, consented quotes)
- Analytics (pending client decision on privacy-respecting tool)
- Separate `/bn/` `/en/` URL structure for SEO
- Any form of appointment booking/scheduling system
- Any client portal, login, or case-status lookup — this would require a
  backend and directly contradicts the "no login" requirement; do not add
  even a "simple" version of this without a full re-scoping conversation

---

## 13. Current Implementation Status

A working Beta v1 implementation already exists (6 files: `index.html`,
`about.html`, `services.html`, `contact.html`, `style.css`, `script.js`) with
the design system in Section 4 already built and the seal/docket motif from
Section 2 already implemented. It currently has placeholder content per
Section 8 and does **not** yet have the scroll-reveal animations from Section
5 fully implemented (only basic hover states exist). Treat the existing files
as the baseline to extend, not a from-scratch rebuild — apply the animation
spec, swap in real content once received, and drop in the client's logo per
Section 7.
