'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  recipientName: string;
  headline: string;
  subheadline: string;
}

export default function HeroSection({ recipientName, headline, subheadline }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [typedName, setTypedName] = useState('');

  // Typewriter effect for recipient name
  useEffect(() => {
    let index = 0;
    const fullText = `For My Beloved, ${recipientName}`;
    setTypedName('');
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedName(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 90);
    return () => clearInterval(timer);
  }, [recipientName]);

  // Starfield & Floating Hearts Canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create stars
    const starColors = ['255, 255, 255', '255, 223, 160', '255, 180, 220', '247, 231, 206'];
    const starsCount = 350;
    const stars = Array.from({ length: starsCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.025 + 0.008,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      isSparkle: Math.random() < 0.22,
      sparkleSize: Math.random() * 5 + 3,
      driftY: Math.random() * 0.15 + 0.05,
      driftX: (Math.random() - 0.5) * 0.1,
    }));

    // Floating subtle hearts
    const hearts = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      drift: (Math.random() - 0.5) * 0.5,
    }));

    const drawSparkleStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.shadowColor = `rgba(${color}, 0.9)`;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(-size, 0); ctx.lineTo(size, 0);
      ctx.moveTo(0, -size); ctx.lineTo(0, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.15) star.speed = -star.speed;
        const currentAlpha = Math.max(0, Math.min(1, star.alpha));

        star.y -= star.driftY;
        star.x += star.driftX;
        if (star.y < -10) star.y = height + 10;
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        if (star.isSparkle && currentAlpha > 0.4) {
          drawSparkleStar(ctx, star.x, star.y, star.sparkleSize * currentAlpha, currentAlpha, star.color);
        } else {
          ctx.save();
          ctx.shadowColor = `rgba(${star.color}, 0.8)`;
          ctx.shadowBlur = star.radius * 6;
          ctx.fillStyle = `rgba(${star.color}, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Render floating hearts
      hearts.forEach(heart => {
        heart.y -= heart.speed;
        heart.x += heart.drift;
        if (heart.y < -30) {
          heart.y = height + 20;
          heart.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.fillStyle = `rgba(224, 169, 109, ${heart.opacity})`;
        ctx.beginPath();
        ctx.scale(heart.size / 15, heart.size / 15);
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
        ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-8 pb-4">
      {/* Canvas for twinkling stars */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Main Content Box: Only Panda Badge & My Beloved Sarah Typewriter */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-3 px-4 text-center">
        {/* Top Panda on Bear Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-rose-500/40 p-1 bg-black/40 shadow-2xl">
            <img src="/images/panda on bear.webp" alt="Panda on Bear" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Typewriter Recipient Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-rose-500/30 backdrop-blur-md shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-handwritten text-2xl sm:text-3xl text-rose-200 tracking-wide">
            {typedName}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
