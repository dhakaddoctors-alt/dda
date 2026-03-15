'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, SlidersHorizontal, ChevronDown, UserCircle } from 'lucide-react';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for initial UI implementation
  const members = [
    { name: "Dr. Rajesh Kumar", role: "Doctor", loc: "Delhi", spec: "Cardiology", avatar: null },
    { name: "Amit Sharma", role: "Student", loc: "Mumbai", spec: "MBBS Final Year", avatar: null },
    { name: "Dr. Priya Patel", role: "Doctor", loc: "Ahmedabad", spec: "Pediatrics", avatar: null },
    { name: "Suresh Gupta", role: "Guest", loc: "Pune", spec: "Business", avatar: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8 pb-12">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-visible">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Member Directory</h1>
          <p className="text-neutral-500 font-medium">Search and filter community members by name, role, or location.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-2 font-bold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
        <input 
          type="text"
          placeholder="Search by name, district, or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-18 pl-16 pr-6 rounded-3xl glass text-xl font-medium outline-none border-white/20 focus:ring-8 focus:ring-brand-primary/5 transition-all shadow-premium"
        />
      </div>

      {/* Member Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: any }) {
  return (
    <div className="bento-card group flex flex-col p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
          <UserCircle className="w-8 h-8" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
          member.role === 'Doctor' ? 'bg-blue-500/10 text-blue-500' : 
          member.role === 'Student' ? 'bg-green-500/10 text-green-500' : 
          'bg-orange-500/10 text-orange-500'
        }`}>
          {member.role}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-bold group-hover:text-brand-primary transition-colors">{member.name}</h3>
        <p className="text-sm text-neutral-500 font-medium">{member.spec}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-neutral-400 font-bold">
        <MapPin className="w-4 h-4" /> {member.loc}
      </div>

      <div className="pt-2">
        <button className="w-full h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 font-bold hover:bg-brand-primary hover:text-white hover:shadow-premium transition-all">
          View Profile
        </button>
      </div>
    </div>
  );
}
