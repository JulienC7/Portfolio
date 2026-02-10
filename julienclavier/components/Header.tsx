"use client";

import { Suspense, useState, useEffect } from "react";
import Nav from "./Nav";
import "@/styles/Header.scss";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show title when scrolled past the hero section
      if (window.scrollY > window.innerHeight * 0.6) {
        setShowTitle(true);
        setIsScrolled(true);
      } else {
        setShowTitle(false);
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar - Sticky */}
      <div className={`nav-border ${isScrolled ? "scrolled" : ""}`}>
        <Suspense>
          <Nav showTitle={showTitle} />
        </Suspense>
      </div>

      {/* Header */}
      <header>
        {/* Hero Section */}
        <div className="hero-section">
          {/* Portfolio Link */}
          <h2>PORTFOLIO</h2>

          {/* Main Title */}
          <h1>JULIEN CLAVIER</h1>

          {/* Subtitle */}
          <div className="subtitle">
            <p>BIENVENUE.</p>
            <p>EXPLORONS MON TRAVAIL ENSEMBLE.</p>
          </div>

          {/* Scroll Down Arrow */}
          <div className="scroll-arrow">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
}
