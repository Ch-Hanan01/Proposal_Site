'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

interface ProposalSectionProps {
  question?: string;
  subtext?: string;
  recipientName: string;
  proposerName?: string;
}

export default function ProposalSection({ question, subtext, recipientName, proposerName = 'Ahmad' }: ProposalSectionProps) {
  const [sheSaidYes, setSheSaidYes] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noTooltip, setNoTooltip] = useState('No 😜');
  const [attemptCount, setAttemptCount] = useState(0);
  const [currentGif, setCurrentGif] = useState('/images/loving panda.gif');

  const romanUrduMessages = [
    'Soch lo achi tarah... 🥺',
    'Aisa mat karo na... 💔',
    'Pakka nahi pasand? 😭',
    'Maan bhi jao ab... 🌸',
    'Ek baar phir soch lo... 🙈',
    'Itna zulm mat karo re... 🥺❤️',
    'Haan bol do na please! 💖',
    'Ab to Yes keh do! 💍✨',
  ];

  const sadGifs = [
    '/images/sad 1.webp',
    '/images/sad 2.webp',
    '/images/sad 3.webp',
    '/images/sad 4.webp',
    '/images/sad.gif',
  ];

  const handleNoHover = () => {
    const side = attemptCount % 2 === 0 ? 1 : -1;
    const randomX = side * (160 + Math.random() * 120);
    const randomY = (Math.random() - 0.5) * 180;
    setNoPos({ x: randomX, y: randomY });

    const msg = romanUrduMessages[attemptCount % romanUrduMessages.length];
    setNoTooltip(msg);

    const sadGif = sadGifs[attemptCount % sadGifs.length];
    setCurrentGif(sadGif);

    setAttemptCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setSheSaidYes(true);
    setCurrentGif('/images/hug and kiss.gif');

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 10001 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 60 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#e63946', '#e0a96d', '#f7e7ce', '#ff70a6'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#e63946', '#e0a96d', '#f7e7ce', '#ff70a6'],
      });
    }, 250);
  };

  const yesButtonScale = Math.min(1 + attemptCount * 0.15, 2.2);

  return (
    <section className="relative py-12 px-4 max-w-5xl mx-auto z-10 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 space-y-6 bg-gradient-to-b from-black/80 via-deepRose/90 to-black/90 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-2xl">
        
        {/* Cute Animated Bear GIF */}
        <div className="flex justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-amber-300/40 shadow-2xl bg-deepRose/50 p-2">
            <img
              src={currentGif}
              alt="Cute Bear Reaction"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold uppercase tracking-widest animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          The Most Important Question 🥺
        </div>

        {/* Crisp Styled Headline & Emojis */}
        <h2 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight flex flex-wrap items-center justify-center gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-amber-200 to-rose-200 drop-shadow-2xl">{question || 'Do You Love Me?'}</span>
          <span className="inline-flex items-center text-3xl sm:text-5xl text-rose-300 font-sans leading-none drop-shadow-[0_4px_12px_rgba(255,112,166,0.8)]">🥺👉👈💖</span>
        </h2>

        <p className="text-rose-200/90 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed italic">
          {subtext || `"Sachi sachi batao, kitna pyaar karti ho ${recipientName} mujhse?"`}
        </p>

        {/* Interactive Buttons Container */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[140px] relative">
          {/* YES BUTTON */}
          <motion.button
            style={{ transform: `scale(${yesButtonScale})` }}
            whileHover={{ scale: yesButtonScale * 1.05 }}
            whileTap={{ scale: yesButtonScale * 0.95 }}
            onClick={handleYesClick}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-playfair font-bold text-2xl shadow-2xl shadow-rose-600/50 border-2 border-amber-300 flex items-center gap-3 group transition-transform z-10 cursor-pointer"
          >
            <Heart className="w-7 h-7 fill-white group-hover:scale-125 transition-transform" />
            YES, I LOVE YOU! ❤️✨
          </motion.button>

          {/* EVASIVE NO BUTTON */}
          <motion.button
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            onClick={handleNoHover}
            className="px-8 py-4 rounded-full bg-rose-950/80 border-2 border-rose-400/60 text-rose-100 text-base font-bold transition-all shadow-2xl cursor-pointer whitespace-nowrap z-40"
          >
            {noTooltip}
          </motion.button>
        </div>
      </div>

      {/* YES Celebration Modal with High-Visibility Emojis */}
      <AnimatePresence>
        {sheSaidYes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl text-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-2xl w-full bg-gradient-to-b from-deepRose via-black to-romanticWine border-4 border-amber-400 rounded-3xl p-8 sm:p-14 shadow-[0_0_80px_rgba(224,169,109,0.3)] space-y-6 relative overflow-hidden"
            >
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-400 bg-black/40 p-2 shadow-2xl animate-bounce">
                  <img
                    src="/images/hug and kiss.gif"
                    alt="Happy Celebration Bear"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">🎉 YAYYYY! BEST DAY OF MY LIFE! 🎉</span>

              <h2 className="font-playfair text-4xl sm:text-6xl font-bold leading-tight flex flex-wrap items-center justify-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-amber-200 to-rose-200">Mujhe Pata Tha Tum Haan Karogi!</span>
                <span className="inline-flex items-center text-3xl sm:text-5xl text-rose-300 font-sans leading-none drop-shadow-[0_4px_16px_rgba(255,112,166,0.9)]">🥰❤️✨</span>
              </h2>

              <p className="text-rose-200/90 text-base sm:text-xl font-light leading-relaxed">
                I love you so much {recipientName}! Tum meri pehli aur aakhri mohabbat ho! 💖🌸
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setSheSaidYes(false)}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 font-bold text-base hover:scale-105 transition-transform shadow-xl cursor-pointer"
                >
                  Celebrate Our Love ❤️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
