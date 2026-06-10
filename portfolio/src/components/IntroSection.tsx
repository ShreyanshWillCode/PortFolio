import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const IntroSection = () => {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const techStack = ['React', 'Node.js', 'React Native', 'MongoDB', 'Firebase', 'Socket.IO'];

  return (
    <section
      id="home"
      className="relative z-10 w-full font-['Inter'] overflow-hidden"
      style={{
        paddingTop: 'clamp(100px, 12vw, 130px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ── Main content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '900px',
          paddingLeft: 'clamp(16px, 5vw, 48px)',
          paddingRight: 'clamp(16px, 5vw, 48px)',
        }}
      >
        {/* ── Availability Pill ── */}
        <motion.div variants={itemVariants} style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full text-[#818cf8] select-none"
            style={{
              background: 'rgba(99,102,241,0.10)',
              border: '0.5px solid rgba(99,102,241,0.30)',
              padding: 'clamp(5px, 0.8vw, 8px) clamp(12px, 1.5vw, 16px)',
              fontSize: 'clamp(11px, 1.2vw, 13px)',
            }}
          >
            <span
              className="rounded-full shrink-0 animate-pulse"
              style={{ width: 7, height: 7, minWidth: 7, background: '#6366f1', display: 'inline-block' }}
            />
            Available for freelance &amp; full-time roles
          </div>
        </motion.div>

        {/* ── Main Heading ── */}
        <motion.h1
          variants={itemVariants}
          className="font-extrabold text-white"
          style={{
            fontSize: 'clamp(28px, 5.5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: 'clamp(-0.3px, -0.15vw, -1.5px)',
            marginBottom: 'clamp(12px, 1.5vw, 20px)',
          }}
        >
          I help businesses grow
          <br />
          by turning ideas into
          <br />
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            meaningful websites
          </span>
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          variants={itemVariants}
          className="font-normal"
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            lineHeight: '1.7',
            marginBottom: 'clamp(28px, 4vw, 40px)',
            maxWidth: '560px',
          }}
        >
          Hi, I'm{' '}
          <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Shreyansh</strong>{' '}
          — a Full Stack Developer who builds fast, attractive, and
          conversion-focused web experiences.{' '}
          <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
            Your niche, delivered beautifully.
          </strong>
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center"
          style={{
            gap: 'clamp(10px, 1.5vw, 14px)',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          {/* Primary — View Resume */}
          <a
            href="https://drive.google.com/file/d/1rgaQ-wedNlygzG_Ol6Pt454Xuc9IW82f/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold rounded-[8px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: '#6366f1',
              color: '#ffffff',
              fontSize: 'clamp(12px, 1.2vw, 14px)',
              gap: '8px',
              padding: 'clamp(10px, 1.2vw, 12px) clamp(18px, 2vw, 24px)',
              textDecoration: 'none',
              minHeight: '44px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#5254cc')}
            onMouseLeave={e => (e.currentTarget.style.background = '#6366f1')}
          >
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ width: 16, height: 16, flexShrink: 0 }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            View My Resume
          </a>

          {/* Secondary — Let's Talk */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-medium rounded-[8px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              border: '0.5px solid rgba(255,255,255,0.18)',
              fontSize: 'clamp(12px, 1.2vw, 14px)',
              gap: '8px',
              padding: 'clamp(10px, 1.2vw, 12px) clamp(18px, 2vw, 24px)',
              minHeight: '44px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
            }}
          >
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ width: 16, height: 16, flexShrink: 0 }}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Let's Talk
          </a>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-wrap"
          style={{
            gap: 'clamp(24px, 4vw, 40px)',
            paddingTop: 'clamp(20px, 2.5vw, 32px)',
            borderTop: '0.5px solid rgba(255,255,255,0.07)',
          }}
        >
          {[
            { num: '5',   suffix: '+', suffixColor: '#6366f1', label: 'Client projects delivered' },
            { num: '2',   suffix: '+', suffixColor: '#6366f1', label: 'Years of experience'       },
            { num: '100', suffix: '%', suffixColor: '#14b8a6', label: 'Client satisfaction'       },
          ].map(({ num, suffix, suffixColor, label }) => (
            <div key={label}>
              <div
                className="font-bold text-white tracking-tight leading-none"
                style={{ fontSize: 'clamp(20px, 2.5vw, 26px)' }}
              >
                {num}
                <span style={{ color: suffixColor }}>{suffix}</span>
              </div>
              <div
                className="mt-1.5"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'clamp(10px, 1vw, 12px)' }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Tech Stack Strip ── */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full"
        style={{ marginTop: 'clamp(24px, 3vw, 32px)' }}
      >
        {/* Divider */}
        <div
          style={{
            height: '0.5px',
            background: 'rgba(255,255,255,0.06)',
            marginLeft: 'clamp(16px, 5vw, 48px)',
            marginRight: 'clamp(16px, 5vw, 48px)',
          }}
        />

        {/* Tags */}
        <div
          className="w-full mx-auto flex items-center flex-wrap"
          style={{
            maxWidth: '900px',
            paddingLeft: 'clamp(16px, 5vw, 48px)',
            paddingRight: 'clamp(16px, 5vw, 48px)',
            paddingTop: 'clamp(16px, 2vw, 24px)',
            gap: 'clamp(8px, 1.5vw, 16px)',
          }}
        >
          <span
            className="whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}
          >
            Tech stack
          </span>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '0.5px solid rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '11px',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default IntroSection;