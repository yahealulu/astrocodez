import { useEffect, useRef, RefObject, useCallback } from 'react';
import { gsap } from 'gsap';

export interface MagneticOptions {
  // Strength of the magnetic effect (0-1)
  strength?: number;
  // Maximum distance the element can move
  maxDistance?: number;
  // Duration of the animation
  duration?: number;
  // Easing function
  ease?: string;
  // Only apply on desktop
  desktopOnly?: boolean;
  // Scale on hover
  hoverScale?: number;
  // Rotation multiplier
  rotationMultiplier?: number;
}

const defaultOptions: MagneticOptions = {
  strength: 0.3,
  maxDistance: 30,
  duration: 0.5,
  ease: 'power3.out',
  desktopOnly: true,
  hoverScale: 1.05,
  rotationMultiplier: 0,
};

export function useMagneticCursor<T extends HTMLElement>(
  options: MagneticOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const mergedOptions = { ...defaultOptions, ...options };
  const isHovered = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current;
    if (!element || !isHovered.current) return;

    const { strength, maxDistance, duration, ease, rotationMultiplier } = mergedOptions;
    const rect = element.getBoundingClientRect();
    
    // Calculate center of element
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Calculate movement with strength and max distance
    const moveX = Math.max(-maxDistance!, Math.min(maxDistance!, deltaX * strength!));
    const moveY = Math.max(-maxDistance!, Math.min(maxDistance!, deltaY * strength!));
    
    // Optional rotation based on movement
    const rotation = rotationMultiplier! * (deltaX / rect.width) * 10;

    gsap.to(element, {
      x: moveX,
      y: moveY,
      rotation,
      duration,
      ease,
      overwrite: 'auto',
    });
  }, [mergedOptions]);

  const handleMouseEnter = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    isHovered.current = true;
    const { hoverScale, duration, ease } = mergedOptions;

    gsap.to(element, {
      scale: hoverScale,
      duration: duration! * 0.5,
      ease,
      overwrite: 'auto',
    });
  }, [mergedOptions]);

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    isHovered.current = false;
    const { duration, ease } = mergedOptions;

    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration,
      ease,
      overwrite: 'auto',
    });
  }, [mergedOptions]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if desktop only
    if (mergedOptions.desktopOnly && window.innerWidth < 768) {
      return;
    }

    // Set initial styles for GPU acceleration
    gsap.set(element, {
      willChange: 'transform',
    });

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, mergedOptions.desktopOnly]);

  return ref;
}

// Hook for 3D tilt effect on cards
export function use3DTilt<T extends HTMLElement>(
  options: {
    maxRotation?: number;
    perspective?: number;
    scale?: number;
    duration?: number;
    glare?: boolean;
  } = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const {
    maxRotation = 10,
    perspective = 1000,
    scale = 1.02,
    duration = 0.4,
    glare = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip on mobile
    if (window.innerWidth < 768) return;

    // Set perspective on parent
    if (element.parentElement) {
      gsap.set(element.parentElement, { perspective });
    }

    gsap.set(element, {
      transformStyle: 'preserve-3d',
      willChange: 'transform',
    });

    // Create glare element if enabled
    let glareEl: HTMLDivElement | null = null;
    if (glare) {
      glareEl = document.createElement('div');
      glareEl.className = 'tilt-glare';
      glareEl.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.25) 0%,
          rgba(255, 255, 255, 0) 60%
        );
        opacity: 0;
        transition: opacity 0.3s;
        border-radius: inherit;
        z-index: 100;
      `;
      element.style.position = 'relative';
      element.appendChild(glareEl);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Normalize to -1 to 1
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;
      
      const rotateY = normalizedX * maxRotation;
      const rotateX = -normalizedY * maxRotation;

      gsap.to(element, {
        rotateX,
        rotateY,
        scale,
        duration,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Update glare position
      if (glareEl) {
        const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
        glareEl.style.background = `linear-gradient(
          ${angle + 90}deg,
          rgba(255, 255, 255, 0.2) 0%,
          rgba(255, 255, 255, 0) 60%
        )`;
      }
    };

    const handleMouseEnter = () => {
      if (glareEl) {
        glareEl.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: duration * 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (glareEl) {
        glareEl.style.opacity = '0';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (glareEl && element.contains(glareEl)) {
        element.removeChild(glareEl);
      }
    };
  }, [maxRotation, perspective, scale, duration, glare]);

  return ref;
}

// Preset magnetic configurations
export const magneticPresets = {
  // Subtle button effect
  button: {
    strength: 0.2,
    maxDistance: 15,
    hoverScale: 1.03,
    duration: 0.4,
  },
  
  // Stronger card effect
  card: {
    strength: 0.15,
    maxDistance: 20,
    hoverScale: 1.02,
    duration: 0.5,
  },
  
  // Very subtle for large elements
  subtle: {
    strength: 0.1,
    maxDistance: 10,
    hoverScale: 1.01,
    duration: 0.6,
  },
  
  // Strong interactive effect
  interactive: {
    strength: 0.4,
    maxDistance: 40,
    hoverScale: 1.05,
    duration: 0.3,
    rotationMultiplier: 0.5,
  },
};

export default useMagneticCursor;

