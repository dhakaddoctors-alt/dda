import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getDb } from './db/db';
import { profiles } from './db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const { 
  handlers: { GET, POST }, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as any;
        
        // In Cloudflare context, we need to get the DB binding
        // This is a bit tricky for 'authorize' as it doesn't have direct access to 'env' easily here
        // We'll rely on the global binding or standard injection in Cloudflare
        const db = getDb((process as any).env.DB);
        
        const [user] = await db.select().from(profiles).where(eq(profiles.email, email)).limit(1);

        if (user && await bcrypt.compare(password, user.password_hash)) {
          return {
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
});
