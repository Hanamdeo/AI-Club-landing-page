# AI CLUB — MITS GWALIOR

An interactive, responsive web experience for the AI Club at Madhav Institute of Technology & Science (MITS-DU Gwalior).
Features a continuous 3D architectural data-centre corridor on desktop with companion NEX-01, and an optimized, high-performance fluid 2D reading experience on mobile.

---

## Getting Started

Run the development server in the repository root:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the website.

To create an optimized production build:

```bash
pnpm build
pnpm start
```

---

## Single Source of Truth Content Architecture

All data is organized into dedicated, single-purpose source files under `src/data/`:

* **`src/data/clubInfo.js`**: Club metadata, campus affiliation, pillars, contact coordinates, and social handles.
* **`src/data/events.js`**: Operations board events, hackathons, workshops, dates, and seat availability.
* **`src/data/projects.js`**: Shipped open-source systems, technical benchmarks, and GitHub repository links.
* **`src/data/team.js`**: Core leadership, faculty patron, domain leads, photos, and roles.
* **`src/data/discussions.js`**: Group discussions, paper reading circles, and preprints.
* **`src/data/research.js`**: Active research tracks, publications, and compute cluster allocations.
* **`src/data/announcements.js`**: Live dispatch bulletins and official broadcasts.

---

## Tech Stack

* **Framework**: Next.js (App Router)
* **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **Motion & Depth**: GSAP + ScrollTrigger + Lenis smooth scrolling (desktop only)
* **Styling**: Tailwind CSS + Custom Soft Dark Industrial palette
* **Icons**: Lucide React
