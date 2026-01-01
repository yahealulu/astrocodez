import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealOptions {
  // Animation properties
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  opacity?: number;
  
  // Timing
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  
  // ScrollTrigger options
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  
  // Behavior
  once?: boolean;
  mobile?: boolean;
  desktop?: boolean;
  
  // Advanced
  perspective?: number;
  rotationX?: number;
  rotationY?: number;
}

const defaultOptions: ScrollRevealOptions = {
  y: 100,
  x: 0,
  scale: 0.9,
  rotation: 0,
  opacity: 0,
  duration: 1,
  delay: 0,
  stagger: 0.1,
  ease: 'power3.out',
  start: 'top 85%',
  end: 'bottom 15%',
  scrub: false,
  pin: false,
  once: false,
  mobile: true,
  desktop: true,
  perspective: 1000,
  rotationX: 0,
  rotationY: 0,
};

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const {
        y, x, scale, rotation, opacity,
        duration, delay, stagger, ease,
        start, end, scrub, pin, once,
        mobile, desktop, perspective,
        rotationX, rotationY
      } = mergedOptions;

      // Set perspective for 3D effects
      if (rotationX || rotationY) {
        gsap.set(element.parentElement, { perspective });
      }

      const animateElement = () => {
        gsap.fromTo(
          element,
          {
            y,
            x,
            scale,
            rotation,
            opacity,
            rotationX,
            rotationY,
            transformStyle: 'preserve-3d',
          },
          {
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              pin,
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
          }
        );
      };

      // Apply based on viewport
      if (mobile && desktop) {
        animateElement();
      } else if (desktop && !mobile) {
        mm.add('(min-width: 768px)', animateElement);
      } else if (mobile && !desktop) {
        mm.add('(max-width: 767px)', animateElement);
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, []);

  return ref;
}

export function useScrollRevealChildren<T extends HTMLElement>(
  selector: string,
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll(selector);
    if (!children.length) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const {
        y, x, scale, rotation, opacity,
        duration, delay, stagger, ease,
        start, end, scrub, once,
        perspective, rotationX, rotationY
      } = mergedOptions;

      // Set perspective for 3D effects
      if (rotationX || rotationY) {
        gsap.set(element, { perspective });
      }

      const animateChildren = () => {
        gsap.fromTo(
          children,
          {
            y,
            x,
            scale,
            rotation,
            opacity,
            rotationX,
            rotationY,
            transformStyle: 'preserve-3d',
          },
          {
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            duration,
            delay,
            stagger,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
          }
        );
      };

      const { mobile, desktop } = mergedOptions;
      if (mobile && desktop) {
        animateChildren();
      } else if (desktop && !mobile) {
        mm.add('(min-width: 768px)', animateChildren);
      } else if (mobile && !desktop) {
        mm.add('(max-width: 767px)', animateChildren);
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, [selector]);

  return ref;
}

// Preset configurations for common animation patterns
export const revealPresets = {
  // Cinematic slide up with scale
  cinematic: {
    y: 120,
    scale: 0.85,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
  },
  
  // Subtle fade up
  subtle: {
    y: 40,
    scale: 1,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  },
  
  // 3D flip in
  flip: {
    y: 60,
    rotationX: 15,
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  
  // Slide from left
  slideLeft: {
    x: -100,
    y: 0,
    scale: 1,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  
  // Slide from right
  slideRight: {
    x: 100,
    y: 0,
    scale: 1,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  },
  
  // Pop in with bounce
  pop: {
    y: 30,
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
  
  // Staggered wave (for grids)
  wave: {
    y: 80,
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out',
  },
};

export default useScrollReveal;

