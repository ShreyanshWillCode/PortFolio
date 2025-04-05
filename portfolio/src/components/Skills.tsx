import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaDatabase } from "react-icons/fa";
import { SiPython, SiCplusplus } from "react-icons/si";
import "./skill.css";
const skills = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500 " /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-500" /> },
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "SQL", icon: <FaDatabase className="text-gray-600" /> },
  { name: "Python", icon: <SiPython className="text-blue-700" /> },
  { name: "C++", icon: <SiCplusplus className="text-indigo-600" /> },
];

const Skills = () => {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-8xl   mb-10 text-gray-800 font-extrabold">My Skills</h1>

      <br /><br />

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 w-32 h-32 transform transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-5xl">{skill.icon}</div>
            <p className="mt-3 text-lg font-medium text-gray-700">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
