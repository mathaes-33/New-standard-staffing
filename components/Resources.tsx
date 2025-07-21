

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconBookOpen } from './icons';
import ResourceContent from './ResourceContent';

type Tab = 'seekers' | 'employers';

const seekerTopics = [
  { title: "Advanced Resume Writing Tips", description: "Learn how to tailor your resume for Applicant Tracking Systems (ATS) and human recruiters." },
  { title: "Common Interview Questions & Answers", description: "Prepare for common questions and learn how to structure your answers effectively." },
  { title: "Crafting a Compelling Cover Letter", description: "Understand the key components of a cover letter that grabs attention." },
];

const employerTopics = [
  { title: "Effective Interviewing Techniques", description: "Learn how to conduct structured interviews that reveal a candidate's true potential." },
  { title: "Writing Inclusive Job Descriptions", description: "Craft job descriptions that attract a diverse and qualified pool of candidates." },
  { title: "Onboarding Best Practices", description: "Discover how to create a successful onboarding process for new hires." },
  { title: "Building a Strong Employer Brand", description: "Get tips on how to showcase your company culture to attract top professionals." },
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState<Tab>('seekers');

  const TabButton = ({ tab, children }: { tab: Tab, children: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tab 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-transparent text-muted-foreground hover:bg-secondary'
      }`}
    >
      {children}
    </button>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-full">
            <IconBookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary">Career & Hiring Resources</CardTitle>
            <CardDescription className="max-w-3xl text-lg">
              Get AI-powered advice on-demand to boost your career or hiring strategy.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6 border-b">
          <div className="flex space-x-2">
            <TabButton tab="seekers">For Job Seekers</TabButton>
            <TabButton tab="employers">For Employers</TabButton>
          </div>
        </div>

        <div className="space-y-4">
          {activeTab === 'seekers' && seekerTopics.map(topic => (
            <ResourceContent key={topic.title} title={topic.title} description={topic.description} audience="Job Seeker" />
          ))}
          {activeTab === 'employers' && employerTopics.map(topic => (
            <ResourceContent key={topic.title} title={topic.title} description={topic.description} audience="Employer" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Resources;