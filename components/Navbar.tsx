"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${
          scrolled
            ? "bg-black/95 border-b border-white/[0.14] backdrop-blur-md shadow-2xl"
            : "bg-black/85 border-b border-white/[0.08] backdrop-blur-md"
        }`}
      >
        {/* Top Info Bar */}
        <div className="h-9 border-b border-white/[0.06] bg-[#040404] text-[11px] font-mono tracking-wider text-[#808080] flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B70909] shadow-[0_0_8px_#B70909] animate-pulse" />
              <span>Independent Media &amp; Brand Advisory</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs text-[#808080]">
              <a href="tel:+2348153253639" className="hover:text-white transition-colors">
                +234 (815) 325-3639
              </a>
              <span className="opacity-40">&bull;</span>
              <a href="mailto:advisory@igraphmedia.com" className="hover:text-white transition-colors">
                advisory@igraphmedia.com
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Navigation Bar (Left: Logo, Center: Centered Pill Menu, Right: CTA) */}
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-[68px] grid grid-cols-2 md:grid-cols-3 items-center">
          {/* 1. Left: Brand Logo */}
          <div className="flex items-center justify-start">
            <a href="#home" className="flex items-center group" aria-label="Igraph Media Home">
              <img
                src="/assets/logo-white.png"
                alt="Igraph Media"
                className="h-7 md:h-8 w-auto object-contain transition-opacity group-hover:opacity-85"
              />
            </a>
          </div>

          {/* 2. Center: Centered Nav Menu Pill (LineaDS Style) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
              <a
                href="#home"
                className="px-3.5 py-1 text-xs font-medium text-white hover:text-white rounded-full bg-white/[0.08] transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                className="px-3.5 py-1 text-xs font-medium text-[#808080] hover:text-white hover:bg-white/[0.05] rounded-full transition-colors"
              >
                Services
              </a>
              <a
                href="#about"
                className="px-3.5 py-1 text-xs font-medium text-[#808080] hover:text-white hover:bg-white/[0.05] rounded-full transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="px-3.5 py-1 text-xs font-medium text-[#808080] hover:text-white hover:bg-white/[0.05] rounded-full transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* 3. Right: Mobile Hamburger (Explore button removed as requested) */}
          <div className="flex items-center justify-end gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <div className="w-6 flex flex-col gap-1.5 items-end">
                <span className={`block h-[2px] bg-white transition-all duration-200 ${mobileOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                <span className={`block h-[2px] bg-white transition-all duration-200 ${mobileOpen ? "opacity-0" : "w-4"}`} />
                <span className={`block h-[2px] bg-white transition-all duration-200 ${mobileOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[104px] bg-black/98 z-40 p-6 flex flex-col justify-between md:hidden border-b border-white/[0.08]">
          <div className="flex flex-col gap-5 pt-4">
            <a
              href="#home"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-semibold text-white border-b border-white/[0.08] pb-3"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-semibold text-white border-b border-white/[0.08] pb-3"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-semibold text-white border-b border-white/[0.08] pb-3"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="text-xl font-semibold text-white border-b border-white/[0.08] pb-3"
            >
              Contact us
            </a>
          </div>

          <div className="pt-6 border-t border-white/[0.08] font-mono text-xs text-[#808080]">
            <div>Independent Brand Advisory</div>
            <a href="tel:+2348153253639" className="text-white block mt-1">
              +234 (815) 325-3639
            </a>
            <a href="mailto:advisory@igraphmedia.com" className="text-white block mt-0.5">
              advisory@igraphmedia.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
