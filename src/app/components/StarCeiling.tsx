'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  baseX: number;
  baseY: number;
  colorType: number; // 0=white, 1=silver, 2=indigo, 3=ice-blue
  pulsePhase: number;
}

interface ConstellationLine {
  a: number;
  b: number;
  opacity: number;
}

// Rolls-Royce Starlight Headliner palette
const STAR_COLORS = [
  { r: 245, g: 245, b: 245 }, // pure white
  { r: 200, g: 202, b: 210 }, // silver
  { r: 124, g: 108, b: 245 }, // indigo
  { r: 125, g: 211, b: 252 }, // ice blue
];

// Weighted distribution: mostly white/silver, rare indigo/ice
const COLOR_WEIGHTS = [0.52, 0.32, 0.09, 0.07];

function pickColorType(): number {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < COLOR_WEIGHTS.length; i++) {
    acc += COLOR_WEIGHTS[i];
    if (r < acc) return i;
  }
  return 0;
}

export default function StarCeiling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const constellationsRef = useRef<ConstellationLine[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initStars = () => {
      // Premium density: 1200-1800 stars for Starlight Headliner feel
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 1800), 1800);
      starsRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x,
          y,
          z: Math.random(),
          baseX: x,
          baseY: y,
          size: Math.random() * 1.4 + 0.1,
          brightness: Math.random() * 0.6 + 0.1,
          twinkleSpeed: Math.random() * 0.006 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
          colorType: pickColorType(),
          pulsePhase: Math.random() * Math.PI * 2,
        };
      });

      // Build sparse constellation lines between nearby white/silver stars
      const lines: ConstellationLine[] = [];
      const whites = starsRef.current
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => s.colorType <= 1 && s.brightness > 0.4);

      for (let i = 0; i < whites.length && lines.length < 60; i++) {
        const a = whites[i];
        for (let j = i + 1; j < whites.length; j++) {
          const b = whites[j];
          let dx = a.s.baseX - b.s.baseX;
          let dy = a.s.baseY - b.s.baseY;
          const dist = Math.hypot(dx, dy);
          if (dist > 60 && dist < 140 && Math.random() < 0.12) {
            lines.push({ a: a.i, b: b.i, opacity: Math.random() * 0.12 + 0.04 });
            if (lines.length >= 60) break;
          }
        }
      }
      constellationsRef.current = lines;
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const mouse = mouseRef.current;
      const scroll = scrollRef.current;
      const parallaxOffset = scroll * 0.035;

      // Compute star positions
      const positions: { sx: number; sy: number }[] = [];

      for (let idx = 0; idx < stars.length; idx++) {
        const star = stars[idx];
        const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.28 + 0.72;
        const alpha = star.brightness * twinkle;

        let dx = 0;
        let dy = 0;
        if (mouse.active) {
          const mx = star.baseX - mouse.x;
          const my = star.baseY - mouse.y;
          const dist = Math.hypot(mx, my);
          const influence = Math.max(0, 1 - dist / 220);
          dx = mx * influence * 0.022 * (1 - star.z);
          dy = my * influence * 0.022 * (1 - star.z);
        }

        const sx = star.baseX + dx + (1 - star.z) * parallaxOffset * 0.22;
        const sy = star.baseY + dy + (1 - star.z) * parallaxOffset * 0.07;
        positions.push({ sx, sy });

        const col = STAR_COLORS[star.colorType];
        const r = col.r;
        const g = col.g;
        const b = col.b;

        // Larger stars get a soft glow halo
        const radius = star.size * 2.4;
        const glowRadius = star.size * 5;

        if (star.size > 0.9 && star.colorType >= 2) {
          // Colored stars: soft ambient glow
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
          glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.18})`);
          glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core star
        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw constellation lines
      const constellations = constellationsRef.current;
      for (const line of constellations) {
        const posA = positions[line.a];
        const posB = positions[line.b];
        if (!posA || !posB) continue;

        const pulse = Math.sin(timestamp * 0.0004 + line.opacity * 20) * 0.5 + 0.5;
        const lineAlpha = line.opacity * (0.6 + pulse * 0.4);

        ctx.beginPath();
        ctx.moveTo(posA.sx, posA.sy);
        ctx.lineTo(posB.sx, posB.sy);
        ctx.strokeStyle = `rgba(200,202,210,${lineAlpha})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-canvas"
      aria-hidden="true"
      style={{ background: 'transparent' }}
    />
  );
}