'use client';

import React from 'react';
import { Camera, Plus, UserCircle } from 'lucide-react';

export function StoriesBar() {
  const stories = [
    { name: "Dr. Rajesh", avatar: null, seen: false },
    { name: "Amit Sharma", avatar: null, seen: true },
    { name: "Dr. Priya", avatar: null, seen: false },
    { name: "Suresh Gupta", avatar: null, seen: false },
    { name: "Me", avatar: null, seen: true, isMe: true },
  ];

  return (
    <div className="w-full flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar animate-in fade-in slide-in-from-right-4 duration-1000">
      {/* Add Story Button */}
      <button className="flex flex-col items-center gap-2 group shrink-0">
        <div className="w-20 h-20 rounded-[2rem] bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:border-brand-primary group-hover:text-brand-primary transition-all">
          <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xs font-bold text-neutral-500">Add Story</span>
      </button>

      {/* Story Items */}
      {stories.map((story, i) => (
        <button key={i} className="flex flex-col items-center gap-2 group shrink-0">
          <div className={`w-20 h-20 rounded-[2rem] p-1 ${
            story.seen 
              ? 'bg-neutral-200 dark:bg-neutral-800' 
              : 'iridescent shadow-premium'
          }`}>
            <div className="w-full h-full rounded-[1.8rem] bg-white dark:bg-neutral-900 border-2 border-white dark:border-neutral-900 flex items-center justify-center overflow-hidden">
              <UserCircle className="w-12 h-12 text-neutral-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          <span className={`text-xs font-bold ${story.seen ? 'text-neutral-400' : 'text-neutral-700 dark:text-neutral-300'}`}>
            {story.isMe ? 'My Story' : story.name}
          </span>
        </button>
      ))}
    </div>
  );
}
