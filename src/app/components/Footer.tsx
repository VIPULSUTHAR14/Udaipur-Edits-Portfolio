"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Copy, Check, Mail, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const [hasCopied, sethasCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handlecopy = () => {
    navigator.clipboard.writeText("udaipureditz@outlook.com");
    sethasCopied(true);
    setTimeout(() => {
      sethasCopied(false);
    }, 2000);
  };

  const navItems = [
    { label: "Home", targetId: "Hero" },
    { label: "Projects", targetId: "projects" },
    { label: "Contact", targetId: "contact" },
  ];

  const handleNavClick = (targetId: string) => {
    if (pathname !== "/") {
      if (targetId === "projects") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(`/#${targetId}`);
      }
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const header = document.querySelector("header") as HTMLElement | null;
        const headerHeight = header?.offsetHeight ?? 0;
        const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
        const top = Math.max(elementTop - headerHeight - 8, 0);
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full bg-[#fafafa] border-t border-neutral-200 text-neutral-800 font-mono">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200">

          {/* Brand & Co-branding section */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img
                src="/NorexLogo.jpg"
                className="w-12 h-12 rounded-full border border-neutral-200 shadow-sm"
                alt="Norex Logo"
              />
              <span className="text-2xl font-bold font-sans text-neutral-900 tracking-wide">
                Norex
              </span>
            </div>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed max-w-xs">
              Elevating narrative through precision-driven cinematic craft. Where every frame finds its purpose.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-neutral-400 font-sans">Powered by</span>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-sm">
                <img
                  src="/UdaipurEditz.png"
                  alt="Udaipur Edits Logo"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-xs font-semibold text-neutral-700 font-sans">
                  UdaipurEditz
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.targetId)}
                    className="text-neutral-600 hover:text-neutral-950 transition-colors duration-200 cursor-pointer text-left font-sans font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Formats list */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Formats
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-600 font-sans font-medium">
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>🎬</span> Social Media Reels
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>▶️</span> YouTube Long-form
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>🏢</span> Corporate & Ads
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>🏠</span> Real Estate Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("projects")}
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>✈️</span> Travel & Lifestyle
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Contact Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Connect
            </h4>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed mb-1">
              {"Have a creative vision or inquiry? Let's collaborate."}
            </p>

            {/* Copy Email Button container */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handlecopy}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 active:bg-black transition-all border border-neutral-800 shadow-sm cursor-pointer group"
                aria-label="Copy email address"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-xs text-neutral-200 select-all truncate font-sans">
                    udaipureditz@outlook.com
                  </span>
                </div>
                <div className="flex items-center shrink-0">
                  {hasCopied ? (
                    <Check className="w-4 h-4 text-green-400 animate-bounce" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  )}
                </div>
              </button>

              {/* Copied indicator toast-like notification */}
              {hasCopied && (
                <span className="text-[10px] text-green-600 font-sans font-bold self-end animate-pulse">
                  ✓ Copied email to clipboard!
                </span>
              )}
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.instagram.com/udaipur.editz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-neutral-200 hover:border-pink-500 hover:bg-pink-50/20 hover:text-pink-650 text-neutral-600 transition-all duration-200 cursor-pointer"
                title="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@udaipureditz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-neutral-200 hover:border-red-500 hover:bg-red-50/20 hover:text-red-600 text-neutral-600 transition-all duration-200 cursor-pointer"
                title="Subscribe on YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom row (Copyright & Credit) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-neutral-500 font-sans">
          <p>© {new Date().getFullYear()} Norex. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Built by{" "}
            <a
              href="https://www.instagram.com/udaipur.editz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-800 hover:text-neutral-950 hover:underline transition-colors"
            >
              Udaipur Edits
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
