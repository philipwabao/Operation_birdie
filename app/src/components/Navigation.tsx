import { useEffect, useState } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? 'bg-auxerta-offwhite/80 backdrop-blur-md py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="flex items-center justify-between px-[4vw]">
        {/* Left Nav Links */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <a href="#services" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
            Research
          </a>
          <a href="#models" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
            Models
          </a>
        </div>

        {/* Centered Logo with Gradient Underline */}
        <div className="flex flex-col items-center justify-center">
          <a href="#" className="font-display font-bold text-2xl text-auxerta-text tracking-tight">
            Auxerta
          </a>
          {/* Animated Gradient Underline */}
          <div
            className="w-32 h-1 mt-1 rounded-sm"
            style={{
              background: '#9B7BC7',
              animation: 'color-shift 6s ease-in-out forwards'
            }}
          />
          <style>{`
            @keyframes color-shift {
              0% { background: #2563EB; opacity: 0.7; }
              15% { background: #2563EB; opacity: 1; }
              30% { background: #38BDF8; }
              50% { background: #A7F3D0; }
              70%, 100% { background: #9B7BC7; }
            }
          `}</style>
        </div>

        {/* Right Nav Links + Actions */}
        <div className="flex items-center gap-8 flex-1 justify-end">
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
              About
            </a>
            <a href="mailto:invest@auxerta.com" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
              Invest
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:service@auxerta.com"
              className="btn-accent text-sm font-medium"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
