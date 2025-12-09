import { useState } from 'react';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { SiCodingninjas, SiHackthebox, SiIntigriti, SiLeetcode, SiTryhackme } from 'react-icons/si';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Accomplishments', href: '#accomplishments' },
    { name: 'Publications', href: '#publications' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="absolute bg-gray-900 shadow-lg w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">


          {/* Desktop Menu (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons (Desktop) */}
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <a href="https://github.com/sbavis20" className="text-gray-300 hover:text-white">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/swapnil-vishwas-baviskar-bbb536214/" className="text-gray-300 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="https://leetcode.com/u/sawamura02/" className="text-gray-300 hover:text-white">
                <SiLeetcode size={20} />
              </a>
              <a href="https://www.naukri.com/code360/profile/sawamura" className="text-gray-300 hover:text-white">
                <SiCodingninjas size={20} />
              </a>
              <a href="https://app.intigriti.com/researcher/profile/sawamura02" className="text-gray-300 hover:text-white">
                <SiIntigriti size={20} />
              </a>
              <a href="https://www.hackthebox.com/" className="text-gray-300 hover:text-white">
                <SiHackthebox size={20} />
              </a>
              <a href="https://tryhackme.com/" className="text-gray-300 hover:text-white">
                <SiTryhackme size={20} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (shown when hamburger clicked) */}
      {isOpen && (
        <div className="md:hidden bg-blue-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex space-x-4 px-3 py-2">
              <a href="https://github.com" className="text-gray-300 hover:text-white">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <SiLeetcode size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <SiCodingninjas size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <SiIntigriti size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <SiHackthebox size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <SiTryhackme size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
