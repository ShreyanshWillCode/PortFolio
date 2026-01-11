import React, { useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useWindowWidth } from '../hooks/useWindowWidth';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  repo: string;
  live: string;
  index: number;
  isActive: boolean;
  isSpread: boolean;
  totalCards: number;
  onClick: () => void;
}

export function ProjectCard({ title, description, image, tags, repo, live, index, isActive, isSpread, totalCards, onClick }: ProjectCardProps) {
  const width = useWindowWidth();
  
  // Calculate spread positions with responsive adjustments - memoized for performance
  const transform = useMemo(() => {
    if (isSpread) {
      // Fan out cards horizontally with slight rotation
      const centerIndex = (totalCards - 1) / 2;
      const offsetFromCenter = index - centerIndex;
      
      // Responsive spread distances based on screen size
      const getSpreadDistance = () => {
        if (width >= 1536) return 160; // 2xl
        if (width >= 1280) return 140; // xl
        if (width >= 1024) return 120; // lg
        if (width >= 768) return 100; // md
        if (width >= 640) return 80; // sm
        return 60; // xs
      };
      
      const spreadDistance = getSpreadDistance();
      const rotationAngle = offsetFromCenter * (width >= 1024 ? 8 : 6);
      const xOffset = offsetFromCenter * spreadDistance;
      const yOffset = Math.abs(offsetFromCenter) * (width >= 768 ? 20 : 15);
      
      return `
        translateX(${xOffset}px) 
        translateY(${yOffset}px) 
        rotate(${rotationAngle}deg)
        ${isActive ? 'scale(1.05)' : width >= 768 ? 'scale(0.95)' : 'scale(0.9)'}
      `;
    } else {
      // Normal stacked position with responsive spacing - visible stacking effect
      const stackOffset = width >= 768 ? 10 : 7;
      const rotation = width >= 768 ? 2.5 : 2;
      
      return `
        translateX(${index * stackOffset}px) 
        translateY(${index * stackOffset}px) 
        rotate(${index * rotation}deg)
        ${isActive ? width >= 768 ? 'scale(1.08)' : 'scale(1.05)' : width >= 768 ? 'scale(0.98)' : 'scale(0.95)'}
      `;
    }
  }, [index, isActive, isSpread, totalCards, width]);

  const transformStyle = useMemo(() => {
    return `translate3d(-50%, -50%, 0) ${transform}`;
  }, [transform]);

  return (
    <div
      className={`absolute cursor-pointer ${
        isActive ? 'z-30' : isSpread ? 'z-[25]' : 'z-20'
      }`}
      role="button"
      tabIndex={0}
      style={{
        transform: transformStyle,
        transformOrigin: 'center center',
        left: '50%',
        top: '50%',
        willChange: 'transform',
        transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative group">
        <div 
          className={`
            w-[min(85vw,280px)] sm:w-[min(75vw,380px)] md:w-[min(70vw,500px)] lg:w-[min(65vw,600px)] xl:w-[min(60vw,680px)] 2xl:w-[750px]
            h-[min(75vw,230px)] sm:h-[min(65vw,290px)] md:h-[min(60vw,380px)] lg:h-[min(55vw,450px)] xl:h-[min(50vw,500px)] 2xl:h-[550px]
            bg-white rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200 
            shadow-2xl transition-shadow duration-300 ease-out
            ${isActive 
              ? 'shadow-blue-500/30 border-slate-300 ring-2 ring-blue-500/20' 
              : isSpread 
                ? 'hover:shadow-2xl hover:border-slate-300 lg:hover:scale-105 shadow-lg' 
                : 'shadow-xl border-slate-200'
            }
          `}
        >
          {/* Project Image */}
          <div className="relative h-[55%] sm:h-[56%] md:h-[58%] lg:h-[60%] overflow-hidden bg-slate-100">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              style={{ willChange: 'transform' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Project Info */}
          <div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 h-[45%] sm:h-[44%] md:h-[42%] lg:h-[40%] flex flex-col bg-white overflow-visible">
            <div className="flex-1 min-h-0 overflow-hidden">
              <h3 className="font-semibold text-black mb-0.5 sm:mb-1 group-hover:text-blue-600 transition-colors text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg line-clamp-1">
                {title}
              </h3>
              <p className="text-black leading-tight sm:leading-relaxed line-clamp-2 text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base mb-1 sm:mb-2">
                {description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-0.5 sm:gap-1 mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex-shrink-0">
              {(() => {
                const maxVisibleTags = width >= 1024 ? 4 : width >= 768 ? 3 : 2;
                return (
                  <>
                    {tags.slice(0, maxVisibleTags).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="text-[6px] sm:text-[8px] md:text-xs lg:text-sm px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > maxVisibleTags && (
                      <Badge variant="secondary" className="text-[6px] sm:text-[8px] md:text-xs lg:text-sm px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 bg-slate-100 text-slate-700 border border-slate-200">
                        +{tags.length - maxVisibleTags}
                      </Badge>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <a 
                href={repo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 no-underline hover:no-underline"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 sm:h-8 md:h-9 lg:h-10 text-[8px] sm:text-[10px] md:text-xs lg:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border-slate-300 bg-white hover:bg-slate-50 text-black flex items-center justify-center shadow-sm"
                >
                  <FaGithub className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5" />
                  <span className="hidden sm:inline">GitHub</span>
                  <span className="sm:hidden">GH</span>
                </Button>
              </a>
              <a 
                href={live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 no-underline hover:no-underline"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="w-full h-7 sm:h-8 md:h-9 lg:h-10 text-[8px] sm:text-[10px] md:text-xs lg:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center shadow-lg border-2 border-emerald-400 font-semibold"
                >
                  <FaExternalLinkAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 sm:mr-1.5" />
                  <span className="hidden sm:inline">Live Demo</span>
                  <span className="sm:hidden">Live</span>
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Glow effect for active card */}
        {isActive && (
          <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl bg-blue-500/10 blur-lg sm:blur-xl -z-10 animate-pulse" />
        )}
      </div>
    </div>
  );
}

