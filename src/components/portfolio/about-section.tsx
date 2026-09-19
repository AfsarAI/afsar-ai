import * as React from 'react';
import { User, Code2, Brain, Database, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light uppercase tracking-wider">
            <User className="h-3.5 w-3.5" />
            <span>About Mohd Afsar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Building Systems at the Intersection of AI & Clean Software Design
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed font-sans">
            <p>
              I am an AI and full-stack software engineer pursuing a Bachelor of Science in Data Science and Applications at the{' '}
              <strong className="text-foreground font-semibold">Indian Institute of Technology Madras (IIT Madras)</strong> (2023–2027) with a CGPA of <strong className="text-foreground">8.05/10</strong>.
            </p>
            <p>
              My engineering approach prioritizes <span className="text-foreground">systems rigor</span>. In hackathons like the Smart India Hackathon (SIH 26171) for ISRO, I designed <strong className="text-foreground font-semibold">RedactVision Agent</strong>—an on-device browser agent that enforces privacy boundaries before data ever reaches a remote LLM.
            </p>
            <p>
              During my internship at the <strong className="text-foreground font-semibold">Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras</strong>, I engineered scientific web visualizers (<strong className="text-foreground font-semibold">Stroke2D</strong>) allowing neuroscientists to register and annotate microscopic histology sections against whole-brain MRI planes in real time.
            </p>
          </div>
        </div>

        {/* Right Column: Key Pillars */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          <Card className="p-5 border-border hover:border-accent/40 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light flex-shrink-0">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Agentic AI & Browser Systems</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Tool calling, structured planning, and local DOM perception engines that act securely.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border hover:border-accent/40 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light flex-shrink-0">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Full Stack Architecture</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  End-to-end applications across React, Next.js, Angular, Django, FastAPI, and PostgreSQL.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 border-border hover:border-accent/40 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-light flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Privacy-Preserving AI</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Zero-leakage architectures: on-device PII tokenization and local validation protocols.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
