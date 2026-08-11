'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory } from '@/lib/types';
import { Calendar, MapPin, Sparkles, X, ZoomIn } from 'lucide-react';

interface MemoryTimelineProps {
  memories: Memory[];
}

export default function MemoryTimeline({ memories }: MemoryTimelineProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  const categories = [
    { id: 'all', label: 'All Chapters' },
    { id: 'firsts', label: '✨ Firsts' },
    { id: 'dates', label: '☕ Special Dates' },
    { id: 'travel', label: '✈️ Getaways' },
    { id: 'milestones', label: '💍 Milestones' },
  ];

  const filteredMemories = selectedCategory === 'all' 
    ? memories 
    : memories.filter(m => m.category === selectedCategory);

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Our Love Story
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          The Timeline of Us
        </h2>
        <p className="text-rose-200/70 max-w-lg mx-auto text-sm sm:text-base font-light">
          Every chapter, every photo, and every unforgettable moment that brought us closer.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-900/50 scale-105'
                  : 'bg-white/5 border border-white/10 text-rose-200/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Line & Items */}
      <div className="relative">
        {/* Center Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500/20 via-amber-500/50 to-rose-500/20 -translate-x-1/2" />

        <div className="space-y-12">
          {filteredMemories.map((memory, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-deepRose border-2 border-amber-400 shadow-lg shadow-amber-500/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                </div>

                {/* Content Card Box */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="group relative bg-black/40 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-amber-500/10">
                    {/* Photo with Lightbox Zoom Trigger */}
                    {memory.imageUrl && (
                      <div 
                        onClick={() => setActiveMemory(memory)}
                        className="relative h-48 sm:h-56 w-full mb-5 rounded-2xl overflow-hidden cursor-pointer group/img"
                      >
                        <img
                          src={memory.imageUrl}
                          alt={memory.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />
                        <div className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-amber-300 opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                        {memory.caption && (
                          <p className="absolute bottom-3 left-3 right-3 text-xs text-rose-100/90 italic font-light line-clamp-1">
                            "{memory.caption}"
                          </p>
                        )}
                      </div>
                    )}

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-amber-300/80 mb-3">
                      <span className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {memory.date}
                      </span>
                      <span className="flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 text-rose-300">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {memory.location}
                      </span>
                    </div>

                    {/* Memory Title & Description */}
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-rose-100 mb-2 group-hover:text-amber-200 transition-colors">
                      {memory.title}
                    </h3>
                    <p className="text-rose-200/75 text-sm leading-relaxed font-light">
                      {memory.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <div 
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-deepRose/90 border border-rose-500/30 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl space-y-4"
            >
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-rose-200 hover:text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-[60vh] max-h-[500px] w-full rounded-2xl overflow-hidden">
                <img
                  src={activeMemory.imageUrl}
                  alt={activeMemory.title}
                  className="w-full h-full object-contain bg-black/40"
                />
              </div>

              <div className="space-y-2 text-center pt-2">
                <h3 className="font-playfair text-2xl font-bold text-amber-200">{activeMemory.title}</h3>
                <p className="text-xs text-rose-300">{activeMemory.date} • {activeMemory.location}</p>
                <p className="text-sm text-rose-100/80 max-w-xl mx-auto">{activeMemory.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
