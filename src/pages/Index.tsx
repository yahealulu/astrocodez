import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProcessSection from '@/components/ProcessSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import backgroundImage from '@/assets/background.jpg';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for ultra-smooth scrolling with optimized settings
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      
      // Update scroll progress
      const progress = e.progress || 0;
      setScrollProgress(progress);
    });

    // Sync GSAP ScrollTrigger with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle resize to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Initial refresh after fonts and images load
    window.addEventListener('load', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed Background with enhanced layers */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/75" />
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        
        {/* Mesh gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        
        {/* Noise texture for premium look */}
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* Ambient particles - optimized count based on device */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 35)].map((_, i) => (
          <div
            key={i}
            className={i % 3 === 0 ? 'particle-large' : 'particle'}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * (i % 3 === 0 ? 6 : 3)}px`,
              height: `${2 + Math.random() * (i % 3 === 0 ? 6 : 3)}px`,
              animation: `floatSlow ${10 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Floating orbs for ambient effect */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] animate-float-slow"
          style={{
            background: 'radial-gradient(circle, hsla(var(--primary), 0.08), transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-float"
          style={{
            background: 'radial-gradient(circle, hsla(var(--secondary), 0.06), transparent 70%)',
            bottom: '20%',
            right: '-15%',
            animationDelay: '2s',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] animate-float-gentle"
          style={{
            background: 'radial-gradient(circle, hsla(var(--accent), 0.05), transparent 70%)',
            top: '50%',
            left: '30%',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ProcessSection />
          <ServicesSection />
          <WhyChooseUsSection />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
