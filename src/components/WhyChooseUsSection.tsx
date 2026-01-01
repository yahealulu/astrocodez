import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  HeadphonesIcon, 
  Eye, 
  Shield, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'We leverage cutting-edge technologies and creative solutions to give your business a competitive edge in the digital cosmos.',
    stat: '100+',
    statLabel: 'Technologies',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our team orbits around the clock, ensuring your systems run smoothly and any issues are resolved at light speed.',
    stat: '24/7',
    statLabel: 'Availability',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    description: 'Clear communication at every stage. You\'ll always know exactly where your project stands in its journey.',
    stat: '100%',
    statLabel: 'Visibility',
    gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Quality Code',
    description: 'Senior-level engineering with rigorous code reviews, testing, and best practices that stand the test of time.',
    stat: '99.9%',
    statLabel: 'Uptime',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Built to grow with your business. Our architectures handle increasing demands without breaking a sweat.',
    stat: '10x',
    statLabel: 'Scalability',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Mission deadlines are sacred. We plan meticulously and execute precisely to launch on schedule.',
    stat: '98%',
    statLabel: 'On Time',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
  },
];

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Magnetic card effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card || window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables for gradient spotlight
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Mobile animations - simpler stagger
      mm.add('(max-width: 767px)', () => {
        const cards = grid.querySelectorAll('.why-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      });

      // Desktop animations - wave pattern with 3D
      mm.add('(min-width: 768px)', () => {
        const cards = grid.querySelectorAll('.why-card');
        
        // Set perspective on grid
        gsap.set(grid, { perspective: 1000 });
        gsap.set(cards, { transformStyle: 'preserve-3d' });

        cards.forEach((card, index) => {
          // Calculate wave delay based on row and column
          const row = Math.floor(index / 3);
          const col = index % 3;
          const waveDelay = (row * 0.1) + (col * 0.08);

          gsap.fromTo(
            card,
            { 
              y: 100, 
              opacity: 0, 
              scale: 0.85,
              rotationX: 15,
              rotationY: col === 0 ? -10 : col === 2 ? 10 : 0,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              duration: 0.8,
              delay: waveDelay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Animate icon with bounce
          const icon = card.querySelector('.card-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -30 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: waveDelay + 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: grid,
                  start: 'top 80%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }

          // Animate stat counter
          const stat = card.querySelector('.card-stat');
          if (stat) {
            gsap.fromTo(
              stat,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: waveDelay + 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: grid,
                  start: 'top 80%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });
      });

      // Floating background elements
      const bgElements = section.querySelectorAll('.bg-float');
      bgElements.forEach((el, i) => {
        gsap.to(el, {
          y: -40 + (i * 15),
          x: (i % 2 === 0 ? 20 : -20),
          rotation: i * 10,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
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
      id="why-us"
      className="slide-section py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
      
      {/* Floating background elements */}
      <div className="bg-float absolute top-32 left-[10%] w-64 h-64 rounded-full bg-gradient-radial opacity-20 blur-3xl pointer-events-none" />
      <div className="bg-float absolute bottom-32 right-[10%] w-80 h-80 rounded-full bg-gradient-radial opacity-15 blur-3xl pointer-events-none" />
      <div className="bg-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial opacity-10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
            The Advantage
          </span>
          <h2 className="animate-item section-title text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            <span className="gradient-text">Why Choose Us</span>
          </h2>
          <p className="animate-item section-subtitle mx-auto text-sm md:text-lg px-4 md:px-0">
            Partner with a team that's committed to your success across every dimension
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto"
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="why-card group cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Icon */}
              <div className={`card-icon w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <reason.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                {reason.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                {reason.description}
              </p>

              {/* Stat badge */}
              <div className="card-stat flex items-center gap-3 pt-4 border-t border-border/30">
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent`}>
                  {reason.stat}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                  {reason.statLabel}
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsla(var(--primary), 0.06), transparent 40%)`,
                }}
              />

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-3xl rounded-tr-3xl bg-gradient-to-bl ${reason.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div className="mt-16 md:mt-24">
          <div className="glass-premium p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { value: '50+', label: 'Projects Launched' },
                { value: '30+', label: 'Happy Clients' },
                { value: '5+', label: 'Years Experience' },
                { value: '99%', label: 'Client Retention' },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl md:text-4xl font-bold gradient-text">
                    {item.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

