import React from 'react';
import {
  Globe,
  Smartphone,
  Layers,
  Server,
  Database,
  Cloud,
  Palette,
  Cpu,
  Code2,
  HardDrive,
  Box,
  Zap,
} from 'lucide-react';
import { TECH_STACK } from '../data/content';
import { DevSectionBadge } from './DevSectionBadge';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Layers,
  Server,
  Database,
  Cloud,
  Palette,
  Cpu,
  Code2,
  HardDrive,
  Box,
  Zap,
};

export const TechMarquee: React.FC = () => {
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative py-12 bg-[#060608] border-y border-[#d4af37]/20 overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="TechStackMarquee"
        propsList='items={12} loop="infinite" speed="35s"'
        renderLatency="0.3ms"
        loc="src/components/TechMarquee.tsx"
      />

      {/* Edge Gradient Mask for Smooth Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center relative z-10">
        <div className="text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
          Enterprise Engineering Foundation
        </div>
        <p className="text-sm text-slate-300 mt-1">
          The battle-tested technologies powering our offline-first and retail software architectures
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-4">
          {marqueeItems.map((tech, idx) => {
            const Icon = iconMap[tech.iconName] || Code2;
            return (
              <div
                key={`${tech.name}-${idx}`}
                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#121216] border border-[#d4af37]/25 hover:border-[#eab308] hover:shadow-[0_4px_20px_-2px_rgba(234,179,8,0.35)] transition-all duration-200 cursor-default shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-[#08080a] border border-[#eab308]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-[#eab308]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-[#fef08a] whitespace-nowrap transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                    {tech.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
