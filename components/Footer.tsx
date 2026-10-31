import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Tag: Company Name */}
        <div className="flex justify-start md:justify-end mb-8">
          <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-wider text-white">
            IGRAPH MEDIA LTD
          </span>
        </div>

        {/* Main 3-Column Core Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-10">
          {/* Column 1: COMPANY (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-5">
              COMPANY
            </div>
            <nav className="flex flex-col gap-3 font-sans text-sm font-semibold uppercase tracking-wide">
              <a href="#about" className="inline-flex items-center gap-2 hover:text-[#B70909] transition-colors group">
                <span className="text-white group-hover:text-[#B70909] transition-colors">&#x2197;</span>
                <span>ABOUT US</span>
              </a>
              <a href="#services" className="inline-flex items-center gap-2 hover:text-[#B70909] transition-colors group">
                <span className="text-white group-hover:text-[#B70909] transition-colors">&#x2197;</span>
                <span>OUR SERVICES</span>
              </a>
              <a href="#works" className="inline-flex items-center gap-2 hover:text-[#B70909] transition-colors group">
                <span className="text-white group-hover:text-[#B70909] transition-colors">&#x2197;</span>
                <span>PROVEN RESULTS</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 hover:text-[#B70909] transition-colors group">
                <span className="text-white group-hover:text-[#B70909] transition-colors">&#x2197;</span>
                <span>CONTACT US</span>
              </a>
            </nav>
          </div>

          {/* Column 2: REACH OUT TO US (6 cols) */}
          <div className="md:col-span-6 flex flex-col items-start md:items-center text-left md:text-center order-first md:order-none">
            <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-4">
              REACH OUT TO US
            </div>
            <div className="flex flex-col items-start md:items-center gap-2 mb-7">
              <a
                href="tel:+2348153253639"
                className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-white hover:text-[#B70909] transition-colors tracking-tight"
              >
                (+234) 815 325 3639
              </a>
              <a
                href="mailto:advisory@igraphmedia.com"
                className="font-sans text-xl sm:text-2xl md:text-3xl font-semibold text-white hover:text-[#B70909] transition-colors tracking-tight"
              >
                advisory@igraphmedia.com
              </a>
            </div>
            <div className="flex justify-start md:justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/40 text-sm font-medium text-white hover:bg-white hover:text-black transition-all hover:-translate-y-0.5"
              >
                <span>Let&apos;s Connect</span>
                <span>&#x2197;</span>
              </a>
            </div>
          </div>

          {/* Column 3: SOCIAL (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end">
            <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-5">
              SOCIAL
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-5">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.07A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 9.29 5.56 6.31 6.31 0 0 0 3.38-5.56V8.6a8.27 8.27 0 0 0 4.79 1.52v-3.43a4.85 4.85 0 0 1-.87 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-start">
          <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-neutral-500">
            &copy; 2026 ALL RIGHTS RESERVED, IGRAPH MEDIA LTD
          </span>
        </div>
      </div>
    </footer>
  );
}
