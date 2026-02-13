import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedBirds } from '../components/AnimatedBirds';
import { ReliabilitySignalsDiagram } from '../components/ReliabilitySignalsDiagram';
import { PrivateDeliveryMailAnimation } from '../components/PrivateDeliveryMailAnimation';
import { VerticalsNodeGraph } from '../components/VerticalsNodeGraph';
import { AmbientBackground } from '../components/AmbientBackground';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const dataSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const serverName = 'srv-aux01';
  const [sessionId] = useState(() => Math.random().toString(16).slice(2, 6).toUpperCase());
  const [agentPid] = useState(() => Math.floor(4200 + Math.random() * 2600));
  const [isVisible, setIsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [accessState, setAccessState] = useState<'idle' | 'verifying' | 'granted' | 'denied' | 'unavailable' | 'rate_limited'>('idle');
  const [briefingLines, setBriefingLines] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintPhase, setHintPhase] = useState<'idle' | 'loading' | 'typing' | 'done'>('idle');
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [hintTimes, setHintTimes] = useState<string[]>([]);
  const [traceLines, setTraceLines] = useState<{ text: string; level: string }[]>([]);
  const demoTabs = ['Model Specs', 'Benchmarks', 'API Example'] as const;
  const [activeDemoTab, setActiveDemoTab] = useState<(typeof demoTabs)[number]>('Model Specs');
  const activeDemoTabIndex = demoTabs.indexOf(activeDemoTab);
  const [dataPanel, setDataPanel] = useState<0 | 1 | 2>(0);
  const cycleDataPanel = (delta: -1 | 1) => {
    setDataPanel((prev) => (((prev + delta + 3) % 3) as 0 | 1 | 2));
  };

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const target = contactRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsContactVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const createHintTimes = (count: number) => {
    const randomBetween = (min: number, max: number) =>
      Math.floor(min + Math.random() * (max - min));
    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    const base = new Date();
    return Array.from({ length: count }, (_, index) => {
      const offsetSeconds = index === 0 ? 0 : randomBetween(1, 3) + index;
      return formatTime(new Date(base.getTime() + offsetSeconds * 1000));
    });
  };

  const hideHintTrace = () => {
    setShowHint(false);
    setHintPhase('idle');
    setTypedLines([]);
    setHintTimes([]);
    setTraceLines([]);
  };

  const runTrace = async () => {
    setShowHint(true);
    setHintPhase('loading');
    setTypedLines([]);
    setHintTimes([]);
    setTraceLines([]);
    try {
      const response = await fetch('/api/preview/trace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: accessKey.trim() })
      });
      if (response.status === 429) {
        const lines = [{ level: 'ERROR', text: 'trace service: rate limited' }];
        setTraceLines(lines);
        setHintTimes(createHintTimes(lines.length));
        return;
      }
      if (!response.ok) {
        const lines = [{ level: 'ERROR', text: 'trace service: unavailable' }];
        setTraceLines(lines);
        setHintTimes(createHintTimes(lines.length));
        return;
      }
      const data = await response.json().catch(() => ({}));
      const lines = Array.isArray(data?.trace) ? data.trace : [];
      const parsedLines = lines.length ? lines : [{ level: 'ERROR', text: 'trace: no output' }];
      setTraceLines(parsedLines);
      setHintTimes(createHintTimes(parsedLines.length));
    } catch {
      const lines = [{ level: 'ERROR', text: 'trace service: unavailable' }];
      setTraceLines(lines);
      setHintTimes(createHintTimes(lines.length));
    }
  };

  useEffect(() => {
    if (!showHint || !traceLines.length) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const randomBetween = (min: number, max: number) =>
      Math.floor(min + Math.random() * (max - min));

    const startTyping = () => {
      if (cancelled) return;
      setHintPhase('typing');

      let lineIndex = 0;
      let charIndex = 0;

      const typeNextChar = () => {
        if (cancelled) return;
        const lineText = traceLines[lineIndex]?.text ?? '';

        if (!lineText) {
          setHintPhase('done');
          return;
        }

        charIndex += 1;
        const partial = lineText.slice(0, charIndex);

        setTypedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = partial;
          return next;
        });

        if (charIndex < lineText.length) {
          timeouts.push(setTimeout(typeNextChar, randomBetween(18, 44)));
          return;
        }

        lineIndex += 1;
        charIndex = 0;

        if (lineIndex >= traceLines.length) {
          setHintPhase('done');
          return;
        }

        const pause = traceLines[lineIndex - 1]?.level === 'ERROR'
          ? randomBetween(320, 520)
          : randomBetween(180, 320);
        timeouts.push(setTimeout(typeNextChar, pause));
      };

      typeNextChar();
    };

    timeouts.push(setTimeout(startTyping, randomBetween(520, 900)));

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [showHint, traceLines]);

  const handleAccessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = accessKey.trim();
    if (!trimmed || accessState === 'verifying') return;
    setAccessState('verifying');
    try {
      const response = await fetch('/api/preview/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: trimmed })
      });
      if (response.status === 429) {
        setAccessState('rate_limited');
        setBriefingLines([]);
        return;
      }
      if (!response.ok) {
        setAccessState('unavailable');
        setBriefingLines([]);
        return;
      }
      const data = await response.json().catch(() => ({}));
      const ok = Boolean(data?.ok);
      setAccessState(ok ? 'granted' : 'denied');
      setBriefingLines(Array.isArray(data?.briefing) ? data.briefing : []);
    } catch {
      setAccessState('unavailable');
      setBriefingLines([]);
    }
  };

  // GSAP animation removed to fix visibility issues

  // Hover explosion state removed

  const dataPanels = [
    {
      kind: 'chips',
      kicker: 'Data Specialization',
      title: 'Domain-specific training data.',
      body: 'Each dataset is built for the target use case.',
      label: 'Domains',
      items: ['Biology', 'Chemistry', 'Physics', 'Materials', 'Medicine', 'Robotics'],
    },
    {
      kind: 'diagram',
      kicker: 'Reliability Signals',
      title: 'Verified training data.',
      body: 'We check and refine client data before model training.',
      label: '',
      items: ['Provenance', 'Review', 'Fit', 'Consistency'],
    },
    {
      kind: 'delivery',
      kicker: 'Release Controls',
      title: 'Controlled model handoff.',
      body: 'Signed artifacts, change logs, and role-based access.',
      label: '',
      items: ['Version History', 'Change Log', 'Access Control', 'API Handoff'],
    },
  ] as const;
  const activeDataPanel = dataPanels[dataPanel];





  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-auxerta-offwhite via-white to-auxerta-offwhite flex flex-col items-center justify-center pt-28 pb-24 px-4 md:px-[8vw] relative overflow-hidden"
    >
      {/* Ambient Background */}
      <AmbientBackground />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-auxerta-accent/10 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-auxerta-accent-glow/12 blur-3xl" />
        <div className="absolute bottom-[-120px] right-1/4 h-72 w-72 rounded-full bg-auxerta-text/4 blur-3xl" />
      </div>


      <div
        ref={contentRef}
        className="w-full max-w-6xl will-change-transform relative z-10"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] items-start">
          <div className="order-2 lg:order-1 space-y-5">
            {/* Gradient Bars Mark */}
            <div className="flex justify-start">
              <div className="flex gap-0.5">
                <div
                  className="w-2.5 h-7 rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #A7F3D0 0%, #38BDF8 100%)',
                    boxShadow: '0 2px 10px rgba(37, 99, 235, 0.15)'
                  }}
                />
                <div
                  className="w-2.5 h-7 rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #38BDF8 0%, #2563EB 100%)',
                    boxShadow: '0 2px 10px rgba(37, 99, 235, 0.15)'
                  }}
                />
                <div
                  className="w-2.5 h-7 rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(180deg, #2563EB 0%, #7C3AED 100%)',
                    boxShadow: '0 2px 10px rgba(37, 99, 235, 0.15)'
                  }}
                />
              </div>
            </div>

            {/* Private Preview Access */}
            <div id="services" className="scroll-mt-28" />
            <div
              id="private-preview"
              data-reveal
              className={`scroll-mt-28 interactive-card rounded-2xl border border-auxerta-text/10 bg-white/70 p-[14px] shadow-sm backdrop-blur-sm space-y-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 anim-fade-in-up' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDuration: '800ms',
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: '400ms',
                animationDelay: isVisible ? '400ms' : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="micro-text text-auxerta-muted">Private Preview</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-auxerta-accent/10 text-auxerta-accent font-medium uppercase tracking-wide">
                  Invite Only
                </span>
              </div>
              <form
                className="interactive-card flex items-center gap-2 rounded-xl border border-auxerta-text/10 bg-white px-3 py-2"
                onSubmit={handleAccessSubmit}
              >
                <input
                  type="password"
                  placeholder="Access key"
                  value={accessKey}
                  onChange={(event) => {
                    setAccessKey(event.target.value);
                    if (accessState !== 'idle') setAccessState('idle');
                    setBriefingLines([]);
                    hideHintTrace();
                  }}
                  disabled={accessState === 'granted' || accessState === 'verifying'}
                  autoComplete="off"
                  className="w-full bg-transparent text-sm text-auxerta-text placeholder:text-auxerta-text/40 focus:outline-none disabled:text-auxerta-text/40"
                />
                <button
                  type="submit"
                  className={`text-xs font-medium transition-colors ${accessState === 'granted'
                    ? 'text-auxerta-text/60'
                    : 'text-auxerta-accent hover:text-auxerta-accent-dark'
                    }`}
                >
                  {accessState === 'verifying' ? 'Verifying...' : accessState === 'granted' ? 'Access Granted' : 'Unlock'}
                </button>
              </form>
              {accessState === 'denied' && (
                <p className="text-xs text-auxerta-text/50">
                  Invalid key. Access is issued privately.
                </p>
              )}
              {accessState === 'unavailable' && (
                <p className="text-xs text-auxerta-text/50">
                  Verification service unavailable. Try again later.
                </p>
              )}
              {accessState === 'rate_limited' && (
                <p className="text-xs text-auxerta-text/50">
                  Too many attempts. Try again later.
                </p>
              )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div data-reveal className="interactive-card rounded-xl border border-auxerta-text/10 bg-white/80 px-3 py-1.5">
                    <div className="micro-text text-auxerta-muted">Status</div>
                    <div className="text-sm font-semibold text-auxerta-text">
                      {accessState === 'granted'
                        ? 'Verified'
                        : accessState === 'verifying'
                          ? 'Verifying'
                          : accessState === 'rate_limited'
                            ? 'Throttled'
                            : accessState === 'unavailable'
                              ? 'Offline'
                              : 'Active'}
                    </div>
                  </div>
                  <div data-reveal className="interactive-card rounded-xl border border-auxerta-text/10 bg-white/80 px-3 py-1.5">
                    <div className="micro-text text-auxerta-muted">Channel</div>
                    <div className="text-sm font-semibold text-auxerta-text">
                      {accessState === 'granted'
                        ? 'Enrolled'
                        : accessState === 'verifying'
                          ? 'Pending'
                          : 'Closed'}
                    </div>
                  </div>
                </div>
              <div data-reveal className="interactive-card rounded-xl border border-auxerta-text/10 bg-white/80 px-3 py-2.5">
                <div className="micro-text text-auxerta-muted mb-2">Briefing</div>
                {accessState === 'granted' && briefingLines.length > 0 ? (
                  <div className="space-y-1 text-xs font-mono text-auxerta-text/70">
                    {briefingLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 text-xs font-mono text-auxerta-text/50">
                    <div>▲▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒</div>
                    <div>▲▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒</div>
                    <div>▲▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒</div>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-auxerta-text/10 pt-2.5">
                  <span className="micro-text text-auxerta-muted">Agent Trace</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (showHint) {
                        hideHintTrace();
                        return;
                      }
                      runTrace();
                    }}
                    className="text-xs font-medium text-auxerta-accent hover:text-auxerta-accent-dark transition-colors"
                  >
                    {showHint ? 'Hide Trace' : 'Run Trace'}
                  </button>
                </div>

                {showHint && (
                  <div data-reveal className="interactive-card mt-3 rounded-xl border border-white/10 bg-[#0F1116] text-white/65 px-4 py-3 font-mono text-[11px] sm:text-[12px] leading-[1.45] relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.02), transparent 45%)'
                      }}
                    />
                    {/* Scanline removed */}
                    <div className="relative min-h-[120px] space-y-2">
                      <div className="agent-header">
                        <div className="agent-title">
                          <img
                            src="/favicon.png"
                            alt=""
                            aria-hidden="true"
                            className="agent-mark"
                          />
                          <span>auxerta.agent@{serverName}</span>
                        </div>
                        <div className="agent-meta">/var/log/auxerta-agent · session {sessionId}</div>
                      </div>
                      {hintPhase === 'loading' && (
                        <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-[0.2em]">
                          <span className="agent-spinner" />
                          <span>initializing</span>
                        </div>
                      )}
                      {hintPhase !== 'loading' && traceLines.length > 0 && (
                        <div className="space-y-1">
                          {typedLines.map((lineText, index) => (
                            <div
                              key={`${traceLines[index]?.text ?? index}-${index}`}
                              className={`agent-line${traceLines[index]?.level === 'ERROR' ? ' agent-error' : ''}`}
                            >
                              <span className="agent-time">{hintTimes[index] ?? '--:--:--'}</span>
                              <span className="agent-prefix">auxerta-agent[{agentPid}]</span>
                              <span className={`agent-level agent-level-${(traceLines[index]?.level ?? 'INFO').toLowerCase()}`}>
                                {traceLines[index]?.level ?? 'INFO'}
                              </span>
                              <span className="agent-text">{lineText}</span>
                              {hintPhase === 'typing' && index === typedLines.length - 1 && (
                                <span className="agent-inline-caret" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {hintPhase === 'typing' && traceLines.length > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-white/40">
                        <span>decoding</span>
                        <span className="agent-dot">.</span>
                        <span className="agent-dot agent-dot-2">.</span>
                        <span className="agent-dot agent-dot-3">.</span>
                      </div>
                    )}
                    {hintPhase !== 'loading' && traceLines.length === 0 && (
                      <div className="mt-2 text-xs text-white/55">
                        trace unavailable
                      </div>
                    )}
                    <style>{`
                      @keyframes agent-scan {
                        0% { transform: translateY(-120%); opacity: 0; }
                        35% { opacity: 0.4; }
                        100% { transform: translateY(120%); opacity: 0; }
                      }
                      @keyframes agent-flicker {
                        0%, 100% { opacity: 0.92; }
                        50% { opacity: 1; }
                      }
                      @keyframes caret-blink {
                        0%, 70% { opacity: 1; }
                        100% { opacity: 0; }
                      }
                      .agent-line {
                        display: grid;
                        grid-template-columns: 64px 112px 56px 1fr;
                        align-items: center;
                        column-gap: 10px;
                        color: rgba(226, 232, 240, 0.72);
                        font-variant-ligatures: none;
                        animation: agent-flicker 3.2s ease-in-out infinite;
                      }
                      @media (max-width: 520px) {
                        .agent-line {
                          grid-template-columns: 56px 1fr;
                          column-gap: 8px;
                        }
                        .agent-prefix,
                        .agent-level {
                          display: none;
                        }
                      }
                      .agent-header {
                        display: grid;
                        grid-template-columns: minmax(0, 1fr);
                        row-gap: 4px;
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: 0.12em;
                        color: rgba(148, 163, 184, 0.7);
                        padding-bottom: 6px;
                        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
                      }
                      @media (min-width: 700px) {
                        .agent-header {
                          grid-template-columns: minmax(0, 1fr) auto;
                          column-gap: 12px;
                          align-items: center;
                        }
                      }
                      .agent-title {
                        font-weight: 600;
                        color: rgba(226, 232, 240, 0.7);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        min-width: 0;
                      }
                      .agent-title span {
                        min-width: 0;
                        display: block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                      .agent-mark {
                        width: 14px;
                        height: 14px;
                        border-radius: 4px;
                        opacity: 0.92;
                      }
                      .agent-meta {
                        color: rgba(148, 163, 184, 0.7);
                        min-width: 0;
                        overflow-wrap: anywhere;
                        line-height: 1.25;
                      }
                      @media (min-width: 700px) {
                        .agent-meta {
                          justify-self: end;
                          text-align: right;
                        }
                      }
                      @media (max-width: 699px) {
                        .agent-title span {
                          white-space: normal;
                          text-overflow: clip;
                        }
                        .agent-meta {
                          font-size: 9px;
                          letter-spacing: 0.08em;
                        }
                      }
                      .agent-time {
                        color: rgba(148, 163, 184, 0.5);
                        font-size: 10px;
                      }
                      .agent-prefix {
                        color: rgba(148, 163, 184, 0.75);
                        letter-spacing: 0.02em;
                        font-size: 10px;
                      }
                      .agent-level {
                        font-size: 10px;
                        letter-spacing: 0.16em;
                        text-transform: uppercase;
                      }
                      .agent-level-info {
                        color: rgba(134, 239, 172, 0.7);
                      }
                      .agent-level-warn {
                        color: rgba(253, 224, 71, 0.75);
                      }
                      .agent-level-error {
                        color: rgba(248, 113, 113, 0.8);
                      }
                      .agent-text {
                        color: inherit;
                        min-width: 0;
                        overflow-wrap: anywhere;
                      }
                      .agent-error {
                        color: rgba(252, 165, 165, 0.95);
                        text-shadow: none;
                      }
                      .agent-spinner {
                        width: 14px;
                        height: 14px;
                        border-radius: 999px;
                        border: 2px solid rgba(255,255,255,0.25);
                        border-top-color: rgba(196,165,224,0.9);
                        animation: agent-spin 0.9s linear infinite;
                      }
                      @keyframes agent-spin {
                        to { transform: rotate(360deg); }
                      }
                      .agent-dot {
                        animation: agent-dot 1.1s ease-in-out infinite;
                        opacity: 0.3;
                      }
                      .agent-dot-2 {
                        animation-delay: 0.2s;
                      }
                      .agent-dot-3 {
                        animation-delay: 0.4s;
                      }
                      @keyframes agent-dot {
                        0%, 100% { opacity: 0.2; transform: translateY(0); }
                        50% { opacity: 1; transform: translateY(-2px); }
                      }
                      .agent-inline-caret {
                        display: inline-block;
                        width: 7px;
                        height: 12px;
                        margin-left: 4px;
                        background: rgba(196,165,224,0.9);
                        border-radius: 2px;
                        animation: caret-blink 1s steps(2, end) infinite, caret-jitter 2.8s ease-in-out infinite;
                        vertical-align: -1px;
                      }
                      @keyframes caret-jitter {
                        0%, 100% { transform: translate(0, 0); }
                        25% { transform: translate(0.5px, -0.5px); }
                        50% { transform: translate(-0.4px, 0.4px); }
                        75% { transform: translate(0.3px, 0.2px); }
                      }
                    `}</style>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-auxerta-text/15 to-transparent" />

            {/* Upcoming Models Cards */}
            <div
              id="models"
              data-reveal
              className={`scroll-mt-28 interactive-card rounded-2xl border border-auxerta-text/10 bg-white/70 p-4 sm:p-5 shadow-sm backdrop-blur-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 anim-fade-in-up' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDuration: '800ms',
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: '560ms',
                animationDelay: isVisible ? '560ms' : undefined,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { name: 'Neognathae Owl', status: 'Coming Soon' },
                  { name: 'Neognathae Parrot', status: 'Coming Soon' },
                  { name: 'Neognathae Pidgin', status: 'Coming Soon' },
                  { name: 'Neognathae Starling', status: 'Coming Soon' }
                ].map((model, i) => (
                  <div
                    key={i}
                    className={`shimmer-card interactive-card bg-white/90 border border-auxerta-text/10 rounded-xl p-3.5 sm:p-4 flex flex-col items-center justify-center text-center shadow-xs transition-all duration-700 ${
                      isVisible ? 'opacity-100 anim-scale-in' : 'opacity-0 translate-y-6 scale-95'
                    }`}
                    style={{
                      transitionDuration: '800ms',
                      transitionTimingFunction: 'var(--ease-spring)',
                      transitionDelay: `${600 + i * 100}ms`,
                      animationDelay: isVisible ? `${600 + i * 100}ms` : undefined,
                    }}
                  >
                    <div className="text-xs font-mono font-bold text-auxerta-text mb-2">{model.name}</div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-auxerta-accent/10 text-auxerta-accent font-medium uppercase tracking-wide">
                      {model.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NVIDIA Inception Badge */}
              <div data-reveal className="flex justify-start">
              <div className="interactive-card inline-flex items-center justify-center rounded-full border border-auxerta-text/10 bg-white/70 px-5 py-3 shadow-xs backdrop-blur-sm">
                <img
                  src="/nvidia-inception-badge.png"
                  alt="NVIDIA Inception Program"
                  style={{ minHeight: '28px', height: '32px' }}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="order-1 lg:order-2 space-y-6">
            <div
              data-reveal
              className={`interactive-card bg-white/95 rounded-2xl border border-auxerta-text/10 overflow-hidden shadow-card backdrop-blur-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 anim-slide-in-right' : 'opacity-0 translate-x-12'
              }`}
              style={{
                transitionDuration: '800ms',
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: '500ms',
                animationDelay: isVisible ? '500ms' : undefined,
              }}
            >
              {/* Header */}
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-auxerta-text/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-auxerta-text/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-auxerta-text/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-auxerta-text/10" />
                </div>
                <div className="relative">
                  <AnimatedBirds />
                  <span className="micro-text text-auxerta-muted">AUXERTA: NEOGNATHAE</span>
                </div>
                <div className="w-16" />
              </div>

              {/* Chat Content - Demo Tabs */}
              <div className="p-4 sm:p-6">
                {/* Tab Headers */}
                <div className="relative mb-4 border-b border-auxerta-text/10">
                  <div className="grid grid-cols-3 gap-1">
                    {demoTabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveDemoTab(tab)}
                        className={`tab-pill px-2 sm:px-3 py-2 text-[11px] sm:text-sm font-medium ${activeDemoTab === tab ? 'text-auxerta-accent-dark' : 'text-auxerta-text/45 hover:text-auxerta-text/70'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <span
                    className="tab-track"
                    style={{ transform: `translate3d(${activeDemoTabIndex * 100}%, 0, 0)` }}
                  />
                </div>

                {/* Tab Content */}
                {activeDemoTab === 'Model Specs' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-auxerta-text/5">
                      <span className="text-sm text-auxerta-muted">Context Window</span>
                      <span className="text-base font-mono font-medium text-auxerta-accent">144K tokens</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-auxerta-text/5">
                      <span className="text-sm text-auxerta-muted">Reasoning Profile</span>
                      <span className="text-xs px-2 py-1 rounded-sm bg-auxerta-accent/10 text-auxerta-accent-dark font-medium">Adaptive</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-auxerta-muted">Full Specifications</span>
                      <span className="text-xs px-2 py-1 rounded-sm bg-auxerta-accent/10 text-auxerta-accent-dark font-medium">Coming Soon</span>
                    </div>
                  </div>
                )}
                {activeDemoTab === 'Benchmarks' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-auxerta-muted">Benchmarks</span>
                      <span className="text-xs px-2 py-1 rounded-sm bg-auxerta-accent/10 text-auxerta-accent-dark font-medium">Coming Soon</span>
                    </div>
                  </div>
                )}
                {activeDemoTab === 'API Example' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-auxerta-muted">API Example</span>
                      <span className="text-xs px-2 py-1 rounded-sm bg-auxerta-accent/10 text-auxerta-accent-dark font-medium">Coming Soon</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="interactive-card px-4 sm:px-6 py-3.5 sm:py-4 border-t border-auxerta-text/10 flex items-center justify-between bg-white/70">
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-md text-auxerta-text/40 hover:text-auxerta-text/60 hover:bg-auxerta-text/5 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-md text-auxerta-text/40 hover:text-auxerta-text/60 hover:bg-auxerta-text/5 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
                <button className="send-icon-btn p-2 rounded-md text-auxerta-accent hover:text-auxerta-accent-dark hover:bg-auxerta-accent/10 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Domain Data Card */}
	            <div
                data-reveal
                className={`interactive-card rounded-2xl border border-auxerta-text/10 bg-white/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm transition-all duration-700 ${
                  isVisible ? 'opacity-100 anim-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDuration: '800ms',
                  transitionTimingFunction: 'var(--ease-out-expo)',
                  transitionDelay: '700ms',
                  animationDelay: isVisible ? '700ms' : undefined,
                }}
                onTouchStart={(event) => {
                  const touch = event.touches?.[0];
                  if (!touch) return;
                  dataSwipeStartRef.current = { x: touch.clientX, y: touch.clientY };
                }}
                onTouchEnd={(event) => {
                  const start = dataSwipeStartRef.current;
                  dataSwipeStartRef.current = null;
                  const touch = event.changedTouches?.[0];
                  if (!start || !touch) return;

                  const dx = touch.clientX - start.x;
                  const dy = touch.clientY - start.y;
                  const absDx = Math.abs(dx);
                  const absDy = Math.abs(dy);

                  // Avoid hijacking vertical scroll. Only treat as swipe when clearly horizontal.
                  if (absDx < 44 || absDx < absDy * 1.2) return;
                  cycleDataPanel(dx < 0 ? 1 : -1);
                }}
              >
	              <div className="flex items-start justify-between gap-4">
	                <div>
	                  <span className="micro-text text-auxerta-muted">{activeDataPanel.kicker}</span>
	                  <h3 className="mt-2 text-lg sm:text-xl font-display font-semibold text-auxerta-text">
	                    {activeDataPanel.title}
	                  </h3>
	                  <p className="mt-2 text-sm text-auxerta-muted max-w-lg">
	                    {activeDataPanel.body}
	                  </p>
	                </div>
	                <div className="shrink-0 flex items-center gap-1" role="tablist" aria-label="Data card panels">
	                  {dataPanels.map((panel, index) => {
	                    const isActive = dataPanel === index;
	                    return (
	                      <button
	                        key={panel.kicker}
	                        type="button"
	                        role="tab"
	                        aria-controls="data-panel-content"
	                        aria-selected={isActive}
	                        aria-label={panel.kicker}
	                        onClick={() => setDataPanel(index as 0 | 1 | 2)}
	                        className={`group inline-flex items-center justify-center rounded-full p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-auxerta-accent/40 ${isActive ? 'bg-auxerta-accent/10' : 'hover:bg-auxerta-text/5'
	                          }`}
	                      >
	                        <span
	                          className={`h-2 w-2 rounded-full transition-all ${isActive
	                            ? 'bg-auxerta-accent/85 shadow-[0_0_0_4px_rgba(196,165,224,0.14)]'
	                            : 'bg-auxerta-text/15 group-hover:bg-auxerta-text/25'
	                            }`}
	                        />
	                      </button>
	                    );
	                  })}
	                </div>
	              </div>

              <div
                id="data-panel-content"
                role="tabpanel"
                key={activeDataPanel.kicker}
                className="mt-5 data-panel-anim"
              >
                {activeDataPanel.label && (
                  <div className="micro-text text-auxerta-muted mb-2">{activeDataPanel.label}</div>
                )}
                {activeDataPanel.kind === 'diagram' ? (
                  <ReliabilitySignalsDiagram />
                ) : activeDataPanel.kind === 'delivery' ? (
                  <div className="space-y-3">
                    <PrivateDeliveryMailAnimation />
                    <div className="flex flex-wrap gap-2">
                      {activeDataPanel.items.map((item) => (
                        <span
                          key={item}
                          className="domain-chip inline-flex items-center rounded-full border border-auxerta-text/10 bg-white/70 px-3 py-1 text-xs font-medium text-auxerta-text/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {activeDataPanel.items.map((item) => (
                        <span
                          key={item}
                          className="domain-chip inline-flex items-center rounded-full border border-auxerta-text/10 bg-white/70 px-3 py-1 text-xs font-medium text-auxerta-text/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    {dataPanel === 0 && (
                      <div className="space-y-2.5">
                        <div data-reveal className="interactive-card rounded-xl border border-auxerta-text/10 bg-white/70 px-3 py-2.5">
                          <div className="micro-text text-auxerta-muted">Verticals</div>
                          <div className="mt-2">
                            <VerticalsNodeGraph />
                          </div>
                        </div>
                        <div data-reveal className="interactive-card rounded-xl border border-auxerta-text/10 bg-white/70 px-3 py-2.5">
                          <div className="micro-text text-auxerta-muted">Expertise Profile</div>
                          <p className="mt-1 text-xs text-auxerta-muted">
                            Contributors are Master&apos;s or PhD trained with certification and credentials, or have equivalent relevant domain experience.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <style>{`
                  @keyframes data-panel-in {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  .data-panel-anim { animation: data-panel-in 260ms ease-out both; }
                  @media (prefers-reduced-motion: reduce) {
                    .data-panel-anim { animation: none !important; }
                  }
                `}</style>
              </div>

              <div
                ref={contactRef}
                className={`mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-auxerta-text/10 pt-4 transition-all duration-700 ${
                  isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDuration: '800ms',
                  transitionTimingFunction: 'var(--ease-out-expo)',
                  transitionDelay: '120ms',
                }}
              >
                <div>
                  <div className="text-sm font-medium text-auxerta-text">Want to learn more?</div>
                  <a
                    href="mailto:contact@auxerta.com"
                    className="text-sm font-mono text-auxerta-muted hover:text-auxerta-text transition-colors"
                  >
                    contact@auxerta.com
                  </a>
                </div>
                <a
                  href="mailto:contact@auxerta.com"
                  className="inline-flex items-center justify-center rounded-full border border-auxerta-text/10 bg-white px-5 py-2.5 text-sm font-medium text-auxerta-text hover:bg-auxerta-text/5 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
