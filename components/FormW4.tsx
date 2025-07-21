
import React from 'react';
import type { ParsedResume } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import Input from './ui/Input';
import Label from './ui/Label';

interface FormW4Props {
  profile: ParsedResume;
}

const FormW4: React.FC<FormW4Props> = ({ profile }) => {
    const nameParts = profile.fullName.split(' ');
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ') ?? '';

    // Simple address parsing. Assumes "Street, City, State ZIP"
    const addressParts = profile.address?.split(',') || [];
    const streetAddress = addressParts[0]?.trim() || '';
    const cityStateZip = addressParts.slice(1).join(',').trim() || '';

    return (
        <div className="animate-fade-in">
            <Card className="bg-slate-50">
                <CardHeader>
                    <CardTitle>Employee's Withholding Certificate (Form W-4)</CardTitle>
                    <CardDescription>
                        Your information has been pre-filled from your profile. Please review and complete the form.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <fieldset className="p-4 border rounded-md space-y-4">
                        <legend className="px-2 font-semibold text-lg mb-2">Step 1: Personal Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="first-name">First name and middle initial</Label>
                                <Input id="first-name" defaultValue={firstName} />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" defaultValue={lastName} />
                            </div>
                            <div className="space-y-1.5 col-span-full">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" defaultValue={streetAddress} />
                            </div>
                            <div className="space-y-1.5 col-span-full">
                                <Label htmlFor="city-state-zip">City, state, and ZIP code</Label>
                                <Input id="city-state-zip" defaultValue={cityStateZip} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="p-4 border rounded-md space-y-4">
                        <legend className="px-2 font-semibold text-lg mb-2">Step 5: Sign Here</legend>
                        <div className="space-y-1.5">
                            <Label htmlFor="signature">Employee signature (this is not a real signature field)</Label>
                            <Input id="signature" readOnly value={`e-Signed by ${profile.fullName}`} className="bg-gray-200 cursor-not-allowed" />
                        </div>
                    </fieldset>

                    <p className="text-xs text-muted-foreground pt-4 text-center">
                        <strong>Disclaimer:</strong> This is a simplified demonstration for illustrative purposes only and is not a legally valid W-4 form.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default FormW4;
