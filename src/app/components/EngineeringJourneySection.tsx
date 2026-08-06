'use client';

import React, { useEffect, useRef, useState } from 'react';

const milestones = [
  { year: '2020', title: 'HTML & CSS', description: 'Built first static websites. Learned that structure and presentation are separate concerns.' },
  { year: '2021', title: 'JavaScript', description: 'DOM manipulation, async patterns, fetch API. The web became dynamic.' },
  { year: '2021', title: 'React', description: 'Component-driven UI development. Learned to think in state and side effects.' },
  { year: '2022', title: 'REST APIs & Flask', description: 'First backend systems. Learned HTTP, routing, request/response cycles.' },
  { year: '2022', title: 'PostgreSQL', description: 'Relational databases, SQL, schema design. Data modelling became a core skill.' },
  { year: '2023', title: 'FastAPI', description: 'Async Python APIs with automatic docs. Significantly faster development cycles.' },
  { year: '2023', title: 'JWT Authentication', description: 'Stateless auth, token lifecycle, secure API design patterns.' },
  { year: '2023', title: 'Next.js', description: 'SSR, SSG, App Router. Full-stack JavaScript with production-grade tooling.' },
  { year: '2024', title: 'Docker & Cloud Run', description: 'Containerisation and cloud deployment. Shipped reproducible, scalable services.' },
  { year: '2024', title: 'GitHub Actions', description: 'CI/CD pipelines. Automated testing and deployment on every push.' },
  { year: '2025', title: 'Gemini API', description: 'First AI integrations. Learned prompt engineering and structured generation.' },
  { year: '2025', title: 'Google AI Studio', description: 'Rapid prototyping of AI features. Explored multimodal capabilities.' },
  { year: '2026', title: 'Agentic AI & LangGraph', description: 'Exploring multi-step AI agents, tool use, and workflow automation.', current: true },
];

export default function EngineeringJourneySection() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(milestones.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = milestones.map((_, i) => {
      const ref = itemRefs.current[i];
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section
      id="journey"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--secondary)' }}
    >
      {/* Atmospheric lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(124,108,245,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">05 — MY ENGINEERING JOURNEY</span>
          <h2 className="text-section-xl max-w-xl" style={{ color: 'var(--foreground)' }}>
            From first HTML tag<br />to AI agents.
          </h2>
        </div>

        <div className="section-divider mb-12" aria-hidden="true" />

        <div className="relative max-w-2xl">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[19px] top-6 bottom-6 w-px hidden sm:block"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), rgba(124,108,245,0.2), rgba(125,211,252,0.15), transparent)',
            }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div
                key={`${m.year}-${m.title}`}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex gap-6 sm:gap-8 pb-8"
                style={{
                  opacity: visibleItems[i] ? 1 : 0,
                  transform: visibleItems[i] ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`,
                }}
              >
                {/* Node */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-[10px] shrink-0"
                    style={{
                      borderColor: m.current
                        ? 'rgba(124,108,245,0.55)'
                        : visibleItems[i]
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(255,255,255,0.04)',
                      background: m.current
                        ? 'rgba(124,108,245,0.1)'
                        : 'rgba(17,18,22,0.8)',
                      color: m.current ? '#9588FF' : 'var(--muted-foreground)',
                      fontWeight: 700,
                      boxShadow: m.current ? '0 0 18px rgba(124,108,245,0.2)' : 'none',
                    }}
                  >
                    {m.year.slice(2)}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-2 pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm" style={{ fontWeight: 700, color: 'var(--foreground)' }}>
                      {m.title}
                    </h3>
                    {m.current && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(124,108,245,0.12)',
                          color: '#9588FF',
                          border: '1px solid rgba(124,108,245,0.28)',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                        }}
                      >
                        Now
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}