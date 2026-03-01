"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/Nav.scss";

export default function Nav({ showTitle = false }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "#", label: "ACCUEIL" },
    { href: "#about", label: "À PROPOS" },
    { href: "#projects", label: "PROJET" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav>
      <div className={`nav-title ${showTitle ? "show" : "hide"}`}>JULIEN CLAVIER</div>
      <div className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
