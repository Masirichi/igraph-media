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
              {/* Facebook */}
              <a href="https://facebook.com/igraphmedia" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Pinterest */}
              <a href="https://pinterest.com/igraphmedia" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/igraph_media" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#B70909] transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
