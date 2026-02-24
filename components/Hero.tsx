'use client';

import { motion } from 'framer-motion';
import { Play, Info, Star, ChevronRight, Share2, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export default function Hero({ onPlay }: { onPlay: (id: string) => void }) {
    return (
        <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-[#020205]">
            {/* Dynamic Background World */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-bg-deep via-bg-deep/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,170,0.1),transparent_70%)] z-10" />
                <motion.img
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2600"
                    alt="Cyberpunk Game Background"
                    className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Live Status Pill */}
                        <div className="flex items-center gap-3 mb-10">
                            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border-primary/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Nexus Active</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border-secondary/20">
                                <TrendingUp className="w-3 h-3 text-secondary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">V3.4 Stable</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-bg-deep glass flex items-center justify-center overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i * 123}`} alt="Player" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-4 border-bg-deep bg-primary flex items-center justify-center text-[10px] font-black text-black">
                                    +12k
                                </div>
                            </div>
                            <p className="text-[10px] text-text-dim font-black uppercase tracking-widest">Players currently exploring</p>
                        </div>

                        <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 italic">
                            NEON <br />
                            <span className="text-transparent text-outline relative">
                                STRIKE
                                <Sparkles className="absolute -top-10 -right-10 w-20 h-20 text-primary opacity-20" />
                            </span><br />
                            <span className="text-secondary text-glow text-5xl md:text-[8rem]">OVERDRIVE</span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <HeaderStat icon={<Cpu />} label="Engine" value="TurboV8" color="primary" />
                            <HeaderStat icon={<Info />} label="Difficulty" value="Hardcore" color="accent" />
                            <HeaderStat icon={<Star />} label="World Rank" value="#1 globally" color="secondary" />
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <button
                                onClick={() => onPlay('2048')}
                                className="button-primary group px-12 py-6 text-xl"
                            >
                                <Play className="w-7 h-7 fill-current" />
                                Launch Infinite
                            </button>

                            <button className="flex items-center gap-3 glass px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all border-white/5 group">
                                <Info className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Nexus Intelligence
                            </button>

                            <button className="w-16 h-16 flex items-center justify-center glass rounded-2xl border-white/5 hover:border-primary/50 transition-all">
                                <Share2 className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Hero Parallax Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] top-[20%] w-[400px] h-[400px] bg-primary/20 blur-[150px] rounded-full z-0 pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[5%] bottom-[10%] w-[300px] h-[300px] bg-secondary/20 blur-[120px] rounded-full z-0 pointer-events-none"
            />
        </section>
    );
}

function HeaderStat({ icon, label, value, color }: any) {
    const colors: any = {
        primary: 'text-primary border-primary/20',
        secondary: 'text-secondary border-secondary/20',
        accent: 'text-accent border-accent/20',
    };

    return (
        <div className={`flex flex-col gap-2 p-6 glass rounded-2xl border-l-4 ${colors[color]}`}>
            <div className="flex items-center gap-2 text-text-dim">
                <span className="w-4 h-4">{icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter italic">{value}</span>
        </div>
    );
}
