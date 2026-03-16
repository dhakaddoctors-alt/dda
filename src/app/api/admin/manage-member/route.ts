import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { profiles } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { auth } from '@/auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    // Only Admin and Super Admin can manage members
    if (!session?.user?.role || !['Admin', 'Super Admin'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, action } = await req.json() as { userId: string; action: 'delete' | 'restore' | 'approve' };
    const db = getDb((req as any).env?.DB || (process as any).env?.DB);

    if (action === 'delete') {
      // Soft delete
      await db.update(profiles)
        .set({ deleted_at: new Date(), status: 'Suspended' })
        .where(eq(profiles.id, userId));
    } else if (action === 'restore') {
      await db.update(profiles)
        .set({ deleted_at: null, status: 'Approved' })
        .where(eq(profiles.id, userId));
    } else if (action === 'approve') {
       await db.update(profiles)
        .set({ status: 'Approved' })
        .where(eq(profiles.id, userId));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
