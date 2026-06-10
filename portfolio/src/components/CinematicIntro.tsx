import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

const IMAGES = [
  '/House.png',
  '/Ewallet.png',
  '/Zaigro.png',
  '/Dictionary.png',
  '/8Puzzle.png'
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {

    // Sequence timings
    const timers = [
      setTimeout(() => setPhase(1), 200),   // Show logo
      setTimeout(() => setPhase(2), 1200),  // Show cards fanning out
      setTimeout(() => setPhase(3), 2000),  // Show developer text
      setTimeout(() => setPhase(4), 3800),  // Start exit fly-through
      setTimeout(() => {
        setPhase(5); // Clean up
        onComplete();
      }, 4500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 5) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0f' }} // Matches --background-darkest
      initial={{ opacity: 1 }}
      animate={phase >= 4 ? { opacity: 0, scale: 1.2 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {/* PHASE 1: Logo Reveal */}
        {phase >= 1 && phase < 4 && (
          <motion.div
            key="logo"
            className="absolute top-[15%] md:top-[20%] flex flex-col items-center z-50"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-bold text-white text-3xl md:text-5xl font-mono tracking-tight">
              Shreyansh<span className="text-indigo-400">.dev</span>
            </h1>
          </motion.div>
        )}

        {/* PHASE 2: Fan Spread Showcase */}
        {phase >= 2 && phase < 4 && (
          <motion.div
            key="cards"
            className="absolute top-1/2 left-1/2 w-full max-w-[800px] h-[300px] md:h-[400px]"
            style={{ x: '-50%', y: '-40%' }}
            initial={{ opacity: 0, scale: 0.8, y: '-20%' }}
            animate={{ opacity: 1, scale: 1, y: '-40%' }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {IMAGES.map((src, i) => {
              // Calculate fan rotation and translation
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              if (isMobile && i > 2) return null; // Show fewer on mobile

              const total = isMobile ? 3 : 5;
              const centerIdx = Math.floor(total / 2);
              const offset = i - centerIdx; // e.g. -2, -1, 0, 1, 2
              
              const rotateZ = offset * (isMobile ? 12 : 8);
              const xPos = offset * (isMobile ? 60 : 100);
              const yPos = Math.abs(offset) * (isMobile ? 15 : 25);
              const zIndex = 10 - Math.abs(offset);

              return (
                <motion.div
                  key={src}
                  className="absolute top-0 left-1/2 w-[220px] h-[140px] sm:w-[280px] sm:h-[180px] md:w-[400px] md:h-[260px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
                  style={{ originX: 0.5, originY: 1, zIndex }}
                  initial={{ x: '-50%', y: 100, rotateZ: 0, opacity: 0 }}
                  animate={{ x: `calc(-50% + ${xPos}px)`, y: yPos, rotateZ, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + (i * 0.05),
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <img src={src} alt="Project showcase" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* PHASE 3: Developer Identity */}
        {phase >= 3 && phase < 4 && (
          <motion.div
            key="identity"
            className="absolute bottom-1/4 flex flex-col items-center text-center px-6"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-xl md:text-3xl font-semibold text-white mb-2">
              Full Stack Developer
            </h2>
            <p className="text-indigo-300 text-sm md:text-base tracking-widest font-medium uppercase mb-4">
              MERN • React Native • AI
            </p>
            <p className="text-gray-400 text-xs md:text-sm max-w-md">
              Building products that solve real problems.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
