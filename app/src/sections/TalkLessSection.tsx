import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChatCard } from '@/components/ChatCard';

gsap.registerPlugin(ScrollTrigger);

export function TalkLessSection() {
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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(card,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // SETTLE (30-70%) - static

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '-42vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned bg-auxerta-offwhite z-20"
    >
      {/* Headline - Left */}
      <h2 
        ref={headlineRef}
        className="headline-xl text-auxerta-text absolute will-change-transform"
        style={{ 
          left: '8vw', 
          top: '50%', 
          transform: 'translateY(-50%)'
        }}
      >
        Talk less
      </h2>

      {/* Chat Card - Right */}
      <div 
        ref={cardRef}
        className="absolute will-change-transform"
        style={{ 
          left: '58vw', 
          top: '18vh'
        }}
      >
        <ChatCard 
          className="!w-[34vw] !max-w-[480px]"
          placeholder="Coming soon..."
        />
      </div>
    </section>
  );
}
