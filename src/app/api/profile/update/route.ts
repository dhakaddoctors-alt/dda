import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { profiles, doctor_details, student_details } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const data = await req.json();
    const { 
      // Personal
      gender, dob, marital_status, blood_group,
      // Address
      address, permanent_address, district, state, pincode,
      // Professional
      role_specific_data 
    } = data;

    const db = getDb((req as any).env?.DB || (process as any).env?.DB);

    // 1. Update Common Profile Data
    await db.update(profiles)
      .set({
        gender,
        dob,
        marital_status,
        blood_group,
        address,
        permanent_address,
        district,
        state,
        pincode,
        updated_at: new Date()
      })
      .where(eq(profiles.id, userId));

    // 2. Update Role Specific Details if any
    const userRole = session.user.role;
    if (userRole === 'Doctor' && role_specific_data) {
      // Check if details exist or insert
      await db.insert(doctor_details)
        .values({ id: userId, ...role_specific_data })
        .onConflictDoUpdate({
          target: doctor_details.id,
          set: role_specific_data
        });
    } else if (userRole === 'Student' && role_specific_data) {
      await db.insert(student_details)
        .values({ id: userId, ...role_specific_data })
        .onConflictDoUpdate({
          target: student_details.id,
          set: role_specific_data
        });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
