# ZEN

A calm, immersive digital space designed for stillness, focus, and presence.

Zen is not a typical website. It is a minimal, cinematic experience that uses motion, light, and restraint to guide the user into a quieter mental state.

---

## Philosophy

Most digital products compete for attention.

Zen does the opposite.

It removes noise, slows interaction, and creates a space where the user can pause, breathe, and reset.

The interface is intentionally minimal.
The motion is slow and deliberate.
Nothing exists without a reason.

---

## Experience

Zen is built as a continuous visual journey rather than a collection of pages.

* A scroll-driven hero introduces the environment through cinematic motion
* Sections unfold gradually, maintaining emotional continuity
* Visual elements use soft gradients, depth, and subtle contrast instead of harsh UI
* Interactions are intentionally minimal to avoid breaking immersion

This is not a dashboard.
This is a controlled, ambient experience.

---

## Core Features

* Scroll-scrubbed cinematic hero using high-resolution frame sequences
* High-DPI canvas rendering for sharp visuals across devices
* Dark, low-contrast visual system designed for comfort
* Section-based narrative structure (philosophy, breath, frequency, alignment)
* Minimal UI with focus on atmosphere rather than interaction

---

## Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    HeroScroll.tsx

public/
  frames/        # raw frame sequences
  frames-hd/     # high-resolution frames used in production
  stitch/        # design reference assets
```

---

## Hero Animation System

The hero section is powered by a canvas-based frame scrub system:

* Frames are rendered manually to canvas for full control
* Scroll position maps directly to frame index
* High-resolution assets ensure cinematic clarity
* Retina scaling is applied for consistent sharpness

Component:

```text
src/components/HeroScroll.tsx
```

---

## Updating Frames

To replace or extend the hero animation:

1. Maintain the filename pattern
   `ezgif-frame-001.jpg → ezgif-frame-XXX.jpg`

2. Update total frame count in:

```text
HeroScroll.tsx
```

3. Use high-resolution images (preferably >1920px width)

---

## Current Limitations

* No backend or user state yet
* Interactions are primarily visual
* Audio and session systems are not implemented

---

## Direction

Zen is evolving from a cinematic landing experience into a full meditation product.

Planned direction includes:

* Real-time breathing sessions
* Soundscapes and ambient audio
* Transition from scroll-based to state-based interaction
* Mobile-first experience and native app

---

## Guiding Principles

* Reduce, don’t add
* Motion should feel natural, never forced
* Performance is part of the experience
* Calm > features

---

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
