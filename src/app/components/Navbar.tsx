"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItem = { label: string; targetId: string };

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: "Home", targetId: "Hero" },
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
    if (pathname !== "/") {
      if (targetId === "projects") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(`/#${targetId}`);
      }
    } else {
      scrollToSection(targetId);
    }
    setIsMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full h-auto border-b border-neutral-200/60 bg-white/85 backdrop-blur-md transition-all duration-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <div>
          <Link href="/">
            <button className="flex gap-3 sm:gap-6 md:gap-10 items-center cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200" >
              <img className="size-12 sm:size-16 rounded-full border border-neutral-200/60 shadow-sm" src="/NorexLogo.jpg" alt="Norex" />
              <img className="size-12 sm:size-16 drop-shadow-md drop-shadow-amber-300 object-contain" src="/UdaipurEditz.png" alt="udaipureditz" />
            </button>
          </Link>
        </div>

        {/* Desktop nav (large devices) */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item.targetId)}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 font-mono font-bold transition-colors duration-250 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-neutral-900 after:transition-all after:duration-300"
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
          className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-600 hover:text-black hover:bg-neutral-100/60 active:scale-95 transition-all md:hidden cursor-pointer border border-transparent hover:border-neutral-200"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile nav panel (absolute overlay) */}
      <div
        id="mobile-nav"
        className={`${isMobileOpen ? "block" : "hidden"
          } md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg transition-all duration-200`}
      >
        <div className="space-y-1.5 px-4 pb-6 pt-3 bg-transparent">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item.targetId)}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-mono font-bold uppercase tracking-wider text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

