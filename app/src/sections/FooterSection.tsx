import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: ['Computer Vision', 'Natural Language', 'Custom Workflows'],
  company: ['About', 'Careers', 'Contact'],
  resources: ['Documentation', 'API', 'Blog'],
};

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Minimal animation
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="bg-auxerta-dark py-16 px-[8vw] border-t border-white/10"
    >
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Logo */}
        <div>
          <a href="#" className="font-display font-bold text-2xl text-white tracking-tight mb-4 block">
            Auxerta
          </a>
        </div>

        {/* Services */}
        <div>
          <h4 className="micro-text text-white/40 mb-4">Services</h4>
          <ul className="space-y-3">
            {footerLinks.services.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="body-text text-white/70 hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="micro-text text-white/40 mb-4">Company</h4>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="body-text text-white/70 hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="micro-text text-white/40 mb-4">Resources</h4>
          <ul className="space-y-3">
            {footerLinks.resources.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="body-text text-white/70 hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="micro-text text-white/40">
          © 2026 Auxerta, Inc
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
