import { useState, useEffect } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { Button } from './components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "A comprehensive web analytics dashboard built with React and D3.js. Features real-time data visualization, custom charts, and advanced filtering capabilities for enterprise-level insights.",
    image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU4MzMzNDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://demo.com"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Modern mobile banking interface with biometric authentication, instant transfers, and spending analytics. Built with React Native and features beautiful micro-interactions.",
    image: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU4MzM5NTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React Native", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    live: "https://demo.com"
  },
  {
    id: 3,
    title: "Data Visualization Platform",
    description: "Interactive data visualization platform that transforms complex datasets into beautiful, interactive charts and graphs. Built for researchers and data scientists.",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMHdlYnNpdGV8ZW58MXx8fHwxNzU4MzgxNTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Vue.js", "Python", "Plotly", "Docker"],
    github: "https://github.com",
    live: "https://demo.com"
  },
  {
    id: 4,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with advanced product filtering, payment integration, and admin dashboard. Optimized for performance and SEO.",
    image: "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc1ODM1NTAzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Vercel"],
    github: "https://github.com",
    live: "https://demo.com"
  },
  {
    id: 5,
    title: "Task Management System",
    description: "Collaborative task management platform with real-time updates, team workspaces, and advanced project tracking. Built for modern teams.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMGFwcHxlbnwxfHx8fDE3NTgzNTUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "TypeScript", "WebSocket", "PostgreSQL"],
    github: "https://github.com",
    live: "https://demo.com"
  }
];

export default function App() {
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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevCard();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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
      className="min-h-screen" 
      style={{ background: 'linear-gradient(to bottom, hsl(var(--background-hue), 0%, 5%), hsl(var(--background-hue), 0%, 8%))' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Projects
          </h1>
          <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
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
        <div className="flex flex-col items-center">
          {/* Cards Deck */}
          <div className="flex justify-center items-center min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[650px] relative w-full">
            <div 
              className="relative w-[320px] sm:w-[450px] md:w-[700px] lg:w-[900px] xl:w-[1050px] 2xl:w-[1200px] h-[260px] sm:h-[320px] md:h-[420px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] transition-all duration-500 touch-pan-y"
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
                  tags={project.tags}
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
          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px]">
          <Button
            onClick={prevCard}
            variant="outline"
            size="icon"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-slate-600 bg-slate-800/50 hover:bg-slate-700 text-white transition-all duration-200"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Button>

          <div className="flex gap-1.5 sm:gap-2 md:gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCardIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === activeCardIndex 
                    ? 'bg-blue-400 w-4 h-2 sm:w-6 sm:h-2 md:w-8 md:h-3 lg:w-10 lg:h-3' 
                    : 'bg-slate-600 hover:bg-slate-500 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextCard}
            variant="outline"
            size="icon"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-slate-600 bg-slate-800/50 hover:bg-slate-700 text-white transition-all duration-200"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}