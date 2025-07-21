

import React from 'react';
import { IconWind } from './icons';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <IconWind className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl text-background">New Standard Staffing</span>
          </div>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <button onClick={onOpenPrivacy} className="hover:text-primary transition-colors">Privacy Policy</button>
            <button onClick={onOpenTerms} className="hover:text-primary transition-colors">Terms of Service</button>
            <a href="#contact-section" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="hover:text-primary transition-colors">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} New Standard Staffing Solutions. All rights reserved. &bull; Powered by Google Gemini</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;