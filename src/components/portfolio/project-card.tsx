'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { ProjectItem } from '@/lib/content/schema';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const { metadata, content } = project;

  // Extract first problem/overview snippet
  const overviewSnippet = React.useMemo(() => {
    const lines = content.split('\n\n');
    const firstPara = lines.find((l) => !l.startsWith('#') && !l.startsWith('>') && l.trim().length > 30);
    return firstPara ? firstPara.slice(0, 160) + '...' : metadata.subtitle || '';
  }, [content, metadata.subtitle]);

  return (
    <Card className="flex flex-col h-full group hover:border-accent/40 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={metadata.featured ? 'accent' : 'default'} className="text-[10px]">
            {metadata.featured ? 'Featured' : 'Systems'}
          </Badge>
          {metadata.role && (
            <span className="text-[11px] text-muted font-mono truncate max-w-[180px]">
              {metadata.role}
            </span>
          )}
        </div>
        <CardTitle className="text-xl group-hover:text-accent-light transition-colors">
          {metadata.title}
        </CardTitle>
        {metadata.subtitle && (
          <p className="text-xs text-muted font-medium mt-1">
            {metadata.subtitle}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-xs text-muted leading-relaxed mb-4">
          {overviewSnippet}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {metadata.tags?.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-surface-2 text-[11px] text-muted font-mono border border-border/50"
            >
              {tag}
            </span>
          ))}
          {(metadata.tags?.length || 0) > 5 && (
            <span className="px-1.5 py-0.5 text-[10px] text-muted">
              +{metadata.tags!.length - 5}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenDetails(project)}
          className="w-full gap-1.5 text-xs group-hover:border-accent/50 group-hover:bg-accent/5"
        >
          <span>Deep Dive & Architecture</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>

        {metadata.github && (
          <a
            href={metadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            title="GitHub Repository"
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Github className="h-4 w-4" />
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
