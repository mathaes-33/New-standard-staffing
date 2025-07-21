
import React, { useState, useCallback } from 'react';
import Button from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { generateResourceContent } from '../services/geminiService';
import { IconSparkles, Spinner } from './icons';

interface ResourceContentProps {
  title: string;
  description: string;
  audience: 'Job Seeker' | 'Employer';
}

const ResourceContent: React.FC<ResourceContentProps> = ({ title, description, audience }) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedContent = await generateResourceContent(title, audience);
      setContent(generatedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [title, audience]);

  return (
    <Card className="bg-slate-50/50">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {!content && (
          <Button onClick={handleGenerateContent} disabled={isLoading} variant="secondary">
            {isLoading ? (
              <>
                <Spinner className="-ml-1 mr-3 h-5 w-5" />
                Generating...
              </>
            ) : (
              <>
                <IconSparkles className="mr-2 h-4 w-4" /> Get AI Advice
              </>
            )}
          </Button>
        )}
        
        {error && <p className="mt-4 text-sm text-destructive font-medium">{error}</p>}

        {content && (
          <div className="mt-4 text-muted-foreground whitespace-pre-wrap animate-fade-in">
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceContent;