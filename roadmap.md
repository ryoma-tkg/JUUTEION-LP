# JUUTEION Development Roadmap

This document outlines the step-by-step plan to transition from the current static prototype to a fully dynamic, CMS-driven event hub.

## Phase 1: Content Management System (CMS) Construction
**Goal:** Establish a mechanism where adding Markdown files automatically updates the site content.

- [ ] **1.1 Directory Setup**
  - Create `src/content/events/` directory to store event files.
- [ ] **1.2 Schema Definition**
  - Create `src/content/config.ts`.
  - Define the `eventCollection` schema using `zod`.
  - Required fields: `title`, `subTitle`, `date`, `time`, `place`, `price`, `image`, `status` (upcoming/archive).
- [ ] **1.3 Data Entry**
  - Create initial Markdown files for existing events:
    - `src/content/events/vol1.md` (Latest)
    - `src/content/events/vol0-pre.md` (Archive)
    - `src/content/events/teaser.md` (Archive)

## Phase 2: Dynamic Top Page Implementation
**Goal:** Replace hardcoded data in `index.astro` with dynamic data fetched from the CMS.

- [ ] **2.1 Fetch Data**
  - Import `getCollection` in `src/pages/index.astro`.
  - Fetch all events from the `events` collection.
- [ ] **2.2 Logic Implementation**
  - Sort events by `date` in descending order.
  - Logic:
    - **Newest Event** -> Assign to Hero Section (`nextEvent`).
    - **Other Events** -> Assign to Archive Section (`pastEvents`).
- [ ] **2.3 Component Integration**
  - Map the dynamic data to `<HeroCard />` and `<ArchiveCard />` props.
  - Ensure the Left Sidebar KV also updates dynamically.

## Phase 3: Event Detail Pages (Dynamic Routes)
**Goal:** Create individual pages for each event (`/events/vol1`, etc.) automatically.

- [ ] **3.1 Dynamic Route File**
  - Create `src/pages/events/[...slug].astro`.
- [ ] **3.2 Static Path Generation**
  - Implement `getStaticPaths()` to generate routes for all entries in the collection.
- [ ] **3.3 Detail Layout**
  - Use `<Layout title={entry.data.title} isFluid={false} />`.
  - Enforce the "Mobile App View" (`max-w-[480px]`).
- [ ] **3.4 Content Rendering**
  - Render the Markdown body using `<Content />`.
  - Style the markdown content (headers, lists, images) to match the "Matte & Silence" design system.
- [ ] **3.5 CTA & Navigation**
  - Implement a sticky "Ticket Reservation" button at the bottom.
  - Add a simple "Back to Top" navigation.

## Phase 4: Asset Optimization & Polish
**Goal:** Switch from static `public/` images to optimized `src/assets/` images.

- [ ] **4.1 Image Migration**
  - Move high-quality original images to `src/assets/images/`.
- [ ] **4.2 Schema Update**
  - Update `src/content/config.ts` to use the `image()` helper for validation and optimization.
- [ ] **4.3 Component Update**
  - Refactor `HeroCard.astro` and `ArchiveCard.astro` to use Astro's `<Image />` component or `getImage()` for background images.
- [ ] **4.4 Final Design Check**
  - Verify responsive behavior on Mobile and PC.
  - Ensure typography rules (Montserrat mixed with IBM Plex Sans JP) are applied correctly.

## Phase 5: Launch Preparation
- [ ] **5.1 Build Check**
  - Run `npm run build` to ensure no errors during static generation.
- [ ] **5.2 Deployment**
  - Deploy to production environment (Vercel / Netlify / Cloudflare Pages).
  - アハン