import { NextResponse } from 'next';
import { INITIAL_GUESTBOOK } from '@/lib/memories-data';

export async function GET() {
  return NextResponse.json({ success: true, wishes: INITIAL_GUESTBOOK });
}

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();
    if (!name || !message) {
      return NextResponse.json({ success: false, error: 'Name and message are required' }, { status: 400 });
    }

    const newWish = {
      id: 'gb-' + Date.now(),
      name,
      message,
      createdAt: 'Just now',
      heartColor: '#e63946',
    };

    return NextResponse.json({ success: true, wish: newWish });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
