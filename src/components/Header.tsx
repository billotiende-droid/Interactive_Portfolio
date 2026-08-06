'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const navItems = [
  { label: 'Think', href: '#how-i-think' },
  { label: 'Build', href: '#what-i-build' },
  { label: 'Projects', href: '#featured-projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['intro', 'how-i-think', 'what-i-build', 'featured-projects', 'journey', 'learning', 'build-process', 'current-focus', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-600"
        style={{
          background: scrolled
            ? 'rgba(9,9,11,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#intro')}
            className="flex items-center gap-2.5 focus:outline-none group"
            aria-label="Back to top"
          >
            <AppLogo size={26} />
            <span
              className="text-sm tracking-tight hidden sm:block transition-colors duration-250"
              style={{ fontWeight: 700, color: 'var(--foreground)' }}
            >
              Bill Otiende
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="label-tag transition-all duration-250 focus:outline-none relative"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--muted-foreground)' }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted-foreground)';
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'var(--accent)', opacity: 0.55 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-250"
              style={{
                fontWeight: 600,
                border: '1px solid rgba(124,108,245,0.28)',
                color: 'var(--accent)',
                background: 'rgba(124,108,245,0.06)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,108,245,0.12)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,108,245,0.45)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(124,108,245,0.18)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,108,245,0.06)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124,108,245,0.28)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              Hire Me
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-250"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              aria-label="Open menu"
            >
              <svg width="18" height="14" fill="none" viewBox="0 0 18 14" aria-hidden="true">
                <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(9,9,11,0.97)', backdropFilter: 'blur(24px)' }}
        >
          <div
            className="flex items-center justify-between px-6 h-16"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-2.5">
              <AppLogo size={26} />
              <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Bill Otiende</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-250"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              aria-label="Close menu"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="text-left py-4 text-2xl font-bold transition-colors duration-250 focus:outline-none"
                style={{
                  color: 'var(--foreground)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontWeight: 700,
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo('#contact'); setMenuOpen(false); }}
              className="mt-6 py-4 text-center text-sm font-semibold rounded-full transition-colors duration-250"
              style={{
                border: '1px solid rgba(124,108,245,0.3)',
                color: 'var(--accent)',
                background: 'rgba(124,108,245,0.06)',
                fontWeight: 600,
              }}
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </>
  );
}