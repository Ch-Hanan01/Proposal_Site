'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

interface LoveLetterProps {
  letterText?: string;
  recipientName: string;
  proposerName?: string;
  onOpenLetter?: () => void;
}

export default function LoveLetter({ letterText, recipientName, proposerName = 'Ahmad', onOpenLetter }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpenLetter) onOpenLetter();
  };

  const poeticUrduText = `Meri Pyari ${recipientName},

Jab se tum meri zindagi main aayi ho, har din aik khoobsurat khwab jaisa lagta hai. Tumhari muskurahat meri duniya ki sabse haseen roshni hai, aur tumhara saath meri rooh ka sukoon... 🌸✨

Suno, kya tum Google ho? Kyun ke jo kuch bhi main zindagi main dhoond raha tha, wo sab mujhe tum main mil gaya! 🙈💖

Tumhare bina chaand bhi adhoora lagta hai aur ye hawayein bhi khaamosh. Main har pal tumhare saath bitana chahta hoon, kyun ke tum meri pehli aur aakhri khwahish ho.

Hamesha sirf Tumhara,
${proposerName} ❤️`;

  const textToDisplay = letterText || poeticUrduText;

  return (
    <section className="relative py-20 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          A Secret Sealed Letter
        </span>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          Dil Ki Baat, Sirf Tumhare Liye
        </h2>
      </div>

      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={handleOpen}
              className="w-full max-w-xl cursor-pointer bg-gradient-to-br from-romanticWine/90 via-deepRose/90 to-black/90 border-2 border-rose-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl text-center space-y-8 relative hover:border-amber-300/60 transition-all group"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-300/90 font-medium">Personal & Confidential</span>
                <h3 className="font-playfair text-2xl sm:text-4xl text-rose-100 font-bold">
                  To: My Dearest {recipientName}
                </h3>
              </div>

              <div className="inline-flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-800 via-rose-600 to-amber-500 shadow-2xl flex items-center justify-center border-4 border-amber-300/50 overflow-hidden p-1 group-hover:scale-110 transition-transform">
                  <img src="/images/i love you.gif" alt="Envelope Seal GIF" className="w-full h-full object-contain" />
                </div>
              </div>

              <p className="text-xs text-amber-300 font-medium tracking-wider animate-pulse flex items-center justify-center gap-1">
                <Mail className="w-4 h-4" /> Tap Seal to Open Letter ✉️
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-amber-50 text-zinc-900 border-4 border-amber-300/70 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-amber-900/10 text-amber-950 hover:bg-amber-900/20 text-xs font-bold transition-colors"
              >
                Close Envelope ✉️
              </button>

              <div
                style={{ fontFamily: "'Lucy Said Ok', 'Caveat', 'Satisfy', 'Sacramento', 'Dancing Script', cursive" }}
                className="text-3xl sm:text-5xl text-amber-950 leading-relaxed whitespace-pre-line pt-6 drop-shadow-sm font-normal"
              >
                {textToDisplay}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
