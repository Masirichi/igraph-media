"use client";

import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import OperationsBento from "./OperationsBento";
import CaseStudies from "./CaseStudies";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import Advisory from "./Advisory";
import GovernanceFAQ from "./GovernanceFAQ";
import CTASection from "./CTASection";
import Contact from "./Contact";
import Footer from "./Footer";
import SupportAgent from "./SupportAgent";

/**
 * LineaDS Inspired Architecture for Igraph Media
 * Strict Quiet Luxury, Expressive Minimalism
 * Color System:
 *   - Primary: White (#FFFFFF)
 *   - Secondary: Black (#000000)
 *   - Gray: #808080
 *   - Accent Buttons: Garnet Red (#B70909)
 * Typography: Plus Jakarta Sans
 * Positioning: Independent Media & Brand Advisory
 * Menu: Home, Services, About, Contact us
 */
export default function IgraphMediaLanding() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-[#B70909] selection:text-white font-sans antialiased">
      <Navbar />
      <Hero />
      <OperationsBento />
      <CaseStudies />
      <WhyChooseUs />
      <About />
      <Advisory />
      <GovernanceFAQ />
      <CTASection />
      <Contact />
      <Footer />
      <SupportAgent />
    </div>
  );
}
