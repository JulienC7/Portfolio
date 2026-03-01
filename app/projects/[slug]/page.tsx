import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RowDataPacket } from 'mysql2';
import Header from '@/components/Header';
import { getPool } from '@/lib/db';
import '@/styles/ProjectDetail.scss';

interface Project extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  project_link: string;
  details: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const pool = await getPool();
    const [rows] = await pool.query<Project[]>(
      'SELECT * FROM projects WHERE slug = ? AND status = "published" LIMIT 1',
      [slug]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: 'Le projet demandé est introuvable.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = project.description;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `/projects/${project.slug}`,
      title: project.title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="project-detail">
      <Header showHero={false} />
      <div className="project-container">
        <Link href="/#projects" className="back-btn">
          ← Retour aux projets
        </Link>

        <div className="project-hero">
          <div className="project-hero-image">
            <img src={project.image_url} alt={project.title} className="project-hero-media" />
          </div>
          <div className="project-hero-content">
            <span className="category-badge">{project.category}</span>
            <h1>{project.title}</h1>
            <p className="description">{project.description}</p>
            <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="external-link-btn">
              Visiter le site →
            </a>
          </div>
        </div>

        <div className="project-content">
          <div className="content-text" dangerouslySetInnerHTML={{ __html: project.details }} />
        </div>

        <div className="project-footer">
          <Link href="/#projects" className="back-btn secondary">
            ← Voir d'autres projets
          </Link>
        </div>
      </div>
    </div>
  );
}
