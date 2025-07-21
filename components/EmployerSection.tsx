

import React, { useState, useCallback } from 'react';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import Label from './ui/Label';
import Input from './ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconBuilding2, IconSparkles, IconCheckCircle, IconLightbulb, Spinner } from './icons';
import { analyzeJobDescription } from '../services/geminiService';
import type { Job, JobAnalysis } from '../types';

interface EmployerSectionProps {
  onJobSubmit: (job: Job) => void;
}

const EmployerSection: React.FC<EmployerSectionProps> = ({ onJobSubmit }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [jobSubmitted, setJobSubmitted] = useState(false);

  const resetForm = () => {
    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setDescription('');
    setAnalysis(null);
    setJobSubmitted(false);
  }

  const handleAnalyzeJob = useCallback(async () => {
    if (!jobTitle.trim() || !companyName.trim() || !description.trim()) {
      setAnalysisError('Please fill out the Job Title, Company Name, and Description fields.');
      return;
    }
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysis(null);
    setJobSubmitted(false);

    try {
      const analysisData = await analyzeJobDescription({
        title: jobTitle,
        company: companyName,
        description: description,
      });
      setAnalysis(analysisData);

      const newJob: Job = {
        id: crypto.randomUUID(),
        jobTitle,
        company: companyName,
        location,
        description,
        status: 'pending',
        skills: analysisData.suggestedSkills,
        analysis: analysisData,
      };

      onJobSubmit(newJob);
      setJobSubmitted(true);
      
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [jobTitle, companyName, location, description, onJobSubmit]);

  const canSubmit = jobTitle && companyName && description;

  return (
    <section className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
            <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <IconBuilding2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Post a Job Opening</CardTitle>
                <CardDescription className="mt-2 text-lg max-w-2xl">Fill out the form below. Our AI will analyze your job description and suggest improvements.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="job-title">Job Title</Label>
                            <Input id="job-title" placeholder="e.g., Senior Frontend Developer" value={jobTitle} onChange={e => setJobTitle(e.target.value)} disabled={isAnalyzing || jobSubmitted} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" placeholder="e.g., Acme Corporation" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={isAnalyzing || jobSubmitted} />
                        </div>
                        <div className="space-y-1.5 col-span-full">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="e.g., San Francisco, CA or Remote" value={location} onChange={e => setLocation(e.target.value)} disabled={isAnalyzing || jobSubmitted} />
                        </div>
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="job-description">Job Description</Label>
                        <Textarea
                        id="job-description"
                        placeholder="Paste the full text of the job description here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isAnalyzing || jobSubmitted}
                        className="min-h-[250px]"
                        />
                    </div>
                    <Button onClick={handleAnalyzeJob} disabled={isAnalyzing || !canSubmit || jobSubmitted}>
                        {isAnalyzing ? (
                        <>
                            <Spinner className="-ml-1 mr-3" />
                            Analyzing Job...
                        </>
                        ) : (
                        <>
                            <IconSparkles className="mr-2 h-4 w-4" /> Analyze & Submit Job
                        </>
                        )}
                    </Button>
                    {analysisError && <p className="text-sm text-destructive mt-2">{analysisError}</p>}
                </div>
                
                <div className="space-y-6">
                    {jobSubmitted && (
                        <Card className="bg-green-50 border-green-200 animate-fade-in-up">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <IconCheckCircle className="h-8 w-8 text-green-600" />
                                    <div>
                                        <CardTitle className="text-green-800">Job Submitted for Review</CardTitle>
                                        <CardDescription className="text-green-700">Thank you! Your job posting has been sent to our admin team for approval.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={resetForm}>Post Another Job</Button>
                            </CardContent>
                        </Card>
                    )}
                    {analysis && !jobSubmitted && (
                        <Card className="bg-slate-50 border animate-fade-in-up">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <IconLightbulb className="h-6 w-6 text-primary" />
                                    <CardTitle className="text-xl">AI-Powered Analysis</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <h4 className="font-semibold text-foreground">Suggested Job Category</h4>
                                    <p className="text-muted-foreground">{analysis.suggestedCategory}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Suggested Skills</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {analysis.suggestedSkills.map((skill, i) => (
                                            <span key={i} className="bg-primary/10 text-primary font-medium text-xs px-2.5 py-1 rounded-full border border-primary/20">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground">Clarity & Inclusivity Feedback</h4>
                                    <p className="text-muted-foreground italic">"{analysis.clarityFeedback}"</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default EmployerSection;