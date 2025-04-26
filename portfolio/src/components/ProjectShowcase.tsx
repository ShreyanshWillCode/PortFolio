import React from "react"; 
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  github: string;
  liveDemo?: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "Spam Email Classifier",
    description:
      "A machine learning project to classify spam emails using various algorithms.",
    github: "https://github.com/ShreyanshWillCode/Spam_Email_Classifier",
    liveDemo: "https://spam-email-classifier-five.vercel.app/",
    imageUrl: "/Spam_email.png",
  },
  {
    title: "8-Puzzle Solver",
    description:
      "A heuristic search implementation solving the 8-Puzzle problem using A* and other techniques.",
    github: "https://github.com/Lightcoderhub/8-puzzle-solver",
    liveDemo: "https://8puzzle.vercel.app",
    imageUrl: "/8Puzzle.png", // Updated path since it's in the public folder
  },
  {
    title: "Dictionary App",
    description:
      "A simple dictionary app that fetches word definitions and meanings.",
    github: "https://github.com/Lightcoderhub/Dictionary",
    liveDemo: "https://shaabdkosh.vercel.app/",
    imageUrl: "/Dictionary.png",
  },
  {
    title: "Weather App",
    description:
      "A weather forecasting app that provides real-time weather updates.",
    github: "https://github.com/Lightcoderhub/Weather-App",
    liveDemo: "https://weather-app-rose-sigma.vercel.app/",
    imageUrl: "/Weather.png",
  },
  {
    title: "Mars-Rover-Navigation",
    description:
      "A simulation of Mars rover navigation using path finding algorithms.",
    github: "https://github.com/ShreyanshWillCode/Mars_Rover_Navigation_",
    liveDemo: "https://mars-rover-navigationfrontend.vercel.app/",
    imageUrl: "/Mars-Rover.png",
  }
];

const ProjectShowcase: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-5 ">My Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <Card>
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              <CardContent>
                <div className="p-4 flex flex-col">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-between sm:justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">
                        <Github className="mr-2 h-5 w-5" /> GitHub
                      </Button>
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="default">
                          <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                        </Button>
                      </a>
                    )}
                  </div>
                </div> 
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;