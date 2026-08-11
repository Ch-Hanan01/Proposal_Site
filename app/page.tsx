'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ProposalSection from '@/components/ProposalSection';
import MusicPlayer from '@/components/MusicPlayer';
import MemoryTimeline from '@/components/MemoryTimeline';
import LoveLetter from '@/components/LoveLetter';
import PhotoSlider from '@/components/PhotoSlider';
import LoveMap from '@/components/LoveMap';
import MemoryGallery from '@/components/MemoryGallery';
import GuestbookSection from '@/components/GuestbookSection';
import AIMemoryAssistant from '@/components/AIMemoryAssistant';

import { Memory, MapLocation, GuestbookWish, ProposalSettings } from '@/lib/types';
import { DEFAULT_PROPOSAL_SETTINGS, DEFAULT_STATS, INITIAL_MEMORIES, INITIAL_LOCATIONS, INITIAL_GUESTBOOK } from '@/lib/memories-data';
import { getSettings, getMemories, getGuestbookWishes, addGuestbookWish } from '@/lib/supabase';

export default function Home() {
  const [settings, setSettings] = useState<ProposalSettings>(DEFAULT_PROPOSAL_SETTINGS);
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [locations, setLocations] = useState<MapLocation[]>(INITIAL_LOCATIONS);
  const [wishes, setWishes] = useState<GuestbookWish[]>(INITIAL_GUESTBOOK);

  useEffect(() => {
    async function loadData() {
      const s = await getSettings();
      setSettings(s);

      const m = await getMemories();
      setMemories(m);

      const w = await getGuestbookWishes();
      setWishes(w);
    }
    loadData();
  }, []);

  const handleAddWish = async (name: string, message: string) => {
    const updated = await addGuestbookWish(name, message);
    setWishes(updated);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-midnight">
      {/* Background Audio Player (Volume set to 45%, 5 tracks) */}
      <MusicPlayer />

      {/* 1. Hero Section */}
      <HeroSection
        recipientName={settings.recipientName}
        headline={settings.heroHeadline}
        subheadline={settings.heroSubheadline}
      />

      {/* 2. Do You Love Me Question (MOVED TO TOP RIGHT BELOW HERO!) */}
      <ProposalSection
        question={settings.proposalQuestion}
        subtext={settings.proposalSubtext}
        recipientName={settings.recipientName}
        proposerName={settings.proposerName}
      />

      {/* 3. Modern Unique 3D Photo Slider Viewer (Replaces Vault!) */}
      <PhotoSlider />

      {/* 4. Handwritten Love Letter */}
      <LoveLetter
        letterText={settings.loveLetterText}
        recipientName={settings.recipientName}
        proposerName={settings.proposerName}
      />

      {/* 5. Memory Timeline */}
      <MemoryTimeline memories={memories} />

      {/* 6. Interactive Love Map */}
      <LoveMap locations={locations} />

      {/* 7. Photo Gallery */}
      <MemoryGallery memories={memories} />

      {/* 8. Guestbook Wall */}
      <GuestbookSection wishes={wishes} onAddWish={handleAddWish} />

      {/* 9. AI Memory Assistant */}
      <AIMemoryAssistant memories={memories} settings={settings} stats={DEFAULT_STATS} />

      {/* Footer */}
      <footer className="py-12 text-center text-xs text-rose-200/50 border-t border-rose-500/10 font-light">
        <p>Crafted with endless love for {settings.recipientName} • Forever Begins</p>
      </footer>
    </main>
  );
}
