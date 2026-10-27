import React from 'react';
import { useDevMode } from '../context/DevModeContext';
import { Terminal, Code2 } from 'lucide-react';

interface DevSectionBadgeProps {
  componentName: string;
  propsList?: string;
  renderLatency?: string;
  loc?: string;
}

export const DevSectionBadge: React.FC<DevSectionBadgeProps> = ({
  componentName,
  propsList = 'props={...}',
  renderLatency = '0.8ms',
  loc = 'src/components',
}) => {
  const { isDevMode } = useDevMode();

  if (!isDevMode) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute top-3 left-4 sm:left-8 z-30 pointer-events-none select-none transition-all duration-500 animate-in fade-in slide-in-from-top-2"
    >
      <div className="flex flex-wrap items-center gap-2 bg-[#020a05]/95 border border-[#00ff88]/70 rounded-md px-3 py-1.5 text-[11px] font-mono text-[#00ff88] shadow-[0_0_20px_-2px_rgba(0,255,136,0.45)] backdrop-blur-xl">
        <span className="flex items-center gap-1.5 text-[#00ff88] font-bold">
          <Terminal className="w-3.5 h-3.5 text-[#00ff88] animate-pulse" />
          &lt;{componentName} /&gt;
        </span>
        <span className="text-[#00e575]/50">·</span>
        <span className="text-[#00f2fe] font-mono hidden sm:inline">{propsList}</span>
        <span className="text-[#00e575]/50 hidden sm:inline">·</span>
        <span className="text-stone-300 text-[10px]">
          render: <span className="text-white font-bold">{renderLatency}</span>
        </span>
        <span className="text-[#00e575]/50 hidden md:inline">·</span>
        <span className="text-stone-400 text-[10px] hidden md:inline">{loc}</span>
      </div>
    </div>
  );
};
