'use client';

import React, { useEffect, useRef, useState } from 'react';

const learningAreas = [
  { name: 'Google AI Studio', note: 'Rapid AI prototyping', accent: 'ice' },
  { name: 'Gemini API', note: 'Multimodal generation', accent: 'ice' },
  { name: 'Vertex AI', note: 'Production AI deployment', accent: 'ice' },
  { name: 'Cloud Run', note: 'Serverless containers', accent: 'indigo' },
  { name: 'Firebase', note: 'Realtime & auth', accent: 'indigo' },
  { name: 'MCP', note: 'Model Context Protocol', accent: 'ice' },
  { name: 'Agentic AI', note: 'Multi-step reasoning', accent: 'ice' },
  { name: 'Prompt Engineering', note: 'Structured generation', accent: 'ice' },
  { name: 'LangGraph', note: 'Agent orchestration', accent: 'ice' },
  { name: 'Workflow Automation', note: 'End-to-end pipelines', accent: 'indigo' },
];

export default function WhatImLearningSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) obs?.observe(sectionRef?.current);
    return () => obs?.disconnect();
  }, []);

  return (
    <section
      id="learning"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Atmospheric radial — ice-blue tint for AI/learning section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 18%, rgba(125,211,252,0.05) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 90% 70%, rgba(124,108,245,0.03) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">06 — WHAT I&apos;M LEARNING</span>
          <h2 className="text-section-xl" style={{ color: 'var(--foreground)' }}>
            Always learning.<br />Always building.
          </h2>
          <p
            className="text-base mt-6 max-w-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.75' }}
          >
            These are areas I am actively exploring — not expertise I claim, but territory I am deliberately moving into.
          </p>
        </div>

        <div className="section-divider mb-12" aria-hidden="true" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {learningAreas?.map((area, i) => (
            <div
              key={area?.name}
              className="p-5 group transition-all duration-250"
              style={{
                background: 'rgba(17,18,22,0.65)',
                border: `1px solid ${area.accent === 'ice' ? 'rgba(125,211,252,0.09)' : 'rgba(124,108,245,0.08)'}`,
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(10px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, border-color 0.25s ease`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = area.accent === 'ice' ? 'rgba(125,211,252,0.22)' : 'rgba(124,108,245,0.22)';
                el.style.background = 'rgba(23,24,29,0.88)';
                el.style.boxShadow = area.accent === 'ice' ? '0 0 24px rgba(125,211,252,0.05)' : '0 0 24px rgba(124,108,245,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = area.accent === 'ice' ? 'rgba(125,211,252,0.09)' : 'rgba(124,108,245,0.08)';
                el.style.background = 'rgba(17,18,22,0.65)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 animate-pulse-slow"
                  style={{ background: area.accent === 'ice' ? '#7DD3FC' : '#7C6CF5' }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px]"
                  style={{ color: 'rgba(245,245,245,0.28)', fontWeight: 500 }}
                >
                  Active
                </span>
              </div>
              <h3
                className="text-sm mb-1"
                style={{ fontWeight: 700, color: 'var(--foreground)' }}
              >
                {area?.name}
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                {area?.note}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="text-xs mt-10 max-w-md leading-relaxed"
          style={{ color: 'rgba(245,245,245,0.28)' }}
        >
          Engineering is a craft that rewards consistent curiosity. These areas represent where my attention is pointed right now — August 2026.
        </p>
      </div>
    </section>
  );
}