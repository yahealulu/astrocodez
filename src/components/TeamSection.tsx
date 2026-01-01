import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Cpu, Code2, Palette, Terminal, Globe, Database, Server, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Zouhaier Alashram',
    role: 'Backend Developer',
    icon: Database,
    bio: 'Architecting robust systems and APIs that power the cosmos.',
    initials: 'ZA',
    gradient: 'from-blue-600 to-indigo-600',
    delay: 0,
  },
  {
    name: 'Yahya Loulou',
    role: 'Front End Developer',
    icon: Code2,
    bio: 'Crafting stellar user interfaces and experiences with pixel-perfect precision.',
    initials: 'YL',
    gradient: 'from-cyan-500 to-blue-500',
    delay: 0.1,
  },
  {
    name: 'Mouaz Alolabi',
    role: 'Front End Developer',
    icon: Globe,
    bio: 'Building responsive and interactive galactic web applications.',
    initials: 'MA',
    gradient: 'from-violet-500 to-purple-500',
    delay: 0.2,
  },
  {
    name: 'Mouaz Abdullhak',
    role: 'UI/UX Designer',
    icon: Palette,
    bio: 'Designing intuitive journeys through the digital universe.',
    initials: 'MA',
    gradient: 'from-pink-500 to-rose-500',
    delay: 0.3,
  },
  {
    name: 'Aghyad Sabsaby',
    role: 'Backend Developer',
    icon: Server,
    bio: 'Optimizing server-side logic for light-speed performance.',
    initials: 'AS',
    gradient: 'from-indigo-500 to-violet-500',
    delay: 0.4,
  },
  {
    name: 'Bashar Kallah',
    role: 'Backend Developer',
    icon: Cpu,
    bio: 'Engineering scalable solutions for complex data nebulas.',
    initials: 'BK',
    gradient: 'from-purple-600 to-indigo-600',
    delay: 0.5,
  },
  {
    name: 'Baraa Sheikha',
    role: 'DevOps Engineer',
    icon: Terminal,
    bio: 'Orchestrating infrastructure deployment across multiple galaxies.',
    initials: 'BS',
    gradient: 'from-emerald-500 to-teal-500',
    delay: 0.6,
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [showAllMobile, setShowAllMobile] = useState(false);

  // 3D Tilt Effect on Hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (limited to +/- 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
    
    // Move the inner content slightly for parallax
    const content = card.querySelector('.card-content');
    if (content) {
      gsap.to(content, {
        x: (x - centerX) * 0.05,
        y: (y - centerY) * 0.05,
        duration: 0.4,
      });
    }
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
    
    const content = card.querySelector('.card-content');
    if (content) {
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
      });
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const ctx = gsap.context(() => {
      // Title Reveal
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid Staggered Entrance
      // Only animate initially visible items or all if on desktop
      const cards = grid.querySelectorAll('.team-card-wrapper');
      
      gsap.fromTo(
        cards,
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          rotationX: 30, // Start tilted back
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          stagger: {
            each: 0.1,
            grid: 'auto',
            from: 'center' // Expands from center out
          },
          duration: 0.8,
          ease: 'back.out(1.2)', // Slight bounce
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connecting Lines Animation (Background)
      const lines = section.querySelectorAll('.connection-line');
      gsap.fromTo(
        lines,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.2,
          duration: 1.5,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      );

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  // Filter team members for mobile view
  const visibleTeamMembers = typeof window !== 'undefined' && window.innerWidth < 768 && !showAllMobile
    ? teamMembers.slice(0, 3) 
    : teamMembers;

  return (
    <section
      ref={sectionRef}
      id="team"
      className="slide-section py-20 md:py-32 relative overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      {/* Constellation Lines (Decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="connection-line origin-center" />
        <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="connection-line origin-center" />
        <circle cx="50%" cy="50%" r="30%" fill="none" stroke="url(#lineGradient)" strokeWidth="1" className="connection-line opacity-10" />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="currentColor" className="text-primary" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <span className="animate-item inline-block text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 backdrop-blur-sm">
            Command Center
          </span>
          <h2 className="animate-item section-title text-4xl md:text-6xl lg:text-7xl mb-6 font-bold tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Galactic Crew</span>
          </h2>
          <p className="animate-item text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A diverse collective of engineers and designers united by a single mission: 
            <span className="text-foreground font-medium"> to build the extraordinary.</span>
          </p>
        </div>

        {/* Team Grid - Honeycomb-ish Layout */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto perspective-1000"
        >
          {visibleTeamMembers.map((member, index) => (
            <div
              key={member.name} // Use name as key for stable identity
              ref={(el) => (cardsRef.current[index] = el)}
              className={`team-card-wrapper group relative h-[400px] w-full cursor-pointer 
                ${index === 3 ? 'lg:col-span-1 xl:col-span-1' : ''} 
                ${index === 6 ? 'md:col-span-1 lg:col-span-1 xl:col-span-1' : ''}
              `} // DevOps appears beside Backend
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="h-full w-full relative preserve-3d transition-all duration-300">
                
                {/* Glass Card */}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
                  
                  {/* Top Gradient Bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${member.gradient}`} />
                  
                  {/* Inner Content */}
                  <div className="card-content p-8 flex flex-col items-center h-full relative z-10">
                    
                    {/* Floating Avatar */}
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} p-0.5 transform rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                        <div className="w-full h-full bg-black/90 rounded-2xl flex items-center justify-center relative overflow-hidden">
                          {/* Initials */}
                          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 z-10">
                            {member.initials}
                          </span>
                          
                          {/* Animated Icon Background */}
                          <member.icon className="absolute w-16 h-16 text-white/5 -bottom-2 -right-2 rotate-12" />
                        </div>
                      </div>
                      {/* Glow Behind */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10`} />
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:scale-105 transition-transform duration-300">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-6">
                      <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${member.gradient} animate-pulse`} />
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {member.role}
                      </span>
                    </div>

                    {/* Bio - Reveal on Hover */}
                    <p className="text-center text-sm text-gray-400 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {member.bio}
                    </p>

                    {/* Social Links (Mock) */}
                    <div className="mt-auto pt-6 flex gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Github className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Linkedin className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Twitter className="w-4 h-4 text-white/70" />
                      </button>
                    </div>

                  </div>

                  {/* Tech Grid Pattern Overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Corner Accent */}
                  <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${member.gradient} opacity-10 rounded-tl-[3rem]`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Show More Button */}
        <div className="md:hidden text-center mt-8">
          {!showAllMobile && teamMembers.length > 3 && (
            <button 
              onClick={() => setShowAllMobile(true)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium transition-all hover:bg-primary/20 hover:scale-105 active:scale-95"
            >
              <span>View All Crew Members</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          )}
        </div>
        
        {/* Footer Text */}
        <div className="text-center mt-16 md:mt-24">
           <p className="text-muted-foreground/50 text-sm font-mono tracking-widest uppercase">
              // Systems Online • Crew Ready //
           </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
