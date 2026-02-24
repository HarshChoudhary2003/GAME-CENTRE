'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Search, Filter } from 'lucide-react';

const LEADERS = [
    { rank: 1, name: 'CyberPhantom_99', xp: '12.4M', wins: 2842, avatar: 'CP' },
    { rank: 2, name: 'VortexRacer', xp: '10.2M', wins: 2150, avatar: 'VR' },
    { rank: 3, name: 'NeonKnight', xp: '8.9M', wins: 1920, avatar: 'NK' },
    { rank: 4, name: 'GlitchMaster', xp: '7.5M', wins: 1640, avatar: 'GM' },
    { rank: 5, name: 'PixelFury', xp: '6.2M', wins: 1420, avatar: 'PF' },
    { rank: 6, name: 'VoidWalker', xp: '5.8M', wins: 1300, avatar: 'VW' },
    { rank: 7, name: 'CodeSniper', xp: '5.2M', wins: 1150, avatar: 'CS' },
];

export default function Leaderboards() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto">
                <header className="mb-16 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-6"
                    >
                        <Trophy className="w-3 h-3" />
                        Global Hall of Fame
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 italic">
                        Top <span className="text-primary">Strikers</span>
                    </h1>
                    <p className="text-text-dim max-w-2xl font-medium">The elite 1% of the ArcadeVerse. These players have mastered the nexus and conquered all subroutines.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Top 3 Spatials */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col md:flex-row items-end justify-center gap-8 mb-20 pt-20">
                            <TopPodium rank={2} name={LEADERS[1].name} score={LEADERS[1].xp} height="h-64" color="var(--secondary)" />
                            <TopPodium rank={1} name={LEADERS[0].name} score={LEADERS[0].xp} height="h-80" color="var(--primary)" featured />
                            <TopPodium rank={3} name={LEADERS[2].name} score={LEADERS[2].xp} height="h-52" color="var(--accent)" />
                        </div>

                        {/* Search/Filter Bar */}
                        <div className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4 flex-1">
                                <Search className="w-5 h-5 text-text-dim" />
                                <input type="text" placeholder="Search rankings..." className="bg-transparent border-none outline-none text-sm w-full font-bold" />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 glass rounded-xl hover:text-primary transition-colors"><Filter className="w-4 h-4" /></button>
                                <button className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Season 4 <TrendingUp className="w-3 h-3 text-secondary" />
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            {LEADERS.slice(3).map((leader, i) => (
                                <LeaderRow key={i} {...leader} />
                            ))}
                        </div>
                    </div>

                    {/* Stats & Rules */}
                    <div className="space-y-8">
                        <div className="glass p-8 rounded-3xl border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
                            <Crown className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-xl font-black uppercase mb-4">Becoming a <br /><span className="text-primary text-glow">Striker</span></h3>
                            <p className="text-xs text-text-dim leading-relaxed mb-6 font-medium">
                                Rankings are calculated based on your Skill-Index (SI). SI increases with high scores, daily streaks,
                                and defeating boss levels in visual challenges.
                            </p>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Your Rank</p>
                                <p className="text-2xl font-black italic">#842</p>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-3xl border-white/5">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6">Recent Records</h3>
                            <div className="space-y-6">
                                <RecordPulse user="Xenon" game="Snake" score="142k" />
                                <RecordPulse user="Volt" game="2048" score="450k" />
                                <RecordPulse user="Flux" game="Tetris" score="890k" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function TopPodium({ rank, name, score, height, color, featured }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rank * 0.2 }}
            className={`relative flex flex-col items-center w-full max-w-[240px] ${featured ? 'z-20' : 'z-10'}`}
        >
            <div className="relative mb-8 group">
                <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: color }} />
                <div className="w-24 h-24 rounded-3xl glass border-2 border-white/10 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-black uppercase italic">{name[0]}{name[1]}</span>
                    {featured && <Crown className="absolute top-1 right-1 w-4 h-4 text-primary" />}
                </div>
                <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-lg text-black font-black italic skew-x-[-10deg] shadow-xl`} style={{ backgroundColor: color }}>
                    RANK {rank}
                </div>
            </div>
            <div className={`w-full ${height} glass border-white/5 rounded-t-[2.5rem] relative overflow-hidden flex flex-col items-center p-8 text-center`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <h4 className="font-black uppercase tracking-tight mb-2 truncate w-full">{name}</h4>
                <p className="text-xl font-black italic tracking-tighter" style={{ color }}>{score} XP</p>
            </div>
        </motion.div>
    );
}

function LeaderRow({ rank, name, xp, wins, avatar }: any) {
    return (
        <div className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="flex items-center gap-6">
                <span className="w-8 text-center font-black italic text-text-dim group-hover:text-primary transition-colors">#{rank}</span>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-xs font-black">
                    {avatar}
                </div>
                <div>
                    <h4 className="font-bold group-hover:text-white transition-colors">{name}</h4>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{xp} XP</span>
                        <span className="text-[10px] text-text-dim">•</span>
                        <span className="text-[10px] font-bold text-text-dim">{wins} Wins</span>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Medal className="w-3 h-3 text-secondary" />
                <span className="text-[9px] font-black uppercase tracking-widest">Elite Striker</span>
            </div>
        </div>
    );
}

function RecordPulse({ user, game, score }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold"><span className="text-primary">{user}</span> set a record in <span className="text-white">{game}</span></span>
            </div>
            <span className="text-[10px] font-black italic">{score}</span>
        </div>
    );
}
