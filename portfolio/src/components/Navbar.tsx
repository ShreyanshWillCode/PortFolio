import React, { useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Navbar.css'; // We'll create this next

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar ">
        <a href="#" className="logo">MyPortfolio</a>
        
        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li><a href="#home" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
          <li><a href="#skills" onClick={closeMobileMenu}>Skills</a></li>
          <li><a href="#projects" onClick={closeMobileMenu}>Projects</a></li>
          
          <li><a href="#social-medias" onClick={closeMobileMenu}>Social Media</a></li>
        </ul>
        
        {/* Desktop Social Media */}
        {/* <ul className="social-media">
          <li><a href="#home"><FaFacebook /></a></li>
          <li><a href="#about"><FaTwitter /></a></li>
          <li><a href="#skills"><FaLinkedin /></a></li>
          <li><a href="#projects"><FaGithub /></a></li>
          <li><a href="#social-medias"><FaGithub /></a></li>
        </ul> */}
        
        {/* Mobile Menu Toggle */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-links">
        <li><a href="#home"><FaFacebook /></a></li>
          <li><a href="#about"><FaTwitter /></a></li>
          <li><a href="#skills"><FaLinkedin /></a></li>
          <li><a href="#projects"><FaGithub /></a></li>
          <li><a href="#social-medias"><FaGithub /></a></li>
        </ul>
        
        <ul className="mobile-social">
        <li><a href="#home"><FaFacebook /></a></li>
          <li><a href="#about"><FaTwitter /></a></li>
          <li><a href="#skills"><FaLinkedin /></a></li>
          <li><a href="#projects"><FaGithub /></a></li>
          <li><a href="#social-medias"><FaGithub /></a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;