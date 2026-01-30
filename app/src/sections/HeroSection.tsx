import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedBirds } from '../components/AnimatedBirds';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP animation removed to fix visibility issues

  // Hover explosion state removed





  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-auxerta-offwhite flex flex-col items-center justify-center pt-24 pb-16 px-[8vw] relative overflow-hidden"
    >


      <div
        ref={contentRef}
        className="w-full max-w-5xl will-change-transform relative z-10"
      >
        {/* Gradient Bars Mark */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-0.5">
            {/* Mint to Light Blue */}
            <div
              className="w-2.5 h-7 rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #A7F3D0 0%, #38BDF8 100%)',
                boxShadow: '0 2px 10px rgba(37, 99, 235, 0.15)'
              }}
            />
            {/* Light Blue to Blue */}
            <div
              className="w-2.5 h-7 rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #38BDF8 0%, #2563EB 100%)',
                boxShadow: '0 2px 10px rgba(37, 99, 235, 0.15)'
              }}
            />
            {/* Blue to Purple */}
            <div
              className="w-2.5 h-7 rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(180deg, #2563EB 0%, #7C3AED 100%)',
                boxShadow: '0 2px 10px rgba(37, 99, 235, 0.15)'
              }}
            />
          </div>
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

            {/* Chat Content - Demo Tabs */}
            <div className="p-6">
              {/* Tab Headers */}
              <div className="flex gap-2 mb-4 border-b border-purple-100">
                <button className="px-4 py-2 text-sm font-medium text-purple-600 border-b-2 border-purple-600">
                  Model Specs
                </button>
                <button className="px-4 py-2 text-sm font-medium text-auxerta-text/40 hover:text-auxerta-text/60">
                  Benchmarks
                </button>
                <button className="px-4 py-2 text-sm font-medium text-auxerta-text/40 hover:text-auxerta-text/60">
                  API Example
                </button>
              </div>

              {/* Model Specs Content */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-purple-50">
                  <span className="text-sm text-auxerta-muted">Context Window</span>
                  <span className="text-base font-mono font-medium text-purple-600">144K tokens</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-auxerta-muted">Full Specifications</span>
                  <span className="text-xs px-2 py-1 rounded-sm bg-purple-100 text-purple-700 font-medium">Coming Soon</span>
                </div>
              </div>
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

          {/* Upcoming Models Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-2">
            {[
              { name: 'Neognathae Owl', status: 'Coming Soon' },
              { name: 'Neognathae Parrot', status: 'Coming Soon' },
              { name: 'Neognathae Pidgin', status: 'Coming Soon' },
              { name: 'Neognathae Starling', status: 'Coming Soon' }
            ].map((model, i) => (
              <div key={i} className="bg-white/50 border border-purple-100 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all">
                <div className="text-xs font-mono font-bold text-auxerta-text mb-2">{model.name}</div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium uppercase tracking-wide">
                  {model.status}
                </span>
              </div>
            ))}
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
