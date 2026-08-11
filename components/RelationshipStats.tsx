'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RelationshipStats as StatsType } from '@/lib/types';
import { Clock, Plane, Coffee, Camera, Heart, Flame } from 'lucide-react';

interface RelationshipStatsProps {
  stats: StatsType;
}

export default function RelationshipStats({ stats }: RelationshipStatsProps) {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(stats.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [stats.startDate]);

  const statCards = [
    { label: 'Trips Together', value: stats?.tripsTogetherCount ?? stats?.tripsCount ?? 8, icon: Plane, color: 'from-amber-500 to-rose-500' },
    { label: 'Memories Captured', value: stats?.memoriesCount ?? 42, icon: Camera, color: 'from-rose-500 to-pink-500' },
    { label: 'Coffee & Tea Dates', value: stats?.coffeeDatesCount ?? 150, icon: Coffee, color: 'from-amber-600 to-yellow-500' },
    { label: 'Shared Laughs', value: '∞', icon: Heart, color: 'from-pink-500 to-rose-600' },
  ];

  return (
    <section className="relative py-20 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5" />
          Our Journey in Numbers
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rose-100">
          Counting Every Second With You
        </h2>
        <p className="text-rose-200/70 text-sm sm:text-base font-light max-w-md mx-auto">
          Time flies when you're in love, but every single second spent together is cherished.
        </p>
      </div>

      {/* Main Ticking Counter Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-black/60 via-deepRose/70 to-black/60 border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-8 mb-12"
      >
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
          <span>Together For</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
            <span className="font-playfair text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
              {timeTogether.days}
            </span>
            <span className="block text-xs uppercase tracking-wider text-rose-200/70 pt-2 font-medium">Days</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
            <span className="font-playfair text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200">
              {timeTogether.hours}
            </span>
            <span className="block text-xs uppercase tracking-wider text-rose-200/70 pt-2 font-medium">Hours</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
            <span className="font-playfair text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
              {timeTogether.minutes}
            </span>
            <span className="block text-xs uppercase tracking-wider text-rose-200/70 pt-2 font-medium">Minutes</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
            <span className="font-playfair text-3xl sm:text-5xl font-bold text-amber-400 animate-pulse">
              {timeTogether.seconds}
            </span>
            <span className="block text-xs uppercase tracking-wider text-rose-200/70 pt-2 font-medium">Seconds</span>
          </div>
        </div>
      </motion.div>

      {/* Grid of Custom Milestones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 border border-rose-500/20 rounded-2xl p-5 backdrop-blur-xl flex flex-col items-center text-center space-y-3 hover:border-amber-400/40 transition-colors"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-tr ${card.color} text-white shadow-lg shadow-rose-900/30`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-playfair text-2xl sm:text-3xl font-bold text-rose-100">{card.value}</span>
              <span className="text-xs text-rose-200/70 font-light">{card.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
