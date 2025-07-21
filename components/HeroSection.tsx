
import React from 'react';
import Button from './ui/Button';

const HeroSection = () => {
  const scrollToParser = () => {
    document.getElementById('parser-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEmployer = () => {
    document.getElementById('employer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden rounded-lg border">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10 bg-[length:200%_200%] animate-background-pan" />
      <div className="grid lg:grid-cols-5 gap-0 items-center">
        <div className="lg:col-span-3 p-8 md:p-12 lg:p-16 text-center lg:text-left animate-fade-in-up">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The New Standard in Employment Acquisition
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-xl mx-auto lg:mx-0">
            Stop manually filling out applications. Paste your resume and let our AI build your professional profile instantly, matching you with the perfect job opportunities.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button onClick={scrollToParser} className="text-base px-8 py-3 w-full sm:w-auto h-auto shadow-custom-lg hover:shadow-primary/20">
              Get Started
            </Button>
            <Button onClick={scrollToEmployer} variant="secondary" className="text-base px-8 py-3 w-full sm:w-auto h-auto">
              I'm Offering Employment
            </Button>
          </div>
        </div>
        <div className="lg:col-span-2 h-64 lg:h-full w-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1663076017998-3070079abcd2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Two professionals shaking hands, symbolizing a successful partnership."
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
