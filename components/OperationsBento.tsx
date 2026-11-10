"use client";

import React from "react";
import { motion } from "framer-motion";
import BrandIdentityCard from "./ServiceCard";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    category: "Core Architecture // 01",
    title: "Web Design and Development",
    description:
      "We craft high-performance, conversion-engineered digital experiences tailored to elevate institutional brand stature. From bespoke design systems to lightning-fast no-code and modern code architectures, we build scalable platforms that turn visitors into enduring clients.",
    image: "/assets/service-web-dev.jpg",
    tags: [
      "Responsive",
      "Optimization",
      "CMS Setup",
      "Domain Setup",
      "Animation & Interaction",
      "SEO Optimized",
    ],
  },
  {
    id: "seo-geo",
    category: "Search Intelligence // 02",
    title: "SEO & GEO",
    description:
      "Command organic dominance across traditional search engines and emergent AI retrieval engines like Gemini, ChatGPT, and Perplexity. We engineer algorithmic relevance, knowledge graph entities, and high-authority citations that guarantee your brand is indexed and recommended as the definitive answer.",
    image: "/assets/service-seo-geo.jpg",
    tags: [
      "Generative Engine (GEO)",
      "Knowledge Graph Authority",
      "Technical SEO Auditing",
      "AI Citation Modeling",
      "Core Web Vitals Speed",
      "High-Intent Keyword Capture",
    ],
  },
  {
    id: "social-media",
    category: "Narrative Distribution // 03",
    title: "Social Media Management",
    description:
      "Cultivate an authoritative, active executive voice across LinkedIn, X (Twitter), Instagram, and executive channels. We manage end-to-end creative production, community engagement protocols, and thought leadership positioning that builds enduring stakeholder trust and compounding cultural relevance.",
    image: "/assets/service-social-media.jpg",
    tags: [
      "Executive Stature",
      "Creative Direction",
      "Community Protocols",
      "Content Sprints",
      "Brand Tone of Voice",
      "Engagement Velocity",
    ],
  },
  {
    id: "advertising",
    category: "Capital Velocity // 04",
    title: "Digital Advertising",
    description:
      "Deploy algorithmic, margin-disciplined capital across Meta, Google Search, YouTube, and programmatic ad exchanges. Every dollar deployed is tracked against incremental revenue attribution thresholds, eliminating media waste and ensuring predictable customer acquisition velocity.",
    image: "/assets/service-advertising.jpg",
    tags: [
      "Paid Acquisition",
      "Media Arbitrage",
      "Predictive LTV Modeling",
      "Creative A/B Sprints",
      "Revenue Attribution",
      "Funnel Scaling",
    ],
  },
  {
    id: "pr",
    category: "Reputational Stature // 05",
    title: "Public Relations",
    description:
      "Secure high-visibility earned editorial placements across Tier-1 financial, business, and industry publications. We architect strategic executive stature, orchestrate major announcement syndications, and maintain crisis defense protocols to protect institutional enterprise valuation.",
    image: "/assets/service-pr.jpg",
    tags: [
      "Tier-1 Placements",
      "Executive Op-Eds",
      "Press Syndication",
      "Crisis Mitigation",
      "Investor Perception",
      "Keynote Placement",
    ],
  },
];

/**
 * Reusable Feature Tag Component
 * Meets prompt specs:
 * bg-gray-100, rounded-full, px-3 py-1.5, flex items-center gap-2, text-sm text-gray-800
 * Inline SVG of solid circle with checkmark inside (#f97316) on the left
 */
function FeatureTag({ label }: { label: string }) {
  return (
    <span className="bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2 text-xs md:text-sm text-gray-800 font-medium transition-colors hover:bg-gray-200 select-none">
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="8" fill="#f97316" />
        <path
          d="M4.5 8.2L6.8 10.5L11.5 5.5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </span>
  );
}

/**
 * Two-Column Service Feature Card
 * Meets prompt specs:
 * Main Container: white background, rounded-2xl, p-6 or p-8, grid-cols-1 md:grid-cols-2 gap-8
 * Left Column: object-cover image filling container with rounded-xl
 * Right Column: flex-col gap-4, h3 in text-3xl font-semibold text-gray-900, p in text-gray-600 leading-relaxed, flex flex-wrap gap-3
 */
function ServiceFeatureCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: LUXURY_EASE }}
      className="bg-white rounded-2xl py-8 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl border border-white/20 overflow-hidden group hover:shadow-2xl transition-all duration-300"
    >
      {/* Left Column: Media Visual Anchor */}
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-full min-h-[280px] md:min-h-[360px] rounded-xl overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Right Column: Typography Block */}
      <div className="flex flex-col gap-4 justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold">
          {service.category}
        </span>

        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
          {service.title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-normal">
          {service.description}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-2">
          {service.tags.map((tag) => (
            <FeatureTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function OperationsBento() {
  return (
    <section id="services" className="py-20 px-10 bg-black text-white border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono tracking-[0.2em] uppercase text-[#808080] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Services Offered
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-[-0.03em] mb-4">
            We help brands show up with <span className="italic font-light text-slate-300">clarity, confidence,</span> and operations that actually work.
          </h2>
          <p className="text-[#808080] font-sans font-normal text-base md:text-lg leading-relaxed">
            Five core operational disciplines engineered to replace fragile dependencies with permanent, compounding market advantage.
          </p>
        </div>

        {/* Stack of 5 Animated 2-Column Feature Cards */}
        <div className="flex flex-col gap-8 md:gap-10">
          {servicesData.map((service, index) => (
            <ServiceFeatureCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Brand Identity Interactive Showcase Card */}
        <div className="mt-14 flex justify-center">
          <BrandIdentityCard />
        </div>
      </div>
    </section>
  );
}
