'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/styles/Technologies.scss';

interface Technology {
  id: number;
  name: string;
  logo: string;
}

const technologies: Technology[] = [
  {
    id: 1,
    name: 'React',
    logo: '/technologies/react.svg',
  },
  {
    id: 2,
    name: 'TypeScript',
    logo: '/technologies/typescript.svg',
  },
  {
    id: 3,
    name: 'Next.js',
    logo: '/technologies/nextjs.svg',
  },
  {
    id: 4,
    name: 'Node.js',
    logo: '/technologies/nodejs.svg',
  },
  {
    id: 5,
    name: 'Sass',
    logo: '/technologies/sass.svg',
  },
  {
    id: 6,
    name: 'MongoDB',
    logo: '/technologies/mongodb.svg',
  },
  {
    id: 7,
    name: 'PostgreSQL',
    logo: '/technologies/postgresql.svg',
  },
  {
    id: 8,
    name: 'Docker',
    logo: '/technologies/docker.svg',
  },
];

export default function Technologies() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % technologies.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [autoplay]);

  const prev = () => {
    setIndex(prev => (prev === 0 ? technologies.length - 1 : prev - 1));
    setAutoplay(false);
  };

  const next = () => {
    setIndex(prev => (prev + 1) % technologies.length);
    setAutoplay(false);
  };

  const clickDot = (n: number) => {
    setIndex(n);
    setAutoplay(false);
  };

  return (
    <section id="technologies" className="technologies">
      <div className="technologies-container">
        <h2>MES TECHNOLOGIES</h2>

        <div className="slider-wrapper">
          <button className="slider-arrow prev" onClick={prev}>←</button>

          <div className="slider-container">
            <div className="tech-card">
              <div className="tech-logo">
                <Image
                  src={technologies[index].logo}
                  alt={technologies[index].name}
                  width={150}
                  height={150}
                  priority
                />
              </div>
              <h3>{technologies[index].name}</h3>
            </div>
          </div>

          <button className="slider-arrow next" onClick={next}>→</button>
        </div>

        <div className="slider-indicators">
          {technologies.map((_, i) => (
            <button
              key={i}
              className={`indicator ${i === index ? 'active' : ''}`}
              onClick={() => clickDot(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
