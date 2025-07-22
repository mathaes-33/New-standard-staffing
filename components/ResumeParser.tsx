
import React, { useState, useCallback } from 'react';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import Label from './ui/Label';
import ProfileDisplay from './ProfileDisplay';
import MatchingJobs from './MatchingJobs';
import FormW4 from './FormW4';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconBot, IconSearch, Spinner } from './icons';
import { parseResume, findMatchingJobs } from '../services/geminiService';
import type { ParsedResume, Job, Application } from '../types';

interface ResumeParserProps {
  onApply: (job: Job) => void;
  applications: Application[];
}

const ResumeParser: React.FC<ResumeParserProps> = ({ onApply, applications }) => {
  const [resumeText, setResumeText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const [matchingJobs, setMatchingJobs] = useState<Job[] | null>(null);
  const [isFindingJobs, setIsFindingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  
  const [showW4Form, setShowW4Form] = useState(false);

  const handleFindJobs = useCallback(async (profile: ParsedResume) => {
    setIsFindingJobs(true);
    setJobsError(null);
    setMatchingJobs(null);
    try {
        const jobs = await findMatchingJobs(profile);
        setMatchingJobs(jobs);
    } catch(err) {
        setJobsError(err instanceof Error ? err.message : 'An unknown error occurred while finding jobs.');
    } finally {
        setIsFindingJobs(false);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!resumeText.trim()) {
      setParseError('Please paste your resume text into the box.');
      return;
    }
    setIsParsing(true);
    setParseError(null);
    setParsedData(null);
    setMatchingJobs(null); 
    setJobsError(null);
    setShowW4Form(false);
    try {
      const data = await parseResume(resumeText);
      setParsedData(data);
      handleFindJobs(data); // Automatically find jobs after successful parse
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsParsing(false);
    }
  }, [resumeText, handleFindJobs]);


  return (
    <section className="space-y-12">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <IconSearch className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">AI-Powered Resume Analysis</CardTitle>
            <CardDescription className="mt-2 text-lg max-w-2xl">Paste your resume below to get started. Our AI will do the heavy lifting.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="resume-text" className="sr-only">Your Resume</Label>
                <Textarea
                  id="resume-text"
                  placeholder="Paste the full text of your resume here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  disabled={isParsing || isFindingJobs}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={isParsing || isFindingJobs || !resumeText} className="w-full sm:w-auto">
                {(isParsing || isFindingJobs) ? (
                  <>
                    <Spinner className="-ml-1 mr-3" />
                    {isParsing ? 'Analyzing...' : 'Finding Jobs...'}
                  </>
                ) : (
                  <>
                    <IconBot className="mr-2 h-4 w-4" /> Analyze & Find Jobs
                  </>
                )}
              </Button>
              {parseError && <p className="text-sm text-destructive font-medium">{parseError}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {parsedData && (
        <div className="animate-fade-in-up space-y-12">
           <ProfileDisplay data={parsedData} />
           
            {isFindingJobs && (
              <div className="flex justify-center items-center flex-col text-center pt-8">
                  <Spinner className="h-8 w-8 text-primary mb-4" />
                  <p className="text-muted-foreground font-medium">Searching for AI-powered job matches...</p>
              </div>
            )}

            {jobsError && <p className="text-sm text-destructive mt-4 text-center">{jobsError}</p>}

            {matchingJobs && (
                <MatchingJobs jobs={matchingJobs} onApply={onApply} applications={applications} />
            )}

            {matchingJobs && matchingJobs.length > 0 && !showW4Form && (
                <div className="text-center pt-8">
                    <Button onClick={() => setShowW4Form(true)} variant="link">
                        Pre-fill a sample W-4 form?
                    </Button>
                </div>
            )}

            {showW4Form && parsedData && (
                <div className="mt-12">
                    <FormW4 profile={parsedData} />
                </div>
            )}
        </div>
      )}
    </section>
  );
};

export default ResumeParser;
