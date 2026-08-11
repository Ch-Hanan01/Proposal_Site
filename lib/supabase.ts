import { createClient } from '@supabase/supabase-js';
import { Memory, MapLocation, GuestbookWish, RelationshipStats, ProposalSettings } from './types';
import { DEFAULT_PROPOSAL_SETTINGS, DEFAULT_STATS, INITIAL_MEMORIES, INITIAL_LOCATIONS, INITIAL_GUESTBOOK } from './memories-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Persistent Fallback Storage Layer for offline/demo mode
const LOCAL_STORAGE_KEYS = {
  SETTINGS: 'forever_begins_settings',
  STATS: 'forever_begins_stats',
  MEMORIES: 'forever_begins_memories',
  LOCATIONS: 'forever_begins_locations',
  GUESTBOOK: 'forever_begins_guestbook',
};

export const getSettings = async (): Promise<ProposalSettings> => {
  if (typeof window === 'undefined') return DEFAULT_PROPOSAL_SETTINGS;

  if (supabase) {
    try {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (data && !error) return data as ProposalSettings;
    } catch (e) {
      console.warn('Supabase fetch failed, resorting to fallback store');
    }
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return DEFAULT_PROPOSAL_SETTINGS;
};

export const saveSettings = async (settings: ProposalSettings): Promise<boolean> => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  if (supabase) {
    try {
      await supabase.from('settings').upsert([settings]);
    } catch (e) {}
  }
  return true;
};

export const getMemories = async (): Promise<Memory[]> => {
  if (typeof window === 'undefined') return INITIAL_MEMORIES;

  if (supabase) {
    try {
      const { data, error } = await supabase.from('memories').select('*').order('date', { ascending: false });
      if (data && data.length > 0 && !error) return data as Memory[];
    } catch (e) {}
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.MEMORIES);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return INITIAL_MEMORIES;
};

export const saveMemory = async (memory: Memory): Promise<Memory[]> => {
  const current = await getMemories();
  const index = current.findIndex(m => m.id === memory.id);
  let updated: Memory[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = memory;
  } else {
    updated = [memory, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEYS.MEMORIES, JSON.stringify(updated));
  }

  if (supabase) {
    try {
      await supabase.from('memories').upsert([memory]);
    } catch (e) {}
  }

  return updated;
};

export const getGuestbookWishes = async (): Promise<GuestbookWish[]> => {
  if (typeof window === 'undefined') return INITIAL_GUESTBOOK;

  if (supabase) {
    try {
      const { data, error } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0 && !error) return data as GuestbookWish[];
    } catch (e) {}
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.GUESTBOOK);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return INITIAL_GUESTBOOK;
};

export const addGuestbookWish = async (name: string, message: string): Promise<GuestbookWish[]> => {
  const colors = ['#e63946', '#e0a96d', '#ff70a6', '#f72585', '#70e000', '#4cc9f0'];
  const newWish: GuestbookWish = {
    id: 'gb-' + Date.now(),
    name,
    message,
    createdAt: 'Just now',
    heartColor: colors[Math.floor(Math.random() * colors.length)],
  };

  const current = await getGuestbookWishes();
  const updated = [newWish, ...current];

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEYS.GUESTBOOK, JSON.stringify(updated));
  }

  if (supabase) {
    try {
      await supabase.from('guestbook').insert([newWish]);
    } catch (e) {}
  }

  return updated;
};
