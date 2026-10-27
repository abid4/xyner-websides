import React, { useEffect, useRef } from 'react';
import { useDevMode } from '../context/DevModeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface CollisionRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface TerminalBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  active: boolean;
}

export const TechBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDevMode } = useDevMode();
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Track terminal window bounding box relative to canvas
    let terminalBox: TerminalBounds = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      active: false,
    };

    let lastCollisionTime = 0;
    const sparks: Spark[] = [];
    const ripples: CollisionRipple[] = [];

    const updateTerminalBounds = () => {
      const termEl =
        document.getElementById('hero-terminal-window') ||
        document.querySelector('[data-collision-target="true"]');

      if (termEl && canvas) {
        const cRect = canvas.getBoundingClientRect();
        const tRect = termEl.getBoundingClientRect();
        // Calculate relative coordinates to canvas space
        const left = tRect.left - cRect.left;
        const top = tRect.top - cRect.top;
        const right = tRect.right - cRect.left;
        const bottom = tRect.bottom - cRect.top;

        if (tRect.width > 10 && tRect.height > 10) {
          terminalBox = {
            left,
            top,
            right,
            bottom,
            width: tRect.width,
            height: tRect.height,
            active: true,
          };
          return;
        }
      }
      terminalBox.active = false;
    };

    // Initial query and event listeners for bounding recalculation
    updateTerminalBounds();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      updateTerminalBounds();
    };

    const handleScroll = () => {
      updateTerminalBounds();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize particles
    const particleCount = Math.min(Math.floor((width * height) / 13500), 85);
    const particles: Particle[] = [];

    const goldColors = ['#fef08a', '#eab308', '#d4af37', '#ca8a04', '#ffd700'];
    const matrixColors = ['#00ff88', '#00e575', '#00f2fe'];

    for (let i = 0; i < particleCount; i++) {
      const palette = isDevMode ? matrixColors : goldColors;

      // Avoid spawning inside terminal window
      let spawnX = Math.random() * width;
      let spawnY = Math.random() * height;

      if (
        terminalBox.active &&
        spawnX >= terminalBox.left - 20 &&
        spawnX <= terminalBox.right + 20 &&
        spawnY >= terminalBox.top - 20 &&
        spawnY <= terminalBox.bottom + 20
      ) {
        // Shift outside to left or bottom
        if (Math.random() > 0.5) {
          spawnX = Math.random() * Math.max(10, terminalBox.left - 40);
        } else {
          spawnY = terminalBox.bottom + 40 + Math.random() * (height - terminalBox.bottom);
        }
      }

      particles.push({
        x: spawnX,
        y: spawnY,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2.0 + 1.0,
        color: palette[Math.floor(Math.random() * palette.length)],
        baseAlpha: Math.random() * 0.45 + 0.35,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const connectionDist = 125;
    const mouseRadius = 160;
    let frameCount = 0;

    const spawnCollisionSparks = (x: number, y: number, normalX: number, normalY: number, baseColor: string) => {
      // Add ripple
      ripples.push({
        x,
        y,
        radius: 3,
        maxRadius: 18,
        alpha: 0.85,
        color: baseColor,
      });

      // Spawn 3-5 kinetic micro-sparks emitting away from terminal
      const sparkCount = Math.floor(Math.random() * 3) + 3;
      for (let s = 0; s < sparkCount; s++) {
        // Tangent angle
        const spread = (Math.random() - 0.5) * 1.4;
        const cos = Math.cos(spread);
        const sin = Math.sin(spread);
        // Rotate normal vector by spread
        const dirX = normalX * cos - normalY * sin;
        const dirY = normalX * sin + normalY * cos;
        const speed = Math.random() * 2.2 + 1.2;

        sparks.push({
          x,
          y,
          vx: dirX * speed,
          vy: dirY * speed,
          life: 0,
          maxLife: Math.floor(Math.random() * 14) + 12,
          color: isDevMode ? '#00ff88' : Math.random() > 0.4 ? '#fef08a' : '#eab308',
          size: Math.random() * 1.5 + 0.8,
        });
      }
    };

    const render = (time: number) => {
      frameCount++;

      // Update terminal obstacle position periodically (every 18 frames) to catch layout shifts or tab changes smoothly
      if (frameCount % 18 === 0) {
        updateTerminalBounds();
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Perspective cyber-grid background
      ctx.save();
      ctx.strokeStyle = isDevMode
        ? 'rgba(0, 255, 136, 0.05)'
        : 'rgba(212, 175, 55, 0.035)';
      ctx.lineWidth = 1;

      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw Terminal Deflector Barrier (Collision Physics Field)
      if (terminalBox.active) {
        ctx.save();
        const cornerR = 16;
        const pad = 2;
        const bx = terminalBox.left - pad;
        const by = terminalBox.top - pad;
        const bw = terminalBox.width + pad * 2;
        const bh = terminalBox.height + pad * 2;

        if (isDevMode) {
          // Dev Mode Wireframe HUD overlay for collision collider
          ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(bx, by, bw, bh);
          ctx.setLineDash([]);

          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
          ctx.fillText('COLLIDER: RIGID_BODY [RESTITUTION=0.96]', bx + 8, by - 6);
        } else {
          // Luxury Mode: Soft shimmering collision aura around terminal
          const timeOffset = Math.sin(time * 0.002) * 0.5 + 0.5;
          const auraAlpha = 0.04 + timeOffset * 0.04;
          ctx.strokeStyle = `rgba(212, 175, 55, ${auraAlpha})`;
          ctx.lineWidth = 1.5;

          // Draw rounded deflector perimeter
          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh, cornerR);
          ctx.stroke();

          // Subtle corner accents to emphasize rigid boundaries
          ctx.strokeStyle = `rgba(243, 229, 171, ${0.15 + auraAlpha})`;
          ctx.lineWidth = 2;
          const cornerLen = 14;

          // Top-left corner
          ctx.beginPath();
          ctx.moveTo(bx, by + cornerLen);
          ctx.lineTo(bx, by + cornerR);
          ctx.arcTo(bx, by, bx + cornerR, by, cornerR);
          ctx.lineTo(bx + cornerLen, by);
          ctx.stroke();

          // Top-right corner
          ctx.beginPath();
          ctx.moveTo(bx + bw - cornerLen, by);
          ctx.lineTo(bx + bw - cornerR, by);
          ctx.arcTo(bx + bw, by, bx + bw, by + cornerR, cornerR);
          ctx.lineTo(bx + bw, by + cornerLen);
          ctx.stroke();

          // Bottom-left corner
          ctx.beginPath();
          ctx.moveTo(bx, by + bh - cornerLen);
          ctx.lineTo(bx, by + bh - cornerR);
          ctx.arcTo(bx, by + bh, bx + cornerR, by + bh, cornerR);
          ctx.lineTo(bx + cornerLen, by + bh);
          ctx.stroke();

          // Bottom-right corner
          ctx.beginPath();
          ctx.moveTo(bx + bw - cornerLen, by + bh);
          ctx.lineTo(bx + bw - cornerR, by + bh);
          ctx.arcTo(bx + bw, by + bh, bx + bw, by + bh - cornerR, cornerR);
          ctx.lineTo(bx + bw, by + bh - cornerLen);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Update & Draw Particles with Collision Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply natural momentum
        p.x += p.vx;
        p.y += p.vy;

        // Canvas Boundary Collisions (Left, Right, Top, Bottom)
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
        } else if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
        } else if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -Math.abs(p.vy);
        }

        // ========================================================
        // TERMINAL WINDOW COLLISION PHYSICS
        // ========================================================
        if (terminalBox.active) {
          const cornerR = 14;
          const boxMargin = p.radius + 1.5;

          // Clamped point on the terminal's bounding box
          const clampX = Math.max(terminalBox.left, Math.min(p.x, terminalBox.right));
          const clampY = Math.max(terminalBox.top, Math.min(p.y, terminalBox.bottom));

          const diffX = p.x - clampX;
          const diffY = p.y - clampY;
          const distSq = diffX * diffX + diffY * diffY;

          // Check if particle center is outside but touching boundary or inside
          const isInside =
            p.x >= terminalBox.left &&
            p.x <= terminalBox.right &&
            p.y >= terminalBox.top &&
            p.y <= terminalBox.bottom;

          if (isInside) {
            // Particle got inside or spawned inside: eject to nearest edge
            const dLeft = p.x - terminalBox.left;
            const dRight = terminalBox.right - p.x;
            const dTop = p.y - terminalBox.top;
            const dBottom = terminalBox.bottom - p.y;
            const minEdge = Math.min(dLeft, dRight, dTop, dBottom);

            let normalX = 0;
            let normalY = 0;

            if (minEdge === dLeft) {
              p.x = terminalBox.left - boxMargin;
              p.vx = -Math.abs(p.vx) * 0.96 - 0.25;
              normalX = -1;
            } else if (minEdge === dRight) {
              p.x = terminalBox.right + boxMargin;
              p.vx = Math.abs(p.vx) * 0.96 + 0.25;
              normalX = 1;
            } else if (minEdge === dTop) {
              p.y = terminalBox.top - boxMargin;
              p.vy = -Math.abs(p.vy) * 0.96 - 0.25;
              normalY = -1;
            } else {
              p.y = terminalBox.bottom + boxMargin;
              p.vy = Math.abs(p.vy) * 0.96 + 0.25;
              normalY = 1;
            }

            spawnCollisionSparks(p.x, p.y, normalX, normalY, p.color);
          } else if (distSq < boxMargin * boxMargin) {
            // Particle hit the external perimeter or rounded corner!
            const dist = Math.sqrt(distSq) || 0.001;
            const normalX = diffX / dist;
            const normalY = diffY / dist;

            // Penetration resolution (push completely out of collision envelope)
            const overlap = boxMargin - dist;
            p.x += normalX * (overlap + 0.5);
            p.y += normalY * (overlap + 0.5);

            // Velocity reflection: v' = v - (1 + restitution) * (v . n) * n
            const vDotN = p.vx * normalX + p.vy * normalY;

            if (vDotN < 0) {
              const restitution = 0.96;
              p.vx -= (1 + restitution) * vDotN * normalX;
              p.vy -= (1 + restitution) * vDotN * normalY;

              // Add subtle organic tangent scatter
              const tangentX = -normalY;
              const tangentY = normalX;
              const scatter = (Math.random() - 0.5) * 0.2;
              p.vx += tangentX * scatter;
              p.vy += tangentY * scatter;

              // Spawn dynamic collision sparks (rate-limited)
              if (time - lastCollisionTime > 40 || sparks.length < 8) {
                lastCollisionTime = time;
                spawnCollisionSparks(clampX, clampY, normalX, normalY, p.color);
              }
            }
          }
        }

        // Mouse interaction: gentle magnetic repulsion
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (mouseRadius - dist) / mouseRadius;
            p.x -= (dx / dist) * force * 1.6;
            p.y -= (dy / dist) * force * 1.6;
          }
        }

        // Speed regulation (prevent freezing or runaway velocities)
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (currentSpeed < 0.35) {
          const factor = 0.35 / (currentSpeed || 1);
          p.vx *= factor;
          p.vy *= factor;
        } else if (currentSpeed > 2.2) {
          const factor = 2.2 / currentSpeed;
          p.vx *= factor;
          p.vy *= factor;
        }

        // Draw particle dot with metallic luxury glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw dynamic constellation connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            // Check if connection line would cut directly through terminal interior
            let cutsTerminal = false;
            if (terminalBox.active) {
              const midX = (p.x + p2.x) / 2;
              const midY = (p.y + p2.y) / 2;
              if (
                midX > terminalBox.left &&
                midX < terminalBox.right &&
                midY > terminalBox.top &&
                midY < terminalBox.bottom
              ) {
                cutsTerminal = true;
              }
            }

            if (!cutsTerminal) {
              const alpha = (1 - dist / connectionDist) * 0.22;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isDevMode
                ? `rgba(0, 255, 136, ${alpha})`
                : i % 2 === 0
                ? `rgba(234, 179, 8, ${alpha * 0.9})`
                : `rgba(212, 175, 55, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // 4. Render & Update Collision Sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.vy *= 0.94;
        sp.life++;

        const sparkAlpha = Math.max(0, 1 - sp.life / sp.maxLife);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sparkAlpha, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sparkAlpha * 0.9;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (sp.life >= sp.maxLife) {
          sparks.splice(s, 1);
        }
      }

      // 5. Render & Update Collision Ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 0.85;
        rip.alpha *= 0.91;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.globalAlpha = rip.alpha;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (rip.alpha < 0.04 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDevMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full -z-20 transition-opacity duration-700"
      style={{ opacity: 0.88 }}
      aria-hidden="true"
    />
  );
};
