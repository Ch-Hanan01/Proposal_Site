'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProposalSettings, Memory } from '@/lib/types';
import { Settings, Lock, Save, Plus, X, Music, Mail, Image, Heart } from 'lucide-react';

interface AdminModalProps {
  settings: ProposalSettings;
  memories: Memory[];
  onSaveSettings: (settings: ProposalSettings) => void;
  onAddMemory: (memory: Memory) => void;
}

export default function AdminModal({ settings, memories, onSaveSettings, onAddMemory }: AdminModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Form State
  const [formSettings, setFormSettings] = useState<ProposalSettings>(settings);

  // New Memory Form State
  const [newMem, setNewMem] = useState<Partial<Memory>>({
    title: '',
    date: '',
    location: '',
    category: 'dates',
    description: '',
    imageUrl: '',
    caption: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    alert('Proposal settings updated successfully! ✨');
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMem.title || !newMem.imageUrl) return;

    const createdMemory: Memory = {
      id: 'mem-' + Date.now(),
      title: newMem.title || 'Special Moment',
      date: newMem.date || 'Today',
      location: newMem.location || 'Our Secret Place',
      category: (newMem.category as any) || 'dates',
      description: newMem.description || '',
      imageUrl: newMem.imageUrl || '',
      caption: newMem.caption || '',
    };

    onAddMemory(createdMemory);
    setNewMem({ title: '', date: '', location: '', category: 'dates', description: '', imageUrl: '', caption: '' });
    alert('New memory added to timeline! 📷');
  };

  return (
    <>
      {/* Secret Floating Gear trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 p-3 rounded-full bg-black/40 border border-white/10 text-rose-200/60 hover:text-white hover:bg-black/70 backdrop-blur-xl transition-all shadow-xl"
        title="Admin Control Panel"
      >
        <Settings className="w-5 h-5 hover:rotate-90 transition-transform" />
      </button>

      {/* Admin Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          >
            <div className="relative max-w-3xl w-full max-h-[90vh] bg-gradient-to-b from-deepRose via-black to-romanticWine border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-rose-200 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!isAuthenticated ? (
                /* Admin Login */
                <form onSubmit={handleLogin} className="space-y-6 text-center py-8 max-w-sm mx-auto">
                  <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/30 inline-block text-amber-400">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-rose-100">Admin Authentication</h3>
                  <p className="text-xs text-rose-200/70">Enter PIN (default: <span className="text-amber-300 font-bold">1234</span>) to customize the proposal.</p>

                  <input
                    type="password"
                    value={pinInput}
                    onChange={e => setPinInput(e.target.value)}
                    placeholder="Enter Admin PIN"
                    className="w-full bg-white/5 border border-rose-500/30 rounded-xl px-4 py-3 text-center text-lg text-rose-100 focus:outline-none focus:border-amber-400 tracking-widest"
                  />

                  {pinError && <p className="text-xs text-red-400">Incorrect Admin PIN!</p>}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-sm shadow-xl"
                  >
                    Unlock Admin Dashboard
                  </button>
                </form>
              ) : (
                /* Admin Dashboard Controls */
                <div className="space-y-8">
                  <div className="border-b border-rose-500/20 pb-4">
                    <h2 className="font-playfair text-2xl font-bold text-amber-300 flex items-center gap-2">
                      <Settings className="w-6 h-6" /> Proposal Admin Panel
                    </h2>
                    <p className="text-xs text-rose-200/70">Customize names, letter text, proposal headline, music, and memories.</p>
                  </div>

                  {/* General Proposal Settings Form */}
                  <form onSubmit={handleSaveSettingsSubmit} className="space-y-4">
                    <h3 className="text-sm font-bold text-rose-200 uppercase tracking-wider flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" /> Couple Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-rose-300/80 mb-1">Recipient Name</label>
                        <input
                          type="text"
                          value={formSettings.recipientName}
                          onChange={e => setFormSettings({ ...formSettings, recipientName: e.target.value })}
                          className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-3.5 py-2 text-xs text-rose-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-rose-300/80 mb-1">Your Name (Proposer)</label>
                        <input
                          type="text"
                          value={formSettings.proposerName}
                          onChange={e => setFormSettings({ ...formSettings, proposerName: e.target.value })}
                          className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-3.5 py-2 text-xs text-rose-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-rose-300/80 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-amber-400" /> Handwritten Love Letter
                      </label>
                      <textarea
                        rows={4}
                        value={formSettings.loveLetterText}
                        onChange={e => setFormSettings({ ...formSettings, loveLetterText: e.target.value })}
                        className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-3.5 py-2 text-xs text-rose-100 font-sans leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-rose-300/80 mb-1">Proposal Question</label>
                        <input
                          type="text"
                          value={formSettings.proposalQuestion}
                          onChange={e => setFormSettings({ ...formSettings, proposalQuestion: e.target.value })}
                          className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-3.5 py-2 text-xs text-rose-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-rose-300/80 mb-1 flex items-center gap-1">
                          <Music className="w-3.5 h-3.5 text-amber-400" /> Music MP3 URL
                        </label>
                        <input
                          type="text"
                          value={formSettings.backgroundMusicUrl}
                          onChange={e => setFormSettings({ ...formSettings, backgroundMusicUrl: e.target.value })}
                          className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-3.5 py-2 text-xs text-rose-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Settings
                    </button>
                  </form>

                  {/* Add New Memory Form */}
                  <form onSubmit={handleAddMemorySubmit} className="space-y-4 border-t border-rose-500/20 pt-6">
                    <h3 className="text-sm font-bold text-rose-200 uppercase tracking-wider flex items-center gap-2">
                      <Image className="w-4 h-4 text-amber-400" /> Add New Memory Photo
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Memory Title"
                        value={newMem.title}
                        onChange={e => setNewMem({ ...newMem, title: e.target.value })}
                        className="bg-white/5 border border-rose-500/20 rounded-xl px-3 py-2 text-xs text-rose-100"
                      />
                      <input
                        type="text"
                        placeholder="Date (e.g. May 10, 2024)"
                        value={newMem.date}
                        onChange={e => setNewMem({ ...newMem, date: e.target.value })}
                        className="bg-white/5 border border-rose-500/20 rounded-xl px-3 py-2 text-xs text-rose-100"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={newMem.location}
                        onChange={e => setNewMem({ ...newMem, location: e.target.value })}
                        className="bg-white/5 border border-rose-500/20 rounded-xl px-3 py-2 text-xs text-rose-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Image URL (Unsplash or direct link)"
                        value={newMem.imageUrl}
                        onChange={e => setNewMem({ ...newMem, imageUrl: e.target.value })}
                        className="bg-white/5 border border-rose-500/20 rounded-xl px-3 py-2 text-xs text-rose-100"
                      />
                      <select
                        value={newMem.category}
                        onChange={e => setNewMem({ ...newMem, category: e.target.value as any })}
                        className="bg-white/5 border border-rose-500/20 rounded-xl px-3 py-2 text-xs text-rose-100"
                      >
                        <option value="dates" className="bg-black">Special Dates</option>
                        <option value="firsts" className="bg-black">Firsts</option>
                        <option value="travel" className="bg-black">Travel</option>
                        <option value="milestones" className="bg-black">Milestones</option>
                      </select>
                    </div>

                    <textarea
                      placeholder="Short story / description..."
                      rows={2}
                      value={newMem.description}
                      onChange={e => setNewMem({ ...newMem, description: e.target.value })}
                      className="w-full bg-white/5 border border-rose-500/20 rounded-xl px-3 py-2 text-xs text-rose-100"
                    />

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs shadow-lg flex items-center gap-2 hover:bg-amber-400"
                    >
                      <Plus className="w-4 h-4" /> Add Memory Card
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
