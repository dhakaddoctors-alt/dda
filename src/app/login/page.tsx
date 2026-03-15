'use client';

import React, { useState } from 'react';
import { LogIn, Mail, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="fixed top-0 -left-20 w-72 h-72 bg-brand-primary opacity-20 blur-[100px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-0 -right-20 w-96 h-96 bg-brand-accent opacity-20 blur-[100px] rounded-full -z-10 animate-pulse" />

      <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl iridescent shadow-premium mb-4">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-neutral-500 font-medium text-lg">
            Sign in to access your DDA account.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-8 md:p-10 shadow-premium border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl text-center font-medium animate-in shake-in">
                {error}
              </div>
            )}

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

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
                <a href="/forgot-password" className="text-xs font-bold text-brand-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:border-brand-primary focus:ring-8 focus:ring-brand-primary/5 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded-md border-neutral-300 text-brand-primary focus:ring-brand-primary transition-all cursor-pointer"
                />
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 group-hover:text-brand-primary transition-colors">Remember Me</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-15 iridescent text-white font-bold rounded-2xl shadow-premium hover:shadow-[0_8px_30px_rgb(0,112,243,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg"
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ChevronRight className="h-6 w-6" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <p className="text-neutral-500 font-medium">
              Don't have an account? <a href="/signup" className="text-brand-primary font-bold hover:underline">Create Account</a>
            </p>
          </div>
        </div>
        
        {/* Help Link */}
        <div className="text-center">
          <button className="text-sm text-neutral-400 font-medium hover:text-neutral-600 transition-colors flex items-center justify-center gap-2 mx-auto">
            <Info className="h-4 w-4" /> Need help signing in?
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}
