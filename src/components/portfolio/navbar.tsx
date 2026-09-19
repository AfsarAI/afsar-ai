'use client';

import * as React from 'react';
import { Sparkles, Compass, FileText, Github, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ViewMode = 'ask' | 'explore';

interface NavbarProps {
  viewMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  onNavigateSection?: (sectionId: string) => void;
}

const SECTION_LINKS = [
  { label: 'Projects', href: 'projects' },
  { label: 'About', href: 'about' },
  { label: 'Experience', href: 'experience' },
  { label: 'Education', href: 'education' },
  { label: 'Skills', href: 'skills' },
  { label: 'Contact', href: 'contact' },
];

export function Navbar({ viewMode, onSelectMode, onNavigateSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (viewMode !== 'explore') {
      onSelectMode('explore');
      setTimeout(() => {
        onNavigateSection?.(sectionId);
      }, 50);
    } else {
      onNavigateSection?.(sectionId);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3.5 pb-2 transition-all">
      <nav
        className={`mx-auto max-w-5xl rounded-2xl px-3.5 sm:px-5 py-2.5 transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? 'bg-surface-1/90 backdrop-blur-xl border-border shadow-2xl shadow-black/60'
            : 'bg-surface-1/60 backdrop-blur-md border-border/60'
        }`}
      >
        {/* Brand */}
        <button
          onClick={() => onSelectMode('ask')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="h-8 w-8 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent-light font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4 text-accent-light" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-foreground flex items-center gap-1.5">
              Afsar AI
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </span>
            <span className="text-[10px] text-muted font-mono tracking-wider">
              Portfolio Assistant
            </span>
          </div>
        </button>

        {/* Center: Mode Switcher */}
        <div className="flex items-center p-1 bg-surface-2/80 rounded-xl border border-border/80">
          <button
            onClick={() => onSelectMode('ask')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'ask'
                ? 'bg-surface-3 text-foreground font-semibold shadow-sm border border-border/70'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Sparkles className="h-3 w-3 text-accent-light" />
            <span>Ask AI</span>
          </button>
          <button
            onClick={() => onSelectMode('explore')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'explore'
                ? 'bg-surface-3 text-foreground font-semibold shadow-sm border border-border/70'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Compass className="h-3 w-3 text-muted" />
            <span>Explore Portfolio</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {viewMode === 'explore' && (
            <div className="hidden lg:flex items-center gap-1 mr-2 text-xs">
              {SECTION_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleSectionClick(link.href)}
                  className="px-2.5 py-1 text-muted hover:text-foreground hover:bg-surface-2 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          <a
            href="https://github.com/AfsarAI"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
            title="Afsar GitHub"
          >
            <Button variant="ghost" size="sm" className="h-8 px-2.5 text-xs text-muted hover:text-foreground">
              <Github className="h-3.5 w-3.5" />
            </Button>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs gap-1.5">
              <FileText className="h-3.5 w-3.5 text-accent-light" />
              <span>Resume</span>
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-5xl rounded-2xl bg-surface-1 border border-border p-4 shadow-2xl space-y-3 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-mono text-muted uppercase">Navigation</span>
            <span className="text-xs text-accent-light font-medium">
              Mode: {viewMode === 'ask' ? 'Ask AI' : 'Explore'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectMode('ask');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-medium border ${
                viewMode === 'ask'
                  ? 'bg-accent/15 border-accent/40 text-foreground font-semibold'
                  : 'bg-surface-2 border-border text-muted hover:text-foreground'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent-light" />
              <span>Ask Afsar AI</span>
            </button>
            <button
              onClick={() => {
                onSelectMode('explore');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-medium border ${
                viewMode === 'explore'
                  ? 'bg-accent/15 border-accent/40 text-foreground font-semibold'
                  : 'bg-surface-2 border-border text-muted hover:text-foreground'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Explore Portfolio</span>
            </button>
          </div>

          {viewMode === 'explore' && (
            <div className="pt-2 border-t border-border space-y-1">
              <span className="text-[11px] text-muted px-2 font-mono uppercase">Portfolio Sections</span>
              <div className="grid grid-cols-2 gap-1 pt-1">
                {SECTION_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleSectionClick(link.href)}
                    className="text-left px-3 py-2 rounded-lg text-xs text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-accent-light hover:underline font-medium"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume PDF</span>
            </a>
            <a
              href="https://github.com/AfsarAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
