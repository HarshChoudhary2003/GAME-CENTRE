'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Volume2, RotateCcw, Users, MessageSquare, Terminal, Eye, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PlaySystem({ gameId, onClose }: { gameId: string, onClose: () => void }) {
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const messages = [
            `Initializing Nexus Protocol v3.4...`,
            `Establishing secure sandbox for: ${gameId}`,
            `loading_subroutines: [PIXEL_RENDER, INPUT_CAPTURE, STATE_MANAGER]`,
            `Syncing global XP data for VortexRacer...`,
            `Handshaking with static asset server...`,
            `Game instance READY.`
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < messages.length) {
                setLogs(prev => [...prev, messages[i]]);
                i++;
            } else {
                setLoading(false);
                clearInterval(interval);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [gameId]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg-deep/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
        >
            {/* Background Animated Circuits */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-full border-r border-primary/20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,170,0.1)_50%,transparent_75%)] bg-[length:500px_500px] animate-[scanline_10s_linear_infinite]" />
            </div>

            <div className="relative w-full h-full max-w-7xl flex flex-col gap-6 z-10">
                {/* Header Controls */}
                <div className="flex items-center justify-between glass p-6 rounded-3xl border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black font-black italic shadow-lg shadow-primary/20">
                            {gameId[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tighter italic">
                                {gameId.replace(/-/g, ' ')} <span className="text-primary">Live</span>
                            </h2>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-text-dim uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 1,242 Watching</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-primary">Stable 60 FPS</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 px-6 py-3 glass rounded-2xl border-white/5 text-[10px] font-black uppercase tracking-widest text-text-dim">
                            <Users className="w-4 h-4" /> Nexus Multi-Sync Active
                        </div>
                        <button className="p-4 glass rounded-2xl border-white/5 hover:text-primary transition-all"><Volume2 className="w-5 h-5" /></button>
                        <button className="p-4 glass rounded-2xl border-white/5 hover:text-primary transition-all"><Maximize2 className="w-5 h-5" /></button>
                        <button onClick={onClose} className="p-4 bg-accent/20 rounded-2xl border border-accent/30 text-accent hover:bg-accent hover:text-white transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
                    {/* Game Sandbox */}
                    <div className="flex-1 relative glass rounded-[3rem] border-white/5 overflow-hidden shadow-2xl bg-black">
                        <AnimatePresence>
                            {loading ? (
                                <motion.div
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="absolute inset-0 z-50 bg-[#020205] flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="relative mb-12">
                                        <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <Terminal className="absolute inset-0 m-auto w-8 h-8 text-primary opacity-50" />
                                    </div>

                                    <div className="w-full max-w-md bg-black/50 border border-white/5 p-6 rounded-2xl text-left font-mono">
                                        {logs.map((log, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i}
                                                className="text-[10px] mb-1 flex items-center gap-2"
                                            >
                                                <span className="text-primary opacity-50">[{new Date().toLocaleTimeString()}]</span>
                                                <span className={i === logs.length - 1 ? "text-primary" : "text-text-dim"}>{log}</span>
                                            </motion.div>
                                        ))}
                                        {loading && <div className="w-1 h-4 bg-primary animate-pulse inline-block align-middle ml-1" />}
                                    </div>

                                    <div className="mt-12">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Synchronizing Nexus</h3>
                                        <p className="text-[10px] text-text-dim font-black uppercase tracking-widest animate-pulse">Establishing Neural Link with Sandbox...</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.iframe
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={`/games/${gameId}/index.html`}
                                    className="w-full h-full border-none"
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Social / Info Sidebar */}
                    <div className="w-full lg:w-96 flex flex-col gap-6 h-full overflow-hidden">
                        <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-8">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Session Progress</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-dim">Experience Gained</span>
                                        <span className="text-xl font-black text-secondary">+142 XP</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary w-2/3" />
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <Trophy className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-text-dim">Current Rank</p>
                                            <p className="text-sm font-black italic">#42 Global</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/5 pt-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Live Nexus Chat</h3>
                                <div className="space-y-4 max-h-48 lg:max-h-full overflow-y-auto pr-2 no-scrollbar">
                                    <ChatMessage user="NeonStrike" msg="This level is insane!" time="12:42" />
                                    <ChatMessage user="VortexRacer" msg="Check the combo system." time="12:43" />
                                    <ChatMessage user="AeroDev" msg="Update v3.4 deployment confirmed." time="12:45" />
                                    <ChatMessage user="Ghost_99" msg="Who set the new record?" time="12:46" />
                                </div>
                                <div className="mt-6 flex items-center gap-3 glass p-4 rounded-2xl border-white/5">
                                    <input type="text" placeholder="Connect to nexus..." className="bg-transparent border-none outline-none text-[10px] font-bold w-full" />
                                    <MessageSquare className="w-4 h-4 text-text-dim" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto glass p-6 rounded-[2rem] border-white/5 flex items-center justify-between">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-dim hover:text-primary transition-colors">
                                <RotateCcw className="w-4 h-4" /> Reset Runtime
                            </button>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse [animation-delay:0.2s]" />
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse [animation-delay:0.4s]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ChatMessage({ user, msg, time }: any) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">{user}</span>
                <span className="text-[8px] text-text-dim">{time}</span>
            </div>
            <p className="text-[10px] font-medium leading-relaxed">{msg}</p>
        </div>
    );
}
