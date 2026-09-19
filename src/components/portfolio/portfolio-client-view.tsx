'use client';

import * as React from 'react';
import { ProjectItem } from '@/lib/content/schema';
import { Navbar, ViewMode } from './navbar';
import { ProjectsSection } from './projects-section';
import { AboutSection } from './about-section';
import { ExperienceSection } from './experience-section';
import { EducationSection } from './education-section';
import { SkillsSection } from './skills-section';
import { ContactSection } from './contact-section';
import { Footer } from './footer';
import { ChatContainer } from '@/components/ai/chat-container';
import { Sparkles, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioClientViewProps {
  projects: ProjectItem[];
}

export function PortfolioClientView({ projects }: PortfolioClientViewProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>('ask');
  const [activeProjectId, setActiveProjectId] = React.useState<string | null>(null);
  const [highlightedSection, setHighlightedSection] = React.useState<string | null>(null);
  const [actionNotification, setActionNotification] = React.useState<string | null>(null);

  const showNotification = (text: string) => {
    setActionNotification(text);
    setTimeout(() => {
      setActionNotification(null);
    }, 3000);
  };

  const handleOpenProject = (projectId: string) => {
    setViewMode('explore');
    setActiveProjectId(projectId);
    showNotification(`✦ Opened Project Details`);
    setTimeout(() => {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateSection = (sectionId: string) => {
    setViewMode('explore');
    const formatted = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    showNotification(`✦ Navigated to ${formatted}`);

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setHighlightedSection(sectionId);
        setTimeout(() => setHighlightedSection(null), 2500);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-accent/25 selection:text-accent-light">
      {/* Top Navbar with Mode Selector */}
      <Navbar
        viewMode={viewMode}
        onSelectMode={(mode) => setViewMode(mode)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Action Notification Toast (e.g. "✦ Opened Projects") */}
      {actionNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="px-4 py-2 rounded-full bg-surface-1 border border-accent/40 text-xs font-medium text-accent-light shadow-2xl shadow-accent/10 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span>{actionNotification}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {/* MODE 1: ASK AI (PRIMARY EXPERIENCE) */}
        {viewMode === 'ask' && (
          <div className="animate-in fade-in duration-300">
            <ChatContainer
              onOpenProject={handleOpenProject}
              onNavigateSection={handleNavigateSection}
              onSwitchToExplore={() => setViewMode('explore')}
            />
          </div>
        )}

        {/* MODE 2: EXPLORE PORTFOLIO (SECONDARY EXPERIENCE) */}
        {viewMode === 'explore' && (
          <div className="animate-in fade-in duration-300 max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-16">
            {/* Header banner explaining mode and offering quick return to AI */}
            <div className="mt-4 p-4 rounded-2xl bg-surface-1 border border-border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs text-muted text-center sm:text-left">
                <Compass className="h-4 w-4 text-accent-light flex-shrink-0" />
                <span>
                  Browsing <strong className="text-foreground">Manual Portfolio</strong>. You can ask Afsar AI questions about any section at any time.
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('ask')}
                className="gap-1.5 text-xs flex-shrink-0"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent-light" />
                <span>Return to AI Chat</span>
              </Button>
            </div>

            {/* Projects */}
            <div
              id="projects"
              className={highlightedSection === 'projects' ? 'ring-2 ring-accent/60 rounded-3xl transition-all' : ''}
            >
              <ProjectsSection
                projects={projects}
                activeProjectId={activeProjectId}
                onClearActiveProject={() => setActiveProjectId(null)}
              />
            </div>

            {/* About */}
            <div
              id="about"
              className={highlightedSection === 'about' ? 'ring-2 ring-accent/60 rounded-3xl transition-all' : ''}
            >
              <AboutSection />
            </div>

            {/* Experience */}
            <div
              id="experience"
              className={highlightedSection === 'experience' ? 'ring-2 ring-accent/60 rounded-3xl transition-all' : ''}
            >
              <ExperienceSection />
            </div>

            {/* Education */}
            <div
              id="education"
              className={highlightedSection === 'education' ? 'ring-2 ring-accent/60 rounded-3xl transition-all' : ''}
            >
              <EducationSection />
            </div>

            {/* Skills */}
            <div
              id="skills"
              className={highlightedSection === 'skills' ? 'ring-2 ring-accent/60 rounded-3xl transition-all' : ''}
            >
              <SkillsSection />
            </div>

            {/* Contact */}
            <div
              id="contact"
              className={highlightedSection === 'contact' ? 'ring-2 ring-accent/60 rounded-3xl transition-all' : ''}
            >
              <ContactSection />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        )}
      </main>

      {/* Floating Mode Return Button when in Explore Mode */}
      {viewMode === 'explore' && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in zoom-in">
          <Button
            variant="accent"
            size="lg"
            onClick={() => {
              setViewMode('ask');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="rounded-full shadow-2xl shadow-accent/20 gap-2 px-5 h-12"
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold text-sm">Ask Afsar AI</span>
          </Button>
        </div>
      )}
    </div>
  );
}
