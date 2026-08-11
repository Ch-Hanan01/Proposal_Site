'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Music } from 'lucide-react';

export const PLAYLIST = [
  {
    title: 'Pehli Dafa (Karaoke)',
    artist: 'Atif Aslam',
    src: '/audio/pehli_dafa_karaoke.mp3',
  },
  {
    title: 'Pehli Dafa (Original)',
    artist: 'Atif Aslam',
    src: '/audio/pehli_dafa_original.mp3',
  },
  {
    title: 'Jeene Laga Hoon',
    artist: 'Atif Aslam & Shreya Ghoshal',
    src: '/audio/jeene_laga_hoon.mp3',
  },
  {
    title: 'Aarzu',
    artist: 'Asim Azhar & Noor',
    src: '/audio/aarzu.mp3',
  },
  {
    title: 'Aaj Se Teri',
    artist: 'Arijit Singh',
    src: '/audio/aaj_se_teri.mp3',
  },
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const playAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    };

    playAudio();

    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      events.forEach(event => window.removeEventListener(event, handleFirstInteraction));
    };

    const events = ['click', 'touchstart', 'touchend', 'scroll', 'mousemove', 'pointerdown', 'keydown'];
    events.forEach(event => window.addEventListener(event, handleFirstInteraction, { passive: true }));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleFirstInteraction));
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % PLAYLIST.length;
    setCurrentTrack(nextIndex);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    nextTrack();
  };

  const track = PLAYLIST[currentTrack];

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI(track.src)}
        autoPlay
        onEnded={handleEnded}
        preload="auto"
      />

      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-rose-500/40 p-2.5 rounded-full shadow-2xl">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white hover:scale-105 transition-transform shadow-lg"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
        </button>

        <button
          onClick={nextTrack}
          className="p-2.5 rounded-full bg-white/10 text-rose-200 hover:bg-white/20 hover:text-amber-300 transition-colors"
          title="Change Song (Next Track)"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <div className="pr-3 text-xs hidden sm:block max-w-[170px] truncate">
          <p className="font-semibold text-rose-100 truncate flex items-center gap-1">
            <Music className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            {track.title}
          </p>
          <p className="text-[10px] text-rose-300/70 truncate">{track.artist}</p>
        </div>
      </div>
    </>
  );
}
