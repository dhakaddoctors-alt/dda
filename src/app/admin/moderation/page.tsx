'use client';

import React from 'react';
import { ShieldCheck, MessageSquare, Flag, Activity, Eye } from 'lucide-react';

export default function ModeratorDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Moderation <span className="text-brand-primary">Hub</span></h1>
        <p className="text-neutral-500 font-medium">Monitor and maintain community standards across the social feed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ModStatCard label="Flagged Posts" value="12" icon={<Flag className="w-6 h-6" />} color="bg-red-500" />
        <ModStatCard label="Pending Comments" value="156" icon={<MessageSquare className="w-6 h-6" />} color="bg-brand-primary" />
        <ModStatCard label="Active Sessions" value="1.2k" icon={<Activity className="w-6 h-6" />} color="bg-green-500" />
      </div>

      <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-white/10">
        <h3 className="text-2xl font-black">Flagged Content Queue</h3>
        <div className="space-y-4">
          <QueueItem author="Unknown User" reason="Spam / Marketing" content="Check out this new crypto scheme..." time="10m ago" />
          <QueueItem author="Guest 882" reason="Inappropriate Language" content="*** comments in the feed" time="1h ago" />
        </div>
      </div>
    </div>
  );
}

function ModStatCard({ label, value, icon, color }: any) {
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

function QueueItem({ author, reason, content, time }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] bg-neutral-50 dark:bg-neutral-800/50 gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">{author}</span>
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-red-500/10 text-red-500 rounded-full">{reason}</span>
        </div>
        <p className="text-sm text-neutral-500 truncate max-w-md italic">"{content}"</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="h-12 px-6 rounded-xl glass font-bold text-sm">Dismiss</button>
        <button className="h-12 px-6 rounded-xl bg-red-500 text-white font-bold text-sm">Delete Post</button>
      </div>
    </div>
  );
}
