'use client';

import React, { useEffect, useRef, useState } from 'react';

const focusAreas = [
  { title: 'FastAPI at Scale', description: 'Building async Python services that handle real production traffic with proper error handling and observability.', accent: 'indigo' },
  { title: 'AI Agents', description: 'Designing multi-step agents using LangGraph and Google\'s agent frameworks that accomplish tasks autonomously.', accent: 'ice' },
  { title: 'Google Cloud Platform', description: 'Cloud Run, Vertex AI, and Firebase — building the infrastructure layer for AI-native applications.', accent: 'ice' },
  { title: 'Gemini Integration', description: 'Embedding Gemini\'s multimodal capabilities into products where intelligence becomes a feature, not a demo.', accent: 'ice' },
  { title: 'Developer Tooling', description: 'Building internal tools and CLIs that make engineering teams move faster without sacrificing quality.', accent: 'indigo' },
  { title: 'Intelligent UX', description: 'Designing interfaces that adapt to user intent — where AI reduces friction rather than adding complexity.', accent: 'indigo' },
];

export default function CurrentFocusSection() {
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
      id="current-focus"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Atmospheric radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 28%, rgba(125,211,252,0.05) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 8% 80%, rgba(124,108,245,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">08 — CURRENT FOCUS</span>
          <h2 className="text-section-xl max-w-2xl" style={{ color: 'var(--foreground)' }}>
            Building software where AI becomes part of the workflow.
          </h2>
          <p
            className="text-base mt-6 max-w-xl leading-relaxed"
            style={{ color: 'var(--text-secondary)', lineHeight: '1.75' }}
          >
            I am intentionally moving beyond CRUD applications toward software where AI is a first-class
            architectural concern — not a feature bolted on afterward. This is where I am investing my
            learning and building time in 2026.
          </p>
        </div>

        <div className="section-divider mb-12" aria-hidden="true" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {focusAreas?.map((area, i) => (
            <div
              key={area?.title}
              className="p-6 group transition-all duration-250"
              style={{
                background: 'rgba(17,18,22,0.65)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(14px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, border-color 0.25s ease, box-shadow 0.25s ease`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = area.accent === 'ice' ? 'rgba(125,211,252,0.18)' : 'rgba(124,108,245,0.18)';
                el.style.boxShadow = area.accent === 'ice' ? '0 0 32px rgba(125,211,252,0.05)' : '0 0 32px rgba(124,108,245,0.06)';
                el.style.background = 'rgba(23,24,29,0.88)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.boxShadow = 'none';
                el.style.background = 'rgba(17,18,22,0.65)';
              }}
            >
              <div
                className="w-1 h-6 rounded-full mb-5"
                style={{
                  background: area.accent === 'ice' ? '#7DD3FC' : '#7C6CF5',
                  opacity: 0.55,
                }}
                aria-hidden="true"
              />
              <h3
                className="text-sm mb-2"
                style={{ fontWeight: 700, color: 'var(--foreground)' }}
              >
                {area?.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                {area?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div
          className="mt-20 py-12"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
          }}
        >
          <p
            className="text-section-lg max-w-3xl leading-tight"
            style={{ color: 'rgba(245,245,245,0.18)' }}
          >
            &ldquo;The most interesting engineering problems in the next decade will be at the intersection of reliable software and intelligent systems.&rdquo;
          </p>
          <p className="text-sm mt-4" style={{ color: 'rgba(245,245,245,0.3)' }}>
            That is where I want to build.
          </p>
        </div>
      </div>
    </section>
  );
}