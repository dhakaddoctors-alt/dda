'use client';

import React from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  ChevronRight, 
  Filter,
  Ticket,
  Video
} from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      title: "2026 National Medical Summit",
      date: "MAR 22",
      time: "10:00 AM - 04:00 PM",
      loc: "Vigyan Bhawan, Delhi",
      type: "In-Person",
      price: "Free for Members",
      image: null
    },
    {
      title: "Digital Health & AI Webinar",
      date: "APR 05",
      time: "06:00 PM - 08:00 PM",
      loc: "Online (Zoom)",
      type: "Virtual",
      price: "Registration Required",
      image: null
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Upcoming <span className="text-brand-secondary">Events</span></h1>
          <p className="text-neutral-500 font-medium text-lg">Join webinars, conferences, and community gatherings.</p>
        </div>
        
        <button className="h-14 px-8 rounded-2xl glass font-bold flex items-center gap-3 shadow-premium hover:bg-white dark:hover:bg-neutral-800 transition-all">
          <Filter className="w-5 h-5" /> All Formats
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <div className="glass rounded-[2.5rem] overflow-hidden border-white/20 shadow-premium group hover:scale-[1.01] transition-all duration-500 cursor-pointer">
       <div className="p-8 md:p-10 flex gap-8">
          <div className="shrink-0 space-y-1 text-center bg-brand-primary/10 rounded-2xl p-4 h-fit border border-brand-primary/10">
             <p className="text-xs font-black uppercase tracking-widest text-brand-primary">{event.date.split(' ')[0]}</p>
             <p className="text-3xl font-black text-brand-primary">{event.date.split(' ')[1]}</p>
          </div>

          <div className="flex-grow space-y-4">
             <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 ${
                  event.type === 'Virtual' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {event.type === 'Virtual' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                  {event.type}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                  {event.price}
                </span>
             </div>

             <h2 className="text-2xl font-extrabold tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
                {event.title}
             </h2>

             <div className="space-y-2">
                <p className="text-sm font-bold text-neutral-500 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-primary" /> {event.time}
                </p>
                <p className="text-sm font-bold text-neutral-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-primary" /> {event.loc}
                </p>
             </div>

             <div className="pt-4">
                <button className="w-full h-14 rounded-2xl iridescent text-white font-bold shadow-premium flex items-center justify-center gap-2 hover:gap-3 transition-all">
                   Book Now <Ticket className="w-5 h-5" />
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}
