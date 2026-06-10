import React from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

/* ─── Services Data ─────────────────────────────────────────── */
const services = [
  {
    id: 1,
    accentColor: '#6366f1',
    accentBg: 'rgba(99,102,241,0.10)',
    tag: 'Web Development',
    title: 'Business Websites & Landing Pages',
    outcome: 'Turn visitors into customers',
    description:
      'Fast, mobile-first websites built to rank on Google and convert traffic. Whether you need a clinic booking page, a SaaS landing page, or a service business site — I build it to perform.',
    bullets: [
      'SEO-ready structure from day one',
      'Mobile-first, sub-2s load time',
      'Contact forms, WhatsApp CTAs, analytics',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 2,
    accentColor: '#14b8a6',
    accentBg: 'rgba(20,184,166,0.10)',
    tag: 'Full Stack Apps',
    title: 'Custom Web Applications',
    outcome: 'Automate your business operations',
    description:
      'Booking systems, dashboards, patient portals, order management — if your business runs on manual work or WhatsApp messages, I build the app that replaces it.',
    bullets: [
      'Appointment & booking systems',
      'Admin dashboards with real-time data',
      'Payment integration (Razorpay / Stripe)',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 3,
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139,92,246,0.10)',
    tag: 'Mobile Apps',
    title: 'Cross-Platform Mobile Apps',
    outcome: 'Put your business in your customer\'s pocket',
    description:
      'One codebase, two platforms. I build React Native apps for iOS and Android — delivery apps, service apps, client-facing tools — shipped to the App Store and Play Store.',
    bullets: [
      'Runs on iOS & Android from one codebase',
      'Push notifications & real-time updates',
      'App Store & Play Store deployment',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 4,
    accentColor: '#f59e0b',
    accentBg: 'rgba(245,158,11,0.10)',
    tag: 'Integrations & APIs',
    title: 'Integrations, APIs & Automation',
    outcome: 'Connect your tools, eliminate manual work',
    description:
      'Payment gateways, SMS/email notifications, third-party APIs, WhatsApp bots — I wire your tools together so your business runs on autopilot.',
    bullets: [
      'Payment gateways (Razorpay, Stripe)',
      'SMS & email automation (Twilio, Nodemailer)',
      'REST APIs & webhook integrations',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
];

/* ─── Animation variants ────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ─── Component ─────────────────────────────────────────────── */
const ServicesSection = () => {
  const headingRef = useScrollAnimation('active');

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden font-['Inter']"
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{
          paddingTop: 'clamp(48px, 6vw, 112px)',
          paddingBottom: 'clamp(48px, 6vw, 112px)',
          paddingLeft: 'clamp(16px, 5vw, 120px)',
          paddingRight: 'clamp(16px, 5vw, 120px)',
        }}
      >
        {/* ── Header ── */}
        <motion.div variants={itemVariants} style={{ marginBottom: 'clamp(32px, 5vw, 72px)' }}>
          <div style={{ marginBottom: '10px' }}>
            <p
              ref={headingRef}
              className="font-semibold uppercase mb-1 heading-underline-ltr"
              style={{ fontSize: 14, color: '#6366f1', letterSpacing: '2.5px', display: 'inline-block' }}
            >
              What I do
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2
              className="font-extrabold text-white"
              style={{
                fontSize: 'clamp(30px, 4vw, 58px)',
                lineHeight: 1.08,
                letterSpacing: 'clamp(-0.5px, -0.12vw, -1.5px)',
                maxWidth: 640,
              }}
            >
              Services built for{' '}
              <span style={{
                backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                your business
              </span>
              , not just your tech stack
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.7,
              maxWidth: 340,
            }}>
              Every service below is framed around a business outcome — not a list of tools I know.
            </p>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: 'clamp(12px, 2vw, 20px)' }}
        >
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={itemVariants}
              className="group relative rounded-2xl p-5 md:p-6 flex flex-col gap-4 transition-all duration-300 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '0.5px solid rgba(255,255,255,0.08)',
              }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderColor: `${s.accentColor}55`,
                y: -3,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Top row: icon + tag */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 52,
                    height: 52,
                    background: s.accentBg,
                    color: s.accentColor,
                  }}
                >
                  {s.icon}
                </div>
                <span
                  className="rounded-full font-medium"
                  style={{
                    fontSize: 11,
                    padding: '4px 12px',
                    background: s.accentBg,
                    border: `0.5px solid ${s.accentColor}44`,
                    color: s.accentColor,
                  }}
                >
                  {s.tag}
                </span>
              </div>

              {/* Title + outcome */}
              <div>
                <h3
                  className="font-bold text-white mb-2"
                  style={{ fontSize: 'clamp(15px, 1.3vw, 19px)', lineHeight: 1.25 }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-medium"
                  style={{ fontSize: 'clamp(11px, 0.95vw, 13px)', color: s.accentColor }}
                >
                  → {s.outcome}
                </p>
              </div>

              {/* Description */}
              <p
                className="line-clamp-3"
                style={{
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.65,
                }}
              >
                {s.description}
              </p>

              {/* Bullet list */}
              <ul className="flex flex-col gap-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span
                      className="rounded-full shrink-0"
                      style={{ width: 5, height: 5, minWidth: 5, marginTop: 6, background: s.accentColor, display: 'inline-block' }}
                    />
                    <span style={{
                      fontSize: 'clamp(11px, 0.95vw, 13px)',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.5,
                    }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Subtle accent glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top left, ${s.accentColor}0a 0%, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div variants={itemVariants} className="mt-12 md:mt-16">
          <div
            style={{
              background: 'rgba(99,102,241,0.06)',
              border: '0.5px solid rgba(99,102,241,0.20)',
              borderRadius: '16px',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
              boxSizing: 'border-box',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '4px',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                Not sure which service fits your need?
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.35)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  lineHeight: 1.6,
                }}
              >
                Tell me about your business and I'll figure out the right solution together with you.
              </p>
            </div>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#6366f1',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                padding: '11px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#5254cc')}
              onMouseLeave={e => (e.currentTarget.style.background = '#6366f1')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ width: 16, height: 16, flexShrink: 0 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Let's Talk
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
