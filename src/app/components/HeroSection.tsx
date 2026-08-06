'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import StarCeiling from './StarCeiling';

const cycleWords = ['businesses.', 'communities.', 'workflows.', 'ideas.', 'products.'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % cycleWords.length);
        setIsExiting(false);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, [mounted]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="intro"
      ref={heroRef}
      className="relative h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--background)' }}
    >
      {/* Star ceiling canvas */}
      <div className="absolute inset-0 z-0">
        <StarCeiling />
      </div>

      {/* Atmospheric radial — indigo top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 65% 55% at 12% 18%, rgba(124,108,245,0.07) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric radial — ice-blue top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 50% 45% at 88% 12%, rgba(125,211,252,0.05) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Deep indigo ambient — bottom center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 80% 55% at 50% 85%, rgba(124,108,245,0.04) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating geometric wireframes */}
      <div
        className="geometric-wireframe"
        style={{ width: 110, height: 110, top: '16%', right: '7%', animationDelay: '0s', transform: 'rotate(15deg)' }}
        aria-hidden="true"
      />
      <div
        className="geometric-wireframe-ice"
        style={{ width: 55, height: 55, top: '34%', right: '13%', animationDelay: '3s', transform: 'rotate(-8deg)' }}
        aria-hidden="true"
      />
      <div
        className="geometric-wireframe"
        style={{ width: 75, height: 75, bottom: '26%', left: '4%', animationDelay: '6s', transform: 'rotate(22deg)' }}
        aria-hidden="true"
      />
      <div
        className="geometric-wireframe-ice"
        style={{ width: 40, height: 40, bottom: '40%', left: '8%', animationDelay: '9s', transform: 'rotate(-15deg)' }}
        aria-hidden="true"
      />

      {/* Content — two-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-4 w-full flex-1 flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-16">

          {/* LEFT: text content */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            <div
              className="mb-5 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <span className="label-tag" style={{ color: 'var(--accent)', opacity: 0.9 }}>Bill Otiende</span>
                <span className="w-6 h-px block" style={{ background: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
                <span className="label-tag">Full Stack Developer</span>
                <span className="w-6 h-px block" style={{ background: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
                <span className="label-tag">Nairobi · Kenya</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-hero-xl mb-4 opacity-0 animate-blur-reveal"
              style={{ animationDelay: '0.25s', animationFillMode: 'forwards', color: 'var(--foreground)' }}
            >
              I build software<br />
              that solves<br />
              real{' '}
              <span
                className="word-cycle-container"
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  verticalAlign: 'bottom',
                  color: 'var(--accent)',
                }}
              >
                {/* Ghost element: always renders the longest word to reserve stable width */}
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    visibility: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  communities.
                </span>
                {/* Animated word: absolutely positioned over the ghost */}
                <span
                  key={wordIndex}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    display: 'inline-block',
                    animation: isExiting
                      ? 'wordCycleOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards'
                      : 'wordCycleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}
                >
                  {cycleWords[wordIndex]}
                </span>
              </span>
            </h1>

            {/* Supporting copy */}
            <p
              className="text-base sm:text-lg max-w-xl mb-5 opacity-0 animate-fade-in"
              style={{
                animationDelay: '0.5s',
                animationFillMode: 'forwards',
                color: 'var(--text-secondary)',
                lineHeight: '1.75',
              }}
            >
              I&apos;m Bill Otiende, a Full Stack Developer passionate about building modern web
              applications, scalable backend systems, and AI-powered workflows. I enjoy transforming
              ideas into reliable software using React, Next.js, FastAPI, PostgreSQL, and Google&apos;s
              AI ecosystem while continuously growing as an engineer.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 mb-6 lg:mb-0 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => scrollToSection('how-i-think')}
                className="btn-primary"
              >
                Explore My Journey
              </button>
              <button
                onClick={() => scrollToSection('featured-projects')}
                className="btn-ghost"
              >
                View Projects
              </button>
            </div>
          </div>

          {/* RIGHT: portrait — seamless environmental integration */}
          <div
            className="hidden lg:block flex-shrink-0 opacity-0 animate-fade-in"
            style={{
              animationDelay: '0.4s',
              animationFillMode: 'forwards',
              width: '360px',
              height: '500px',
              position: 'relative',
            }}
          >
            {/* Indigo rim light — left edge */}
            <div
              className="absolute inset-y-0 left-0 z-20 pointer-events-none"
              style={{
                width: '3px',
                background: 'linear-gradient(to bottom, transparent 8%, rgba(124,108,245,0.6) 35%, rgba(124,108,245,0.4) 65%, transparent 100%)',
                filter: 'blur(2px)',
              }}
              aria-hidden="true"
            />

            {/* Ice-blue rim light — right edge */}
            <div
              className="absolute inset-y-0 right-0 z-20 pointer-events-none"
              style={{
                width: '2px',
                background: 'linear-gradient(to bottom, transparent 15%, rgba(125,211,252,0.3) 45%, rgba(125,211,252,0.2) 70%, transparent 100%)',
                filter: 'blur(1.5px)',
              }}
              aria-hidden="true"
            />

            {/* Feathered left fade */}
            <div
              className="absolute inset-y-0 left-0 z-10 pointer-events-none"
              style={{
                width: '90px',
                background: 'linear-gradient(to right, var(--background) 0%, rgba(9,9,11,0.65) 50%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Feathered top fade */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: '90px',
                background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Feathered bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: '130px',
                background: 'linear-gradient(to bottom, transparent 0%, var(--background) 100%)',
              }}
              aria-hidden="true"
            />

            {/* Indigo ambient glow behind portrait */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 70% at 55% 50%, rgba(124,108,245,0.08) 0%, rgba(125,211,252,0.04) 50%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Soft grain overlay */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '128px 128px',
              }}
              aria-hidden="true"
            />

            <Image
              src="/assets/images/me2-1785966503910.jpeg"
              alt="Bill Otiende — Full Stack Developer, Nairobi Kenya"
              fill
              className="object-cover object-top"
              style={{
                filter: 'grayscale(20%) contrast(1.05) brightness(1.1) saturate(0.9)',
                borderRadius: '0',
              }}
              priority
            />
          </div>
        </div>

        {/* Bottom row: scroll indicator + FIG. 01 label */}
        <div
          className="flex items-end justify-between mt-6 lg:mt-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="animate-scroll-bounce"
              style={{ fontSize: 16, color: 'var(--muted-foreground)' }}
              aria-hidden="true"
            >
              ↓
            </span>
            <span className="label-tag">Scroll</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span
              className="label-tag"
              style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.35 }}
            >
              · FIG. 01 — THE ENGINEER
            </span>
          </div>
        </div>
      </div>

      {/* Bottom atmospheric fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        aria-hidden="true"
      />
    </section>
  );
}