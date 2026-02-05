import { Paperclip, Mic, ArrowRight } from 'lucide-react';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface ChatCardProps {
  variant?: 'light' | 'dark';
  title?: string;
  placeholder?: string;
  responseText?: string;
  className?: string;
  style?: React.CSSProperties;
  showBirds?: boolean;
}

// Bird SVG component
const Bird = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    style={style}
    fill="currentColor"
  >
    <path d="M21.5 8c-1.5 0-2.8.5-3.9 1.3-1.1-2.3-3.4-3.8-6.1-3.8-2.7 0-5 1.5-6.1 3.8C4.3 8.5 3 8 1.5 8c-.8 0-1.5.7-1.5 1.5S.7 11 1.5 11c1.2 0 2.3-.3 3.3-.9.3 2.6 2.5 4.6 5.2 4.6 2.7 0 4.9-2 5.2-4.6 1 .6 2.1.9 3.3.9.8 0 1.5-.7 1.5-1.5S22.3 8 21.5 8z"/>
  </svg>
);

export function ChatCard({ 
  variant = 'light', 
  title = 'Auxerta: Neognathae',
  placeholder = 'Coming soon...',
  responseText,
  className = '',
  style,
  showBirds = false
}: ChatCardProps) {
  const isDark = variant === 'dark';
  const bird1Ref = useRef<HTMLDivElement>(null);
  const bird2Ref = useRef<HTMLDivElement>(null);
  const bird3Ref = useRef<HTMLDivElement>(null);
  const bird4Ref = useRef<HTMLDivElement>(null);
  const bird5Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!showBirds) return;
    
    const birds = [bird1Ref.current, bird2Ref.current, bird3Ref.current, bird4Ref.current, bird5Ref.current];
    
    birds.forEach((bird, i) => {
      if (!bird) return;
      
      // Flying animation - birds fly in from different directions
      gsap.fromTo(bird,
        { 
          x: -100 - (i * 30), 
          y: 20 + (i * 10),
          opacity: 0,
          scale: 0.5
        },
        { 
          x: 0, 
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          delay: 0.5 + (i * 0.2),
          ease: 'power2.out'
        }
      );
    });
  }, [showBirds]);

  return (
    <div 
      className={`rounded-[30px] border overflow-hidden ${isDark ? 'border-white/[0.08]' : 'border-[#121214]/10'} ${className}`}
      style={{
        width: 'clamp(320px, 72vw, 980px)',
        height: 'clamp(180px, 26vh, 260px)',
        boxShadow: isDark ? '0 30px 80px rgba(0,0,0,0.25)' : '0 30px 80px rgba(0,0,0,0.10)',
        ...style
      }}
    >
      {/* Gradient Header with Birds */}
      <div 
        className="relative px-6 py-4 border-b"
        style={{
          background: isDark 
            ? 'linear-gradient(180deg, #2D1B4E 0%, #1a1a1a 100%)'
            : 'linear-gradient(180deg, #E8D5F2 0%, #F5E6FA 30%, #FFFFFF 100%)',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,18,20,0.1)'
        }}
      >
        {/* Flying Birds */}
        {showBirds && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div ref={bird1Ref} className="absolute" style={{ left: '15%', top: '25%' }}>
              <Bird className="w-5 h-5 text-auxerta-accent/60" />
            </div>
            <div ref={bird2Ref} className="absolute" style={{ left: '30%', top: '40%' }}>
              <Bird className="w-4 h-4 text-auxerta-accent/50" />
            </div>
            <div ref={bird3Ref} className="absolute" style={{ left: '50%', top: '20%' }}>
              <Bird className="w-6 h-6 text-auxerta-accent/40" />
            </div>
            <div ref={bird4Ref} className="absolute" style={{ left: '65%', top: '35%' }}>
              <Bird className="w-4 h-4 text-auxerta-accent/50" />
            </div>
            <div ref={bird5Ref} className="absolute" style={{ left: '80%', top: '25%' }}>
              <Bird className="w-5 h-5 text-auxerta-accent/60" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-white/20' : 'bg-auxerta-text/15'}`} />
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-white/20' : 'bg-auxerta-text/15'}`} />
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-white/20' : 'bg-auxerta-text/15'}`} />
          </div>
          <span className={`micro-text ${isDark ? 'text-white/60' : 'text-auxerta-text/60'}`}>
            {title}
          </span>
          <div className="w-16" />
        </div>
      </div>

      {/* Content area */}
      <div 
        className="flex-1 flex flex-col justify-center px-6 py-4"
        style={{ background: isDark ? '#161618' : '#FFFFFF' }}
      >
        {responseText ? (
          <p className={`body-text ${isDark ? 'text-white/80' : 'text-auxerta-text/80'} max-w-lg`}>
            {responseText}
          </p>
        ) : (
          <p className={`text-2xl md:text-3xl font-display font-medium ${isDark ? 'text-white/30' : 'text-auxerta-text/30'}`}>
            {placeholder}
          </p>
        )}
      </div>

      {/* Bottom toolbar */}
      <div 
        className="flex items-center justify-between px-6 py-4 border-t"
        style={{ 
          background: isDark ? '#161618' : '#FFFFFF',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(18,18,20,0.1)'
        }}
      >
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white/50' : 'hover:bg-auxerta-text/5 text-auxerta-text/50'}`}>
            <Paperclip className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white/50' : 'hover:bg-auxerta-text/5 text-auxerta-text/50'}`}>
            <Mic className="w-5 h-5" />
          </button>
        </div>
        <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-accent' : 'hover:bg-auxerta-text/5 text-auxerta-text'}`}>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
