import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Project extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  image_url: string;
  project_link: string;
  details: string;
  status: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  try {
    const pool = await getPool();
    let query = 'SELECT * FROM projects WHERE status = "published"';
    const params: any[] = [];

    if (category && category !== 'Tous') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (slug) {
      query += ' AND slug = ?';
      params.push(slug);
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const [projects] = await pool.query<Project[]>(query, params);

    const formattedProjects = projects.map((project) => ({
      ...project,
      technologies: typeof project.technologies === 'string' 
        ? JSON.parse(project.technologies) 
        : project.technologies,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
