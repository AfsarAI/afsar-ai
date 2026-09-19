import { notFound } from 'next/navigation';
import { loadProjects } from '@/lib/content/loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Github, ExternalLink, Calendar, UserCheck, Layers } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = loadProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = loadProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: 'Project Not Found | Mohd Afsar' };

  return {
    title: `${project.metadata.title} | Mohd Afsar Portfolio`,
    description: project.metadata.subtitle || `Detailed architecture and overview of ${project.metadata.title}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = loadProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { metadata, content } = project;

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Button */}
        <Link href="/#projects">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Projects</span>
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{metadata.category.toUpperCase()}</Badge>
            {metadata.featured && <Badge variant="secondary">Featured</Badge>}
            {metadata.startDate && (
              <span className="text-xs text-muted font-mono flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {metadata.startDate} {metadata.endDate ? `– ${metadata.endDate}` : ''}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {metadata.title}
          </h1>

          {metadata.subtitle && (
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {metadata.subtitle}
            </p>
          )}

          {metadata.role && (
            <div className="flex items-center gap-1.5 text-sm text-accent-light font-medium pt-1">
              <UserCheck className="h-4 w-4" />
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
        <div className="flex flex-wrap gap-3 py-3 border-y border-border/60">
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

        {/* Content Body */}
        <div className="space-y-5 text-sm sm:text-base text-foreground/90 leading-relaxed font-sans">
          {content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-bold text-foreground pt-6 border-t border-border/40 flex items-center gap-2"
                >
                  <Layers className="h-5 w-5 text-accent" />
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface-1 border-l-4 border-accent text-sm text-muted leading-relaxed"
                >
                  {paragraph.replace('> ', '')}
                </div>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="space-y-2 pl-5 list-disc text-muted">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^(\d+\.|\-)\s+/, '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Footer Navigation */}
        <div className="pt-10 border-t border-border/60 flex items-center justify-between">
          <Link href="/#projects">
            <Button variant="secondary" size="md" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Explore More Projects</span>
            </Button>
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="md">
              Download Resume
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
