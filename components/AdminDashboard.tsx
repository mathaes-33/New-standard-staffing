import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import Button from './ui/Button';
import { IconLayoutDashboard, IconCheckCircle, IconXCircle, IconSparkles, IconSearch } from './icons';
import type { Job, AdminUser } from '../types';
import { findSimilarJobs } from '../services/geminiService';
import AnalyticsChart from './AnalyticsChart';
import UserTable from './UserTable';

interface AdminDashboardProps {
  jobs: Job[];
  onJobStatusUpdate: (jobId: string, status: 'approved' | 'rejected') => void;
}

const sampleUsers: AdminUser[] = [
    { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Job Seeker', joinedDate: '2023-10-15' },
    { id: 'u2', name: 'Bob Williams', email: 'bob@example.com', role: 'Job Seeker', joinedDate: '2023-11-01' },
    { id: 'u3', name: 'Innovate Inc.', email: 'hr@innovate.com', role: 'Employer', joinedDate: '2023-09-20' },
    { id: 'u4', name: 'Tech Solutions LLC', email: 'contact@techllc.com', role: 'Employer', joinedDate: '2023-12-05' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ jobs, onJobStatusUpdate }) => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [similarJobs, setSimilarJobs] = useState<Omit<Job, 'id' | 'status' | 'analysis'>[] | null>(null);
    const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
    const [similarJobsError, setSimilarJobsError] = useState<string | null>(null);

    const pendingJobs = useMemo(() => jobs.filter(job => job.status === 'pending'), [jobs]);

    const handleSelectJob = (job: Job) => {
        setSelectedJob(job);
        setSimilarJobs(null);
        setSimilarJobsError(null);
    }

    const handleFindSimilar = async () => {
        if (!selectedJob) return;
        setIsLoadingSimilar(true);
        setSimilarJobs(null);
        setSimilarJobsError(null);
        try {
            const result = await findSimilarJobs(selectedJob);
            setSimilarJobs(result);
        } catch(err) {
            setSimilarJobsError(err instanceof Error ? err.message : 'Failed to fetch similar jobs');
        } finally {
            setIsLoadingSimilar(false);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-3 rounded-full">
                        <IconLayoutDashboard className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary">Admin Dashboard</CardTitle>
                        <CardDescription className="max-w-3xl text-lg">Platform oversight and management tools.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-12">
                <section>
                    <h3 className="text-2xl font-bold mb-4 text-primary">Platform Analytics</h3>
                    <AnalyticsChart jobs={jobs} users={sampleUsers} />
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-4 text-primary">Pending Job Approvals</h3>
                    {pendingJobs.length === 0 ? (
                        <p className="text-muted-foreground">No jobs are currently pending review.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <ul className="space-y-2">
                                    {pendingJobs.map(job => (
                                        <li key={job.id}>
                                            <button 
                                                onClick={() => handleSelectJob(job)}
                                                className={`w-full text-left p-3 rounded-md border ${selectedJob?.id === job.id ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'bg-white hover:bg-gray-50'}`}
                                            >
                                                <p className="font-semibold">{job.jobTitle}</p>
                                                <p className="text-sm text-muted-foreground">{job.company}</p>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:col-span-2">
                                {selectedJob && selectedJob.status === 'pending' ? (
                                    <Card className="sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col">
                                        <CardHeader>
                                            <CardTitle>{selectedJob.jobTitle}</CardTitle>
                                            <CardDescription>{selectedJob.company} - {selectedJob.location}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 overflow-y-auto">
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedJob.description}</p>
                                            {selectedJob.analysis && (
                                                <div className="bg-slate-50 p-4 rounded-md space-y-2">
                                                    <h4 className="font-semibold">AI Analysis</h4>
                                                    <p className="text-sm"><strong className="text-primary">Category:</strong> {selectedJob.analysis.suggestedCategory}</p>
                                                    <p className="text-sm italic"><strong className="text-primary">Feedback:</strong> {selectedJob.analysis.clarityFeedback}</p>
                                                </div>
                                            )}
                                            <div className="flex gap-4">
                                                <Button onClick={() => onJobStatusUpdate(selectedJob.id, 'approved')} className="bg-green-600 hover:bg-green-700">
                                                    <IconCheckCircle className="mr-2 h-4 w-4" /> Approve
                                                </Button>
                                                <Button onClick={() => onJobStatusUpdate(selectedJob.id, 'rejected')} className="bg-red-600 hover:bg-red-700">
                                                    <IconXCircle className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                                <Button onClick={handleFindSimilar} variant="secondary" disabled={isLoadingSimilar}>
                                                     {isLoadingSimilar ? 'Searching...' : <><IconSearch className="mr-2 h-4 w-4" /> Find Similar</>}
                                                </Button>
                                            </div>
                                            {similarJobsError && <p className="text-sm text-destructive">{similarJobsError}</p>}
                                            {similarJobs && (
                                                <div className="mt-4 space-y-2 animate-fade-in">
                                                    <h4 className="font-semibold">Similar Fictional Jobs (AI Generated)</h4>
                                                    {similarJobs.map((sjob, i) => (
                                                        <div key={i} className="p-2 border rounded-md bg-gray-50">
                                                            <p className="font-bold text-sm">{sjob.jobTitle} <span className="font-normal text-muted-foreground">at {sjob.company}</span></p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-50 rounded-md p-8">
                                        <p className="text-muted-foreground">Select a pending job to review.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                <section>
                    <h3 className="text-2xl font-bold mb-4 text-primary">User Management</h3>
                    <UserTable users={sampleUsers} />
                </section>
            </CardContent>
        </Card>
    )
}

export default AdminDashboard;