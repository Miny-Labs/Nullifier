"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isVisible };
}

// Hook for staggered animations on multiple children
export function useStaggerAnimation(
  itemCount: number,
  options: UseScrollAnimationOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 50, ...scrollOptions } = options;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(scrollOptions);

  const getStaggerDelay = useCallback(
    (index: number) => ({
      transitionDelay: `${index * staggerDelay}ms`,
    }),
    [staggerDelay]
  );

  const getItemClassName = useCallback(
    (index: number) => {
      const baseClass = "animate-on-scroll";
      const visibleClass = isVisible ? "animate-in" : "";
      return `${baseClass} ${visibleClass}`.trim();
    },
    [isVisible]
  );

  return { containerRef: ref, isVisible, getStaggerDelay, getItemClassName };
}

// Simplified hook that just adds/removes a class
export function useAnimateOnScroll(className: string = "animate-in") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(className);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [className]);

  return ref;
}
