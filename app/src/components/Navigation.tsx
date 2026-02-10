import { useEffect, useState } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  const scrollToId = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRequestAccess = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = document.getElementById('private-preview');
    if (!target) return;
    const offset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

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
        ? 'bg-auxerta-offwhite/80 backdrop-blur-md py-3 border-b border-auxerta-text/10 shadow-sm'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 md:px-10 max-w-6xl">
        {/* Left Nav Links */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <a href="#services" onClick={scrollToId('services')} className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
            Research
          </a>
          <a href="#models" onClick={scrollToId('models')} className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
            Models
          </a>
        </div>

        {/* Centered Logo with Gradient Bracket Frame */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            {/* Bracket container */}
            <div className="relative px-5 py-2 group">
              {/* Auxerta Text */}
              <a href="#" className="font-display font-bold text-xl sm:text-2xl text-auxerta-text tracking-tight relative z-10">
                Auxerta
              </a>




              {/* Top-Left Corner Focus */}
              <div
                className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 rounded-tl-sm transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:opacity-100"
                style={{
                  animation: 'border-gradient-to-purple 2s ease-out forwards',
                  opacity: 0.8
                }}
              />

              {/* Bottom-Right Corner Focus */}
              <div
                className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 rounded-br-sm transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:opacity-100 group-hover:border-auxerta-text"
                style={{
                  animation: 'border-gradient-to-purple 2s ease-out forwards 0.2s', // slight delay
                  opacity: 0.8
                }}
              />

              <style>{`
                @keyframes border-gradient-to-purple {
                  0% { border-color: #A7F3D0; }
                  50% { border-color: #38BDF8; }
                  100% { border-color: #9B7BC7; }
                }
              `}</style>

              {/* Subtle Glow Backdrop */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-auxerta-accent/10 to-auxerta-accent-glow/10 blur-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

            </div>
          </div>
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
            <a href="#about" onClick={scrollToId('about')} className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
              About
            </a>
            <a href="mailto:invest@auxerta.com" className="text-sm text-auxerta-text/80 hover:text-auxerta-text transition-colors link-underline">
              Invest
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRequestAccess}
              className="btn-accent text-sm font-medium"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
