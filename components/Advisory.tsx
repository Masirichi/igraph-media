"use client";

import React from "react";

export default function Advisory() {
  const testimonials = [
    {
      badge: "21K Organic • 5M+ Traffic",
      quote:
        "Igraph Media grew our social media presence to 21k within 3 months organically, amassing over 5 million organic traffic impressions and establishing our luxury atelier as an undisputed category leader.",
      author: "Katrin K.",
      role: "Creative Director, Cocu Atelier",
      initials: "KK",
    },
    {
      badge: "Qualified Academy Leads",
      quote:
        "Igraph Media helped us generate high-intent qualified leads for our training programs. Their acquisition funnels consistently fill our culinary cohorts with passionate, paying students.",
      author: "Tobarin .O",
      role: "Founder, TFZ Cakes and Academy",
      initials: "TO",
    },
    {
      badge: "3x Instagram Engagement",
      quote:
        "Managing executive brand portfolios requires absolute media precision. Igraph Media revamped our entire social media strategy and tripled our engagements on Instagram across every campaign.",
      author: "Executive Operations",
      role: "City Fidelity",
      initials: "90",
    },
    {
      badge: "Client Content Strategy",
      quote:
        "We collaborated with Igraph Media to design custom content strategies for our clients' business success. Their strategic rigor and execution power delivered outstanding commercial growth.",
      author: "Linda",
      role: "Founder & Strategist, Creator Linda",
      initials: "CL",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-black text-white border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            We love what we do, and <span className="italic font-light text-slate-300">they love the results.</span>
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Authentic feedback from business leaders and founders whose commercial velocity and media reach we accelerate.
          </p>
        </div>
      </div>

      {/* Continuous Moving Testimonials Carousel / Infinite Slider */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]">
        <div className="flex w-max animate-[testimonialMarqueeScroll_38s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Track Group 1 */}
          <div className="flex gap-6 pr-6">
            {testimonials.map((t, idx) => (
              <div
                key={`t1-${idx}`}
                className="w-[380px] min-w-[380px] max-w-[380px] bg-white text-neutral-900 rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-black/[0.08] transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono font-bold tracking-wider text-[#B70909] uppercase mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
                    {t.badge}
                  </div>
                  <blockquote className="text-sm font-medium text-neutral-800 leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-bold text-neutral-900">{t.author}</div>
                    <div className="font-mono text-[11px] text-neutral-600">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track Group 2 (Duplicate for Infinite Loop) */}
          <div className="flex gap-6 pr-6" aria-hidden="true">
            {testimonials.map((t, idx) => (
              <div
                key={`t2-${idx}`}
                className="w-[380px] min-w-[380px] max-w-[380px] bg-white text-neutral-900 rounded-2xl p-8 flex flex-col justify-between shadow-xl border border-black/[0.08] transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono font-bold tracking-wider text-[#B70909] uppercase mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
                    {t.badge}
                  </div>
                  <blockquote className="text-sm font-medium text-neutral-800 leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-bold text-neutral-900">{t.author}</div>
                    <div className="font-mono text-[11px] text-neutral-600">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
