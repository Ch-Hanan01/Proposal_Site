'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Film, Ticket, Gift, Sparkles, AlertCircle } from 'lucide-react';

interface SurpriseVaultProps {
  passcode: string;
  videoUrl: string;
  secretMessage: string;
}

export default function SurpriseVault({ passcode, videoUrl, secretMessage }: SurpriseVaultProps) {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === passcode || newPin === '1204') {
          setIsUnlocked(true);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleClear = () => setPin('');

  const vouchers = [
    { title: 'Breakfast in Bed Pass', desc: 'Redeemable anytime for pancakes & coffee', icon: '🥞' },
    { title: 'Foot & Back Massage', desc: '30-minute relaxation session guaranteed', icon: '💆‍♀️' },
    { title: 'Midnight Movie & Snacks', desc: 'Your choice of movie + full popcorn bar', icon: '🍿' },
    { title: 'Infinite Hug Coupon', desc: 'Valid forever, anywhere in the world', icon: '🤗' },
  ];

  return (
    <section className="relative py-24 px-4 max-w-4xl mx-auto z-10">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Gift className="w-3.5 h-3.5" />
          Locked Secret Vault
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          The Secret Chapter
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base font-light max-w-md mx-auto">
          Enter our 4-digit anniversary passcode (default: <span className="text-amber-300 font-medium">1204</span>) to unlock hidden memories.
        </p>
      </div>

      <div className="flex justify-center">
        {!isUnlocked ? (
          /* Password Keypad Lock */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-md bg-black/60 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-center space-y-6"
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`p-4 rounded-full ${error ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-shake' : 'bg-rose-500/10 text-amber-300 border border-rose-500/20'}`}>
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-rose-100">Enter Security PIN</h3>
            </div>

            {/* PIN Display Dots */}
            <div className="flex justify-center gap-3 py-2">
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border ${
                    pin.length > i
                      ? 'bg-amber-400 border-amber-300 shadow-md shadow-amber-400/50 scale-110'
                      : 'bg-white/5 border-white/20'
                  } transition-all duration-200`}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-red-400 flex items-center justify-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> Incorrect PIN! Try 1204
              </p>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto pt-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeyPress(num)}
                  className="h-14 rounded-2xl bg-white/5 border border-white/10 text-xl font-semibold text-rose-100 hover:bg-rose-500/20 hover:border-amber-400/50 hover:text-white transition-all active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="h-14 rounded-2xl bg-white/5 border border-white/10 text-xs font-medium text-rose-300 hover:bg-white/10"
              >
                Clear
              </button>
              <button
                onClick={() => handleKeyPress('0')}
                className="h-14 rounded-2xl bg-white/5 border border-white/10 text-xl font-semibold text-rose-100 hover:bg-rose-500/20 hover:text-white transition-all active:scale-95"
              >
                0
              </button>
              <button
                onClick={() => setPin('1204')}
                className="h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-[10px] uppercase font-bold text-amber-300 hover:bg-amber-500/30"
              >
                Hint (1204)
              </button>
            </div>
          </motion.div>
        ) : (
          /* Unlocked Vault Content */
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-gradient-to-b from-deepRose/90 to-black/95 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-8"
            >
              <div className="flex justify-between items-center border-b border-rose-500/20 pb-4">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <Unlock className="w-5 h-5 text-amber-400" /> Vault Unlocked!
                </div>
                <button
                  onClick={() => setIsUnlocked(false)}
                  className="text-xs text-rose-300 hover:text-white underline"
                >
                  Lock Vault
                </button>
              </div>

              {/* Secret Video Player */}
              <div className="space-y-3">
                <h3 className="font-playfair text-xl font-bold text-rose-100 flex items-center gap-2">
                  <Film className="w-5 h-5 text-amber-400" /> Private Reel
                </h3>
                <div className="relative rounded-2xl overflow-hidden border border-rose-500/30 bg-black aspect-video">
                  <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Secret Message */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-rose-200/90 leading-relaxed italic">
                "{secretMessage}"
              </div>

              {/* Downloadable Romance Coupons */}
              <div className="space-y-4 pt-4">
                <h4 className="font-playfair text-lg font-bold text-amber-300 flex items-center gap-2">
                  <Ticket className="w-5 h-5" /> Redeemable Love Vouchers
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vouchers.map((v, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 to-amber-950 border border-amber-500/30 flex items-center gap-3 shadow-lg"
                    >
                      <span className="text-3xl">{v.icon}</span>
                      <div>
                        <h5 className="font-bold text-sm text-rose-100">{v.title}</h5>
                        <p className="text-[11px] text-rose-300/80 font-light">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
