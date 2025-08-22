"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; targetId: string };

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: "Home", targetId: "Hero" },
    { label: "About", targetId: "Hero" },
    { label: "Projects", targetId: "projects" },
    { label: "Contact", targetId: "contact" },
  ];

  function scrollToSection(targetId: string) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const header = document.querySelector("header") as HTMLElement | null;
    const headerHeight = header?.offsetHeight ?? 0;
    const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
    const top = Math.max(elementTop - headerHeight - 8, 0);

    window.scrollTo({ top, behavior: "smooth" });
  }

  function handleClick(targetId: string) {
    scrollToSection(targetId);
    setIsMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-l from-black via-gray-900 to-black backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleClick("Hero")}
          className="text-2xl bg-clip-text text-transparent bg-gradient-to-l from-red-700 to-cyan-700 font-semibold tracking-tight font-mono"
        >
          Udaipur Editz
        </button>

        {/* Desktop nav (large devices) */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item.targetId)}
              className="text-md text-foreground/80 transition hover:text-foreground font-mono"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle (small devices) */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile nav panel */}
      <div
        id="mobile-nav"
        className={isMobileOpen ? "md:hidden" : "hidden md:hidden"}
      >
        <div className="space-y-1 border-t border-white/10 px-4 pb-4 pt-2 sm:px-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item.targetId)}
              className="block w-full rounded-md px-3 py-2 text-left text-base text-foreground/90 hover:bg-foreground/10"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

