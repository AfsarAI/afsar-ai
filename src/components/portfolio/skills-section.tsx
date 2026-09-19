import * as React from 'react';
import { Cpu, Terminal, Code2, Database, Brain, Layers, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
    accent: 'text-accent-light',
  },
  {
    title: 'Frontend Frameworks',
    icon: Layers,
    skills: ['React', 'Next.js', 'Angular', 'Vue.js', 'Tailwind CSS', 'HTML5 Canvas'],
    accent: 'text-accent-light',
  },
  {
    title: 'Backend & APIs',
    icon: Terminal,
    skills: ['FastAPI', 'Django', 'Django REST', 'Flask', 'REST APIs', 'Pydantic'],
    accent: 'text-accent-light',
  },
  {
    title: 'Databases & Storage',
    icon: Database,
    skills: ['PostgreSQL', 'SQLite', 'Schema Design', 'Query Optimization'],
    accent: 'text-accent-light',
  },
  {
    title: 'AI, ML & Agentic Systems',
    icon: Brain,
    skills: ['PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'Tool Calling', 'Hybrid RAG', 'Prompt Eng.'],
    accent: 'text-accent-light',
  },
  {
    title: 'Developer Tools & OS',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Linux (Ubuntu)', 'VS Code', 'IntelliJ IDEA', 'Postman'],
    accent: 'text-accent-light',
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light uppercase tracking-wider mb-2">
          <Cpu className="h-3.5 w-3.5" />
          <span>Technical Toolkit</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Skills & Technologies
        </h2>
        <p className="text-sm text-muted mt-2 max-w-xl">
          Practical experience across modern language runtimes, machine learning toolkits, and robust database layers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card key={cat.title} className="p-6 border-border hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-2 rounded-xl bg-surface-2 border border-border">
                  <Icon className={`h-4 w-4 ${cat.accent}`} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{cat.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-surface-2 text-xs text-foreground/80 font-mono border border-border hover:border-accent/40 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
