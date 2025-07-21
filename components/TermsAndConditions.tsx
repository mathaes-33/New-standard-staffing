
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { IconX } from './icons';
import Button from './ui/Button';

interface ModalProps {
  onClose: () => void;
}

const TermsAndConditions: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Card className="relative max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8" onClick={onClose}>
          <IconX className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        <CardHeader>
          <CardTitle id="modal-title" className="text-2xl">Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto pr-8 text-sm text-muted-foreground space-y-4">
            <p className="font-semibold text-foreground">Effective Date: July 21, 2025</p>
            <p className="font-semibold text-foreground">Last Updated: July 21, 2025</p>

            <p>Welcome to New Standard Staffing Solutions (“we,” “our,” or “us”). By accessing or using our website and services, you agree to be bound by the following Terms and Conditions. Please read them carefully. If you do not agree with these terms, you must not use our website or services.</p>

            <h3 className="font-bold text-foreground pt-2">1. Use of Website and Services</h3>
            <p>You agree to use our website and services only for lawful purposes and in accordance with these Terms. You must not:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Submit false or misleading information</li>
                <li>Transmit malicious software or disrupt the website's functionality</li>
                <li>Infringe upon the intellectual property rights of New Standard Staffing Solutions or third parties</li>
                <li>Attempt to access restricted areas of the site or interfere with our systems</li>
            </ul>

            <h3 className="font-bold text-foreground pt-2">2. Eligibility</h3>
            <p>To register or apply for job opportunities through our site, you must:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Be at least 18 years old (or the age of majority in your province/territory)</li>
                <li>Provide accurate, current, and complete information</li>
                <li>Have legal authorization to work in Canada (unless stated otherwise)</li>
            </ul>
            <p>We reserve the right to reject or remove access if eligibility requirements are not met.</p>

            <h3 className="font-bold text-foreground pt-2">3. Employment Services Disclaimer</h3>
            <p>New Standard Staffing Solutions acts as a facilitator between candidates and employers. We do not guarantee job placement, interviews, or hiring outcomes. Final employment decisions are made solely by the hiring companies.</p>

            <h3 className="font-bold text-foreground pt-2">4. Intellectual Property</h3>
            <p>All content on our website—including text, logos, graphics, and software—is the property of New Standard Staffing Solutions or its licensors and is protected by copyright and trademark laws. You may not copy, reproduce, or distribute any part of the website without written permission.</p>

            <h3 className="font-bold text-foreground pt-2">5. User-Submitted Content</h3>
            <p>Any resumes, cover letters, forms, or other materials submitted to us remain your property, but by submitting them, you grant us a limited license to use, reproduce, and share them with potential employers or service providers to fulfill the purpose of your submission.</p>
            <p>You agree that your content does not contain defamatory, unlawful, or infringing material.</p>

            <h3 className="font-bold text-foreground pt-2">6. Third-Party Links</h3>
            <p>Our website may contain links to third-party sites. We do not endorse, control, or take responsibility for third-party content or practices. Use those sites at your own risk.</p>

            <h3 className="font-bold text-foreground pt-2">7. Limitation of Liability</h3>
            <p>To the fullest extent permitted by law, New Standard Staffing Solutions is not liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of data, opportunity, or employment resulting from your use of our site or services</li>
                <li>Errors or inaccuracies in job listings or information submitted by third parties</li>
            </ul>
            <p>Our services are provided “as-is” without warranties or guarantees.</p>

            <h3 className="font-bold text-foreground pt-2">8. Indemnification</h3>
            <p>You agree to indemnify and hold harmless New Standard Staffing Solutions, its employees, and agents from any claims, losses, liabilities, or expenses arising from:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Your misuse of our website or services</li>
                <li>Your breach of these Terms</li>
                <li>Your violation of any law or third-party rights</li>
            </ul>

            <h3 className="font-bold text-foreground pt-2">9. Changes to These Terms</h3>
            <p>We reserve the right to update or modify these Terms at any time. Changes will be posted on this page with a revised “Effective Date.” Continued use of our website or services after changes are made constitutes acceptance of those changes.</p>
            
            <h3 className="font-bold text-foreground pt-2">10. Governing Law</h3>
            <p>These Terms and any disputes related to them shall be governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. You agree to submit to the exclusive jurisdiction of the courts in that province.</p>

            <h3 className="font-bold text-foreground pt-2">11. Contact Us</h3>
            <p>If you have any questions about these Terms, please contact:</p>
            <p>New Standard Staffing Solutions<br/>
            📞 Phone: 647-450-0225<br/>
            📧 Email: employmentflow.ca@gmail.com</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndConditions;