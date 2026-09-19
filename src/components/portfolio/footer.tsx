import * as React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40 text-center text-xs text-muted flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">Mohd Afsar</span>
        <span>·</span>
        <span>AI-Native Agentic Portfolio</span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-mono">
        <Sparkles className="h-3 w-3 text-accent" />
        <span>Grounded RAG · Zero-Hallucination Architecture · ₹0/mo Infra</span>
      </div>

      <div className="text-[11px]">
        <span>© {new Date().getFullYear()} Mohd Afsar. All rights reserved.</span>
      </div>
    </footer>
  );
}
