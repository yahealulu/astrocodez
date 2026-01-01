import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@astrocodez.com' },
  { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Visit Us', value: 'Somewhere in the Galaxy' },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Magnetic button effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = submitBtnRef.current;
    if (!btn || window.innerWidth < 768) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = submitBtnRef.current;
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
    const title = titleRef.current;
    const info = infoRef.current;
    const form = formRef.current;

    if (!section || !title || !info || !form) return;

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
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Mobile animations
      mm.add('(max-width: 1023px)', () => {
        // Info cards slide up with stagger
        gsap.fromTo(
          info.querySelectorAll('.info-item'),
          { 
            y: 40, 
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: info,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Form slides up
        gsap.fromTo(
          form,
          { 
            y: 50, 
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      // Desktop animations
      mm.add('(min-width: 1024px)', () => {
        // Info cards slide from left with 3D rotation
        gsap.fromTo(
          info.querySelectorAll('.info-item'),
          { 
            x: -80, 
            opacity: 0,
            rotationY: -15,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: info,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Form slides from right with perspective
        gsap.fromTo(
          form,
          { 
            x: 80, 
            opacity: 0,
            rotationY: 15,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Form fields reveal one by one
        gsap.fromTo(
          form.querySelectorAll('.form-field'),
          { 
            y: 40, 
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // Icon animations with bounce
        const icons = info.querySelectorAll('.info-icon');
        icons.forEach((icon, index) => {
          gsap.fromTo(
            icon,
            { scale: 0, rotation: -30 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: index * 0.15 + 0.3,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: info,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      });

      // Floating background animation
      const bgElements = section.querySelectorAll('.bg-float');
      bgElements.forEach((el, i) => {
        gsap.to(el, {
          y: -50 + (i * 20),
          x: (i % 2 === 0 ? 30 : -30),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="slide-section py-16 md:py-28 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
      
      {/* Floating elements */}
      <div className="bg-float absolute top-20 left-[5%] w-72 h-72 rounded-full bg-gradient-radial opacity-20 blur-3xl pointer-events-none" />
      <div className="bg-float absolute bottom-32 right-[5%] w-96 h-96 rounded-full bg-gradient-radial opacity-15 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
            Signal Reception
          </span>
          <h2 className="animate-item section-title text-2xl md:text-5xl lg:text-6xl mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="animate-item section-subtitle mx-auto mt-3 md:mt-4 text-sm md:text-lg px-4 md:px-0">
            Ready to launch your project? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-5 md:space-y-6 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="info-item glass-premium p-5 md:p-6 flex items-center gap-4 md:gap-5 group transition-all duration-500 hover:glow-soft cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="info-icon w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-cosmic flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0 shadow-lg">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground text-base md:text-lg group-hover:text-primary transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-muted-foreground text-sm md:text-base truncate">{item.value}</p>
                </div>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 flex-shrink-0 hidden md:block" />
              </div>
            ))}

            {/* CTA Card */}
            <div className="info-item glass-premium p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial opacity-20 blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <h4 className="text-lg md:text-xl font-bold text-foreground">
                  Ready to Launch?
                </h4>
              </div>
              <p className="text-muted-foreground text-sm md:text-base mb-5 leading-relaxed">
                Join the growing list of businesses we've helped reach new heights in the digital cosmos.
              </p>
              <a 
                href="#contact" 
                className="btn-primary inline-flex items-center gap-2 text-sm md:text-base group"
              >
                <span>Schedule a Call</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-premium p-6 md:p-8 lg:p-10 space-y-5 md:space-y-6"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-2">
                <label className="block text-xs md:text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  className="input-field text-sm md:text-base"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs md:text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-field space-y-2">
              <label className="block text-xs md:text-sm font-medium text-foreground">
                Subject
              </label>
              <input
                type="text"
                className="input-field text-sm md:text-base"
                placeholder="Project inquiry"
              />
            </div>

            <div className="form-field space-y-2">
              <label className="block text-xs md:text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                rows={5}
                className="input-field resize-none text-sm md:text-base"
                placeholder="Tell us about your project..."
              />
            </div>

            <button 
              ref={submitBtnRef}
              type="submit" 
              className="form-field btn-primary w-full flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base py-4 group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span>Send Message</span>
              <Send className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            {/* Form decoration */}
            <p className="text-center text-xs text-muted-foreground pt-2">
              We'll get back to you within 24 hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
