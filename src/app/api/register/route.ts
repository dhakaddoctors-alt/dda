import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db/db';
import { profiles, doctor_details, student_details } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json() as Record<string, any>;
    const { role, full_name, email, password, mobile, ...details } = data;

    // Securely hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    // Get DB instance from environment (Cloudflare D1)
    const db = getDb((req as any).env?.DB || (process as any).env?.DB);

    const userId = uuidv4();

    // 1. Create Profile
    await db.insert(profiles).values({
      id: userId,
      full_name,
      email,
      mobile,
      password_hash: passwordHash,
      role,
      status: 'Pending',
      ...details 
    });

    // 2. Create Role Specific Details
    if (role === 'Doctor') {
      await db.insert(doctor_details).values({
        id: userId,
        ...details
      });
    } else if (role === 'Student') {
      await db.insert(student_details).values({
        id: userId,
        ...details
      });
    }

    return NextResponse.json({ success: true, userId });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
