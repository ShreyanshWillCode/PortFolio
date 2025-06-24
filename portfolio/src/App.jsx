import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typewriter from "typewriter-effect";
import useScrollAnimation from "./hooks/useScrollAnimation";

import "./App.css";
import "./index.css";
// import { ThemeContext } from './context/ThemeContext';

import Navbar from "./components/Navbar.tsx";
import Skills from "./components/Skills.tsx";
import ProjectShowcaseTailwind from "./components/ProjectShowcaseTailwind.tsx";
import SocialMedia from "./components/Social_media.tsx";
import Preloader from "./components/Preloader";
// import Car3DHero from "./components/Car3DHero";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const aboutRef = useScrollAnimation();
  const skillsRef = useScrollAnimation();
  const projectsRef = useScrollAnimation();
  const contactRef = useScrollAnimation();
  // New: heading refs for underline animation
  const aboutHeadingRef = useScrollAnimation('active');
  const skillsHeadingRef = useScrollAnimation('active');
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

  useEffect(() => {
    const loadingOverlay = document.getElementById("loading-overlay");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (loadingOverlay) {
      if (!prefersReducedMotion) {
        gsap.to(loadingOverlay, {
          opacity: 0,
          duration: 1,
          delay: 1.5,
          onComplete: () => {
            loadingOverlay.style.display = "none";
            setIsLoading(false);
          },
        });
      } else {
        loadingOverlay.style.display = "none";
        setIsLoading(false);
      }
    }
  }, []);

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
    <div className={`min-h-screen bg-gradient-to-b from-background-default via-background-darker to-background-darkest text-foreground-primary transition-colors duration-1000`}>
      {isLoading && <Preloader />}
      <Navbar />
      <div className="App">
        {/* Hero Section */}
        <section
          id="home"
          className="parallax-bg relative min-h-screen flex items-center justify-center"
        >
          <div
            id="intro-text"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl md:text-6xl font-bold z-10 drop-shadow-custom-glow"
          >
            {!window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-4xl md:text-6xl font-bold text-white drop-shadow-custom-glow">
                  Hey I'm Shreyansh
                </p>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white flex items-center whitespace-nowrap">
                  <span className="mr-1">F</span>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("ull Stack Developer")
                        .pauseFor(1500)
                        .deleteAll()
                        .start();
                    }}
                    options={{
                      loop: true,
                      delay: 80,
                      deleteSpeed: 40,
                      cursor: "|",
                      autoStart: true,
                    }}
                  />
                </div>
                {/* Resume Button */}
                <div className="mt-8">
                  <a
                    href="https://drive.google.com/file/d/1rgaQ-wedNlygzG_Ol6Pt454Xuc9IW82f/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-blue-400/30 backdrop-blur-sm"
                  >
                    View My Resume
                  </a>
                </div>
              </div>
            ) : (
              <>
                <p className="text-4xl md:text-6xl font-bold text-white drop-shadow-custom-glow">
                  Hey I'm Shreyansh
                </p>
                <p className="text-3xl md:text-5xl font-semibold text-white">
                  Full Stack Developer
                </p>
                {/* Resume Button for reduced motion */}
                <div className="mt-8">
                  <a
                    href="https://drive.google.com/file/d/1rgaQ-wedNlygzG_Ol6Pt454Xuc9IW82f/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base md:text-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-colors duration-300 border border-blue-400/30 backdrop-blur-sm"
                  >
                    View My Resume
                  </a>
                </div>
              </>
            )}
          </div>
        </section>
       

        {/* About Section */}
        <section
          id="about"
          ref={aboutRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 ref={aboutHeadingRef} className="text-3xl md:text-4xl font-bold mb-4 heading-underline-ltr tracking-wide font-semibold text-sky-300 inline-block">
                About Me
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                <p className="text-foreground-secondary mb-4">
                  Hi, I'm <span className="font-semibold">Shreyansh</span>, a
                  passionate
                  <span className="font-semibold text-accent">
                    {" "}
                    Full Stack Developer
                  </span>{" "}
                  with a deep interest in building efficient, scalable, and
                  user-friendly web applications.
                </p>
                <p className="text-foreground-secondary mb-4">
                  I am currently pursuing my Bachelor of Technology in Computer
                  Science, where I have honed my skills in Data Structures,
                  Algorithms, and Full Stack Development. My expertise includes
                  modern web technologies such as React, Tailwind CSS,
                  JavaScript, and SQL.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 className="font-bold text-accent mb-2">Education</h4>
                    <p className="text-foreground-secondary ">
                      B.Tech in Computer Science
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-accent mb-2">Location</h4>
                    <p className="text-foreground-secondary ">Bokaro, India</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3 mt-5 text-center">
                  My Projects
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-accent py-2 card-style">
                    <h4 className="font-bold">Bi-Directional BFS</h4>
                    <p className="text-foreground-secondary ">
                      Implementing Bi-Directional BFS for city navigation and
                      comparing it with BFS and DFS.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent py-2 card-style">
                    <h4 className="font-bold">Spam Email Classifier</h4>
                    <p className="text-foreground-secondary ">
                      Developing a Spam Email Classifier using Machine Learning.
                    </p>
                  </div>
                  <div className="border-l-4 border-accent py-2 card-style">
                    <h4 className="font-bold">Heuristic Search Strategies</h4>
                    <p className="text-foreground-secondary ">
                      Exploring A*, Greedy BFS, and Hill Climbing algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <section
          id="skills"
          ref={skillsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 ref={skillsHeadingRef} className="text-3xl md:text-4xl font-bold mb-4 heading-underline-center tracking-wide font-semibold text-cyan-300 inline-block">
                Skills
              </h2>
            </div>

            <Skills />
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={projectsRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 ref={projectsHeadingRef} className="text-3xl md:text-4xl font-bold mb-4 heading-underline-rtl tracking-wide font-semibold text-indigo-300 inline-block">
                Projects
              </h2>
            </div>
            <ProjectShowcaseTailwind />
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="social-medias"
          ref={contactRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 ref={contactHeadingRef} className="text-3xl md:text-4xl font-bold mb-4 heading-underline-fadeup tracking-wide font-semibold text-teal-300 inline-block">
                Contact
              </h2>
              <p className="text-foreground-secondary mt-4 max-w-2xl mx-auto">
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
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Shreyansh Mahato. All rights
              reserved.
            </p>
            <p className="mt-2 text-foreground-secondary">
              Built with React, Tailwind CSS, and ❤️
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
