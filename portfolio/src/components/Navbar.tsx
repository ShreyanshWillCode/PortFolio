import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Navbar.css';

/* ─── Nav links ───────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     href: '#home'         },
  { label: 'About',    href: '#about'         },
  { label: 'Services', href: '#services'      },
  { label: 'Projects', href: '#projects'      },
  { label: 'Contact',  href: '#social-medias' },
];

const SECTION_IDS = ['home', 'about', 'services', 'projects', 'social-medias'];

/* ─── Spring configs ────────────────────────────────────────────── */
const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };
const DRAWER_SPRING = { type: 'spring' as const, stiffness: 260, damping: 28 };

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHidden, setIsHidden]         = useState(false);
  const prefersReduced = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  /* ── Scroll watcher: compact mode + active section ── */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle hide/show based on scroll direction
      // Only hide if we've scrolled down a bit to prevent hiding at the very top
      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;

      setScrolled(currentScrollY > 40);

      // Determine which section is visible
      const isAtBottom = window.innerHeight + currentScrollY >= document.body.offsetHeight - 10;
      
      if (isAtBottom) {
        setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
      } else {
        for (const id of [...SECTION_IDS].reverse()) {
          const el = document.getElementById(id);
          if (el) {
            const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
            if (currentScrollY >= absoluteTop - 120) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close drawer on outside click ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [mobileOpen]);

  /* ── ESC to close ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  /* ── Lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const close = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ═══════════════ FLOATING NAVBAR ═══════════════ */}
      <div
        style={{
          position: 'fixed',
          top: isHidden ? '-100px' : (scrolled ? '12px' : '20px'),
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: 'calc(100% - clamp(24px, 4vw, 48px))',
          maxWidth: '1100px',
          transition: 'top 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main navigation"
          style={{
            background: scrolled
              ? 'rgba(10, 10, 18, 0.88)'
              : 'rgba(14, 14, 24, 0.72)',
            backdropFilter: `blur(${scrolled ? 24 : 16}px)`,
            WebkitBackdropFilter: `blur(${scrolled ? 24 : 16}px)`,
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '18px',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(99,102,241,0.08) inset'
              : '0 4px 24px rgba(0,0,0,0.3)',
            transition: 'background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0 20px' : '0 24px',
            height: scrolled ? '56px' : '64px',
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#home"
            aria-label="Home"
            style={{
              textDecoration: 'none',
              fontFamily: "'Inter', monospace",
              fontWeight: 700,
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              letterSpacing: '-0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#818cf8' }}>Shreyansh</span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>.dev</span>
          </a>

          {/* ── Desktop Links ── */}
          <ul
            role="list"
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: 'clamp(20px, 2.5vw, 32px)',
              alignItems: 'center',
            }}
            className="nav-desktop-links"
          >
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href} style={{ position: 'relative' }}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                      transition: 'color 0.2s ease',
                      padding: '6px 0',
                      display: 'block',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)'; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </a>
                  {/* Active underline pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      transition={SPRING}
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: '2px',
                        borderRadius: '2px',
                        background: 'linear-gradient(90deg, #6366f1, #14b8a6)',
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Right side: Social icons + CTA ── */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
            className="nav-right"
          >
            {/* Social icons — desktop only */}
            <div className="nav-socials" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {[
                { href: 'https://github.com/ShreyanshWillCode', icon: <FaGithub size={15} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/shreyansh-mahato-7a706922b/', icon: <FaLinkedin size={15} />, label: 'LinkedIn' },
                { href: 'https://leetcode.com/u/MahatoJI/', icon: <SiLeetcode size={15} />, label: 'LeetCode' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'rgba(255,255,255,0.9)';
                    el.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'rgba(255,255,255,0.4)';
                    el.style.background = 'transparent';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div
              className="nav-divider"
              style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }}
            />

            {/* CTA Button */}
            <a
              href="#contact"
              className="nav-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                fontSize: '13px',
                padding: '8px 18px',
                borderRadius: '10px',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                border: '1px solid rgba(99,102,241,0.4)',
                boxShadow: '0 2px 12px rgba(99,102,241,0.25)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'translateY(-1px)';
                el.style.boxShadow = '0 4px 20px rgba(99,102,241,0.4)';
                el.style.background = 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 2px 12px rgba(99,102,241,0.25)';
                el.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
              }}
            >
              Hire Me
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                width: 36,
                height: 36,
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{ width: 18, height: 18 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.g key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </motion.g>
                  ) : (
                    <motion.g key="bars" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <line x1="4" y1="8" x2="20" y2="8" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="16" x2="20" y2="16" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </motion.svg>
            </button>
          </div>
        </motion.nav>

        {/* ═══════════════ MOBILE DRAWER ═══════════════ */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={drawerRef}
              key="drawer"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={DRAWER_SPRING}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              style={{
                marginTop: '10px',
                background: 'rgba(10, 10, 20, 0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                overflow: 'hidden',
              }}
            >
              {/* Nav links */}
              <nav style={{ padding: '8px' }}>
                {NAV_LINKS.map((link, i) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      initial={prefersReduced ? {} : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '15px',
                        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                        background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                        transition: 'background 0.15s ease',
                        minHeight: '44px',
                      }}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#6366f1',
                            display: 'inline-block',
                          }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 16px' }} />

              {/* Social + CTA row */}
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { href: 'https://github.com/ShreyanshWillCode', icon: <FaGithub size={16} />, label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/shreyansh-mahato-7a706922b/', icon: <FaLinkedin size={16} />, label: 'LinkedIn' },
                    { href: 'https://leetcode.com/u/MahatoJI/', icon: <SiLeetcode size={16} />, label: 'LeetCode' },
                  ].map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={close}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    minHeight: '44px',
                  }}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;