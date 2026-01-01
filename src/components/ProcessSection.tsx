import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Compass, Palette, Code, Orbit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Rocket,
    number: '01',
    title: 'Discovery',
    subtitle: 'Launch Preparation',
    description: 'We dive deep into understanding your vision, goals, and challenges. Every successful mission starts with meticulous planning.',
    details: ['Stakeholder interviews', 'Market research', 'Technical assessment'],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Compass,
    number: '02',
    title: 'Strategy',
    subtitle: 'Navigation Setup',
    description: 'We chart the course, defining the roadmap and architecture that will guide your project to success.',
    details: ['Solution architecture', 'Timeline planning', 'Resource allocation'],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Palette,
    number: '03',
    title: 'Design',
    subtitle: 'Visual Engineering',
    description: 'Our designers craft stunning interfaces that not only look beautiful but create intuitive user experiences.',
    details: ['UI/UX design', 'Prototyping', 'Design systems'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code,
    number: '04',
    title: 'Development',
    subtitle: 'Building the Spacecraft',
    description: 'Our engineers bring designs to life with clean, efficient code built for performance and scalability.',
    details: ['Agile development', 'Code reviews', 'Quality assurance'],
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Orbit,
    number: '05',
    title: 'Launch',
    subtitle: 'Mission Complete',
    description: 'We deploy your solution and ensure a smooth transition with ongoing support and optimization.',
    details: ['Deployment', 'Training', 'Continuous support'],
    gradient: 'from-teal-500 to-green-500',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;
    const progressLine = progressLineRef.current;
    const steps = stepsRef.current;

    if (!section || !title || !timeline || !progressLine || !steps) return;

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

      // Progress line animation (draws as you scroll)
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      // Mobile animations
      mm.add('(max-width: 1023px)', () => {
        const stepCards = steps.querySelectorAll('.process-step');
        stepCards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 60, 
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Animate the icon
          const icon = card.querySelector('.step-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });
      });

      // Desktop animations
      mm.add('(min-width: 1024px)', () => {
        const stepCards = steps.querySelectorAll('.process-step');
        stepCards.forEach((card, index) => {
          const isEven = index % 2 === 0;
          
          gsap.fromTo(
            card,
            { 
              x: isEven ? -80 : 80,
              y: 40,
              opacity: 0,
              scale: 0.9,
              rotationY: isEven ? -10 : 10,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );

          // Animate the icon with bounce
          const icon = card.querySelector('.step-icon');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }

          // Animate the timeline dot
          const dot = timeline.querySelectorAll('.timeline-dot')[index];
          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 75%',
                  toggleActions: 'play reverse play reverse',
                },
              }
            );
          }
        });

        // Floating decorative elements
        const decorElements = section.querySelectorAll('.decor-float');
        decorElements.forEach((el, i) => {
          gsap.to(el, {
            y: -30 + (i * 10),
            rotation: 10 - (i * 5),
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
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
      id="process"
      className="slide-section py-20 md:py-32 relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      
      {/* Floating decorative elements */}
      <div className="decor-float absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-radial opacity-20 blur-2xl pointer-events-none" />
      <div className="decor-float absolute bottom-40 right-10 w-48 h-48 rounded-full bg-gradient-radial opacity-15 blur-3xl pointer-events-none" />
      <div className="decor-float absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-radial opacity-10 blur-xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
            The Journey
          </span>
          <h2 className="animate-item section-title text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
            <span className="gradient-text">Our Process</span>
          </h2>
          <p className="animate-item section-subtitle mx-auto text-sm md:text-lg px-4 md:px-0">
            A proven methodology that transforms your ideas into stellar digital solutions
          </p>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Timeline line - hidden on mobile */}
          <div className="timeline-line hidden lg:block" />
          <div 
            ref={progressLineRef} 
            className="timeline-line-progress hidden lg:block"
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline dots - hidden on mobile */}
          <div className="hidden lg:block">
            {processSteps.map((_, index) => (
              <div
                key={index}
                className="timeline-dot"
                style={{
                  top: `${(index / (processSteps.length - 1)) * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Steps */}
          <div ref={stepsRef} className="space-y-8 md:space-y-12 lg:space-y-0">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`process-step lg:flex lg:items-center lg:gap-8 ${
                    index !== 0 ? 'lg:mt-24' : ''
                  }`}
                  style={{ perspective: '1000px' }}
                >
                  {/* Card */}
                  <div
                    className={`process-card group ${
                      isEven ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'
                    } lg:w-[45%]`}
                  >
                    {/* Step number badge */}
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                        <span className="text-lg md:text-xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="step-icon icon-container w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-background to-muted flex items-center justify-center mb-5 border border-border/50">
                      <step.icon className={`w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br ${step.gradient} bg-clip-text`} style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }} />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-primary/80 uppercase tracking-wider mb-1">
                          {step.subtitle}
                        </p>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-500">
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details list */}
                      <ul className="flex flex-wrap gap-2 pt-2">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-5`} />
                    </div>
                  </div>

                  {/* Connection line to timeline (desktop only) */}
                  <div 
                    className={`hidden lg:block absolute top-1/2 w-[5%] h-px bg-gradient-to-r ${
                      isEven 
                        ? 'right-[50%] from-primary/0 to-primary/30' 
                        : 'left-[50%] from-primary/30 to-primary/0'
                    }`}
                    style={{ transform: 'translateY(-50%)' }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Ready to start your journey?
          </p>
          <a 
            href="#contact" 
            className="btn-primary inline-flex items-center gap-2 text-sm md:text-base"
          >
            <span>Begin Your Mission</span>
            <Rocket className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

