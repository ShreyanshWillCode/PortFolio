import React from "react";

const SocialMedia = () => {
return(
    <section className="w-full flex items-center justify-center text-center  gap-5 mt-10"> 
    
    <a href="https://github.com/ShreyanshWillCode" target="_blank" rel="noopener noreferrer">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          className="w-9 h-9"
        />
      </a>
      <a href="https://www.linkedin.com/in/shreyansh-mahato-7a706922b/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
          alt="LinkedIn"
          className="w-9 h-9"
        />
      </a>
      <a href="https://leetcode.com/u/MahatoJI/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode"
          className="w-9 h-9"
        />
      </a>
      <a href="mailto:shreyanshmahato83683@gmail.com" target="_blank" rel="noopener noreferrer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
          alt="Gmail"
          className="w9 h-9"
        />
      </a>
    </section>
);
};

export default SocialMedia;