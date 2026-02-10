"use client";

import { Suspense } from "react";
import Nav from "./Nav";
import "@/styles/Header.scss";

export default function Header() {
  return (
    <header>
      {/* Navigation Bar */}
      <div className="nav-border">
        <Suspense>
          <Nav />
        </Suspense>
      </div>

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
  );
}
