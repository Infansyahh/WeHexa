"use client";

import { useEffect, useId, useState } from "react";

type FilterMaps = {
  width: number;
  height: number;
  dispUrl: string;
  specUrl: string;
  scale: number;
};

/**
 * Apple-style convex squircle bezel profile over normalized bezel distance x in [0, 1].
 */
function convexSquircle(x: number): number {
  const clamped = Math.max(0, Math.min(1, x));
  return Math.pow(1 - Math.pow(1 - clamped, 4), 0.25);
}

/**
 * Computes Snell's-law horizontal refraction displacement along a curved glass bezel.
 */
function calculateRefractionProfile(
  glassThickness: number,
  bezelWidth: number,
  ior: number,
  samples = 128,
): Float64Array {
  const eta = 1 / ior;
  const profile = new Float64Array(samples);

  for (let i = 0; i < samples; i++) {
    const x = i / samples;
    const y = convexSquircle(x);
    const dx = x < 1 ? 0.0001 : -0.0001;
    const y2 = convexSquircle(x + dx);
    const deriv = (y2 - y) / dx;
    const mag = Math.sqrt(deriv * deriv + 1);
    const nx = -deriv / mag;
    const ny = -1 / mag;
    const dot = ny;
    const k = 1 - eta * eta * (1 - dot * dot);

    if (k < 0) {
      profile[i] = 0;
      continue;
    }

    const sq = Math.sqrt(k);
    const rx = -(eta * dot + sq) * nx;
    const ry = eta - (eta * dot + sq) * ny;
    profile[i] = rx * ((y * bezelWidth + glassThickness) / ry);
  }

  return profile;
}

/**
 * Computes signed outward normal and distance from the inner edge of a rounded rectangle bezel.
 */
function sampleRoundedRectBezel(
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
  bezelWidth: number,
): { distFromOuter: number; nx: number; ny: number } | null {
  const innerW = w - r * 2;
  const innerH = h - r * 2;

  // Center of nearest corner circle
  const cx = px < r ? r : px > w - r ? w - r : px;
  const cy = py < r ? r : py > h - r ? h - r : py;

  // Inside rounded corners
  if ((px < r || px > w - r) && (py < r || py > h - r)) {
    const dx = px - cx;
    const dy = py - cy;
    const d = Math.hypot(dx, dy);
    if (d > r + 1 || d < r - bezelWidth) return null;
    if (d === 0) return null;
    return {
      distFromOuter: r - d,
      nx: dx / d,
      ny: dy / d,
    };
  }

  // Straight edges
  const distLeft = px;
  const distRight = w - px;
  const distTop = py;
  const distBottom = h - py;

  const minSide = Math.min(
    px >= r && px <= w - r ? Math.min(distTop, distBottom) : Infinity,
    py >= r && py <= h - r ? Math.min(distLeft, distRight) : Infinity,
  );

  // Also handle flat-edge overlap in pill shapes where innerW or innerH >= 0
  if (minSide > bezelWidth || minSide < -1) return null;

  let nx = 0;
  let ny = 0;
  if (innerW >= 0 && px >= r && px <= w - r) {
    if (distTop <= distBottom && distTop <= bezelWidth) {
      ny = -1;
    } else if (distBottom < distTop && distBottom <= bezelWidth) {
      ny = 1;
    }
  }
  if (innerH >= 0 && py >= r && py <= h - r && nx === 0 && ny === 0) {
    if (distLeft <= distRight && distLeft <= bezelWidth) {
      nx = -1;
    } else if (distRight < distLeft && distRight <= bezelWidth) {
      nx = 1;
    }
  }

  if (nx === 0 && ny === 0) return null;
  return { distFromOuter: Math.max(0, minSide), nx, ny };
}

function generateDisplacementMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  profile: Float64Array,
  maxDisp: number,
): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(w, h);
  const data = img.data;
  const samples = profile.length;

  // Neutral displacement: R=128, G=128, B=0, A=255
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 128;
    data[i + 1] = 128;
    data[i + 2] = 0;
    data[i + 3] = 255;
  }

  const margin = Math.ceil(bezelWidth) + 2;

  for (let y = 0; y < h; y++) {
    const inMidY = y > margin && y < h - margin;
    for (let x = 0; x < w; x++) {
      if (inMidY && x > margin && x < w - margin) {
        x = w - margin - 1;
        continue;
      }

      const hit = sampleRoundedRectBezel(x, y, w, h, radius, bezelWidth);
      if (!hit) continue;

      const t = Math.max(0, Math.min(0.9999, hit.distFromOuter / bezelWidth));
      const idx = Math.floor(t * samples);
      const disp = profile[idx] / maxDisp;
      const feather = Math.min(1, Math.max(0, hit.distFromOuter));
      const mag = disp * 127 * feather;

      const p = (y * w + x) * 4;
      data[p] = Math.round(Math.max(0, Math.min(255, 128 + hit.nx * mag)));
      data[p + 1] = Math.round(Math.max(0, Math.min(255, 128 + hit.ny * mag)));
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

function generateSpecularMap(
  w: number,
  h: number,
  radius: number,
  bezelWidth: number,
  angle = -Math.PI * 0.68,
): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(w, h);
  const data = img.data;
  const lx = Math.cos(angle);
  const ly = Math.sin(angle);
  const margin = Math.ceil(bezelWidth) + 2;

  for (let y = 0; y < h; y++) {
    const inMidY = y > margin && y < h - margin;
    for (let x = 0; x < w; x++) {
      if (inMidY && x > margin && x < w - margin) {
        x = w - margin - 1;
        continue;
      }

      const hit = sampleRoundedRectBezel(x, y, w, h, radius, bezelWidth);
      if (!hit) continue;

      const fromSide = Math.max(0, Math.min(1, hit.distFromOuter / bezelWidth));
      const edge = Math.sqrt(Math.max(0, 1 - Math.pow(1 - fromSide, 2)));
      const rawDot = hit.nx * lx + hit.ny * ly;
      // Strong key light top-left, delicate rim bounce bottom-right
      const directional = rawDot > 0 ? rawDot : Math.abs(rawDot) * 0.42;
      const falloff = Math.pow(1 - fromSide, 1.35);
      const alpha = Math.round(Math.max(0, Math.min(255, 255 * directional * edge * falloff)));

      const p = (y * w + x) * 4;
      data[p] = 255;
      data[p + 1] = 255;
      data[p + 2] = 255;
      data[p + 3] = alpha;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

function supportsSvgBackdropFilter(): boolean {
  if (typeof window === "undefined") return false;
  // SVG url() inside backdrop-filter is currently supported in Chromium-based browsers;
  // Safari and Firefox drop the entire declaration if url() is present.
  const ua = navigator.userAgent;
  const isChromium =
    ("chrome" in window || /Edg\/|Chrome\/|Chromium\//.test(ua)) &&
    !/Firefox\//.test(ua);
  return isChromium;
}

type LiquidGlassOpticsProps = {
  targetRef: React.RefObject<HTMLElement | null>;
};

/**
 * Generates an Apple-inspired physics-based SVG refraction & specular rim filter
 * sized dynamically to the target pill element (Chromium progressive enhancement).
 */
export default function LiquidGlassOptics({ targetRef }: LiquidGlassOpticsProps) {
  const rawId = useId();
  const filterId = `liquid-glass-${rawId.replace(/:/g, "")}`;
  const [maps, setMaps] = useState<FilterMaps | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(supportsSvgBackdropFilter());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = targetRef.current;
    if (!el) return;

    let timer: number | undefined;

    const rebuild = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w < 16 || h < 16) return;

      const radius = Math.floor(Math.min(w, h) / 2);
      const bezelWidth = Math.max(8, Math.min(18, radius - 2));
      const glassThickness = 14;
      const ior = 1.48;

      const profile = calculateRefractionProfile(glassThickness, bezelWidth, ior, 128);
      const maxDisp = Math.max(...Array.from(profile).map(Math.abs)) || 1;
      const dispUrl = generateDisplacementMap(w, h, radius, bezelWidth, profile, maxDisp);
      const specUrl = generateSpecularMap(w, h, radius, Math.min(radius, bezelWidth * 1.6));

      if (!dispUrl || !specUrl) return;

      setMaps({
        width: w,
        height: h,
        dispUrl,
        specUrl,
        scale: Math.min(18, maxDisp * 0.55),
      });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(rebuild, 80);
    };

    rebuild();

    const observer = new ResizeObserver(schedule);
    observer.observe(el);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [enabled, targetRef]);

  return (
    <>
      {enabled && maps && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden"
          width="0"
          height="0"
        >
          <defs>
            <filter
              id={filterId}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="frosted" />
              <feImage
                href={maps.dispUrl}
                x="0"
                y="0"
                width={maps.width}
                height={maps.height}
                result="disp_map"
              />
              <feDisplacementMap
                in="frosted"
                in2="disp_map"
                scale={maps.scale}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feColorMatrix
                in="displaced"
                type="saturate"
                values="1.95"
                result="displaced_sat"
              />
              <feImage
                href={maps.specUrl}
                x="0"
                y="0"
                width={maps.width}
                height={maps.height}
                result="spec_layer"
              />
              <feComposite
                in="displaced_sat"
                in2="spec_layer"
                operator="in"
                result="spec_masked"
              />
              <feComponentTransfer in="spec_layer" result="spec_faded">
                <feFuncA type="linear" slope="0.34" />
              </feComponentTransfer>
              <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
              <feBlend in="spec_faded" in2="with_sat" mode="normal" />
            </filter>
          </defs>
        </svg>
      )}

      <span
        aria-hidden="true"
        className="liquid-glass-backdrop"
        style={
          enabled && maps
            ? {
                backdropFilter: `url(#${filterId})`,
                WebkitBackdropFilter: `url(#${filterId})`,
              }
            : undefined
        }
      />
    </>
  );
}
