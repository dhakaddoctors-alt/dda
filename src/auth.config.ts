import type { NextAuthConfig } from 'next-auth';
import { profiles } from './db/schema';
import { eq } from 'drizzle-orm';
import { getDb } from './db/db';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPath = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/signup') || nextUrl.pathname === '/';
      
      if (!isLoggedIn && !isPublicPath) {
        return false; // Redirect to login
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
