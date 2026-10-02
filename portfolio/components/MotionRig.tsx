"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getMotion, getServerMotion, subscribeMotion } from "@/lib/motion";
import { sceneState } from "@/lib/sceneState";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function MotionRig() {
  const motion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  const [mountScene, setMountScene] = useState(false);
  const [count, setCount] = useState(7000);

  // Reflect the preference on <html> so CSS can react, and pick particle budget.
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    if (!motion) delete document.documentElement.dataset.scene;
    setCount(window.innerWidth < 768 ? 2500 : 7000);
  }, [motion]);

  // Load the canvas only after first paint has settled, so it never competes with LCP.
  useEffect(() => {
    if (!motion) {
      setMountScene(false);
      return;
    }
    const start = () => setMountScene(true);
    // Two seconds after mount is well past LCP on the target devices.
    const id = window.setTimeout(start, 1500);
    return () => window.clearTimeout(id);
  }, [motion]);

  // Smooth scroll + scroll-scrubbed morphs + timeline line draw.
  useEffect(() => {
    if (!motion) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ anchors: true, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if (new URLSearchParams(window.location.search).has("debug")) (window as unknown as { __scene: typeof sceneState }).__scene = sceneState;
    const ctx = gsap.context(() => {
      gsap.to(sceneState, { m1: 1, ease: "none", scrollTrigger: { trigger: "#work", start: "top 85%", end: "top 25%", scrub: 1 } });
      gsap.to(sceneState, { m2: 1, ease: "none", scrollTrigger: { trigger: "#contact", start: "top 100%", end: "top 45%", scrub: 1 } });
      gsap.fromTo(
        "[data-timeline-line]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: "#experience-list", start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      gsap.from("[data-hero-word]", { yPercent: 60, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.05, delay: 0.1 });
    });
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      sceneState.m1 = 0;
      sceneState.m2 = 0;
    };
  }, [motion]);

  return motion && mountScene ? <Scene count={count} /> : null;
}
