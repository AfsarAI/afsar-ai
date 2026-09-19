import * as React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light uppercase tracking-wider mb-2">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Academic Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Education & Foundations
        </h2>
        <p className="text-sm text-muted mt-2 max-w-xl">
          Strong theoretical foundations in computer science, statistics, algorithmic reasoning, and machine learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Degree 1: IIT Madras */}
        <Card className="md:col-span-8 p-6 sm:p-8 border-border hover:border-accent/40 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="accent">Premier Institution</Badge>
                <span className="text-xs font-mono text-muted flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  May 2023 – Jan 2027 (Expected)
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mt-2">
                Indian Institute of Technology Madras
              </h3>
              <p className="text-sm font-semibold text-accent-light mt-0.5">
                Bachelor of Science (B.S.) in Data Science and Applications
              </p>
              <div className="flex items-center gap-1 text-xs text-muted mt-1">
                <MapPin className="h-3 w-3" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-surface-2 border border-accent/30 text-center sm:text-right min-w-[120px]">
              <span className="text-[11px] text-muted font-mono uppercase block">Cumulative GPA</span>
              <span className="text-2xl font-extrabold text-foreground tracking-tight">8.05</span>
              <span className="text-xs text-muted"> / 10.0</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-3">
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              <span>Key Academic Coursework</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Data Structures & Algorithms',
                'Database Management Systems',
                'Object-Oriented Programming',
                'Machine Learning',
                'Deep Learning',
                'Software Engineering',
                'Applied Statistics',
              ].map((course) => (
                <span
                  key={course}
                  className="px-2.5 py-1 rounded-lg bg-surface-2 text-xs text-foreground/80 border border-border/60 font-medium"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Secondary: JNV */}
        <Card className="md:col-span-4 p-6 sm:p-8 border-border/80 hover:border-border transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default">Senior Secondary</Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Jawahar Navodaya Vidyalaya
            </h3>
            <p className="text-xs font-semibold text-muted mt-0.5">
              Senior Secondary (PCM - Physics, Chem, Math)
            </p>
            <div className="flex items-center gap-1 text-xs text-muted mt-1">
              <MapPin className="h-3 w-3" />
              <span>Ambedkar Nagar, UP, India</span>
            </div>

            <p className="text-xs text-muted mt-4 leading-relaxed">
              Competitive national residential school focusing on advanced mathematics and physical science foundations.
            </p>
          </div>

          <div className="pt-4 mt-6 border-t border-border/40 text-xs text-muted font-mono flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            <span>Aug 2015 – May 2022</span>
          </div>
        </Card>
      </div>
    </section>
  );
}
