import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { committee_members } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    // Only Admin can manage committee members
    if (!session?.user?.role || !['Admin', 'Super Admin', 'Committee Manager'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { profileId, committeeId, designation, action } = await req.json() as {
      profileId: string;
      committeeId: string;
      designation?: string;
      action: 'add' | 'remove';
    };
    const db = getDb((req as any).env?.DB || (process as any).env?.DB);

    if (action === 'add') {
      await db.insert(committee_members).values({
        id: uuidv4(),
        committee_id: committeeId,
        profile_id: profileId,
        designation: designation || 'Member'
      });
    } else if (action === 'remove') {
      await db.delete(committee_members)
        .where(and(eq(committee_members.committee_id, committeeId), eq(committee_members.profile_id, profileId)));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
