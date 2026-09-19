'use client';

import * as React from 'react';
import { Compass, FolderGit2, FileText, ExternalLink, Check } from 'lucide-react';

interface ToolIndicatorProps {
  toolCall: {
    name: string;
    arguments: Record<string, unknown>;
  };
}

export function ToolIndicator({ toolCall }: ToolIndicatorProps) {
  const { name, arguments: args } = toolCall;

  let label = 'Executing action...';
  let Icon = Compass;

  if (name === 'openSection') {
    const sec = (args.section as string) || 'projects';
    label = `Opened ${sec.charAt(0).toUpperCase() + sec.slice(1)} Section`;
    Icon = Compass;
  } else if (name === 'openProject') {
    const proj = (args.projectId as string) || 'project';
    const formatted = proj.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    label = `Opened Project: ${formatted}`;
    Icon = FolderGit2;
  } else if (name === 'openResume') {
    label = 'Opened Verified Resume (PDF)';
    Icon = FileText;
  } else if (name === 'openExternalLink') {
    const platform = (args.platform as string) || 'profile';
    label = `Navigated to ${platform.toUpperCase()}`;
    Icon = ExternalLink;
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/25 text-xs text-accent-light font-medium my-2 animate-in fade-in slide-in-from-left-2 shadow-sm">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      <Check className="h-3 w-3 text-accent ml-0.5 opacity-90" />
    </div>
  );
}
