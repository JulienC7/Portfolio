'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/Projects.scss';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  project_link: string;
  technologies?: string[];
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [autoplay, setAutoplay] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const getProjectThemes = (project: Project) => {
    const projectThemes = ['Site web'];

    if (
      project.slug === 'eurockeennes' ||
      project.slug === 'web-security' ||
      project.category === 'Full Stack' ||
      project.category === 'Gaming'
    ) {
      projectThemes.push('Full stack');
    }

    if (project.category === 'Creative Development') {
      projectThemes.push('Projet créatif');
    }

    return Array.from(new Set(projectThemes));
  };

  const themes = Array.from(new Set(projects.flatMap((project) => getProjectThemes(project))));
  const technologies = Array.from(
    new Set(
      projects.flatMap((project) =>
        Array.isArray(project.technologies) ? project.technologies : []
      )
    )
  ).sort((firstTechnology, secondTechnology) => firstTechnology.localeCompare(secondTechnology));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
        setFiltered(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const hasThemeFilter = selectedThemes.length > 0;
    const hasTechnologyFilter = selectedTechnologies.length > 0;

    if (!hasThemeFilter && !hasTechnologyFilter) {
      setFiltered(projects);
      setIndex(0);
      return;
    }

    const nextFiltered = projects.filter((project) => {
      const projectThemes = getProjectThemes(project);
      const matchesTheme =
        !hasThemeFilter || selectedThemes.some((selectedTheme) => projectThemes.includes(selectedTheme));
      const projectTechnologies = Array.isArray(project.technologies) ? project.technologies : [];
      const matchesTechnology =
        !hasTechnologyFilter ||
        selectedTechnologies.some((selectedTechnology) =>
          projectTechnologies.includes(selectedTechnology)
        );

      return matchesTheme && matchesTechnology;
    });

    setFiltered(nextFiltered);
    setIndex(0);
  }, [projects, selectedThemes, selectedTechnologies]);

  const toggleTheme = (theme: string) => {
    setSelectedThemes((previousSelectedThemes) =>
      previousSelectedThemes.includes(theme)
        ? previousSelectedThemes.filter((selectedTheme) => selectedTheme !== theme)
        : [...previousSelectedThemes, theme]
    );
  };

  const toggleTechnology = (technology: string) => {
    setSelectedTechnologies((previousSelectedTechnologies) =>
      previousSelectedTechnologies.includes(technology)
        ? previousSelectedTechnologies.filter((selectedTechnology) => selectedTechnology !== technology)
        : [...previousSelectedTechnologies, technology]
    );
  };

  const clearFilters = () => {
    setSelectedThemes([]);
    setSelectedTechnologies([]);
  };

  useEffect(() => {
    if (!autoplay || filtered.length === 0) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % filtered.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [autoplay, filtered.length]);

  const prev = () => {
    setIndex(prev => (prev === 0 ? filtered.length - 1 : prev - 1));
    setAutoplay(false);
  };

  const next = () => {
    setIndex(prev => (prev + 1) % filtered.length);
    setAutoplay(false);
  };

  const clickDot = (n: number) => {
    setIndex(n);
    setAutoplay(false);
  };

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="projects-container">
          <h2>MES PROJETS</h2>
          <p>Chargement des projets...</p>
        </div>
      </section>
    );
  }

  if (filtered.length === 0) {
    return (
      <section id="projects" className="projects">
        <div className="projects-container">
          <div className="projects-header">
            <h2>MES PROJETS</h2>
            <div className="filters">
              <div className="filter-group">
                <h3>Thématique</h3>
                <div className="filter-options">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      className={`filter-btn ${selectedThemes.includes(theme) ? 'active' : ''}`}
                      onClick={() => toggleTheme(theme)}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Technologies</h3>
                <div className="filter-options">
                  {technologies.map((technology) => (
                    <button
                      key={technology}
                      className={`filter-btn ${selectedTechnologies.includes(technology) ? 'active' : ''}`}
                      onClick={() => toggleTechnology(technology)}
                    >
                      {technology}
                    </button>
                  ))}
                </div>
              </div>

              <button className="clear-filters-btn" onClick={clearFilters}>
                Réinitialiser les filtres
              </button>
            </div>
          </div>
          <p>Aucun projet ne correspond aux filtres sélectionnés.</p>
        </div>
      </section>
    );
  }

  const projet = filtered[index];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2>MES PROJETS</h2>
          <div className="filters">
            <div className="filter-group">
              <h3>Thématique</h3>
              <div className="filter-options">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    className={`filter-btn ${selectedThemes.includes(theme) ? 'active' : ''}`}
                    onClick={() => toggleTheme(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Technologies</h3>
              <div className="filter-options">
                {technologies.map((technology) => (
                  <button
                    key={technology}
                    className={`filter-btn ${selectedTechnologies.includes(technology) ? 'active' : ''}`}
                    onClick={() => toggleTechnology(technology)}
                  >
                    {technology}
                  </button>
                ))}
              </div>
            </div>

            <button className="clear-filters-btn" onClick={clearFilters}>
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        <div className="slider-wrapper">
          <button className="slider-arrow prev" onClick={prev}>←</button>

          <div className="slider-container">
            <div className="project-card">
              <div className="project-image">
                <img 
                  src={projet.image_url}
                  alt={projet.title}
                  className="project-image-media"
                />
              </div>
              <div className="project-info">
                <h3>{projet.title}</h3>
                <p>{projet.description}</p>
                <Link href={`/projects/${projet.slug}`} className="view-project-btn">
                  VOIR LE PROJET →
                </Link>
              </div>
            </div>
          </div>

          <button className="slider-arrow next" onClick={next}>→</button>
        </div>

        <div className="slider-indicators">
          {filtered.map((_, i) => (
            <button
              key={i}
              className={`indicator ${i === index ? 'active' : ''}`}
              onClick={() => clickDot(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );}