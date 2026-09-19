'use client';

import * as React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

export interface SourceCitation {
  title: string;
  section: string;
  url: string;
}

interface SourceCitationsProps {
  sources: SourceCitation[];
  onNavigate?: (url: string) => void;
}

export function SourceCitations({ sources, onNavigate }: SourceCitationsProps) {
  if (!sources || sources.length === 0) return null;

  // Deduplicate sources by title and section
  const uniqueSources = sources.filter(
    (s, index, self) =>
      index === self.findIndex((t) => t.title === s.title && t.section === s.section)
  );

  return (
    <div className="mt-3 pt-3 border-t border-border/60">
      <div className="flex items-center gap-1.5 text-xs text-muted font-medium mb-2">
        <BookOpen className="h-3 w-3 text-accent-light" />
        <span>Grounded Sources:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {uniqueSources.map((source, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (onNavigate) {
                onNavigate(source.url);
              } else {
                window.location.hash = source.url;
              }
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-surface-2 hover:bg-surface-3 text-muted hover:text-foreground border border-border hover:border-border-hover transition-all active:scale-95 shadow-sm group"
            title={`Explore ${source.title} in portfolio`}
          >
            <span className="font-medium text-foreground/90">{source.title}</span>
            <span className="text-border">·</span>
            <span className="text-[11px] text-muted group-hover:text-accent-light transition-colors capitalize">
              {source.section}
            </span>
            <ExternalLink className="h-2.5 w-2.5 opacity-50 group-hover:opacity-100 ml-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
