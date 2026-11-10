import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SupportAgent from "./SupportAgent";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "press-release",
    number: "SERVICE 01",
    title: "Press Release Distribution",
    category: "Public Relations",
    description:
      "Craft compelling narratives and ensure they reach the right audience with our professional press release distribution services. Our media relations experts will secure coverage in top-tier publications, elevating your brand visibility.",
    deliverables: [
      "Editorial press release drafting and narrative pitch development",
      "Direct syndication to verified Tier-1 financial, lifestyle & tech media",
      "Comprehensive media coverage clipping and visibility analytics report",
    ],
    ctaLabel: "Request PR Coverage",
  },
  {
    id: "social-media",
    number: "SERVICE 02",
    title: "Social Media Management",
    category: "Community & Growth",
    description:
      "Build a strong online presence and foster meaningful connections with your audience. Our social media wizards will manage your profiles, create engaging content, and implement strategic campaigns to boost engagement and drive leads.",
    deliverables: [
      "Daily profile management, aesthetic curation & community nurturing",
      "Proven engagement frameworks (e.g. Cocu Atelier 21k growth, 90's Management 3x engagement)",
      "Monthly content calendars, video reel scripting & inbound lead routing",
    ],
    ctaLabel: "Scale Your Presence",
  },
  {
    id: "personal-branding",
    number: "SERVICE 03",
    title: "Personal Branding & Profiling",
    category: "Executive Stature",
    description:
      "Establish yourself as an industry authority with our personal branding solutions. We'll help you create a cohesive, compelling personal brand across all digital touchpoints, from media kits to optimized social profiles.",
    deliverables: [
      "Executive biographical profiling, press media kit & asset package",
      "LinkedIn & X executive profile restructuring and thought leadership content",
      "Speaking engagement placement, podcast booking & industry positioning",
    ],
    ctaLabel: "Build Executive Authority",
  },
  {
    id: "media-buying",
    number: "SERVICE 04",
    title: "Media Planning & Buying",
    category: "Media Strategy",
    description:
      "Let our media planning and buying experts handle the complexities of advertising. We'll develop a strategic, data-driven media plan to maximize your budget and reach the right customers at the right time.",
    deliverables: [
      "Audience segmentation, media consumption modeling & channel mapping",
      "Direct publisher rate negotiations & premium inventory acquisition",
      "Algorithmic media arbitrage with real-time ROAS and cost-per-acquisition tracking",
    ],
    ctaLabel: "Optimize Media Budget",
  },
  {
    id: "seo",
    number: "SERVICE 05",
    title: "Search Engine Optimization",
    category: "Search Visibility",
    description:
      "Improve your online visibility and attract the right customers with our SEO expertise. We'll audit your website, create a customized optimization strategy, and implement best practices to boost your search rankings.",
    deliverables: [
      "Deep technical audit, Core Web Vitals remediation & crawl efficiency",
      "Generative Engine Optimization (GEO) for ChatGPT, Perplexity & Gemini Search",
      "High-intent commercial keyword rankings & authoritative backlink architecture",
    ],
    ctaLabel: "Dominate Search",
  },
  {
    id: "brand-promotion",
    number: "SERVICE 06",
    title: "Brand Promotion",
    category: "Brand Leadership",
    description:
      "Elevate your brand's presence and reputation through our integrated brand promotion services. From content strategy to digital advertising, we'll craft a holistic plan to amplify your message and drive engagement.",
    deliverables: [
      "Holistic cross-channel promotion campaigns aligning PR, Ads & Influencers",
      "Brand positioning frameworks engineered to challenge established competitors",
      "Multi-touchpoint promotional assets designed for maximum recall and buyer trust",
    ],
    ctaLabel: "Promote Your Brand",
  },
  {
    id: "content-strategy",
    number: "SERVICE 07",
    title: "Content Strategy",
    category: "Editorial & Media",
    description:
      "Captivate your audience with compelling, SEO-optimized content. Our content strategists will develop a tailored content plan, creating high-quality articles, videos, and visuals that resonate with your target market.",
    deliverables: [
      "Custom editorial strategy mapping customer awareness from curiosity to conversion",
      "High-converting longform articles, thought-leadership whitepapers & visual designs",
      "Video scripts, short-form viral storytelling & omnichannel content repurposing",
    ],
    ctaLabel: "Develop Content Strategy",
  },
  {
    id: "digital-advertising",
    number: "SERVICE 08",
    title: "Digital Advertising",
    category: "Paid Acquisition",
    description:
      "Reach your customers where they are with our advanced digital advertising solutions. We'll leverage data-driven targeting, creative optimization, and performance tracking to deliver measurable results and a stellar ROI.",
    deliverables: [
      "Meta (Instagram/Facebook), Google Search, YouTube, TikTok & LinkedIn Ad funnels",
      "High-converting ad creative iterations, dynamic copy & split-testing matrix",
      "First-party pixel tracking, CAPI integration & full attribution dashboard",
    ],
    ctaLabel: "Launch High-ROI Ads",
  },
];

export default function ServicesPage() {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#B70909] selection:text-white antialiased">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 max-w-7xl mx-auto text-center pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#B70909] animate-pulse" />
            <span>Comprehensive Solutions</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Our <span className="italic font-serif font-normal text-neutral-300">Services</span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-neutral-200 max-w-3xl mx-auto mb-4">
            Elevate Your Brand with Igraph Media&apos;s Comprehensive Solutions
          </p>

          <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">
            At Igraph Media, we understand that every business faces unique marketing challenges. That&apos;s why we offer a tailored suite of services designed to amplify your voice and drive tangible results.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="px-7 py-3 rounded-md bg-[#B70909] hover:bg-[#cf1111] text-white text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Get Started</span>
              <span>&rarr;</span>
            </a>
            <a
              href="tel:+2348153253639"
              className="px-7 py-3 rounded-md bg-white/5 border border-white/15 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Direct Line: +234 (815) 325-3639
            </a>
          </div>

          {/* Assurances */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-neutral-300">
            <span className="px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" /> 8 Specialized Disciplines
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" /> Dedicated Partner Advisory
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-900 border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B70909]" /> Full Data Privacy
            </span>
          </div>
        </section>

        {/* 8 Services Grid */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES_DATA.map((srv) => (
              <article
                key={srv.id}
                id={srv.id}
                className="bg-[#090909] border border-white/10 hover:border-[#B70909]/40 rounded-2xl p-8 md:p-10 flex flex-col justify-between transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-400">
                      {srv.number}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#B70909] uppercase tracking-wider">
                      {srv.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4">{srv.title}</h2>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">{srv.description}</p>

                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      Deliverables &amp; Capabilities
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {srv.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B70909] mt-1.5 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-white hover:text-[#B70909] transition-colors flex items-center gap-1.5"
                  >
                    <span>{srv.ctaLabel}</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4-Phase Delivery Framework */}
        <section className="border-t border-white/10 py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-[#B70909] uppercase tracking-wider block mb-2">
              Delivery Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Our 4-Phase <span className="italic font-serif font-normal">Methodology</span>
            </h2>
            <p className="text-sm text-neutral-400">
              From day one discovery to continuous optimization, our engagements follow institutional standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#090909] border border-white/10 rounded-xl p-6">
              <div className="text-xs font-mono text-[#B70909] font-bold mb-2">Phase 01 &bull; 48 Hours</div>
              <h3 className="text-base font-bold text-white mb-2">Audit &amp; Discovery</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We inspect ad accounts, brand touchpoints, and audience data to identify immediate commercial levers.
              </p>
            </div>
            <div className="bg-[#090909] border border-white/10 rounded-xl p-6">
              <div className="text-xs font-mono text-[#B70909] font-bold mb-2">Phase 02 &bull; Days 3&ndash;7</div>
              <h3 className="text-base font-bold text-white mb-2">Narrative &amp; Strategy</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Our creative directors architect campaign angles, media distribution schedules, and PR pitches.
              </p>
            </div>
            <div className="bg-[#090909] border border-white/10 rounded-xl p-6">
              <div className="text-xs font-mono text-[#B70909] font-bold mb-2">Phase 03 &bull; Days 7&ndash;14</div>
              <h3 className="text-base font-bold text-white mb-2">Execution &amp; Launch</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Assets go live across target channels with robust conversion tracking and performance measurement.
              </p>
            </div>
            <div className="bg-[#090909] border border-white/10 rounded-xl p-6">
              <div className="text-xs font-mono text-[#B70909] font-bold mb-2">Phase 04 &bull; Continuous</div>
              <h3 className="text-base font-bold text-white mb-2">Optimization &amp; Scale</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Iterative weekly testing, data-backed optimization, and dedicated partner reviews protect your growth.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Brief Intake Form */}
        <section id="contact" className="border-t border-white/10 py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold text-[#B70909] uppercase tracking-wider block">
                Direct Consultation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Initiate Your <span className="italic font-serif font-normal">Service Brief</span>
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Connect with our advisory team to discuss your goals, reach more customers, and build lasting market leadership.
              </p>

              <div className="p-5 rounded-xl bg-neutral-900 border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Direct Phone Line</span>
                  <a href="tel:+2348153253639" className="font-mono text-white font-bold hover:text-[#B70909]">
                    +234 (815) 325-3639
                  </a>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-neutral-400">Advisory Channel</span>
                  <a href="mailto:advisory@igraphmedia.com" className="text-white hover:text-[#B70909]">
                    advisory@igraphmedia.com
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Governance</span>
                  <span className="text-neutral-300">Mutual NDA &bull; Full Data Privacy</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#090909] border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Full Name &amp; Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adebayo Adeleke, Managing Director"
                    className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cocu Atelier, 90's Management"
                    className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Primary Service Requirement</label>
                  <select
                    className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]"
                  >
                    <option value="press-release">01. Press Release Distribution</option>
                    <option value="social-media">02. Social Media Management</option>
                    <option value="personal-branding">03. Personal Branding &amp; Profiling</option>
                    <option value="media-buying">04. Media Planning &amp; Buying</option>
                    <option value="seo">05. Search Engine Optimization</option>
                    <option value="brand-promotion">06. Brand Promotion</option>
                    <option value="content-strategy">07. Content Strategy</option>
                    <option value="digital-advertising">08. Digital Advertising</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-300 block mb-1">Commercial Goals / Notes</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your current targets or bottlenecks..."
                    className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#B70909]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#B70909] hover:bg-[#cf1111] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Get Started &rarr;
                </button>
                {formSent && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg text-center">
                    Thank you. Your enquiry has been received. An a member of our team will reach out within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <SupportAgent />
    </div>
  );
}
