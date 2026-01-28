import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Hexagon, Circle, Layers, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Box, label: 'Bounding Boxes', color: '#9B7BC7' },
  { icon: Hexagon, label: 'Polygons', color: '#B8A0D9' },
  { icon: Circle, label: 'Keypoints', color: '#C4A5E0' },
  { icon: Layers, label: 'Masks', color: '#D4B8E8' },
  { icon: Video, label: 'Frame Tracking', color: '#E8D5F2' },
];

export function ComputerVisionSection() {
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
      id="services"
      className="bg-auxerta-offwhite py-24 px-[8vw]"
    >
      <div className="content max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="micro-text text-purple-600 mb-4 block">01</span>
            <h2 className="headline-md text-auxerta-text mb-6">
              Computer Vision
            </h2>
            <p className="body-text text-auxerta-muted mb-8">
              Labels for images and video. We handle boxes, polygons, keypoints, 
              masks, and frame-by-frame tracking.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-purple-100"
                  >
                    <Icon className="w-5 h-5" style={{ color: feature.color }} />
                    <span className="text-sm font-medium text-auxerta-text">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual */}
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-white border border-purple-100">
              {/* Simulated Image Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[70%]">
                  {/* Background shapes */}
                  <div className="absolute top-[20%] left-[10%] w-24 h-32 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-300" />
                  <div className="absolute top-[40%] right-[15%] w-28 h-28 rounded-full bg-gradient-to-br from-purple-300 to-purple-400" />
                  <div className="absolute bottom-[15%] left-[30%] w-20 h-20 rounded-xl bg-gradient-to-br from-purple-200 to-purple-300 rotate-12" />

                  {/* Bounding Box 1 */}
                  <div className="absolute top-[15%] left-[5%] w-32 h-40 border-2 border-purple-500 rounded-lg">
                    <span className="absolute -top-6 left-0 px-2 py-1 bg-purple-500 text-white text-xs rounded">Object 1</span>
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500 -mt-1 -ml-1" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500 -mt-1 -mr-1" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500 -mb-1 -ml-1" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 -mb-1 -mr-1" />
                  </div>

                  {/* Bounding Box 2 */}
                  <div className="absolute top-[35%] right-[10%] w-36 h-36 border-2 border-purple-400 rounded-full">
                    <span className="absolute -top-6 right-0 px-2 py-1 bg-purple-400 text-white text-xs rounded">Object 2</span>
                  </div>

                  {/* Keypoints */}
                  <div className="absolute top-[25%] left-[20%]">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-2 h-2 bg-purple-500 rounded-full"
                        style={{
                          top: `${Math.sin(i * 0.8) * 30}px`,
                          left: `${Math.cos(i * 0.8) * 25}px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Polygon */}
                  <svg className="absolute top-[50%] left-[40%] w-32 h-32" viewBox="0 0 100 100">
                    <path
                      d="M50 10 L85 35 L75 75 L25 75 L15 35 Z"
                      fill="rgba(155, 123, 199, 0.2)"
                      stroke="#9B7BC7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
