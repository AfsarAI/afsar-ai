import * as React from 'react';
import { Mail, Phone, Github, Linkedin, Terminal, MapPin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Info */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light uppercase tracking-wider">
            <Mail className="h-3.5 w-3.5" />
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Let&apos;s Discuss Engineering & Research Opportunities
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Whether you are discussing an AI agent architecture, full-stack software role, research collaboration, or competitive programming, feel free to reach out directly.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-muted">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Chennai, Tamil Nadu & Ambedkar Nagar, UP, India</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <Phone className="h-4 w-4 text-accent" />
              <span>+91 8604766241</span>
            </div>
          </div>
        </div>

        {/* Right Contact Cards */}
        <div className="lg:col-span-6 space-y-4">
          {/* Primary Email Card */}
          <Card className="p-5 border-border hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-muted font-mono uppercase block">Academic Email</span>
                  <a
                    href="mailto:23f2002023@ds.study.iitm.ac.in"
                    className="text-sm font-semibold text-foreground hover:text-accent-light transition-colors truncate block"
                  >
                    23f2002023@ds.study.iitm.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyEmail('23f2002023@ds.study.iitm.ac.in')}
                  className="p-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-muted hover:text-foreground transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </button>
                <a href="mailto:23f2002023@ds.study.iitm.ac.in">
                  <Button variant="accent" size="sm" className="gap-1 text-xs">
                    <span>Email</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://github.com/AfsarAI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-surface-1 border border-border hover:border-accent/40 hover:bg-surface-2/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Github className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
                <div>
                  <span className="text-xs font-semibold text-foreground block">GitHub</span>
                  <span className="text-[11px] text-muted font-mono">@AfsarAI</span>
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted group-hover:text-accent-light transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/afsarai/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-surface-1 border border-border hover:border-accent/40 hover:bg-surface-2/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
                <div>
                  <span className="text-xs font-semibold text-foreground block">LinkedIn</span>
                  <span className="text-[11px] text-muted font-mono">in/afsarai</span>
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted group-hover:text-accent-light transition-colors" />
            </a>

            <a
              href="https://leetcode.com/u/afsar_ai_/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-surface-1 border border-border hover:border-accent/40 hover:bg-surface-2/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
                <div>
                  <span className="text-xs font-semibold text-foreground block">LeetCode</span>
                  <span className="text-[11px] text-muted font-mono">300+ Solved</span>
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted group-hover:text-accent-light transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
