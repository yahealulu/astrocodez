import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Zouhaier Alashram',
    role: 'Backend Developer',
    bio: 'Architecting robust systems and APIs that power the cosmos.',
    initials: 'ZA',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Yahya Loulou',
    role: 'Front End Developer',
    bio: 'Crafting stellar user interfaces and experiences.',
    initials: 'YL',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Baraa Sheikha',
    role: 'DevOps Engineer',
    bio: 'Building and maintaining infrastructure that scales across galaxies.',
    initials: 'BS',
    gradient: 'from-cyan-500 to-green-500',
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const mobileGrid = mobileGridRef.current;
    const desktopScroll = desktopScrollRef.current;

    if (!section || !title) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Title animation with cinematic reveal
      gsap.set(title.querySelectorAll('.animate-item'), { opacity: 1, y: 0 });
      
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { 
          y: 50, 
          opacity: 0,
          filter: 'blur(5px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 0.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Mobile: Modern card animation with stagger and scale
      mm.add('(max-width: 767px)', () => {
        if (!mobileGrid) return;
        
        const cards = mobileGrid.querySelectorAll('.mobile-team-card');
        gsap.set(cards, { opacity: 1, y: 0 });
        
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 40, 
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 93%',
                end: 'bottom 5%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Animate avatar with bounce
          const avatar = card.querySelector('.team-avatar');
          if (avatar) {
            gsap.fromTo(
              avatar,
              { scale: 0, rotation: -20 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: index * 0.1 + 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 93%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });
      });

      // Desktop: Enhanced horizontal scroll with 3D
      mm.add('(min-width: 768px)', () => {
        if (!desktopScroll) return;

        // Set perspective
        gsap.set(desktopScroll, { perspective: 1000 });

        const cards = desktopScroll.querySelectorAll('.team-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 80, 
              opacity: 0, 
              scale: 0.9,
              rotationY: -15,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.7,
              delay: index * 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: desktopScroll,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Animate avatar with elastic bounce
          const avatar = card.querySelector('.team-avatar');
          if (avatar) {
            gsap.fromTo(
              avatar,
              { scale: 0, rotation: -30 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: index * 0.12 + 0.2,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                  trigger: desktopScroll,
                  start: 'top 80%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });

        // Horizontal scroll with smoother scrub
        const scrollWidth = desktopScroll.scrollWidth - desktopScroll.clientWidth;
        
        if (scrollWidth > 0) {
          gsap.to(desktopScroll, {
            scrollLeft: scrollWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 20%',
              end: () => `+=${scrollWidth}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          });
        }
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
      id="team"
      className="slide-section py-12 md:py-28 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-15 pointer-events-none" />

      {/* Desktop Title */}
      <div className="hidden md:block container mx-auto px-4 md:px-6 mb-10 md:mb-16">
        <div ref={titleRef} className="text-center">
          <span className="animate-item inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            The Astros
          </span>
          <h2 className="animate-item section-title text-4xl lg:text-6xl mb-4">
            <span className="gradient-text">Meet The Team</span>
          </h2>
          <p className="animate-item section-subtitle mx-auto">
            The brilliant minds powering your digital transformation
          </p>
        </div>
      </div>

      {/* Mobile: Completely Redesigned Section */}
      <div className="md:hidden">
        {/* Mobile Title */}
        <div className="px-4 mb-8 text-center">
          <div className="inline-block mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10">
              Our Team
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Meet The Crew</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            The brilliant minds behind our cosmic journey
          </p>
        </div>

        {/* Mobile: Clean Grid Cards */}
        <div
          ref={mobileGridRef}
          className="px-4 space-y-4"
        >
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="mobile-team-card group relative overflow-hidden"
            >
              {/* Card Background with Gradient Border Effect */}
              <div className="relative glass-premium p-5 hover:glow-soft transition-all duration-500">
                {/* Content Container */}
                <div className="flex items-start gap-4">
                  {/* Avatar with Gradient */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`team-avatar w-18 h-18 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}
                      style={{ width: '72px', height: '72px' }}
                    >
                      <span className="text-xl font-bold text-white">{member.initials}</span>
                    </div>
                    {/* Decorative Dot */}
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br ${member.gradient} animate-glow-pulse`} />
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${member.gradient}`} />
                      <p className="text-sm font-semibold text-primary/80">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Subtle Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
                  <div className={`w-full h-full bg-gradient-to-br ${member.gradient} rounded-full blur-2xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Decoration */}
        <div className="mt-8 px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <p className="text-center text-xs text-muted-foreground mt-4">
            {teamMembers.length} talented members • Building the future
          </p>
        </div>
      </div>

      {/* Desktop: Horizontal Scroll Gallery */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-10 px-8 lg:px-16 overflow-x-auto hide-scrollbar"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="team-card flex-shrink-0 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Avatar */}
            <div className="relative mb-8">
              <div
                className={`team-avatar w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
              >
                <span className="text-4xl font-bold text-white">{member.initials}</span>
              </div>
              {/* Animated ring */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 scale-110 blur-md transition-all duration-500`} />
            </div>

            {/* Info */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                {member.role}
              </p>
              <p className="text-muted-foreground text-base max-w-[280px] leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-primary/40 animate-glow-pulse" />
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
          </div>
        ))}
      </div>

      {/* Scroll hint - desktop only */}
      <div className="hidden md:block container mx-auto px-6 mt-12">
        <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
          <span>← Scroll to explore our team →</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
