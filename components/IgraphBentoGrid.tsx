"use client";

import React, { useState, useEffect } from 'react';

// Platform icons dataset
const platformIcons = [
  {
    name: 'Google',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
    ),
  },
  {
    name: 'Meta',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0081FB">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46V10.9M7.85 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
      </svg>
    ),
  },
  {
    name: 'X',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#000000">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Snapchat',
    bgColor: 'bg-[#FFFC00]',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
        <path d="M12.016 2.002c-3.627 0-6.174 2.656-6.174 5.922 0 1.25.39 2.454.767 3.25.132.278.07.41-.125.563-.445.344-1.28.84-2.094 1.484-.367.289-.437.602-.18.969.32.46 1.03.875 1.953 1.07.18.04.289.172.266.36-.086.71-.352 1.976-.64 2.53-.141.274-.016.516.328.461.945-.148 2.305-.75 3.422-1.328.297-.156.555-.07.828.094.758.453 1.688.703 2.672.703.969 0 1.883-.242 2.633-.68.281-.164.539-.25.844-.094 1.102.57 2.445 1.164 3.398 1.312.344.055.469-.187.328-.46-.289-.555-.555-1.82-.64-2.531-.024-.188.086-.32.265-.36.922-.195 1.633-.61 1.953-1.07.258-.367.188-.68-.18-.969-.812-.64-1.648-1.14-2.093-1.484-.196-.156-.258-.289-.125-.562.375-.797.765-2 .765-3.25 0-3.266-2.547-5.922-6.172-5.922z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    bgColor: 'bg-white',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
        <path d="M12.525.02c1.31 0 2.6.45 3.65 1.3 1.04.85 1.74 2.03 1.97 3.37.74-.05 1.48-.05 2.22 0v3.6c-1.32-.01-2.61-.41-3.69-1.15v7.65c0 1.96-.78 3.84-2.16 5.23a7.35 7.35 0 0 1-5.2 2.18c-1.95 0-3.83-.78-5.22-2.18A7.4 7.4 0 0 1 1.9 14.8c0-1.96.79-3.84 2.19-5.23 1.38-1.39 3.26-2.18 5.22-2.18.42 0 .84.04 1.25.11V11.2a3.7 3.7 0 0 0-1.25-.22 3.69 3.69 0 0 0-2.62 1.08 3.7 3.7 0 0 0-1.09 2.63c0 1 .39 1.95 1.09 2.64a3.7 3.7 0 0 0 2.62 1.09c1 0 1.96-.39 2.65-1.09.7-.69 1.09-1.64 1.09-2.64V.02h2.47z" />
      </svg>
    ),
  },
];

// Client badge list
const clientBrands = [
  'City Fidelity',
  'TFZ Cakes & Academy',
  'Cocu Atelier',
  'Creator Linda',
  'DandyAyanfe',
  'Arie & Arin',
  'Hexaves',
  'Perfection Beauty Home',
  'Gidavest',
  'Techregard',
  'Moderncrux',
  'Unifera',
  'Right Way Plumbing Services',
];

export const IgraphBentoGrid: React.FC = () => {
  const [count, setCount] = useState(0);

  // Counter animation for impressions
  useEffect(() => {
    let start = 0;
    const end = 500;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / (end / 10)));

    const timer = setInterval(() => {
      start += 5;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* TOP LEFT CARD: Platforms Card */}
        <div className="lg:col-span-7 bg-[#212423] rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 border border-white/5 transition-all duration-300 hover:border-white/10">
          <div className="flex-1 text-left">
            <h3 className="text-white text-2xl sm:text-[26px] font-semibold tracking-tight leading-snug">
              Perfectly Formatted for Every Platform
            </h3>
            <p className="mt-4 text-[#9ea3a0] text-sm sm:text-base leading-relaxed">
              Every campaign is engineered and optimized for Google, Meta, LinkedIn, X, Snapchat, TikTok, and YouTube to ensure maximum visibility and business growth.
            </p>
          </div>

          {/* 2x4 App Icons Grid */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {platformIcons.map((platform) => (
              <div
                key={platform.name}
                className={`w-14 h-14 ${platform.bgColor} rounded-2xl flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer`}
                title={platform.name}
              >
                {platform.svg}
              </div>
            ))}
          </div>
        </div>

        {/* TOP RIGHT CARD: Social Proof & Client Tags */}
        <div className="lg:col-span-5 bg-[#212423] rounded-[28px] p-8 sm:p-10 flex flex-col justify-between border border-white/5 transition-all duration-300 hover:border-white/10">
          <div>
            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-[#d8dad9] text-base tracking-wider mb-4">
              ★★★★★
            </div>

            <h3 className="text-white text-2xl font-semibold tracking-tight leading-snug">
              Trusted by Over 50+<br />Brands and Counting
            </h3>

            <p className="mt-4 text-[#9ea3a0] text-sm leading-relaxed">
              From rising startups to established brands, we've helped over 50+ brands and counting scale their commercial presence, attract loyal customers, and build lasting authority.
            </p>
          </div>

          {/* Client Pills Container */}
          <div className="flex flex-wrap gap-2 pt-6">
            {clientBrands.map((brand) => (
              <span
                key={brand}
                className="text-xs text-[#a0a5a2] bg-[#2d312f] hover:bg-[#383d3b] hover:text-white px-3.5 py-1.5 rounded-full border border-white/5 transition-colors duration-150 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM LEFT CARD: Total Impressions Counter */}
        <div className="lg:col-span-4 bg-[#212423] rounded-[28px] p-8 flex flex-col items-center justify-center text-center border border-white/5 min-h-[220px] transition-all duration-300 hover:border-white/10">
          <div className="text-white text-5xl font-bold tracking-tight flex items-baseline">
            <span>{count}</span>
            <span className="text-[#a0a5a2] font-semibold text-3xl ml-1">M+</span>
          </div>
          <p className="mt-3 text-sm text-[#9ea3a0] font-medium">
            Total Multi-Channel Campaign Impressions
          </p>
        </div>

        {/* BOTTOM RIGHT CARD: Workspace Image & Commercial Leadership Copy */}
        <div className="lg:col-span-8 bg-[#212423] rounded-[28px] overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/5 transition-all duration-300 hover:border-white/10">
          {/* Workspace Image Pane */}
          <div className="relative h-64 md:h-auto min-h-[220px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
              alt="iGraph Media Collaboration"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>

          {/* Text Pane */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <p className="text-white text-lg sm:text-xl font-medium leading-relaxed">
              We collaborate closely with your leadership to architect, launch, and scale high-impact commercial campaigns.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IgraphBentoGrid;
