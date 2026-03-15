'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Tag, 
  Share2, 
  Bookmark,
  ChevronRight,
  Newspaper
} from 'lucide-react';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Medical', 'Legal', 'Events', 'Community', 'Notices'];
  
  const newsItems = [
    {
      title: "New Health Regulations for Private Clinics in Delhi",
      excerpt: "The Ministry of Health has released a new set of guidelines focusing on digital records and patient data privacy...",
      category: "Medical",
      time: "2 hours ago",
      image: null,
      urgent: true
    },
    {
      title: "Upcoming DDA National Meet: Agenda Released",
      excerpt: "Join us for the annual gathering of medical professionals to discuss the future of digital health in India...",
      category: "Events",
      time: "5 hours ago",
      image: null
    },
    {
      title: "Legal Updates: GST Implications for Practitioners",
      excerpt: "Expert analysis on the recent changes in tax regulations for healthcare providers and standalone clinics...",
      category: "Legal",
      time: "1 day ago",
      image: null
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">DDA <span className="text-brand-primary">News & Updates</span></h1>
          <p className="text-neutral-500 font-medium text-lg">Stay informed with the latest developments in medicine, law, and our community.</p>
        </div>
        
        {/* Category Pill Filters */}
        <div className="glass p-1.5 rounded-2xl flex items-center gap-1 shadow-premium overflow-x-auto no-scrollbar max-w-full">
           {categories.map((cat) => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`h-11 px-6 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                 activeCategory === cat 
                   ? 'bg-brand-primary text-white shadow-premium' 
                   : 'text-neutral-500 hover:text-brand-primary hover:bg-brand-primary/5'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Featured News / Urgent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News Feed */}
        <div className="lg:col-span-2 space-y-8">
           {newsItems.map((item, i) => (
             <NewsCard key={i} item={item} />
           ))}
        </div>

        {/* Sidebar: Urgent Notices & Popular Tags */}
        <div className="space-y-8">
           <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-brand-primary/10">
              <h3 className="text-xl font-black flex items-center gap-3">
                 <Newspaper className="w-5 h-5 text-brand-primary" /> Urgent Notices
              </h3>
              <div className="space-y-6">
                 <NoticeItem title="Blood Donation Drive at AIIMS" time="Ends in 2 days" />
                 <NoticeItem title="Renew Your Membership by April 1st" time="Important" />
                 <NoticeItem title="DDA App Beta Testers Wanted" time="New" />
              </div>
              <button className="w-full h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 font-bold hover:bg-brand-primary hover:text-white transition-all">
                View All Notices
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: any }) {
  return (
    <div className="glass rounded-[2.5rem] overflow-hidden shadow-premium border-white/20 group hover:scale-[1.01] transition-all duration-500">
       <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="flex-grow space-y-4">
             <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary`}>
                  {item.category}
                </span>
                {item.urgent && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-red-500 text-white animate-pulse">
                    Urgent
                  </span>
                )}
                <span className="text-xs font-bold text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.time}
                </span>
             </div>
             <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight group-hover:text-brand-primary transition-colors leading-tight">
                {item.title}
             </h2>
             <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                {item.excerpt}
             </p>
             <div className="pt-4 flex items-center justify-between">
                <button className="flex items-center gap-2 font-bold text-brand-primary group-hover:gap-3 transition-all">
                  Read Full Story <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                   <button className="h-10 w-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400">
                     <Bookmark className="w-5 h-5" />
                   </button>
                   <button className="h-10 w-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400">
                     <Share2 className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

function NoticeItem({ title, time }: { title: string, time: string }) {
  return (
    <div className="space-y-1 group cursor-pointer">
       <h4 className="font-bold text-sm group-hover:text-brand-primary transition-colors">{title}</h4>
       <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{time}</p>
    </div>
  );
}
