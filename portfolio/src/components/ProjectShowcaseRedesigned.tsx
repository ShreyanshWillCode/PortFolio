import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  repo: string;
  live: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mars Rover Navigation",
    description: "A simulation of the Mars Rover mission with pathfinding algorithms and terrain mapping capabilities.",
    image: "/Mars-Rover.png",
    technologies: ["JavaScript", "Three.js", "WebGL", "Algorithms"],
    repo: "https://github.com/ShreyanshWillCode/Mars_Rover_Navigation_",
    live: "https://mars-rover-navigationfrontend.vercel.app/"
  },
  {
    id: 2,
    title: "Notification Service",
    description: "A real-time notification service built with WebSocket technology for instant message delivery.",
    image: "/Notification_service.png",
    technologies: ["WebSocket", "Node.js", "Express", "React"],
    repo: "https://github.com/ShreyanshWillCode/Notification_Service",
    live: "https://notification-service-theta.vercel.app/"
  },
  {
    id: 3,
    title: "Shaabdkosh Dictionary",
    description: "A modern dictionary application with word definitions, synonyms, and examples.",
    image: "/Dictionary.png",
    technologies: ["React", "API Integration", "CSS"],
    repo: "https://github.com/ShreyanshWillCode/Dictionary_APP",
    live: "https://shaabdkosh.vercel.app/"
  },
  {
    id: 4,
    title: "Spam Email Classifier",
    description: "Machine learning model to classify emails as spam or not spam.",
    image: "/Spam_email.png",
    technologies: ["Python", "Machine Learning", "NLP"],
    repo: "https://github.com/ShreyanshWillCode/Spam_Email_Classifier",
    live: "https://spam-email-classifier-five.vercel.app/"
  },
  {
    id: 5,
    title: "Weather App",
    description: "Real-time weather application with location-based forecasts.",
    image: "/Weather.png",
    technologies: ["React", "Weather API", "Geolocation"],
    repo: "https://github.com/ShreyanshWillCode/Weather_app",
    live: "https://weather-app-blot.vercel.app/"
  }
];

export default function ProjectShowcaseRedesigned() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % projects.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Swipe detection with responsive sensitivity
  const [minSwipeDistance, setMinSwipeDistance] = useState(50);

  useEffect(() => {
    const updateMinSwipeDistance = () => {
      if (typeof window !== 'undefined') {
        setMinSwipeDistance(window.innerWidth < 768 ? 30 : 50);
      }
    };

    updateMinSwipeDistance();
    window.addEventListener('resize', updateMinSwipeDistance);
    return () => {
      window.removeEventListener('resize', updateMinSwipeDistance);
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      prevCard();
    }
  };

  const activeProject = projects[activeCardIndex];

  return (
    <div 
      className="w-full min-h-[80vh] relative flex flex-col items-center justify-center bg-transparent" 
      style={{ overflowX: 'visible', overflowY: 'visible' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 md:py-16 lg:py-20 w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Projects
          </h1> */}
          {/* <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6 sm:mb-8"></div> */}
        </div>

        {/* Featured Projects Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-3 sm:mb-4 lg:mb-6">Featured Projects</h2>
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

        {/* Cards Deck and Navigation Container */}
        <div className="flex flex-col items-center w-full">
        {/* Cards Deck */}
        <div className="flex justify-center items-center min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[650px] relative w-full pb-24 sm:pb-32 md:pb-40 lg:pb-48 xl:pb-56 2xl:pb-64">
          <div 
            className="relative w-[320px] sm:w-[450px] md:w-[700px] lg:w-[900px] xl:w-[1050px] 2xl:w-[1200px] h-[260px] sm:h-[320px] md:h-[420px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] touch-pan-y"
            style={{ willChange: 'contents' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.technologies}
                repo={project.repo}
                live={project.live}
                index={index}
                isActive={index === activeCardIndex}
                isSpread={isHovering}
                totalCards={projects.length}
                onClick={() => setActiveCardIndex(index)}
              />
            ))}
          </div>
        </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px] relative z-50">
            <Button
              onClick={prevCard}
              variant="outline"
              size="icon"
              aria-label="Previous project"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 hover:from-slate-800/90 hover:via-slate-700/80 hover:to-slate-800/90 text-white transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" aria-hidden="true" />
            </Button>

            <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCardIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                  aria-current={index === activeCardIndex ? "true" : undefined}
                  className={`transition-all duration-300 ${
                    index === activeCardIndex 
                      ? 'bg-blue-400 rounded-full w-4 h-2 sm:w-6 sm:h-2 md:w-8 md:h-3 lg:w-10 lg:h-3' 
                      : 'bg-slate-600 hover:bg-slate-500 rounded-full w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextCard}
              variant="outline"
              size="icon"
              aria-label="Next project"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 hover:from-slate-800/90 hover:via-slate-700/80 hover:to-slate-800/90 text-white transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" aria-hidden="true" />
            </Button>
          </div>
      </div>
      </div>
    </div>
  );
}

