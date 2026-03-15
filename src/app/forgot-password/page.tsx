'use client';

import React, { useState } from 'react';
import { Mail, ChevronRight, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <div className="fixed top-0 -left-20 w-72 h-72 bg-brand-primary opacity-20 blur-[100px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-accent opacity-20 blur-[100px] rounded-full -z-10 animate-pulse" />

      <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl iridescent shadow-premium mb-4">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            {submitted ? 'Check Your Email' : 'Forgot Password?'}
          </h1>
          <p className="text-neutral-500 font-medium text-lg">
            {submitted 
              ? 'We have sent a reset link to your email address.' 
              : 'Enter your email and we\'ll send you a link to reset your password.'}
          </p>
        </div>

        <div className="glass rounded-[2rem] p-8 md:p-10 shadow-premium border-white/20">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:border-brand-primary focus:ring-8 focus:ring-brand-primary/5 transition-all outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-15 iridescent text-white font-bold rounded-2xl shadow-premium hover:shadow-[0_8px_30px_rgb(0,112,243,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send Reset Link <Send className="h-5 w-5" /></>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                If an account exists for <span className="text-brand-primary font-bold">{email}</span>, you will receive a password reset link shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-brand-primary font-bold hover:underline"
              >
                Didn't get the email? Try again
              </button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <a href="/login" className="flex items-center justify-center gap-2 text-neutral-500 font-bold hover:text-brand-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
