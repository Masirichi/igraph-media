"use client";

import React from "react";
import IgraphBentoGrid from "./IgraphBentoGrid";

export default function WhyChooseUs() {
  return (
    <section id="benefits" className="py-24 bg-black text-white border-b border-white/[0.08] relative">
      <div id="why-choose-us" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            Why choose <span className="italic font-light text-slate-300">Igraph Media</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Built for everyday business owners and growing companies that want predictable sales, professional brand authority, and reliable ongoing support.
          </p>
        </div>

        <IgraphBentoGrid />
      </div>
    </section>
  );
}
