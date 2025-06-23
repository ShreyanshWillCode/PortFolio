import { useEffect, useRef } from 'react';

const useScrollAnimation = (activeClass = null) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.remove('opacity-0', 'translate-y-10');
              entry.target.classList.add('opacity-100', 'translate-y-0');
              if (activeClass) entry.target.classList.add(activeClass);
            }, 100);
          } else {
            entry.target.classList.remove('opacity-100', 'translate-y-0');
            entry.target.classList.add('opacity-0', 'translate-y-10');
            if (activeClass) entry.target.classList.remove(activeClass);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [activeClass]);

  return elementRef;
};

export default useScrollAnimation; 