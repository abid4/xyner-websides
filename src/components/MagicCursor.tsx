import React, { useEffect, useState, useRef } from 'react';
import { useDevMode } from '../context/DevModeContext';

export const MagicCursor: React.FC = () => {
  const { isDevMode } = useDevMode();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, textarea, [role="button"], select');
        setIsHovered(!!clickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;

    const followMouse = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      requestRef.current = requestAnimationFrame(followMouse);
    };

    requestRef.current = requestAnimationFrame(followMouse);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Trailing blurred metallic gold / matrix green glow ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out backdrop-blur-[2px] ${
          isDevMode
            ? isHovered
              ? 'w-12 h-12 border-2 border-[#00ff88] bg-[#00ff88]/20 shadow-[0_0_25px_rgba(0,255,136,0.6)]'
              : 'w-8 h-8 border border-[#00ff88]/50 bg-[#00ff88]/10 shadow-[0_0_15px_rgba(0,255,136,0.4)]'
            : isHovered
            ? 'w-12 h-12 border-2 border-[#fef08a] bg-[#eab308]/20 shadow-[0_0_30px_rgba(234,179,8,0.6)]'
            : 'w-8 h-8 border border-[#eab308]/60 bg-[#eab308]/10 shadow-[0_0_18px_rgba(234,179,8,0.35)]'
        }`}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />

      {/* Center neon laser point */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg ${
          isDevMode
            ? isHovered
              ? 'w-2 h-2 bg-white shadow-[0_0_12px_#00ff88]'
              : 'w-1.5 h-1.5 bg-[#00ff88] shadow-[0_0_8px_#00ff88]'
            : isHovered
            ? 'w-2 h-2 bg-[#fef08a] shadow-[0_0_12px_#eab308]'
            : 'w-1.5 h-1.5 bg-[#eab308] shadow-[0_0_10px_#d4af37]'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
};
