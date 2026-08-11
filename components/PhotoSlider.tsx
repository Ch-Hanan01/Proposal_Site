'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

export const ANIME_PHOTOS = [
  {
    id: 1,
    title: 'Sakura Dreamscape 🌸',
    caption: 'Under the falling cherry blossoms, every moment with you feels like a fairytale. ✨',
    url: '/images/sakura-dream-girl-stockcake.jpg',
  },
  {
    id: 2,
    title: 'Golden Sunset Walks 🌅',
    caption: 'Hand in hand through the warm golden hour breeze. Tumhara saath hi meri sabse pyari manzil hai. ❤️',
    url: '/images/cherry-blossom-girl-stockcake.jpg',
  },
  {
    id: 3,
    title: 'Watercolor Romance 🎨',
    caption: 'You painted color into my world when everything was black & white. 💖',
    url: '/images/watercolor-anime-girl-stockcake.jpg',
  },
  {
    id: 4,
    title: 'Elegance & Grace 🌙',
    caption: 'Your smile lights up even the darkest nights. Main har roz tum par dubara fida hota hoon. ✨',
    url: '/images/elegant-anime-girl-stockcake.jpg',
  },
  {
    id: 5,
    title: 'Blossom Forever 🌺',
    caption: 'Forever begins right here, in your eyes. 💍✨',
    url: '/images/cherry-blossom-girl-stockcake (1).jpg',
  },
];

export default function PhotoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<any>(null);

  // Auto-slide every 3.5 seconds, paused when hovered
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === ANIME_PHOTOS.length - 1 ? 0 : prev + 1));
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ANIME_PHOTOS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === ANIME_PHOTOS.length - 1 ? 0 : prev + 1));
  };

  const currentPhoto = ANIME_PHOTOS[currentIndex];

  return (
    <section className="relative py-20 px-4 max-w-5xl mx-auto z-10">
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Our Romantic Gallery
        </span>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          Moments Frozen in Time
        </h2>
      </div>

      {/* 3D Glassmorphic Photo Card Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative bg-gradient-to-b from-black/80 via-deepRose/90 to-black/90 border-2 border-rose-500/40 rounded-3xl p-4 sm:p-8 shadow-[0_20px_50px_rgba(224,169,109,0.15)] backdrop-blur-2xl overflow-hidden group"
      >
        <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-black/80 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto.id}
              src={currentPhoto.url}
              alt={currentPhoto.title}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </AnimatePresence>

          {/* Ambient Gradient Overlay for Caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <motion.div
              key={`text-${currentPhoto.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-3 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/30 border border-rose-400/50 text-rose-200 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg">
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                {currentPhoto.title}
              </div>
              <p className="text-rose-100 text-base sm:text-xl font-light leading-relaxed drop-shadow-lg">
                {currentPhoto.caption}
              </p>
            </motion.div>
          </div>

          {/* Nav Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/30 text-white hover:bg-rose-600 transition-all shadow-2xl z-20 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/30 text-white hover:bg-rose-600 transition-all shadow-2xl z-20 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center items-center gap-2.5 pt-6">
          {ANIME_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-10 bg-gradient-to-r from-amber-400 to-rose-400 shadow-md' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
