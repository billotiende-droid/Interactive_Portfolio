'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const billContext = `
You are an AI assistant for Bill Otiende's portfolio website. Answer questions specifically about Bill.

ABOUT BILL:
- Full Stack Developer based in Nairobi, Kenya
- Evolving into AI-focused software engineering
- Core stack: React, Next.js, FastAPI, PostgreSQL, TailwindCSS, TypeScript
- AI stack: Gemini API, Google AI Studio, Vertex AI, LangGraph
- Cloud: Cloud Run, Docker, GitHub Actions, Vercel, Firebase

PROJECTS:
1. NextGen Food Court - Multi-vendor food ordering platform (Next.js, FastAPI, PostgreSQL)
2. Safiri Auto Marketplace - Kenya vehicle listing platform (Next.js, FastAPI)
3. Gadget Store KE - E-commerce with M-Pesa integration (React, FastAPI)
4. MatchHub - Sports league management (React, FastAPI)
5. Hydroscope - Water quality monitoring dashboard (React, FastAPI, Recharts)
6. AI Proposal Agent - Gemini-powered proposal generator
7. The Daily Brief - AI-curated news digest (Gemini API)
8. SanaaFlow - Creative workflow platform for Kenyan artists

LEARNING: Google AI Studio, Gemini API, Vertex AI, Cloud Run, Firebase, MCP, Agentic AI, Prompt Engineering, LangGraph, Workflow Automation

PHILOSOPHY: Understand before building. Design systems not just screens. Ship frequently. Automate the repetitive.

Only answer based on this information. Do not fabricate experience or claim expertise not listed here.
`;

const mockResponses: Record<string, string> = {
  default: "I'm Bill's portfolio assistant. I can tell you about his projects, tech stack, engineering philosophy, or current learning focus. What would you like to know?",
  projects: "Bill has built 8 projects including NextGen Food Court (multi-vendor ordering), Safiri Auto Marketplace (Kenya vehicles), an AI Proposal Agent using Gemini, and SanaaFlow for Kenyan creatives. Each is a full case study — click any project above to expand the details.",
  stack: "Bill's core stack is React, Next.js, FastAPI, PostgreSQL, and TailwindCSS for full-stack work. For AI, he works with Gemini API, Google AI Studio, and is exploring Vertex AI and LangGraph for agentic workflows.",
  learning: "Bill is actively exploring Google AI Studio, Gemini API, Vertex AI, Cloud Run, Firebase, MCP, Agentic AI, Prompt Engineering, and LangGraph. These represent active exploration, not claimed expertise.",
  contact: "You can reach Bill at bill@billotiende.dev or connect on LinkedIn and GitHub. He's available for full-time roles, contract work, and collaboration. Based in Nairobi, Kenya — open to remote globally.",
  philosophy: "Bill believes good software starts before writing code: understand users first, design systems not just screens, ship frequently and improve, and automate the repetitive. He's intentionally moving toward AI-powered software engineering.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('project') || lower.includes('build') || lower.includes('portfolio')) return mockResponses.projects;
  if (lower.includes('stack') || lower.includes('tech') || lower.includes('language') || lower.includes('framework')) return mockResponses.stack;
  if (lower.includes('learn') || lower.includes('study') || lower.includes('gemini') || lower.includes('ai')) return mockResponses.learning;
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('available')) return mockResponses.contact;
  if (lower.includes('think') || lower.includes('philosophy') || lower.includes('approach') || lower.includes('process')) return mockResponses.philosophy;
  return mockResponses.default;
}

export default function AskBillPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: mockResponses.default },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = getResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 700);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        style={{ background: 'var(--foreground)', color: 'var(--primary-foreground)' }}
        aria-label="Ask Bill AI assistant"
      >
        <Icon name="ChatBubbleLeftRightIcon" size={22} />
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] ask-bill-panel flex flex-col shadow-2xl"
          style={{ height: '480px', maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <div>
              <p className="text-sm font-700 text-foreground" style={{ fontWeight: 700 }}>Ask Bill</p>
              <p className="text-[11px] text-muted-foreground">Portfolio assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              <Icon name="XMarkIcon" size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'user' ? 'var(--foreground)' : 'rgba(255,255,255,0.06)',
                    color: msg.role === 'user' ? 'var(--primary-foreground)' : 'var(--foreground)',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '18px 18px 18px 4px' }}
                >
                  <span className="animate-pulse-slow text-muted-foreground">Thinking…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-border shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about Bill's work…"
                className="flex-1 bg-white/5 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/30 transition-colors"
                aria-label="Message input"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: 'var(--foreground)', color: 'var(--primary-foreground)' }}
                aria-label="Send message"
              >
                <Icon name="PaperAirplaneIcon" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}