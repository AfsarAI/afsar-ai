import * as React from 'react';
import { Briefcase, Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-light uppercase tracking-wider mb-2">
          <Briefcase className="h-3.5 w-3.5" />
          <span>Professional Experience</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Work & Leadership
        </h2>
        <p className="text-sm text-muted mt-2 max-w-xl">
          Direct engineering contributions to neuroscientific research platforms and academic community leadership.
        </p>
      </div>

      <div className="space-y-6">
        {/* Experience 1: SGBC IIT Madras */}
        <Card className="p-6 sm:p-8 border-border hover:border-accent/40 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground">
                  Full Stack Developer Intern
                </h3>
                <Badge variant="accent">Internship</Badge>
              </div>
              <h4 className="text-sm font-semibold text-accent-light mt-0.5">
                Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras
              </h4>
            </div>
            <div className="flex flex-col sm:items-end text-xs text-muted font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Nov 17, 2025 – May 16, 2026
              </span>
              <span className="flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5" />
                Chennai, Tamil Nadu, India
              </span>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-4">
            Contributed to the high-throughput neuroimaging platform mapping human brain architecture across post-mortem histology and MRI modalities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Implemented core clinical features for the <strong>OpenAtlas Editor</strong> platform built with Angular, Django, and PostgreSQL.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Developed <strong>Stroke2D</strong>, a research tool for visualizing, mapping, and annotating ischemic stroke regions on histology slices.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Engineered canvas-based landmark alignment tools and vector annotation modules using Vanilla JavaScript, HTML5, and CSS3.
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Maintained rigorous Agile practices, participating in peer code reviews, continuous testing, and staged deployment cycles.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
            {['Angular', 'Django', 'PostgreSQL', 'Vanilla JavaScript', 'HTML5 Canvas', 'REST APIs', 'Agile'].map((tech) => (
              <span key={tech} className="px-2.5 py-0.5 rounded-full bg-surface-2 text-[11px] text-muted font-mono border border-border/60">
                {tech}
              </span>
            ))}
          </div>
        </Card>

        {/* Experience 2: Kaziranga House Leadership */}
        <Card className="p-6 sm:p-8 border-border hover:border-accent/40 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground">
                  Group Leader — Academic Mentorship
                </h3>
                <Badge variant="secondary">Leadership</Badge>
              </div>
              <h4 className="text-sm font-semibold text-accent-light mt-0.5">
                Kaziranga House, IIT Madras BS Program
              </h4>
            </div>
            <div className="flex flex-col sm:items-end text-xs text-muted font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Sep 2023 – Aug 2024
              </span>
              <span className="flex items-center gap-1 mt-0.5">
                <Users className="h-3.5 w-3.5" />
                Mentored 100+ Students
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-foreground/80 leading-relaxed">
            <p className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Led and mentored a cohort of 100+ learners in the IITM BS Degree program through academic guidance and peer study sessions.
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                Organized coding workshops, machine learning study circles, and collaborative problem-solving groups to improve technical proficiency.
              </span>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
