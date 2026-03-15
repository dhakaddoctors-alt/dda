'use client';

import React from 'react';
import { Bell, Shield, Smartphone, Mail, Settings, ChevronRight, Info } from 'lucide-react';

export default function NotificationsPage() {
  const [enabled, setEnabled] = React.useState(true);
  
  const notificationGroups = [
    {
      title: "Community Alerts",
      description: "Stay updated with what's happening in your committees and districts.",
      items: [
        { id: 'comm_posts', label: "New Committee Posts", default: true },
        { id: 'urgent_notices', label: "Urgent Board Notices", default: true },
        { id: 'event_reminders', label: "Event Reminders", default: true },
      ]
    },
    {
      title: "Social Activity",
      description: "Engagement on your posts and profile.",
      items: [
        { id: 'likes', label: "Likes & Reactions", default: true },
        { id: 'comments', label: "New Comments", default: true },
        { id: 'mentions', label: "Mentions in Feed", default: false },
      ]
    },
    {
      title: "Administrative",
      description: "Critical account and security updates.",
      items: [
        { id: 'security', label: "Security & Login Alerts", default: true },
        { id: 'approval', label: "Membership Status Updates", default: true },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Notification <span className="text-brand-primary">Settings</span></h1>
        <p className="text-neutral-500 font-medium">Control how and when you receive updates from the DDA Portal.</p>
      </div>

      {/* Primary Toggle Card */}
      <div className="glass rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10 border-white/10 shadow-premium">
         <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center transition-colors ${enabled ? 'bg-brand-primary text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
               <Bell className="w-10 h-10" />
            </div>
            <div>
               <h3 className="text-2xl font-black">Push Notifications</h3>
               <p className="text-neutral-500 font-medium">Get instant alerts on your mobile or desktop.</p>
            </div>
         </div>
         <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={enabled} 
              onChange={() => setEnabled(!enabled)} 
              className="sr-only peer" 
            />
            <div className="w-20 h-10 bg-neutral-200 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-8 after:w-9 after:transition-all peer-checked:bg-brand-primary"></div>
         </label>
      </div>

      {/* Detailed Groups */}
      <div className="space-y-8">
         {notificationGroups.map((group, idx) => (
           <div key={idx} className="space-y-6">
              <div className="px-2">
                 <h4 className="text-xl font-black">{group.title}</h4>
                 <p className="text-sm text-neutral-500 font-medium">{group.description}</p>
              </div>
              <div className="glass rounded-[2rem] overflow-hidden border-white/5 shadow-premium">
                 {group.items.map((item, i) => (
                    <div key={item.id} className={`flex items-center justify-between p-8 ${i !== group.items.length - 1 ? 'border-b border-white/5' : ''}`}>
                       <span className="font-bold text-lg">{item.label}</span>
                       <div className="flex items-center gap-6">
                          <label className="relative inline-flex items-center cursor-pointer opacity-80 hover:opacity-100">
                             <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                             <div className="w-14 h-7 bg-neutral-100 dark:bg-neutral-900 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-brand-primary"></div>
                          </label>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
         ))}
      </div>

      {/* Channels Section */}
      <div className="space-y-6">
         <h4 className="text-xl font-black px-2">Delivery Channels</h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChannelCard icon={<Smartphone className="w-6 h-6" />} title="In-App Messaging" status="Enabled" />
            <ChannelCard icon={<Mail className="w-6 h-6" />} title="Email Summary" status="Daily" />
         </div>
      </div>

      {/* Info Alert */}
      <div className="flex gap-4 p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20 text-blue-500">
         <Info className="w-6 h-6 shrink-0" />
         <p className="text-sm font-bold leading-relaxed">
            Real-time push notifications require PWA support. Ensure you have "Added to Home Screen" on your mobile device to receive background alerts.
         </p>
      </div>
    </div>
  );
}

function ChannelCard({ icon, title, status }: { icon: React.ReactNode, title: string, status: string }) {
  return (
    <div className="glass rounded-3xl p-6 flex items-center justify-between shadow-premium border-white/5 group hover:border-brand-primary/20 transition-all">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors">
             {icon}
          </div>
          <span className="font-bold">{title}</span>
       </div>
       <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">{status}</span>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
       </div>
    </div>
  );
}
