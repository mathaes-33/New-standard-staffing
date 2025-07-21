
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { IconChevronDown } from './icons';

interface ResourceContentProps {
  title: string;
  content: string[];
}

const ResourceContent: React.FC<ResourceContentProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-slate-50/50 overflow-hidden">
      <CardHeader className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full p-6 text-left"
          aria-expanded={isOpen}
          aria-controls={`resource-content-${title.replace(/\s+/g, '-')}`}
        >
          <CardTitle className="text-lg">{title}</CardTitle>
          <IconChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </CardHeader>
      {isOpen && (
        <CardContent
          id={`resource-content-${title.replace(/\s+/g, '-')}`}
          className="p-6 pt-0 animate-accordion-down"
        >
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
};

export default ResourceContent;
