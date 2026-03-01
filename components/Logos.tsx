"use client";

import Image from "next/image";
import "@/styles/Logos.scss";

interface Logo {
  id: number;
  name: string;
  image: string;
}

const logos: Logo[] = [
  {
    id: 1,
    name: "HTML",
    image: "/logos/HTML.png",
  },
  {
    id: 2,
    name: "CSS",
    image: "/logos/CSS.png",
  },
  {
    id: 3,
    name: "Javascript",
    image: "/logos/Javascript.png",
  },
  {
    id: 4,
    name: "PHP",
    image: "/logos/PHP.png",
  },
  {
    id: 5,
    name: "Vue",
    image: "/logos/Vue.png",
  },
  {
    id: 6,
    name: "Nuxt",
    image: "/logos/Nuxt.png",
  },
  {
    id: 7,
    name: "Wordpress",
    image: "/logos/Wordpress.png",
  },
  {
    id: 8,
    name: "MySQL",
    image: "/logos/MySQL.png",
  },
  {
    id: 9,
    name: "Typescript",
    image: "/logos/Typescript.png",
  },
  {
    id: 10,
    name: "Sass",
    image: "/logos/Sass.png",
  },
  {
    id: 11,
    name: "Tailwind",
    image: "/logos/Tailwind.png",
  },
  {
    id: 12,
    name: "Python",
    image: "/logos/Python.png",
  },
  {
    id: 13,
    name: "Git",
    image: "/logos/Git.png",
  },
];

const doubledLogos = [...logos, ...logos];

export default function Logos() {
  return (
    <section id="logos" className="logos">
      <div className="logos-container">
        <div className="logos-carousel">
          <div className="carousel-track">
            {doubledLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="carousel-item">
                <div className="logo-wrapper">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    width={80}
                    height={80}
                    priority={index < logos.length}
                  />
                </div>
                <p className="logo-name">{logo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
