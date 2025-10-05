// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

// ডামি ইউজারদের লিস্ট (এটা আসলে ডাটাবেস থেকে আসবে)
const users = [
  { username: 'admin', password: 'password123', role: 'Super Admin' },
  { username: 'teacher1', password: 'teach123', role: 'Teacher' },
  { username: 'staff1', password: 'staff123', role: 'Staff' },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // ইউজারদের লিস্টার মধ্যে খুঁজে বের করা হচ্ছে
    const user = users.find(u => u.username === username);

    // ইউজার পাওয়া যাচাই করা হচ্ছে
    if (user && user.password === password) {
      // লগইন সফল হলে
      return NextResponse.json({ 
        success: true, 
        message: 'সফলভাবে লগইন হয়েছে',
        user: { username: user.username, role: user.role } // ইউজারের তথ্যাও পাঠাতে পারে
      });
    } else {
      // ইউজার খুঁজে না পেলে বা পাসওয়ার্ড ভুল হলে
      return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' }, { status: 401 });
    }
  } catch (error) {
    // কোনো সার্ভার সাইড এরর হলে
    return NextResponse.json({ success: false, message: 'সার্ভার এরর' }, { status: 500 });
  }
}