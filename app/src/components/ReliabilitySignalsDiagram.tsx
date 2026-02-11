import { useEffect, useRef } from 'react';

export function ReliabilitySignalsDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    let rafId = 0;
    let lastFrame = 0;
    const start = performance.now();
    const minFrameMs = 1000 / 30;

    const tick = (now: number) => {
      const root = wrapRef.current;
      if (!root) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (document.hidden || now - lastFrame < minFrameMs) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastFrame = now;

      const t = (now - start) / 1000;
      const cycle = (Math.PI * 2 * t) / 7.6;
      const sin = (phase: number) => Math.sin(cycle + phase);
      const pulse = (phase: number) => (sin(phase) + 1) / 2;

      root.style.setProperty('--loop-offset', `${-((t * 15.5) % 100).toFixed(3)}`);
      root.style.setProperty('--pip-offset', `${-((t * 34.0) % 100).toFixed(3)}`);
      root.style.setProperty('--conn-a-offset', `${-((t * 23.0 + 0) % 100).toFixed(3)}`);
      root.style.setProperty('--conn-b-offset', `${-((t * 23.0 + 18) % 100).toFixed(3)}`);
      root.style.setProperty('--conn-c-offset', `${-((t * 23.0 + 36) % 100).toFixed(3)}`);
      root.style.setProperty('--conn-d-offset', `${-((t * 23.0 + 54) % 100).toFixed(3)}`);

      root.style.setProperty('--node-a-y', `${(-1.25 * sin(0)).toFixed(3)}px`);
      root.style.setProperty('--node-b-y', `${(-1.25 * sin(Math.PI / 2)).toFixed(3)}px`);
      root.style.setProperty('--node-c-y', `${(-1.25 * sin(Math.PI)).toFixed(3)}px`);
      root.style.setProperty('--node-d-y', `${(-1.25 * sin((Math.PI * 3) / 2)).toFixed(3)}px`);

      root.style.setProperty('--node-a-border', (0.10 + 0.10 * pulse(0)).toFixed(3));
      root.style.setProperty('--node-b-border', (0.10 + 0.10 * pulse(Math.PI / 2)).toFixed(3));
      root.style.setProperty('--node-c-border', (0.10 + 0.10 * pulse(Math.PI)).toFixed(3));
      root.style.setProperty('--node-d-border', (0.10 + 0.10 * pulse((Math.PI * 3) / 2)).toFixed(3));
      root.style.setProperty('--core-glow', (0.62 + 0.16 * pulse(Math.PI / 3)).toFixed(3));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="aux-rel-wrap relative mt-3 rounded-xl border border-white/10 bg-gradient-to-b from-[#0F1117] to-[#0B0C10] p-4 text-white/80 shadow-[0_18px_46px_rgba(2,6,23,0.42)] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(700px 240px at 25% 20%, rgba(196,165,224,0.24), transparent 58%), radial-gradient(520px 220px at 78% 72%, rgba(56,189,248,0.10), transparent 60%)',
        }}
      />

      <div className="relative w-full aspect-[16/10]">
        <div className="aux-rel-grid" aria-hidden="true" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="aux-rel-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(196,165,224,0.55)" />
              <stop offset="0.5" stopColor="rgba(148,163,184,0.35)" />
              <stop offset="1" stopColor="rgba(196,165,224,0.45)" />
            </linearGradient>
          </defs>

          {/* Outer loop */}
          <rect
            x="16"
            y="18"
            width="68"
            height="64"
            rx="8"
            ry="8"
            fill="none"
            stroke="rgba(148,163,184,0.14)"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            className="aux-rel-dash aux-rel-loop"
            x="16"
            y="18"
            width="68"
            height="64"
            rx="8"
            ry="8"
            pathLength={100}
            fill="none"
            stroke="url(#aux-rel-stroke)"
            strokeWidth="1.35"
            strokeDasharray="8 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            className="aux-rel-dash aux-rel-pip"
            x="16"
            y="18"
            width="68"
            height="64"
            rx="8"
            ry="8"
            pathLength={100}
            fill="none"
            stroke="rgba(56,189,248,0.55)"
            strokeWidth="2.1"
            strokeDasharray="2 98"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Converging control lines */}
          <path
            className="aux-rel-dash aux-rel-conn aux-rel-conn-a"
            d="M23 26 L50 50"
            pathLength={100}
            fill="none"
            stroke="rgba(196,165,224,0.32)"
            strokeWidth="1.1"
            strokeDasharray="6 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="aux-rel-dash aux-rel-conn aux-rel-conn-b"
            d="M77 26 L50 50"
            pathLength={100}
            fill="none"
            stroke="rgba(196,165,224,0.26)"
            strokeWidth="1.1"
            strokeDasharray="6 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="aux-rel-dash aux-rel-conn aux-rel-conn-c"
            d="M23 74 L50 50"
            pathLength={100}
            fill="none"
            stroke="rgba(196,165,224,0.22)"
            strokeWidth="1.1"
            strokeDasharray="6 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="aux-rel-dash aux-rel-conn aux-rel-conn-d"
            d="M77 74 L50 50"
            pathLength={100}
            fill="none"
            stroke="rgba(196,165,224,0.28)"
            strokeWidth="1.1"
            strokeDasharray="6 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Nodes */}
        <div className="aux-rel-node aux-rel-a">
          <div className="aux-rel-top">
            <span className="aux-rel-dot" />
            <span className="aux-rel-micro">Input</span>
          </div>
          <div className="aux-rel-title">Traceability</div>
          <div className="aux-rel-sub">source recorded</div>
        </div>

        <div className="aux-rel-node aux-rel-b">
          <div className="aux-rel-top">
            <span className="aux-rel-dot" />
            <span className="aux-rel-micro">Quality</span>
          </div>
          <div className="aux-rel-title">Review</div>
          <div className="aux-rel-sub">sample audited</div>
        </div>

        <div className="aux-rel-node aux-rel-c">
          <div className="aux-rel-top">
            <span className="aux-rel-dot" />
            <span className="aux-rel-micro">Format</span>
          </div>
          <div className="aux-rel-title">Consistency</div>
          <div className="aux-rel-sub">schema stable</div>
        </div>

        <div className="aux-rel-node aux-rel-d">
          <div className="aux-rel-top">
            <span className="aux-rel-dot" />
            <span className="aux-rel-micro">Task</span>
          </div>
          <div className="aux-rel-title">Alignment</div>
          <div className="aux-rel-sub">goal matched</div>
        </div>

        {/* Center core */}
        <div className="aux-rel-core" aria-hidden="true">
          <div className="aux-rel-core-glow" />
          <div className="aux-rel-icon-inner">
            <div className="aux-rel-pill" aria-hidden="true">
              <span className="aux-rel-pill-bar aux-rel-pill-bar-1" />
              <span className="aux-rel-pill-bar aux-rel-pill-bar-2" />
              <span className="aux-rel-pill-bar aux-rel-pill-bar-3" />
            </div>
          </div>
        </div>
      </div>

      <dl className="aux-rel-glossary" aria-label="Signal definitions">
        <div className="aux-rel-gloss-item">
          <dt className="aux-rel-gloss-key">1. Traceability</dt>
          <dd className="aux-rel-gloss-value">Source and usage metadata is recorded.</dd>
        </div>
        <div
          className="aux-rel-sep h-px w-full bg-gradient-to-r from-transparent via-auxerta-text/15 to-transparent"
          aria-hidden="true"
        />
        <div className="aux-rel-gloss-item">
          <dt className="aux-rel-gloss-key">2. Review</dt>
          <dd className="aux-rel-gloss-value">Sample-level checks confirm quality and labels.</dd>
        </div>
        <div
          className="aux-rel-sep h-px w-full bg-gradient-to-r from-transparent via-auxerta-text/15 to-transparent"
          aria-hidden="true"
        />
        <div className="aux-rel-gloss-item">
          <dt className="aux-rel-gloss-key">3. Alignment</dt>
          <dd className="aux-rel-gloss-value">Data is mapped to task requirements.</dd>
        </div>
        <div
          className="aux-rel-sep h-px w-full bg-gradient-to-r from-transparent via-auxerta-text/15 to-transparent"
          aria-hidden="true"
        />
        <div className="aux-rel-gloss-item">
          <dt className="aux-rel-gloss-key">4. Consistency</dt>
          <dd className="aux-rel-gloss-value">Formatting and labels remain stable across batches.</dd>
        </div>
      </dl>

      <div className="sr-only">
        Reliability loop: traceability, review, alignment, and consistency for controlled model improvement.
      </div>

      <style>{`
        .aux-rel-wrap { position: relative; }
        .aux-rel-grid {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background-image:
            linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 14px 14px;
          mask-image: radial-gradient(circle at 50% 45%, black 0%, transparent 78%);
          opacity: 0.22;
          pointer-events: none;
        }

        .aux-rel-dash { will-change: stroke-dashoffset; }
        .aux-rel-loop { stroke-dashoffset: var(--loop-offset, 0); opacity: 0.8; }
        .aux-rel-pip { stroke-dashoffset: var(--pip-offset, 0); opacity: 0.78; }
        .aux-rel-conn { opacity: 0.86; }
        .aux-rel-conn-a { stroke-dashoffset: var(--conn-a-offset, 0); }
        .aux-rel-conn-b { stroke-dashoffset: var(--conn-b-offset, 0); }
        .aux-rel-conn-c { stroke-dashoffset: var(--conn-c-offset, 0); }
        .aux-rel-conn-d { stroke-dashoffset: var(--conn-d-offset, 0); }

        .aux-rel-node {
          position: absolute;
          width: 46%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
          padding: 10px 12px;
          box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          will-change: border-color, box-shadow;
        }
        .aux-rel-a {
          left: 0;
          top: 0;
          transform: translate3d(0, var(--node-a-y, 0px), 0);
          border-color: rgba(196,165,224,var(--node-a-border,0.12));
        }
        .aux-rel-b {
          right: 0;
          top: 0;
          transform: translate3d(0, var(--node-b-y, 0px), 0);
          border-color: rgba(196,165,224,var(--node-b-border,0.12));
        }
        .aux-rel-c {
          left: 0;
          bottom: 0;
          transform: translate3d(0, var(--node-c-y, 0px), 0);
          border-color: rgba(196,165,224,var(--node-c-border,0.12));
        }
        .aux-rel-d {
          right: 0;
          bottom: 0;
          transform: translate3d(0, var(--node-d-y, 0px), 0);
          border-color: rgba(196,165,224,var(--node-d-border,0.12));
        }

        .aux-rel-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .aux-rel-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(196,165,224,0.75);
          box-shadow: 0 0 0 3px rgba(196,165,224,0.10);
        }
        .aux-rel-micro {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.55);
        }
        .aux-rel-title {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(226, 232, 240, 0.86);
        }
        .aux-rel-sub {
          margin-top: 4px;
          font-size: 12px;
          color: rgba(148, 163, 184, 0.72);
        }

        .aux-rel-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 96px;
          height: 96px;
          transform: translate(-50%, -50%);
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.14);
          background: radial-gradient(circle at 32% 18%, rgba(255,255,255,0.06), rgba(15,17,23,0.60) 42%, rgba(11,12,16,0.92) 100%);
          box-shadow: 0 22px 70px rgba(2, 6, 23, 0.55);
          overflow: hidden;
        }
        .aux-rel-core::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.10), transparent 56%);
          opacity: 0.55;
          pointer-events: none;
        }
        .aux-rel-core-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 35% 35%, rgba(196,165,224,0.20), transparent 62%),
                      radial-gradient(circle at 70% 75%, rgba(56,189,248,0.10), transparent 64%);
          opacity: var(--core-glow, 0.72);
        }
        .aux-rel-icon-inner {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .aux-rel-pill {
          display: inline-flex;
          align-items: flex-end;
          gap: 7px;
          padding: 10px 12px;
          border-radius: 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 18px 46px rgba(2, 6, 23, 0.42), inset 0 1px 0 rgba(255,255,255,0.06);
          transform: translate3d(0, 0, 0);
        }
        .aux-rel-pill-bar {
          width: 12px;
          height: 38px;
          border-radius: 999px;
          transform-origin: 50% 100%;
          transform: none;
          will-change: filter;
          filter: saturate(1.06);
        }
        .aux-rel-pill-bar-1 {
          background: linear-gradient(180deg, rgba(167,243,208,0.95), rgba(56,189,248,0.95));
        }
        .aux-rel-pill-bar-2 {
          background: linear-gradient(180deg, rgba(56,189,248,0.95), rgba(37,99,235,0.95));
        }
        .aux-rel-pill-bar-3 {
          background: linear-gradient(180deg, rgba(37,99,235,0.95), rgba(124,58,237,0.95));
        }
        .aux-rel-glossary {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(148, 163, 184, 0.22);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .aux-rel-gloss-item {
          min-width: 0;
        }
        .aux-rel-sep {
          opacity: 0.85;
        }
        .aux-rel-gloss-key {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.72);
        }
        .aux-rel-gloss-value {
          margin-top: 4px;
          font-size: 11px;
          line-height: 1.45;
          color: rgba(148, 163, 184, 0.88);
          overflow-wrap: anywhere;
        }

        @media (prefers-reduced-motion: reduce) {
          .aux-rel-dash,
          .aux-rel-a,
          .aux-rel-b,
          .aux-rel-c,
          .aux-rel-d,
          .aux-rel-core-glow,
          .aux-rel-pill-bar {
            animation: none !important;
          }
          .aux-rel-loop,
          .aux-rel-pip,
          .aux-rel-conn {
            stroke-dashoffset: 0 !important;
          }
          .aux-rel-a,
          .aux-rel-b,
          .aux-rel-c,
          .aux-rel-d {
            transform: none !important;
            border-color: rgba(255,255,255,0.12) !important;
          }
          .aux-rel-core-glow { opacity: 0.72 !important; }
        }

        @media (max-width: 520px) {
          .aux-rel-core { width: 84px; height: 84px; border-radius: 18px; }
          .aux-rel-icon-inner { padding: 10px 10px 8px; }
          .aux-rel-pill { gap: 6px; padding: 9px 10px; border-radius: 16px; }
          .aux-rel-pill-bar { width: 11px; height: 32px; }
          .aux-rel-title { font-size: 11px; }
          .aux-rel-sub { font-size: 11px; }
          .aux-rel-node { padding: 9px 10px; }
        }
        @media (max-width: 400px) {
          .aux-rel-node {
            width: 48%;
            padding: 7px 8px;
          }
          .aux-rel-micro {
            font-size: 9px;
            letter-spacing: 0.12em;
          }
          .aux-rel-title { font-size: 10px; }
          .aux-rel-sub {
            margin-top: 3px;
            font-size: 10px;
          }
          .aux-rel-core {
            width: 76px;
            height: 76px;
            border-radius: 16px;
          }
          .aux-rel-pill {
            padding: 7px 8px;
            gap: 5px;
          }
          .aux-rel-pill-bar {
            width: 10px;
            height: 28px;
          }
          .aux-rel-gloss-key {
            font-size: 9px;
            letter-spacing: 0.11em;
          }
          .aux-rel-gloss-value {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
