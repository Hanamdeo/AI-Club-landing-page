# PHOENIX // Collegiate AI Club Experience

> **Intelligence. Imagination. Ignited.**
> A production-grade, immersive 3D web experience built for the college AI Club featuring a continuous, scroll-reactive **Phoenix** mascot as the visual protagonist.

---

## ⚡ Core Architecture

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/) — Server-side structure with optimized client component boundaries (`'use client'`).
- **3D Mascot Engine**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) — Procedural stylized Cyber-Phoenix with dynamic aerodynamic wing kinematics, crystalline pulsing energy core, and instanced GPU flame/ember particle stream.
- **Scroll Choreography**: [GSAP](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/) — Coordinated timeline driving the Phoenix's 3D position, rotation, and banking across all 12 page sections.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) — Dark cyberpunk editorial aesthetic (`#07090D` background, electric cyan `#00F0FF`, cobalt `#0070F3`, and restrained ember accents `#FF4500`).
- **Icons**: [Lucide React](https://lucide.dev/).

---

## 🦅 The Phoenix Flight Journey

1. **Phase A (Navbar Awakening)**: Phoenix awakens inside the navbar brand emblem with cyan pulse.
2. **Phase B (Hero Takeoff)**: Swoops along a 3D curved Bézier flight trajectory, banking 45° with trailing particle ignition, settling into a proud hover beside the main headline.
3. **Phase D (Continuous Scroll Choreography)**:
   - **Hero → About**: Glides into cruising posture backgrounded behind editorial pillars.
   - **About → AI Research Radar**: Glides diagonally to the left flank, projecting a holographic circular scanning pulse into frontier research modules.
   - **Radar → Events Arena**: Ascends to a high aerodynamic perch overlooking the 36-hour hackathon and CUDA workshop schedule.
   - **Events → GD Arena**: Positions overhead in an authoritative council stance surveying the dialectic debate arena.
   - **GD → Projects Showcase**: Sweeps down to the left flank, rotating dynamically to spotlight student AI builds.
   - **Projects → Gallery & Blog**: Pulls into deep space for rich parallax depth behind visual archives and research dispatches.
   - **Final Join CTA**: Centers at full wingspan in a triumphant pose with synchronized dual cobalt/ember rim lights, anchoring the admissions call.

---

## 🛠️ Project Structure

```text
src/
├── app/
│   ├── layout.jsx               # Root layout, metadata, viewport, font declarations
│   ├── page.jsx                 # Main landing page assembling persistent 3D canvas and sections
│   └── globals.css              # Cyber-grid, custom scrollbars, and Tailwind directives
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx           # Fixed frosted-glass navbar, active status beacon, mobile drawer
│   │   └── Footer.jsx           # Campus credentials, links, telemetry, and ASCII crest
│   ├── phoenix/
│   │   ├── PhoenixCanvas.jsx    # Persistent fixed full-viewport WebGL canvas (SSR false)
│   │   ├── PhoenixModel.jsx     # High-fidelity procedural 3D Cyber-Phoenix + GLB support
│   │   └── PhoenixParticles.jsx # Instanced GPU particle flame & ember stream
│   ├── sections/
│   │   ├── HeroSection.jsx      # Headline, telemetry badges, primary & secondary CTAs
│   │   ├── AboutSection.jsx     # Four foundational pillars, engineering standards
│   │   ├── ResearchRadarSection.jsx # Interactive radar HUD (GenAI, Agents, Vision, Systems)
│   │   ├── EventsSection.jsx    # Filterable categories, seats remaining, schedule snapshots
│   │   ├── GDRoomSection.jsx    # The GD Arena (Upcoming debate GD-42, dialectic pro/con)
│   │   ├── ProjectsSection.jsx  # [PRIORITY] Filterable showcase, metrics, architecture modal
│   │   ├── GallerySection.jsx   # Curated event archives, hackathons, robotics field tests
│   │   ├── BlogSection.jsx      # Research dispatches, paper reviews, newsletter subscribe
│   │   ├── TeamSection.jsx      # Leadership, faculty mentors, verified credentials
│   │   └── JoinCTASection.jsx   # [PRIORITY] Final Phoenix pose, interactive application modal
│   └── ui/
│       ├── Button.jsx           # High-contrast interactive buttons with hover sheen
│       ├── Badge.jsx            # Technical label chips
│       ├── Modal.jsx            # Accessible portal modal dialogs
│       ├── NoiseOverlay.jsx     # Subtle film grain texture
│       └── WebGLFallback.jsx    # Graceful SVG holographic fallback for non-WebGL devices
├── data/
│   ├── clubConfig.js            # Club info, social links, stats
│   ├── projectsData.js          # Student AI builds, benchmarks, architecture details
│   ├── eventsData.js            # Sprints, hackathons, workshops
│   ├── gdData.js                # Bi-weekly debate topics and consensus logs
│   ├── researchData.js          # Radar nodes, quadrants, active pod work
│   └── teamData.js              # Operating corps and faculty advisors
└── hooks/
    ├── useReducedMotion.js      # Prefers-reduced-motion accessibility
    └── useWindowSize.js         # Responsive viewport dimensions and breakpoints
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher (Tested on Node `v24.14.0`)
- npm `v9.0.0` or higher

### Local Development
```bash
# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Start the production server
npm start
```

---

## 🛡️ Accessibility & Performance
- **Reduced Motion**: Automatically honors `prefers-reduced-motion` media queries, settling the Phoenix into calm static positions per section without scroll-linked rotation.
- **Graceful WebGL Fallback**: If WebGL context is unavailable or fails, an animated holographic SVG phoenix avatar is displayed automatically.
- **Mobile Responsive**: Dynamically adjusts camera FOV and Phoenix scaling/positioning to prevent blocking touch targets or text readability on mobile devices.
