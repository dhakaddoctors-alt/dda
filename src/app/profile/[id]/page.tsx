'use client';

import React from 'react';
import { 
  UserCircle, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Heart, 
  Share2, 
  MessageCircle, 
  Award,
  BookOpen,
  Building2,
  Stethoscope
} from 'lucide-react';

export default function PublicProfilePage({ params }: { params: { id: string } }) {
  // Mock data for the profile
  const member = {
    name: "Dr. Rajesh Kumar",
    role: "Doctor",
    spec: "Cardiology",
    loc: "New Delhi",
    bio: "Consultant Cardiologist with over 12 years of experience. Dedicated to community health and medical education.",
    experience: "12+ Years",
    hospital: "City Medical Center",
    education: "MBBS, MD (Cardiology)",
    joined: "2023",
    stats: {
      views: "1.2k",
      posts: "45",
      likes: "320"
    },
    gotras: {
      father: "Sandilya",
      mother: "Vatsa",
      grandma: "Kashyap"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Profile Header Block */}
      <section className="glass rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-10 border-white/20 shadow-premium relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border-4 border-white dark:border-neutral-800 overflow-hidden shadow-premium flex items-center justify-center relative group">
          <UserCircle className="w-24 h-24 md:w-32 md:h-32 text-neutral-400 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex-grow space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <h1 className="text-4xl md:text-6xl font-black tracking-tight">{member.name}</h1>
               <span className="bg-brand-primary text-white text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-premium">
                 {member.role}
               </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-neutral-500 font-bold">
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-primary" /> {member.loc}</span>
              <span className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-brand-primary" /> {member.spec}</span>
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-brand-primary" /> Member since {member.joined}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-4">
             <button className="h-14 px-8 rounded-2xl iridescent text-white font-bold shadow-premium hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3">
                <MessageCircle className="w-5 h-5" /> Message
             </button>
             <button className="h-14 w-14 rounded-2xl glass flex items-center justify-center shadow-premium hover:bg-white dark:hover:bg-neutral-800 transition-all">
                <Share2 className="w-5 h-5" />
             </button>
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About & Bio */}
        <div className="md:col-span-2 space-y-8">
           <div className="bento-card bg-white dark:bg-neutral-900/50 p-10 space-y-6 border-white/10">
              <h3 className="text-2xl font-black flex items-center gap-3">
                 <BookOpen className="w-6 h-6 text-brand-primary" /> About
              </h3>
              <p className="text-neutral-500 text-lg leading-relaxed font-medium">
                {member.bio}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoCard icon={<Stethoscope />} label="Specialization" value={member.spec} />
              <InfoCard icon={<Building2 />} label="Affiliation" value={member.hospital} />
              <InfoCard icon={<GraduationCap />} label="Education" value={member.education} />
              <InfoCard icon={<Award />} label="Experience" value={member.experience} />
           </div>
        </div>

        {/* Sidebar Blocks */}
        <div className="space-y-8">
           {/* Stats Block */}
           <div className="bento-card iridescent p-1 h-fit rounded-[2rem]">
              <div className="bg-white dark:bg-neutral-900 rounded-[1.9rem] p-8 flex justify-around">
                 <StatItem value={member.stats.views} label="Views" />
                 <StatItem value={member.stats.posts} label="Posts" />
                 <StatItem value={member.stats.likes} label="Likes" />
              </div>
           </div>

           {/* Genealogy / Community Block */}
           <div className="bento-card border-brand-primary/20 p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                 <Users className="w-5 h-5 text-brand-primary" /> Genealogy
              </h3>
              <div className="space-y-4">
                 <GotraBadge label="Pita's Gotra" value={member.gotras.father} />
                 <GotraBadge label="Mata's Gotra" value={member.gotras.mother} />
                 <GotraBadge label="Dadi's Gotra" value={member.gotras.grandma} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass p-8 rounded-[2rem] space-y-4 border-white/5 hover:border-brand-primary/20 transition-colors group">
      <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-neutral-400">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center space-y-1">
      <div className="text-2xl font-black tracking-tight">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</div>
    </div>
  );
}

function GotraBadge({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
      <span className="text-xs font-bold text-neutral-500">{label}</span>
      <span className="font-bold text-brand-primary">{value}</span>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M15.31 7a4 4 0 1 1 3.58 3" override="true" />
    </svg>
  );
}
