import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChatCard } from '@/components/ChatCard';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: 1, text: 'Get instant answers', active: true },
  { id: 2, text: 'Find creative inspiration', active: false },
  { id: 3, text: 'Learn something new', active: false },
];

export function AnswerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const card = cardRef.current;
    const list = listRef.current;

    if (!section || !headline || !card || !list) return;

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
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      
      scrollTl.fromTo(card,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(list,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Feature items stagger (5-30%)
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        scrollTl.fromTo(item,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05 + (idx * 0.04)
        );
      });

      // SETTLE (30-70%) - static

      // EXIT (70-100%)
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(list,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-pinned bg-auxerta-offwhite z-50"
    >
      {/* Chat Card - Left */}
      <div 
        ref={cardRef}
        className="absolute will-change-transform"
        style={{ 
          left: '8vw', 
          top: '14vh'
        }}
      >
        <ChatCard 
          className="!w-[44vw] !max-w-[600px] !h-[22vh]"
          responseText="I can help with explanations, brainstorming, drafting, and quick research—just ask."
        />
      </div>

      {/* Headline - Left */}
      <h2 
        ref={headlineRef}
        className="headline-xl text-auxerta-text absolute will-change-transform leading-none"
        style={{ 
          left: '8vw', 
          top: '46vh'
        }}
      >
        Answer<br />questions
      </h2>

      {/* Feature List - Right */}
      <div 
        ref={listRef}
        className="absolute will-change-transform"
        style={{ 
          left: '62vw', 
          top: '22vh',
          width: '28vw',
          maxWidth: '360px'
        }}
      >
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              ref={el => { itemRefs.current[index] = el; }}
              className="flex items-center gap-4 will-change-transform"
            >
              <div className={`dot-indicator ${feature.active ? 'active' : ''}`} />
              <span className="body-text text-auxerta-text">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
