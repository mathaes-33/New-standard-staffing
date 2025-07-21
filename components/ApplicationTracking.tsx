import React from 'react';
import type { Application } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconClipboardList, IconCheck, IconMail, IconPhone, IconBuilding, IconMapPin, IconX, IconSparkles } from './icons';

interface ApplicationTrackingProps {
  applications: Application[];
}

const statusConfig: { [key in Application['status']]: { icon: React.FC<any>, color: string, ring: string } } = {
    'Applied': {
        icon: IconMail,
        color: 'bg-blue-500',
        ring: 'ring-blue-500/20',
    },
    'Under Review': {
        icon: IconSparkles,
        color: 'bg-yellow-500',
        ring: 'ring-yellow-500/20',
    },
    'Interview': {
        icon: IconPhone,
        color: 'bg-purple-500',
        ring: 'ring-purple-500/20',
    },
    'Offer Extended': {
        icon: IconCheck,
        color: 'bg-green-500',
        ring: 'ring-green-500/20',
    },
    'Closed': {
        icon: IconX,
        color: 'bg-slate-500',
        ring: 'ring-slate-500/20',
    },
};


const TimelineNode: React.FC<{ app: Application, isLast: boolean }> = ({ app, isLast }) => {
    const config = statusConfig[app.status];
    return (
        <div className="relative flex items-start">
            {!isLast && <div className="absolute left-6 top-14 h-[calc(100%_-_2rem)] w-0.5 bg-border -translate-x-1/2"></div>}
            <div className="flex-shrink-0 flex flex-col items-center mr-4 z-10">
                <div className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center ring-8 ${config.ring} ring-offset-card ring-offset-4`}>
                    <config.icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <div className="flex-grow pt-2">
                 <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-lg text-foreground">{app.job.jobTitle}</h4>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.color} bg-opacity-10 ${config.color.replace('bg-', 'text-')}`}>
                        {app.status}
                    </span>
                 </div>
                <div className="text-sm text-muted-foreground flex items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1.5"><IconBuilding className="h-4 w-4" /> {app.job.company}</span>
                    <span className="flex items-center gap-1.5"><IconMapPin className="h-4 w-4" /> {app.job.location || 'N/A'}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Applied on: {app.appliedDate}</p>
            </div>
        </div>
    )
};

const ApplicationTracking: React.FC<ApplicationTrackingProps> = ({ applications }) => {
  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-full">
            <IconClipboardList className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-primary">My Application Pipeline</CardTitle>
            <CardDescription className="text-muted-foreground">A real-time overview of your job application progress.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {applications.length === 0 ? (
          <div className="text-center py-12 bg-secondary rounded-lg">
            <IconClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No applications yet</h3>
            <p className="mt-1 text-sm text-gray-500">Find matching jobs above to get started!</p>
          </div>
        ) : (
          <div className="space-y-10 animate-fade-in-up">
            {applications.map((app, index) => (
              <TimelineNode key={app.job.id} app={app} isLast={index === applications.length - 1} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationTracking;