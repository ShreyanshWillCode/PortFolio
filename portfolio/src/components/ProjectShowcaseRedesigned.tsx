import React, { useState, useCallback, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';

/* ─── Static data — defined ONCE outside the component ───────── */
const PROJECTS = [
  {
    id: 1,
    title: 'House Rental',
    description: 'A modern house rental platform to browse, list, and manage rental properties.',
    image: '/House.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    repo: 'https://github.com/ShreyanshWillCode/House-Rental-',
    live: 'https://house-rental-blush.vercel.app/',
  },
  {
    id: 2,
    title: 'Zaigro',
    description: 'A freelance digital platform for a local food and grocery delivery service.',
    image: '/Zaigro.png',
    technologies: ['React', 'Web Delivery', 'Freelance'],
    live: 'https://zaigro.in/',
  },
  {
    id: 3,
    title: 'eWallet',
    description: 'A secure digital wallet application for managing real money transactions, featuring a sleek modern interface.',
    image: '/Ewallet.png',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    repo: 'https://github.com/ShreyanshWillCode/User-Wallet-APP',
    live: 'https://ewallet-eight.vercel.app/',
  },
  {
    id: 4,
    title: 'Mars Rover Navigation',
    description: 'A simulation of the Mars Rover mission with pathfinding algorithms and terrain mapping capabilities.',
    image: '/Mars-Rover.png',
    technologies: ['JavaScript', 'Three.js', 'WebGL', 'Algorithms'],
    repo: 'https://github.com/ShreyanshWillCode/Mars_Rover_Navigation_',
    live: 'https://mars-rover-navigationfrontend.vercel.app/',
  },
  {
    id: 5,
    title: 'Notification Service',
    description: 'A real-time notification service built with WebSocket technology for instant message delivery.',
    image: '/Notification_service.png',
    technologies: ['WebSocket', 'Node.js', 'Express', 'React'],
    repo: 'https://github.com/ShreyanshWillCode/Notification_Service',
    live: 'https://notification-service-theta.vercel.app/',
  },
  {
    id: 6,
    title: 'Shaabdkosh Dictionary',
    description: 'A modern dictionary application with word definitions, synonyms, and examples.',
    image: '/Dictionary.png',
    technologies: ['React', 'API Integration', 'CSS'],
    repo: 'https://github.com/ShreyanshWillCode/Dictionary_APP',
    live: 'https://shaabdkosh.vercel.app/',
  },
  {
    id: 7,
    title: 'Spam Email Classifier',
    description: 'Machine learning model to classify emails as spam or not spam.',
    image: '/Spam_email.png',
    technologies: ['Python', 'Machine Learning', 'NLP'],
    repo: 'https://github.com/ShreyanshWillCode/Spam_Email_Classifier',
    live: 'https://spam-email-classifier-five.vercel.app/',
  },
  {
    id: 8,
    title: 'Weather App',
    description: 'Real-time weather application with location-based forecasts.',
    image: '/Weather.png',
    technologies: ['React', 'Weather API', 'Geolocation'],
    repo: 'https://github.com/ShreyanshWillCode/Weather_app',
    live: 'https://weather-app-blot.vercel.app/',
  },
] as const;

const TOTAL = PROJECTS.length;

export default function ProjectShowcaseRedesigned() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpread, setIsSpread] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Touch tracking — use refs so they NEVER trigger re-renders
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  /* ── Stable callbacks — never recreated ── */
  const next = useCallback(() => setActiveIndex(p => (p + 1) % TOTAL), []);
  const prev = useCallback(() => setActiveIndex(p => (p - 1 + TOTAL) % TOTAL), []);

  const handleHoverStart = useCallback(() => { if (!prefersReducedMotion) setIsSpread(true); }, [prefersReducedMotion]);
  const handleHoverEnd   = useCallback(() => setIsSpread(false), []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const dist = touchStartX.current - touchEndX.current;
    const threshold = window.innerWidth < 768 ? 30 : 50;
    if (dist > threshold) next();
    else if (dist < -threshold) prev();
    touchStartX.current = null;
    touchEndX.current = null;
  }, [next, prev]);

  const goTo = useCallback((i: number) => setActiveIndex(i), []);

  /* ── Dot indicators memoized ── */
  const dots = useMemo(() =>
    PROJECTS.map((_, i) => (
      <button
        key={i}
        onClick={() => goTo(i)}
        aria-label={`Go to project ${i + 1}`}
        aria-current={i === activeIndex ? 'true' : undefined}
        style={{
          transition: 'all 0.3s ease',
          background: i === activeIndex ? '#60a5fa' : '#475569',
          borderRadius: '9999px',
          width:  i === activeIndex ? '1.5rem' : '0.625rem',
          height: i === activeIndex ? '0.5rem'  : '0.625rem',
          border: 'none',
          cursor: 'pointer',
        }}
      />
    )),
  [activeIndex, goTo]);

  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center bg-transparent"
      style={{ overflowX: 'visible', overflowY: 'visible' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 md:py-16 lg:py-20 w-full">

        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-3 sm:mb-4 lg:mb-6">
            Featured Projects
          </h2>
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
              Explore some of my recent work and personal projects. Each project represents a unique
              challenge and solution, showcasing different technologies and design approaches.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 lg:hidden">
              💡 Swipe left or right to navigate through projects
            </p>
            <p className="text-slate-400 text-sm lg:text-base mt-2 hidden lg:block">
              💡 Hover to spread cards or use navigation controls
            </p>
          </div>
        </div>

        {/* Cards Deck + Navigation */}
        <div className="flex flex-col items-center w-full">

          {/* ── Deck container — hover events live HERE only ── */}
          <div
            className="flex justify-center items-center relative w-full"
            style={{
              minHeight: 'clamp(280px, 50vw, 650px)',
              paddingBottom: 'clamp(96px, 14vw, 256px)',
            }}
          >
            <motion.div
              className="relative touch-pan-y"
              style={{
                width: 'clamp(320px, 88vw, 1200px)',
                height: 'clamp(260px, 46vw, 600px)',
                willChange: 'contents',
              }}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {PROJECTS.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.technologies as unknown as string[]}
                  repo={'repo' in project ? project.repo : undefined}
                  live={project.live}
                  index={index}
                  isActive={index === activeIndex}
                  isSpread={isSpread}
                  totalCards={TOTAL}
                  onClick={() => goTo(index)}
                  isFirst={index === 0}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-16 relative z-50">
            <button
              onClick={prev}
              aria-label="Previous project"
              style={{
                width: 'clamp(32px, 4vw, 56px)',
                height: 'clamp(32px, 4vw, 56px)',
                borderRadius: '12px',
                border: '1px solid rgba(71,85,105,0.5)',
                background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.7))',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s ease',
              }}
            >
              <ChevronLeft style={{ width: 'clamp(12px, 2vw, 24px)', height: 'clamp(12px, 2vw, 24px)' }} aria-hidden="true" />
            </button>

            <div className="flex gap-2 items-center">{dots}</div>

            <button
              onClick={next}
              aria-label="Next project"
              style={{
                width: 'clamp(32px, 4vw, 56px)',
                height: 'clamp(32px, 4vw, 56px)',
                borderRadius: '12px',
                border: '1px solid rgba(71,85,105,0.5)',
                background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.7))',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s ease',
              }}
            >
              <ChevronRight style={{ width: 'clamp(12px, 2vw, 24px)', height: 'clamp(12px, 2vw, 24px)' }} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
