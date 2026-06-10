import React from 'react';
import { motion } from 'framer-motion';

import useScrollAnimation from '../hooks/useScrollAnimation';

/* ─── Data ─────────────────────────────────────────────────── */
const valueCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    iconBg: 'rgba(99,102,241,0.12)',
    iconColor: '#818cf8',
    title: 'Client-first development',
    body: "I don't just write code — I translate your business niche into fast, scalable, and attractive web experiences that convert visitors into customers.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    iconBg: 'rgba(20,184,166,0.12)',
    iconColor: '#2dd4bf',
    title: 'Full stack, end to end',
    body: 'From React UIs and Node APIs to mobile apps with React Native — I cover the whole product. Real apps with RabbitMQ, Socket.IO, and Razorpay in production.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    iconBg: 'rgba(245,158,11,0.12)',
    iconColor: '#fbbf24',
    title: 'Currently graduating',
    body: 'Final year B.Tech Computer Science at KIIT University, Bhubaneswar. Available for immediate freelance work and full-time roles across India and remote.',
  },
];

const projects = [
  {
    dot: '#6366f1',
    title: 'eWallet — Digital Payments',
    desc: 'Secure real-money transaction platform with Razorpay webhook verification and a polished modern UI.',
    tags: ['Node.js', 'Razorpay', 'MySQL', 'React'],
  },
  {
    dot: '#14b8a6',
    title: 'Food Delivery App',
    desc: 'Cross-platform mobile app built for a real client with real-time order tracking using Socket.IO and Firebase.',
    tags: ['React Native', 'Socket.IO', 'Firebase', 'RabbitMQ'],
  },
  {
    dot: '#f59e0b',
    title: 'Spam Email Classifier',
    desc: 'ML-powered classifier to detect and filter spam emails with high accuracy using supervised learning.',
    tags: ['Python', 'Machine Learning', 'NLP'],
  },
  {
    dot: '#ec4899',
    title: 'Heuristic Search Strategies',
    desc: 'Visual exploration of A*, Greedy BFS, and Hill Climbing algorithms with step-by-step walkthroughs.',
    tags: ['Algorithms', 'A*', 'Visualisation'],
  },
];

/* ─── Animation variants ────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ─── Component ─────────────────────────────────────────────── */
const AboutSection = () => {
  const headingRef = useScrollAnimation('active');

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden font-['Inter']"
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '1400px',
          paddingTop: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          paddingLeft: 'clamp(16px, 5vw, 72px)',
          paddingRight: 'clamp(16px, 5vw, 72px)',
        }}
      >
        {/* ── Section header ── */}
        <motion.div variants={itemVariants} style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          <div style={{ marginBottom: '10px' }}>
            <p
              ref={headingRef}
              className="font-semibold uppercase mb-1 heading-underline-ltr"
              style={{ fontSize: '11px', color: '#6366f1', letterSpacing: '2px' }}
            >
              About me
            </p>
          </div>
          <h2
            className="font-extrabold text-white"
            style={{ fontSize: '36px', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '8px' }}
          >
            Building things that{' '}
            <span style={{ color: 'rgba(255,255,255,0.28)' }}>work</span> &amp;
            <br />
            look{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              great doing it
            </span>
          </h2>
          <p
            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}
          >
            Full Stack Developer · MERN · React Native · Open to freelance &amp; full-time
          </p>
        </motion.div>

        {/* ── Two-column body ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 'clamp(28px, 4vw, 48px)' }}
        >

          {/* LEFT — value cards + meta */}
          <div className="flex flex-col gap-[14px]">

            {valueCards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="flex"
                style={{
                  gap: '16px',
                  padding: '20px 22px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    background: card.iconBg,
                    color: card.iconColor,
                  }}
                >
                  {card.icon}
                </div>

                {/* Text */}
                <div>
                  <p
                    className="font-semibold text-white"
                    style={{ fontSize: '14px', marginBottom: '4px' }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}
                  >
                    {card.body}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Meta row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2" style={{ gap: '12px', marginTop: '20px' }}>
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: 'LOCATION',
                  value: 'Bhubaneswar, India',
                  valueColor: 'rgba(255,255,255,0.7)',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  ),
                  label: 'STATUS',
                  value: 'Open to work',
                  valueColor: '#34d399',
                },
              ].map(({ icon, label, value, valueColor }) => (
                <div
                  key={label}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '0.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>{icon}</div>
                  <p
                    className="font-semibold uppercase mb-1"
                    style={{ fontSize: '11px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)' }}
                  >
                    {label}
                  </p>
                  <p className="font-medium" style={{ fontSize: 13, color: valueColor }}>
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — projects */}
          <div className="flex flex-col gap-[12px]">
            <motion.p
              variants={itemVariants}
              className="font-semibold uppercase"
              style={{ fontSize: '13px', letterSpacing: '1.5px', marginBottom: '16px', color: 'rgba(255,255,255,0.3)' }}
            >
              Selected Projects
            </motion.p>

            {projects.map((proj) => (
              <motion.div
                key={proj.title}
                variants={itemVariants}
                className="flex transition-all duration-200"
                style={{
                  gap: '14px',
                  padding: '18px 20px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  cursor: 'default',
                }}
                whileHover={{ borderColor: 'rgba(99,102,241,0.35)', backgroundColor: 'rgba(99,102,241,0.04)' }}
              >
                {/* Dot */}
                <span
                  className="rounded-full shrink-0 mt-1.5"
                  style={{ width: 8, height: 8, minWidth: 8, background: proj.dot, display: 'inline-block' }}
                />

                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-white"
                    style={{ fontSize: '14px', marginBottom: '4px' }}
                  >
                    {proj.title}
                  </p>
                  <p
                    style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}
                  >
                    {proj.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap" style={{ gap: '6px', marginTop: '10px' }}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded"
                        style={{
                          fontSize: '10px',
                          padding: '3px 8px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '0.5px solid rgba(255,255,255,0.09)',
                          color: 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          style={{
            marginTop: '56px',
            padding: '28px 32px',
            borderRadius: '14px',
            gap: '20px',
            background: 'rgba(99,102,241,0.06)',
            border: '0.5px solid rgba(99,102,241,0.22)',
          }}
        >
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-white truncate whitespace-normal"
              style={{ fontSize: '18px', marginBottom: '4px' }}
            >
              Have a project in mind?
            </p>
            <p className="break-words" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)' }}>
              I'd love to hear about your idea and see how I can help bring it to life.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center whitespace-nowrap font-semibold shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: '#6366f1',
              color: '#ffffff',
              fontSize: '13px',
              padding: '11px 22px',
              borderRadius: '8px',
              gap: '8px',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#5254cc')}
            onMouseLeave={e => (e.currentTarget.style.background = '#6366f1')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Start a conversation
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
