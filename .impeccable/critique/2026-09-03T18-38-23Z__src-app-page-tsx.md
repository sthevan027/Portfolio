---
target: portfolio homepage (src/app/page.tsx)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
timestamp: 2026-09-03T18-38-23Z
slug: src-app-page-tsx
---
# Critique — Portfolio homepage (src/app/page.tsx) — 2026-09-03

Method: dual-agent (A: design review · B: detector + browser evidence)

> **Correction (2026-09-03, same day):** the "undersized text ~60 instances"
> P0 below is a **false positive**. Assessment B's live browser-injected
> detector ran in a Claude-in-Chrome session rendering at an effective ~75%
> scale (`devicePixelRatio: 0.9`, root `font-size: 12px` instead of the
> standard 16px) — reproduced identically on `example.com` as a control,
> proving it's a session/tool rendering artifact, not a site defect. Source
> inspection (`tailwind.config.js`, `globals.css`) confirms no custom font
> scale or arbitrary tiny classes exist anywhere in the codebase. This
> finding was retracted before implementation and **no text-sizing changes
> were made**. All other findings below (contrast, toggle, motion, brand
> split, alert(), generic content, gradient-text) were independently
> verified as real and have since been fixed — see "Post-fix status" at the
> end of this file.

## Design Health Score
19/32 (59%) — Acceptable, low end. Heuristics 7 and 10 n/a (Experience surface).
Weakest: #4 Consistency (1 — broken PT/EN toggle), #1/#8/#9 all at 2.

## Design Specificity Verdict
Mixed, leaning generic. Real personal photo + career timeline (2021-2026) are authorial.
Generic template structure dominates: Missao/Visao/Valores cards, meaningless skill-bar
percentages, and critically - none of ~26 catalogued projects has a real screenshot,
all use one of 6 decorative gradients as card background.

## Detector findings the LLM review missed
150 anti-patterns total. Dominant, unnamed-by-LLM category: undersized-ui-text,
60+ instances down to 9px (skill tag chips, form labels, buttons). Also: low-contrast,
7 instances below WCAG AA 4.5:1 (4 Sobre cards at 3.4:1, footer wordmark at 4.1:1).
Confirmed via live browser injection, not just static scan. 2 CLI findings ruled false
positive after code inspection (email-template font; loading-spinner border).

## Priority Issues
[P0] ~~Undersized text ~60 instances (9-10.5px) across skill chips/buttons/labels~~ — RETRACTED, false positive (see correction note above)
[P0] PT/EN toggle only translates navbar, rest of page stays Portuguese -> /impeccable harden — FIXED
[P1] Contrast below WCAG AA in 5 places (3.4:1, 4.1:1 vs 4.5:1 required) -> /impeccable audit — FIXED (gradient-text removed, glow no longer a low-contrast text overlay, brand-mark gold recolored)
[P1] Every section fades from opacity:0 on load/scroll, including hero on first paint -> /impeccable polish — FIXED (Hero no longer opacity:0 on first paint; motion delays cut across all sections)
[P1] Brand identity split between "Virex" (navbar/footer/tab title) and personal narrative -> /impeccable clarify — FIXED
[P2] "Sobre" section generic corporate boilerplate — PARTIALLY ADDRESSED (skills % bars -> tag/chip list; duplicate CTA differentiated)
[P2] Native browser alert() used for form error states — FIXED (inline error UI)

## Persona Red Flags
Jordan (recruiter): empty-looking hero for 1-2s on load; broken EN toggle actively hurts trust.
Sam (accessibility, added from detector evidence): 9-10.5px text and sub-4.5:1 contrast fail low-vision/zoom users.
Riley (stress test): language choice not persisted; CV modal has no Esc handler; form errors use blocking native alert().
Casey (mobile): not visually verified this run - resize_window tool failed 3x in both assessments (reported success, viewport never changed). Code shows responsive-aware classes but unconfirmed live.

## Minor Observations
- Language toggle button has no tooltip/aria-label beyond current code text.
- Duplicate "Vamos Conversar?" headline in both About and Contact sections.
- Skills/Footer use explicit bg-black while rest of page uses bg-background (visible tonal seam).
- dark-glow utility class overused on 4 CTAs (Hero, About link, Projects, Contact submit).
- gradient-text applied to 7 headings site-wide - part of the generic-AI-palette signal.

## Questions to Consider
- If the language toggle can't be finished now, is a half-translated page worse for hiring than no English at all?
- Is "Virex" the brand this surface sells, or is it Sthevan - and if Sthevan, should Virex live above the fold?
- What should be different in the first 5 seconds, given a page that's still fading in during exactly that window?

## Post-fix status (2026-09-03, same day)

All confirmed-real Priority Issues implemented in one pass, full scope
(including P2s), across Hero, About, Skills, Projects, ProjectCard,
Contact, Footer, Navbar, layout.tsx and the `/projetos` all-projects page:

- PT/EN toggle now covers every visible string site-wide (verified live:
  toggling to EN translates nav, hero, about, skills, projects, contact,
  footer, and the CV-selection modal).
- All 7 `gradient-text` usages and both `virex-brand`/`.glow` craft-floor
  violations removed; `.brand-mark` recolored for real 4.5:1+ contrast
  (verified by hand via the WCAG relative-luminance formula).
- Hero no longer flashes invisible on first paint; Framer Motion delays
  cut from up to 1.5s to ≤0.4s across all sections.
- "Virex" de-emphasized as primary identity in Navbar/Footer/JSON-LD
  (now "Sthevan Santos" / "Sthevan"); kept intentionally in About's 2026
  timeline entry ("CEO da Virex & Engenheiro de Software") as accurate,
  in-context career history. Email inconsistency fixed
  (`sthevan@virex.com.br` -> `sthevan.ssantos@gmail.com` in Footer,
  layout.tsx JSON-LD, and the contact API route).
- Contact form's two `alert()` calls replaced with inline error UI
  (verified live via a forced-failure test: error renders inline, no
  blocking native dialog).
- Skills section's meaningless %-bar display replaced with a tag/chip
  list; skill data/ordering preserved.
- ProjectCard's 6 saturated, unrelated gradient hues toned down to an
  on-brand blue/cyan family (still 6 distinct, now consistent with the
  primary palette).
- Duplicate "Vamos Conversar?" CTA differentiated between About
  ("Bora Criar Algo Juntos?") and Contact (kept "Vamos Conversar?").

TypeScript typecheck passes clean (`pnpm exec tsc --noEmit`, 0 errors).
Not re-scored — a fresh `/impeccable critique` run is recommended to
confirm the score improvement, since this file's original 19/32 predates
these fixes and should not be read as current.
