'use client';

import { motion } from 'framer-motion';
import {
    Zap,
    Gamepad2,
    Puzzle,
    Sword,
    Trophy,
    Globe,
    Car,
    Ghost,
    ChevronRight,
    TrendingUp,
    Cpu
} from 'lucide-react';

const CATEGORY_DATA = [
    { id: 'Action', label: 'Combat & Reflex', icon: <Sword />, color: '#ff0055', count: 18, desc: 'High-octane missions and intense combat subroutines.' },
    { id: 'Arcade', label: 'Classic Nexus', icon: <Gamepad2 />, color: '#00ccff', count: 24, desc: 'Retro-inspired challenges with modern visual gravity.' },
    { id: 'Puzzle', label: 'Logic Matrices', icon: <Puzzle />, color: '#00ffaa', count: 14, desc: 'Complex algorithmic puzzles for the sharpest minds.' },
    { id: 'Strategy', label: 'Tactical Command', icon: <Trophy />, color: '#ffec00', count: 12, desc: 'Master the battlefield with superior tactical oversight.' },
    { id: 'Space', label: 'Galactic Void', icon: <Globe />, color: '#7000ff', count: 15, desc: 'Explore the deepest reaches of the cosmic frontier.' },
    { id: 'Simulator', label: 'Reality Sync', icon: <Car />, color: '#ffaa00', count: 10, desc: 'Ultra-realistic simulations of terrestrial vehicles.' },
    { id: 'Adventure', label: 'Quest Protocol', icon: <Zap />, color: '#ffffff', count: 7, desc: 'Narrative-driven journeys through the digital divide.' },
];

export default function CategoryShowcase({ onSelect }: { onSelect: (id: string) => void }) {
    return (
        <section id="categories" className="py-32 bg-bg-deep relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-4"
                        >
                            <Cpu className="w-3 h-3" />
                            Categorical Analysis
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                            Browse the <span className="text-secondary text-glow">Universe</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border-white/5">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Sort by Complexity: High</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {CATEGORY_DATA.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => onSelect(cat.id)}
                            className="group relative h-80 rounded-[2.5rem] p-10 cursor-pointer overflow-hidden"
                        >
                            {/* Card Base */}
                            <div className="absolute inset-x-0 bottom-0 h-full bg-white/5 border border-white/5 group-hover:bg-white/10 transition-all rounded-[2.5rem] -z-10" />

                            {/* Glowing Background Icon */}
                            <div className="absolute -right-4 -top-4 w-40 h-40 opacity-5 group-hover:opacity-20 transition-opacity rotate-12 group-hover:rotate-0 transition-transform duration-700" style={{ color: cat.color }}>
                                {cat.icon}
                            </div>

                            {/* Icon Circle */}
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border-2 transition-all group-hover:scale-110" style={{ borderColor: `${cat.color}40`, color: cat.color }}>
                                <div className="w-8 h-8 opacity-80">{cat.icon}</div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">
                                    {cat.id}
                                </h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mb-6 group-hover:text-white transition-colors">
                                    {cat.label}
                                </p>
                                <p className="text-xs text-text-dim leading-relaxed mb-6 group-hover:text-text transition-colors">
                                    {cat.desc}
                                </p>
                            </div>

                            {/* Footer Meta */}
                            <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                    {cat.count} Realities
                                </span>
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Bottom Glow Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`, boxShadow: `0 0 15px ${cat.color}` }} />
                        </motion.div>
                    ))}

                    {/* Special "All Games" Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="group relative h-80 rounded-[2.5rem] p-10 cursor-pointer overflow-hidden flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 hover:border-primary/50 transition-all"
                    >
                        <Ghost className="w-16 h-16 text-text-dim/20 mb-6 group-hover:text-primary transition-colors animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-widest group-hover:text-primary transition-colors">Explore All</h3>
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-dim mt-2">Browse the 100 Centurion Set</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
