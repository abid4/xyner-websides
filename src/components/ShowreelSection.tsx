import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Film,
  Radio,
  X,
} from 'lucide-react';
import { DevSectionBadge } from './DevSectionBadge';

export const ShowreelSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSegment, setActiveSegment] = useState(0);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const segments = [
    {
      title: 'High-Throughput Offline POS & Dual KDS',
      code: 'POS-01',
      duration: '0:45',
      description: 'Zero-latency touchscreen terminal ordering, kitchen ticket splitting, and offline thermal printer execution.',
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-networking-background-41505-large.mp4',
    },
    {
      title: 'CRDT Replicated Mesh & Hardware Drivers',
      code: 'CRDT-02',
      duration: '0:38',
      description: 'Real-time multi-terminal state convergence across offline handheld Android tablets and cash drawers.',
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-34564-large.mp4',
    },
    {
      title: 'Cross-Platform Mobile Apps & Cloud Sync',
      code: 'APP-03',
      duration: '0:52',
      description: 'Flutter & React Native mobile client running sub-16ms transitions with background cloud queue flushes.',
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-technology-digital-animation-43577-large.mp4',
    },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectSegment = (idx: number) => {
    setActiveSegment(idx);
    if (videoRef.current) {
      videoRef.current.src = segments[idx].videoSrc;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="showreel" className="py-24 bg-[#08080a] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Developer X-Ray Blueprint Label */}
      <DevSectionBadge
        componentName="ShowreelSection"
        propsList='resolution="4K-60FPS" clips={3} hud={true}'
        renderLatency="0.9ms"
        loc="src/components/ShowreelSection.tsx"
      />

      {/* Background radial gold cinema lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#d4af37]/10 via-[#eab308]/6 to-transparent blur-[150px] pointer-events-none -z-10 rounded-full animate-drift-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#121216] border border-[#d4af37]/35 text-xs font-mono text-[#fef08a] font-bold shadow-sm">
            <Film className="w-3.5 h-3.5 text-[#eab308]" />
            <span>Studio Production Showreel &middot; 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Precision in{' '}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#eab308] to-[#d4af37] bg-clip-text text-transparent">
              High-Definition Motion
            </span>
            .
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            See the actual speed, responsiveness, and industrial-grade resilience of the offline-first retail architectures we deploy for global clients.
          </p>
        </div>

        {/* Cinematic Video Player Frame */}
        <div className="relative rounded-2xl overflow-hidden bg-[#121216] border border-[#d4af37]/35 shadow-[0_16px_50px_-10px_rgba(0,0,0,0.95)] group">
          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover filter brightness-95 contrast-105"
              src={segments[activeSegment].videoSrc}
            />

            {/* Video Overlay Top HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-lg border border-[#d4af37]/30 text-xs font-mono backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse" />
                <span className="text-white font-bold">XYNER Production Reel</span>
                <span className="text-slate-500">|</span>
                <span className="text-[#fef08a]">{segments[activeSegment].code}</span>
              </div>

              <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-lg border border-[#d4af37]/30 text-xs font-mono text-slate-300 backdrop-blur-md">
                <Radio className="w-3.5 h-3.5 text-[#eab308]" />
                <span className="text-[#fef08a] font-bold">4K 60FPS RAW</span>
              </div>
            </div>

            {/* Video Overlay Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-xl bg-[#eab308] hover:bg-[#d4af37] text-black border border-[#eab308] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-xl bg-black/80 hover:bg-[#eab308] text-white hover:text-black border border-[#d4af37]/40 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="hidden sm:block text-xs font-mono text-white/90 bg-black/75 px-3 py-2 rounded-lg border border-white/10 backdrop-blur-md">
                  {segments[activeSegment].title}
                </div>
              </div>

              <button
                onClick={() => setIsFullscreenModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-black/80 hover:bg-[#eab308] text-white hover:text-black border border-[#d4af37]/40 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cinema Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Interactive Highlight Segment Cards in bg-[#121216] */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {segments.map((seg, idx) => {
            const isSelected = activeSegment === idx;
            return (
              <button
                key={seg.code}
                onClick={() => handleSelectSegment(idx)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#121216] border-[#eab308] shadow-[0_0_25px_-5px_rgba(234,179,8,0.35)]'
                    : 'bg-[#121216] border-[#d4af37]/20 hover:border-[#eab308]/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#eab308] mb-1.5 font-bold">
                  <span>CLIP {seg.code}</span>
                  <span className="text-slate-400">{seg.duration}</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {seg.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {seg.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Cinema Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-black shadow-2xl">
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-white hover:bg-[#eab308] hover:text-black transition-colors cursor-pointer"
              aria-label="Close cinema mode"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video w-full">
              <video
                ref={modalVideoRef}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-cover"
                src={segments[activeSegment].videoSrc}
              />
            </div>

            <div className="p-4 bg-[#08080a] border-t border-[#d4af37]/20 flex items-center justify-between text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-[#fef08a] font-bold">XYNER SHOWREEL:</span>
                <span>{segments[activeSegment].title}</span>
              </div>
              <div className="text-slate-400">
                HQ: Islamabad, Pakistan &middot; Built for Global Retail
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
