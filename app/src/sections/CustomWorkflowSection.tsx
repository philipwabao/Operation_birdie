import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, Users, GitBranch, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Users, label: 'Discovery', desc: 'Understand your needs' },
  { icon: Settings, label: 'Schema Design', desc: 'Define the structure' },
  { icon: GitBranch, label: 'Edge Cases', desc: 'Handle exceptions' },
  { icon: Sparkles, label: 'Iteration', desc: 'Refine & improve' },
];

export function CustomWorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelector('.content'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-auxerta-offwhite py-24 px-[8vw] border-t border-purple-100"
    >
      <div className="content max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="micro-text text-purple-600 mb-4 block">03</span>
          <h2 className="headline-md text-auxerta-text mb-4">
            Custom Workflows
          </h2>
          <p className="body-text text-auxerta-muted max-w-xl mx-auto">
            Need something specific? We'll work with you to define the schema, 
            handle edge cases, and iterate.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500" />

          {/* Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-purple-200 flex items-center justify-center mb-4 shadow-sm relative z-10">
                    <Icon className="w-7 h-7 text-purple-600" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <span className="text-sm font-bold text-purple-700">{i + 1}</span>
                  </div>
                  
                  {/* Label */}
                  <h4 className="text-sm font-semibold text-auxerta-text mb-1">{step.label}</h4>
                  <p className="text-xs text-auxerta-muted">{step.desc}</p>

                  {/* Checkmark */}
                  <div className="mt-3 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-purple-100 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">∞</div>
            <div className="text-xs text-auxerta-muted">Schema Flexibility</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-xs text-auxerta-muted">Edge Case Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-xs text-auxerta-muted">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
