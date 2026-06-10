import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollAnimation from "./hooks/useScrollAnimation";

import "./App.css";
import "./index.css";
// import { ThemeContext } from './context/ThemeContext';

import Navbar from "./components/Navbar.tsx";
import ServicesSection from "./components/ServicesSection.tsx";
import ProjectShowcaseRedesigned from "./components/ProjectShowcaseRedesigned.tsx";
import SocialMedia from "./components/Social_media.tsx";
import CinematicIntro from "./components/CinematicIntro.tsx";
import IntroSection from "./components/IntroSection.tsx";
import AboutSection from "./components/AboutSection.tsx";
// import Car3DHero from "./components/Car3DHero";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const introRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const projectsRef = useScrollAnimation();
  const contactRef = useScrollAnimation();
  // New: heading refs for underline animation
  const projectsHeadingRef = useScrollAnimation('active');
  const contactHeadingRef = useScrollAnimation('active');
  // const [isClicked, setIsClicked] = useState(false);
  // const { darkMode } = useContext(ThemeContext);

  // const handleButtonClick = () => {
  //   setIsClicked(true);
  //   setTimeout(() => {
  //     setIsClicked(false);
  //   }, 300); // Duration of the scale effect
  // }

  // The old manual GSAP loadingOverlay useEffect has been removed as 
  // CinematicIntro handles its own lifecycle and animations now.

  // Parallax effect for mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const hero = document.getElementById('home');
    if (!hero) return;
    const handleScroll = () => {
      const scrolled = window.scrollY;
      hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-transparent text-foreground-primary transition-colors duration-1000`}>
      {!introFinished && <CinematicIntro onComplete={() => setIntroFinished(true)} />}
      
      {/* Main Content wrapper - fades in after intro */}
      <div 
        style={{ 
          opacity: introFinished ? 1 : 0, 
          pointerEvents: introFinished ? 'auto' : 'none',
          transition: 'opacity 0.8s ease'
        }}
      >
        <Navbar />
        <div className="App">
        <div
          ref={introRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <IntroSection />
        </div>
        <div
          ref={aboutRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <AboutSection />
        </div>
        {/* Services Section */}
        <div
          ref={servicesRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <ServicesSection />
        </div>

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
          style={{ overflowX: 'visible', overflowY: 'visible', position: 'relative' }}
        >
          <div
            className="mx-auto"
            style={{
              maxWidth: '1400px',
              paddingLeft: 'clamp(16px, 4vw, 48px)',
              paddingRight: 'clamp(16px, 4vw, 48px)',
            }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2
                ref={projectsHeadingRef}
                className="font-bold mb-4 heading-underline-rtl tracking-wide text-indigo-300 inline-block"
                style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}
              >
                Projects
              </h2>
            </div>
          </div>
          <ProjectShowcaseRedesigned />
        </section>

        {/* Contact Section */}
        <section
          id="social-medias"
          ref={contactRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          {/* Anchor target for #contact links from CTA buttons */}
          <span id="contact" style={{ display: 'block', height: 0, visibility: 'hidden' }} />
          <div
            className="mx-auto"
            style={{
              maxWidth: '1400px',
              paddingLeft: 'clamp(16px, 4vw, 48px)',
              paddingRight: 'clamp(16px, 4vw, 48px)',
            }}
          >
            <div className="text-center" style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
              <h2
                ref={contactHeadingRef}
                className="font-bold mb-4 heading-underline-fadeup tracking-wide text-teal-300 inline-block"
                style={{ fontSize: 'clamp(22px, 3.5vw, 36px)' }}
              >
                Contact
              </h2>
              <p
                className="text-foreground-secondary mt-4 mx-auto"
                style={{ maxWidth: '42rem', fontSize: 'clamp(13px, 1.5vw, 16px)' }}
              >
                Feel free to reach out to me through any of these platforms. I'm
                always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>
            <SocialMedia />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-background-darkest text-foreground-primary">
          <div
            className="mx-auto text-center"
            style={{
              maxWidth: '1400px',
              paddingLeft: 'clamp(16px, 4vw, 48px)',
              paddingRight: 'clamp(16px, 4vw, 48px)',
            }}
          >
            <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)' }}>
              &copy; {new Date().getFullYear()} Shreyansh Mahato. All rights reserved.
            </p>
            <p className="mt-2 text-foreground-secondary" style={{ fontSize: 'clamp(11px, 1vw, 13px)' }}>
              Built with React, Tailwind CSS, and ❤️
            </p>
          </div>
        </footer>
      </div>
      </div>
    </div>
  );
};

export default Portfolio;
