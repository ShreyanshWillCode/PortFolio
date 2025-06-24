import React, { useRef, useEffect, useState } from "react";
import "./Skills.css";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaJava, FaDocker } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiMongodb, SiExpress, SiMysql, SiPython, SiTypescript, SiNextdotjs, SiFirebase, SiRedux } from "react-icons/si";
// import { ThemeContext } from "../context/ThemeContext";

const Skills = () => {
  // const { darkMode } = useContext(ThemeContext);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headingRef = useRef<HTMLDivElement>(null);
  const [underlineVisible, setUnderlineVisible] = useState(false);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const rotateX = (mouseY - centerY) / 10; // Adjust sensitivity
    const rotateY = (centerX - mouseX) / 10; // Adjust sensitivity

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.05,
      ease: "power1.out",
      duration: 0.3,
      overwrite: true,
      willChange: "transform, box-shadow"
    });
    const fill = card.querySelector('.skill-level-fill');
    if (fill) {
      gsap.to(fill, { backgroundColor: 'hsl(var(--primary-500))' });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const card = e.currentTarget;
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      ease: "elastic.out(1, 0.5)",
      duration: 0.7,
      overwrite: true,
      willChange: "transform, box-shadow"
    });
    const fillLeave = card.querySelector('.skill-level-fill');
    if (fillLeave) {
      gsap.to(fillLeave, { backgroundColor: 'hsl(var(--accent))' });
    }
  };

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "HTML", icon: <FaHtml5 className="text-orange-500" size={40} /> },
        { name: "CSS", icon: <FaCss3Alt className="text-blue-500" size={40} /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" size={40} /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-600" size={40} /> },
        { name: "React", icon: <FaReact className="text-blue-400" size={40} /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-gray-800 dark:text-white" size={40} /> },
        { name: "Redux", icon: <SiRedux className="text-purple-600" size={40} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" size={40} /> },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" size={40} /> },
        { name: "Express", icon: <SiExpress className="text-gray-500 dark:text-gray-300" size={40} /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600" size={40} /> },
        { name: "MySQL", icon: <SiMysql className="text-blue-600" size={40} /> },
        { name: "Firebase", icon: <SiFirebase className="text-yellow-500" size={40} /> },
      ],
    },
    {
      category: "Other",
      skills: [
        { name: "Python", icon: <SiPython className="text-yellow-400" size={40} /> },
        { name: "Java", icon: <FaJava className="text-red-500" size={40} /> },
        { name: "Git", icon: <FaGitAlt className="text-orange-600" size={40} /> },
        { name: "GitHub", icon: <FaGithub className="text-gray-300" size={40} /> },
        { name: "Docker", icon: <FaDocker className="text-blue-400" size={40} /> },
      ],
    },
  ];

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setUnderlineVisible(entry.isIntersecting),
      { threshold: 0.7 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-16 bg-background-default">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 py-10" ref={headingRef}>
         
          <div className={`underline-animate mt-3 ${underlineVisible ? 'visible' : ''}`}></div>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skillCategories.flatMap((cat) =>
            cat.skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                className="group rounded-2xl p-5 bg-black/40 backdrop-blur-md shadow-xl shadow-black/40 border-2 border-transparent bg-clip-padding transition-all duration-300 card-glow card-yellow-glow"
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 0 48px 8px #38bdf8, 0 2px 16px 0 rgba(0,0,0,0.35)",
                }}
                onMouseMove={handleCardHover} 
                onMouseLeave={handleCardLeave}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2 text-4xl group-hover:glow-text transition-all duration-300">{skill.icon}</div>
                  <div className="mt-1 text-lg font-semibold text-white group-hover:glow-text transition-all duration-300">{skill.name}</div>
                </div>
              </motion.div>
            ))
          )}
          </div>
    </div>
    </section>
  );
};

export default Skills;
