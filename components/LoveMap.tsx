'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapLocation } from '@/lib/types';
import { MapPin, Navigation, Sparkles, X, Heart } from 'lucide-react';

interface LoveMapProps {
  locations: MapLocation[];
}

export default function LoveMap({ locations }: LoveMapProps) {
  const [activePin, setActivePin] = useState<MapLocation | null>(null);

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest">
          <Navigation className="w-3.5 h-3.5" />
          Interactive Map of Us
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          Our Special Places Across the Map
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base font-light max-w-md mx-auto">
          Tap any location pin on the interactive map to view our memory polaroid.
        </p>
      </div>

      {/* Vector Canvas Map Container */}
      <div className="relative w-full h-[450px] sm:h-[550px] rounded-3xl bg-gradient-to-b from-black/80 via-deepRose/80 to-black/80 border border-rose-500/30 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e0a96d_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* SVG Route Line connecting locations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e63946" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#e0a96d" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff70a6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Animated dashed line */}
          <path
            d={`M ${locations.map(loc => `${loc.latitude * 9.5 + 20},${loc.longitude * 4.5 + 40}`).join(' L ')}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Location Pins */}
        {locations.map((loc, idx) => {
          const leftPercent = loc.latitude; // 0 to 100
          const topPercent = loc.longitude;  // 0 to 100

          return (
            <div
              key={loc.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onClick={() => setActivePin(loc)}
            >
              {/* Pulse effect rings */}
              <div className="absolute -inset-3 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
              
              {/* Pin Icon button */}
              <div className="relative p-3 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-xl shadow-rose-900/60 border-2 border-amber-300 group-hover:scale-125 transition-transform duration-300">
                <MapPin className="w-5 h-5 fill-white/20" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 text-black font-bold text-[10px] rounded-full flex items-center justify-center border border-white">
                  {idx + 1}
                </span>
              </div>

              {/* Pin Hover Label */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-rose-100 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-rose-500/30 shadow-lg pointer-events-none">
                {loc.title}
              </div>
            </div>
          );
        })}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-rose-500/20 text-xs text-rose-200 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click any pin to inspect the memory</span>
        </div>
      </div>

      {/* Polaroid Memory Popup Modal */}
      <AnimatePresence>
        {activePin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActivePin(null)}
          >
            <div
              onClick={e => e.stopPropagation()}
              className="bg-white text-zinc-900 rounded-3xl p-5 sm:p-7 max-w-sm w-full shadow-2xl space-y-4 relative border-8 border-white transform rotate-1"
            >
              <button
                onClick={() => setActivePin(null)}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-zinc-900 text-white hover:bg-rose-600 transition-colors shadow-lg z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-56 w-full rounded-2xl overflow-hidden bg-zinc-100 relative">
                <img
                  src={activePin.imageUrl}
                  alt={activePin.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-center font-serif">
                <span className="text-xs uppercase tracking-wider text-rose-600 font-sans font-bold flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-600" /> {activePin.date}
                </span>
                <h3 className="text-xl font-bold text-zinc-900">{activePin.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">{activePin.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
