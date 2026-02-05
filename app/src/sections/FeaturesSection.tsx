import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, BookOpen, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: 'Brainstorm',
    description: 'Explore ideas quickly without losing context.',
    icon: Lightbulb,
  },
  {
    id: 2,
    title: 'Learn',
    description: 'Break down complex topics into clear steps.',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Write',
    description: 'Draft, edit, and rewrite with instant feedback.',
    icon: PenTool,
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;

    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features"
      className="bg-auxerta-offwhite py-[10vh] px-[8vw] z-60"
    >
      {/* Headline */}
      <div ref={headlineRef} className="mb-[10vh] will-change-transform">
        <h2 className="headline-lg text-auxerta-text mb-4">
          Get more out of Auxerta
        </h2>
        <p className="body-text text-auxerta-muted max-w-md">
          A simple, flexible approach to everyday tasks.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[3vw]">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              ref={el => { cardsRef.current[index] = el; }}
              className="chat-card p-8 flex flex-col will-change-transform"
              style={{ minHeight: '380px' }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-auxerta-text" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-2xl text-auxerta-text mb-3">
                {feature.title}
              </h3>
              <p className="body-text text-auxerta-muted flex-1">
                {feature.description}
              </p>

              {/* Decorative element */}
              <div className="mt-6 pt-6 border-t border-auxerta-text/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 rounded-full bg-accent" />
                  <div className="w-4 h-1 rounded-full bg-auxerta-text/20" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
