'use client';

import React, { useEffect, useRef, useState } from 'react';

const principles = [
  {
    number: '01',
    title: 'Understand before building',
    description:
      'Every project starts with questions: Who uses this? What problem does it solve? What does success look like? Code comes after clarity.',
  },
  {
    number: '02',
    title: 'Design systems, not just screens',
    description:
      'I think in components, data flows, and API contracts before I write a line of code. Maintainable software is designed, not discovered.',
  },
  {
    number: '03',
    title: 'Ship frequently, improve continuously',
    description:
      'Working software beats perfect software. I prefer small, deliberate iterations over long cycles that drift from user needs.',
  },
  {
    number: '04',
    title: 'Automate the repetitive',
    description:
      'Whether it is CI/CD pipelines, AI-assisted workflows, or scripted deployments, I look for ways to reduce toil and focus on what matters.',
  },
  {
    number: '05',
    title: 'Learn in public, build in depth',
    description:
      'I am actively exploring Google AI Studio, Gemini API, Vertex AI, and agentic workflows — not because they are trending, but because they change what is possible.',
  },
];

export default function HowIThinkSection() {
  const [visible, setVisible] = useState<boolean[]>(new Array(principles.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section
      id="how-i-think"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Atmospheric radial — indigo right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 85% 50%, rgba(124,108,245,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="section-number block mb-4">02 — HOW I THINK</span>
          <h2 className="text-section-xl max-w-2xl" style={{ color: 'var(--foreground)' }}>
            Good software starts long before writing code.
          </h2>
        </div>

        <div className="section-divider mb-16" aria-hidden="true" />

        {/* Principles list */}
        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-0">
          <div className="space-y-0">
            {principles.slice(0, 3).map((p, i) => (
              <div
                key={p.number}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="py-8 group"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="section-number mt-1 shrink-0 transition-colors duration-250 group-hover:text-accent"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = 'var(--accent)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = 'var(--muted-foreground)'; }}
                  >
                    {p.number}
                  </span>
                  <div>
                    <h3
                      className="text-base mb-2 transition-colors duration-250"
                      style={{ fontWeight: 700, color: 'var(--foreground)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-0 lg:mt-0 mt-0">
            {principles.slice(3).map((p, idx) => {
              const i = idx + 3;
              return (
                <div
                  key={p.number}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="py-8 group"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    opacity: visible[i] ? 1 : 0,
                    transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.1}s`,
                  }}
                >
                  <div className="flex items-start gap-6">
                    <span className="section-number mt-1 shrink-0" style={{ color: 'var(--muted-foreground)' }}>
                      {p.number}
                    </span>
                    <div>
                      <h3 className="text-base mb-2" style={{ fontWeight: 700, color: 'var(--foreground)' }}>
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Accent quote */}
            <div
              className="py-8"
              style={{
                opacity: visible[4] ? 1 : 0,
                transition: 'opacity 1s ease 0.5s',
              }}
            >
              <blockquote
                className="text-section-lg leading-tight"
                style={{ color: 'rgba(245,245,245,0.18)' }}
              >
                &ldquo;Engineering is not about writing code. It&apos;s about solving the right problem.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}