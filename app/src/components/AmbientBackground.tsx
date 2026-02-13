import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  baseAlpha: number;
};

const GRID_SPACING = 72;
const PARTICLE_LINK_DISTANCE = 140;
const WRAP_MARGIN = 18;
const VISIBILITY_GAIN = 1.35;

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let startTime = performance.now();
    let lastTime = startTime;

    const particles: Particle[] = [];

    const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
    const scaleAlpha = (alpha: number) => Math.min(1, alpha * VISIBILITY_GAIN);

    const resetParticles = () => {
      const count = width < 640 ? 18 : 30;
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: randomBetween(0, width),
          y: randomBetween(0, height),
          vx: randomBetween(-16, 16),
          vy: randomBetween(-16, 16),
          radius: randomBetween(1.2, 2.1),
          pulsePhase: randomBetween(0, Math.PI * 2),
          baseAlpha: randomBetween(0.24, 0.5),
        });
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      resetParticles();
    };

    const wrapParticle = (particle: Particle) => {
      if (particle.x < -WRAP_MARGIN) particle.x = width + WRAP_MARGIN;
      if (particle.x > width + WRAP_MARGIN) particle.x = -WRAP_MARGIN;
      if (particle.y < -WRAP_MARGIN) particle.y = height + WRAP_MARGIN;
      if (particle.y > height + WRAP_MARGIN) particle.y = -WRAP_MARGIN;
    };

    const drawGrid = (elapsed: number) => {
      const driftX = ((elapsed * 0.006) % GRID_SPACING + GRID_SPACING) % GRID_SPACING;
      const driftY = ((elapsed * 0.004) % GRID_SPACING + GRID_SPACING) % GRID_SPACING;

      context.save();
      context.strokeStyle = `rgba(167, 139, 250, ${scaleAlpha(0.03)})`;
      context.lineWidth = 1;

      for (let x = -GRID_SPACING; x <= width + GRID_SPACING; x += GRID_SPACING) {
        context.beginPath();
        context.moveTo(x + driftX, 0);
        context.lineTo(x + driftX, height);
        context.stroke();
      }

      for (let y = -GRID_SPACING; y <= height + GRID_SPACING; y += GRID_SPACING) {
        context.beginPath();
        context.moveTo(0, y + driftY);
        context.lineTo(width, y + driftY);
        context.stroke();
      }
      context.restore();
    };

    const drawOrbs = (elapsed: number) => {
      const t = elapsed * 0.001;
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const minSize = Math.min(width, height);
      const orbRadius = minSize * 0.33;
      const orbConfigs = [
        { ax: width * 0.28, ay: height * 0.2, fx: 0.38, fy: 0.24, phase: 0.0, alpha: 0.08 },
        { ax: width * 0.22, ay: height * 0.24, fx: 0.26, fy: 0.34, phase: 1.8, alpha: 0.06 },
        { ax: width * 0.3, ay: height * 0.18, fx: 0.31, fy: 0.29, phase: 3.2, alpha: 0.04 },
      ];

      orbConfigs.forEach((orb) => {
        const x = centerX + orb.ax * Math.sin(t * orb.fx + orb.phase);
        const y = centerY + orb.ay * Math.sin(t * orb.fy + orb.phase * 0.82);
        const gradient = context.createRadialGradient(x, y, 0, x, y, orbRadius);
        gradient.addColorStop(0, `rgba(167, 139, 250, ${scaleAlpha(orb.alpha)})`);
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, orbRadius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawParticles = (elapsed: number, delta: number) => {
      const t = elapsed * 0.001;

      if (!reducedMotion) {
        particles.forEach((particle) => {
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          wrapParticle(particle);
        });
      }

      context.save();
      context.lineWidth = 0.9;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > PARTICLE_LINK_DISTANCE) continue;
          const ratio = 1 - dist / PARTICLE_LINK_DISTANCE;
          context.strokeStyle = `rgba(167, 139, 250, ${scaleAlpha(0.08) * ratio})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
      context.restore();

      particles.forEach((particle) => {
        const pulse = 0.55 + 0.45 * Math.sin(t * 1.3 + particle.pulsePhase);
        const alpha = scaleAlpha(particle.baseAlpha * pulse);
        context.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    const render = (now: number) => {
      const elapsed = now - startTime;
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      context.clearRect(0, 0, width, height);
      drawGrid(elapsed);
      drawOrbs(elapsed);
      drawParticles(elapsed, delta);
    };

    const loop = (now: number) => {
      render(now);
      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(rafId);
      lastTime = performance.now();
      startTime = lastTime;
      if (reducedMotion) {
        render(lastTime);
      } else {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    resize();
    if (reducedMotion) {
      render(performance.now());
    } else {
      rafId = window.requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    reducedMotionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
