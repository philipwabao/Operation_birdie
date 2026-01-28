import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { AnimatedBirds } from '../components/AnimatedBirds';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-auxerta-offwhite flex flex-col items-center justify-center pt-24 pb-16 px-[8vw] relative overflow-hidden"
    >


      <div
        ref={contentRef}
        className="w-full max-w-5xl will-change-transform relative z-10"
      >
        {/* Location Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-100/50">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="micro-text text-purple-700">US · Japan</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="headline-lg text-auxerta-text text-center mb-8">
          We build models that{' '}
          <span className="gradient-text">excel</span>
        </h1>

        {/* Contact CTA - Premium Style */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
          <span
            className="text-base text-auxerta-text/70 font-light"
            style={{ letterSpacing: '0.02em' }}
          >
            Need eval and training service contact us at
          </span>
          <a
            href="mailto:service@auxerta.com"
            className="inline-flex items-center px-6 py-2.5 rounded-md font-medium transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              color: '#7c3aed',
              letterSpacing: '0.01em',
            }}
          >
            service@auxerta.com
          </a>
        </div>

        {/* Service Categories - Premium Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {['Computer Vision', 'Natural Language', 'Custom Workflow'].map((service) => (
            <div
              key={service}
              className="group px-7 py-3.5 rounded-md cursor-default transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 245, 255, 0.8) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                boxShadow: '0 4px 24px rgba(139, 92, 246, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            >
              <span
                className="text-sm font-medium bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #1f1f23 0%, #4c1d95 100%)',
                  letterSpacing: '0.03em',
                }}
              >
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden shadow-card">
            {/* Header */}
            <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <div className="relative">
                <AnimatedBirds />
                <span className="micro-text text-auxerta-muted">AUXERTA: NEOGNATHAE</span>
              </div>
              <div className="w-16" />
            </div>

            {/* Chat Content */}
            <div className="p-8 min-h-[200px] flex items-center">
              <p className="text-2xl md:text-3xl font-display text-auxerta-text/30">
                Coming soon...
              </p>
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-sm text-auxerta-text/40 hover:text-auxerta-text/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="p-2 rounded-sm text-auxerta-text/40 hover:text-auxerta-text/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
              <button className="p-2 rounded-sm text-purple-600 hover:text-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          {/* NVIDIA Inception Badge */}
          <div className="flex justify-center mt-6">
            <img
              src="/nvidia-inception-badge.png"
              alt="NVIDIA Inception Program"
              style={{ minHeight: '30px', height: '40px' }}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
