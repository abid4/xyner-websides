import React, { useState, useEffect } from 'react';
import { useDevMode } from '../context/DevModeContext';
import { Terminal, Activity, Cpu, EyeOff, Radio } from 'lucide-react';

export const DevModeFloatingHud: React.FC = () => {
  const { isDevMode, toggleDevMode } = useDevMode();
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!isDevMode) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, [isDevMode]);

  if (!isDevMode) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#020a05]/95 border border-[#00ff88]/80 shadow-[0_0_35px_-5px_rgba(0,255,136,0.5),0_0_15px_rgba(0,242,254,0.3)] backdrop-blur-2xl flex flex-wrap items-center gap-4 text-xs font-mono text-[#00ff88] animate-in fade-in slide-in-from-bottom-3 duration-300 select-none"
    >
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-ping" />
        <span className="text-white font-extrabold tracking-wider flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#00ff88]" />
          X-RAY GOD MODE
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-3 text-stone-300 text-[11px] border-l border-[#00ff88]/30 pl-3">
        <span className="flex items-center gap-1 text-[#00ff88] font-bold">
          <Activity className="w-3 h-3 text-[#00ff88]" />
          {fps} FPS
        </span>
        <span>·</span>
        <span className="text-[#00f2fe] flex items-center gap-1">
          <Cpu className="w-3 h-3 text-[#00f2fe]" />
          React v19 Fiber AST
        </span>
        <span>·</span>
        <span className="text-emerald-400">Blueprint Active</span>
        <span>·</span>
        <span className="text-stone-400">Key: [X]</span>
      </div>

      <button
        onClick={toggleDevMode}
        className="px-2.5 py-1 rounded bg-[#00ff88]/15 hover:bg-[#00ff88]/25 text-[#00ff88] border border-[#00ff88]/50 hover:border-[#00ff88] transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
      >
        <EyeOff className="w-3 h-3" />
        <span>Exit X-Ray</span>
      </button>
    </div>
  );
};
