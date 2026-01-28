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
            Services
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
          {/* Cream Purple Gradient Underline */}
          <div className="w-24 h-1 mt-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #C4A5E0 0%, #9B7BC7 50%, #B8A0D9 100%)'
            }}
          />
        </div>

        {/* Right Nav Links + Actions */}
        <div className="flex items-center gap-8 flex-1 justify-end">
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
              About
            </a>
            <a href="#contact" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
              Contact
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
