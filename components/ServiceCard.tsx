"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TagData {
  text: string;
  top: string;
  left: string;
  rotation: number;
  hoverOffsetX: number;
  hoverOffsetY: number;
  duration: number;
  delay: number;
}

const serviceTags: TagData[] = [
  { text: 'Social Media Post', top: '15%', left: '10%', rotation: -4, hoverOffsetX: -10, hoverOffsetY: -8, duration: 3.2, delay: 0 },
  { text: 'Business Collateral', top: '18%', left: '55%', rotation: 5, hoverOffsetX: 12, hoverOffsetY: -6, duration: 3.8, delay: 0.3 },
  { text: 'Colour Palette', top: '48%', left: '8%', rotation: 3, hoverOffsetX: -8, hoverOffsetY: 6, duration: 2.9, delay: 0.5 },
  { text: 'Brand Voice Direction', top: '45%', left: '46%', rotation: -3, hoverOffsetX: 8, hoverOffsetY: 8, duration: 3.4, delay: 0.2 },
  { text: 'Logo & System', top: '75%', left: '20%', rotation: 2, hoverOffsetX: -6, hoverOffsetY: 12, duration: 3.0, delay: 0.4 },
  { text: 'Mockup', top: '72%', left: '65%', rotation: -6, hoverOffsetX: 10, hoverOffsetY: 10, duration: 3.6, delay: 0.1 },
];

export const ServiceCard: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md h-[460px] rounded-3xl bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between overflow-hidden shadow-xl transition-colors duration-300 hover:border-neutral-700"
      style={{ opacity: 0, y: 30 }}
    >
      {/* Top Content */}
      <div className="z-10 select-none">
        <h3 className="text-2xl font-semibold text-white tracking-tight">Brand Identity</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          We help founders shape how their brand looks, sounds, and feels with a system built to scale.
        </p>
      </div>

      {/* Floating Canvas Area */}
      <div className="relative w-full h-[260px] mt-4">
        {serviceTags.map((tag, idx) => (
          <motion.div
            key={idx}
            className="absolute"
            style={{
              top: tag.top,
              left: tag.left,
            }}
            variants={{
              initial: {
                x: 0,
                y: 0,
                rotate: tag.rotation,
                scale: 1,
              },
              hover: {
                x: tag.hoverOffsetX,
                y: tag.hoverOffsetY,
                rotate: tag.rotation * 1.25,
                scale: 1.05,
                transition: {
                  type: 'spring',
                  stiffness: 350,
                  damping: 22,
                },
              },
            }}
          >
            {/* Nested Continuous Idle Float */}
            <motion.div
              animate={{
                y: [-4, 4, -4],
              }}
              transition={{
                duration: tag.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: tag.delay,
              }}
              className="px-3.5 py-1.5 rounded-full bg-neutral-800/80 backdrop-blur-md border border-neutral-700/60 shadow-md text-xs font-medium text-neutral-200 cursor-default whitespace-nowrap transition-colors duration-200 hover:bg-neutral-700/90 hover:text-white"
            >
              {tag.text}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
