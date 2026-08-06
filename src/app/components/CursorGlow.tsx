'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const indigoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth follow with slight lag for premium feel
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.left = `${currentX}px`;
        glowRef.current.style.top = `${currentY}px`;
      }
      if (indigoRef.current) {
        indigoRef.current.style.left = `${currentX}px`;
        indigoRef.current.style.top = `${currentY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer ice-blue ambient */}
      <div
        ref={glowRef}
        className="hidden lg:block"
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(125,211,252,0.025) 0%, rgba(124,108,245,0.015) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Inner indigo core */}
      <div
        ref={indigoRef}
        className="hidden lg:block"
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,108,245,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />
    </>
  );
}