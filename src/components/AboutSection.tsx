import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import astronaut from '@/assets/astronaut.png';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 100, suffix: '%', label: 'Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const statsEl = statsRef.current;
    const parallaxBg = parallaxBgRef.current;

    if (!section || !content || !image || !statsEl) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Parallax background
      if (parallaxBg) {
        gsap.to(parallaxBg, {
          y: -80,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      // Mobile animations
      mm.add('(max-width: 767px)', () => {
        // Set initial visible state
        gsap.set(content.querySelectorAll('.animate-item'), { opacity: 1, y: 0 });
        gsap.set(image, { opacity: 1, y: 0, scale: 1 });
        gsap.set(statsEl.querySelectorAll('.stat-item'), { opacity: 1, y: 0, scale: 1 });

        gsap.fromTo(
          content.querySelectorAll('.animate-item'),
          { y: 50, opacity: 0, filter: 'blur(5px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          image,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          statsEl.querySelectorAll('.stat-item'),
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsEl,
              start: 'top 95%',
              end: 'bottom 5%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Desktop animations - Cinematic reveal
      mm.add('(min-width: 768px)', () => {
        // Content slides in from left with blur
        gsap.set(content.querySelectorAll('.animate-item'), { opacity: 1, x: 0 });
        gsap.set(image, { opacity: 1, x: 0, rotation: 0 });
        gsap.set(statsEl.querySelectorAll('.stat-item'), { opacity: 1, y: 0 });

        gsap.fromTo(
          content.querySelectorAll('.animate-item'),
          { 
            x: -100, 
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.12,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Image reveals with scale and rotation
        gsap.fromTo(
          image,
          { 
            x: 120, 
            opacity: 0, 
            rotation: 15,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Stats with counter animation and bounce
        const statItems = statsEl.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 60, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: statsEl,
                start: 'top 90%',
                end: 'bottom 10%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Animate the counter value
          const valueEl = item.querySelector('.stat-value');
          if (valueEl) {
            const endValue = stats[index].value;
            const suffix = stats[index].suffix;
            const counter = { value: 0 };
            
            gsap.to(counter, {
              value: endValue,
              duration: 2,
              delay: index * 0.15 + 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statsEl,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              onUpdate: () => {
                valueEl.textContent = `${Math.round(counter.value)}${suffix}`;
              },
            });
          }
        });

        // Astronaut parallax float
        gsap.to(image.querySelector('img'), {
          y: -40,
          rotation: 5,
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
      id="about"
      className="slide-section py-16 md:py-28 relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <div ref={parallaxBgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-72 h-72 rounded-full bg-gradient-radial opacity-15 blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-96 h-96 rounded-full bg-gradient-radial opacity-10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          {/* Content */}
          <div ref={contentRef} className="flex-1 max-w-xl order-2 lg:order-1">
            <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
              The Crew
            </span>
            
            <h2 className="animate-item section-title mb-6 md:mb-8 text-2xl md:text-4xl lg:text-5xl">
              <span className="gradient-text">Who Are We?</span>
            </h2>

            <div className="space-y-4 md:space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p className="animate-item">
                Astrocodez Is a Young Passionate Team Of Software Engineers & Designers
                Who Are Turning Digital Ideas Into Reality.
              </p>
              <p className="animate-item">
                We Believe That Everyone Deserves To Make Outcomes From Their Technology
                Investments. Our unique methodology focuses on understanding your business 
                challenges first, before we align the right tech solutions.
              </p>
              <p className="animate-item hidden md:block">
                We Craft The Best Functioning Apps, Websites & Systems That Can Push Your
                Business Forward and Help You Achieve Your Goals!
              </p>
              <p className="animate-item text-base md:text-lg font-semibold text-foreground italic">
                "Accelerate your Brilliance Through The Galaxies."
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-3 md:gap-6 mt-8 md:mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item glass-premium px-4 md:px-6 py-3 md:py-4 text-center flex-1 group hover:glow-soft transition-all duration-500 cursor-default"
                >
                  <div className="stat-value text-xl md:text-3xl font-bold gradient-text">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="flex-1 flex justify-center items-center order-1 lg:order-2">
            <div className="relative">
              {/* Glow backdrop - Enhanced */}
              <div className="absolute inset-0 scale-150 bg-gradient-radial opacity-50" />
              
              {/* Animated morph blob */}
              <div className="absolute inset-0 scale-110 bg-gradient-to-br from-primary/20 to-secondary/20 animate-morph blur-xl" />
              
              {/* Decorative elements - hidden on mobile */}
              <div className="hidden md:block absolute -top-8 -right-8 w-20 h-20 border-2 border-primary/30 rounded-full animate-pulse-slow" />
              <div className="hidden md:block absolute -bottom-6 -left-6 w-14 h-14 bg-secondary/20 rounded-full animate-float" />
              <div className="hidden md:block absolute top-1/2 -right-12 w-4 h-4 bg-accent/40 rounded-full animate-float-slow" />
              
              {/* Orbital dots */}
              <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary/60 rounded-full" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-secondary/60 rounded-full" />
              </div>
              
              {/* Astronaut image */}
              <img
                src={astronaut}
                alt="Astrocodez Team"
                className="relative z-10 w-48 h-48 md:w-72 md:h-72 lg:w-[420px] lg:h-[420px] object-contain"
                style={{
                  filter: 'drop-shadow(0 0 40px hsla(var(--primary), 0.2))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
