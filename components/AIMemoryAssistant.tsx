'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Memory, ProposalSettings, RelationshipStats } from '@/lib/types';
import { queryAIMemory } from '@/lib/ai-engine';
import { Bot, Send, X, Sparkles, MessageCircle, Heart } from 'lucide-react';

interface AIMemoryAssistantProps {
  memories: Memory[];
  settings: ProposalSettings;
  stats: RelationshipStats;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function AIMemoryAssistant({ memories, settings, stats }: AIMemoryAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello ${settings.recipientName}! I am Cupid, your AI Memory Assistant. Ask me anything about your romantic memories, dates, trips, or secret passcode! ✨`,
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = queryAIMemory(text, memories, settings, stats);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const suggestions = [
    'When did we first meet?',
    'How many days together?',
    'What trip was most magical?',
    'What is our secret passcode?',
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 text-white shadow-2xl shadow-rose-900/60 border-2 border-rose-300 flex items-center justify-center group"
          title="Ask Cupid AI Memory Assistant"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
          </span>
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-gradient-to-b from-black/90 via-deepRose/95 to-black/90 border border-rose-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-rose-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-md">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-base font-bold text-rose-100 flex items-center gap-1.5">
                    Cupid Memory AI
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h3>
                  <p className="text-[10px] text-rose-300">Powered by stored memories</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-rose-200 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-none shadow-lg'
                        : 'bg-white/10 border border-white/15 text-rose-100 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[9px] text-rose-200/60 pt-1 text-right">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/15 rounded-2xl p-3 rounded-bl-none flex items-center gap-1.5 text-amber-300 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="pl-1 text-[10px] text-rose-300">Cupid is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="p-2 border-t border-rose-500/10 bg-black/40 overflow-x-auto flex gap-1.5 no-scrollbar">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-rose-200 hover:bg-rose-500/20 hover:text-white transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-rose-500/20 bg-black/60 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask Cupid about your love story..."
                className="flex-1 bg-white/5 border border-rose-500/20 rounded-full px-4 py-2 text-xs text-rose-100 focus:outline-none focus:border-amber-400 placeholder:text-rose-300/40"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
