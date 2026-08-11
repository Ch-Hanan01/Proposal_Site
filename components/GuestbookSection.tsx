'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GuestbookWish } from '@/lib/types';
import { MessageSquare, Heart, Send, Sparkles } from 'lucide-react';

interface GuestbookSectionProps {
  wishes: GuestbookWish[];
  onAddWish: (name: string, message: string) => void;
}

export default function GuestbookSection({ wishes, onAddWish }: GuestbookSectionProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddWish(name, message);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative py-24 px-4 max-w-5xl mx-auto z-10">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5" />
          Friends & Family Wall
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          Warmest Wishes & Love
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base font-light max-w-md mx-auto">
          Leave a message or blessing for the happy couple in our digital guestbook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Submission Form */}
        <div className="lg:col-span-5 bg-black/60 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-4">
          <h3 className="font-playfair text-xl font-bold text-rose-100 flex items-center gap-2">
            Leave a Wish <Sparkles className="w-4 h-4 text-amber-400" />
          </h3>

          {submitted && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium">
              Thank you! Your wish has been added to the wall ❤️
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-rose-200/80 mb-1 font-medium">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Uncle Mark & Aunt Jane"
                className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-rose-100 focus:outline-none focus:border-amber-400 placeholder:text-rose-300/40"
              />
            </div>

            <div>
              <label className="block text-xs text-rose-200/80 mb-1 font-medium">Your Message / Blessing</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write your heartfelt message..."
                className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-rose-100 focus:outline-none focus:border-amber-400 placeholder:text-rose-300/40"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Wish
            </button>
          </form>
        </div>

        {/* Wishes Grid Wall */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
          {wishes.map((wish, idx) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-black/40 border border-rose-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-lg space-y-2 relative"
            >
              <div className="flex justify-between items-center">
                <span className="font-playfair text-base font-bold text-rose-100 flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-rose-500" style={{ color: wish.heartColor || '#e63946' }} />
                  {wish.name}
                </span>
                <span className="text-[10px] text-rose-300/60 font-light">{wish.createdAt}</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-200/85 font-light leading-relaxed">
                "{wish.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
