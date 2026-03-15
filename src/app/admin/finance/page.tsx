'use client';

import React from 'react';
import { CreditCard, TrendingUp, Users, Download, ArrowUpRight, DollarSign } from 'lucide-react';

export default function FinanceDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Finance <span className="text-brand-secondary">Ledger</span></h1>
          <p className="text-neutral-500 font-medium">Track membership fees, donations, and platform expenses.</p>
        </div>
        <button className="h-14 px-8 rounded-2xl iridescent text-white font-bold flex items-center gap-3 shadow-premium">
          <Download className="w-5 h-5" /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FinanceStatCard label="Total Revenue" value="₹4.8L" trend="+8%" icon={<DollarSign className="w-6 h-6" />} color="bg-green-500" />
        <FinanceStatCard label="Pending Payments" value="₹12.4k" trend="48 Members" icon={<CreditCard className="w-6 h-6" />} color="bg-orange-500" />
        <FinanceStatCard label="Active Donors" value="156" trend="+12" icon={<Users className="w-6 h-6" />} color="bg-brand-primary" />
      </div>

      <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-premium border-white/10">
        <h3 className="text-2xl font-black">Recent Transactions</h3>
        <div className="space-y-2">
          <TransactionItem member="Dr. Amit Vats" amount="₹2,000" type="Annual Fee" status="Completed" date="Today" />
          <TransactionItem member="Anonymous" amount="₹10,000" type="Donation" status="Completed" date="Yesterday" />
          <TransactionItem member="Suresh Kumar" amount="₹1,500" type="Student Fee" status="Pending" date="2 days ago" />
        </div>
      </div>
    </div>
  );
}

function FinanceStatCard({ label, value, trend, icon, color }: any) {
  return (
    <div className="glass p-8 rounded-[2rem] border-white/10 shadow-premium space-y-6">
      <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">{label}</h4>
        <p className="text-3xl font-black">{value}</p>
        <p className="text-xs font-bold text-green-500 mt-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {trend}
        </p>
      </div>
    </div>
  );
}

function TransactionItem({ member, amount, type, status, date }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-brand-primary">
          ₹
        </div>
        <div>
          <h4 className="font-bold">{member}</h4>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-lg">{amount}</p>
        <p className={`text-[10px] font-black uppercase tracking-[0.1em] ${status === 'Completed' ? 'text-green-500' : 'text-orange-500'}`}>{status}</p>
      </div>
    </div>
  );
}
