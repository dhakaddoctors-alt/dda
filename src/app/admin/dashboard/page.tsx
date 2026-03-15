'use client';

import React from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  FileText, 
  ArrowUpRight, 
  Settings, 
  Bell,
  Activity,
  LayoutDashboard
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Admin <span className="text-brand-primary">Control</span></h1>
          <p className="text-neutral-500 font-medium">Platform overview and user management.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={async () => {
               const res = await fetch('/api/admin/backup', { method: 'POST' });
               if (res.ok) alert('Backup successful!');
             }}
             className="h-14 px-8 rounded-2xl glass font-bold flex items-center gap-3 shadow-premium hover:bg-white dark:hover:bg-neutral-800 transition-all"
           >
             <Activity className="w-5 h-5 text-brand-primary" /> Backup DB
           </button>
           <button className="h-14 px-8 rounded-2xl glass font-bold flex items-center gap-3 shadow-premium hover:bg-white dark:hover:bg-neutral-800 transition-all">
             <Settings className="w-5 h-5" /> Settings
           </button>
        </div>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <AdminStatCard 
          label="Total Members" 
          value="12,842" 
          trend="+12% this month" 
          icon={<Users className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <AdminStatCard 
          label="Pending Approvals" 
          value="48" 
          trend="Needs attention" 
          icon={<UserPlus className="w-6 h-6" />}
          color="bg-orange-500"
          href="/admin/approvals"
        />
        <AdminStatCard 
          label="Verified Doctors" 
          value="8,211" 
          trend="+5.2%" 
          icon={<ShieldCheck className="w-6 h-6" />}
          color="bg-green-500"
        />
        <AdminStatCard 
          label="Activity Index" 
          value="98.2" 
          trend="Stable" 
          icon={<Activity className="w-6 h-6" />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* System Logs */}
         <div className="md:col-span-2 glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-white/10">
            <h3 className="text-2xl font-black flex items-center justify-between">
               Recent Activity
               <button className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1">
                 View All <ArrowUpRight className="w-4 h-4" />
               </button>
            </h3>
            <div className="space-y-4">
               <ActivityItem user="Admin" action="Approved Doctor" target="Dr. Sumit Vats" time="2m ago" />
               <ActivityItem user="System" action="New Signup" target="Amit Sharma (Student)" time="15m ago" />
               <ActivityItem user="Moderator" action="Flagged Post" target="ID: #8842" time="1h ago" />
               <ActivityItem user="Admin" action="Updated Committee" target="National Board" time="3h ago" />
            </div>
         </div>

         {/* Quick Actions */}
         <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-white/10 h-fit">
            <h3 className="text-xl font-bold">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
               <ActionButton icon={<UserPlus className="w-5 h-5" />} label="Review Approvals" href="/admin/approvals" />
               <ActionButton icon={<FileText className="w-5 h-5" />} label="Generate Reports" />
               <ActionButton icon={<Bell className="w-5 h-5" />} label="Broadcast Notice" />
            </div>
         </div>
      </div>
    </div>
  );
}

function AdminStatCard({ label, value, trend, icon, color, href }: any) {
  const Card = href ? 'a' : 'div';
  return (
    <Card href={href} className={`glass p-8 rounded-[2rem] space-y-6 border-white/10 shadow-premium hover:scale-[1.02] transition-all cursor-pointer group`}>
      <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">{label}</h4>
        <p className="text-3xl font-black tracking-tight mt-1">{value}</p>
        <p className={`text-xs font-bold mt-2 ${trend.includes('+') ? 'text-green-500' : 'text-neutral-400'}`}>{trend}</p>
      </div>
    </Card>
  );
}

function ActivityItem({ user, action, target, time }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center font-bold text-xs">
           {user[0]}
         </div>
         <div>
            <p className="font-bold text-sm"><span className="text-neutral-400 font-medium">{user}</span> {action}</p>
            <p className="text-xs font-bold text-brand-primary">{target}</p>
         </div>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{time}</p>
    </div>
  );
}

function ActionButton({ icon, label, href }: any) {
  return (
    <a href={href} className="h-14 w-full rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center px-6 gap-4 font-bold hover:bg-brand-primary hover:text-white transition-all group">
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      {label}
    </a>
  );
}
