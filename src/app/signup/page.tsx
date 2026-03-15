'use client';

import React, { useState } from 'react';
import { User, Stethoscope, GraduationCap, ChevronRight, ArrowLeft, Upload, CheckCircle2, MapPin, Heart, Info } from 'lucide-react';

type Role = 'Guest' | 'Doctor' | 'Student';

export default function SignupPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalSteps = 4; // Role -> Basics -> Details -> Role-Specific

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const renderRoleSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <RoleCard 
        icon={<User className="w-8 h-8" />}
        title="Guest"
        description="For community members and supporters."
        onClick={() => { setRole('Guest'); nextStep(); }}
      />
      <RoleCard 
        icon={<Stethoscope className="w-8 h-8" />}
        title="Doctor"
        description="For medical professionals and practitioners."
        onClick={() => { setRole('Doctor'); nextStep(); }}
      />
      <RoleCard 
        icon={<GraduationCap className="w-8 h-8" />}
        title="Student"
        description="For medical students and interns."
        onClick={() => { setRole('Student'); nextStep(); }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center py-12 px-6 sm:px-12">
      <div className="fixed top-0 -left-20 w-72 h-72 bg-brand-primary opacity-20 blur-[100px] rounded-full -z-10" />
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-accent opacity-20 blur-[100px] rounded-full -z-10" />

      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            DDA Portal Registration
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
             {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-brand-primary shadow-[0_0_10px_rgba(0,112,243,0.5)]' : 'w-4 bg-neutral-200 dark:bg-neutral-800'}`} />
             ))}
          </div>
        </div>

        {step === 1 ? (
          renderRoleSelection()
        ) : (
          <div className="glass rounded-3xl p-8 md:p-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-8">
               <button onClick={prevStep} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-primary transition-colors">
                 <ArrowLeft className="w-4 h-4" /> Back
               </button>
               <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                 Step {step} of {totalSteps}: {role}
               </span>
            </div>

            <form className="space-y-8">
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" placeholder="Pura Naam" />
                  <InputField label="Email ID" type="email" placeholder="email@example.com" />
                  <InputField label="Mobile Number" placeholder="+91 00000 00000" />
                  <InputField label="Password" type="password" placeholder="••••••••" />
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField label="Gender" options={['Male', 'Female', 'Other']} />
                  <SelectField label="Marital Status" options={['Single', 'Married', 'Widowed', 'Divorced']} />
                  <InputField label="DOB" type="date" placeholder="DD/MM/YYYY" />
                  <InputField label="Blood Group (Optional)" placeholder="e.g., O+" />
                  <InputField label="District" placeholder="Zila" />
                  <InputField label="State" placeholder="Rajya" />
                  <InputField label="Pincode" placeholder="Pin Code" />
                  <InputField label="Full Address" placeholder="Makan No, Colony, City" className="md:col-span-2" />
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {role === 'Guest' && (
                    <InputField label="Occupation" placeholder="Kaam / Vyavsay" className="md:col-span-2" />
                  )}

                  {role === 'Doctor' && (
                    <>
                      <InputField label="Degree" placeholder="e.g., MBBS, MD" />
                      <InputField label="Specialization" placeholder="Visheshagyata" />
                      <InputField label="Hospital Name" placeholder="Hospital ka Naam" />
                      <InputField label="Working Place" placeholder="Abhi kahan kaam kar rahe hain" />
                      <InputField label="Medical Reg No." placeholder="Registration Number" />
                      <InputField label="Experience" placeholder="Anubhav (Years)" />
                    </>
                  )}

                  {role === 'Student' && (
                    <>
                      <InputField label="College" placeholder="College ka Naam" />
                      <InputField label="University" placeholder="University ka Naam" />
                      <InputField label="Course" placeholder="e.g., MBBS" />
                      <InputField label="Year" placeholder="Final Year / 1st Year" />
                      <InputField label="Entry Year" placeholder="Admission ka Saal" />
                      <InputField label="Father's Gotra" placeholder="Pita ka Gotra" />
                      <InputField label="Mother's Gotra" placeholder="Mata ka Gotra" />
                      <InputField label="Grandmother's Gotra" placeholder="Dadi ka Gotra" />
                    </>
                  )}

                  <div className="md:col-span-2 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-brand-primary transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold">Upload ID Proof</p>
                        <p className="text-sm text-neutral-500">JPG, PNG or PDF (Max 5MB)</p>
                      </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                {step < totalSteps ? (
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="w-full h-14 iridescent text-white font-bold rounded-2xl shadow-premium hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="w-full h-14 bg-brand-primary text-white font-bold rounded-2xl shadow-premium hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    Complete Registration <CheckCircle2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
        
        <p className="text-center text-sm text-neutral-500">
           Already have an account? <a href="/login" className="text-brand-primary font-bold hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}

// Sub-components as before but refined ...
function RoleCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bento-card group text-left hover:border-brand-primary/50 relative overflow-hidden h-full flex flex-col"
    >
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(0,112,243,0.3)] transition-all duration-500 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{title}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed flex-grow">{description}</p>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
}

function InputField({ label, placeholder, type = 'text', className = "" }: { label: string, placeholder: string, type?: string, className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full h-13 px-4 rounded-xl bg-neutral-50/50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none placeholder:text-neutral-400"
      />
    </div>
  );
}

function SelectField({ label, options, className = "" }: { label: string, options: string[], className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">{label}</label>
      <select 
        className="w-full h-13 px-4 rounded-xl bg-neutral-50/50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none appearance-none"
      >
        <option disabled selected>Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
