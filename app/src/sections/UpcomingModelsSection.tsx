import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    id: 1,
    name: 'Model Alpha',
    image: '/model-1.jpg'
  },
  {
    id: 2,
    name: 'Model Beta',
    image: '/model-2.jpg'
  },
  {
    id: 3,
    name: 'Model Gamma',
    image: '/model-3.jpg'
  },
  {
    id: 4,
    name: 'Model Delta',
    image: '/model-4.jpg'
  },
];

export function UpcomingModelsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
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
      id="models"
      className="bg-auxerta-dark py-24 px-[8vw]"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
          Upcoming Models
        </h2>

        {/* Models Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {models.map((model) => (
            <div
              key={model.id}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[21/9]"
            >
              {/* Background Image */}
              <img
                src={model.image}
                alt={model.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  {model.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
