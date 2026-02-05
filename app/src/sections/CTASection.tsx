import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
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
      id="contact"
      className="bg-gradient-to-b from-auxerta-offwhite to-purple-50 py-24 px-[8vw]"
    >
      <div className="content max-w-3xl mx-auto text-center">
        <h2 className="headline-md text-auxerta-text mb-6">
          Ready to work with us?
        </h2>
        
        <p className="body-text text-auxerta-muted mb-10">
          Let's discuss how Auxerta can help you build better models.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="mailto:partner@auxerta.com"
            className="btn-accent text-base px-8 py-4 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Team Locations */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-purple-100">
          <div className="text-center">
            <div className="text-2xl mb-1">🇺🇸</div>
            <div className="text-xs text-auxerta-muted">United States</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🇯🇵</div>
            <div className="text-xs text-auxerta-muted">Japan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
