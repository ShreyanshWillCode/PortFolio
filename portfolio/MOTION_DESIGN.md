# Motion Design System Documentation

This document outlines the motion design elements implemented in the portfolio, detailing their purpose, technical implementation, and accessibility considerations.

## 1. Captivating Loading Animation

**Purpose:** To provide a smooth and engaging transition while the portfolio content loads, preventing a jarring blank screen.

**Implementation:**
- A loading overlay (`#loading-overlay`) is added directly to `index.html`.
- It's styled with a dark background and a spinning golden loader, using colors from the defined CSS variables.
- In `src/App.jsx`, GSAP is used to fade out this overlay (`opacity: 0, duration: 1, delay: 1.5`) once the main content is ready.

**Accessibility (prefers-reduced-motion):**
- If `prefers-reduced-motion` is enabled, the loading overlay immediately hides (`display: 'none'`) without any animation, ensuring a comfortable experience for users sensitive to motion.

**Mobile Optimization:**
- The loading animation's duration and delay are set to be quick enough for mobile contexts, providing a fast perceived load time.

## 2. High-Impact Intro Text with First-Visit Typewriter Effect

**Purpose:** To make a strong first impression with a dynamic and personalized introductory message that engages the user on their initial visit.

**Implementation:**
- The intro text element (`#intro-text`) in `src/App.jsx` is targeted.
- `Typewriter.js` is used to create a typewriter effect for the text "Shreyansh | Full Stack Developer."
- After the typing animation completes, GSAP animates the individual characters of the text (`opacity: 1, scale: 1, y: 0, stagger: 0.05`) for a subtle reveal.
- A golden glow (`boxShadow`) animation is applied to the text, pulsing briefly.
- `localStorage` (`visited` key) is used to track if a user has visited before. The typewriter effect only plays on the first visit.

**Accessibility (prefers-reduced-motion):**
- If `prefers-reduced-motion` is enabled, the typewriter effect and the subsequent character-by-character animation are skipped. The full intro text is displayed instantly with a static golden glow.

**Mobile Optimization:**
- The `delay` for the typewriter effect is set to a reasonable value (50ms) for smooth mobile readability. The glow animation duration is also optimized for smaller screens.

## 3. Scroll-Triggered Text Reveal

**Purpose:** To progressively reveal content as the user scrolls, maintaining engagement and preventing information overload.

**Implementation:**
- GSAP's `ScrollTrigger` plugin is registered and used in `src/App.jsx`.
- For sections like "About Me," "Skills," "Projects," and "Contact," text elements (`h2`, `h3`, `p`, `h4`, `.skill-card`, `.project-card`, `.contact-card`, `.social-icon-link`) are targeted.
- As a section enters the viewport (`start: "top 80%"`), its text elements fade in (`opacity: 1`) and slide up (`y: 0`) from a slightly hidden position (`opacity: 0, y: 50`).
- A `stagger` effect (`stagger: 0.1`) is applied to individual elements, creating a natural cascading reveal.
- `scrub: true` is used for some elements to tie the animation directly to the scroll position, providing a more fluid feel.

**Accessibility (prefers-reduced-motion):**
- All scroll-triggered animations are completely disabled if `prefers-reduced-motion` is enabled. Elements appear instantly without transition, respecting user preferences.

**Mobile Optimization:**
- The `start` and `end` trigger points for `ScrollTrigger` are designed to work effectively across various screen sizes. The `stagger` and `duration` values are chosen to ensure smooth performance on mobile devices.

## 4. Hover-Activated Info Cards (3D Tilt Effect + Color Shift)

**Purpose:** To add an interactive and visually appealing element to project and skill cards, encouraging exploration and highlighting key information.

**Implementation:**
- In `src/components/ProjectShowcase.tsx` and `src/components/Skills.tsx`:
  - `onMouseMove` and `onMouseLeave` event handlers are attached to the `motion.div` components representing the cards.
  - `gsap.to` is used to animate `rotationX`, `rotationY`, and `scale` properties, creating a subtle 3D tilt effect based on cursor position relative to the card.
  - `willChange: "transform, box-shadow"` is strategically used to optimize rendering performance during these transformations.
  - On hover, the `tech-tag` (project cards) and `skill-level-fill` (skill cards) background colors shift to the `accent` color.
  - On mouse leave, the cards return to their original state with an `elastic` ease for a natural snap-back effect.

**Accessibility (prefers-reduced-motion):**
- The 3D tilt and color shift hover animations are completely disabled if `prefers-reduced-motion` is enabled, providing a static, non-animated experience.

**Mobile Optimization:**
- On mobile devices where hover events are not typical, these animations will not be triggered. The focus is on ensuring the core information is accessible and readable.

## 5. Dynamic Background Gradient

**Purpose:** To create a continuous, immersive atmosphere that subtly changes as the user explores the portfolio.

**Implementation:**
- A `--background-hue` CSS variable is defined in `src/index.css`.
- In `src/App.jsx`, GSAP's `ScrollTrigger` is used to animate this `--background-hue` variable from `0` to `360` across the entire scrollable height of the `body` (`start: "top top", end: "bottom top", scrub: true`).
- The `body`'s `background` CSS property in `src/index.css` is set to a `linear-gradient` that utilizes this dynamic `--background-hue` along with fixed saturation and lightness values, resulting in a continuous hue shift.

**Accessibility (prefers-reduced-motion):**
- The dynamic background gradient animation is disabled if `prefers-reduced-motion` is enabled. The background remains static, adhering to user preferences.

**Mobile Optimization:**
- The animation is performance-optimized to ensure smooth rendering on mobile devices, with the hue shift being subtle enough not to be distracting.

--- 