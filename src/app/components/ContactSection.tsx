'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const contactLinks = [
  { label: 'Email', value: 'allanbill34@gmail.com', href: 'mailto:allanbill34@gmail.com', icon: 'EnvelopeIcon' as const, accent: 'ice' },
  { label: 'GitHub', value: 'github.com/billotiende-droid', href: 'https://github.com/billotiende-droid', icon: 'CodeBracketIcon' as const, accent: 'indigo' },
  { label: 'LinkedIn', value: 'linkedin.com/in/bill-otiende-6b74193a7', href: 'https://www.linkedin.com/in/bill-otiende-6b74193a7', icon: 'BriefcaseIcon' as const, accent: 'indigo' },
  { label: 'Phone', value: '+254 115 943 207', href: 'tel:+254115943207', icon: 'PhoneIcon' as const, accent: 'ice' },
];

export default function ContactSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--secondary)' }}
    >
      {/* Atmospheric radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 28% 50%, rgba(124,108,245,0.05) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 82% 18%, rgba(125,211,252,0.03) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <span className="section-number block mb-4">09 — CONTACT</span>
          <h2
            className="text-section-xl"
            style={{
              color: 'var(--foreground)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Let&apos;s build<br />something meaningful.
          </h2>
        </div>

        <div className="section-divider mb-16" aria-hidden="true" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy + links */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <p
              className="text-base leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--text-secondary)', lineHeight: '1.75' }}
            >
              Whether you are looking for a junior full-stack engineer, building an AI-powered product,
              or need someone passionate about solving meaningful problems, I would love to hear your story.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') || link.href.startsWith('tel') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-3 p-4 group transition-all duration-250"
                  style={{
                    background: 'rgba(17,18,22,0.55)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius)',
                    backdropFilter: 'blur(14px)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = link.accent === 'ice' ? 'rgba(125,211,252,0.25)' : 'rgba(124,108,245,0.25)';
                    el.style.background = 'rgba(17,18,22,0.82)';
                    el.style.boxShadow = link.accent === 'ice' ? '0 0 20px rgba(125,211,252,0.05)' : '0 0 20px rgba(124,108,245,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(255,255,255,0.06)';
                    el.style.background = 'rgba(17,18,22,0.55)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-250"
                    style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
                  >
                    <Icon
                      name={link.icon}
                      size={16}
                      style={{ color: link.accent === 'ice' ? 'rgba(125,211,252,0.7)' : 'rgba(124,108,245,0.8)' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="label-tag block mb-0.5">{link.label}</span>
                    <span
                      className="text-xs truncate block transition-colors duration-250"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {link.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: availability + resume */}
          <div
            className="space-y-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            {/* Availability card */}
            <div
              className="p-6"
              style={{
                background: 'rgba(17,18,22,0.72)',
                border: '1px solid rgba(124,108,245,0.14)',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 0 32px rgba(124,108,245,0.05)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-2 h-2 rounded-full animate-pulse-slow"
                  style={{ background: '#7C6CF5' }}
                  aria-hidden="true"
                />
                <span className="text-sm" style={{ fontWeight: 600, color: 'var(--foreground)' }}>
                  Available for opportunities
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}
              >
                Open to full-time roles, contract projects, and collaboration on interesting problems.
                Based in Nairobi, Kenya — open to remote globally.
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <Icon name="MapPinIcon" size={13} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                <span>Nairobi, Kenya · Remote-friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}