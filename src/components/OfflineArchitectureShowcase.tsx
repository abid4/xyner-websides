import React, { useState } from 'react';
import {
  HardDrive,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Network,
} from 'lucide-react';
import { DevSectionBadge } from './DevSectionBadge';

export const OfflineArchitectureShowcase: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      step: '01',
      title: 'Local SQLite Mutation',
      latency: '0.04ms',
      description:
        'Every checkout tap or waiter ticket writes instantaneously to a high-speed local SQLite database embedded on the tablet or POS terminal. The cashier never waits on remote network handshakes.',
      highlight: 'Zero UI blocking, 100% offline responsive.',
    },
    {
      step: '02',
      title: 'CRDT Conflict Resolution',
      latency: '1.2ms',
      description:
        'When multiple waiter tablets modify the same table ticket or inventory counter while disconnected, conflict-free replicated data types automatically resolve state merges mathematically without data loss.',
      highlight: 'Deterministic convergent states across all distributed terminals.',
    },
    {
      step: '03',
      title: 'Resilient Delta Queue',
      latency: 'Instant',
      description:
        'Pending mutations are signed with SHA-256 hashes and stored in a durable append-only event queue. Even if power is abruptly unplugged, transactions survive cold reboot without corruption.',
      highlight: 'ACID-compliant storage safeguards revenue audit trails.',
    },
    {
      step: '04',
      title: 'Background Mesh Sync',
      latency: '< 35ms',
      description:
        'The instant internet connectivity resumes—whether via 4G failover, fiber, or Wi-Fi hotspot—the sync worker flushes delta-compressed payloads to the AWS cloud cluster in background threads.',
      highlight: 'Continuous live cloud backup with zero cashier intervention.',
    },
  ];

  return (
    <section id="architecture" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="OfflinePOSModule"
        propsList='pipeline="crdt-v2.4" maxLatency="0.04ms" storage="sqlite"'
        renderLatency="0.4ms"
        loc="src/components/OfflineArchitectureShowcase.tsx"
      />

      {/* Moving ambient gold glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#d4af37]/10 via-[#eab308]/6 to-transparent blur-[160px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Architectural Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#eab308] font-bold">
              <Zap className="w-3.5 h-3.5 text-[#eab308]" />
              <span>Zero-Downtime Guarantee</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Why XYNER’s{' '}
              <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
                Offline-First Engine
              </span>{' '}
              Dominates the Market.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional cloud-only POS and mobile apps collapse when internet drops or slows. XYNER flips the paradigm: every device is an autonomous server that operates at full speed 24/7, syncing invisibly in the background.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#121216] border border-[#d4af37]/25 hover:border-[#eab308] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#08080a] border border-[#eab308]/40 flex items-center justify-center shrink-0">
                  <HardDrive className="w-5 h-5 text-[#eab308]" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block text-sm">Embedded SQLite Engine</span>
                  <span className="text-slate-400">Persistent disk storage survives sudden power cutoffs</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#121216] border border-[#d4af37]/25 hover:border-[#eab308] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#08080a] border border-[#eab308]/40 flex items-center justify-center shrink-0">
                  <Network className="w-5 h-5 text-[#eab308]" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block text-sm">Multi-Terminal LAN Mesh</span>
                  <span className="text-slate-400">Kitchen screens and tablets talk directly over local Wi-Fi</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#121216] border border-[#d4af37]/25 hover:border-[#eab308] transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#08080a] border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block text-sm">Cryptographic Audit Compliance</span>
                  <span className="text-slate-400">Zero duplicate orders, no altered cash reconciliation logs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 4-Stage Architecture Pipeline in Structured Dark Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#121216] border border-[#d4af37]/35 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Data Flow Pipeline Visualization
                </span>
                <span className="text-xs font-mono text-[#fef08a] bg-[#eab308]/15 px-3 py-1 rounded-lg border border-[#eab308]/40 font-bold">
                  CRDT v2.4 Spec
                </span>
              </div>

              {/* Stage Stepper Tabs */}
              <div className="grid grid-cols-4 gap-2">
                {stages.map((stage, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={stage.step}
                      onClick={() => setActiveStage(idx)}
                      className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-[#eab308] border-[#eab308] text-black shadow-lg font-bold'
                          : 'bg-[#08080a] border-[#d4af37]/20 text-slate-400 hover:border-[#eab308]/60 hover:text-white'
                      }`}
                    >
                      <div className={`text-[10px] font-mono font-extrabold ${isActive ? 'text-black' : 'text-[#eab308]'}`}>
                        STAGE {stage.step}
                      </div>
                      <div className="text-xs font-bold truncate mt-0.5">
                        {stage.title.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Detail Showcase */}
              <div className="p-5 rounded-xl bg-[#08080a] border border-[#d4af37]/30 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#eab308] text-black font-extrabold">
                      Step {stages[activeStage].step}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {stages[activeStage].title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Latency: <span className="text-[#eab308] font-bold">{stages[activeStage].latency}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {stages[activeStage].description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-2 border-t border-white/10">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                  <span>{stages[activeStage].highlight}</span>
                </div>
              </div>

              {/* Next Stage Navigation */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 font-mono">
                  Step {activeStage + 1} of 4 in pipeline
                </span>
                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % 4)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#eab308] hover:text-[#fef08a] transition-colors cursor-pointer"
                >
                  <span>Advance Pipeline Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
