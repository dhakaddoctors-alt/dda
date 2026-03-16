import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { post_likes, post_comments } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId, action, content } = await req.json() as { postId: string; action: string; content?: string };
    const db = getDb((req as any).env?.DB || (process as any).env?.DB);
    const userId = session.user.id;

    if (action === 'like') {
      // Check if already liked
      const existing = await db.select().from(post_likes)
        .where(and(eq(post_likes.post_id, postId), eq(post_likes.profile_id, userId)));
      
      if (existing.length > 0) {
        // Unlike
        await db.delete(post_likes)
          .where(and(eq(post_likes.post_id, postId), eq(post_likes.profile_id, userId)));
        return NextResponse.json({ liked: false });
      } else {
        // Like
        await db.insert(post_likes).values({
          id: uuidv4(),
          post_id: postId,
          profile_id: userId
        });
        return NextResponse.json({ liked: true });
      }
    } else if (action === 'comment') {
      if (!content) return NextResponse.json({ error: 'Comment content required' }, { status: 400 });
      
      await db.insert(post_comments).values({
        id: uuidv4(),
        post_id: postId,
        profile_id: userId,
        content
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
