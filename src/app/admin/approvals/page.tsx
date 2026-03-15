'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  SlidersHorizontal, 
  UserCircle, 
  FileText,
  MapPin,
  Clock
} from 'lucide-react';

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const pendingMembers = [
    { name: "Dr. Sumit Vats", role: "Doctor", loc: "Delhi", time: "2h ago", spec: "Radiology", id: "P-8842" },
    { name: "Neha Sharma", role: "Student", loc: "Lucknow", time: "5h ago", spec: "MBBS 3rd Year", id: "P-8843" },
    { name: "Dr. Vikram Singh", role: "Doctor", loc: "Jaipur", time: "1d ago", spec: "Orthopedics", id: "P-8841" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="space-y-2">
         <h1 className="text-4xl font-extrabold tracking-tight">Pending <span className="text-orange-500">Approvals</span></h1>
         <p className="text-neutral-500 font-medium font-lg">Review and verify new member registrations.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6">
         <div className="relative flex-grow group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-18 pl-16 pr-6 rounded-3xl glass text-xl font-medium outline-none border-white/20 focus:ring-8 focus:ring-brand-primary/5 transition-all shadow-premium"
            />
         </div>
         <button className="h-18 px-8 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center gap-3 font-bold hover:bg-neutral-200 transition-all shadow-premium group">
            <SlidersHorizontal className="w-5 h-5 text-neutral-400 group-hover:text-brand-primary" /> Filters
         </button>
      </div>

      {/* Approvals Table/List */}
      <div className="space-y-6">
         {pendingMembers.map((member, i) => (
           <ApprovalCard key={i} member={member} />
         ))}
      </div>
    </div>
  );
}

function ApprovalCard({ member }: any) {
  return (
    <div className="glass rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-white/20 shadow-premium group">
       <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="w-20 h-20 rounded-[2rem] bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:scale-105 transition-transform">
             <UserCircle className="w-10 h-10" />
          </div>
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <h4 className="text-2xl font-black">{member.name}</h4>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  member.role === 'Doctor' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                }`}>
                  {member.role}
                </span>
             </div>
             <p className="font-bold text-neutral-500">{member.spec}</p>
             <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 pt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {member.loc}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {member.time}</span>
             </div>
          </div>
       </div>

       <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <button className="h-14 px-8 rounded-2xl glass font-bold text-neutral-500 hover:text-brand-primary transition-all flex items-center gap-2">
             <FileText className="w-5 h-5" /> View Docs
          </button>
          <div className="h-10 w-[1px] bg-neutral-100 dark:bg-neutral-800" />
          <button className="h-14 w-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95">
             <XCircle className="w-6 h-6" />
          </button>
          <button className="h-14 px-10 rounded-2xl bg-brand-primary text-white font-bold flex items-center gap-2 shadow-premium hover:shadow-[0_8px_30px_rgb(0,112,243,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
             <CheckCircle2 className="w-6 h-6" /> Approve
          </button>
       </div>
    </div>
  );
}
