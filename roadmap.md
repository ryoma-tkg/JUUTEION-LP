
# JUUTEION Development Roadmap

This document outlines the step-by-step plan to transition from the current static prototype to a fully dynamic, CMS-driven event hub.

## Phase 1: Content Management System (CMS) Construction
**Goal:** Establish a mechanism where adding Markdown files automatically updates the site content.

- [x] **1.1 Directory Setup**
  - Create `src/content/events/` directory to store event files.
- [x] **1.2 Schema Definition**
  - Create `src/content/config.ts`.
  - Define the `eventCollection` schema using `zod`.
  - Required fields: `title`, `subTitle`, `date`, `time`, `place`, `price`, `image`, `status` (upcoming/archive).
- [x] **1.3 Data Entry**
  - Create initial Markdown files for existing events:
    - `src/content/events/vol1.md` (Latest)
    - `src/content/events/vol0-pre.md` (Archive)
    - `src/content/events/teaser.md` (Archive)

## Phase 2: Dynamic Top Page Implementation
**Goal:** Replace hardcoded data in `index.astro` with dynamic data fetched from the CMS.

- [x] **2.1 Fetch Data**
  - Import `getCollection` in `src/pages/index.astro`.
  - Fetch all events from the `events` collection.
- [x] **2.2 Logic Implementation**
  - Sort events by `date` in descending order.
  - Logic:
    - **Newest Event** -> Assign to Hero Section (`nextEvent`).
    - **Other Events** -> Assign to Archive Section (`pastEvents`).
- [x] **2.3 Component Integration**
  - Map the dynamic data to `<HeroCard />` and `<ArchiveCard />` props.
  - Ensure the Left Sidebar KV also updates dynamically.

## Phase 3: Event Detail Pages (Dynamic Routes)
**Goal:** Create individual pages for each event (`/events/vol1`, etc.) automatically.

- [x] **3.1 Dynamic Route File**
  - Create `src/pages/events/[...slug].astro`.
- [x] **3.2 Static Path Generation**
  - Implement `getStaticPaths()` to generate routes for all entries in the collection.
- [x] **3.3 Detail Layout**
  - Use `<Layout title={entry.data.title} isFluid={false} />`.
  - Enforce the "Mobile App View" (`max-w-[480px]`).
- [x] **3.4 Content Rendering**
  - Render the Markdown body using `<Content />`.
  - Style the markdown content (headers, lists, images) to match the "Matte & Silence" design system.
- [x] **3.5 CTA & Navigation**
  - Implement a sticky "Ticket Reservation" button at the bottom.
  - Add a simple "Back to Top" navigation.

## Phase 4: Asset Optimization & Polish
**Goal:** Switch from static `public/` images to optimized `src/assets/` images.

- [x] **4.1 Image Migration**
  - Move high-quality original images to `src/assets/images/`.
- [x] **4.2 Schema Update**
  - Update `src/content/config.ts` to use the `image()` helper for validation and optimization.
- [x] **4.3 Component Update**
  - Refactor `HeroCard.astro` and `ArchiveCard.astro` to use Astro's `<Image />` component or `getImage()` for background images.
- [x] **4.4 Final Design Check**
  - Verify responsive behavior on Mobile and PC.
  - Ensure typography rules (Montserrat mixed with IBM Plex Sans JP) are applied correctly.

## Phase 5: Launch Preparation
**Goal:** Ensure the site builds correctly and deploy it to a live environment with CI/CD.

- [x] **5.1 Build Check**
  - Run `npm run build` to ensure no errors during static generation.
- [x] **5.2 Deployment & CI/CD**
  - Initialize Firebase Hosting.
  - Configure GitHub Actions for automated deployment.
  - Setup `dev-test` channel for preview deployments on push.

## Phase 6: Admin Dashboard & Hybrid Architecture (Cost Optimized)
**Goal:** Create a GUI Admin Panel while maintaining zero-cost read operations for the public site (SSG).

- [x] **6.1 Data Schema Expansion (Dual Images)**
  - Add `thumbnail` (Square) field to the schema alongside `mainVisual` (Portrait).
  - Update UI components (`HeroCard`) to use the square thumbnail.

- [x] **6.2 Firebase Backend Setup**
  - Initialize **Cloud Firestore** (Database).
  - Initialize **Firebase Storage** (Image hosting).
  - Set strict security rules (Read: Public, Write: Auth only).

- [ ] **6.3 Admin Dashboard (SPA)**
  - [x] Create a client-side admin area (e.g., `/admin` or separate route).
  - [x] Implement **Firebase Authentication** (Google Sign-In) to restrict access to the owner.
  - [ ] Build UI for Event CRUD (Create, Read, Update, Delete) connecting directly to Firestore. *(Current Blocker: Build Error in new.astro)*

- [ ] **6.4 Advanced Image Uploader**
  - Implement **Client-Side Compression**:
    - Resize and convert images to WebP *in the browser* before uploading.
    - Limit file size to save Storage costs and bandwidth.
  - Upload to Firebase Storage and retrieve download URLs.

- [ ] **6.5 Build-Time Data Fetching**
  - Modify `src/content/config.ts` (or create a data loader) to fetch events from **Firestore** instead of Markdown files during `npm run build`.
  - Ensure the site remains SSG (Static Site Generation).

- [ ] **6.6 Automated Deployment Pipeline**
  - Create a "Publish" button in the Admin Dashboard.
  - Trigger a **GitHub Actions Repository Dispatch** event upon publishing.
  - This action will re-build and re-deploy the static site with the latest data from Firestore.