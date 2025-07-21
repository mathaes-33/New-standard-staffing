
import React, { useState, useTransition } from 'react';
import type { ContactFormState } from '../types';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Label from './ui/Label';
import Button from './ui/Button';
import { Spinner } from './icons';

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<ContactFormState>({ status: 'idle', message: null });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    startTransition(async () => {
      setFormState({ status: 'loading', message: null });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.name && formData.email && formData.subject && formData.message) {
        setFormState({ status: 'success', message: 'Thank you for your message! We will get back to you shortly.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState({ status: 'error', message: 'Please fill out all fields before submitting.' });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required disabled={isPending} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Your Email</Label>
          <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required disabled={isPending} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="e.g., Question about job openings" value={formData.subject} onChange={handleChange} required disabled={isPending} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" value={formData.message} onChange={handleChange} required disabled={isPending} />
      </div>
      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="-ml-1 mr-3 h-5 w-5" />
              Sending...
            </>
          ) : 'Send Message'}
        </Button>
      </div>
      {formState.message && (
        <div className={`mt-4 text-sm font-medium ${formState.status === 'success' ? 'text-green-600' : 'text-destructive'}`}>
          {formState.message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;