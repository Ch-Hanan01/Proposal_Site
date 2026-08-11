'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ProposalSection from '@/components/ProposalSection';
import MusicPlayer from '@/components/MusicPlayer';
import LoveLetter from '@/components/LoveLetter';
import PhotoSlider from '@/components/PhotoSlider';

import { ProposalSettings } from '@/lib/types';
import { DEFAULT_PROPOSAL_SETTINGS } from '@/lib/memories-data';
import { getSettings } from '@/lib/supabase';

export default function Home() {
  const [settings, setSettings] = useState<ProposalSettings>(DEFAULT_PROPOSAL_SETTINGS);

  useEffect(() => {
    async function loadData() {
      const s = await getSettings();
      setSettings(s);
    }
    loadData();
  }, []);

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

      {/* 2. Do You Love Me Question */}
      <ProposalSection
        question={settings.proposalQuestion}
        subtext={settings.proposalSubtext}
        recipientName={settings.recipientName}
        proposerName={settings.proposerName}
      />

      {/* 3. Modern Unique 3D Photo Slider Viewer */}
      <PhotoSlider />

      {/* 4. Handwritten Love Letter */}
      <LoveLetter
        letterText={settings.loveLetterText}
        recipientName={settings.recipientName}
        proposerName={settings.proposerName}
      />
    </main>
  );
}
