import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''} bg-background-darker text-foreground-primary`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <a href="#" className="logo font-mono font-bold text-xl md:text-2xl">
            <span className="text-accent">Shreyansh</span>
            <span className="text-foreground-secondary">.dev</span>
          </a>
          
          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={closeMobileMenu} className="nav-link text-foreground-secondary hover:text-foreground-primary">Home</a>
            </li>
            <li>
              <a href="#about" onClick={closeMobileMenu} className="nav-link text-foreground-secondary hover:text-foreground-primary">About</a>
            </li>
            <li>
              <a href="#skills" onClick={closeMobileMenu} className="nav-link text-foreground-secondary hover:text-foreground-primary">Skills</a>
            </li>
            <li>
              <a href="#projects" onClick={closeMobileMenu} className="nav-link text-foreground-secondary hover:text-foreground-primary">Projects</a>
            </li>
            <li>
              <a href="#social-medias" onClick={closeMobileMenu} className="nav-link text-foreground-secondary hover:text-foreground-primary">Contact</a>
            </li>
          </ul>
          
          {/* Desktop Social Media */}
          <div className="flex items-center gap-3">
            <ul className="social-media">
              <li>
                <a href="https://github.com/ShreyanshWillCode" target="_blank" rel="noopener noreferrer" className="social-icon text-foreground-secondary hover:text-accent">
                  <FaGithub />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shreyansh-mahato-7a706922b/" target="_blank" rel="noopener noreferrer" className="social-icon text-foreground-secondary hover:text-accent">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="https://leetcode.com/u/MahatoJI/" target="_blank" rel="noopener noreferrer" className="social-icon text-foreground-secondary hover:text-accent">
                  <SiLeetcode />
                </a>
              </li>
              <li>
                <a href="mailto:shreyanshmahato83683@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon text-foreground-secondary hover:text-accent">
                  <MdEmail />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="hamburger text-foreground-primary" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''} bg-background-darker`}>
          <div className="container mx-auto px-4 py-6">
            <ul className="mobile-links">
              <li><a href="#home" onClick={closeMobileMenu} className="mobile-link text-foreground-primary">Home</a></li>
              <li><a href="#about" onClick={closeMobileMenu} className="mobile-link text-foreground-primary">About</a></li>
              <li><a href="#skills" onClick={closeMobileMenu} className="mobile-link text-foreground-primary">Skills</a></li>
              <li><a href="#projects" onClick={closeMobileMenu} className="mobile-link text-foreground-primary">Projects</a></li>
              <li><a href="#social-medias" onClick={closeMobileMenu} className="mobile-link text-foreground-primary">Contact</a></li>
            </ul>
            
            <ul className="mobile-social">
              <li>
                <a href="https://github.com/ShreyanshWillCode" target="_blank" rel="noopener noreferrer" className="mobile-social-icon text-foreground-primary hover:text-accent">
                  <FaGithub />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/shreyansh-mahato-7a706922b/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon text-foreground-primary hover:text-accent">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="https://leetcode.com/u/MahatoJI/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon text-foreground-primary hover:text-accent">
                  <SiLeetcode />
                </a>
              </li>
              <li>
                <a href="mailto:shreyanshmahato83683@gmail.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon text-foreground-primary hover:text-accent">
                  <MdEmail />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;