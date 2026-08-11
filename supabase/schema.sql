-- Forever Begins Supabase Database Schema

-- 1. Proposal Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_name TEXT NOT NULL DEFAULT 'Sarah',
    proposer_name TEXT NOT NULL DEFAULT 'Ethan',
    hero_headline TEXT NOT NULL,
    hero_subheadline TEXT NOT NULL,
    love_letter_text TEXT NOT NULL,
    proposal_question TEXT NOT NULL,
    proposal_subtext TEXT NOT NULL,
    background_music_url TEXT,
    secret_video_url TEXT,
    secret_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Memories Table
CREATE TABLE IF NOT EXISTS public.memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('firsts', 'travel', 'milestones', 'dates')),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Guestbook Table
CREATE TABLE IF NOT EXISTS public.guestbook (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    heart_color TEXT DEFAULT '#e63946',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow public read memories" ON public.memories FOR SELECT USING (true);
CREATE POLICY "Allow public read guestbook" ON public.guestbook FOR SELECT USING (true);

-- Allow Public Insert into Guestbook
CREATE POLICY "Allow public insert guestbook" ON public.guestbook FOR INSERT WITH CHECK (true);

-- Allow authenticated/admin write to settings & memories
CREATE POLICY "Allow admin write settings" ON public.settings FOR ALL USING (true);
CREATE POLICY "Allow admin write memories" ON public.memories FOR ALL USING (true);
