import React from "react";

import { FaGithub } from "react-icons/fa";
import "./App.css";
import "./index.css";

import { useState, useEffect } from "react";

import("tailwindcss").Config;

import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import ProjectShowcase from "./components/ProjectShowcase";
import SocialMedia from "./components/Social_media";
const Portfolio = () => {
  const [visible, setVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300); // Duration of the scale effect
  }
  useEffect(() => {
    setTimeout(() => setVisible(true), 400); // Small delay for smooth effect
  }, []);

  return (
    <div className="Graphics bg-gradient-to-r from-sky-100 via-blue-200 to-green-200">
      <div className="App">
        <Navbar />
        <div className="content">{/* Your page content goes here */}</div>
      </div>
      {/* Main Content */}
      <main className="w-screen min-h-screen mt-1 p-1">
        <section
          id="home"
          className="w-screen min-h-screen flex flex-col md:flex-row items-center text-center md:text-left p-5 bg-gradient-to-r from-sky-100 via-blue-200 to-green-200"
        >
          {/* Text Section */}
          {/* <div className="flex-1"> */}
          <p
            className={`text-lg sm:text-2xl md:text-5xl font-bold opacity-0 transform translate-y-5 transition-all duration-700 ease-in ${
              visible ? "opacity-100 translate-y-0" : ""
            }`}
          >
            Hello I'm <br /> <strong>Shreyansh,</strong>
            <br />
            Full Stack Developer
          </p>
          {/* </div> */}

          {/* Image Section */}
          {/* <div className="flex-1 flex justify-center"> */}
          <img
            src="/My_image.png"
            alt="Shreyansh"
            className="rounded-3xl shadow-lg border-4 m-5 border-white 
    w-34 xs:w-49 xs:h-50 sm:w-40 md:w-56 lg:w-64 xl:w-80 2xl:w-96 
    h-auto max-w-full  flex justify-center"
          />
          <a href="https://drive.google.com/file/d/1-a3uFBMwS3KqyQlDDK4UTbXarUJtk6FC/view?usp=drive_link">
          <button src="" alt="Resume"  className={`Resume  transition-transform duration-200  text-center  ${isClicked ? "scale-110":""}`} onClick={handleButtonClick}>View Resume</button>
          </a> 
        </section>

        <section
          id="about"
          className="min-h-screen flex flex-col justify-center items-center text-center bg-white/30 backdrop-blur-lg w-full py-20 px-10 font-serif"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">About Me</h2>

          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
            Hi, I'm <span className="font-semibold">Shreyansh</span>, a
            passionate
            <span className="font-semibold text-blue-600">
              {" "}
              Full Stack Developer
            </span>{" "}
            with a deep interest in building efficient, scalable, and
            user-friendly web applications.
          </p>

          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed mt-4">
            I am currently pursuing my Bachelor of Technology in Computer
            Science, where I have honed my skills in Data Structures,
            Algorithms, and Full Stack Development. My expertise includes modern
            web technologies such as React, Tailwind CSS, JavaScript, and SQL.
          </p>

          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed mt-4">
            Over time, I have worked on several real-world projects, including:
            <ul className="list-disc text-left mt-3 mx-auto max-w-lg text-gray-700">
              <li>
                Implementing Bi-Directional BFS for city navigation and
                comparing it with BFS and DFS.
              </li>
              <li>
                Developing a Spam Email Classifier using Machine Learning.
              </li>
              <li>
                Exploring Heuristic Search Strategies (A*, Greedy BFS, Hill
                Climbing) for solving the 8-Puzzle Problem.
              </li>
              <li>
                Building interactive and responsive UI designs using React and
                Tailwind.
              </li>
            </ul>
          </p>

          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed mt-6">
            My passion lies in solving complex problems, optimizing performance,
            and creating seamless digital experiences. I actively contribute to
            GitHub and continuously explore new technologies to expand my
            expertise.
          </p>

          <p className="text-lg font-semibold text-gray-800 max-w-3xl leading-relaxed mt-6">
            Let's build something amazing together.
          </p>
        </section>

        <section id="skills" className="py-5">
          <Skills />
        </section>

        <section id="projects" className="py-5">
          <h2 className="text-center text-2xl font-bold mb-4"></h2>
          <ProjectShowcase />
        </section>

        <section id="social-media" className="py-5">
          <h2 className="text-center text-2xl font-bold mb-4">Social Media</h2>
          <SocialMedia />
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
