import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
      <h2 className="text-4xl font-bold mb-3">404 - Page Not Found</h2>
      <p className="text-muted text-sm mb-6 max-w-md">
        The requested portfolio section or project could not be found.
      </p>
      <Link href="/">
        <Button variant="accent" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Afsar AI</span>
        </Button>
      </Link>
    </div>
  );
}
