

import React from 'react';
import type { ParsedResume } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconUser, IconMail, IconPhone, IconBriefcase, IconGraduationCap, IconHome, IconSparkles } from './icons';

const ProfileDisplay: React.FC<{ data: ParsedResume }> = ({ data }) => {
  return (
    <Card className="w-full mx-auto shadow-xl p-2 bg-gradient-to-tr from-primary to-cyan-400">
      <div className="bg-card rounded-md">
        <CardHeader>
          <div className="text-center pt-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mx-auto flex items-center justify-center mb-4 ring-4 ring-white shadow-lg">
                <IconUser className="h-12 w-12 text-primary"/>
              </div>
              <CardTitle className="text-3xl font-extrabold tracking-tight">{data.fullName}</CardTitle>
              <CardDescription className="text-primary font-medium mt-1">AI-Generated Professional Profile</CardDescription>
              <div className="mt-4 flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-muted-foreground text-sm">
                  {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors"><IconMail className="h-4 w-4" /> {data.email}</a>}
                  {data.phone && <span className="flex items-center gap-1.5"><IconPhone className="h-4 w-4" /> {data.phone}</span>}
                  {data.address && <span className="flex items-center gap-1.5"><IconHome className="h-4 w-4" /> {data.address}</span>}
              </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          
          <section>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <IconUser className="h-5 w-5 text-primary" /> Professional Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed bg-secondary/50 p-4 rounded-lg border">{data.summary}</p>
          </section>

          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                  <IconSparkles className="h-5 w-5 text-primary" /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-primary/10 text-primary font-medium text-xs px-3 py-1.5 rounded-full border border-primary/20">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                  <IconBriefcase className="h-5 w-5 text-primary" /> Work Experience
              </h2>
              <div className="relative space-y-6 border-l-2 border-primary/20 ml-2 pl-8">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-white"></div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{exp.dates}</p>
                    <h3 className="font-semibold text-lg text-foreground">{exp.jobTitle}</h3>
                    <p className="font-medium text-primary">{exp.company} <span className="text-muted-foreground font-normal">- {exp.location}</span></p>
                    <ul className="mt-2 list-disc list-outside space-y-1.5 text-muted-foreground marker:text-primary ml-4">
                      {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
               <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                  <IconGraduationCap className="h-5 w-5 text-primary" /> Education
              </h2>
               <div className="space-y-4">
                  {data.education.map((edu, index) => (
                      <div key={index} className="bg-secondary/50 p-4 rounded-lg border">
                          <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.institution}, {edu.location}</p>
                          <p className="text-sm text-muted-foreground">Graduated: {edu.graduationYear}</p>
                      </div>
                  ))}
               </div>
            </section>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProfileDisplay;
