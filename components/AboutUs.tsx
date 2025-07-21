
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { IconUsers } from './icons';

const teamMembers = [
  {
    name: 'Kyle Banks',
    title: 'Chief Operating Officer',
    imageUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'With over 15 years in operations, Kyle ensures our processes are as efficient and effective as our AI.',
  },
  {
    name: 'Jenna Matthews',
    title: 'Lead Employment Strategist',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: "Jenna specializes in career development and helps bridge the gap between candidate potential and employer needs.",
  },
  {
    name: 'Samuel Chen',
    title: 'Head of Technology',
    imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Samuel leads our engineering team, driving the innovation that powers our intelligent staffing platform.',
  },
];


const AboutUs = () => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <IconUsers className="mx-auto h-12 w-12 text-primary" />
        <CardTitle className="text-3xl md:text-4xl font-extrabold mt-4">About Our Agency</CardTitle>
        <CardDescription className="max-w-3xl mx-auto text-lg mt-2">
          New Standard Staffing Solutions was founded on the principle that finding the right employment—and the right people—should be simpler, faster, and more human. We leverage cutting-edge AI to connect exceptional professionals with innovative companies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-8">Meet the Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                    <div key={member.name} className="flex flex-col items-center text-center">
                        <img 
                            src={member.imageUrl} 
                            alt={`Portrait of ${member.name}`}
                            className="h-32 w-32 rounded-full object-cover mb-4 shadow-lg" 
                            loading="lazy"
                            decoding="async"
                        />
                        <h4 className="text-xl font-bold text-foreground">{member.name}</h4>
                        <p className="text-primary font-medium">{member.title}</p>
                        <p className="text-muted-foreground mt-2 text-sm max-w-xs">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutUs;
