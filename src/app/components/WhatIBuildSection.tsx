'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const skills = [
  {
    title: 'Modern Web Applications',
    description:
      'Responsive, performant interfaces built with component-driven architecture and accessibility in mind.',
    tags: ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Responsive UI'],
    icon: 'WindowIcon' as const,
    accentColor: 'rgba(124,108,245,0.06)',
    borderHover: 'rgba(124,108,245,0.2)',
    tagType: 'indigo',
    iconColor: '#9588FF',
  },
  {
    title: 'Backend Systems',
    description:
      'Scalable REST APIs with authentication, database design, and clean separation of concerns.',
    tags: ['FastAPI', 'PostgreSQL', 'JWT Auth', 'REST APIs', 'Python'],
    icon: 'ServerIcon' as const,
    accentColor: 'rgba(125,211,252,0.05)',
    borderHover: 'rgba(125,211,252,0.18)',
    tagType: 'ice',
    iconColor: '#7DD3FC',
  },
  {
    title: 'AI Workflows',
    description:
      'Integrating intelligent capabilities into products using Google\'s AI ecosystem and agentic patterns.',
    tags: ['Gemini API', 'Google AI Studio', 'Vertex AI', 'Automation', 'RAG'],
    icon: 'SparklesIcon' as const,
    accentColor: 'rgba(125,211,252,0.06)',
    borderHover: 'rgba(125,211,252,0.22)',
    tagType: 'ice',
    iconColor: '#A5E4FF',
  },
  {
    title: 'Cloud & Deployment',
    description:
      'Containerised, CI/CD-driven deployments that ship reliably from development to production.',
    tags: ['Cloud Run', 'Docker', 'GitHub Actions', 'Vercel', 'Firebase'],
    icon: 'CloudIcon' as const,
    accentColor: 'rgba(124,108,245,0.05)',
    borderHover: 'rgba(124,108,245,0.18)',
    tagType: 'indigo',
    iconColor: '#7C6CF5',
  },
];

export default function WhatIBuildSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="what-i-build"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--secondary)' }}
    >
      {/* Atmospheric lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 18% 50%, rgba(124,108,245,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 82% 80%, rgba(125,211,252,0.03) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">03 — WHAT I BUILD</span>
          <h2 className="text-section-xl max-w-xl" style={{ color: 'var(--foreground)' }}>
            Four domains.<br />One engineer.
          </h2>
        </div>

        <div className="section-divider mb-12" aria-hidden="true" />

        {/* 2×2 bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className="p-8 group cursor-default"
              style={{
                background: hoveredCard === i
                  ? 'rgba(23,24,29,0.92)'
                  : 'rgba(17,18,22,0.65)',
                border: `1px solid ${hoveredCard === i ? skill.borderHover : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(16px)',
                boxShadow: hoveredCard === i
                  ? `0 0 48px ${skill.accentColor}, 0 8px 32px rgba(0,0,0,0.3)`
                  : '0 2px 16px rgba(0,0,0,0.2)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease`,
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-all duration-250"
                  style={{
                    border: `1px solid ${hoveredCard === i ? skill.borderHover : 'rgba(255,255,255,0.07)'}`,
                    background: hoveredCard === i ? skill.accentColor : 'transparent',
                  }}
                >
                  <Icon
                    name={skill.icon}
                    size={18}
                    className="transition-colors duration-250"
                    style={{ color: hoveredCard === i ? skill.iconColor : 'var(--muted-foreground)' }}
                  />
                </div>
                <h3
                  className="text-base mb-3 transition-colors duration-250"
                  style={{ fontWeight: 700, color: 'var(--foreground)' }}
                >
                  {skill.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  {skill.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className={skill.tagType === 'ice' ? 'tech-pill-ice' : 'tech-pill'}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}