# আইন কেয়ার বিডি — Law Care BD

> **Beta v1** — Bilingual (বাংলা / English) marketing website for a practising advocate in Dhaka, Bangladesh.  
> Built to drive WhatsApp consultations and phone calls. Zero backend. Zero database.

---

## 🌐 Live Site

<!-- Replace with the real domain once deployed -->
**Domain:** `https://[YOUR-DOMAIN.COM]`

---

## 📋 Project Overview

A professional, bilingual static website for an advocate practising in Dhaka, Bangladesh. The site:

- Presents the advocate's credentials, practice areas, and contact details
- Defaults to **Bangla** with a one-click **English** toggle (persisted via `localStorage`)
- Drives contact via **WhatsApp deep links**, `tel:` and `mailto:` — no form backend
- Deploys as **flat files** to Hostinger shared hosting (no server process, no database, no CMS)

---

## 📁 File Structure

```
law-care-bd/
├── index.html          # Home — hero, about snapshot, practice preview, trust strip
├── about.html          # Profile, bio, credentials ledger
├── services.html       # 6 anchored practice area sections
├── contact.html        # Contact cards, hours, Google Maps embed
├── 404.html            # Custom not-found page
├── style.css           # Full design system (tokens, components, responsive)
├── script.js           # Language toggle, mobile nav, scroll-reveal, hero entrance
├── robots.txt
├── sitemap.xml
├── BUILD_SPEC.md       # Original build specification (do not delete)
└── assets/
    ├── logo/           # Advocate's logo files (to be added by client)
    └── photos/         # Advocate headshot (to be added by client)
```

---

## 🎨 Design System

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#17241D` | Body text, footer background |
| `--ink-soft` | `#3A4A42` | Secondary/muted text |
| `--parchment` | `#EDEAE0` | Page background |
| `--parchment-deep` | `#E2DDCC` | Subtle section variation |
| `--brass` | `#9C7A2E` | Accents, file-number labels, active states |
| `--oxblood` | `#6B2530` | Primary CTA buttons, link hover |
| `--forest` | `#1F3B30` | Nav bar, hero, contact section backgrounds |
| `--hairline` | `#C9C2AE` | Borders, dividers |
| `--paper-white` | `#F7F5EF` | Card backgrounds |

**Fonts** (Google Fonts CDN, no local files):

| Role | Font |
|---|---|
| English display | Fraunces |
| English body | Libre Franklin |
| Bangla display | Noto Serif Bengali |
| Bangla body | Hind Siliguri |

---

## ⚙️ Tech Stack

| Decision | Choice | Reason |
|---|---|---|
| Framework | **None** — plain HTML5/CSS3/JS | No build step; deploys as flat files to Hostinger |
| Animations | **Vanilla CSS + `IntersectionObserver`** | ~5 animated behaviors — no library justified |
| Fonts | **Google Fonts CDN** | No local bundling needed |
| Icons | **Inline SVG** | MIT-licensed Lucide paths, zero external requests |
| Contact | **`wa.me` / `tel:` / `mailto:`** | No form backend, no database |
| Hosting | **Hostinger shared hosting** | Client's existing host |

---

## 🌍 Bilingual System

- Default language: **Bangla** (`html[lang="bn"]`)
- Toggle persists across pages via `localStorage` (key: `law-care-lang`)
- Implementation: every bilingual text element carries `data-lang="bn"` or `data-lang="en"`; CSS attribute selectors on `html[lang="en"]` handle visibility
- Cross-fade: 120ms opacity transition on language switch

---

## 🎬 Animations (§5 of BUILD_SPEC.md)

| Animation | Implementation |
|---|---|
| Hero entrance | Opacity + `translateY(12px→0)`, 100ms stagger, once on load |
| Scroll-reveal | `IntersectionObserver`, threshold 0.15, fires once (unobserves after) |
| Language switch | 120ms opacity fade on `main`, nav links, footer |
| Hover states | `translateY(-2px)` + shadow; nav underline draws from left |
| Mobile nav | `max-height` + opacity, ~220ms |
| Court seal | 60s CSS `rotate` animation (subtle ambient motion) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables **all** transforms and transitions |

---

## ✅ Pre-Launch Checklist

Before going live, the following **must** be completed. Search for `[PLACEHOLDER` across all HTML files to find every item.

### Content from the advocate (§8)
- [ ] Full name — exact Bangla and English spelling
- [ ] Professional title (e.g. "Advocate, Supreme Court of Bangladesh")
- [ ] Chamber/firm name (if applicable)
- [ ] WhatsApp number with country code (format for `wa.me`: `8801XXXXXXXXX`)
- [ ] Office phone number(s)
- [ ] Email address
- [ ] Chamber address (district court + high court if applicable)
- [ ] Working days and hours
- [ ] Bar Council enrolment number and year
- [ ] Which courts he regularly appears before
- [ ] 3 bio paragraphs (in his own words — **no AI-generated bio**)
- [ ] Service descriptions: 2–4 sentences for each of the 6 practice areas
- [ ] Logo files → `assets/logo/` (SVG/PNG with transparent background, min 512×512px)
- [ ] Professional headshot → `assets/photos/advocate-headshot.jpg` (then uncomment the `<img>` in `about.html`)

### Technical steps
- [ ] Replace `[YOUR-DOMAIN.COM]` in all OG tags, `robots.txt`, `sitemap.xml`
- [ ] Generate `favicon.ico` and `apple-touch-icon.png` from the logo
- [ ] Create `assets/og-image.jpg` (1200×630px) for WhatsApp/Facebook link previews
- [ ] Add real Google Maps embed to `contact.html` (see inline HTML comment)
- [ ] Update `<lastmod>` dates in `sitemap.xml`
- [ ] Verify Bar Council advertising restrictions before adding any superlative language

### QA
- [ ] Test on Android Chrome (primary audience)
- [ ] Language toggle works and persists across all 4 pages
- [ ] No browser console errors on any page
- [ ] `prefers-reduced-motion` verified in Chrome DevTools
- [ ] Run Lighthouse on homepage (target: high Performance + Accessibility scores)
- [ ] All internal links resolve (no dead links)
- [ ] WhatsApp, phone, and email links tested on a real device

---

## 🚀 Deployment (Hostinger)

1. Log into hPanel → File Manager (or FTP client)
2. Navigate to `public_html/`
3. Upload all files flat (no subfolder nesting for the HTML/CSS/JS files)
4. Confirm `index.html` is at the web root
5. Smoke-test every page and link

**No build command. No `npm install`. No environment variables. No database setup.**

---

## 🚫 Out of Scope (Beta v1)

Per `BUILD_SPEC.md §12` — do **not** build these without client sign-off:

- Individual SEO landing pages per practice area
- Blog / articles section
- Testimonials section (pending real, consented quotes)
- Analytics
- Separate `/bn/` `/en/` URL structure
- Appointment booking / scheduling
- Client portal / login / case-status lookup

---

## 📖 Reference

Full requirements, design decisions, and justifications are documented in [`BUILD_SPEC.md`](./BUILD_SPEC.md).

---

*© [Advocate Full Name]. Website built to the specification in `BUILD_SPEC.md`.*
