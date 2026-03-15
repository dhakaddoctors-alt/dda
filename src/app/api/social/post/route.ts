import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { posts } from '@/db/schema';
import { auth } from '@/auth';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, imageUrl } = await req.json();
    if (!content) return NextResponse.json({ error: 'Post content required' }, { status: 400 });

    const db = getDb((req as any).env?.DB || (process as any).env?.DB);
    const userId = session.user.id;

    await db.insert(posts).values({
      id: uuidv4(),
      profile_id: userId,
      content,
      image_url: imageUrl || null
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
