// Motion preference store. Default: on, unless the user asked for reduced motion
// or the device looks low-end. The visible toggle overrides and persists.
type Listener = () => void;
const listeners = new Set<Listener>();
let current: boolean | null = null;

function detect(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem("motion");
    if (saved === "on") return true;
    if (saved === "off") return false;
  } catch {}
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if ((navigator.hardwareConcurrency ?? 8) <= 4) return false;
  return true;
}

export function getMotion(): boolean {
  if (current === null) current = detect();
  return current;
}

export function setMotion(on: boolean) {
  current = on;
  try {
    localStorage.setItem("motion", on ? "on" : "off");
  } catch {}
  document.documentElement.dataset.motion = on ? "on" : "off";
  listeners.forEach((l) => l());
}

export function subscribeMotion(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export const getServerMotion = () => false;
