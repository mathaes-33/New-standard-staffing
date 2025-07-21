
import React from 'react';
import { Briefcase, GraduationCap, User, Mail, Phone, Bot, Search, Wind, Sparkles, Building, MapPin, Home, Building2, Lightbulb, Users, MailQuestion, LayoutDashboard, CheckCircle, XCircle, ClipboardList, BookOpen, Menu, X, Check, Clock } from 'lucide-react';

export const IconBriefcase = (props: React.ComponentProps<typeof Briefcase>) => <Briefcase {...props} />;
export const IconGraduationCap = (props: React.ComponentProps<typeof GraduationCap>) => <GraduationCap {...props} />;
export const IconUser = (props: React.ComponentProps<typeof User>) => <User {...props} />;
export const IconMail = (props: React.ComponentProps<typeof Mail>) => <Mail {...props} />;
export const IconPhone = (props: React.ComponentProps<typeof Phone>) => <Phone {...props} />;
export const IconBot = (props: React.ComponentProps<typeof Bot>) => <Bot {...props} />;
export const IconSearch = (props: React.ComponentProps<typeof Search>) => <Search {...props} />;
export const IconWind = (props: React.ComponentProps<typeof Wind>) => <Wind {...props} />;
export const IconSparkles = (props: React.ComponentProps<typeof Sparkles>) => <Sparkles {...props} />;
export const IconBuilding = (props: React.ComponentProps<typeof Building>) => <Building {...props} />;
export const IconMapPin = (props: React.ComponentProps<typeof MapPin>) => <MapPin {...props} />;
export const IconHome = (props: React.ComponentProps<typeof Home>) => <Home {...props} />;
export const IconBuilding2 = (props: React.ComponentProps<typeof Building2>) => <Building2 {...props} />;
export const IconLightbulb = (props: React.ComponentProps<typeof Lightbulb>) => <Lightbulb {...props} />;
export const IconUsers = (props: React.ComponentProps<typeof Users>) => <Users {...props} />;
export const IconMailQuestion = (props: React.ComponentProps<typeof MailQuestion>) => <MailQuestion {...props} />;
export const IconClipboardList = (props: React.ComponentProps<typeof ClipboardList>) => <ClipboardList {...props} />;
export const IconBookOpen = (props: React.ComponentProps<typeof BookOpen>) => <BookOpen {...props} />;
export const IconMenu = (props: React.ComponentProps<typeof Menu>) => <Menu {...props} />;
export const IconX = (props: React.ComponentProps<typeof X>) => <X {...props} />;
export const IconCheck = (props: React.ComponentProps<typeof Check>) => <Check {...props} />;
export const IconClock = (props: React.ComponentProps<typeof Clock>) => <Clock {...props} />;


// Admin Icons
export const IconLayoutDashboard = (props: React.ComponentProps<typeof LayoutDashboard>) => <LayoutDashboard {...props} />;
export const IconCheckCircle = (props: React.ComponentProps<typeof CheckCircle>) => <CheckCircle {...props} />;
export const IconXCircle = (props: React.ComponentProps<typeof XCircle>) => <XCircle {...props} />;

export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={`animate-spin h-5 w-5 ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="status"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};
