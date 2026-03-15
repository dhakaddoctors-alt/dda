'use client';

import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Stethoscope, 
  ChevronRight, 
  ArrowLeft,
  Camera,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-20 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 -left-20 w-72 h-72 bg-brand-primary opacity-10 blur-[100px] rounded-full -z-10" />
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-accent opacity-10 blur-[100px] rounded-full -z-10" />

      <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Complete Your <span className="text-brand-primary">Profile</span></h1>
          <p className="text-neutral-500 font-medium">Step {step} of 4 — Please provide your details for verification.</p>
          
          {/* Progress Bar */}
          <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,112,243,0.5)]" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-premium border-white/20">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3"><User className="text-brand-primary" /> Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OnboardingInput label="Gender" placeholder="Male/Female/Other" />
                <OnboardingInput label="Date of Birth" placeholder="DD/MM/YYYY" type="date" />
                <OnboardingInput label="Marital Status" placeholder="Single/Married" />
                <OnboardingInput label="Blood Group" placeholder="e.g. O+" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3"><MapPin className="text-brand-primary" /> Address Information</h2>
              <div className="space-y-6">
                <OnboardingInput label="Current Address" placeholder="Street, City, State" />
                <OnboardingInput label="Permanent Address" placeholder="Same as current?" />
                <div className="grid grid-cols-2 gap-6">
                  <OnboardingInput label="District" placeholder="e.g. New Delhi" />
                  <OnboardingInput label="Pincode" placeholder="110001" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3"><Stethoscope className="text-brand-primary" /> Professional Details</h2>
              <div className="space-y-6">
                <OnboardingInput label="Primary Qualification" placeholder="e.g. MBBS, MD" />
                <OnboardingInput label="Specialization" placeholder="e.g. Cardiology" />
                <OnboardingInput label="Present Working Place" placeholder="Hospital or Clinic Name" />
                <OnboardingInput label="Years of Experience" placeholder="e.g. 5" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3"><FileText className="text-brand-primary" /> Identity Verification</h2>
              <div className="space-y-8">
                <div className="p-8 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-brand-primary transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Upload Professional ID / Certificate</p>
                    <p className="text-sm text-neutral-400">PDF, PNG or JPG max 10MB</p>
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-yellow-600 text-sm font-medium">
                  Note: Your profile will be reviewed by an Admin after submission. This usually takes 24-48 hours.
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-between">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="h-14 px-8 rounded-2xl font-bold text-neutral-500 hover:text-brand-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
            ) : <div />}
            
            <button 
              onClick={step === 4 ? () => {} : nextStep}
              className="h-14 px-10 rounded-2xl iridescent text-white font-bold shadow-premium hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              {step === 4 ? 'Submit Profile' : 'Continue'} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingInput({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full h-14 px-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:border-brand-primary focus:ring-8 focus:ring-brand-primary/5 transition-all outline-none"
      />
    </div>
  );
}
