'use client';

import React from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  ChevronRight, 
  BookOpen, 
  Shield, 
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';

export default function ResourceLibraryPage() {
  const categories = ["Medical Guidelines", "Committee Minutes", "Legal Documents", "Member Handbooks", "Research Papers"];
  const [selectedCategory, setSelectedCategory] = React.useState("Medical Guidelines");

  const resources = [
    { title: "National Health Policy 2026", type: "PDF", size: "2.4 MB", date: "Oct 12, 2025", category: "Medical Guidelines" },
    { title: "Committee Meeting October", type: "DOCX", size: "1.1 MB", date: "Oct 05, 2025", category: "Committee Minutes" },
    { title: "Standard Operating Procedures", type: "PDF", size: "4.8 MB", date: "Sep 28, 2025", category: "Legal Documents" },
    { title: "DDA Member Code of Conduct", type: "PDF", size: "1.2 MB", date: "Sep 15, 2025", category: "Member Handbooks" },
    { title: "AI in Primary Care Study", type: "PDF", size: "8.1 MB", date: "Aug 20, 2025", category: "Research Papers" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Resource <span className="text-brand-primary">Library</span></h1>
          <p className="text-neutral-500 font-medium">Access medical guidelines, research, and official documents.</p>
        </div>
        
        <div className="flex items-center gap-3 glass p-2 rounded-2xl shadow-premium">
           <button className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg"><LayoutGrid className="w-5 h-5" /></button>
           <button className="w-10 h-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-400 transition-colors"><List className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
         {categories.map((cat) => (
           <button 
             key={cat}
             onClick={() => setSelectedCategory(cat)}
             className={`h-12 px-6 rounded-2xl font-bold whitespace-nowrap transition-all ${
               selectedCategory === cat 
               ? 'bg-brand-primary text-white shadow-premium scale-105' 
               : 'glass hover:bg-brand-primary/5 hover:text-brand-primary'
             }`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="md:col-span-3 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search documents by name or keyword..."
              className="w-full h-16 pl-14 pr-6 rounded-2xl glass font-medium outline-none border-white/10 focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-premium"
            />
         </div>
         <button className="h-16 rounded-2xl glass font-bold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all shadow-premium">
            <Filter className="w-5 h-5" /> Filter Docs
         </button>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {resources.filter(r => r.category === selectedCategory).map((res, i) => (
           <ResourceCard key={i} resource={res} />
         ))}
         {/* Placeholder for empty state */}
         {resources.filter(r => r.category === selectedCategory).length === 0 && (
           <div className="col-span-3 py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                 <FileText className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold">No documents found</h3>
              <p className="text-neutral-500">Try adjusting your category or search terms.</p>
           </div>
         )}
      </div>

      {/* Admin Information */}
      <div className="glass rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 border-white/10 shadow-premium">
         <div className="w-24 h-24 rounded-[2rem] bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 animate-pulse">
            <Shield className="w-12 h-12" />
         </div>
         <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-black">Official & Secure</h3>
            <p className="text-neutral-500 font-medium leading-relaxed max-w-2xl">
              All documents in this library are verified by the DDA National Board. Access levels are determined by your current role and committee membership.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
               <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                  <Clock className="w-4 h-4" /> Updated Daily
               </span>
               <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
                  <BookOpen className="w-4 h-4" /> 500+ Resources
               </span>
            </div>
         </div>
         <button className="h-16 px-10 rounded-2xl iridescent text-white font-bold ml-auto shadow-premium hover:scale-105 transition-transform">
            Upload Request
         </button>
      </div>
    </div>
  );
}

function ResourceCard({ resource }: { resource: any }) {
  return (
    <div className="glass rounded-[2rem] p-8 space-y-6 border-white/20 shadow-premium group hover:bg-white dark:hover:bg-neutral-800 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex justify-between items-start">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
             <FileText className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900">
             {resource.type}
          </span>
       </div>
       
       <div className="space-y-2">
          <h4 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{resource.title}</h4>
          <p className="text-xs font-bold text-neutral-400 flex items-center gap-2">
             {resource.size} • {resource.date}
          </p>
       </div>

       <button className="w-full h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-3 font-bold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-md">
          <Download className="w-5 h-5" /> Download <ChevronRight className="w-4 h-4" />
       </button>
    </div>
  );
}
