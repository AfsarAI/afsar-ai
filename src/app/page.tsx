import { loadProjects } from '@/lib/content/loader';
import { PortfolioClientView } from '@/components/portfolio/portfolio-client-view';

export const dynamic = 'force-static';

export default function HomePage() {
  const projects = loadProjects();
  return <PortfolioClientView projects={projects} />;
}
