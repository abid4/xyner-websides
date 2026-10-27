import React, { useState, useRef } from 'react';
import { useDevMode } from '../context/DevModeContext';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isDevMode } = useDevMode();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    const rotateX = -yPct * maxTilt;
    const rotateY = xPct * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.08s ease-out',
    });

    const glareColor = isDevMode
      ? `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(0, 255, 136, 0.25) 0%, rgba(0, 242, 254, 0.12) 35%, transparent 70%)`
      : `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(243, 229, 171, 0.28) 0%, rgba(212, 175, 55, 0.16) 30%, rgba(0, 242, 254, 0.08) 50%, transparent 72%)`;

    setGlareStyle({
      opacity: 1,
      background: glareColor,
      transition: 'opacity 0.15s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.35s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`relative ${className}`}
    >
      {/* Dynamic 3D Glare Liquid Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl overflow-hidden"
        style={glareStyle}
      />
      {children}
    </div>
  );
};
