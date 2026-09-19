'use client';

import * as React from 'react';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatInput } from '@/components/ai/chat-input';

interface HeroSectionProps {
  onStartChat: (prompt: string) => void;
  onOpenProjects: () => void;
}

export function HeroSection({ onStartChat, onOpenProjects }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-muted mb-6">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="text-foreground font-medium">Afsar AI</span>
        <span className="text-border">·</span>
        <span>Portfolio Assistant</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3">
        Hi, I&apos;m Afsar 👋
      </h1>

      <p className="text-base sm:text-lg text-muted max-w-md mx-auto mb-8">
        Ask anything about my projects, engineering background, skills, or portfolio.
      </p>

      <div className="max-w-xl mx-auto mb-6">
        <ChatInput
          onSendMessage={onStartChat}
          isStreaming={false}
          onStopStreaming={() => {}}
          placeholder="Ask anything about Afsar..."
        />
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" size="sm" onClick={onOpenProjects} className="gap-1.5 text-xs">
          <span>Explore Projects</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted hover:text-foreground">
            <FileText className="h-3.5 w-3.5" />
            <span>Resume</span>
          </Button>
        </a>
      </div>
    </section>
  );
}
