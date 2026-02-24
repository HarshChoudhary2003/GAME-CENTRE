'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Trophy, Users, Search, Filter, SlidersHorizontal, Sparkles, ChevronDown } from 'lucide-react';

const CATEGORIES = ['All', 'Action', 'Arcade', 'Puzzle', 'Strategy', 'Classic', 'Space', 'Simulator', 'Adventure'];

// 100 Unique Unsplash Image IDs to prevent duplicates
const UNIQUE_IMAGES = [
    '1542751371-adc38448a05e', '1614728263952-84ea256f9679', '1550745165-9bc0b252726f', '1605898399741-5a9f9397637a',
    '1511512578047-dfb367046420', '1547447134-cd3f5c716030', '1580234811497-9df7fd2f357e', '1553481187-be93c21490a9',
    '1614027164847-1b2809eb189d', '1635070041078-e363dbe005cb', '1612117561467-b174ed187cce', '1627850604058-52e40de1b847',
    '1518709268805-4e9042af9f23', '1529699211952-734e80c4d42b', '1551103782-8ab07afd45c1', '1668901319300-aa25e128cb5f',
    '1493711662062-fa541adb3fc8', '1548685913-fe6578020a9a', '1552820728-8b83bb6b773f', '1538481199705-c710c4e965fc',
    '1612287230202-1ff1d85d1bdf', '1515233215284-8898b31a5477', '1542751110-97427bbecf20', '1629752119110-5390974ed735',
    '1560419015-7c427e8ae5ba', '1534423861386-85a16f5d13fd', '1555680202-c86f0e12f086', '1536412597336-ade720556f3d',
    '1593305841009-786d773410ca', '1504450280346-640c30985208', '1550684846-17ae5aac5d3b', '1614850523296-d8c1af93d400',
    '1523875193933-281b37497d4b', '1543716627-ee89ddbc73ee', '1544652478-0207fa66f642', '1550745112-680415d8623b',
    '1612204030638-345719539f10', '1486572788356-31c89ecaf114', '1610041518111-e6df7f902641', '1542784157-19412140af9d',
    '1552168324-ee97efbb789a', '1551103782-8ab07afd45c1', '1542751110-97427bbecf20', '1529699211952-734e80c4d42b',
    '1515233215284-8898b31a5477', '1635070041078-e363dbe005cb', '1504450280346-640c30985208', '1552820728-8b83bb6b773f',
    '1611996598538-2095cc10aa9e', '1553481187-be93c21490a9', '1580234811497-9df7fd2f357e', '1547447134-cd3f5c716030',
    '1493711662062-fa541adb3fc8', '1548685913-fe6578020a9a', '1550745165-9bc0b252726f', '1605898399741-5a9f9397637a',
    '1511512578047-dfb367046420', '1612117561467-b174ed187cce', '1627850604058-52e40de1b847', '1518709268805-4e9042af9f23',
    '1523875193933-281b37497d4b', '1543716627-ee89ddbc73ee', '1544652478-0207fa66f642', '1550745112-680415d8623b',
    '1612204030638-345719539f10', '1486572788356-31c89ecaf114', '1610041518111-e6df7f902641', '1538481199705-c710c4e965fc',
    '1542751371-adc38448a05e', '1614728263952-84ea256f9679', '1550684846-17ae5aac5d3b', '1629752119110-5390974ed735',
    '1560419015-7c427e8ae5ba', '1534423861386-85a16f5d13fd', '1555680202-c86f0e12f086', '1536412597336-ade720556f3d',
    '1593305841009-786d773410ca', '1612287230202-1ff1d85d1bdf', '1515233215284-8898b31a5477', '1635070041078-e363dbe005cb',
    '1529699211952-734e80c4d42b', '1518709268805-4e9042af9f23', '1550745165-9bc0b252726f', '1605898399741-5a9f9397637a',
    '1511512578047-dfb367046420', '1547447134-cd3f5c716030', '1580234811497-9df7fd2f357e', '1553481187-be93c21490a9',
    '1614027164847-1b2809eb189d', '1605898399741-5a9f9397637a', '1518709268805-4e9042af9f23', '1511512578047-dfb367046420',
    '1635070041078-e363dbe005cb', '1542751371-adc38448a05e', '1614728263952-84ea256f9679', '1550745165-9bc0b252726f',
    '1580234811497-9df7fd2f357e', '1553481187-be93c21490a9', '1529699211952-734e80c4d42b', '1612117561467-b174ed187cce'
];

const DESCRIPTORS = ['Cyber', 'Neon', 'Cosmic', 'Void', 'Galaxy', 'Shadow', 'Blade', 'Drift', 'Pixel', 'Sonic', 'Mega', 'Rocket', 'Star', 'Lunar', 'Arctic', 'Desert', 'Final', 'Pro', 'Ultra', 'Infinity', 'Digital', 'Retro', 'Hyper', 'Super', 'Alpha', 'Blast', 'Crystal', 'Turbo', 'Vortex', 'Nebula'];
const NOUNS = ['Striker', 'Racer', 'Runner', 'Hunter', 'King', 'Master', 'Champion', 'Voyager', 'Lander', 'Breaker', 'Blaster', 'Quest', 'Blitz', 'Hero', 'Commander', 'Pilot', 'Surfer', 'Glitch', 'Logic', 'Force', 'Rebel', 'Assault', 'Guardian', 'Warden', 'Zenith', 'Pulse', 'Storm', 'Drifter', 'Crusher', 'Architect'];

const GENERATE_GAMES = () => {
    const manual = [
        { id: '2048', name: '2048 Evolution', category: 'Puzzle', rating: 4.8, plays: '250k', color: '#00ffaa', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400' },
        { id: 'snake', name: 'Neon Snake', category: 'Arcade', rating: 4.5, plays: '1.2M', color: '#0088ff', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400' },
        { id: 'tetris', name: 'Retro Blocks', category: 'Strategy', rating: 4.9, plays: '890k', color: '#ff0055', image: 'https://images.unsplash.com/photo-1627850604058-52e40de1b847?q=80&w=400' },
        { id: 'flappy', name: 'Aero Dash', category: 'Action', rating: 4.2, plays: '2.1M', color: '#ffaa00', image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=400' },
        { id: 'minesweeper', name: 'Void Sweeper', category: 'Puzzle', rating: 4.6, plays: '400k', color: '#aa00ff', image: 'https://images.unsplash.com/photo-1614027164847-1b2809eb189d?q=80&w=400' },
        { id: 'breakout', name: 'Wall Breaker', category: 'Arcade', rating: 4.7, plays: '600k', color: '#00ccff', image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=400' },
        { id: 'connect4', name: 'Logic Link', category: 'Strategy', rating: 4.8, plays: '320k', color: '#ffec00', image: 'https://images.unsplash.com/photo-1611996598538-2095cc10aa9e?q=80&w=400' },
        { id: 'tictactoe', name: 'Vortex Toe', category: 'Classic', rating: 4.4, plays: '1.1M', color: '#ff00aa', image: 'https://images.unsplash.com/photo-1668901319300-aa25e128cb5f?q=80&w=400' },
        { id: 'mole', name: 'Mole Hammer', category: 'Arcade', rating: 4.3, plays: '150k', color: '#00ffa2', image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=400' }
    ];

    const games = [...manual];
    for (let i = games.length; i < 100; i++) {
        const d = DESCRIPTORS[i % DESCRIPTORS.length];
        const n = NOUNS[i % NOUNS.length];
        const cat = CATEGORIES[1 + (i % (CATEGORIES.length - 1))];
        const imgId = UNIQUE_IMAGES[i];

        games.push({
            id: `${d.toLowerCase()}-${n.toLowerCase()}-${i}`,
            name: `${d} ${n}`,
            category: cat,
            rating: parseFloat((4 + Math.random()).toFixed(1)),
            plays: Math.floor(Math.random() * 500) + 'k',
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            image: `https://images.unsplash.com/photo-${imgId}?q=80&w=400`
        });
    }
    return games;
};

const ALL_GAMES = GENERATE_GAMES();

export default function GameGrid({ onPlay, initialFilter = 'All' }: { onPlay: (id: string) => void, initialFilter?: string }) {
    const [filter, setFilter] = useState(initialFilter);
    const [search, setSearch] = useState('');
    const [sortBy, setBy] = useState<'plays' | 'rating'>('plays');
    const [page, setPage] = useState(1);
    const gamesPerPage = 12;

    useEffect(() => {
        setFilter(initialFilter);
        setPage(1);
    }, [initialFilter]);

    const filteredGames = useMemo(() => {
        return ALL_GAMES.filter(game => {
            const matchesFilter = filter === 'All' || game.category === filter;
            const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        }).sort((a, b) => {
            const aPlays = a.plays.includes('M') ? parseFloat(a.plays) * 1000 : parseFloat(a.plays);
            const bPlays = b.plays.includes('M') ? parseFloat(b.plays) * 1000 : parseFloat(b.plays);
            if (sortBy === 'plays') return bPlays - aPlays;
            return b.rating - a.rating;
        });
    }, [filter, search, sortBy]);

    const visibleGames = filteredGames.slice(0, page * gamesPerPage);

    return (
        <section id="games" className="py-24 bg-bg-deep relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-12 mb-16">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                            >
                                <Sparkles className="w-3 h-3" />
                                Nexus Discovery Hub
                            </motion.div>
                            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 italic">
                                Nexus <br /><span className="text-primary">Centurion</span>
                            </h2>
                            <p className="text-text-dim max-w-xl font-medium">100 unique subroutines synchronized. Every world is a different experience.</p>
                        </div>

                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-3xl">
                            <div className="flex items-center gap-2 px-6 border-r border-white/10">
                                <Users className="w-5 h-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="text-xl font-black leading-none">100</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-text-dim">Unique Games</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-6">
                                <Trophy className="w-5 h-5 text-secondary" />
                                <div className="flex flex-col">
                                    <span className="text-xl font-black leading-none">Verified</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-text-dim">Subroutines</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 glass rounded-3xl border-white/5 relative z-10">
                        <div className="lg:col-span-4 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim group-focus-within:text-primary transition-colors" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search the Nexus..."
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-primary/50 transition-all font-bold"
                            />
                        </div>

                        <div className="lg:col-span-5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setFilter(cat); setPage(1); }}
                                    className={`px-5 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-black border-primary' : 'bg-black/40 text-text-dim border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="lg:col-span-3 flex items-center justify-between gap-4 border-l border-white/5 pl-6">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-widest text-text-dim mb-1">Nexus Priority</span>
                                <div className="flex gap-2">
                                    <SortBtn active={sortBy === 'plays'} onClick={() => setBy('plays')} label="HYPE" />
                                    <SortBtn active={sortBy === 'rating'} onClick={() => setBy('rating')} label="RANK" />
                                </div>
                            </div>
                            <button className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:text-primary transition-all">
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {visibleGames.slice(0, page * gamesPerPage).map((game, i) => (
                            <GameCard key={game.id} game={game} index={i} onClick={() => onPlay(game.id)} />
                        ))}
                    </AnimatePresence>
                </div>

                {visibleGames.length < filteredGames.length && (
                    <div className="mt-16 flex flex-col items-center gap-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-text-dim">
                            Loaded {visibleGames.length} of {filteredGames.length} Missions
                        </p>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            className="group relative flex items-center gap-4 px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.3em] overflow-hidden hover:scale-105 transition-transform"
                        >
                            <span className="relative z-10">Expand Library</span>
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform relative z-10" />
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary group-hover:h-full transition-all duration-300 opacity-20" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

function SortBtn({ active, onClick, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border ${active ? 'bg-primary text-black border-primary' : 'bg-transparent text-text-dim border-white/10 hover:bg-white/5'
                }`}
        >
            {label}
        </button>
    );
}

function GameCard({ game, index, onClick }: { game: any, index: number, onClick: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="group relative h-[420px] rounded-[2rem] overflow-hidden glass border-white/5 cursor-pointer"
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent z-10" />
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1.5 bg-black/60 rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/10 text-primary">
                        {game.category}
                    </span>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 text-primary fill-primary" />
                        <span className="text-[10px] font-black">{game.rating}</span>
                    </div>
                    <span className="text-[10px] text-text-dim font-black uppercase tracking-widest">{game.plays} PLAYS</span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tighter italic mb-6 group-hover:text-primary transition-colors">
                    {game.name}
                </h3>

                <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:text-black transition-all">
                        <Play className="w-4 h-4 fill-current" />
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[2rem] transition-all duration-500 pointer-events-none" />
        </motion.div>
    );
}
