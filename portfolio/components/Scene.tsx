"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sceneState } from "@/lib/sceneState";

const VERT = /* glsl */ `
attribute vec3 aChain;
attribute vec3 aRing;
attribute float aSeed;
uniform float uTime, uM1, uM2, uPx;
varying float vMix;
void main() {
  float m1 = smoothstep(0.0, 1.0, uM1);
  float m2 = smoothstep(0.0, 1.0, uM2);
  vec3 p = mix(position, aChain, m1);
  p = mix(p, aRing, m2);
  p += vec3(sin(uTime * 0.6 + aSeed * 40.0), cos(uTime * 0.5 + aSeed * 23.0), sin(uTime * 0.7 + aSeed * 11.0)) * 0.014;
  float t = sin(3.14159 * clamp(uM1, 0.0, 1.0)) + sin(3.14159 * clamp(uM2, 0.0, 1.0));
  p += (vec3(fract(aSeed * 17.3), fract(aSeed * 31.7), fract(aSeed * 7.1)) - 0.5) * t * 1.1;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uPx * (0.6 + aSeed * 0.9) * (6.0 / -mv.z);
  vMix = clamp(p.x * 0.18 + p.y * 0.22 + 0.5 + (aSeed - 0.5) * 0.35, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uA, uB;
uniform float uAlpha;
varying float vMix;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(mix(uA, uB, vMix), a * uAlpha);
}`;

function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function buildGeometry(n: number) {
  const sphere = new Float32Array(n * 3);
  const chain = new Float32Array(n * 3);
  const ring = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const R = 1.25;
  const CUBES = 5;
  const cubeSize = 0.36;
  const cubeCenters = Array.from({ length: CUBES }, (_, i) => {
    const t = i / (CUBES - 1);
    return new THREE.Vector3(-2.8 + t * 5.6, Math.sin(t * Math.PI * 1.5) * 0.7 - 0.2, 0);
  });
  const nCube = Math.floor(n * 0.78);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    seed[i] = rand(i + 1);
    // sphere (fibonacci)
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const rr = R * (0.985 + rand(i * 3.1) * 0.03);
    sphere.set([Math.cos(th) * r * rr, y * rr, Math.sin(th) * r * rr], i * 3);
    // chain: cube edges/faces, then links
    let cx = 0, cy = 0, cz = 0;
    if (i < nCube) {
      const c = cubeCenters[i % CUBES];
      const sz = cubeSize;
      let p: [number, number, number];
      if (rand(i * 5.7) < 0.78) {
        // point on one of the 12 edges: axis a runs, the other two axes sit at +-sz
        const ax = Math.floor(rand(i * 3.9) * 3);
        const sgnA = rand(i * 1.3) < 0.5 ? 1 : -1, sgnB = rand(i * 6.1) < 0.5 ? 1 : -1;
        const along = (rand(i * 9.3) * 2 - 1) * sz;
        const q = [0, 0, 0];
        q[ax] = along;
        q[(ax + 1) % 3] = sgnA * sz;
        q[(ax + 2) % 3] = sgnB * sz;
        p = [q[0], q[1], q[2]];
      } else {
        // sparse fill on a face so the cube reads as a solid
        const face = Math.floor(rand(i * 2.1) * 6);
        const u = (rand(i * 9.3) - 0.5) * 2, v = (rand(i * 2.9) - 0.5) * 2;
        const pts: [number, number, number][] = [[sz, u * sz, v * sz], [-sz, u * sz, v * sz], [u * sz, sz, v * sz], [u * sz, -sz, v * sz], [u * sz, v * sz, sz], [u * sz, v * sz, -sz]];
        p = pts[face];
      }
      // rotate each cube 35deg around Y and 20deg around X so it reads as a cube
      const ay = 0.61, ax = 0.35;
      const x1 = p[0] * Math.cos(ay) + p[2] * Math.sin(ay);
      const z1 = -p[0] * Math.sin(ay) + p[2] * Math.cos(ay);
      const y2 = p[1] * Math.cos(ax) - z1 * Math.sin(ax);
      const z2 = p[1] * Math.sin(ax) + z1 * Math.cos(ax);
      cx = c.x + x1; cy = c.y + y2; cz = c.z + z2;
    } else {
      const seg = i % (CUBES - 1);
      const a = cubeCenters[seg], b = cubeCenters[seg + 1];
      const t = 0.22 + rand(i * 4.4) * 0.56;
      cx = a.x + (b.x - a.x) * t; cy = a.y + (b.y - a.y) * t; cz = 0;
      cy += (rand(i * 8.8) - 0.5) * 0.03;
    }
    chain.set([cx, cy, cz], i * 3);
    // ring
    const ang = rand(i * 6.6) * Math.PI * 2;
    const rad = 3.1 + (rand(i * 1.7) - 0.5) * 0.14;
    const zj = (rand(i * 7.7) - 0.5) * 0.12;
    ring.set([Math.cos(ang) * rad, Math.sin(ang) * rad * 0.62, zj + Math.sin(ang) * rad * 0.2], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(sphere, 3));
  g.setAttribute("aChain", new THREE.BufferAttribute(chain, 3));
  g.setAttribute("aRing", new THREE.BufferAttribute(ring, 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  return g;
}

function Particles({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const light = useRef(false);
  const ready = useRef(false);
  const geo = useMemo(() => buildGeometry(count), [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 }, uM1: { value: 0 }, uM2: { value: 0 }, uPx: { value: 2.2 }, uAlpha: { value: 0.9 },
      uA: { value: new THREE.Color("#8b5cf6") }, uB: { value: new THREE.Color("#2ee6a6") },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const apply = () => {
      light.current = document.documentElement.dataset.theme === "light";
      if (mat.current) {
        mat.current.uniforms.uA.value.set(light.current ? "#6d3fe0" : "#8b5cf6");
        mat.current.uniforms.uB.value.set(light.current ? "#0b8f63" : "#2ee6a6");
        mat.current.blending = light.current ? THREE.NormalBlending : THREE.AdditiveBlending;
        mat.current.needsUpdate = true;
      }
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.removeEventListener("pointermove", onMove);
      mo.disconnect();
      geo.dispose();
    };
  }, [geo]);

  useFrame((state, dt) => {
    const g = group.current;
    const material = mat.current;
    if (!g || !material) return;
    const uniforms = material.uniforms;
    const m = mouse.current;
    m.x += (m.tx - m.x) * Math.min(1, dt * 3);
    m.y += (m.ty - m.y) * Math.min(1, dt * 3);
    const m1 = sceneState.m1, m2 = sceneState.m2;
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uM1.value = m1;
    uniforms.uM2.value = m2;
    uniforms.uPx.value = Math.min(gl.getPixelRatio(), 1.75) * (size.width < 768 ? 3.4 : 3.0);
    uniforms.uAlpha.value = size.width < 768 ? 0.8 : 0.95;
    const desktop = size.width >= 1024;
    const pxToWorld = viewport.height / size.height;
    const orbPx = Math.min(460, size.width * 0.8);
    const sphereScale = ((orbPx / 2) * pxToWorld * 0.92) / 1.25;
    const wideScale = Math.min(sphereScale * 1.6, (viewport.width * 0.92) / 6.6);
    const ringScale = Math.min((viewport.width * 0.98) / 6.4, (viewport.height * 0.95) / (2 * 3.1 * 0.62 + 0.3));
    const a = Math.min(1, m1 * 1.0), b = Math.min(1, m2);
    const sc = THREE.MathUtils.lerp(THREE.MathUtils.lerp(sphereScale, wideScale, a), ringScale, b);
    g.scale.setScalar(sc);
    const hero = 1 - a;
    const hx = desktop ? viewport.width * 0.226 : 0;
    const hy = desktop ? 0.0 : -viewport.height * 0.34;
    g.position.set(hx * hero, hy * hero, 0);
    const calm = 1 - Math.max(m1, m2) * 0.85;
    g.rotation.y = (t * 0.12 + m.x * 0.45) * calm + m.x * 0.12 * (1 - calm);
    g.rotation.x = m.y * 0.22 * calm - 0.05 * (1 - calm);
    g.rotation.z = 0;
    if (!ready.current) {
      ready.current = true;
      document.documentElement.dataset.scene = "ready";
    }
  });

  return (
    <group ref={group}>
      <points geometry={geo} frustumCulled={false}>
        <shaderMaterial
          ref={mat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function PauseWhenHidden() {
  const setFrameloop = useThree((st) => st.setFrameloop);
  useEffect(() => {
    const onVis = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [setFrameloop]);
  return null;
}

export default function Scene({ count }: { count: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PauseWhenHidden />
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
