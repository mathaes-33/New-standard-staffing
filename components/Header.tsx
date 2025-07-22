

import React, { useState, useEffect } from 'react';
import { IconWind, IconMenu, IconX } from './icons';
import Auth from './Auth';

interface HeaderProps {
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = (
    <>
      <a href="#parser-section" onClick={(e) => { e.preventDefault(); scrollToSection('parser-section'); }} className="transition-colors hover:text-primary">For Job Seekers</a>
      <a href="#tracking-section" onClick={(e) => { e.preventDefault(); scrollToSection('tracking-section'); }} className="transition-colors hover:text-primary">My Applications</a>
      <a href="#employer-section" onClick={(e) => { e.preventDefault(); scrollToSection('employer-section'); }} className="transition-colors hover:text-primary">For Employers</a>
      {isAdmin && <a href="#admin-section" onClick={(e) => { e.preventDefault(); scrollToSection('admin-section'); }} className="transition-colors hover:text-primary">Admin</a>}
      <a href="#resources-section" onClick={(e) => { e.preventDefault(); scrollToSection('resources-section'); }} className="transition-colors hover:text-primary">Resources</a>
      <a href="#about-section" onClick={(e) => { e.preventDefault(); scrollToSection('about-section'); }} className="transition-colors hover:text-primary">About Us</a>
      <a href="#contact-section" onClick={(e) => { e.preventDefault(); scrollToSection('contact-section'); }} className="transition-colors hover:text-primary">Contact Us</a>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 font-bold text-lg">
          <IconWind className="h-6 w-6 text-primary" />
          <span className="text-foreground">New Standard Staffing</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks}
          </nav>
          <Auth />
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-lg shadow-lg animate-accordion-down z-40 origin-top">
           <nav className="flex flex-col items-center space-y-6 py-8 text-base font-medium">
            {navLinks}
            <div className="pt-4 border-t border-border w-4/5 flex justify-center">
                 <Auth />
            </div>
           </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
