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
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle card hover effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card || window.innerWidth < 768) return;

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
    const stats = statsRef.current;

    if (!section || !title || !grid || !stats) return;

    const ctx = gsap.context(() => {
      // Title animation - clean slide up
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation - clean staggered slide up
      const cards = grid.querySelectorAll('.why-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: {
            amount: 0.4,
            from: 'start',
          },
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Icons scale in
      const icons = grid.querySelectorAll('.card-icon');
      gsap.fromTo(
        icons,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: {
            amount: 0.4,
            from: 'start',
          },
          duration: 0.4,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats bar animation
      gsap.fromTo(
        stats,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stats,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats numbers animation
      const statItems = stats.querySelectorAll('.stat-item');
      gsap.fromTo(
        statItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stats,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="slide-section py-20 md:py-32 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent pointer-events-none" />

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
            >
              {/* Icon */}
              <div className={`card-icon w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-105`}>
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
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsla(var(--primary), 0.04), transparent 40%)`,
                }}
              />

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl rounded-tr-3xl bg-gradient-to-bl ${reason.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div ref={statsRef} className="mt-16 md:mt-24">
          <div className="glass-premium p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { value: '50+', label: 'Projects Launched' },
                { value: '30+', label: 'Happy Clients' },
                { value: '5+', label: 'Years Experience' },
                { value: '99%', label: 'Client Retention' },
              ].map((item, index) => (
                <div key={index} className="stat-item space-y-1">
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
