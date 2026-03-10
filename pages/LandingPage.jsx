
// import React, { useEffect, useState } from 'react';
// import { Icon } from '../components/Icon.jsx';
// import { Link } from 'react-router-dom';

// const SUITES = [
//     { id: 'career', label: 'Career', icon: 'briefcase', path: '/career', color: 'from-violet-500 to-indigo-500', border: 'group-hover:border-indigo-500/50', text: 'text-indigo-200', desc: 'Resume, Cover Letter & Interview Prep' },
//     { id: 'business', label: 'Business', icon: 'trending-up', path: '/business', color: 'from-amber-400 to-orange-500', border: 'group-hover:border-amber-500/50', text: 'text-amber-200', desc: 'Plans, Pitch Decks & Legal Docs' },
//     { id: 'finance', label: 'Finance', icon: 'landmark', path: '/finance', color: 'from-emerald-400 to-teal-500', border: 'group-hover:border-emerald-500/50', text: 'text-emerald-200', desc: 'Tax, Budgeting & Investment Analysis' },
//     { id: 'coding', label: 'Coding', icon: 'terminal', path: '/coding', color: 'from-blue-500 to-cyan-500', border: 'group-hover:border-cyan-500/50', text: 'text-cyan-200', desc: 'Snippets, Scripts & Micro-Apps' },
//     { id: 'productivity', label: 'Productivity', icon: 'check-circle', path: '/productivity', color: 'from-fuchsia-500 to-pink-500', border: 'group-hover:border-pink-500/50', text: 'text-pink-200', desc: 'Planners, Habits & Notion Templates' },
//     { id: 'education', label: 'Education', icon: 'graduation-cap', path: '/education', color: 'from-sky-400 to-indigo-500', border: 'group-hover:border-sky-500/50', text: 'text-sky-200', desc: 'Study Notes, Exam Guides & Flashcards' },
//     { id: 'creative', label: 'Creativity', icon: 'palette', path: '/creativity', color: 'from-rose-400 to-red-500', border: 'group-hover:border-rose-500/50', text: 'text-rose-200', desc: 'Social Content, Scripts & Design' },
//     { id: 'lifestyle', label: 'Lifestyle', icon: 'heart', path: '/lifestyle', color: 'from-lime-400 to-green-500', border: 'group-hover:border-lime-500/50', text: 'text-lime-200', desc: 'Meal Plans, Fitness & Event Planning' },
// ];

// export const LandingPage = () => {
//     const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
//     // Smooth mouse movement for parallax
//     useEffect(() => {
//         let rafId;
//         const handleMouseMove = (e) => {
//             rafId = requestAnimationFrame(() => {
//                 setMousePos({
//                     x: (e.clientX / window.innerWidth) * 2 - 1,
//                     y: (e.clientY / window.innerHeight) * 2 - 1
//                 });
//             });
//         };
//         window.addEventListener('mousemove', handleMouseMove);
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             cancelAnimationFrame(rafId);
//         };
//     }, []);

//     return (
//         // Changed to a rich dark gradient background for better aesthetics
//         <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#0f172a] to-[#020617] text-white flex flex-col relative overflow-hidden font-sans selection:bg-indigo-500/30">
            
//             {/* --- Premium Animated Background --- */}
//             <div className="absolute inset-0 pointer-events-none z-0">
//                 {/* 1. Deep Atmospheric Glows (Parallax) */}
//                 <div 
//                     className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-600/10 rounded-full blur-[120px] transition-transform duration-1000 ease-out will-change-transform mix-blend-screen"
//                     style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
//                 ></div>
//                 <div 
//                     className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px] transition-transform duration-1000 ease-out will-change-transform mix-blend-screen"
//                     style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
//                 ></div>

//                 {/* 2. Grid & Grain Overlay */}
//                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
//                 <div 
//                     className="absolute inset-0 opacity-[0.03]"
//                     style={{ 
//                         backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
//                         backgroundSize: '50px 50px'
//                     }}
//                 ></div>

//                 {/* 3. Dynamic Particles & Rings */}
//                 <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="50%" cy="50%" r="40%" fill="none" stroke="url(#gradStroke)" strokeWidth="0.5" className="animate-spin-slower" strokeDasharray="10 10" opacity="0.3" />
//                     <circle cx="50%" cy="50%" r="28%" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
                    
//                     <defs>
//                         <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
//                             <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
//                             <stop offset="50%" stopColor="rgba(99, 102, 241, 0.3)" />
//                             <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
//                         </linearGradient>
//                     </defs>

//                     {/* Floating Orbs */}
//                     {[...Array(15)].map((_, i) => (
//                         <circle
//                             key={i}
//                             cx={`${Math.random() * 100}%`}
//                             cy={`${Math.random() * 100}%`}
//                             r={Math.random() * 2 + 1}
//                             fill="#818cf8"
//                             opacity={Math.random() * 0.4 + 0.1}
//                             className="animate-pulse-soft"
//                             style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${3 + Math.random() * 3}s` }}
//                         />
//                     ))}
//                 </svg>
//             </div>

//             {/* --- Header --- */}
//             <header className="relative z-50 p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto w-full animate-fade-in-up">
//                 <div className="flex items-center gap-3">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
//                         <div className="relative bg-white/5 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
//                             <Icon name="sparkles" className="text-indigo-300 group-hover:text-white transition-colors" size={24} />
//                         </div>
//                     </div>
//                     <span className="text-2xl font-bold tracking-tight text-white">Stratify <span className="text-indigo-400 font-light">AI</span></span>
//                 </div>
//                 {/* Optional: Add a subtle CTA in header */}
//                 <div className="hidden md:flex gap-4">
//                     <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</button>
//                     <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</button>
//                 </div>
//             </header>

//             {/* --- Main Content --- */}
//             <main className="relative z-10 flex-grow flex flex-col items-center px-6 py-12 md:py-20">
                
//                 {/* Hero Text */}
//                 <div className="text-center max-w-5xl mx-auto mb-24 space-y-8">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium backdrop-blur-md animate-fade-in-up shadow-[0_0_20px_rgba(99,102,241,0.15)]">
//                         <span className="relative flex h-2 w-2">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//                         </span>
//                         The AI Operating System for Success
//                     </div>
                    
//                     <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
//                         <span className="block text-slate-100 pb-2 drop-shadow-xl">Master Your</span>
//                         <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-300 drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
//                             Digital Life
//                         </span>
//                     </h1>
                    
//                     <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
//                         Eight powerful suites. One centralized intelligence. Accelerate your career, business, and lifestyle with premium AI agents.
//                     </p>
//                 </div>

//                 {/* Cards Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full px-4 perspective-1000">
//                     {SUITES.map((suite, index) => (
//                         <Link 
//                             to={suite.path} 
//                             key={suite.id}
//                             className="group relative h-[280px] animate-fade-in-up"
//                             style={{ animationDelay: `${300 + (index * 100)}ms` }}
//                         >
//                             {/* Card Glow Effect - Enhanced colors */}
//                             <div className={`absolute -inset-0.5 bg-gradient-to-b ${suite.color} rounded-[2rem] opacity-0 group-hover:opacity-30 blur-2xl transition duration-500`}></div>
                            
//                             {/* Card Content - Lighter background for 'Lite Dark' feel */}
//                             <div className={`relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.8rem] p-8 flex flex-col items-start overflow-hidden transition-all duration-500 group-hover:-translate-y-2 ${suite.border} hover:bg-white/10 hover:border-white/20 hover:shadow-2xl`}>
                                
//                                 {/* Spotlight Gradient inside card */}
//                                 <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

//                                 {/* Icon - Enhanced background */}
//                                 <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${suite.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-500 shadow-lg border border-white/10`}>
//                                     <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
//                                     <Icon name={suite.icon} size={26} className="text-white relative z-10" />
//                                 </div>

//                                 {/* Text */}
//                                 <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 transition-colors">
//                                     {suite.label}
//                                 </h2>
//                                 <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
//                                     {suite.desc}
//                                 </p>

//                                 {/* Action Arrow */}
//                                 <div className={`mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${suite.text} opacity-80 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0`}>
//                                     Launch <Icon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform" />
//                                 </div>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </main>

//             <footer className="relative z-10 text-center py-10 border-t border-white/5 bg-[#020617]/50 backdrop-blur-md mt-12">
//                 <p className="text-slate-500 text-sm font-light flex items-center justify-center gap-2">
//                     &copy; 2025 Stratify AI <span className="w-1 h-1 rounded-full bg-indigo-500"></span> Crafted for Excellence
//                 </p>
//             </footer>
//         </div>
//     );
// };

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Galaxy from '../components/Galaxy.jsx';
import { Icon } from '../components/Icon.jsx';
import webLogo from '../assets/webLogo.png';

const SUITES = [
  { id: 'career', label: 'Career', icon: 'briefcase', path: '/career', color: 'from-indigo-600 to-purple-700', desc: 'Resume, Cover Letter & Interview Prep' },
  { id: 'business', label: 'Business', icon: 'trending-up', path: '/business', color: 'from-amber-600 to-orange-700', desc: 'Plans, Pitch Decks & Legal Docs' },
  { id: 'finance', label: 'Finance', icon: 'landmark', path: '/finance', color: 'from-emerald-600 to-teal-700', desc: 'Tax, Budgeting & Investment Analysis' },
  { id: 'coding', label: 'Coding', icon: 'terminal', path: '/coding', color: 'from-blue-600 to-cyan-700', desc: 'Snippets, Scripts & Micro-Apps' },
  { id: 'productivity', label: 'Productivity', icon: 'check-circle', path: '/productivity', color: 'from-purple-600 to-pink-700', desc: 'Planners, Habits & Notion Templates' },
  { id: 'education', label: 'Education', icon: 'graduation-cap', path: '/education', color: 'from-sky-600 to-indigo-700', desc: 'Study Notes, Exam Guides & Flashcards' },
  { id: 'creative', label: 'Creativity', icon: 'palette', path: '/creativity', color: 'from-rose-600 to-red-700', desc: 'Social Content, Scripts & Design' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'heart', path: '/lifestyle', color: 'from-emerald-600 to-green-700', desc: 'Meal Plans, Fitness & Events' },
];

export const LandingPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [tilt, setTilt] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setTilt((prev) => ({
      ...prev,
      [id]: {
        transform: `
          perspective(1200px)
          rotateX(${(-y / 18)}deg)
          rotateY(${(x / 18)}deg)
          translateY(-14px)
        `
      }
    }));
  };

  const resetTilt = (id) => {
    setTilt((prev) => ({
      ...prev,
      [id]: {
        transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
      }
    }));
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
          <ambientLight intensity={0.7} />
          <Galaxy isLight={!isDark} />
          <Stars radius={120} depth={80} count={5000} factor={3} fade />
        </Canvas>
      </div>

      <div className="relative z-10">

        {/* Header */}
        <header className="max-w-7xl mx-auto px-8 py-16 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <img src={webLogo} className="w-14 h-14 rounded-full shadow-2xl" />
            <span className="text-3xl tracking-widest">
              Stratify<span className="text-indigo-500 font-medium">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl"
            >
              <Icon name={isDark ? 'moon' : 'sun'} />
            </button>
            <Link to="/signin" className="opacity-70 hover:opacity-100">Sign In</Link>
            <Link to="/signup">
              <button className="px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 shadow-xl">
                Get Started
              </button>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <main className="text-center px-8 py-32 max-w-6xl mx-auto">
          <p className="uppercase tracking-widest opacity-60 mb-12">
            The AI Operating System for Success
          </p>

          <h1 className="text-7xl md:text-9xl font-light mb-10 leading-tight">
            Master Your<br />
            <span className="font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Digital Empire
            </span>
          </h1>

          <p className="text-xl md:text-2xl opacity-70 max-w-3xl mx-auto">
            Eight elite AI suites designed to elevate careers, businesses, and legacies.
          </p>
        </main>

        {/* Suites */}
        <section className="max-w-7xl mx-auto px-8 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {SUITES.map((suite) => (
              <Link key={suite.id} to={suite.path} className="group">
                <div
                  onMouseMove={(e) => handleMove(e, suite.id)}
                  onMouseLeave={() => resetTilt(suite.id)}
                  style={tilt[suite.id]}
                  className={`
                    relative h-96 rounded-3xl overflow-hidden
                    transition-all duration-500 ease-out
                    hover:scale-[1.03]
                    border
                    ${isDark
                      ? 'bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-white/20'
                      : 'bg-white/60 border-gray-200/60'}
                    backdrop-blur-2xl
                    shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]
                  `}
                >

                  {/* Neon Glow */}
                  <div
                    className={`
                      absolute -inset-40
                      opacity-0 group-hover:opacity-50
                      transition duration-700
                      blur-[120px]
                      bg-gradient-to-br ${suite.color}
                    `}
                  />

                  {/* Border Shine */}
                  <div
                    className="
                      absolute inset-0 rounded-3xl
                      opacity-0 group-hover:opacity-100
                      transition duration-500
                      bg-gradient-to-br from-white/30 via-transparent to-transparent
                      pointer-events-none
                    "
                  />

                  <div className="relative z-10 p-12 flex flex-col h-full">

                    {/* Icon */}
                    <div
                      className={`
                        w-20 h-20 rounded-3xl mb-10 flex items-center justify-center
                        bg-gradient-to-br ${suite.color}
                        text-white
                        shadow-[0_0_40px_rgba(99,102,241,0.6)]
                        animate-[float_6s_ease-in-out_infinite]
                      `}
                    >
                      <Icon name={suite.icon} size={40} />
                    </div>

                    <h3 className="text-3xl font-semibold tracking-wide mb-6">
                      {suite.label}
                    </h3>

                    <p className="text-sm opacity-75 flex-grow">
                      {suite.desc}
                    </p>

                    <div className="mt-10 flex items-center gap-3 font-medium text-indigo-400">
                      Explore <Icon name="arrow-right" size={18} />
                    </div>

                  </div>
                </div>
              </Link>
            ))}

          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 text-center text-sm opacity-50">
          © 2025 Stratify AI • Engineered for Excellence
        </footer>

      </div>
    </div>
  );
};

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Briefcase, FileText, BookOpen, ArrowRight } from "lucide-react";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="px-6 py-16"> {/* <-- Added wrapper div */}

//       {/* Header */}
//       <div className="text-center mb-20">
//         <h1 className="text-6xl font-extrabold text-slate-900">
//           Transform Your Ideas into{" "}
//           <span className="text-[#0EA5E9]">Corporate Assets</span>
//         </h1>
//         <p className="text-slate-600 mt-6 text-xl max-w-3xl mx-auto">
//           Generate resumes, business plans & study guides using AI.
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="grid md:grid-cols-3 gap-8">

//         {/* Resume */}
//         <div
//           onClick={() => navigate("/resume")}
//           className="p-8 bg-white rounded-xl shadow-md border-t-4 border-blue-600 hover:shadow-xl cursor-pointer flex flex-col text-center"
//         >
//           <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-6">
//             <FileText className="w-10 h-10 text-blue-600" />
//           </div>
//           <h3 className="text-2xl font-bold mb-4">Resume Builder</h3>
//           <p className="text-slate-600 mb-8">Create ATS-friendly resumes instantly.</p>
//           <button className="text-blue-600 font-bold flex items-center gap-2 mx-auto">
//             Start Building <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* Business */}
//         <div
//           onClick={() => navigate("/business")}
//           className="p-8 bg-white rounded-xl shadow-md border-t-4 border-emerald-500 hover:shadow-xl cursor-pointer flex flex-col text-center"
//         >
//           <div className="w-20 h-20 bg-emerald-50 rounded-full mx-auto flex items-center justify-center mb-6">
//             <Briefcase className="w-10 h-10 text-emerald-500" />
//           </div>
//           <h3 className="text-2xl font-bold mb-4">Business Planner</h3>
//           <p className="text-slate-600 mb-8">Generate business plans, SWOT & strategies.</p>
//           <button className="text-emerald-600 font-bold flex items-center gap-2 mx-auto">
//             Start Planning <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* Study */}
//         <div
//           onClick={() => navigate("/study")}
//           className="p-8 bg-white rounded-xl shadow-md border-t-4 border-purple-500 hover:shadow-xl cursor-pointer flex flex-col text-center"
//         >
//           <div className="w-20 h-20 bg-purple-50 rounded-full mx-auto flex items-center justify-center mb-6">
//             <BookOpen className="w-10 h-10 text-purple-500" />
//           </div>
//           <h3 className="text-2xl font-bold mb-4">Study Companion</h3>
//           <p className="text-slate-600 mb-8">Summaries, chapters & MCQs from study material.</p>
//           <button className="text-purple-600 font-bold flex items-center gap-2 mx-auto">
//             Start Studying <ArrowRight size={16} />
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
