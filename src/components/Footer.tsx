'use client';

import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--background)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2.5">
          <AppLogo size={22} />
          <span
            className="text-sm hidden sm:block"
            style={{ fontWeight: 600, color: 'var(--foreground)' }}
          >
            Bill Otiende
          </span>
        </div>

        {/* Links */}
        <div
          className="flex items-center gap-6 text-sm"
          style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}
        >
          <a
            href="https://github.com/billotiende-droid"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-250"
            style={{ color: 'var(--muted-foreground)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#7C6CF5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-foreground)'; }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bill-otiende-6b74193a7"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-250"
            style={{ color: 'var(--muted-foreground)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#7C6CF5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-foreground)'; }}
          >
            LinkedIn
          </a>
          {/* email link removed */}
        </div>

        {/* Copyright */}
        <p style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>
          © 2026 Bill Otiende
        </p>
      </div>
    </footer>
  );
}