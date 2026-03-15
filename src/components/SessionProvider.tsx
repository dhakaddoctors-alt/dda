'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import SessionProvider from '@/components/SessionProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
