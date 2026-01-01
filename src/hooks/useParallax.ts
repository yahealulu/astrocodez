import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ParallaxOptions {
  // How much the element moves relative to scroll (negative = opposite direction)
  speed?: number;
  // Direction of movement
  direction?: 'vertical' | 'horizontal';
  // Start trigger position
  start?: string;
  // End trigger position
  end?: string;
  // Use the section or viewport as trigger
  triggerElement?: HTMLElement | null;
  // Scrub smoothness (true = instant, number = duration)
  scrub?: boolean | number;
  // Only on desktop
  desktopOnly?: boolean;
}

const defaultOptions: ParallaxOptions = {
  speed: 0.5,
  direction: 'vertical',
  start: 'top bottom',
  end: 'bottom top',
  triggerElement: null,
  scrub: 1,
  desktopOnly: false,
};

export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip on mobile if desktopOnly
    if (mergedOptions.desktopOnly && window.innerWidth < 768) {
      return;
    }

    const { speed, direction, start, end, triggerElement, scrub } = mergedOptions;
    
    // Calculate movement based on speed
    // speed of 1 = moves with scroll, 0.5 = half speed, -0.5 = opposite half speed
    const movement = speed! * 200; // Base movement of 200px at full speed

    const ctx = gsap.context(() => {
      gsap.set(element, {
        willChange: 'transform',
      });

      const animationProps = direction === 'vertical' 
        ? { y: movement }
        : { x: movement };

      gsap.fromTo(
        element,
        direction === 'vertical' ? { y: -movement } : { x: -movement },
        {
          ...animationProps,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerElement || element,
            start,
            end,
            scrub,
          },
        }
      );
    }, element);

    return () => {
      ctx.revert();
    };
  }, []);

  return ref;
}

// Multi-layer parallax for depth effects
export function useParallaxLayers<T extends HTMLElement>(
  layerSpeeds: number[]
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Skip on mobile
    if (window.innerWidth < 768) return;

    const layers = container.querySelectorAll('[data-parallax-layer]');
    if (!layers.length) return;

    const ctx = gsap.context(() => {
      layers.forEach((layer, index) => {
        const speed = layerSpeeds[index] ?? 0.5;
        const movement = speed * 150;

        gsap.set(layer, { willChange: 'transform' });

        gsap.fromTo(
          layer,
          { y: -movement },
          {
            y: movement,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [layerSpeeds]);

  return ref;
}

// Counter animation hook for stats
export function useCountUp<T extends HTMLElement>(
  endValue: number,
  options: {
    duration?: number;
    delay?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const {
    duration = 2,
    delay = 0,
    prefix = '',
    suffix = '',
    decimals = 0,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: endValue,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          element.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [endValue, duration, delay, prefix, suffix, decimals]);

  return ref;
}

// Line draw animation (for timeline connectors)
export function useLineDraw<T extends SVGPathElement | HTMLElement>(
  options: {
    duration?: number;
    delay?: number;
    scrub?: boolean | number;
    start?: string;
    end?: string;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const {
    duration = 1,
    delay = 0,
    scrub = 1,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // For SVG paths
      if (element instanceof SVGPathElement) {
        const length = element.getTotalLength();
        
        gsap.set(element, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(element, {
          strokeDashoffset: 0,
          duration: scrub ? undefined : duration,
          delay: scrub ? undefined : delay,
          ease: scrub ? 'none' : 'power2.inOut',
          scrollTrigger: {
            trigger: element.closest('section') || element,
            start,
            end,
            scrub,
          },
        });
      } 
      // For HTML elements (like divs used as lines)
      else {
        gsap.fromTo(
          element,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: scrub ? undefined : duration,
            delay: scrub ? undefined : delay,
            ease: scrub ? 'none' : 'power2.inOut',
            scrollTrigger: {
              trigger: element.closest('section') || element,
              start,
              end,
              scrub,
            },
          }
        );
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, [duration, delay, scrub, start, end]);

  return ref;
}

export default useParallax;

