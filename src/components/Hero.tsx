import React, { useState } from 'react';
import {
  ArrowRight,
  WifiOff,
  Wifi,
  Layers,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building2,
  Clock,
} from 'lucide-react';
import { DevSectionBadge } from './DevSectionBadge';
import { LiveCodeTerminal } from './LiveCodeTerminal';
import { TechBackgroundCanvas } from './TechBackgroundCanvas';

interface HeroProps {
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const [activeTab, setActiveTab] = useState<'offline' | 'code'>('code');
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(true);
  const [syncedCount, setSyncedCount] = useState(148);
  const [pendingQueue, setPendingQueue] = useState(3);
  const [lastActionMsg, setLastActionMsg] = useState('Order #9402 logged to local SQLite cache');

  const handleSimulateOrder = () => {
    if (isSimulatedOffline) {
      setPendingQueue((prev) => prev + 1);
      setLastActionMsg(`Order #${9400 + pendingQueue + 3} queued offline (0.04ms write latency)`);
    } else {
      setSyncedCount((prev) => prev + 1);
      setLastActionMsg(`Order #${9400 + syncedCount + 1} synced direct to cloud cluster`);
    }
  };

  const handleToggleNetwork = () => {
    const nextState = !isSimulatedOffline;
    setIsSimulatedOffline(nextState);
    if (!nextState && pendingQueue > 0) {
      setSyncedCount((prev) => prev + pendingQueue);
      setLastActionMsg(`Reconnected: Flushed ${pendingQueue} pending local records in 38ms`);
      setPendingQueue(0);
    } else if (nextState) {
      setLastActionMsg('Connection severed: Shifted to local embedded SQLite engine');
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#08080a]">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="HeroSection"
        propsList='runtime="offline-sqlite-v3.4" theme="obsidian-gold" layout="boxed"'
        renderLatency="0.6ms"
        loc="src/components/Hero.tsx"
      />

      {/* Interactive Floating Particles & Cyber-Grid Canvas with Collision Physics */}
      <TechBackgroundCanvas />

      {/* Ambient Gold Glow Spots */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-[#d4af37]/15 via-[#eab308]/10 to-transparent blur-[140px] -z-10 pointer-events-none rounded-full animate-float-slow animate-pulse-glow" />
      <div className="absolute top-20 right-10 w-[420px] h-[420px] bg-gradient-to-br from-[#eab308]/12 via-[#ca8a04]/8 to-transparent blur-[130px] -z-10 pointer-events-none rounded-full animate-float-medium" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Prominent Feature Callouts Strip */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Bold Yellow/Gold Accent Box: 10+ Years Expertise */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#eab308] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_2px_15px_-2px_rgba(234,179,8,0.5)]">
            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>10+ Years Expertise</span>
          </div>

          {/* Bold Gold Accent Box: Mission-Critical Architecture */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121216] border border-[#d4af37]/50 text-[#fef08a] font-bold text-xs tracking-wide shadow-[0_2px_12px_-2px_rgba(212,175,55,0.25)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Mission-Critical Architecture</span>
          </div>

          {/* Regional Trust Marker */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#121216] border border-white/10 text-slate-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Islamabad Studio &middot; Global Client Deployments</span>
          </div>
        </div>

        {/* Main Grid: Clean Structured Boxed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Proposition & Solid Action Controls */}
          <div className="lg:col-span-7 space-y-7">
            {/* Main Headline: Crisp Pure White with Rich Gold Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Engineering the Future of{' '}
              <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
                Offline-First Software
              </span>{' '}
              & Enterprise Systems.
            </h1>

            {/* Soft Slate Gray Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              XYNER architects zero-downtime point-of-sale software, high-throughput mobile apps, and robust cloud-edge architectures designed to keep enterprise operations transacting seamlessly during network collapse.
            </p>

            {/* Solid Gold/Yellow Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onStartProject}
                className="px-7 py-3.5 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black font-extrabold text-sm tracking-wide shadow-[0_4px_22px_-2px_rgba(234,179,8,0.55)] hover:shadow-[0_6px_28px_-2px_rgba(212,175,55,0.7)] transition-all duration-200 cursor-pointer flex items-center gap-2 group hover:-translate-y-0.5"
              >
                <span>Calculate Project Scope</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
              </button>

              <a
                href="#portfolio"
                className="px-6 py-3.5 rounded-xl bg-[#121216] hover:bg-[#1a1a22] text-white border border-[#d4af37]/35 hover:border-[#eab308] text-sm font-semibold transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Explore Showcase</span>
                <ChevronRight className="w-4 h-4 text-[#eab308]" />
              </a>
            </div>

            {/* Clean Structured Metric Boxes (bg-[#121216] with gold outlines) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-3">
              <div className="p-4 rounded-xl bg-[#121216] border border-[#d4af37]/30 hover:border-[#eab308] transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.6)]">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#eab308] font-mono tabular-nums">
                  0.04s
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Local POS Write Latency
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121216] border border-[#d4af37]/30 hover:border-[#eab308] transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.6)]">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Offline Checkout Uptime
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121216] border border-[#d4af37]/30 hover:border-[#eab308] transition-all shadow-[0_4px_20px_-5px_rgba(0,0,0,0.6)]">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#fef08a] font-mono tabular-nums">
                  0.00%
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  CRDT Data Loss Rate
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Boxed Workspace Imagery & Interactive Terminal */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tech Workspace Box (High-Res Architectural Image Container) */}
            <div className="rounded-2xl overflow-hidden bg-[#121216] border border-[#d4af37]/30 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.9)] relative group">
              <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_workspace_office_1793110061540.jpg"
                  alt="XYNER Software Engineering Studio Office"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/35 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#08080a]/90 border border-[#eab308]/40 text-[#fef08a] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                    <span>XYNER Engineering Lab</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono hidden sm:inline">
                    24/7 Production Grid
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Window (Rigid Obstacle for Particle Collision Physics) */}
            <div
              id="hero-terminal-window"
              data-collision-target="true"
              className="rounded-2xl bg-[#121216] border border-[#d4af37]/35 p-5 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.95)] relative overflow-hidden"
            >
              {/* Tab Selector */}
              <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-4 gap-2">
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#08080a] border border-[#d4af37]/25 text-xs">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'code'
                        ? 'bg-[#eab308] text-black shadow-md font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Live Code Terminal
                  </button>
                  <button
                    onClick={() => setActiveTab('offline')}
                    className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'offline'
                        ? 'bg-[#eab308] text-black shadow-md font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Interactive Engine
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#eab308] font-bold">
                    60FPS Real-Time
                  </span>
                </div>
              </div>

              {/* View 1: Live Code Typing Terminal */}
              {activeTab === 'code' ? (
                <LiveCodeTerminal />
              ) : (
                /* View 2: Interactive Offline Sync Engine Simulator */
                <div className="space-y-4">
                  {/* Network State Controller */}
                  <div className="p-3.5 rounded-xl bg-[#08080a] border border-[#d4af37]/25 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isSimulatedOffline
                            ? 'bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {isSimulatedOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-white">
                          Status: {isSimulatedOffline ? 'DISCONNECTED (OFFLINE)' : 'ONLINE CLUSTER SYNC'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {isSimulatedOffline ? 'Using embedded local SQLite store' : 'Cloud synchronization active'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleToggleNetwork}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold border border-[#eab308]/50 bg-[#eab308]/15 hover:bg-[#eab308] hover:text-black transition-colors cursor-pointer text-[#fef08a]"
                    >
                      {isSimulatedOffline ? 'Connect Cloud' : 'Sever Link'}
                    </button>
                  </div>

                  {/* Queues & Telemetry Numbers */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[#08080a] border border-white/5">
                      <div className="text-xs font-mono text-slate-400">Local Queue</div>
                      <div className="text-2xl font-bold font-mono text-[#eab308] mt-1">
                        {pendingQueue} Orders
                      </div>
                      <div className="text-[10px] text-slate-500">0ms disk latency</div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#08080a] border border-white/5">
                      <div className="text-xs font-mono text-slate-400">Cloud Synced</div>
                      <div className="text-2xl font-bold font-mono text-white mt-1">
                        {syncedCount} Orders
                      </div>
                      <div className="text-[10px] text-slate-500">CRDT reconciled</div>
                    </div>
                  </div>

                  {/* Live Transaction Logger */}
                  <div className="p-3 rounded-lg bg-[#08080a] font-mono text-[11px] flex items-center gap-2 border border-white/5 text-slate-300">
                    <span className="text-[#eab308]">&gt;</span>
                    <span className="truncate">{lastActionMsg}</span>
                  </div>

                  {/* Action Simulation Button */}
                  <button
                    onClick={handleSimulateOrder}
                    className="w-full py-3 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black font-mono text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Layers className="w-3.5 h-3.5 text-black" />
                    <span>Simulate New Retail Ticket (Local SQLite Write)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-12 md:mt-16 relative z-10">
        <a
          href="#capabilities"
          aria-label="Scroll down to explore core capabilities"
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-[#fef08a] opacity-80 hover:opacity-100 transition-opacity group cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[10px] text-slate-400">Explore Architecture</span>
          <div className="w-7 h-7 rounded-full border border-[#eab308]/40 flex items-center justify-center group-hover:border-[#eab308] group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#eab308]" />
          </div>
        </a>
      </div>
    </section>
  );
};
