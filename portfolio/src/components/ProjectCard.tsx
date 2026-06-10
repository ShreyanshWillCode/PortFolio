import React, { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  repo?: string;
  live: string;
  index: number;
  isActive: boolean;
  isSpread: boolean;
  totalCards: number;
  onClick: () => void;
  isFirst: boolean;
}

/* ─── Per-card position math — computed ONCE per state change ── */
function getCardTransform(
  index: number,
  totalCards: number,
  isActive: boolean,
  isSpread: boolean,
  isMobile: boolean,
): {
  x: number; y: number; rotate: number; scale: number;
} {
  const centerIndex = (totalCards - 1) / 2;
  const offset = index - centerIndex;

  if (isSpread && !isMobile) {
    const spreadX = offset * 130;
    const spreadY = Math.abs(offset) * 18;
    const rot = offset * 7;
    const sc = isActive ? 1.05 : 0.94;
    return { x: spreadX, y: spreadY, rotate: rot, scale: sc };
  }

  // Stacked
  const stackX = index * 9;
  const stackY = index * 9;
  const rot = index * 2.5;
  const sc = isActive ? 1.07 : 0.97;
  return { x: stackX, y: stackY, rotate: rot, scale: sc };
}

/* ── Spring configs — defined OUTSIDE render to avoid recreation ── */
const SPRING_MAIN = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};
const SPRING_SUBTLE = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

/* ── Shared GPU-layer styles — static object, zero GC pressure ── */
const GPU_LAYER: React.CSSProperties = {
  willChange: 'transform',
  backfaceVisibility: 'hidden',
  contain: 'layout style paint',
};

const CARD_ORIGIN: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  // Offset to centre the card itself
  // translate3d(-50%,-50%,0) applied via Framer x/y + transformOrigin
  transformOrigin: 'center center',
};

/* ── Max visible tags by breakpoint — static lookup ── */
const maxTagsForWidth = (w: number) => (w >= 1024 ? 4 : w >= 768 ? 3 : 2);

export const ProjectCard = memo(function ProjectCard({
  title, description, image, tags, repo, live,
  index, isActive, isSpread, totalCards, onClick, isFirst,
}: ProjectCardProps) {
  const prefersReduced = useReducedMotion();

  // Read viewport width once without subscribing to resize on every card
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { x, y, rotate, scale } = useMemo(
    () => getCardTransform(index, totalCards, isActive, isSpread, isMobile),
    [index, totalCards, isActive, isSpread, isMobile],
  );

  // z-index: active card always on top
  const zIndex = isActive ? 30 : isSpread ? 25 : 20 - index;

  const maxTags = maxTagsForWidth(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const visibleTags = useMemo(() => tags.slice(0, maxTags), [tags, maxTags]);
  const extraCount = tags.length - maxTags;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`View project ${title}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
      }}
      /* ── GPU-only transforms ── */
      animate={{
        x: x - 0,   // translate3d via Framer x/y (no left/top changes)
        y: y - 0,
        rotate: prefersReduced ? 0 : rotate,
        scale:  prefersReduced ? 1 : scale,
      }}
      transition={isSpread ? SPRING_MAIN : SPRING_SUBTLE}
      style={{
        ...CARD_ORIGIN,
        ...GPU_LAYER,
        zIndex,
        // Centre-offset so cards stack from the middle of the container
        translateX: '-50%',
        translateY: '-50%',
        cursor: 'pointer',
      }}
    >
      <div className="relative group" style={GPU_LAYER}>
        {/* Card shell */}
        <div
          className={[
            'overflow-hidden bg-white border border-slate-200',
            'rounded-2xl lg:rounded-3xl',
            'shadow-xl transition-shadow duration-300',
            isActive
              ? 'shadow-blue-500/30 border-slate-300 ring-2 ring-blue-500/20'
              : 'shadow-xl border-slate-200',
          ].join(' ')}
          style={{
            width:  'clamp(280px, 68vw, 750px)',
            height: 'clamp(230px, 44vw, 550px)',
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-slate-100" style={{ height: '58%' }}>
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ willChange: 'transform', transition: 'transform 0.3s ease' }}
              loading={isFirst ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Info panel */}
          <div className="p-3 md:p-5 flex flex-col" style={{ height: '42%' }}>
            <div className="flex-1 min-h-0 overflow-hidden">
              <h3 className="font-semibold text-black mb-1 text-xs sm:text-sm md:text-base lg:text-lg line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-black text-[8px] sm:text-[10px] md:text-xs lg:text-sm leading-relaxed line-clamp-2 mb-2">
                {description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {visibleTags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-[6px] sm:text-[8px] md:text-xs px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </Badge>
              ))}
              {extraCount > 0 && (
                <Badge variant="secondary" className="text-[6px] sm:text-[8px] md:text-xs px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">
                  +{extraCount}
                </Badge>
              )}
            </div>

            {/* Buttons */}
            <div className={`flex ${repo ? 'gap-1.5 md:gap-2' : ''}`} onClick={e => e.stopPropagation()}>
              {repo && (
                <a href={repo} target="_blank" rel="noopener noreferrer" className="flex-1 no-underline">
                  <Button variant="outline" size="sm"
                    className="w-full h-7 sm:h-8 md:h-9 text-[8px] sm:text-[10px] md:text-xs border-slate-300 bg-white hover:bg-slate-50 text-black flex items-center justify-center shadow-sm">
                    <FaGithub className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">GitHub</span>
                    <span className="sm:hidden">GH</span>
                  </Button>
                </a>
              )}
              <a href={live} target="_blank" rel="noopener noreferrer" className="flex-1 no-underline">
                <Button variant="default" size="sm"
                  className="w-full h-7 sm:h-8 md:h-9 text-[8px] sm:text-[10px] md:text-xs bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white flex items-center justify-center shadow-lg border-2 border-emerald-400 font-semibold">
                  <FaExternalLinkAlt className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Live Demo</span>
                  <span className="sm:hidden">Live</span>
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Active-card glow — opacity-only, no blur during animation */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-3xl -z-10"
            style={{
              background: 'rgba(59,130,246,0.15)',
              boxShadow: '0 0 40px 8px rgba(59,130,246,0.2)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
});
