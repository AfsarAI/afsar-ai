'use client';

import * as React from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Terminal,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  MessageCircle,
  Send,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type FeedbackCategory = 'feedback' | 'broken_link' | 'collaboration' | 'general';

const CATEGORIES: { id: FeedbackCategory; label: string; icon: string }[] = [
  { id: 'feedback', label: 'General Feedback', icon: '💡' },
  { id: 'broken_link', label: 'Broken Link / Issue', icon: '⚠️' },
  { id: 'collaboration', label: 'Project / Collaboration', icon: '🤝' },
  { id: 'general', label: 'Just Saying Hi', icon: '👋' },
];

export function ContactSection() {
  const [copiedAcademic, setCopiedAcademic] = React.useState(false);
  const [copiedPersonal, setCopiedPersonal] = React.useState(false);

  // Form states
  const [name, setName] = React.useState('');
  const [contactInfo, setContactInfo] = React.useState('');
  const [category, setCategory] = React.useState<FeedbackCategory>('feedback');
  const [message, setMessage] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const handleCopy = (text: string, type: 'academic' | 'personal') => {
    navigator.clipboard.writeText(text);
    if (type === 'academic') {
      setCopiedAcademic(true);
      setTimeout(() => setCopiedAcademic(false), 2000);
    } else {
      setCopiedPersonal(true);
      setTimeout(() => setCopiedPersonal(false), 2000);
    }
  };

  const constructPayload = () => {
    const categoryObj = CATEGORIES.find((c) => c.id === category);
    const categoryTitle = categoryObj ? `${categoryObj.icon} ${categoryObj.label}` : category;
    const senderName = name.trim() || 'Visitor';
    const senderContact = contactInfo.trim() || 'Not specified';
    const body = message.trim() || 'Hello Afsar!';

    return {
      categoryTitle,
      senderName,
      senderContact,
      body,
    };
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatusMessage('Please enter a short message or feedback.');
      return;
    }

    const { categoryTitle, senderName, senderContact, body } = constructPayload();
    const formattedText = `*Portfolio Message & Feedback*\n\n` +
      `*Type:* ${categoryTitle}\n` +
      `*From:* ${senderName}\n` +
      `*Contact:* ${senderContact}\n\n` +
      `*Message:*\n${body}`;

    const url = `https://wa.me/918604766241?text=${encodeURIComponent(formattedText)}`;
    setStatusMessage('Redirecting to WhatsApp...');
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setStatusMessage('WhatsApp opened! Click send in your WhatsApp window.');
    }, 400);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatusMessage('Please enter a short message or feedback.');
      return;
    }

    const { categoryTitle, senderName, senderContact, body } = constructPayload();
    const subject = `[Portfolio] ${categoryTitle} from ${senderName}`;
    const mailBody = `Hi Afsar,\n\n` +
      `Category: ${categoryTitle}\n` +
      `Sender Name: ${senderName}\n` +
      `Sender Contact: ${senderContact}\n\n` +
      `Message / Feedback:\n${body}\n\n` +
      `Sent via afsar-ai.vercel.app`;

    const mailtoUrl = `mailto:23f2002023@ds.study.iitm.ac.in?cc=mohammadafsar786921@gmail.com&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(mailBody)}`;

    setStatusMessage('Opening your email client...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatusMessage('Email client triggered!');
    }, 400);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Info & Profiles */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-light uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Connect & Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Let&apos;s Discuss Engineering & Share Feedback
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-lg">
              Have feedback on this portfolio, noticed a broken link or downtime, or want to discuss AI agent engineering, full-stack roles, or research collaboration? Reach out directly or drop a quick note.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3 text-xs text-muted">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
              <span>Chennai, Tamil Nadu & Ambedkar Nagar, UP, India</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <Phone className="h-4 w-4 text-emerald flex-shrink-0" />
              <span>+91 8604766241 (Call & WhatsApp Available)</span>
            </div>
          </div>

          {/* Contact Direct Cards */}
          <div className="space-y-3 pt-2">
            {/* Academic Email Card */}
            <Card className="p-4 border-border hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted font-mono uppercase block">IIT Madras Academic</span>
                    <a
                      href="mailto:23f2002023@ds.study.iitm.ac.in"
                      className="text-xs font-semibold text-foreground hover:text-accent-light transition-colors truncate block"
                    >
                      23f2002023@ds.study.iitm.ac.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopy('23f2002023@ds.study.iitm.ac.in', 'academic')}
                    className="p-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-muted hover:text-foreground transition-colors"
                    title="Copy email"
                  >
                    {copiedAcademic ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <a href="mailto:23f2002023@ds.study.iitm.ac.in">
                    <Button variant="accent" size="sm" className="h-7 px-2.5 text-[11px] gap-1">
                      <span>Email</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            {/* Personal Email Card */}
            <Card className="p-4 border-border hover:border-accent/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-muted font-mono uppercase block">Personal Email</span>
                    <a
                      href="mailto:mohammadafsar786921@gmail.com"
                      className="text-xs font-semibold text-foreground hover:text-accent-light transition-colors truncate block"
                    >
                      mohammadafsar786921@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopy('mohammadafsar786921@gmail.com', 'personal')}
                    className="p-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-muted hover:text-foreground transition-colors"
                    title="Copy email"
                  >
                    {copiedPersonal ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <a href="mailto:mohammadafsar786921@gmail.com">
                    <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px] gap-1">
                      <span>Email</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <a
              href="https://github.com/AfsarAI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-border hover:border-accent/40 hover:bg-surface-2/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Github className="h-4 w-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-foreground block">GitHub</span>
                  <span className="text-[10px] text-muted font-mono truncate block">@AfsarAI</span>
                </div>
              </div>
              <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-accent-light transition-colors flex-shrink-0" />
            </a>

            <a
              href="https://www.linkedin.com/in/afsarai/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-border hover:border-accent/40 hover:bg-surface-2/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Linkedin className="h-4 w-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-foreground block">LinkedIn</span>
                  <span className="text-[10px] text-muted font-mono truncate block">in/afsarai</span>
                </div>
              </div>
              <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-accent-light transition-colors flex-shrink-0" />
            </a>

            <a
              href="https://leetcode.com/u/afsar_ai_/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface-1 border border-border hover:border-accent/40 hover:bg-surface-2/60 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Terminal className="h-4 w-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-foreground block">LeetCode</span>
                  <span className="text-[10px] text-muted font-mono truncate block">300+ Solved</span>
                </div>
              </div>
              <ArrowUpRight className="h-3 w-3 text-muted group-hover:text-accent-light transition-colors flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* Right Form: Interactive Feedback & Direct Message */}
        <div className="lg:col-span-6">
          <Card className="p-6 border-border shadow-xl relative overflow-hidden bg-surface-1/95">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span>Send Message or Feedback</span>
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    Choose category and send directly via WhatsApp or Email.
                  </p>
                </div>
                <div className="h-7 w-7 rounded-full bg-emerald/10 text-emerald flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
              </div>

              {/* Category Pills */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-muted block">
                  Select Topic
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((c) => {
                    const active = category === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all flex items-center gap-2 ${
                          active
                            ? 'border-accent bg-accent/15 text-accent-light shadow-sm shadow-accent/10 font-semibold'
                            : 'border-border bg-surface-2/60 text-muted hover:text-foreground hover:border-border-hover'
                        }`}
                      >
                        <span>{c.icon}</span>
                        <span className="truncate">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="feedback-name" className="text-[11px] font-mono uppercase text-muted block">
                    Your Name <span className="text-muted/60">(Optional)</span>
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full h-9 px-3 rounded-xl bg-surface-2 border border-border text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="feedback-contact" className="text-[11px] font-mono uppercase text-muted block">
                    Email or Phone <span className="text-muted/60">(Optional)</span>
                  </label>
                  <input
                    id="feedback-contact"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="e.g. your@email.com"
                    className="w-full h-9 px-3 rounded-xl bg-surface-2 border border-border text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1">
                <label htmlFor="feedback-message" className="text-[11px] font-mono uppercase text-muted block">
                  Your Message / Feedback <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="feedback-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    category === 'broken_link'
                      ? 'Please describe the broken link or issue you encountered...'
                      : category === 'collaboration'
                      ? 'Tell me about the project, research, or role you want to discuss...'
                      : 'Share your thoughts, suggestions, or greetings...'
                  }
                  className="w-full p-3 rounded-xl bg-surface-2 border border-border text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                  required
                />
              </div>

              {/* Status Banner */}
              {statusMessage && (
                <div className="p-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Button
                  type="button"
                  variant="emerald"
                  size="md"
                  onClick={handleSendWhatsApp}
                  className="w-full gap-2 text-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send via WhatsApp</span>
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleSendEmail}
                  className="w-full gap-2 text-xs hover:border-accent/40"
                >
                  <Mail className="h-4 w-4 text-accent-light" />
                  <span>Send via Email</span>
                </Button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted/70 pt-1">
                <span>Direct delivery to Mohd Afsar</span>
                <span className="font-mono">Instant & Secure</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
