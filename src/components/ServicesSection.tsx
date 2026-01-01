import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, Database, Cloud, Palette, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'High-performing websites that orbit around your brand\'s goals.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Intuitive mobile apps for iOS and Android in everyone\'s pocket.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'ERP Systems',
    description: 'Custom ERP solutions that integrate processes, data, and teams.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    description: 'Powerful, scalable Software-as-a-Service solutions in the cloud.',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces that are visually stunning and feel out of this world.',
    color: 'from-purple-500 to-blue-500',
  },
  {
    icon: Lightbulb,
    title: 'IT Consulting',
    description: 'Expert IT consulting to guide you through the tech cosmos.',
    color: 'from-blue-500 to-purple-500',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse tracking for spotlight effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Title animation with cinematic reveal
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { 
          y: 60, 
          opacity: 0,
          filter: 'blur(8px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.12,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Mobile: simpler stagger animation
      mm.add('(max-width: 767px)', () => {
        const cards = grid.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 50, 
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      });

      // Desktop: 3D wave animation
      mm.add('(min-width: 768px)', () => {
        // Set perspective on grid
        gsap.set(grid, { perspective: 1200 });
        
        const cards = grid.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          // Calculate wave delay based on position
          const row = Math.floor(index / 3);
          const col = index % 3;
          // Wave propagates from top-left to bottom-right
          const waveDelay = (row * 0.1) + (col * 0.08);

          gsap.fromTo(
            card,
            { 
              y: 100, 
              opacity: 0, 
              scale: 0.85,
              rotationX: 20,
              rotationY: col === 0 ? -15 : col === 2 ? 15 : 0,
              filter: 'blur(5px)',
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              delay: waveDelay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 82%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Animate icon with bounce
          const icon = card.querySelector('.service-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -45 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: waveDelay + 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: grid,
                  start: 'top 82%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });

        // Floating ambient animation on scroll
        gsap.to(grid, {
          y: -20,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        });
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
      id="services"
      className="slide-section py-16 md:py-28 relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-gradient-radial opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-gradient-radial opacity-10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
            The Orbit
          </span>
          <h2 className="animate-item section-title text-2xl md:text-5xl lg:text-6xl mb-4">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="animate-item section-subtitle mx-auto text-sm md:text-lg">
            Comprehensive solutions to launch your digital presence into orbit
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 max-w-6xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="service-card group cursor-pointer p-6 md:p-8"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              {/* Icon */}
              <div
                className={`service-icon w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}
              >
                <service.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {service.description}
              </p>

              {/* Learn more link */}
              <div className="mt-5 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>Learn more</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-3xl">
                <div className={`h-full bg-gradient-to-r ${service.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`} />
              </div>

              {/* Corner glow on hover */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
