'use client';

import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Globe, 
  Building2, 
  ChevronDown, 
  Download, 
  Printer, 
  MoreVertical,
  GripVertical,
  UserCircle
} from 'lucide-react';

export default function CommitteesPage() {
  const [level, setLevel] = useState<'National' | 'State' | 'District'>('National');

  const committees = [
    { title: "National Executive Committee", members: [
      { name: "Dr. Rajesh Kumar", pad: "President", loc: "Delhi" },
      { name: "Amit Sharma", pad: "Secretary", loc: "Mumbai" },
      { name: "Dr. Priya Patel", pad: "Treasurer", loc: "Ahmedabad" },
    ]},
    { title: "National Advisory Board", members: [
      { name: "Suresh Gupta", pad: "Chairman", loc: "Pune" },
      { name: "Anil Mehra", pad: "Member", loc: "Bangalore" },
    ]}
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Committee Management</h1>
          <p className="text-neutral-500 font-medium">Explore and manage the organizational hierarchy of DDA.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="glass p-1.5 rounded-2xl flex items-center gap-1 shadow-premium">
              <LevelButton active={level === 'National'} label="National" onClick={() => setLevel('National')} icon={<Globe className="w-4 h-4" />} />
              <LevelButton active={level === 'State'} label="State" onClick={() => setLevel('State')} icon={<Building2 className="w-4 h-4" />} />
              <LevelButton active={level === 'District'} label="District" onClick={() => setLevel('District')} icon={<MapPin className="w-4 h-4" />} />
           </div>
           
           <button className="h-14 w-14 rounded-2xl glass flex items-center justify-center text-neutral-500 hover:text-brand-primary hover:bg-white dark:hover:bg-neutral-800 transition-all shadow-premium">
              <Download className="w-6 h-6" />
           </button>
        </div>
      </div>

      {/* Committee Sections */}
      <div className="space-y-16">
        {committees.map((comm, idx) => (
          <section key={idx} className="space-y-8">
            <div className="flex items-center gap-4">
               <h2 className="text-2xl font-black">{comm.title}</h2>
               <div className="h-[2px] flex-grow bg-neutral-100 dark:bg-neutral-800 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {comm.members.map((member, i) => (
                 <CommitteeMemberCard key={i} member={member} />
               ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function LevelButton({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`h-11 px-6 rounded-xl flex items-center gap-2 font-bold text-sm transition-all ${
        active 
          ? 'bg-brand-primary text-white shadow-premium' 
          : 'text-neutral-500 hover:text-brand-primary hover:bg-brand-primary/5'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function CommitteeMemberCard({ member }: { member: any }) {
  return (
    <div className="bento-card group flex items-center p-6 gap-6 relative overflow-hidden border-white/5 shadow-premium">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 blur-2xl rounded-full -z-10 group-hover:bg-brand-primary/10 transition-colors" />
      
      <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0 group-hover:scale-105 transition-transform duration-500">
         <UserCircle className="w-10 h-10" />
      </div>

      <div className="flex-grow">
         <h4 className="font-bold text-lg group-hover:text-brand-primary transition-colors">{member.name}</h4>
         <p className="text-sm font-bold text-brand-secondary">{member.pad}</p>
         <p className="text-xs font-bold text-neutral-400 flex items-center gap-1 mt-1">
           <MapPin className="w-3 h-3" /> {member.loc}
         </p>
      </div>

      <div className="flex flex-col gap-2">
         <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-300">
            <GripVertical className="w-5 h-5" />
         </button>
      </div>
    </div>
  );
}
