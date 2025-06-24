import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  repo: string;
  live: string;
}

const projects: Project[] = [
  {
    title: "Mars Rover Navigation",
    description: "A simulation of the Mars Rover mission with pathfinding algorithms and terrain mapping capabilities.",
    image: "/Mars-Rover.png",
    technologies: ["JavaScript", "Three.js", "WebGL", "Algorithms"],
    repo: "https://github.com/ShreyanshWillCode/Mars-Rover",
    live: "https://mars-rover-navigationfrontend.vercel.app/"
  },
  {
    title: "Notification Service",
    description: "A real-time notification service built with WebSocket technology for instant message delivery.",
    image: "/Notification_service.png",
    technologies: ["WebSocket", "Node.js", "Express", "React"],
    repo: "https://github.com/ShreyanshWillCode/Notification_Service",
    live: "https://notification-service-theta.vercel.app/"
  },
  {
    title: "Shaabdkosh Dictionary",
    description: "A modern dictionary application with word definitions, synonyms, and examples.",
    image: "/Dictionary.png",
    technologies: ["React", "API Integration", "CSS"],
    repo: "https://github.com/ShreyanshWillCode/Dictionary-app",
    live: "https://shaabdkosh.vercel.app/"
  },
  {
    title: "Spam Email Classifier",
    description: "Machine learning model to classify emails as spam or not spam.",
    image: "/Spam_email.png",
    technologies: ["Python", "Machine Learning", "NLP"],
    repo: "https://github.com/ShreyanshWillCode/Spam-Email-Classifier",
    live: "https://spam-email-classifier-five.vercel.app/"
  },
  {
    title: "Tic Tac Toe",
    description: "A classic Tic Tac Toe game with a modern UI and multiplayer support.",
    image: "/Tic-Tac.png",
    technologies: ["React", "CSS", "Game Logic"],
    repo: "https://github.com/ShreyanshWillCode/Tic-Tac-Toe",
    live: "https://tick-tak-toe.vercel.app/"
  },
  {
    title: "Weather App",
    description: "Real-time weather application with location-based forecasts.",
    image: "/Weather.png",
    technologies: ["React", "Weather API", "Geolocation"],
    repo: "https://github.com/ShreyanshWillCode/Weather-App",
    live: "https://weather-app-blot.vercel.app/"
  }
];

const ProjectShowcaseTailwind: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  // Mobile overlay state
  const [activeCard, setActiveCard] = useState<number | null>(null);
  // For mobile tap-vs-drag detection
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Detect mobile device
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  // Measure card and container width on mount and resize
  useEffect(() => {
    const measureDimensions = () => {
      if (firstCardRef.current) {
        setCardWidth(firstCardRef.current.offsetWidth);
      }
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.offsetWidth);
      }
    };

    measureDimensions();
    window.addEventListener('resize', measureDimensions);
    return () => window.removeEventListener('resize', measureDimensions);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && cardWidth > 0 && containerWidth > 0) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollContainerRef.current?.scrollLeft || 0;
    document.body.style.userSelect = 'none';
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const dx = dragStartX.current - e.clientX;
    scrollContainerRef.current.scrollLeft = dragStartScroll.current + dx;
  };
  const onMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };
  // Touch handlers
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartScroll.current = scrollContainerRef.current?.scrollLeft || 0;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const dx = dragStartX.current - e.touches[0].clientX;
    scrollContainerRef.current.scrollLeft = dragStartScroll.current + dx;
  };
  const onTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onTouchEnd);
    } else {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  // Update current index on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || cardWidth === 0 || containerWidth === 0) return;

    const updateCurrentIndex = () => {
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener('scroll', updateCurrentIndex);
    updateCurrentIndex();
    return () => container.removeEventListener('scroll', updateCurrentIndex);
  }, [cardWidth, containerWidth]);

  // Debounced auto-center after scroll/drag ends
  useEffect(() => {
    if (!scrollContainerRef.current || cardWidth === 0 || containerWidth === 0) return;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Find the card closest to the center
        const scrollLeft = container.scrollLeft;
        const center = scrollLeft + container.offsetWidth / 2;
        let minDist = Infinity;
        let closestIdx = 0;
        for (let i = 0; i < projects.length; i++) {
          const cardCenter = (i * cardWidth) + cardWidth / 2;
          const dist = Math.abs(center - cardCenter);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        }
        // Center the closest card
        const targetScrollLeft = (closestIdx * cardWidth) - ((containerWidth / 2) - (cardWidth / 2));
        container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        setCurrentIndex(closestIdx);
      }, 120); // 120ms debounce
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [cardWidth, containerWidth, projects.length]);

  // Close overlay on outside tap (mobile)
  useEffect(() => {
    if (!isMobile || activeCard === null) return;
    const handleTouch = (e: TouchEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.closest('.project-card-item')) {
        setActiveCard(null);
      }
    };
    document.addEventListener('touchstart', handleTouch);
    return () => document.removeEventListener('touchstart', handleTouch);
  }, [isMobile, activeCard]);

  const paddingLeft = containerWidth > 0 && cardWidth > 0 ? (containerWidth / 2) - (cardWidth / 2) : 0;
  const paddingRight = containerWidth > 0 && cardWidth > 0 ? (containerWidth / 2) - (cardWidth / 2) : 0;

  return (
    <section className="w-full py-16 min-h-screen bg-background-default relative overflow-hidden flex flex-col items-center justify-center">
      {/* Section Title */}
      <div className="container mx-auto px-5 mb-8 pt-0">
        <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
        <p className="text-gray-400 max-w-2xl">
          <span className="animate-pulse inline-block">E</span>
          xplore some of my recent work and personal projects. Each project represents a unique challenge and solution.
        </p>
      </div>

      {/* Outer Container with rounded corners and shadow */}
      <div className="relative mb-8 mx-auto max-w-7xl px-4 md:px-0 flex-grow flex items-center h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh]">
        <div className="relative py-8 flex justify-center w-full h-full">
          {/* Projects Container */}
          <div
            ref={scrollContainerRef}
            className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 scroll-smooth max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] pb-10 h-full items-center px-4 md:px-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              userSelect: 'none',
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              willChange: 'transform, scroll-position'
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {projects.map((project, index) => {
              // Calculate smooth scale based on distance from center
              let scale = 1;
              if (cardWidth > 0 && containerWidth > 0 && scrollContainerRef.current) {
              const container = scrollContainerRef.current;
                const scrollLeft = container.scrollLeft;
                const center = scrollLeft + container.offsetWidth / 2;
                const cardCenter = (index * cardWidth) + cardWidth / 2;
                const dist = Math.abs(center - cardCenter);
                const maxDist = container.offsetWidth / 2 + cardWidth;
                // Scale from 1.1 at center to 1 at maxDist, with a smooth curve
                scale = 1 + 0.1 * Math.max(0, 1 - dist / maxDist);
              }
              // Touch handlers for tap-vs-drag
              const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
                if (!isMobile) return;
                const touch = e.touches[0];
                touchStartX.current = touch.clientX;
                touchStartY.current = touch.clientY;
              };
              const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
                if (!isMobile) return;
                const touch = e.changedTouches[0];
                const dx = Math.abs(touch.clientX - touchStartX.current);
                const dy = Math.abs(touch.clientY - touchStartY.current);
                if (dx < 10 && dy < 10) {
                  // Treat as tap
                  setActiveCard(activeCard === index ? null : index);
                }
              };
              return (
              <motion.div
                key={project.title}
                ref={index === 0 ? firstCardRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                    scale: !isMobile ? scale : 1,
                    x: !isMobile && cardWidth > 0 ? (index - currentIndex) * (-cardWidth * 0.15) : 0,
                    zIndex: Math.round(scale * 100),
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                  scale: { duration: 0.3 }
                }}
                  className="flex-none w-[200px] sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-[32%] snap-center snap-always project-card-item relative h-[300px] sm:h-[340px] md:h-[370px] lg:h-[400px] xl:h-[420px] first:ml-0"
                style={{
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always',
                    marginLeft: index === 0 ? '0' : '1rem',
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 h-full flex flex-col relative">
                    {/* Card Image as background */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover sm:scale-110 z-0 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Overlay: visible on hover/focus (desktop) or tap (mobile) */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isMobile ? (activeCard === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }) : {}}
                      whileHover={!isMobile ? { opacity: 1, y: 0 } : undefined}
                      whileFocus={!isMobile ? { opacity: 1, y: 0 } : undefined}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0 z-30 bg-gradient-to-br from-black/70 via-indigo-900/70 to-black/80 backdrop-blur-md flex flex-col justify-center items-center text-center px-6"
                      onClick={e => {
                        if (isMobile) e.stopPropagation();
                      }}
                    >
                      {/* Mobile close button */}
                      {isMobile && activeCard === index && (
                        <button
                          className="absolute top-4 right-4 text-white bg-black/40 rounded-full p-2 z-40"
                          onClick={e => {
                            e.stopPropagation();
                            setActiveCard(null);
                          }}
                          aria-label="Close details"
                        >
                          &times;
                        </button>
                      )}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-200 mb-3 line-clamp-3 drop-shadow-lg">{project.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs bg-gray-700/70 text-gray-200 rounded-full drop-shadow"
                          >
                            {tech}
                          </span>
                        ))}
                  </div>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={0}
                        className="inline-block px-8 py-2 rounded bg-teal-500 text-white font-semibold text-base md:text-lg shadow-lg hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300/80 whitespace-nowrap text-center border-none select-none"
                        aria-label={`Open live deploy for ${project.title}`}
                        onClick={e => e.stopPropagation()}
                      >
                        Live Demo
                      </a>
                    </motion.div>
                    {/* Invisible content for layout, not visible anymore */}
                    <div className="invisible p-3 sm:p-4 md:p-5 lg:p-6 flex-grow flex flex-col">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2 flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                        href={project.repo}
                      className="inline-flex items-center text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 mt-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      View Project
                      <svg
                        className="w-3 h-3 ml-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-6 pb-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current && cardWidth > 0 && containerWidth > 0) {
                    const container = scrollContainerRef.current;
                    const targetScrollLeft = (index * cardWidth) - paddingLeft;
                    container.scrollTo({
                      left: targetScrollLeft,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-blue-500 w-4' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseTailwind; 