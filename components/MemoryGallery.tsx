'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '@/lib/types';
import { Camera, X, Maximize2, Heart } from 'lucide-react';

interface MemoryGalleryProps {
  memories: Memory[];
}

export default function MemoryGallery({ memories }: MemoryGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Memory | null>(null);

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Camera className="w-3.5 h-3.5" />
          Photo Gallery
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          Fragments of Eternal Joy
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base font-light max-w-md mx-auto">
          A visual collection of our most cherished moments frozen in time.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            onClick={() => setSelectedPhoto(memory)}
            className="group relative cursor-pointer break-inside-avoid rounded-3xl overflow-hidden bg-black/40 border border-rose-500/20 shadow-xl transition-all duration-500 hover:border-amber-400/50 hover:scale-[1.02]"
          >
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 space-y-1">
              <span className="text-xs text-amber-300 font-medium flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> {memory.date}
              </span>
              <h3 className="font-playfair text-lg font-bold text-rose-100">{memory.title}</h3>
              <p className="text-xs text-rose-200/80 font-light line-clamp-2">{memory.description}</p>
              
              <div className="pt-2 flex justify-end">
                <span className="p-2 rounded-full bg-white/10 text-white backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-deepRose/90 border border-rose-500/30 rounded-3xl p-5 overflow-hidden shadow-2xl space-y-4"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-rose-200 hover:text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              <div className="space-y-1 text-center pt-2">
                <h3 className="font-playfair text-2xl font-bold text-rose-100">{selectedPhoto.title}</h3>
                <p className="text-xs text-amber-300 font-medium">{selectedPhoto.date} • {selectedPhoto.location}</p>
                <p className="text-sm text-rose-200/80 max-w-xl mx-auto font-light pt-1">{selectedPhoto.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
