'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Project {
  id: string;
  number: string;
  name: string;
  tagline: string;
  challenge: string;
  solution: string;
  decisions: string;
  learned: string;
  impact: string;
  stack: string[];
  status: string;
  liveUrl?: string;
  keyFeatures?: { category: string; items: string[] }[];
}

const projects: Project[] = [
  {
    id: 'matatu-route',
    number: '01',
    name: 'Matatu Route Intelligence Agent',
    tagline: 'AI-powered public transit intelligence platform for Nairobi commuters.',
    challenge: "Nairobi's public transport system lacks a centralized source of reliable routing information. Commuters often depend on fragmented knowledge, social media updates, or word-of-mouth, making route planning difficult during traffic congestion, weather disruptions, fare fluctuations, and police operations.",
    solution: 'Developed an AI-powered transit intelligence platform that combines static transit knowledge, crowdsourced commuter reports, Google Maps routing, and Gemini-powered conversational assistance. The platform delivers multilingual route guidance in English, Kiswahili, and Sheng while adapting recommendations based on weather, traffic conditions, commuter budget, and time of day.',
    decisions: 'Designed the application using a full-stack React and Express architecture with a server-side AI proxy to secure Gemini API credentials. Implemented multiple routing visualization engines—including offline schematic maps, Google Directions integration, and WebGL vector rendering—to ensure graceful degradation when external map services are unavailable.',
    learned: 'Building AI products extends beyond integrating an LLM. Reliable user experiences require secure backend orchestration, fallback routing strategies, resilient API management, and interfaces that communicate complex transit information in a simple, conversational manner.',
    impact: 'Created a scalable foundation for intelligent urban mobility by combining AI, mapping technologies, and community-driven transit intelligence. The architecture supports multilingual interaction, live crowdsourced updates, environmental simulations, and future expansion into real-time public transportation services across Kenya.',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express.js', 'Gemini AI', 'Google Maps', 'Tailwind CSS', 'Motion', 'Vite', 'WebGL'],
    status: 'Production',
    liveUrl: 'https://matatu-route-intelligence-agent-771815273294.europe-west2.run.app',
    keyFeatures: [
      {
        category: 'Multi-Engine Route Intelligence',
        items: [
          'AI-powered conversational route planning (Mzee)',
          'Offline schematic transit visualization',
          'Google Directions integration',
          'WebGL interactive route rendering',
          'Stage-to-stage transit navigation',
        ],
      },
      {
        category: 'Smart Transit Simulation',
        items: [
          'Weather-aware routing',
          'National holiday congestion presets',
          'Fare fluctuation modelling',
          'Transit crackdown simulation',
          'Time-of-day optimization',
        ],
      },
      {
        category: 'Community Intelligence',
        items: [
          'Crowdsourced passenger alerts',
          'Live disruption reporting',
          'Dynamic route recommendations',
          'Temporary incident aggregation',
        ],
      },
      {
        category: 'Security & Infrastructure',
        items: [
          'Server-side Gemini proxy',
          'Protected API key distribution',
          'Express API gateway',
          'Modular React SPA',
          'Production-ready Vite & esbuild pipeline',
        ],
      },
    ],
  },
  {
    id: 'nextgen',
    number: '02',
    name: 'NextGen Food Court',
    tagline: 'Multi-vendor food ordering platform',
    challenge: 'Building a multi-vendor food ordering system where each vendor manages their own menu, orders, and fulfilment while customers get a unified experience.',
    solution: 'Architected a role-based FastAPI backend with separate vendor and customer domains, PostgreSQL for relational data, and a Next.js frontend that renders menus dynamically per vendor.',
    decisions: 'Chose FastAPI over Flask for native async support and automatic OpenAPI docs. Used PostgreSQL over NoSQL because vendor-customer-order relationships are inherently relational.',
    learned: 'Real-time order state management is harder than CRUD. Learned to model state machines for order lifecycle and handle edge cases in concurrent order updates.',
    impact: 'Supports multiple vendors with isolated data, live order tracking, and a customer-facing interface that works across mobile and desktop.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Docker'],
    status: 'Development',
  },
  {
    id: 'safiri',
    number: '03',
    name: 'Safiri Auto Marketplace',
    tagline: 'Kenya vehicle listing and discovery platform',
    challenge: 'Creating a vehicle marketplace for the Kenyan market with rich filtering, image-heavy listings, and seller-buyer communication workflows.',
    solution: 'Built a performant listing platform with server-side rendering for SEO, image optimisation pipeline, and a real-time inquiry system between buyers and sellers.',
    decisions: 'Prioritised SSR over SPA for vehicle listing pages to ensure search engine discoverability. Designed the schema to support both private sellers and dealerships.',
    learned: 'Image-heavy platforms require deliberate performance budgeting. Implemented progressive loading and WebP conversion to keep page loads under 3 seconds on Kenyan mobile networks.',
    impact: 'Handles hundreds of vehicle listings with full-text search, make/model filtering, and price range queries without degrading page performance.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Cloudinary', 'Tailwind CSS'],
    status: 'Development',
  },
  {
    id: 'kajiado',
    number: '04',
    name: 'Kajiado AquaShield',
    tagline: 'Water Management & Hydrology Platform',
    challenge: 'Engineering a full-stack platform to handle complex relational water management data models for Kajiado County, enabling accurate hydrology tracking and reporting.',
    solution: 'Built a full-stack web application using React, TypeScript, and Flask to handle complex relational data models efficiently, with clean modular backend API logic and integrated unit testing.',
    decisions: 'Applied software design principles and OOP patterns to write clean, modular backend API logic, improving data processing performance. Structured GitHub repositories using feature branching and pull requests, maintaining technical documentation for seamless maintenance.',
    learned: 'Integrated unit testing and debugging practices are essential for resolving application issues and guaranteeing data accuracy across full-stack features. Technical documentation is as important as the code itself.',
    impact: 'Provides water management teams with accurate, reliable data across full-stack features — enabling better hydrology decisions for Kajiado County.',
    stack: ['React', 'TypeScript', 'Python', 'Flask', 'PostgreSQL'],
    status: 'Production',
  },
  {
    id: 'hydroscope',
    number: '05',
    name: 'Hydroscope',
    tagline: 'Water quality monitoring dashboard',
    challenge: 'Visualising water quality sensor data in real time with historical trend analysis for environmental monitoring purposes.',
    solution: 'Built a data dashboard that ingests sensor readings, stores time-series data in PostgreSQL, and renders interactive charts for trend analysis.',
    decisions: 'Used server-sent events for real-time updates instead of WebSockets to keep the infrastructure simple while still achieving live data refresh.',
    learned: 'Time-series data visualisation requires careful aggregation strategy. Learned to bucket readings by hour/day/week to keep charts readable at different zoom levels.',
    impact: 'Provides environmental teams with a single view of water quality trends across multiple monitoring points without manual data extraction.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Recharts', 'Tailwind CSS'],
    status: 'Completed',
  },
  {
    id: 'digital-media-factory',
    number: '06',
    name: 'Digital Media Factory',
    tagline: 'Creative project management platform for Kenyan creatives',
    challenge: 'Building a platform where Kenyan creatives — musicians, visual artists, and writers — can manage projects, collaborate, and track deliverables.',
    solution: 'Developed a project management tool tailored to creative workflows with milestone tracking, file sharing, and client approval stages.',
    decisions: 'Designed the data model around creative deliverables rather than generic tasks. A song has stems, a design has revisions, a manuscript has drafts — the schema reflects this.',
    learned: 'Domain modelling matters enormously. Generic project management tools fail creatives because the concepts do not map. Spending time on the domain model before coding paid off.',
    impact: 'Gives Kenyan creatives a professional tool for managing client work without adapting to tools designed for software teams.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    status: 'Production',
  },
];

export default function FeaturedProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState<string | null>(null);
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
    Production: {
      color: '#7C6CF5',
      bg: 'rgba(124,108,245,0.09)',
      border: 'rgba(124,108,245,0.22)',
    },
    Completed: {
      color: 'var(--muted-foreground)',
      bg: 'rgba(255,255,255,0.04)',
      border: 'rgba(255,255,255,0.08)',
    },
    Development: {
      color: '#7DD3FC',
      bg: 'rgba(125,211,252,0.08)',
      border: 'rgba(125,211,252,0.22)',
    },
  };

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Atmospheric lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,108,245,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">04 — FEATURED PROJECTS</span>
          <h2 className="text-section-xl max-w-2xl" style={{ color: 'var(--foreground)' }}>
            Real problems solved.
          </h2>
        </div>

        <div className="section-divider mb-8" aria-hidden="true" />

        <div className="space-y-2">
          {projects.map((project, i) => {
            const sc = statusConfig[project.status] || statusConfig['Completed'];
            const isOpen = expanded === project.id;
            const isFeaturesOpen = featuresOpen === project.id;
            return (
              <div
                key={project.id}
                className="overflow-hidden transition-all duration-250"
                style={{
                  background: isOpen ? 'rgba(23,24,29,0.85)' : 'rgba(17,18,22,0.45)',
                  border: `1px solid ${isOpen ? 'rgba(124,108,245,0.15)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 'var(--radius)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isOpen ? '0 0 48px rgba(124,108,245,0.06)' : 'none',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease`,
                }}
              >
                {/* Project header row */}
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors duration-250"
                  style={{ background: 'transparent' }}
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                  onMouseEnter={(e) => {
                    if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,108,245,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="section-number shrink-0">{project.number}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-base" style={{ fontWeight: 700, color: 'var(--foreground)' }}>
                          {project.name}
                        </h3>
                        <span
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                          style={{
                            color: sc.color,
                            background: sc.bg,
                            border: `1px solid ${sc.border}`,
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                          }}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-xs">
                      {project.stack.slice(0, 3).map((t) => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-250"
                      style={{
                        border: `1px solid ${isOpen ? 'rgba(124,108,245,0.35)' : 'rgba(255,255,255,0.08)'}`,
                        background: isOpen ? 'rgba(124,108,245,0.1)' : 'transparent',
                      }}
                    >
                      <Icon
                        name="ChevronDownIcon"
                        size={14}
                        style={{
                          color: isOpen ? '#9588FF' : 'var(--muted-foreground)',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease, color 0.25s ease',
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                </button>

                {/* Expanded case study */}
                {isOpen && (
                  <div
                    className="px-6 pb-8 animate-fade-in"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="pt-8 grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {[
                          { label: 'Challenge', value: project.challenge },
                          { label: 'Solution', value: project.solution },
                          { label: 'Engineering Decisions', value: project.decisions },
                        ].map((item) => (
                          <div key={item.label}>
                            <h4
                              className="label-tag mb-2 block"
                              style={{ color: '#7C6CF5', opacity: 0.8 }}
                            >
                              {item.label}
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-6">
                        {[
                          { label: 'What I Learned', value: project.learned },
                          { label: 'Impact', value: project.impact },
                        ].map((item) => (
                          <div key={item.label}>
                            <h4
                              className="label-tag mb-2 block"
                              style={{ color: '#7C6CF5', opacity: 0.8 }}
                            >
                              {item.label}
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                              {item.value}
                            </p>
                          </div>
                        ))}
                        <div>
                          <h4
                            className="label-tag mb-3 block"
                            style={{ color: '#7C6CF5', opacity: 0.8 }}
                          >
                            Full Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((t) => (
                              <span key={t} className="tech-pill">{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* Key Features Drawer */}
                        {project.keyFeatures && (
                          <div>
                            <button
                              onClick={() => setFeaturesOpen(isFeaturesOpen ? null : project.id)}
                              className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                              style={{ color: isFeaturesOpen ? '#9588FF' : 'var(--muted-foreground)' }}
                            >
                              <Icon
                                name="ChevronDownIcon"
                                size={14}
                                style={{
                                  transform: isFeaturesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.3s ease',
                                } as React.CSSProperties}
                              />
                              {isFeaturesOpen ? 'Hide Key Features' : 'View Key Features'}
                            </button>
                            {isFeaturesOpen && (
                              <div className="mt-4 grid sm:grid-cols-2 gap-4 animate-fade-in">
                                {project.keyFeatures.map((group) => (
                                  <div
                                    key={group.category}
                                    className="rounded-lg p-4"
                                    style={{
                                      background: 'rgba(124,108,245,0.05)',
                                      border: '1px solid rgba(124,108,245,0.12)',
                                    }}
                                  >
                                    <h5
                                      className="text-xs font-semibold mb-2 uppercase tracking-wider"
                                      style={{ color: '#9588FF' }}
                                    >
                                      {group.category}
                                    </h5>
                                    <ul className="space-y-1">
                                      {group.items.map((item) => (
                                        <li
                                          key={item}
                                          className="text-xs flex items-start gap-1.5"
                                          style={{ color: 'var(--text-secondary)' }}
                                        >
                                          <span style={{ color: '#7C6CF5', marginTop: '3px', flexShrink: 0 }}>›</span>
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Live Demo Link */}
                        {project.liveUrl && (
                          <div className="pt-2">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                              style={{
                                color: '#9588FF',
                                background: 'rgba(124,108,245,0.1)',
                                border: '1px solid rgba(124,108,245,0.25)',
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,108,245,0.18)';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,108,245,0.45)';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(124,108,245,0.1)';
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(124,108,245,0.25)';
                              }}
                            >
                              <Icon name="ArrowTopRightOnSquareIcon" size={14} />
                              Live Demo
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}