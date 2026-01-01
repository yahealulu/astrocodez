import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mainIcon from '@/assets/main-icon.png';
import mainImage from '@/assets/main.png';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const parallaxLayer1Ref = useRef<HTMLDivElement>(null);
  const parallaxLayer2Ref = useRef<HTMLDivElement>(null);
  const parallaxLayer3Ref = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  // Magnetic button effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, ref: React.RefObject<HTMLAnchorElement>) => {
    const btn = ref.current;
    if (!btn || window.innerWidth < 768) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback((ref: React.RefObject<HTMLAnchorElement>) => {
    const btn = ref.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const icon = iconRef.current;
    const overlay = overlayRef.current;
    const mobileImage = mobileImageRef.current;
    const layer1 = parallaxLayer1Ref.current;
    const layer2 = parallaxLayer2Ref.current;
    const layer3 = parallaxLayer3Ref.current;

    if (!section || !content || !icon || !overlay) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Initial entrance animations with cinematic reveal
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate content items with staggered cinematic entrance
      tl.fromTo(
        content.querySelectorAll('.animate-item'),
        { 
          y: 80, 
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)',
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15, 
          ease: 'power4.out',
        }
      );

      // Mobile: animate image on scroll
      mm.add('(max-width: 767px)', () => {
        if (mobileImage) {
          gsap.fromTo(
            mobileImage,
            { y: 30, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: 0.3,
              ease: 'power3.out',
            }
          );

          gsap.to(mobileImage, {
            y: -50,
            opacity: 0,
            scale: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Desktop: animate icon and parallax layers
      mm.add('(min-width: 768px)', () => {
        // Icon entrance with elastic bounce
        tl.fromTo(
          icon,
          { scale: 0.3, opacity: 0, rotation: -45, y: 50 },
          { 
            scale: 1, 
            opacity: 1, 
            rotation: 0, 
            y: 0,
            duration: 1.4, 
            ease: 'elastic.out(1, 0.6)',
          },
          '-=0.8'
        );

        // Parallax layers scroll animation
        if (layer1) {
          gsap.to(layer1, {
            y: -100,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        if (layer2) {
          gsap.to(layer2, {
            y: -60,
            scale: 1.1,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }

        if (layer3) {
          gsap.to(layer3, {
            y: -30,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 2.5,
            },
          });
        }

        // Icon scroll animation with 3D rotation
        gsap.to(icon, {
          rotation: 180,
          scale: 0.4,
          y: 250,
          rotationX: 20,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // Content scroll animation
      gsap.to(content, {
        y: -100,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Overlay fade in on scroll
      gsap.to(overlay, {
        opacity: 0.9,
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="slide-section pt-24 md:pt-32 pb-16 md:pb-20 relative"
    >
      {/* Parallax background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Furthest back, slowest */}
        <div 
          ref={parallaxLayer1Ref}
          className="absolute inset-0"
        >
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-radial opacity-20 blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-gradient-radial opacity-15 blur-3xl" />
        </div>

        {/* Layer 2 - Middle */}
        <div 
          ref={parallaxLayer2Ref}
          className="absolute inset-0"
        >
          <div className="absolute top-[30%] right-[20%] w-48 h-48 rounded-full bg-primary/10 blur-2xl animate-morph" />
          <div className="absolute bottom-[30%] left-[15%] w-32 h-32 rounded-full bg-secondary/10 blur-xl" />
        </div>

        {/* Layer 3 - Closest, fastest */}
        <div 
          ref={parallaxLayer3Ref}
          className="absolute inset-0"
        >
          {/* Orbital rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-rotate-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-secondary/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '60s' }} />
        </div>
      </div>

      {/* Main ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[900px] h-[400px] md:h-[900px] bg-gradient-radial opacity-40 pointer-events-none" />
      
      {/* Overlay for scroll transition */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background/0 pointer-events-none z-10"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          {/* Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Mobile-only image */}
            <div ref={mobileImageRef} className="animate-item block md:hidden mb-4 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial opacity-50 scale-150 blur-xl" />
                <img
                  src={mainImage}
                  alt="Astro Codez"
                  className="relative z-10 w-32 h-32 object-contain animate-float-gentle"
                />
              </div>
            </div>

            <div className="animate-item">
              <span className="inline-block px-4 md:px-5 py-2.5 glass-premium text-xs md:text-sm font-medium text-primary mb-4 md:mb-6 animate-glow-pulse">
                🚀 Welcome to the Future
              </span>
            </div>

            <h1 className="animate-item section-title mb-4 md:mb-6 text-3xl md:text-5xl lg:text-7xl">
              <span className="gradient-text-animated">Building Digital</span>
              <br />
              <span className="text-foreground">Universes</span>
            </h1>

            <p className="animate-item section-subtitle mb-8 md:mb-10 text-sm md:text-lg px-2 md:px-0 text-muted-foreground">
              Our Vision Is Revolutionary. It's Not Just Coding, It's About Taking 
              Businesses To Other Galaxies!
            </p>

            <div className="animate-item flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 md:px-0">
              <a 
                ref={primaryBtnRef}
                href="#contact" 
                className="btn-primary text-sm md:text-base py-3 md:py-4 relative"
                onMouseMove={(e) => handleMouseMove(e, primaryBtnRef)}
                onMouseLeave={() => handleMouseLeave(primaryBtnRef)}
              >
                <span>Start Your Project</span>
              </a>
              <a 
                ref={secondaryBtnRef}
                href="#services" 
                className="btn-secondary text-sm md:text-base py-3 md:py-4"
                onMouseMove={(e) => handleMouseMove(e, secondaryBtnRef)}
                onMouseLeave={() => handleMouseLeave(secondaryBtnRef)}
              >
                Explore Services
              </a>
            </div>

            {/* Trust indicators */}
            <div className="animate-item mt-10 md:mt-14 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-xs font-bold"
                    >
                      {['ZA', 'YL', 'BS', '+'][i]}
                    </div>
                  ))}
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">Trusted Team</span>
              </div>
              <div className="h-8 w-px bg-border hidden md:block" />
              <div className="text-xs md:text-sm text-muted-foreground">
                <span className="text-primary font-semibold">50+</span> Projects Delivered
              </div>
            </div>
          </div>

          {/* Icon - Hidden on mobile */}
          <div ref={iconRef} className="hidden md:flex flex-1 justify-center items-center" style={{ perspective: '1000px' }}>
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* Glow rings - Enhanced */}
              <div className="absolute inset-0 scale-150 bg-gradient-radial animate-pulse-slow" />
              
              {/* Multi-layer orbital rings */}
              <div className="absolute -inset-8 border border-primary/30 rounded-full animate-rotate-slow opacity-60" />
              <div className="absolute -inset-16 border border-secondary/20 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '35s' }} />
              <div className="absolute -inset-24 border border-accent/10 rounded-full animate-rotate-slow" style={{ animationDuration: '50s' }} />
              
              {/* Floating particles around icon */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/60"
                  style={{
                    top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    animation: `floatGentle ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
              
              {/* Main icon */}
              <img
                src={mainIcon}
                alt="Astro Codez"
                className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain drop-shadow-2xl animate-float"
                style={{ 
                  filter: 'drop-shadow(0 0 30px hsla(var(--primary), 0.3))',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Enhanced */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          <ChevronDown className="relative w-5 h-5 md:w-6 md:h-6 text-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
