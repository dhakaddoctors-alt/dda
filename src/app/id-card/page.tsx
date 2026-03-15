'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Printer, ShieldCheck, UserCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function IDCardPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
      });
      const link = document.createElement('a');
      link.download = 'DDA-Digital-ID.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const member = {
    name: "Dr. Rajesh Kumar",
    id: "DDA-2026-8842",
    role: "Doctor",
    spec: "Cardiology",
    dist: "New Delhi",
    avatar: null,
    joined: "March 2026"
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 flex flex-col items-center">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Digital Identity</h1>
        <p className="text-neutral-500 font-medium">Your official DDA community member card.</p>
      </div>

      {/* ID Card Display */}
      <div 
        ref={cardRef}
        className="w-full max-w-sm aspect-[5/8] relative rounded-[2.5rem] p-8 overflow-hidden shadow-premium border border-white/20 iridescent group"
      >
        {/* Card Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 blur-2xl rounded-full -ml-10 -mb-10" />

        <div className="relative h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-secondary" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Verified Member</span>
              </div>
              <h2 className="text-2xl font-black italic">DDA PORTAL</h2>
            </div>
            <div className="h-12 w-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <UserCircle className="w-8 h-8" />
            </div>
          </div>

          {/* Member Details */}
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Name</p>
              <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Designation</p>
                <p className="text-sm font-bold">{member.role}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Reg. ID</p>
                <p className="text-sm font-bold">{member.id}</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="glass rounded-3xl p-6 flex flex-col items-center space-y-4 shadow-premium border-white/10">
            <div className="bg-white p-3 rounded-2xl shadow-inner">
              <QRCodeSVG 
                value={`https://dda-portal.pages.dev/profile/${member.id}`}
                size={120}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-200">Scan to Verify Profile</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CardAction onClick={downloadCard} icon={<Download className="w-5 h-5" />} label="Download Image" primary />
        <CardAction icon={<Printer className="w-5 h-5" />} label="Print Card" />
        <CardAction icon={<Share2 className="w-5 h-5" />} label="Share Link" />
      </div>
    </div>
  );
}

function CardAction({ icon, label, onClick, primary = false }: { icon: React.ReactNode, label: string, onClick?: () => void, primary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`h-14 px-8 rounded-2xl flex items-center gap-3 font-bold transition-all active:scale-95 ${
        primary 
          ? 'iridescent text-white shadow-premium' 
          : 'glass text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800'
      }`}
    >
      {icon} {label}
    </button>
  );
}
