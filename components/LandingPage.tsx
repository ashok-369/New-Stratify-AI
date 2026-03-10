
import React, { useEffect, useState } from 'react';
import { Icon } from './Icon.tsx';
import { Link } from 'react-router-dom';

const SUITES = [
    { id: 'career', label: 'Career', icon: 'briefcase', path: '/career', color: 'from-blue-400 to-blue-600', border: 'group-hover:border-blue-500/50', text: 'text-blue-200', desc: 'Resume, Cover Letter & Interview Prep' },
    { id: 'business', label: 'Business', icon: 'trending-up', path: '/business', color: 'from-amber-400 to-amber-600', border: 'group-hover:border-amber-500/50', text: 'text-amber-200', desc: 'Plans, Pitch Decks & Legal Docs' },
    { id: 'finance', label: 'Finance', icon: 'landmark', path: '/finance', color: 'from-emerald-400 to-emerald-600', border: 'group-hover:border-emerald-500/50', text: 'text-emerald-200', desc: 'Tax, Budgeting & Investment Analysis' },
    { id: 'coding', label: 'Coding', icon: 'terminal', path: '/coding', color: 'from-indigo-400 to-indigo-600', border: 'group-hover:border-indigo-500/50', text: 'text-indigo-200', desc: 'Snippets, Scripts & Micro-Apps' },
    { id: 'productivity', label: 'Productivity', icon: 'check-circle', path: '/productivity', color: 'from-teal-400 to-teal-600', border: 'group-hover:border-teal-500/50', text: 'text-teal-200', desc: 'Planners, Habits & Notion Templates' },
    { id: 'education', label: 'Education', icon: 'graduation-cap', path: '/education', color: 'from-violet-400 to-violet-600', border: 'group-hover:border-violet-500/50', text: 'text-violet-200', desc: 'Study Notes, Exam Guides & Flashcards' },
    { id: 'creative', label: 'Creativity', icon: 'palette', path: '/creativity', color: 'from-pink-400 to-pink-600', border: 'group-hover:border-pink-500/50', text: 'text-pink-200', desc: 'Social Content, Scripts & Design' },
    { id: 'lifestyle', label: 'Lifestyle', icon: 'heart', path: '/lifestyle', color: 'from-orange-400 to-orange-600', border: 'group-hover:border-orange-500/50', text: 'text-orange-200', desc: 'Meal Plans, Fitness & Event Planning' },
];

export const LandingPage = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    // Smooth mouse movement for parallax
    useEffect(() => {
        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            rafId = requestAnimationFrame(() => {
                setMousePos({
                    x: (e.clientX / window.innerWidth) * 2 - 1,
                    y: (e.clientY / window.innerHeight) * 2 - 1
                });
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden font-sans selection:bg-indigo-500/30">
            
            {/* --- Premium Animated Background --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* 1. Deep Atmospheric Glows (Parallax) */}
                <div 
                    className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[120px] transition-transform duration-1000 ease-out will-change-transform"
                    style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
                ></div>
                <div 
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[100px] transition-transform duration-1000 ease-out will-change-transform"
                    style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
                ></div>

                {/* 2. Grid & Grain Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* 3. Dynamic Particles & Rings */}
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50%" cy="50%" r="35%" fill="none" stroke="url(#gradStroke)" strokeWidth="0.5" className="animate-spin-slower" strokeDasharray="10 10" opacity="0.3" />
                    <circle cx="50%" cy="50%" r="25%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />
                    
                    <defs>
                        <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>

                    {/* Floating Orbs */}
                    {[...Array(12)].map((_, i) => (
                        <circle
                            key={i}
                            cx={`${Math.random() * 100}%`}
                            cy={`${Math.random() * 100}%`}
                            r={Math.random() * 2 + 1}
                            fill="#FFF"
                            opacity={Math.random() * 0.5 + 0.1}
                            className="animate-pulse-soft"
                            style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3 + Math.random() * 2}s` }}
                        />
                    ))}
                </svg>
            </div>

            {/* --- Header --- */}
            <header className="relative z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full animate-fade-in-up">
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-white/5 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                            <Icon name="sparkles" className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={24} />
                        </div>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white/90">Stratify <span className="text-white/40 font-light">AI</span></span>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="relative z-10 flex-grow flex flex-col items-center px-6 py-12 md:py-20">
                
                {/* Hero Text */}
                <div className="text-center max-w-5xl mx-auto mb-20 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium backdrop-blur-md animate-fade-in-up shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        The AI Operating System for Success
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 pb-2">Master Your</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-blue-300 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                            Digital Life
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Eight powerful suites. One centralized intelligence. Accelerate your career, business, and lifestyle with premium AI agents.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full px-4 perspective-1000">
                    {SUITES.map((suite, index) => (
                        <Link 
                            to={suite.path} 
                            key={suite.id}
                            className="group relative h-[280px] animate-fade-in-up"
                            style={{ animationDelay: `${300 + (index * 100)}ms` }}
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-b ${suite.color} rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition duration-500`}></div>
                            
                            {/* Card Content */}
                            <div className={`relative h-full bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/5 rounded-[1.8rem] p-8 flex flex-col items-start overflow-hidden transition-all duration-500 group-hover:-translate-y-2 ${suite.border} hover:bg-[#0f1629]`}>
                                
                                {/* Spotlight Gradient inside card */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Icon */}
                                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${suite.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                                    <Icon name={suite.icon} size={26} className="text-white relative z-10" />
                                </div>

                                {/* Text */}
                                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                    {suite.label}
                                </h2>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                                    {suite.desc}
                                </p>

                                {/* Action Arrow */}
                                <div className={`mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${suite.text} opacity-60 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0`}>
                                    Launch <Icon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="relative z-10 text-center py-10 border-t border-white/5 bg-[#020617]/50 backdrop-blur-md">
                <p className="text-white/20 text-sm font-light flex items-center justify-center gap-2">
                    &copy; 2025 Stratify AI <span className="w-1 h-1 rounded-full bg-white/20"></span> Crafted for Excellence
                </p>
            </footer>
        </div>
    );
};
