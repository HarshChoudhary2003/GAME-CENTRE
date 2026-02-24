'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Search, Trophy, User, Bell, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] p-6">
            <div className="container mx-auto">
                <div className="flex items-center justify-between glass px-8 py-3 rounded-2xl border-white/5 shadow-2xl backdrop-blur-2xl">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,255,170,0.3)] group-hover:scale-110 transition-transform">
                            <Gamepad2 className="text-black w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl leading-none tracking-tighter uppercase">Arcade<span className="text-primary">Verse</span></span>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Next-Gen Hub</span>
                        </div>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-10">
                        <NavLink href="/games" label="Games" icon={<Zap className="w-4 h-4" />} active />
                        <NavLink href="#categories" label="Genres" />
                        <NavLink href="/leaderboards" label="Top Players" icon={<Trophy className="w-4 h-4" />} />
                        <NavLink href="/community" label="Community" />
                        <NavLink href="/store" label="Store" />
                    </div>

                    {/* Search & Profile */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 group focus-within:border-primary/50 transition-all">
                            <Search className="w-4 h-4 text-text-dim group-focus-within:text-primary" />
                            <input
                                type="text"
                                placeholder="Find a game..."
                                className="bg-transparent border-none outline-none text-sm px-3 w-40 focus:w-60 transition-all text-white placeholder:text-text-dim"
                            />
                        </div>

                        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                            <button className="relative group">
                                <Bell className="w-5 h-5 text-text-dim group-hover:text-white transition-colors" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-[#050508]" />
                            </button>

                            <div className="flex items-center gap-3 cursor-pointer group">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold leading-none">VortexRacer</p>
                                    <p className="text-[10px] text-primary font-bold">LVL 24</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl glass border-white/20 flex items-center justify-center group-hover:border-primary transition-all overflow-hidden">
                                    <User className="w-6 h-6 text-text-dim group-hover:text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, label, icon, active }: { href: string; label: string; icon?: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`relative flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all hover:text-primary ${active ? 'text-primary' : 'text-text-dim'}`}
        >
            {icon}
            {label}
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-5 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,170,0.5)]"
                />
            )}
        </Link>
    );
}
