import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.svg';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('a'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled || mobileMenuOpen ? 'glass py-3 md:py-4 px-4 md:px-8 mx-4 md:mx-6 rounded-2xl' : ''
        }`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center z-10">
          <img 
            src={logo} 
            alt="Astro Codez" 
            className="h-8 md:h-12 w-auto transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`nav-link text-sm font-medium ${
                  activeSection === item.href.slice(1)
                    ? 'text-foreground active'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-10 w-10 h-10 flex items-center justify-center glass-subtle rounded-xl"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden md:inline-flex btn-primary text-sm py-3 px-6">
          <span>Start Project</span>
        </a>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-x-4 top-20 glass rounded-2xl p-6 z-40"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleNavClick}
                  className={`block py-3 px-4 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="btn-primary w-full mt-6 text-center"
          >
            <span>Start Project</span>
          </a>
        </div>
      )}

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;