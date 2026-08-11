import { NextResponse } from 'next/server';
import { queryAIMemory } from '@/lib/ai-engine';
import { DEFAULT_PROPOSAL_SETTINGS, DEFAULT_STATS, INITIAL_MEMORIES } from '@/lib/memories-data';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const answer = queryAIMemory(query || '', INITIAL_MEMORIES, DEFAULT_PROPOSAL_SETTINGS, DEFAULT_STATS);
    return NextResponse.json({ success: true, answer });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to query memory AI' }, { status: 500 });
  }
}
