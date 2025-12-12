# JUUTEION-LP
# JUUTEION Project Developer Documentation
**Version:** 3.0 (Matte & Silence)
**Date:** 2025-12-08

## 1. Core Design Philosophy: "Matte & Silence"
The design concept is based on high-contrast, matte textures, and sophisticated silence, inspired by "THE FIRST TAKE" but adapted for a dark, club event context.

### 1.1 Base Tone
- **Atmosphere:** Deep, quiet, and high-quality. No neon/cyberpunk glow.
- **Background:** `#09090b` (Zinc-950)
- **Surface:** `#18181b` (Zinc-900)
- **Border:** `#27272a` (Zinc-800) - Subtle boundaries.

### 1.2 The "Vivid Trio" Accents
Accent colors represent the three core members. They must be used evenly and effectively against the monochrome background.
- **BLUE (`#0097e0`):** Intelligence, Links, Progress.
- **YELLOW (`#FEE100`):** Attention, "NEXT EVENT" tags, Warning.
- **RED (`#e5177c`):** Urgency, Heartbeat, Live indicators.

### 1.3 Typography
Mixed typesetting to ensure readability and aesthetic sharpness.
- **Font Stack:** - **JP (Base):** IBM Plex Sans JP
  - **EN (Headings/Numbers):** Montserrat (Class: `font-en`)
- **Scale:**
  - **Display:** `text-5xl` to `7xl` / `font-bold` / `tracking-tighter`.
  - **Body:** `text-base` (16px) / `text-zinc-400` / `leading-relaxed`.
  - **Meta:** `text-xs` (12px) / `tracking-widest` / `uppercase`.

---

## 2. Layout Architecture

### 2.1 The Hub Layout (`src/layouts/Layout.astro`)
The layout handles the responsive logic between Mobile and PC.
- **Prop:** `isFluid?: boolean`
  - `true`: Removes max-width (Used for TOP page split view).
  - `false`: Enforces `max-w-[480px]` (Used for Detail pages).

### 2.2 TOP Page Strategy (`src/pages/index.astro`)
A "Split View" layout for PC, and a "Single Column App View" for Mobile.

- **Left Column (PC Only):**
  - **Role:** Static Billboard / Navigation.
  - **Content:** Full-height KV background, Logo (SVG support), Right-aligned Navigation.
  - **Interaction:** Fixed position (`sticky`), simple text navigation without icons.
  
- **Right Column (Main Content):**
  - **Role:** Scrollable Information Area.
  - **Width:** Restricted to `max-w-xl` (approx. 576px) to maintain density.
  - **Hero:** Contains a "Content Hero" (Image + Title + Meta) at the top.
  - **Sections:** About, Event Info (HeroCard + ArchiveCards), Social Links.

---

## 3. UI Component Library (`src/components/ui/`)

| Component       | Description                      | Usage Rules                                                                           |
| :-------------- | :------------------------------- | :------------------------------------------------------------------------------------ |
| **Button**      | Action buttons.                  | **Primary:** White/Translucent + Blur (No Blue). <br>**Secondary:** Surface + Border. |
| **HeroCard**    | Large card for the Latest Event. | Displays Title, Date, Time, Place, Price. Uses `Accent Trio` gradient glow.           |
| **ArchiveCard** | Smaller card for Past Events.    | Grayscale image by default -> Full color on hover.                                    |
| **ListItem**    | Simple list for Lineup/DJs.      | Minimalist. No background hover change. Icon highlight only.                          |
| **Tag**         | Badges for categories.           | Variants: `default`, `blue`, `yellow`, `red`.                                         |
| **Input**       | Form fields.                     | Matte surface, `focus:border-accent-blue`.                                            |

---

## 4. Content Management Specification (Planned)

Events will be managed using **Astro Content Collections** via Markdown/MDX.

### 4.1 Directory Structure
```text
src/
  content/
    events/
      vol1.md
      vol0-pre.md
      teaser.md
4.2 Frontmatter Schema (Zod)
Events must have the following structured data:

TypeScript

// src/content/config.ts (Draft)
const eventCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subTitle: z.string().optional(),
    date: z.date(), // or string "YYYY.MM.DD"
    time: z.string(), // e.g. "OPEN 23:00"
    place: z.string(), // e.g. "CLUB ASIA"
    price: z.string(),
    image: z.string(), // Hero Image path
    tags: z.array(z.string()), // e.g. ["Techno", "Bass"]
    status: z.enum(['upcoming', 'archive', 'soldout']),
    links: z.object({
      ticket: z.string().url().optional(),
    }).optional(),
  }),
});
4.3 Implementation Plan
Define Collection: Create src/content/config.ts.

Create Files: Add .md files to src/content/events/.

Fetch Data: Use getCollection('events') in index.astro to replace hardcoded arrays.

Filter by status: 'upcoming' for the Hero section.

Filter by status: 'archive' for the Archive section.

Dynamic Routes: Create src/pages/events/[...slug].astro for detail pages.

5. Development Rules
Images: Use public/ for easy referencing or src/assets/ for optimization.

CSS: Use Tailwind utility classes. Avoid custom CSS unless necessary for scrollbars or global styles.

Mobile First: Always verify the design on mobile width (480px) first.