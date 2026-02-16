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
  const [isVisible, setIsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const demoTabs = ['Model Specs', 'Benchmarks', 'API Example'] as const;
  type DemoTab = (typeof demoTabs)[number];
  const [activeDemoTab, setActiveDemoTab] = useState<DemoTab>('Model Specs');
  const activeDemoTabIndex = demoTabs.indexOf(activeDemoTab);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
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

  const closeChatWindow = () => {
    setIsChatWindowOpen(false);
  };

  const openChatWindow = () => {
    setIsChatWindowOpen(true);
  };

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
  const openRoleTitles = [
    'Founding ML Engineer',
    'Applied Research Engineer',
    'ML Infrastructure Engineer',
    'Data Operations Lead',
    'Research Scientist (Multimodal)',
  ] as const;

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
            <div id="services" className="scroll-mt-28" />
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
            <div
              data-reveal
              className={`interactive-card rounded-2xl border border-auxerta-text/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 anim-fade-in-up' : 'opacity-0 translate-y-10'
              }`}
              style={{
                height: '220px',
                transitionDuration: '800ms',
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: '420ms',
                animationDelay: isVisible ? '420ms' : undefined,
              }}
            >
              <div className="h-full p-4 sm:p-5 flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="micro-text text-auxerta-muted">Jobs Board</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-auxerta-accent/10 text-auxerta-accent font-medium uppercase tracking-wide">
                    {openRoleTitles.length} Roles
                  </span>
                </div>
                <div className="relative min-h-0 flex-1 rounded-xl border border-auxerta-text/10 bg-gradient-to-b from-white/95 to-auxerta-offwhite/70 p-2.5 sm:p-3 flex flex-col overflow-hidden">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-auxerta-accent/10 to-transparent" />
                  <div className="relative micro-text text-auxerta-muted mb-1.5">Open Roles</div>
                  <div className="relative min-h-0 flex-1 overflow-y-auto pr-1 space-y-1.5">
                    {openRoleTitles.map((title, index) => (
                      <div
                        key={title}
                        className="group flex items-center gap-2 rounded-lg border border-auxerta-text/10 bg-white/90 px-2.5 py-2 transition-colors hover:border-auxerta-accent/25 hover:bg-white"
                      >
                        <span className="text-[10px] font-semibold tracking-[0.12em] text-auxerta-muted/90 tabular-nums">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs sm:text-[13px] font-medium leading-tight text-auxerta-text/85">
                          {title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="relative mt-2 rounded-lg border border-auxerta-text/10 bg-auxerta-accent/5 px-2.5 py-2">
                    <p className="text-[11px] sm:text-xs leading-relaxed text-auxerta-text/75">
                      We are currently updating the job board.
                    </p>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-auxerta-text/75">
                      Please send resume and cover letter to{' '}
                      <a
                        href="mailto:partner@auxerta.com"
                        className="font-medium text-auxerta-accent hover:text-auxerta-accent-strong transition-colors"
                      >
                        partner@auxerta.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="blog-preview"
              data-reveal
              className={`interactive-card relative overflow-hidden rounded-2xl border border-auxerta-text/10 bg-white/70 p-4 sm:p-5 shadow-sm backdrop-blur-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 anim-fade-in-up' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDuration: '800ms',
                transitionTimingFunction: 'var(--ease-out-expo)',
                transitionDelay: '520ms',
                animationDelay: isVisible ? '520ms' : undefined,
              }}
            >
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-auxerta-accent/14 blur-2xl"
                  style={{ animation: 'blog-blob-float-a 8.4s ease-in-out infinite' }}
                />
                <div
                  className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-auxerta-accent-glow/12 blur-2xl"
                  style={{ animation: 'blog-blob-float-b 10.2s ease-in-out infinite' }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(167,139,250,0.1),transparent_45%)]" />
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-auxerta-accent/8 to-transparent" />
              </div>
              <div className="relative flex items-center justify-between">
                <span className="micro-text text-auxerta-muted">Blog</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-auxerta-accent/10 text-auxerta-accent font-medium uppercase tracking-wide">
                  Latest
                </span>
              </div>
              <a
                href="./blog/how-we-validate-domain-data-before-model-training/"
                className="group relative mt-3 block overflow-hidden rounded-xl border border-auxerta-text/10 bg-gradient-to-b from-white/95 to-auxerta-offwhite/75 px-3 py-3 sm:py-3.5 transition-colors hover:border-auxerta-accent/25 hover:from-white hover:to-white"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0),rgba(167,139,250,0.14),rgba(56,189,248,0.1),rgba(255,255,255,0))] translate-x-[-38%] transition-transform duration-700 group-hover:translate-x-[22%]" />
                </div>
                <div className="relative flex items-start gap-2.5">
                  <span className="mt-0.5 h-7 w-1.5 rounded-full bg-gradient-to-b from-auxerta-accent/50 to-auxerta-accent-glow/45" />
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-auxerta-muted mb-1">Data Ops · January 2026 · 5 min read</p>
                    <p className="text-xs sm:text-sm font-medium leading-snug text-auxerta-text/90">
                      How We Validate Domain Data Before Model Training
                    </p>
                  </div>
                </div>
              </a>
              <div className="relative mt-3 pt-3 border-t border-auxerta-text/10 flex items-center justify-center rounded-lg bg-white/45">
                <img
                  src="/nvidia-inception-badge.png"
                  alt="NVIDIA Inception Program"
                  style={{ minHeight: '32px', height: '32px' }}
                  className="object-contain"
                />
              </div>
              <style>{`
                @keyframes blog-blob-float-a {
                  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                  50% { transform: translate3d(-10px, 6px, 0) scale(1.08); }
                }
                @keyframes blog-blob-float-b {
                  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                  50% { transform: translate3d(9px, -7px, 0) scale(1.07); }
                }
              `}</style>
            </div>
          </div>

          {/* Chat Interface */}
          <div id="models" className="order-1 lg:order-2 space-y-6 scroll-mt-28">
            {isChatWindowOpen ? (
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
                  <button
                    type="button"
                    onClick={closeChatWindow}
                    aria-label="Close preview panel"
                    className="w-8 h-8 rounded-md text-auxerta-text/40 hover:text-auxerta-text/70 hover:bg-auxerta-text/5 transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
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
                      style={{
                        width: 'calc(100% / 3)',
                        transform: `translate3d(${activeDemoTabIndex * 100}%, 0, 0)`
                      }}
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
            ) : (
              <div
                data-reveal
                className={`flex items-center justify-end transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionTimingFunction: 'var(--ease-out-expo)',
                  transitionDelay: '500ms',
                }}
              >
                <button
                  type="button"
                  onClick={openChatWindow}
                  aria-label="Open preview panel"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-auxerta-accent text-white shadow-lg shadow-auxerta-accent/30 hover:bg-auxerta-accent-dark transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            )}

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
                  <div className="text-sm font-medium text-auxerta-text">Discuss Your Use Case</div>
                  <p className="mt-1 text-xs text-auxerta-muted max-w-md">
                    Tell us your domain, constraints, and timeline. We reply within 1 business day.
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1.5">
                  <a
                    href="mailto:contact@auxerta.com"
                    className="inline-flex items-center justify-center rounded-full border border-auxerta-text/10 bg-white px-5 py-2.5 text-sm font-medium text-auxerta-text hover:bg-auxerta-text/5 transition-colors"
                  >
                    Contact Team
                  </a>
                  <span className="text-xs text-auxerta-muted">Typical response: 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
