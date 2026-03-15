'use client';

import React from 'react';
import { MapPin, Users, UserPlus, Filter, ChevronRight, LayoutDashboard } from 'lucide-react';

export default function RegionalDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Regional <span className="text-brand-accent">Command</span></h1>
          <p className="text-neutral-500 font-medium">Managing members and committees for <span className="text-brand-primary font-bold">New Delhi District</span>.</p>
        </div>
        <button className="h-14 px-8 rounded-2xl glass font-bold flex items-center gap-3 shadow-premium">
          <Filter className="w-5 h-5" /> Change Region
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RegionStatCard label="District Members" value="1,240" icon={<Users className="w-6 h-6" />} color="bg-brand-primary" />
        <RegionStatCard label="Local Approvals" value="14" icon={<UserPlus className="w-6 h-6" />} color="bg-orange-500" />
        <RegionStatCard label="Registered Pins" value="12" icon={<MapPin className="w-6 h-6" />} color="bg-brand-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-white/10">
          <h3 className="text-2xl font-black">Regional Committees</h3>
          <div className="space-y-4">
            <LocalCommittee title="South Delhi Board" members="12" status="Active" />
            <LocalCommittee title="North Delhi Council" members="8" status="Expanding" />
            <LocalCommittee title="West Delhi Group" members="15" status="Active" />
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-white/10">
          <h3 className="text-2xl font-black">Fast Approvals</h3>
          <p className="text-neutral-400 text-sm">Quickly verify members from your region.</p>
          <div className="space-y-4">
            <QuickMember name="Dr. Sameer Khan" spec="General Physician" />
            <QuickMember name="Arun Singh" spec="Student (VMMC)" />
          </div>
          <button className="w-full h-14 rounded-2xl bg-brand-primary text-white font-bold flex items-center justify-center gap-2">
            View All Pending <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function RegionStatCard({ label, value, icon, color }: any) {
  return (
    <div className="glass p-8 rounded-[2rem] border-white/10 shadow-premium space-y-6">
      <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">{label}</h4>
        <p className="text-3xl font-black">{value}</p>
      </div>
    </div>
  );
}

function LocalCommittee({ title, members, status }: any) {
  return (
    <div className="flex items-center justify-between p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800/50">
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-xs font-bold text-neutral-400">{members} Members</p>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full">{status}</span>
    </div>
  );
}

function QuickMember({ name, spec }: any) {
  return (
    <div className="flex items-center justify-between p-4 border border-neutral-100 dark:border-neutral-800 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
        <div>
          <h5 className="font-bold text-sm">{name}</h5>
          <p className="text-xs text-neutral-400 font-medium">{spec}</p>
        </div>
      </div>
      <button className="text-brand-primary font-bold text-sm">Review</button>
    </div>
  );
}
