'use client';

import * as React from 'react';
import { ProjectItem } from '@/lib/content/schema';
import { ProjectCard } from './project-card';
import { ProjectModal } from './project-modal';
import { Layers, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  activeProjectId?: string | null;
  onClearActiveProject?: () => void;
}

export function ProjectsSection({
  projects,
  activeProjectId,
  onClearActiveProject,
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<string>('all');

  // React to programmatic activeProjectId changes from AI tools
  React.useEffect(() => {
    if (activeProjectId) {
      const match = projects.find((p) => p.metadata.id === activeProjectId);
      if (match) {
        setSelectedProject(match);
      }
    }
  }, [activeProjectId, projects]);

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === 'ai') {
      return projects.filter((p) =>
        p.metadata.tags?.some((t) => ['ai agent', 'privacy', 'llm'].includes(t.toLowerCase()))
      );
    }
    if (activeFilter === 'science') {
      return projects.filter((p) =>
        p.metadata.tags?.some((t) => ['neuroimaging', 'histology', 'mri', 'sgbc'].includes(t.toLowerCase()))
      );
    }
    if (activeFilter === 'fullstack') {
      return projects.filter((p) =>
        p.metadata.tags?.some((t) => ['full stack', 'vue.js', 'django rest', 'workflow automation'].includes(t.toLowerCase()))
      );
    }
    return projects;
  }, [projects, activeFilter]);

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      setSelectedProject(null);
      if (onClearActiveProject) onClearActiveProject();
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light uppercase tracking-wider mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Engineered Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <p className="text-sm text-muted mt-2 max-w-xl">
            Real implementations solving difficult constraints: on-device PII redaction for browser agents, scientific brain tissue spatial alignment, and structured municipal workflows.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-1 border border-border/80 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai', label: 'AI & Agents' },
            { id: 'science', label: 'Neuroimaging' },
            { id: 'fullstack', label: 'Full Stack' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === tab.id
                  ? 'bg-surface-3 text-foreground font-semibold shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.metadata.id}
            project={project}
            onOpenDetails={(proj) => setSelectedProject(proj)}
          />
        ))}
      </div>

      {/* Detailed Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        open={Boolean(selectedProject)}
        onOpenChange={handleCloseModal}
      />
    </section>
  );
}
