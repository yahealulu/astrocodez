import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '@/assets/logo.svg';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      // Animate footer elements on scroll into view
      gsap.fromTo(
        content.children,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footer);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 md:py-16 border-t border-border/30">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={contentRef} className="flex flex-col items-center gap-6 md:gap-8">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img 
              src={logo} 
              alt="Astro Codez" 
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Tagline */}
          <p className="text-muted-foreground text-center text-sm md:text-base max-w-md px-4">
            Accelerate your Brilliance Through The Galaxies
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            © 2025 All Rights Reserved, Astrocodez
          </p>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-gradient-radial opacity-20 pointer-events-none" />
    </footer>
  );
};

export default Footer;
