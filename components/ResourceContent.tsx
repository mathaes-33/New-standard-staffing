

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconBookOpen } from './icons';
import ResourceContent from './ResourceContent';

type Tab = 'seekers' | 'employers';

const seekerTopics = [
  { 
    title: "Advanced Resume Writing Tips",
    content: [
      "Use keywords from the job description to pass through Applicant Tracking Systems (ATS).",
      "Quantify your achievements with numbers and data (e.g., 'Increased sales by 15% over six months').",
      "Tailor the top third of your resume for each specific job application you submit.",
      "Choose a clean, professional format that is easy for both humans and machines to read.",
      "Include a concise professional summary (3-4 lines) that highlights your key qualifications and career goals."
    ] 
  },
  { 
    title: "Common Interview Questions & Answers",
    content: [
      "Prepare for 'Tell me about yourself' by crafting a 90-second pitch about your experience and skills.",
      "Use the STAR method (Situation, Task, Action, Result) to answer behavioral questions.",
      "Always have thoughtful questions ready to ask the interviewer about the role, team, and company culture.",
      "Research the company thoroughly to understand its mission, values, and recent projects.",
      "Practice your answers out loud to build confidence and ensure they flow naturally."
    ]
  },
  { 
    title: "Crafting a Compelling Cover Letter",
    content: [
      "Address the hiring manager by name if possible.",
      "The opening paragraph should grab the reader's attention and state the role you're applying for.",
      "Connect your skills and experiences directly to the requirements listed in the job description.",
      "Show your personality and enthusiasm for the company and the role.",
      "End with a clear call to action, expressing your desire for an interview."
    ]
  },
];

const employerTopics = [
  { 
    title: "Effective Interviewing Techniques",
    content: [
      "Use structured interviews with a consistent set of questions for all candidates to reduce bias.",
      "Incorporate behavioral questions that ask for specific examples of past performance.",
      "Include a panel of diverse interviewers from different teams or levels.",
      "Clearly explain the interview process and next steps to the candidate.",
      "Focus on assessing skills and culture fit, not just 'likability'."
    ]
  },
  { 
    title: "Writing Inclusive Job Descriptions",
    content: [
      "Use gender-neutral language and avoid corporate jargon.",
      "Distinguish between 'must-have' and 'nice-to-have' skills to avoid discouraging qualified candidates.",
      "Highlight your company's commitment to diversity and inclusion.",
      "Focus on outcomes and responsibilities rather than a long list of specific qualifications.",
      "Ensure the description is accessible to people with disabilities (e.g., uses clear formatting)."
    ]
  },
  { 
    title: "Onboarding Best Practices",
    content: [
      "Start the onboarding process before the new hire's first day with a welcome email and schedule.",
      "Prepare all necessary equipment and account access in advance.",
      "Assign an 'onboarding buddy' to help the new hire navigate the company culture.",
      "Schedule regular check-ins during the first 90 days to provide feedback and support.",
      "Clearly communicate the role's expectations, goals, and key performance indicators (KPIs)."
    ]
  },
  { 
    title: "Building a Strong Employer Brand",
    content: [
      "Define and clearly articulate your company's mission, vision, and values.",
      "Encourage employees to share their positive experiences on social media and review sites.",
      "Maintain a professional and engaging career page on your website.",
      "Provide a positive candidate experience, even for those you don't hire.",
      "Showcase your company culture through team photos, videos, and testimonials."
    ]
  },
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
              Expert advice to boost your career or hiring strategy.
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

        <div className="space-y-4 max-w-4xl mx-auto">
          {activeTab === 'seekers' && seekerTopics.map(topic => (
            <ResourceContent key={topic.title} title={topic.title} content={topic.content} />
          ))}
          {activeTab === 'employers' && employerTopics.map(topic => (
            <ResourceContent key={topic.title} title={topic.title} content={topic.content} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Resources;
