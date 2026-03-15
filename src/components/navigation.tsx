'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Home, 
  Users, 
  Bell, 
  UserCircle, 
  Search, 
  ShieldCheck, 
  LayoutDashboard,
  FileText,
  CreditCard,
  Settings
} from 'lucide-react';

export function DeskNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;
  
  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Directory', href: '/directory', icon: Users, roles: ['Guest', 'Student', 'Doctor', 'Admin', 'Super Admin'] },
    { name: 'Feed', href: '/feed', icon: Search },
    { name: 'Committees', href: '/committees', icon: Bell },
  ];

  const adminItems = [
    { name: 'Admin', href: '/admin/dashboard', icon: ShieldCheck, roles: ['Admin', 'Super Admin'] },
    { name: 'Finance', href: '/admin/finance', icon: CreditCard, roles: ['Accountant', 'Super Admin'] },
    { name: 'Moderation', href: '/admin/moderation', icon: Settings, roles: ['Moderator', 'Super Admin'] },
    { name: 'Regional', href: '/admin/regional', icon: LayoutDashboard, roles: ['Regional Admin', 'Super Admin'] },
  ];

  const filteredNav = navItems.filter(item => !item.roles || (role && item.roles.includes(role)));
  const filteredAdmin = adminItems.filter(item => role && item.roles?.includes(role));

  return (
    <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-3xl items-center gap-8 shadow-premium border-white/20 z-50 animate-in slide-in-from-top-4 duration-1000">
      <Link href="/" className="font-extrabold text-2xl iridescent bg-clip-text text-transparent mr-4">DDA</Link>
      
      <div className="flex items-center gap-1">
        {[...filteredNav, ...filteredAdmin].map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-premium scale-105' 
                  : 'text-neutral-500 hover:text-brand-primary hover:bg-brand-primary/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-2" />
      
      <Link 
        href="/profile" 
        className="h-10 w-10 rounded-full border-2 border-brand-primary/20 flex items-center justify-center hover:border-brand-primary transition-colors overflow-hidden"
      >
        <UserCircle className="w-6 h-6 text-neutral-400" />
      </Link>
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Search', href: '/directory', icon: Search },
    { name: 'Feed', href: '/feed', icon: Users },
    { name: 'Profile', href: '/profile', icon: UserCircle },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 h-18 glass rounded-3xl flex items-center justify-around px-4 shadow-premium border-white/20 z-50 animate-in slide-in-from-bottom-4 duration-1000">
       {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-14 h-14 group"
            >
              {isActive && (
                <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl animate-in zoom-in duration-300" />
              )}
              <Icon className={`w-6 h-6 transition-all duration-300 ${
                isActive ? 'text-brand-primary scale-110' : 'text-neutral-400 group-hover:text-brand-primary group-hover:scale-110'
              }`} />
              <span className={`text-[10px] font-bold mt-1 transition-all ${
                isActive ? 'text-brand-primary opacity-100' : 'text-neutral-400 opacity-0 group-hover:opacity-100'
              }`}>{item.name}</span>
            </Link>
          );
       })}
    </nav>
  );
}
