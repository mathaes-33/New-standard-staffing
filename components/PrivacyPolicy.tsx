
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { IconX } from './icons';
import Button from './ui/Button';

interface ModalProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <Card className="relative max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8" onClick={onClose}>
          <IconX className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
        <CardHeader>
          <CardTitle id="modal-title" className="text-2xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto pr-8 text-sm text-muted-foreground space-y-4">
            <p className="font-semibold text-foreground">Effective Date: July 21, 2025</p>
            <p className="font-semibold text-foreground">Last Updated: July 21, 2025</p>

            <h3 className="font-bold text-foreground pt-2">1. Introduction</h3>
            <p>New Standard Staffing Solutions (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you interact with us, including through our website or employment services.</p>
            <p>As a Canada-based staffing agency, we comply with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial laws governing privacy and personal information.</p>
            
            <h3 className="font-bold text-foreground pt-2">2. Information We Collect</h3>
            <p>We may collect the following personal information from candidates, clients, or website users:</p>
            <p><strong>a. Personal Information You Provide Voluntarily:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Full name and contact information (email address, phone number)</li>
                <li>Resume and work history</li>
                <li>Employment preferences and job application details</li>
                <li>Professional qualifications or certifications</li>
                <li>Reference details and background check authorization</li>
                <li>Communications with our agency</li>
            </ul>
            <p><strong>b. Information Collected Automatically (Website Use):</strong></p>
            <ul className="list-disc pl-6 space-y-1">
                <li>IP address and browser information</li>
                <li>Device type and interaction data</li>
                <li>Cookies and similar technologies (see Section 6)</li>
            </ul>

            <h3 className="font-bold text-foreground pt-2">3. Purpose of Collection</h3>
            <p>We collect personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>To assess candidate suitability for employment opportunities</li>
                <li>To connect job seekers with potential employers</li>
                <li>To communicate regarding job openings, interviews, and placements</li>
                <li>To comply with legal, regulatory, or contractual obligations</li>
                <li>To improve our services, website performance, and user experience</li>
            </ul>
            <p>We only collect, use, or disclose personal information for legitimate business purposes and as permitted or required by law.</p>

            <h3 className="font-bold text-foreground pt-2">4. Consent</h3>
            <p>By submitting your information to New Standard Staffing Solutions, you consent to our collection, use, and disclosure of your personal information as described in this Privacy Policy. You may withdraw your consent at any time, subject to legal or contractual restrictions.</p>

            <h3 className="font-bold text-foreground pt-2">5. Disclosure of Personal Information</h3>
            <p>We may disclose your personal information to the following parties:</p>
             <ul className="list-disc pl-6 space-y-1">
                <li>Employers or hiring partners for job consideration (with your consent)</li>
                <li>Third-party service providers that support our operations (e.g., background checks, cloud services)</li>
                <li>Government authorities or regulators, when legally required</li>
                <li>Any other parties with your explicit consent</li>
            </ul>
            <p>We do not sell your personal information.</p>

            <h3 className="font-bold text-foreground pt-2">6. Cookies and Web Tracking</h3>
            <p>Our website may use cookies to improve performance and analyze usage. These are small files stored on your device to help us understand how visitors interact with our site. You can manage or disable cookies through your browser settings, but doing so may impact your user experience.</p>
            
            <h3 className="font-bold text-foreground pt-2">7. Data Retention</h3>
            <p>We retain personal information only as long as necessary for the purposes for which it was collected, or as required by law. You may request deletion of your data at any time, subject to legal obligations or internal recordkeeping policies.</p>

            <h3 className="font-bold text-foreground pt-2">8. Data Security</h3>
            <p>We take reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, loss, or misuse. While no system can be completely secure, we strive to use best practices in information security.</p>
            
            <h3 className="font-bold text-foreground pt-2">9. Your Rights</h3>
            <p>Under Canadian privacy laws, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal information</li>
                <li>Request corrections to inaccurate or incomplete data</li>
                <li>Withdraw your consent</li>
                <li>Ask for the deletion of your personal information (subject to legal limits)</li>
                <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
            </ul>
            <p>To exercise your rights or ask questions, contact us as shown below.</p>

            <h3 className="font-bold text-foreground pt-2">10. Third-Party Websites</h3>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.</p>

            <h3 className="font-bold text-foreground pt-2">11. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Effective Date.” Your continued use of our website or services constitutes acceptance of the revised policy.</p>

            <h3 className="font-bold text-foreground pt-2">12. Contact Us</h3>
            <p>If you have any questions or requests regarding your privacy or this policy, please contact:</p>
            <p>New Standard Staffing Solutions<br/>
            📞 Phone: 647-450-0225<br/>
            📧 Email: employmentflow.ca@gmail.com</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
