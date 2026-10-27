import React from 'react';
import { TiltCard } from './TiltCard';
import { DevSectionBadge } from './DevSectionBadge';
import {
  ArrowUpRight,
  MapPin,
  FolderGit2,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  metric: string;
  metricLabel: string;
  image: string;
  description: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'onyx-pos',
    title: 'OnyxPOS Restaurant & Retail Suite',
    category: 'Mission-Critical Hospitality & Retail POS',
    client: 'The Roast Room Bistro (18 Lanes)',
    location: 'Islamabad, Pakistan',
    metric: '0.04s',
    metricLabel: 'Ticket Print Latency During Peak Rush',
    image: '/src/assets/images/project_retail_pos_1793110063029.jpg',
    description:
      'Engineered an autonomous offline-first POS terminal suite with dual Kitchen Display Systems and thermal ESC/POS network print queues. Survives full grid power outages without losing table state.',
    tags: ['Offline SQLite', 'ESC/POS Driver', 'LAN WebSocket', 'KDS Queue'],
  },
  {
    id: 'swift-scan',
    title: 'SwiftScan Supermarket Multi-Lane POS',
    category: 'High-Volume Retail & Inventory Automation',
    client: 'Metro Express Marts (8 Locations)',
    location: 'Lahore, Punjab',
    metric: '14,000',
    metricLabel: 'SKUs Cached Locally with 0ms Lookup',
    image: '/src/assets/images/agency_team_collaboration_1793110064460.jpg',
    description:
      'Deployed multi-lane checkout terminals capable of scanning and weighing 14k SKUs completely offline. Automatic peer-to-peer sync replicates inventory delta logs when central link restores.',
    tags: ['Flutter Desktop', 'Local Embedded Cache', 'Barcode SDK', 'CRDT Sync'],
  },
  {
    id: 'pulse-care',
    title: 'PulseCare Clinical Tablet & Dispensary',
    category: 'Encrypted Healthcare Workflow',
    client: 'Al-Noor Specialty Center',
    location: 'Rawalpindi, Pakistan',
    metric: '-45%',
    metricLabel: 'Reduction in Outpatient Wait Times',
    image: '/src/assets/images/project_clinical_tablet_1793110064357.jpg',
    description:
      'Custom clinical management tablet app for physicians and pharmacy staff. Provides sub-second patient lookup, biometric staff authentication, and offline prescription audit compliance.',
    tags: ['Next.js Tablet UI', 'Biometric NFC', 'Encrypted SQLite', 'AWS HIPAA'],
  },
  {
    id: 'logi-route',
    title: 'LogiRoute Dispatch & Driver Platform',
    category: 'Cross-Platform Mobile Suite',
    client: 'LogiRoute Logistics Fleet',
    location: 'Karachi & Dubai',
    metric: '99.98%',
    metricLabel: 'Telemetry Delivery in 4G Dead Zones',
    image: '/src/assets/images/project_logistics_fleet_1793110063230.jpg',
    description:
      'Full-stack mobile application for commercial delivery drivers across cross-border freight routes. Buffers GPS coordinates, signatures, and photographic proof of delivery offline.',
    tags: ['React Native', 'Offline GeoQueue', 'FastAPI', 'PostgreSQL'],
  },
];

interface PortfolioShowcaseProps {
  onSelectProject: (projectTitle: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onSelectProject }) => {
  return (
    <section id="portfolio" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="PortfolioShowcase"
        propsList='projects={4} distinctImages={true} tilt3D={true}'
        renderLatency="1.0ms"
        loc="src/components/PortfolioShowcase.tsx"
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#d4af37]/10 via-[#eab308]/6 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
            <FolderGit2 className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Featured Case Deployments</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Production Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Proven Architectural Impact in{' '}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
              Mission-Critical Operations
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore live production software platforms built by XYNER. Every deployment is benchmarked under simulated network cuts and maximum transaction throughput.
          </p>
        </div>

        {/* 3D Tilt Portfolio Grid (4 Distinct Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <TiltCard
              key={project.id}
              maxTilt={5}
              className="group rounded-2xl bg-[#121216] border border-[#d4af37]/25 hover:border-[#eab308] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.9)] hover:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(234,179,8,0.3)]"
            >
              {/* Distinct High-Res Image Header with Zoom on Hover */}
              <div className="relative h-64 w-full overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/40 to-transparent" />

                {/* Bold Yellow/Gold Feature Metric Box */}
                <div className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-[#eab308] text-black text-right shadow-lg">
                  <div className="text-lg font-extrabold font-mono tabular-nums leading-none">
                    {project.metric}
                  </div>
                  <div className="text-[10px] font-bold text-black/80 font-mono mt-0.5">
                    {project.metricLabel}
                  </div>
                </div>

                {/* Category Box */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-mono">
                  <span className="bg-[#08080a]/90 text-[#fef08a] px-3 py-1 rounded-lg border border-[#d4af37]/40 backdrop-blur-md font-bold">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#eab308] transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
                    <span>{project.client} &middot; {project.location}</span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags and Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    {project.tags.map((t, idx) => (
                      <span key={t}>
                        {t}
                        {idx < project.tags.length - 1 && <span className="ml-1.5 text-slate-600">/</span>}
                      </span>
                    ))}
                  </div>

                  {/* Solid Gold/Yellow Button with Black Text */}
                  <button
                    onClick={() => onSelectProject(project.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-2 rounded-lg bg-[#eab308] hover:bg-[#d4af37] text-black transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 shadow-md hover:shadow-[0_4px_16px_rgba(234,179,8,0.4)]"
                  >
                    <span>Request Similar</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
