// Shared mutable state written by GSAP ScrollTrigger, read by the R3F frame loop.
// Plain object on purpose: no React re-renders on scroll.
export const sceneState = {
  m1: 0, // sphere -> linked cubes (Work)
  m2: 0, // linked cubes -> ring (Contact)
};
