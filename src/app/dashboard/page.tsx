'use client';

import React from 'react';
import { Search, Filter, MapPin, UserCheck, Heart, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      {/* Welcome Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Welcome to <span className="iridescent bg-clip-text text-transparent">DDA Portal</span></h2>
        <p className="text-neutral-500 max-w-2xl font-medium">Your hub for medical networking, professional growth, and community engagement. Explore the latest updates and connect with peers.</p>
      </section>

      {/* Bento Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BentoCard 
          className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-brand-primary/10 to-transparent"
          icon={<Search className="w-8 h-8 text-brand-primary" />}
          title="Member Directory"
          description="Find and connect with doctors and students across the country."
          href="/directory"
        />
        <BentoCard 
          icon={<UserCheck className="w-6 h-6 text-brand-secondary" />}
          title="Committees"
          description="View national and regional committee structures."
          href="/committees"
        />
        <BentoCard 
          icon={<Heart className="w-6 h-6 text-brand-accent" />}
          title="Social Feed"
          description="Stay updated with community posts and news."
          href="/feed"
        />
        <BentoCard 
          className="md:col-span-1 lg:col-span-2"
          icon={<MapPin className="w-6 h-6 text-neutral-400" />}
          title="Regional Hubs"
          description="Explore events and notices in your district."
          href="/regions"
        />
        <BentoCard 
          className="lg:col-span-2"
          icon={<Filter className="w-6 h-6 text-neutral-400" />}
          title="Digital ID Card"
          description="Access your digital identity with a secure QR code."
          href="/id-card"
        />
      </div>

      {/* Stats Section */}
      <section className="glass rounded-[2rem] p-8 md:p-12 flex flex-wrap gap-12 justify-around shadow-premium">
        <StatItem value="12k+" label="Total Members" />
        <StatItem value="45" label="Registered Districts" />
        <StatItem value="150+" label="Active Events" />
      </section>
    </div>
  );
}

function BentoCard({ title, description, icon, href, className = "" }: { title: string, description: string, icon: React.ReactNode, href: string, className?: string }) {
  return (
    <div className={`bento-card group flex flex-col justify-between ${className}`}>
      <div>
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
      </div>
      <a href={href} className="mt-8 flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:gap-3 transition-all">
        Explore <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center space-y-1">
      <div className="text-4xl font-extrabold iridescent bg-clip-text text-transparent">{value}</div>
      <div className="text-sm font-bold tracking-widest uppercase text-neutral-400">{label}</div>
    </div>
  );
}
