'use client';

import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import GameGrid from '@/components/GameGrid';
import PlaySystem from '@/components/PlaySystem';
import CategoryShowcase from '@/components/CategoryShowcase';

export default function Home() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const gameGridRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Smooth scroll to the game grid
    if (gameGridRef.current) {
      gameGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Background World Animation */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] z-10" />
        <div className="grid-bg" />
      </div>

      <Hero onPlay={(id) => setActiveGame(id)} />

      {/* Global XP/Level Bar */}
      <div className="container mx-auto px-6 -mt-10 mb-20 relative z-30">
        <div className="glass p-8 rounded-3xl border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-2xl font-black text-black italic">V</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-accent flex items-center justify-center border-4 border-bg-surface text-[10px] font-black italic shadow-xl">
                24
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-text-dim mb-1">Explorer Progress</p>
              <h3 className="text-xl font-black italic tracking-tighter uppercase">Vortex<span className="text-primary">Racer</span></h3>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl px-4">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
              <span>Next Level: Master II</span>
              <span className="text-primary">82,450 / 100k XP</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent w-[82%] relative">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[scanline_2s_infinite]" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-center px-6 border-r border-white/10 hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">Wins</p>
              <p className="text-xl font-black italic tracking-tighter">842</p>
            </div>
            <div className="text-center px-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-dim">Rank</p>
              <p className="text-xl font-black italic tracking-tighter text-accent">#142</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Category Section */}
      <CategoryShowcase onSelect={handleCategorySelect} />

      {/* Main Game Grid Section */}
      <div ref={gameGridRef}>
        <GameGrid
          onPlay={(id) => setActiveGame(id)}
          initialFilter={selectedCategory}
        />
      </div>

      {/* Community Teaser */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="glass p-12 rounded-[3rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-12 translate-y-[-12px] group-hover:scale-110 transition-transform">
              <h1 className="text-[15rem] font-black uppercase italic leading-none select-none">NEXUS</h1>
            </div>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                Connect to the <br />
                <span className="text-secondary text-glow">Social Nexus</span>
              </h2>
              <p className="text-text-dim max-w-xl mb-12 text-lg">Join tournaments, challenge friends, and climb the global leaderboards with millions of other players.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="button-primary px-8">Join the Discord</button>
                <button className="glass px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">View Leaderboards</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game System Overlay */}
      <AnimatePresence>
        {activeGame && (
          <PlaySystem gameId={activeGame} onClose={() => setActiveGame(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
