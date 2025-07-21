

import React, { useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
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
import { IconClipboardList, IconSearch, IconBuilding2 } from './components/icons';
import type { Job, Application } from './types';

function App() {
  const [user, setUser] = useState<netlifyIdentity.User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const updateUserState = (user: netlifyIdentity.User | null) => {
        setUser(user);
        setIsAdmin(user?.app_metadata?.roles?.includes('admin') ?? false);
    }
    
    const onLogin = (user: netlifyIdentity.User) => {
        updateUserState(user);
        netlifyIdentity.close();
    };

    const onLogout = () => {
        updateUserState(null);
    };

    // The 'init' event fires when the widget has initialized, passing the current user.
    // This is the recommended way to handle initial user state.
    netlifyIdentity.on('init', updateUserState);
    netlifyIdentity.on('login', onLogin);
    netlifyIdentity.on('logout', onLogout);
    
    // Initialize the widget after listeners are set up.
    netlifyIdentity.init();

    // Cleanup listeners on component unmount.
    return () => {
        netlifyIdentity.off('init', updateUserState);
        netlifyIdentity.off('login', onLogin);
        netlifyIdentity.off('logout', onLogout);
    }
  }, []);


  const handleJobSubmit = (newJob: Job) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  const handleJobStatusUpdate = (jobId: string, status: 'approved' | 'rejected') => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, status } : job
      )
    );
    // Also remove from applications if rejected, as an example of state consistency
    if(status === 'rejected') {
        setApplications(prevApps => prevApps.filter(app => app.job.id !== jobId));
    }
  };

  const handleApplyForJob = (jobToApply: Job) => {
    if (!user) {
        netlifyIdentity.open('login');
        return;
    }
    if (applications.some(app => app.job.id === jobToApply.id)) return;

    const newApplication: Application = {
      job: jobToApply,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString(),
    };
    setApplications(prevApps => [newApplication, ...prevApps]);

    // Simulate status progression for demonstration
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


  return (
    <div className="flex flex-col min-h-screen bg-secondary font-sans">
      <Header user={user} isAdmin={isAdmin} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
            <HeroSection />
            <div id="parser-section" className="scroll-mt-20">
              {user ? (
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
              {user ? (
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
             {user ? (
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