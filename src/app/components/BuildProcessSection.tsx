'use client';

import React, { useEffect, useRef, useState } from 'react';

const steps = [
  { label: 'Idea', description: 'Clarify the problem worth solving' },
  { label: 'Research', description: 'Understand users and constraints' },
  { label: 'Design', description: 'Architecture before interfaces' },
  { label: 'Frontend', description: 'Component-driven UI development' },
  { label: 'Backend', description: 'API contracts and data modelling' },
  { label: 'Database', description: 'Schema design for the domain' },
  { label: 'AI', description: 'Integrate intelligent capabilities' },
  { label: 'Deployment', description: 'Containerise and ship reliably' },
  { label: 'Iteration', description: 'Observe, learn, improve' },
];

export default function BuildProcessSection() {
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = steps.map((_, i) => {
      const ref = stepRefs.current[i];
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep((prev) => Math.max(prev, i));
          }
        },
        { threshold: 0.7 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const getStepColor = (i: number) => {
    if (i === 6) return '#7DD3FC'; // AI step gets ice-blue
    if (i <= activeStep) return '#9588FF'; // active steps get indigo
    return 'var(--muted-foreground)';
  };

  const getStepBg = (i: number) => {
    if (i === 6 && i <= activeStep) return 'rgba(125,211,252,0.08)';
    if (i <= activeStep) return 'rgba(124,108,245,0.08)';
    return 'rgba(17,18,22,0.6)';
  };

  const getStepBorder = (i: number) => {
    if (i === 6 && i <= activeStep) return 'rgba(125,211,252,0.32)';
    if (i <= activeStep) return 'rgba(124,108,245,0.32)';
    return 'rgba(255,255,255,0.06)';
  };

  return (
    <section
      id="build-process"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--secondary)' }}
    >
      {/* Atmospheric lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,108,245,0.03) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">07 — HOW I BUILD</span>
          <h2 className="text-section-xl max-w-xl" style={{ color: 'var(--foreground)' }}>
            Every product follows<br />the same discipline.
          </h2>
        </div>

        <div className="section-divider mb-16" aria-hidden="true" />

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:block">
          <div className="flex items-start gap-0 relative">
            {/* Connecting line */}
            <div
              className="absolute top-5 left-5 right-5 h-px"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), rgba(124,108,245,0.15), rgba(125,211,252,0.12), rgba(124,108,245,0.15), rgba(255,255,255,0.05), transparent)',
              }}
              aria-hidden="true"
            />
            {steps.map((step, i) => (
              <div
                key={step.label}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="flex-1 flex flex-col items-center text-center gap-4 relative"
                style={{
                  opacity: i <= activeStep ? 1 : 0.28,
                  transition: `opacity 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-xs relative z-10 transition-all duration-400"
                  style={{
                    background: getStepBg(i),
                    color: getStepColor(i),
                    borderColor: getStepBorder(i),
                    fontWeight: 700,
                    boxShadow: i <= activeStep
                      ? `0 0 14px ${i === 6 ? 'rgba(125,211,252,0.18)' : 'rgba(124,108,245,0.16)'}`
                      : 'none',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <p
                    className="text-xs"
                    style={{ fontWeight: 700, color: i <= activeStep ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                  >
                    {step.label}
                  </p>
                  <p
                    className="text-[10px] mt-1 leading-relaxed max-w-[80px]"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <div
              key={step.label}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="flex items-center gap-5"
              style={{
                opacity: i <= activeStep ? 1 : 0.28,
                transition: `opacity 0.5s ease ${i * 0.05}s`,
              }}
            >
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center text-[10px] shrink-0 transition-all duration-400"
                style={{
                  background: getStepBg(i),
                  color: getStepColor(i),
                  borderColor: getStepBorder(i),
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <p className="text-sm" style={{ fontWeight: 700, color: 'var(--foreground)' }}>
                  {step.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}