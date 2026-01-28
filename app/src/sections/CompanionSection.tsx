import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChatCard } from '@/components/ChatCard';

gsap.registerPlugin(ScrollTrigger);

export function CompanionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;

    if (!section || !headline || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headline,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(card,
        { y: '-30vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // SETTLE (30-70%) - static

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(card,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-10vh', scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned bg-auxerta-offwhite z-40"
    >
      {/* Chat Card - Centered */}
      <div 
        ref={cardRef}
        className="absolute will-change-transform"
        style={{ 
          left: '50%', 
          top: '18vh',
          transform: 'translateX(-50%)'
        }}
      >
        <ChatCard 
          placeholder="Coming soon..."
        />
      </div>

      {/* Headline - Centered */}
      <h2 
        ref={headlineRef}
        className="headline-lg text-auxerta-text text-center absolute will-change-transform"
        style={{ 
          left: '50%', 
          top: '60vh',
          transform: 'translateX(-50%)',
          maxWidth: '84vw'
        }}
      >
        Your everyday AI companion
      </h2>
    </section>
  );
}
