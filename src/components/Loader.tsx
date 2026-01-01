import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import logo from '@/assets/logo.svg';

interface LoaderProps {
  onComplete: () => void;
  minimumDuration?: number;
}

const Loader = ({ onComplete, minimumDuration = 2500 }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = loaderRef.current;
    const logoEl = logoRef.current;
    const rings = ringsRef.current;
    const text = textRef.current;
    const progressBar = progressRef.current;
    const glow = glowRef.current;

    if (!loader || !logoEl || !rings || !text || !progressBar || !glow) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(logoEl, { scale: 0.8, opacity: 0 });
      gsap.set(rings.children, { scale: 0.9, opacity: 0 });
      gsap.set(text.children, { y: 20, opacity: 0 });
      gsap.set(progressBar, { scaleX: 0 });
      gsap.set(glow, { scale: 0.8, opacity: 0 });

      // Entrance timeline - smoother, more professional
      const entranceTl = gsap.timeline();

      // Glow fades in first
      entranceTl.to(glow, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });

      // Logo fades in smoothly
      entranceTl.to(
        logoEl,
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Rings fade in with subtle scale
      entranceTl.to(
        rings.children,
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // Text reveal
      entranceTl.to(
        text.children,
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Progress bar animation
      gsap.to(progressBar, {
        scaleX: 1,
        duration: minimumDuration / 1000,
        ease: 'power1.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
      });

      // Subtle continuous animations - SMOOTH, not rapid
      // Logo gentle pulse
      gsap.to(logoEl, {
        scale: 1.03,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Glow subtle pulse
      gsap.to(glow, {
        opacity: 0.6,
        scale: 1.1,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Rings slow rotation
      gsap.to(rings.children[0], {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
      gsap.to(rings.children[1], {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });
      gsap.to(rings.children[2], {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      // Exit animation after minimum duration
      setTimeout(() => {
        const exitTl = gsap.timeline({
          onComplete: onComplete,
        });

        // Stop continuous animations
        gsap.killTweensOf(logoEl);
        gsap.killTweensOf(glow);
        gsap.killTweensOf(rings.children);

        // Smooth fade out - everything fades together
        exitTl.to(
          [logoEl, rings, text, progressBar.parentElement, glow],
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'power2.inOut',
          }
        );

        // Loader fades out smoothly
        exitTl.to(
          loader,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '-=0.2'
        );
      }, minimumDuration);
    }, loader);

    return () => {
      ctx.revert();
    };
  }, [minimumDuration, onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(230, 25%, 5%) 0%, hsl(240, 20%, 7%) 50%, hsl(230, 25%, 5%) 100%)',
      }}
    >
      {/* Static gradient background - no moving particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
          style={{
            background: 'radial-gradient(circle, hsla(245, 90%, 66%, 0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main loader content */}
      <div className="relative flex flex-col items-center">
        {/* Ambient glow behind logo */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(245, 90%, 66%, 0.3) 0%, hsla(200, 100%, 50%, 0.1) 50%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Orbital rings - clean, minimal */}
        <div ref={ringsRef} className="absolute inset-0 flex items-center justify-center">
          {/* Inner ring */}
          <div 
            className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full"
            style={{ 
              border: '1px solid hsla(245, 90%, 66%, 0.2)',
            }}
          />
          
          {/* Middle ring */}
          <div 
            className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full"
            style={{ 
              border: '1px solid hsla(200, 100%, 50%, 0.15)',
            }}
          />
          
          {/* Outer ring */}
          <div 
            className="absolute w-52 h-52 md:w-68 md:h-68 rounded-full"
            style={{ 
              border: '1px solid hsla(320, 100%, 60%, 0.1)',
              width: window.innerWidth < 768 ? '13rem' : '17rem',
              height: window.innerWidth < 768 ? '13rem' : '17rem',
            }}
          />
        </div>

        {/* Logo */}
        <div ref={logoRef} className="relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <img 
              src={logo} 
              alt="Astro Codez" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 20px hsla(245, 90%, 66%, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="mt-12 md:mt-16 text-center">
          <div className="text-xl md:text-2xl font-bold mb-1">
            <span className="gradient-text">Astro</span>
            <span className="text-foreground">Codez</span>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            Building Digital Universes
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 md:mt-10 w-40 md:w-48">
          <div className="h-0.5 bg-muted/20 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, hsl(245, 90%, 66%), hsl(200, 100%, 50%))',
              }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-muted-foreground/70">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
