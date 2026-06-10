import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './Social_media.css';

const Social_media = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub size={24} />,
      url: 'https://github.com/ShreyanshWillCode',
      color: '#e2e8f0',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={24} />,
      url: 'https://www.linkedin.com/in/shreyansh-mahato-7a706922b/',
      color: '#0077B5',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram size={24} />,
      url: 'https://www.instagram.com/shreyanshmahato/',
      color: '#E1306C',
    },
    {
      name: 'X',
      icon: <FaTwitter size={24} />,
      url: 'https://x.com/Shreyanshmahato',
      color: '#1DA1F2',
    },
    {
      name: 'Email',
      icon: <MdEmail size={24} />,
      url: '',
      color: '#D14836',
    },
  ];

  return (
    <div className="social-media-container">
      <h2 className="text-2xl font-bold mb-6 text-white">Connect with Me</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {socialLinks.map((link) => {
          const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (link.name === 'Email') {
              e.preventDefault();
              const localPart = 'shreyanshmahato83683';
              const domain = 'gmail.com';
              window.location.href = `mailto:${localPart}@${domain}`;
            }
          };
          return (
            <a
              key={link.name}
              href={link.name === 'Email' ? '#' : link.url}
              onClick={handleClick}
              target={link.name === 'Email' ? undefined : '_blank'}
              rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
              className="contact-card"
              style={{ '--hover-color': link.color } as React.CSSProperties}
            >
              <div className="flex flex-col items-center justify-center p-4" style={{ minHeight: '80px' }}>
                {link.icon}
                <span className="mt-2 text-sm">{link.name}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Social_media;