'use client';

import * as React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ShieldCheck, Layers, Cpu, Calendar, UserCheck } from 'lucide-react';
import { ProjectItem } from '@/lib/content/schema';

interface ProjectModalProps {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  const { metadata, content } = project;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-3xl max-h-[85vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="accent">{metadata.category.toUpperCase()}</Badge>
            {metadata.featured && <Badge variant="secondary">Featured Project</Badge>}
            {metadata.startDate && (
              <span className="text-xs text-muted font-mono flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {metadata.startDate} {metadata.endDate ? `– ${metadata.endDate}` : ''}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {metadata.title}
          </h2>
          {metadata.subtitle && (
            <p className="text-sm sm:text-base text-muted mt-1 leading-relaxed">
              {metadata.subtitle}
            </p>
          )}
          {metadata.role && (
            <div className="flex items-center gap-1.5 text-xs text-accent-light font-medium mt-2">
              <UserCheck className="h-3.5 w-3.5" />
              <span>{metadata.role}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {metadata.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-3 pt-2 pb-1 border-b border-border/60">
          {metadata.github && (
            <a href={metadata.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </Button>
            </a>
          )}
          {metadata.demo && (
            <a href={metadata.demo} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </Button>
            </a>
          )}
        </div>

        {/* Rendered Content Breakdown */}
        <div className="space-y-4 text-sm text-foreground/90 leading-relaxed font-sans">
          {content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h3
                  key={idx}
                  className="text-lg font-semibold text-foreground pt-3 border-t border-border/40 flex items-center gap-2"
                >
                  <Layers className="h-4 w-4 text-accent" />
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-surface-2/70 border-l-4 border-accent text-xs text-muted leading-relaxed"
                >
                  {paragraph.replace('> ', '')}
                </div>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="space-y-1.5 pl-4 list-disc text-muted">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^(\d+\.|\-)\s+/, '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted">
          <span>Source: Canonical Portfolio Knowledge Base</span>
          <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
