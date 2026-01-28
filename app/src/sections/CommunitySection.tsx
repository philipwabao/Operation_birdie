import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const avatars = [
  { id: 1, color: '#8B5CF6' },
  { id: 2, color: '#EC4899' },
  { id: 3, color: '#10B981' },
  { id: 4, color: '#F59E0B' },
  { id: 5, color: '#3B82F6' },
];

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const testimonial = testimonialRef.current;

    if (!section || !headline || !testimonial) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(headline,
        { x: -60, opacity: 0 },
        {
          x: 0,
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

      // Testimonial card animation
      gsap.fromTo(testimonial,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonial,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );

      // Avatars animation
      avatarsRef.current.forEach((avatar) => {
        if (!avatar) return;
        gsap.fromTo(avatar,
          { x: 60, scale: 0.9, opacity: 0 },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: avatar,
              start: 'top 90%',
              end: 'top 70%',
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
      id="community"
      className="bg-auxerta-offwhite py-[10vh] px-[8vw] z-70"
    >
      {/* Headline */}
      <h2 
        ref={headlineRef}
        className="headline-lg text-auxerta-text mb-[8vh] will-change-transform leading-none"
      >
        Join the<br />community
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Testimonial Card */}
        <div 
          ref={testimonialRef}
          className="chat-card p-8 will-change-transform"
        >
          <blockquote className="body-text text-auxerta-text text-lg mb-8 leading-relaxed">
            "Auxerta keeps me moving—quick answers, clean writing, and zero friction. It's become an essential part of my daily workflow."
          </blockquote>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="font-display font-bold text-sm text-auxerta-text">JD</span>
              </div>
              <div>
                <p className="font-medium text-auxerta-text text-sm">Jamie Davidson</p>
                <p className="text-auxerta-muted text-xs">Product Designer</p>
              </div>
            </div>
            
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm text-auxerta-text hover:text-accent transition-colors link-underline"
            >
              See stories
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Avatar Stack */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex items-center -space-x-3 mb-4">
            {avatars.map((avatar, index) => (
              <div
                key={avatar.id}
                ref={el => { avatarsRef.current[index] = el; }}
                className="w-14 h-14 rounded-full border-4 border-auxerta-offwhite will-change-transform"
                style={{ backgroundColor: avatar.color }}
              />
            ))}
          </div>
          <p className="micro-text text-auxerta-muted">+12k members</p>
        </div>
      </div>
    </section>
  );
}
