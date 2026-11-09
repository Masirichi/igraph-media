import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import SupportAgent from './SupportAgent';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#B70909] selection:text-white font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 max-w-7xl mx-auto text-center pt-12 pb-16">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#B70909]/20 to-transparent blur-3xl -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" />
            Who We Are &bull; Independent Brand Advisory
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            About <span className="italic font-serif font-normal">Igraph Media</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium text-neutral-200 max-w-3xl mx-auto mb-6">
            Establishing Enduring Brand Authority
          </p>

          <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
            At Igraph Media, we understand that every ambitious business possesses a story powerful enough to challenge industry leaders. We give growing brands the voice, authority, and presence required to be heard clearly in a noisy marketplace.
          </p>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-8">
            <div>
              <div className="text-3xl font-extrabold text-white">50+</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Brands and Counting</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">5M+</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Organic Impressions</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">8</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Specialized Disciplines</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">3x</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">Average Engagement Gain</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#B70909] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#cf1111] transition-all hover:-translate-y-0.5"
            >
              Get Started &rarr;
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Explore Services
            </a>
          </div>
        </section>

        {/* Philosophy & Origin */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-[#B70909] uppercase tracking-wider block">
                Our Strategic Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Own Your Narrative, <span className="italic font-serif font-normal">Outmaneuver Competitors</span>
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                Most businesses struggle not because their products lack quality, but because their message gets drowned out in a crowded digital landscape. Traditional agencies often focus on vanity metrics that look impressive on reports but fail to generate real revenue or lasting market authority.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Igraph Media was established as an independent strategic advisory to bridge this gap. We combine high-level editorial public relations with analytical, data-driven advertising. We focus on clear facts, persuasive positioning, and consistent execution to help you earn customer trust, challenge incumbents, and build lasting market leadership.
              </p>

              <div className="space-y-3 pt-4">
                <div className="p-4 bg-neutral-900 border-l-2 border-[#B70909] rounded-r-lg">
                  <h3 className="text-sm font-bold text-white">1. Strategic Clarity Over Noise</h3>
                  <p className="text-xs text-neutral-400 mt-1">We strip away agency jargon to define your distinct competitive advantage and communicate it directly to decision-makers.</p>
                </div>
                <div className="p-4 bg-neutral-900 border-l-2 border-[#B70909] rounded-r-lg">
                  <h3 className="text-sm font-bold text-white">2. Editorial &amp; Media Credibility</h3>
                  <p className="text-xs text-neutral-400 mt-1">Through targeted press release distribution and executive profiling, we secure visibility in top-tier publications that builds authentic trust.</p>
                </div>
                <div className="p-4 bg-neutral-900 border-l-2 border-[#B70909] rounded-r-lg">
                  <h3 className="text-sm font-bold text-white">3. Direct Commercial Alignment</h3>
                  <p className="text-xs text-neutral-400 mt-1">Every ad campaign, SEO effort, and content asset is engineered to deliver qualified customer inquiries and commercial growth.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[480px]">
              <img
                src="assets/team-collaboration.jpg"
                alt="Igraph Media Strategic Collective"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                <span className="inline-block px-3 py-1 bg-[#B70909] rounded-full text-[10px] font-bold tracking-widest uppercase text-white mb-3 w-fit">
                  Independent Advisory
                </span>
                <blockquote className="text-lg font-semibold text-white mb-2">
                  "We do not just build awareness—we engineer enduring authority."
                </blockquote>
                <div className="text-xs text-neutral-400">
                  Igraph Media Executive Advisory Collective
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Values */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto py-16 border-t border-white/10 bg-neutral-950/60 rounded-3xl my-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-[#B70909] uppercase tracking-wider block mb-2">
              How We Operate
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Core <span className="italic font-serif font-normal">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl hover:border-[#B70909]/40 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">Strategic Precision</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We never rely on guesswork. Every campaign, press release, and advertising budget is backed by data, competitor analysis, and audience research to maximize real business impact.
              </p>
            </div>
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl hover:border-[#B70909]/40 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">Editorial Rigor</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We produce content to journalism-grade standards. Our narratives command respect in top publications, elevate executive stature, and turn buyer curiosity into trust.
              </p>
            </div>
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl hover:border-[#B70909]/40 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">Radical Transparency</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                You always retain direct access to your analytics and advertising accounts. We share real metrics, clear outcomes, and practical optimizations with zero smoke and mirrors.
              </p>
            </div>
            <div className="p-8 bg-neutral-900 border border-white/10 rounded-2xl hover:border-[#B70909]/40 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">Dedicated Partnership</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We operate as a true extension of your leadership team. When you engage Igraph Media, senior partners actively guide your strategy and ensure consistent execution from day one.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SupportAgent />
    </div>
  );
}
