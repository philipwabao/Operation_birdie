import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

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
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Purple Orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-40 blur-[100px] animate-orb-1"
          style={{
            background: 'radial-gradient(circle, #9B7BC7 0%, #7B5BA7 50%, transparent 70%)',
            top: '-10%',
            left: '-10%',
          }}
        />
        {/* Blue Orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-35 blur-[100px] animate-orb-2"
          style={{
            background: 'radial-gradient(circle, #4F7CFF 0%, #3B5FCC 50%, transparent 70%)',
            top: '20%',
            right: '-5%',
          }}
        />
        {/* Light Blue Orb */}
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-30 blur-[100px] animate-orb-3"
          style={{
            background: 'radial-gradient(circle, #7DD3FC 0%, #5BB8E0 50%, transparent 70%)',
            bottom: '10%',
            left: '10%',
          }}
        />
        {/* Mint / Light Green Orb */}
        <div
          className="absolute w-[450px] h-[450px] rounded-full opacity-35 blur-[100px] animate-orb-4"
          style={{
            background: 'radial-gradient(circle, #86EFAC 0%, #4ADE80 50%, transparent 70%)',
            bottom: '-5%',
            right: '15%',
          }}
        />
      </div>

      <div
        ref={contentRef}
        className="w-full max-w-5xl will-change-transform relative z-10"
      >
        {/* Location Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="micro-text text-purple-700">US · Japan</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="headline-lg text-auxerta-text text-center mb-8">
          We build models that{' '}
          <span className="gradient-text">excel</span>
        </h1>

        {/* Contact CTA - Capsule Style */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
          <span className="body-text text-auxerta-muted">If you need our eval and training service contact us at</span>
          <a
            href="mailto:service@auxerta.com"
            className="inline-flex items-center px-5 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-purple-700 font-medium shadow-md hover:shadow-lg border border-amber-200 transition-all"
          >
            service@auxerta.com
          </a>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="px-6 py-3 rounded-full bg-white border border-purple-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
            <span className="text-sm font-medium text-auxerta-text">Computer Vision</span>
          </div>
          <div className="px-6 py-3 rounded-full bg-white border border-purple-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
            <span className="text-sm font-medium text-auxerta-text">Natural Language</span>
          </div>
          <div className="px-6 py-3 rounded-full bg-white border border-purple-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
            <span className="text-sm font-medium text-auxerta-text">Custom Workflow</span>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[24px] border border-purple-100 overflow-hidden shadow-card">
            {/* Header */}
            <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <span className="micro-text text-auxerta-muted">AUXERTA: NEOGNATHAE</span>
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
                <button className="p-2 rounded-lg text-auxerta-text/40 hover:text-auxerta-text/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="p-2 rounded-lg text-auxerta-text/40 hover:text-auxerta-text/60 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
              <button className="p-2 rounded-lg text-purple-600 hover:text-purple-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
