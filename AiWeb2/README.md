# AI CLUB — IMMERSIVE DATA CENTRE EXPERIENCE

An immersive, single-page web experience for a college AI Club, designed as a continuous 3D architectural journey through a futuristic, soft-dark industrial data centre.

## Core Architectural Concept

Rather than traditional stacked cards and generic templates, the entire website is structured as **one continuous 3D architectural corridor** spanning from the atmospheric airlock entrance to the luminous exit portal.

### Facility Zones & Coordinates
| Zone | Facility Identifier | Virtual Z-Depth | Club Function |# PROJECT: AI CLUB — IMMERSIVE DATA CENTRE EXPERIENCE

## 1. Project Vision

Build a premium, immersive, single-page website for a college AI Club.

The central concept is an interactive futuristic data centre. The visitor should feel like they are physically entering and exploring a real technology facility as they scroll through the website.

This must NOT look like a conventional college club website with stacked sections, cards, gradients and generic AI-generated layouts.

The entire website should feel like ONE connected 3D architectural environment.

**Core experience:**
- The website opens at the entrance of a futuristic data centre.
- As the visitor scrolls down, the camera travels forward into the facility.
- Different areas of the data centre represent different website sections.
- Each section is revealed naturally as the camera reaches its designated location.
- At the end, the visitor reaches the exit area containing the Join AI Club experience.

The experience should feel cinematic, sophisticated, immersive and technically impressive.

## 2. Visual Direction

Design style: Soft Dark Industrial Futurism + Minimalist Architecture + Premium Technology Aesthetic.

Avoid typical cyberpunk visuals.

### Colour palette
- Primary background: Deep graphite (#171B1C)
- Secondary surfaces: Charcoal (#222828)
- Structural elements: Slate grey (#343D3C)
- Accent colour: Muted sage (#A2B29F)
- Secondary accent: Warm ivory (#E6E2D8)
- Lighting: Soft warm white

### Visual rules
- Dark but comfortable to look at.
- Subtle ambient lighting.
- Realistic shadows and reflections.
- Soft atmospheric depth.
- Restrained use of glowing elements.
- Premium typography.
- Generous spacing.
- Minimal borders.
- Glass panels used selectively.
- No excessive gradients.
- No bright neon blue.
- No random floating 3D objects.
- No unnecessary decorative elements.

The facility should look like a professionally designed architectural technology centre, not a gaming environment.

## 3. Technology Stack

Use the following technologies:

- Next.js with JavaScript (not TypeScript).
- React.
- Three.js.
- React Three Fiber.
- Drei.
- GSAP.
- GSAP ScrollTrigger.
- Tailwind CSS.
- Lucide React for icons.

Use HTML/CSS for all readable website content and React Three Fiber for the 3D environment.

Do not render text as 3D textures unless absolutely necessary.

## 4. Main 3D Environment

Build one continuous data centre environment.

### Architecture
Create a long, sophisticated data centre corridor with:

- Repeated server rack structures on both sides.
- Detailed but optimized server rack models.
- Ceiling panels and architectural lighting.
- Floor with subtle material reflections.
- Glass partitions.
- Doors connecting different facility zones.
- Visible depth and perspective.
- Subtle server indicator lights.
- Realistic environmental shadows.

The corridor should have enough visual depth to create a strong sense of movement.

Use reusable 3D components for server racks, doors, lights and architectural structures.

Do not model every individual server component unnecessarily.

### Camera system

The camera movement is the most important feature of this project.

Implement a scroll-controlled camera system using GSAP ScrollTrigger.

Expected behaviour:

1. Initial camera position: Outside or at the entrance of the data centre.
2. Scrolling down: Camera smoothly enters the main corridor.
3. Further scrolling: Camera travels through different facility zones.
4. At each zone: Camera movement synchronizes with the corresponding content section.
5. Final scroll: Camera reaches the exit and Join AI Club area.
6. Scrolling upward: Camera smoothly reverses its journey.

Camera movement should have carefully controlled acceleration, deceleration and transitions.

Avoid sudden camera jumps, excessive rotation and unnatural movement.

The environment must remain spatially connected throughout the entire journey.

## 5. Website Sections and Spatial Journey

Each section must represent an actual location inside the data centre.

### ZONE 01: ENTRANCE — HERO

Create an impressive cinematic entrance.

Visual:
- Large architectural entrance.
- AI CLUB branding.
- Main corridor visible in the background.
- Soft lighting.
- Subtle animated environmental details.

Content:
- AI CLUB
- "Where Curiosity Meets Intelligence."
- Short introduction.
- Explore the Facility CTA.
- Small scroll indicator.

The hero must immediately communicate the identity of an ambitious college AI community.

### ZONE 02: THE FOUNDATION — ABOUT US

The camera enters the main corridor and reaches the first dedicated facility zone.

Show:
- What the AI Club is.
- Our vision.
- Our mission.
- What members learn and build.
- Club statistics, if actual data is available.

Design the content as an architectural information display or integrated glass interface.

Avoid ordinary website cards.

### ZONE 03: RESEARCH LAB — AI RESEARCH

Create a dedicated research environment.

Show:
- Artificial Intelligence.
- Machine Learning.
- Generative AI.
- Computer Vision.
- Natural Language Processing.
- Emerging AI technologies.

Include an AI Research Radar featuring research topics, articles and interesting developments.

The section should feel like a working research laboratory.

### ZONE 04: OPERATIONS CENTRE — EVENTS

The camera reaches an operational control room.

Show:
- Upcoming events.
- Technical workshops.
- Group discussions.
- Competitions.
- Hackathons.
- Club activities.

Use integrated digital information displays for event listings.

Include event details, registration CTA and event status.

Do not fabricate actual event information.

### ZONE 05: PROJECT ARCHIVE — PROJECTS

Create a project showcase area.

Show:
- Student projects.
- AI experiments.
- Open-source contributions.
- Innovative prototypes.

Each project should have:
- Project name.
- Short description.
- Technologies used.
- Project image or preview.
- GitHub or live project link, when available.

Make the project display visually interesting and easy to explore.

### ZONE 06: COMMUNITY HUB — TEAM

Create a collaborative space inside the facility.

Show:
- Club leadership.
- Core team.
- Domain leads.
- Members.

Use professional profile layouts integrated with the environment.

Use real member photographs and information when provided.

Do not generate fake identities.

### ZONE 07: THE EXIT — JOIN AI CLUB

Create a visually memorable ending to the journey.

The camera approaches a bright architectural exit.

Show:
- "The Future Is Built Together."
- Short invitation to join.
- Join AI Club CTA.
- Contact information.
- Social media links.
- College affiliation.

This should be a strong and memorable final screen.

## 6. Hybrid 3D + 2D Architecture

This is a critical requirement.

Do not attempt to create the entire website inside Three.js.

Use the following architecture:

### 3D layer
- Main data centre architecture.
- Camera movement.
- Server racks.
- Lighting.
- Doors.
- Environmental objects.
- Spatial transitions.

### HTML/CSS layer
- All headings.
- Descriptions.
- Navigation.
- Event listings.
- Research information.
- Project showcases.
- Team profiles.
- Buttons.
- Forms.

Synchronize the HTML content with the camera's progress using GSAP ScrollTrigger.

The user should feel that the content belongs to the physical environment.

Avoid making HTML content look like random floating cards.

Use architectural glass displays, integrated panels, wall-mounted screens and carefully positioned information areas.

## 7. Scroll Interaction and Animation

Implement:

- Scroll-driven camera movement.
- Smooth section reveals.
- Subtle parallax.
- Controlled opacity transitions.
- Architectural lighting transitions.
- Subtle server indicator animations.
- Camera-based perspective changes.
- Smooth navigation to designated zones.
- Reverse animations when scrolling upward.

The animations should be elegant and intentional.

Avoid:
- Excessive bouncing.
- Over-animated text.
- Random floating objects.
- Excessive blur.
- Unnecessary loading animations.
- Scroll hijacking that prevents normal browser interaction.

## 8. Navigation

Keep navigation minimal.

Create a compact floating navigation bar with:
- AI CLUB logo.
- About.
- Research.
- Events.
- Projects.
- Team.
- Join.

Navigation items should scroll to the corresponding location in the same 3D journey.

Add a subtle journey progress indicator showing the visitor's current location inside the facility.

Navigation should remain visually unobtrusive.

## 9. Performance Requirements

The website must be optimized, not just visually impressive.

Important because the development environment may have limited hardware resources.

Implement:
- Reusable low-poly 3D models.
- Instanced meshes for repeated server racks wherever appropriate.
- Optimized geometries.
- Compressed textures.
- Baked lighting where practical.
- Limited real-time shadows.
- Lazy loading of non-critical assets.
- Efficient animation loops.
- Proper disposal of Three.js resources.
- Adaptive rendering quality.
- Avoid unnecessary React re-renders.

Avoid loading huge 3D assets.

Target a smooth experience on modern mid-range laptops and mobile devices.

## 10. Responsive and Mobile Experience

Do not simply shrink the desktop website.

Create an optimized mobile experience.

On mobile:
- Maintain the data centre concept.
- Simplify the 3D architecture.
- Reduce server rack density.
- Reduce lighting and shadow complexity.
- Optimize camera movement.
- Keep all content readable.
- Provide accessible navigation.
- Use a static or lightweight fallback if 3D performance is insufficient.

Support reduced-motion preferences.

Provide a fallback for devices that cannot render the 3D environment properly.

## 11. Design Quality Requirements

The final result must feel like a professionally art-directed technology experience.

Prioritize:
1. Strong visual storytelling.
2. Consistent architectural environment.
3. Cinematic camera movement.
4. High-quality typography.
5. Clear information hierarchy.
6. Natural section integration.
7. Excellent responsiveness.
8. Performance.

Do not use generic landing page templates.

Do not use the typical AI website design formula of a glowing hero, three feature cards, testimonials and a footer.

Every section must have a reason to exist within the physical data centre environment.

## 12. Development Instructions

Before implementation:

1. Understand the existing project structure.
2. Inspect the current framework and installed dependencies.
3. Reuse existing project configuration where possible.
4. Create a clear component architecture.
5. Plan the complete camera path and section positions.
6. Build the 3D environment first.
7. Implement camera movement.
8. Synchronize HTML content with scroll progress.
9. Add the remaining sections.
10. Optimize desktop and mobile performance.

Do not replace the entire project unnecessarily.

Do not leave sections unfinished or use placeholder cards as the final design.

Use realistic assets and consistent materials.

Do not invent actual club statistics, events, members or project details.

If real information is unavailable, use clearly editable placeholder content.

### Final Acceptance Criteria

The website is successful only if:

- The visitor experiences one continuous data centre environment.
- Scrolling genuinely moves the 3D camera through the facility.
- Different physical zones represent different club sections.
- HTML content feels naturally integrated into the environment.
- Scrolling backward works correctly.
- Navigation takes visitors to the correct zones.
- The website works on desktop and mobile.
- The visual experience is premium, cohesive and memorable.
- Performance remains reasonable on mid-range hardware.

**Final creative direction: Build an interactive journey through an intelligent facility, not another college club landing page.**
| :--- | :--- | :--- | :--- |
| **Zone 01** | `Z-01 // AIRLOCK ENTRY` | `+10.0 M` | **Hero & Identity** — Vision, motto, explore CTA |
| **Zone 02** | `Z-02 // CORE INFRASTRUCTURE` | `-15.0 M` | **Foundation (About)** — Mission, vision, core pillars, stats |
| **Zone 03** | `Z-03 // APPLIED LABS` | `-45.0 M` | **Research Lab** — Interactive AI Research Radar (LLMs, Vision, NLP, TinyML) |
| **Zone 04** | `Z-04 // MISSION CONTROL` | `-75.0 M` | **Operations Centre** — Hackathons, workshops, and registrations |
| **Zone 05** | `Z-05 // REPOSITORY VAULT` | `-105.0 M` | **Project Archive** — Open-source repositories and prototypes |
| **Zone 06** | `Z-06 // CREW QUARTERS` | `-135.0 M` | **Community Hub** — Leadership, domain leads, and faculty |
| **Zone 07** | `Z-07 // SURFACE ACCESS` | `-165.0 M` | **The Exit** — Membership intake portal, contact, and socials |

---

## Tech Stack & Tooling

* **Framework**: Next.js 14 (JavaScript / JSX, App Router)
* **Package Manager**: `pnpm` (v12.14+)
* **3D Engine**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **Camera & Scroll**: GSAP 3 + ScrollTrigger + Lenis smooth scrolling
* **Styling**: Tailwind CSS with custom Soft Dark Industrial Futurism color palette
* **Icons**: Lucide React

---

## Design System & Color Tokens

* **Primary Background**: Deep graphite (`#171B1C`)
* **Secondary Surfaces**: Charcoal (`#222828`)
* **Structural Elements**: Slate grey (`#343D3C`)
* **Accent Colour**: Muted sage (`#A2B29F`)
* **Secondary Accent**: Warm ivory (`#E6E2D8`)
* **Lighting**: Soft warm white (`#FFF8EE`)

---

## Editing Club Information

All text, events, statistics, publications, projects, team members, and social coordinates are centralized in:

```
src/data/clubData.js
```

Simply update this file to modify any content across the 3D facility.

---

## Getting Started

Run the development server using **pnpm**:

```bash
cd aiweb2
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the facility.

To build for production:

```bash
pnpm build
pnpm start
```
