import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Type, Tag, Smile, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Tag, label: 'NER', color: '#9B7BC7' },
  { icon: Type, label: 'Classification', color: '#B8A0D9' },
  { icon: Smile, label: 'Sentiment', color: '#C4A5E0' },
  { icon: MessageSquare, label: 'LLM Fine-tuning', color: '#D4B8E8' },
];

// Sample text with entities
const sampleText = [
  { text: 'Apple', type: 'ORG', color: '#9B7BC7' },
  { text: ' is planning to open a new store in ', type: 'normal', color: null },
  { text: 'Tokyo', type: 'LOC', color: '#B8A0D9' },
  { text: ' next ', type: 'normal', color: null },
  { text: 'year', type: 'TIME', color: '#C4A5E0' },
  { text: '.', type: 'normal', color: null },
];

export function NaturalLanguageSection() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative aspect-square max-w-md mx-auto order-2 lg:order-1">
            <div className="absolute inset-0 rounded-md overflow-hidden bg-gradient-to-br from-purple-50 to-white border border-purple-100 p-6">
              {/* Text Editor Interface */}
              <div className="h-full flex flex-col">
                {/* Editor Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-purple-100">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-yellow-300" />
                  <div className="w-3 h-3 rounded-full bg-green-300" />
                  <span className="ml-4 text-xs text-purple-400 font-mono">document.txt</span>
                </div>

                {/* Text Content with NER */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-1 text-lg leading-relaxed">
                    {sampleText.map((item, i) => (
                      <span key={i}>
                        <span
                          className="px-1 py-0.5 rounded"
                          style={item.color ? {
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                            fontWeight: 500
                          } : {}}
                        >
                          {item.text}
                        </span>
                      </span>
                    ))}
                  </div>

                  {/* Entity Labels */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-sm text-xs font-medium bg-purple-100 text-purple-700">
                      ORG: Organization
                    </span>
                    <span className="px-3 py-1 rounded-sm text-xs font-medium bg-purple-100 text-purple-700">
                      LOC: Location
                    </span>
                    <span className="px-3 py-1 rounded-sm text-xs font-medium bg-purple-100 text-purple-700">
                      TIME: Time
                    </span>
                  </div>

                  {/* Sentiment Analysis */}
                  <div className="mt-6 p-4 rounded-md bg-white border border-purple-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-auxerta-text">Sentiment Score</span>
                      <span className="text-sm font-bold text-purple-600">Positive (85%)</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-sm overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-purple-400 to-purple-600 rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="micro-text text-purple-600 mb-4 block">02</span>
            <h2 className="headline-md text-auxerta-text mb-6">
              Natural Language
            </h2>
            <p className="body-text text-auxerta-muted mb-8">
              Text labeling for NER, classification, sentiment, and LLM fine-tuning
              including RLHF and instruction data.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-md bg-white border border-purple-100"
                  >
                    <Icon className="w-5 h-5" style={{ color: feature.color }} />
                    <span className="text-sm font-medium text-auxerta-text">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
