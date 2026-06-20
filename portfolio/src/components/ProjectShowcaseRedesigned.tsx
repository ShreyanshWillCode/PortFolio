import React, { useState, useCallback, useRef, useMemo } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';

/* ─── Static data — defined ONCE outside the component ───────── */
const PROJECTS = [
  {
    id: 0,
    title: 'House Rental',
    description: 'A modern house rental platform to browse, list, and manage rental properties.',
    image: '/House.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    repo: 'https://github.com/ShreyanshWillCode/House-Rental-',
    live: 'https://house-rental-blush.vercel.app/',
  },
  {
    id: 1,
    title: 'Mini-Search Engine',
    description: 'A lightweight search engine that crawls, indexes, and ranks pages using TF-IDF and BFS — built from scratch with no external search libraries.',
    image: '/gravity%20search.png',
    technologies: ['Python', 'TF-IDF', 'BFS', 'Web Crawling', 'Algorithms'],
    repo: 'https://github.com/ShreyanshWillCode/Mini-Search-Engine',
    live: 'https://mini-search-engine-eight.vercel.app/',
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

  // Header reveal animation
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const reducedVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const childV = prefersReducedMotion ? reducedVariants : itemVariants;
  const parentV = prefersReducedMotion
    ? { hidden: {}, visible: { transition: { staggerChildren: 0 } } }
    : containerVariants;

  return (
    <div
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center bg-transparent"
      style={{ overflowX: 'visible', overflowY: 'visible' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 md:py-16 lg:py-20 w-full">

        {/* ── Section Header — left-aligned, typographically bold ── */}
        <motion.div
          ref={headerRef}
          className="mb-10 sm:mb-14 md:mb-18 lg:mb-20"
          variants={parentV}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
        >
          {/* Structural rule + descriptor — NOT a kicker eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-5 sm:mb-6"
            variants={childV}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: 'clamp(28px, 3vw, 40px)',
                height: '2px',
                background: '#38bdf8',
                borderRadius: '2px',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', 'Geist', sans-serif",
                fontSize: 'clamp(10px, 1.1vw, 13px)',
                letterSpacing: '0.12em',
                color: '#38bdf8',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Selected Work
            </span>
          </motion.div>

          {/* Primary heading */}
          <motion.h2
            variants={childV}
            style={{
              fontFamily: "'Outfit', 'Geist', sans-serif",
              fontSize: 'clamp(32px, 6vw, 72px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#f1f5f9',
              marginBottom: 'clamp(14px, 2vw, 22px)',
              textWrap: 'balance',
            }}
          >
            Projects that{' '}
            <span style={{ color: '#38bdf8' }}>ship.</span>
          </motion.h2>

          {/* Body descriptor */}
          <motion.p
            variants={childV}
            style={{
              fontFamily: "'Outfit', 'Geist', sans-serif",
              fontSize: 'clamp(13px, 1.5vw, 17px)',
              color: '#94a3b8',
              lineHeight: 1.7,
              maxWidth: '58ch',
              textWrap: 'pretty',
            }}
          >
            Full-stack builds, real-time systems, and client work — each one
            shipped and running in production for actual users.
          </motion.p>

          {/* Navigation hint — text only, no emoji */}
          <motion.p
            variants={childV}
            className="lg:hidden"
            style={{
              fontFamily: "'Outfit', 'Geist', sans-serif",
              fontSize: 'clamp(11px, 1.2vw, 13px)',
              color: '#475569',
              marginTop: '10px',
            }}
          >
            Swipe to browse &rarr;
          </motion.p>
          <motion.p
            variants={childV}
            className="hidden lg:block"
            style={{
              fontFamily: "'Outfit', 'Geist', sans-serif",
              fontSize: 'clamp(11px, 1.2vw, 13px)',
              color: '#475569',
              marginTop: '10px',
            }}
          >
            Hover to fan cards &middot; use arrows to navigate
          </motion.p>
        </motion.div>

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
