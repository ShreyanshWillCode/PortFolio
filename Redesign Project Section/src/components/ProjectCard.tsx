import React, { useMemo, useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  index: number;
  isActive: boolean;
  isSpread: boolean;
  totalCards: number;
  onClick: () => void;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}

export function ProjectCard({ title, description, image, tags, index, isActive, isSpread, totalCards, onClick }: ProjectCardProps) {
  const { width } = useWindowSize();

  // Calculate spread positions with responsive adjustments
  const transform = useMemo(() => {
    const getTransform = () => {
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
      // Normal stacked position with responsive spacing
      const stackOffset = width >= 768 ? 8 : 6;
      const rotation = width >= 768 ? 2 : 1.5;
      
      return `
        translateX(${index * stackOffset}px) 
        translateY(${index * stackOffset}px) 
        rotate(${index * rotation}deg)
        ${isActive ? width >= 768 ? 'scale(1.05)' : 'scale(1.02)' : 'scale(1)'}
      `;
    }
    };

    return getTransform();
  }, [width, isSpread, isActive, index, totalCards]);

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-700 ease-out ${
        isActive ? 'z-30' : isSpread ? 'z-[25]' : 'z-20'
      }`}
      style={{
        transform: `translate(-50%, -50%) ${transform}`,
        transformOrigin: 'center center',
        left: '50%',
        top: '50%',
      }}
      onClick={onClick}
    >
      <div className="relative group">
        <div 
          className={`
            w-[min(85vw,280px)] sm:w-[min(75vw,380px)] md:w-[min(70vw,500px)] lg:w-[min(65vw,600px)] xl:w-[min(60vw,680px)] 2xl:w-[750px]
            h-[min(75vw,230px)] sm:h-[min(65vw,290px)] md:h-[min(60vw,380px)] lg:h-[min(55vw,450px)] xl:h-[min(50vw,500px)] 2xl:h-[550px]
            bg-card rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-border/50 
            shadow-xl sm:shadow-2xl backdrop-blur-sm transition-all duration-700
            ${isActive 
              ? 'shadow-blue-500/20 border-blue-500/30' 
              : isSpread 
                ? 'hover:shadow-2xl hover:border-border/80 lg:hover:scale-105' 
                : 'hover:shadow-xl hover:border-border/80'
            }
            ${isSpread ? 'shadow-lg' : ''}
          `}
        >
          {/* Project Image */}
          <div className="relative h-[60%] sm:h-[62%] md:h-[65%] lg:h-[68%] overflow-hidden">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Project Info */}
          <div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 space-y-1 sm:space-y-2 h-[40%] sm:h-[38%] md:h-[35%] lg:h-[32%] flex flex-col">
            <div className="flex-1 min-h-0">
              <h3 className="font-semibold text-foreground mb-0.5 sm:mb-1 group-hover:text-blue-400 transition-colors text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg line-clamp-1">
                {title}
              </h3>
              <p className="text-muted-foreground leading-tight sm:leading-relaxed line-clamp-2 text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                {description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-auto">
              {(() => {
                const maxVisibleTags = width >= 1024 ? 4 : width >= 768 ? 3 : 2;
                return (
                  <>
                    {tags.slice(0, maxVisibleTags).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="text-[6px] sm:text-[8px] md:text-xs lg:text-sm px-1 sm:px-1.5 md:px-2 py-0.5 bg-secondary/80 hover:bg-secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > maxVisibleTags && (
                      <Badge variant="secondary" className="text-[6px] sm:text-[8px] md:text-xs lg:text-sm px-1 sm:px-1.5 md:px-2 py-0.5 bg-secondary/80">
                        +{tags.length - maxVisibleTags}
                      </Badge>
                    )}
                  </>
                );
              })()}
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