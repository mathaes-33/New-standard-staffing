

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ResumeParser from './components/ResumeParser';
import EmployerSection from './components/EmployerSection';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ApplicationTracking from './components/ApplicationTracking';
import Resources from './components/Resources';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import AuthWall from './components/AuthWall';
import { IconClipboardList, IconSearch, IconBuilding2, Spinner } from './components/icons';
import type { Job, Application } from './types';

function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
import netlifyIdentity from 'netlify-identity-widget';
  // This namespace must match the one defined in your Auth0 Rule or Action
  // to correctly read user roles from the ID token.
  const AUTH0_ROLES_NAMESPACE = 'https://new-standard-staffing.com/roles';
  const isAdmin = user?.[AUTH0_ROLES_NAMESPACE]?.includes('admin') ?? false;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleJobSubmit = (newJob: Job) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  const handleJobStatusUpdate = (jobId: string, status: 'approved' | 'rejected') => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = false; // You can implement admin logic using Netlify Identity user metadata if needed.
      )
    );
    if(status === 'rejected') {
        setApplications(prevApps => prevApps.filter(app => app.job.id !== jobId));
    }
  };

  const handleApplyForJob = (jobToApply: Job) => {
    if (!isAuthenticated) {
        loginWithRedirect({
            appState: { returnTo: window.location.pathname + '#parser-section' }
        });
        return;
    }
    if (applications.some(app => app.job.id === jobToApply.id)) return;

    const newApplication: Application = {
      job: jobToApply,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString(),
    };
    setApplications(prevApps => [newApplication, ...prevApps]);

    setTimeout(() => {
      setApplications(prevApps =>
        prevApps.map(app =>
          app.job.id === jobToApply.id
            ? { ...app, status: 'Under Review' }
            : app
        )
      );
    }, 15000); 
    setTimeout(() => {
      setApplications(prevApps =>
        prevApps.map(app =>
          app.job.id === jobToApply.id && app.status === 'Under Review'
            ? { ...app, status: 'Interview' }
            : app
        )
      );
    }, 30000);
  };
  
  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary">
            <Spinner className="h-10 w-10 text-primary" />
    if (!isAuthenticated) {
      netlifyIdentity.open();
      return;
    }
      <Header isAdmin={isAdmin} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
            <HeroSection />
            <div id="parser-section" className="scroll-mt-20">
              {isAuthenticated ? (
                <ResumeParser onApply={handleApplyForJob} applications={applications} />
              ) : (
                <AuthWall 
                  icon={IconSearch}
                  title="Unlock Your Career Potential"
                  description="Sign up or log in to analyze your resume with our AI, create a professional profile, and instantly find job matches tailored to your skills and experience."
                />
              )}
            </div>
            <div id="tracking-section" className="scroll-mt-20">
              {isAuthenticated ? (
                <ApplicationTracking applications={applications} />
              ) : (
                <AuthWall
                    icon={IconClipboardList}
                    title="Track Your Applications with Ease"
                    description="Log in to view your application pipeline, track your progress from 'Applied' to 'Offer', and stay organized in your job search."
                />
              )}
            </div>
            <div id="employer-section" className="scroll-mt-20">
             {isAuthenticated ? (
                <EmployerSection onJobSubmit={handleJobSubmit} />
              ) : (
                <AuthWall
                    icon={IconBuilding2}
                    title="Find Top Employment Faster"
                    description="Are you hiring? Log in to post job openings, get AI-powered analysis on your descriptions, and connect with qualified candidates from our employment pool."
                />
              )}
            </div>
             {isAdmin && (
                <div id="admin-section" className="scroll-mt-20">
                    <AdminDashboard jobs={jobs} onJobStatusUpdate={handleJobStatusUpdate} />
                </div>
             )}
            <div id="resources-section" className="scroll-mt-20">
              <Resources />
            </div>
            <div id="about-section" className="scroll-mt-20">
              <AboutUs />
            </div>
            <div id="contact-section" className="scroll-mt-20">
              <ContactUs />
            </div>
        </div>
      </main>
      <Footer onOpenTerms={() => setIsTermsOpen(true)} onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      
      {isTermsOpen && <TermsAndConditions onClose={() => setIsTermsOpen(false)} />}
      {isPrivacyOpen && <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />}
    </div>
  );
}

export default App;
