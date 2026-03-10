
import React, { useState } from 'react';
import { Icon } from './Icon.tsx';
import { generateLifestyleContent } from '../services/geminiService.ts';
import { LifestyleParams } from '../types.ts';

// Helper for exporting
const exportToPNG = (id: string, fileName: string) => {
    // @ts-ignore
    if (typeof window.html2canvas !== 'undefined') {
        const element = document.getElementById(id);
        if(!element) return;
        
        // @ts-ignore
        window.html2canvas(element, { 
            useCORS: true,
            scale: 2, // Better resolution
            backgroundColor: null // Capture transparency/background correctly
        }).then((canvas: any) => {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        alert("Download feature requires html2canvas library to be loaded.");
    }
};

// 1. Wedding Inviter
export const WeddingInviter = () => {
    const [details, setDetails] = useState({
        couple: '',
        date: '',
        venue: '',
        rsvp: ''
    });
    const [theme, setTheme] = useState('classic');

    const themes = {
        classic: "bg-white text-stone-800 border-4 border-double border-stone-300 font-serif",
        floral: "bg-rose-50 text-rose-900 border-4 border-rose-200 font-serif",
        modern: "bg-slate-900 text-white border-none font-sans tracking-widest"
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            <div className="w-full lg:w-1/3 space-y-4">
                <input value={details.couple} onChange={e => setDetails({...details, couple: e.target.value})} placeholder="Couple Names (e.g. Jack & Rose)" className="w-full p-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-rose-200 outline-none" />
                <input value={details.date} onChange={e => setDetails({...details, date: e.target.value})} placeholder="Date & Time" className="w-full p-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-rose-200 outline-none" />
                <input value={details.venue} onChange={e => setDetails({...details, venue: e.target.value})} placeholder="Venue Address" className="w-full p-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-rose-200 outline-none" />
                <input value={details.rsvp} onChange={e => setDetails({...details, rsvp: e.target.value})} placeholder="RSVP Details" className="w-full p-3 border rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-rose-200 outline-none" />
                
                <div className="flex gap-2">
                    {Object.keys(themes).map(t => (
                        <button key={t} onClick={() => setTheme(t)} className={`px-3 py-2 capitalize rounded border ${theme === t ? 'bg-stone-800 text-white' : 'bg-white text-gray-700'}`}>
                            {t}
                        </button>
                    ))}
                </div>
                <button onClick={() => exportToPNG('wedding-invite', 'invitation.png')} className="w-full bg-stone-800 text-white py-3 rounded flex justify-center items-center gap-2">
                    <Icon name="download" size={16} /> Download
                </button>
            </div>
            
            <div className="w-full lg:w-2/3 bg-gray-100 flex items-center justify-center p-8 rounded-xl">
                <div id="wedding-invite" className={`w-[400px] h-[600px] p-8 flex flex-col justify-center items-center text-center shadow-2xl transition-all ${themes[theme as keyof typeof themes]}`}>
                    <div className="text-sm uppercase tracking-[0.3em] mb-8">You Are Invited to the Wedding of</div>
                    <h1 className="text-5xl mb-6 leading-tight">{details.couple || "Couple Name"}</h1>
                    <div className="w-16 h-[1px] bg-current mb-6 opacity-50"></div>
                    <div className="text-xl mb-2">{details.date || "Date & Time"}</div>
                    <div className="text-lg opacity-80 mb-12">{details.venue || "Venue Location"}</div>
                    <div className="text-xs uppercase tracking-wider mt-auto opacity-60">{details.rsvp || "RSVP Info"}</div>
                </div>
            </div>
        </div>
    );
};

// 2. Birthday Flyer
export const BirthdayMaker = () => {
    const [details, setDetails] = useState({
        name: '',
        age: '',
        date: '',
        time: '',
        location: '',
        rsvp: ''
    });
    const [activeThemeId, setActiveThemeId] = useState('vibrant');

    const themes = [
        {
            id: 'vibrant',
            name: 'Vibrant Pop',
            containerClass: 'bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 text-white',
            titleClass: 'font-black text-6xl uppercase tracking-tighter drop-shadow-md',
            subtitleClass: 'font-bold text-2xl uppercase tracking-wide bg-white text-pink-500 px-4 py-1 rounded-full transform -rotate-2 inline-block mb-4 shadow-lg',
            bodyClass: 'font-medium text-white/90',
            borderClass: 'p-6 border-4 border-white/30 h-full rounded-2xl flex flex-col items-center justify-center',
            icon: '🎉'
        },
        {
            id: 'elegant',
            name: 'Midnight Gala',
            containerClass: 'bg-neutral-900 text-[#D4AF37] border-[16px] border-double border-[#D4AF37]',
            titleClass: 'font-serif italic text-6xl tracking-wide text-[#FCF6BA] drop-shadow-[0_2px_10px_rgba(197,160,89,0.3)]',
            subtitleClass: 'font-sans text-xs tracking-[0.3em] uppercase text-neutral-400 mb-6',
            bodyClass: 'font-serif text-[#F3E5AB] tracking-wide',
            borderClass: 'p-8 border border-[#D4AF37] h-full flex flex-col justify-center items-center',
            icon: '✨'
        },
        {
            id: 'retro',
            name: 'Retro Disco',
            containerClass: 'bg-[#2a0a4e] text-[#0ff]',
            titleClass: 'font-mono text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0ff] to-[#f0f] drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)]',
            subtitleClass: 'font-mono text-xl text-[#f0f] mt-2 mb-6',
            bodyClass: 'font-mono text-cyan-200',
            borderClass: 'p-6 border-4 border-[#f0f] border-dashed rounded-3xl h-full flex flex-col items-center justify-center',
            icon: '🪩'
        },
        {
            id: 'kids',
            name: 'Playful Day',
            containerClass: 'bg-[#eff6ff] text-[#1e3a8a] relative overflow-hidden',
            titleClass: 'font-black text-6xl text-[#3b82f6] drop-shadow-[3px_3px_0px_#93c5fd]',
            subtitleClass: 'font-bold text-2xl text-[#f59e0b] mb-4',
            bodyClass: 'font-bold text-slate-600',
            borderClass: 'p-6 border-[8px] border-dashed border-[#60a5fa] rounded-[3rem] bg-white h-full flex flex-col items-center justify-center',
            icon: '🎈'
        },
        {
            id: 'minimal',
            name: 'Swiss Minimal',
            containerClass: 'bg-white text-black',
            titleClass: 'font-sans font-black text-7xl leading-none tracking-tighter',
            subtitleClass: 'font-sans text-xl font-normal text-gray-500 mb-8',
            bodyClass: 'font-sans text-gray-900 font-medium',
            borderClass: 'p-10 border-l-[20px] border-black h-full flex flex-col justify-between items-start text-left',
            icon: ''
        }
    ];

    const currentTheme = themes.find(t => t.id === activeThemeId) || themes[0];

    const handleChange = (e: any) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[600px]">
            {/* Controls */}
            <div className="w-full lg:w-1/3 space-y-6 overflow-y-auto pr-2">
                {/* Inputs */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-stone-700 flex items-center gap-2">
                        <Icon name="pen-tool" size={18} /> Party Details
                    </h3>
                    <input name="name" value={details.name} onChange={handleChange} placeholder="Honoree Name (e.g. Alex)" className="w-full p-3 border border-stone-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                    <input name="age" value={details.age} onChange={handleChange} placeholder="Age (e.g. 30th)" className="w-full p-3 border border-stone-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                    <div className="grid grid-cols-2 gap-3">
                        <input name="date" value={details.date} onChange={handleChange} placeholder="Date (e.g. Oct 20)" className="w-full p-3 border border-stone-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                        <input name="time" value={details.time} onChange={handleChange} placeholder="Time (e.g. 7 PM)" className="w-full p-3 border border-stone-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                    </div>
                    <input name="location" value={details.location} onChange={handleChange} placeholder="Location" className="w-full p-3 border border-stone-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                    <input name="rsvp" value={details.rsvp} onChange={handleChange} placeholder="RSVP Info" className="w-full p-3 border border-stone-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                </div>

                {/* Theme Selector */}
                <div>
                    <h3 className="text-lg font-bold text-stone-700 mb-3 flex items-center gap-2">
                        <Icon name="palette" size={18} /> Theme
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => setActiveThemeId(theme.id)}
                                className={`p-3 rounded-lg text-sm font-medium border text-left transition-all flex items-center gap-2 ${activeThemeId === theme.id ? 'border-purple-500 ring-1 ring-purple-500 bg-purple-50 text-purple-900' : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'}`}
                            >
                                <div className={`w-4 h-4 rounded-full border shadow-sm ${theme.id === 'vibrant' ? 'bg-orange-400' : theme.id === 'elegant' ? 'bg-black' : theme.id === 'kids' ? 'bg-blue-400' : 'bg-white'}`}></div>
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={() => exportToPNG('birthday-flyer', 'birthday_flyer.png')} className="w-full bg-stone-800 hover:bg-stone-900 text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-4 transform hover:-translate-y-0.5">
                    <Icon name="download" /> Download Flyer (PNG)
                </button>
            </div>

            {/* Preview Area */}
            <div className="w-full lg:w-2/3 bg-stone-100/50 rounded-2xl flex items-center justify-center p-8 overflow-hidden border border-stone-200">
                <div 
                    id="birthday-flyer" 
                    className={`relative w-full max-w-md aspect-[3/4] shadow-2xl transition-all duration-500 p-4 ${currentTheme.containerClass}`}
                >
                    <div className={`w-full h-full ${currentTheme.borderClass}`}>
                        {activeThemeId === 'minimal' ? (
                            <>
                                <div className="space-y-4 w-full">
                                    <div className="text-xs uppercase tracking-widest border-b border-black pb-2 mb-8 font-bold">You Are Invited</div>
                                    <h1 className={currentTheme.titleClass}>
                                        {details.name || "NAME"}
                                        <br/>
                                        <span className="text-gray-300">IS TURNING</span>
                                        <br/>
                                        {details.age || "AGE"}
                                    </h1>
                                </div>
                                <div className="w-full space-y-4 mt-auto">
                                    <div className="border-t border-black pt-4 grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="font-bold text-xs uppercase text-gray-400 mb-1">When</div>
                                            <div className="text-xl font-bold">{details.date || "Date"}</div>
                                            <div className="text-lg text-gray-600">{details.time || "Time"}</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-xs uppercase text-gray-400 mb-1">Where</div>
                                            <div className="text-xl font-bold leading-tight">{details.location || "Location Address"}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-mono text-gray-500 mt-8">
                                        RSVP: {details.rsvp || "Contact Info"}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center h-full w-full">
                                <div className="text-5xl mb-6 animate-bounce">{currentTheme.icon}</div>
                                <div className={currentTheme.subtitleClass}>Let's Celebrate!</div>
                                <h1 className={`mb-2 leading-none ${currentTheme.titleClass}`}>
                                    {details.name || "Name"}
                                </h1>
                                <div className="text-3xl font-bold mb-8 opacity-90">{details.age || "Age"} B-Day</div>
                                
                                <div className={`space-y-3 p-6 rounded-xl w-full max-w-xs mx-auto ${activeThemeId === 'vibrant' ? 'bg-white/20 backdrop-blur-sm shadow-inner' : activeThemeId === 'elegant' ? 'border-t border-b border-[#D4AF37]' : ''} ${currentTheme.bodyClass}`}>
                                    <div className="text-xl font-bold uppercase">{details.date || "OCT 24"} @ {details.time || "8 PM"}</div>
                                    <div className="text-lg opacity-90 leading-tight">{details.location || "123 Party Lane, City"}</div>
                                    {details.rsvp && <div className="text-sm mt-4 font-bold opacity-75 pt-2 border-t border-current/20">RSVP: {details.rsvp}</div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Enhanced Photo Album (Digital Scrapbook)
export const PhotoAlbum = () => {
    const [title, setTitle] = useState('Summer Memories');
    const [layout, setLayout] = useState('polaroid'); // polaroid, grid, scrapbook
    const [photos, setPhotos] = useState<any[]>([]);

    const handleUpload = (e: any) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newPhotos = files.map((file: any) => ({
                id: Date.now() + Math.random(),
                src: URL.createObjectURL(file),
                caption: 'Caption...',
                rotation: Math.random() * 6 - 3, // Small rotation for realism
                tapeRot: Math.random() * 20 - 10
            }));
            setPhotos(prev => [...prev, ...newPhotos]);
        }
    };

    const removePhoto = (id: number) => {
        setPhotos(prev => prev.filter(p => p.id !== id));
    };

    const updateCaption = (id: number, val: string) => {
        setPhotos(prev => prev.map(p => p.id === id ? { ...p, caption: val } : p));
    };

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Controls Toolbar */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-20">
                <div className="flex-1 w-full md:w-auto">
                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Album Title</label>
                    <input 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className="w-full font-bold text-lg outline-none text-navy bg-transparent border-b border-transparent focus:border-navy transition-colors placeholder:text-gray-300" 
                        placeholder="Album Title"
                    />
                </div>
                
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Style</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['grid', 'polaroid', 'scrapbook'].map(l => (
                            <button 
                                key={l}
                                onClick={() => setLayout(l)} 
                                className={`px-4 py-1.5 text-xs font-bold capitalize rounded-md transition-all ${layout === l ? 'bg-white shadow text-navy' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <input type="file" multiple accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full" />
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md">
                            <Icon name="upload" size={16} /> Add Photos
                        </button>
                    </div>

                    <button onClick={() => exportToPNG('photo-album', `${title.replace(/\s/g, '_')}_Album.png`)} className="bg-navy hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-md">
                        <Icon name="download" size={16} /> Save Image
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-gray-100 overflow-y-auto rounded-xl border border-gray-200 p-4 md:p-8 flex justify-center">
                <div 
                    id="photo-album" 
                    className={`
                        min-h-[800px] w-full max-w-[1000px] p-8 md:p-12 transition-all duration-500 relative shadow-2xl origin-top
                        ${layout === 'polaroid' ? 'bg-neutral-900' : ''}
                        ${layout === 'grid' ? 'bg-white' : ''}
                        ${layout === 'scrapbook' ? 'bg-[#fdf6e3]' : ''}
                    `}
                >
                    {/* Album Title */}
                    <h1 className={`text-5xl text-center mb-16 break-words
                        ${layout === 'polaroid' ? 'text-white font-sans font-bold tracking-widest uppercase' : ''}
                        ${layout === 'grid' ? 'text-gray-900 font-serif italic' : ''}
                        ${layout === 'scrapbook' ? 'text-stone-800 font-serif italic underline decoration-wavy decoration-orange-300 decoration-2 underline-offset-8' : ''}
                    `}>
                        {title || 'Untitled Album'}
                    </h1>
                    
                    {photos.length === 0 ? (
                        <div className="border-4 border-dashed border-white/20 h-96 flex flex-col items-center justify-center text-current opacity-50 rounded-xl">
                            <Icon name="camera" size={48} className={`mb-4 ${layout === 'polaroid' ? 'text-white' : 'text-gray-400'}`} />
                            <p className={`text-xl font-medium ${layout === 'polaroid' ? 'text-white' : 'text-gray-500'}`}>Upload photos to create your album</p>
                        </div>
                    ) : (
                        <div className={`
                            ${layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : ''}
                            ${layout === 'polaroid' ? 'flex flex-wrap justify-center gap-8' : ''}
                            ${layout === 'scrapbook' ? 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 p-4' : ''}
                        `}>
                            {photos.map((photo, i) => (
                                <div 
                                    key={photo.id}
                                    className={`relative group break-inside-avoid
                                        ${layout === 'grid' ? 'bg-gray-50' : ''}
                                        ${layout === 'polaroid' ? 'bg-white p-3 pb-16 shadow-xl hover:z-10 hover:scale-105 transition-transform duration-300 w-[260px]' : ''}
                                        ${layout === 'scrapbook' ? 'bg-white p-2 shadow-md border-2 border-gray-100 rotate-1 hover:rotate-0 transition-transform' : ''}
                                    `}
                                    style={layout === 'polaroid' || layout === 'scrapbook' ? { transform: `rotate(${photo.rotation}deg)` } : {}}
                                >
                                    {/* Delete Button */}
                                    <button 
                                        onClick={() => removePhoto(photo.id)}
                                        className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        title="Remove photo"
                                    >
                                        <Icon name="x" size={12} />
                                    </button>

                                    {/* Scrapbook Tape Effect */}
                                    {layout === 'scrapbook' && (
                                        <div 
                                            className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/80 shadow-sm z-10"
                                            style={{ transform: `translateX(-50%) rotate(${photo.tapeRot}deg)` }}
                                        ></div>
                                    )}

                                    {/* Image */}
                                    <div className={`overflow-hidden bg-gray-200 ${layout === 'grid' ? 'aspect-square' : 'aspect-[4/5]'}`}>
                                        <img 
                                            src={photo.src} 
                                            className="w-full h-full object-cover" 
                                            alt="Memory"
                                        />
                                    </div>

                                    {/* Caption */}
                                    <div className={`mt-3 ${layout === 'polaroid' ? 'absolute bottom-4 left-0 right-0 px-4' : ''}`}>
                                        <input 
                                            value={photo.caption}
                                            onChange={(e) => updateCaption(photo.id, e.target.value)}
                                            className={`w-full bg-transparent text-center outline-none
                                                ${layout === 'polaroid' ? 'font-serif text-gray-900 text-lg font-medium' : ''}
                                                ${layout === 'grid' ? 'text-xs font-bold uppercase tracking-wider text-gray-600 py-2' : ''}
                                                ${layout === 'scrapbook' ? 'font-serif text-stone-700 text-sm mt-1 italic' : ''}
                                            `}
                                            placeholder={layout === 'polaroid' ? 'Write caption...' : 'Caption...'}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. Meal Planner
export const MealPlanner = () => {
    const [goal, setGoal] = useState('Healthy Balance');
    const [diet, setDiet] = useState('Omnivore');
    const [duration, setDuration] = useState('3');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        setLoading(true);
        try {
            const res = await generateLifestyleContent({ type: 'meal', data: { goal, diet, duration } });
            setResult(res);
        } catch(e) { console.error(e); }
        setLoading(false);
    };

    const downloadPDF = () => {
        if (!result) return;
        // @ts-ignore
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const width = doc.internal.pageSize.getWidth();
        const margin = 20;
        let y = 0;

        const checkPageBreak = (needed: number) => {
            if (y + needed > 280) {
                doc.addPage();
                y = 20;
            }
        };

        // --- Header Section ---
        doc.setFillColor(255, 138, 76); // Soft Orange
        doc.rect(0, 0, width, 40, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(255, 255, 255);
        doc.text("Meal Plan", margin, 25);
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`${goal} • ${diet} • ${duration} Days`, margin, 35);
        
        y = 55;

        // --- Overview Section ---
        if (result.overview) {
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(234, 88, 12); // Orange-600
            doc.text("Overview", margin, y);
            y += 8;

            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(60, 60, 60);
            
            // Clean markdown bold if any
            const cleanOverview = result.overview.replace(/\*\*/g, '');
            const overviewLines = doc.splitTextToSize(cleanOverview, width - (margin * 2));
            doc.text(overviewLines, margin, y);
            y += (overviewLines.length * 6) + 10;
        }

        // --- Weekly Schedule ---
        if (result.schedule) {
            checkPageBreak(20);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(234, 88, 12);
            doc.text("Schedule", margin, y);
            y += 10;

            result.schedule.forEach((day: any, i: number) => {
                checkPageBreak(40); // Check enough space for at least header and a meal
                
                // Day Header Box
                doc.setFillColor(255, 247, 237); // Very light orange
                doc.setDrawColor(251, 146, 60); // Orange-400
                doc.roundedRect(margin, y, width - (margin * 2), 8, 1, 1, 'F');
                
                doc.setFontSize(11);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(194, 65, 12); // Dark Orange
                doc.text(day.day, margin + 4, y + 5.5);
                y += 14;

                // Meals
                doc.setFontSize(10);
                doc.setTextColor(50, 50, 50);
                
                day.meals.forEach((meal: string) => {
                    const cleanMeal = meal.replace(/\*\*/g, '');
                    const parts = cleanMeal.split(':');
                    let mealType = "";
                    let mealContent = cleanMeal;
                    
                    if (parts.length > 1) {
                        mealType = parts[0] + ":";
                        mealContent = parts.slice(1).join(":").trim();
                    }

                    checkPageBreak(15);
                    
                    // Bullet
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(234, 88, 12);
                    doc.text("•", margin, y);
                    
                    // Type (Bold)
                    let currentX = margin + 5;
                    if (mealType) {
                        doc.setFont("helvetica", "bold");
                        doc.setTextColor(50, 50, 50);
                        doc.text(mealType, currentX, y);
                        currentX += doc.getTextWidth(mealType) + 2;
                    }
                    
                    // Content (Normal)
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(80, 80, 80);
                    const lines = doc.splitTextToSize(mealContent, width - currentX - margin);
                    doc.text(lines, currentX, y);
                    
                    y += (lines.length * 5) + 3;
                });
                y += 4; // Extra spacing between days
            });
            y += 6;
        }

        // --- Shopping List (2 Column Layout) ---
        if (result.shoppingList && result.shoppingList.length > 0) {
            checkPageBreak(40);
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, y, width - margin, y);
            y += 10;

            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(234, 88, 12);
            doc.text("Shopping List", margin, y);
            y += 10;

            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            
            const colWidth = (width - (margin * 2) - 10) / 2;
            let currentColumn = 0; // 0 (left) or 1 (right)
            let rowStartY = y; // Track Y start of the current row (left & right pair)
            let maxRowHeight = 0;

            result.shoppingList.forEach((item: string) => {
                const cleanItem = item.replace(/\*\*/g, ''); 
                const isCategory = cleanItem.trim().endsWith(':');

                if (isCategory) {
                    // Force new row for category, full width
                    if (currentColumn === 1) {
                        y += maxRowHeight + 4;
                        currentColumn = 0;
                        maxRowHeight = 0;
                    }
                    
                    checkPageBreak(15);
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(194, 65, 12); // Darker Orange
                    doc.text(cleanItem, margin, y);
                    y += 8;
                    rowStartY = y;
                    
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(60, 60, 60);
                } else {
                    const x = currentColumn === 0 ? margin : margin + colWidth + 10;
                    
                    // If we just switched to a new row (back to col 0), update rowStartY
                    if (currentColumn === 0) rowStartY = y;

                    const lines = doc.splitTextToSize(cleanItem, colWidth - 8);
                    const h = Math.max(lines.length * 5, 5); // Minimum height for box

                    // Check page break logic (simplified for multi-column)
                    if (y + h > 280) {
                        doc.addPage();
                        y = 20;
                        rowStartY = 20;
                        currentColumn = 0;
                        maxRowHeight = 0;
                    }

                    // Checkbox square
                    doc.setDrawColor(180, 180, 180);
                    doc.rect(x, rowStartY - 4, 3.5, 3.5); 

                    // Text
                    doc.text(lines, x + 6, rowStartY - 1);

                    if (h > maxRowHeight) maxRowHeight = h;

                    if (currentColumn === 1) {
                        y += maxRowHeight + 3; // Advance Y after completing row
                        maxRowHeight = 0;
                        currentColumn = 0;
                    } else {
                        currentColumn = 1;
                    }
                }
            });
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Generated by Stratify AI`, margin, 290);
            doc.text(`Page ${i} of ${pageCount}`, width - margin, 290, { align: 'right' });
        }

        doc.save('Meal_Plan.pdf');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="Goal (e.g. Weight Loss)" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none" />
                <input value={diet} onChange={e => setDiet(e.target.value)} placeholder="Diet (e.g. Keto)" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none" />
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none">
                    <option value="1">1 Day</option><option value="3">3 Days</option><option value="7">7 Days</option>
                </select>
            </div>
            <button onClick={generate} disabled={loading} className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold flex justify-center gap-2 hover:bg-orange-600 transition-colors">
                {loading ? <Icon name="loader" className="animate-spin"/> : <Icon name="utensils"/>} Generate Plan
            </button>
            {result && (
                <div className="bg-orange-50 p-6 rounded-xl space-y-6 max-h-96 overflow-y-auto border border-orange-100">
                    <div className="flex justify-between items-start">
                         <h3 className="text-lg font-bold text-orange-900">Your Plan</h3>
                         <button onClick={downloadPDF} className="text-xs bg-white border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-50 transition-colors">
                            <Icon name="download" size={14}/> PDF
                         </button>
                    </div>
                    <p className="text-orange-900 italic font-medium">{result.overview}</p>
                    <div className="space-y-4">
                        {result.schedule?.map((day: any, i: number) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                                <h4 className="font-bold text-orange-600 mb-2 uppercase text-sm tracking-wide">{day.day}</h4>
                                <ul className="list-disc ml-4 text-sm space-y-2 text-gray-700">
                                    {day.meals.map((m: string, j: number) => <li key={j}>{m}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {result.shoppingList && (
                        <div className="bg-white border border-orange-200 p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2"><Icon name="list" size={16}/> Shopping List</h4>
                            <div className="flex flex-wrap gap-2">
                                {result.shoppingList.map((item: string, i: number) => (
                                    <span key={i} className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">{item.replace(/\*\*/g, '')}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// ... (FitnessPlanner, RelationshipCoach, ParentingTools components remain unchanged) ...
// 5. Fitness Planner
export const FitnessPlanner = () => {
    const [level, setLevel] = useState('Beginner');
    const [goal, setGoal] = useState('Build Muscle');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        setLoading(true);
        try {
            const res = await generateLifestyleContent({ type: 'fitness', data: { level, goal } });
            setResult(res);
        } catch(e) { console.error(e); }
        setLoading(false);
    };

    const downloadPDF = () => {
        if (!result) return;
        // @ts-ignore
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const width = doc.internal.pageSize.getWidth();
        const margin = 20;
        let y = 0;

        const checkPageBreak = (needed: number) => {
            if (y + needed > 280) {
                doc.addPage();
                y = 20;
            }
        };

        // Header
        doc.setFillColor(16, 185, 129); // Emerald-500
        doc.rect(0, 0, width, 40, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("Fitness Routine", margin, 25);
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`${result.goal} • ${level}`, margin, 35);
        
        y = 55;

        // Schedule
        if (result.schedule) {
            result.schedule.forEach((day: any) => {
                checkPageBreak(40);
                
                // Day Header
                doc.setFillColor(236, 253, 245); // Emerald-50
                doc.setDrawColor(16, 185, 129);
                doc.roundedRect(margin, y, width - (margin * 2), 8, 1, 1, 'F');

                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(6, 95, 70); // Emerald-800
                doc.text(day.day, margin + 4, y + 5.5);
                
                // Focus
                doc.setFontSize(10);
                doc.setFont("helvetica", "italic");
                doc.setTextColor(16, 185, 129); // Emerald-500
                const dayWidth = doc.getTextWidth(day.day);
                doc.text(`|  ${day.focus}`, margin + dayWidth + 10, y + 5.5);
                
                y += 14;

                // Exercises
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                
                day.exercises.forEach((ex: string) => {
                    const cleanEx = ex.replace(/\*\*/g, '');
                    const lines = doc.splitTextToSize(`• ${cleanEx}`, width - (margin * 2) - 10);
                    checkPageBreak(lines.length * 6);
                    doc.text(lines, margin + 5, y);
                    y += (lines.length * 6) + 2;
                });
                y += 6;
            });
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Generated by Stratify AI`, margin, 290);
            doc.text(`Page ${i} of ${pageCount}`, width - margin, 290, { align: 'right' });
        }

        doc.save('Fitness_Plan.pdf');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <select value={level} onChange={e => setLevel(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
                <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="Goal (e.g. 5k Run)" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <button onClick={generate} disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold flex justify-center gap-2 hover:bg-emerald-700 transition-colors">
                {loading ? <Icon name="loader" className="animate-spin"/> : <Icon name="dumbbell"/>} Create Routine
            </button>
            {result && (
                <div className="bg-emerald-50 p-6 rounded-xl space-y-4 max-h-96 overflow-y-auto border border-emerald-100">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-emerald-800">{result.goal}</h3>
                        <button onClick={downloadPDF} className="text-xs bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-50 transition-colors">
                            <Icon name="download" size={14}/> PDF
                        </button>
                    </div>
                    <div className="space-y-3">
                        {result.schedule?.map((day: any, i: number) => (
                            <div key={i} className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-emerald-700">{day.day}</h4>
                                    <span className="text-xs uppercase bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold mt-1 inline-block">{day.focus}</span>
                                </div>
                                <ul className="text-sm text-right space-y-1 text-gray-700">
                                    {day.exercises.map((ex: string, j: number) => <li key={j}>• {ex.replace(/\*\*/g, '')}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// 6. Relationship Coach
export const RelationshipCoach = () => {
    const [situation, setSituation] = useState('');
    const [context, setContext] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        if (!situation) return;
        setLoading(true);
        try {
            const res = await generateLifestyleContent({ type: 'relationship', data: { situation, context } });
            setResult(res);
        } catch(e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <input value={situation} onChange={e => setSituation(e.target.value)} placeholder="Situation (e.g. Argument about chores)" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none" />
            <textarea value={context} onChange={e => setContext(e.target.value)} rows={3} placeholder="Context / Details..." className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-pink-500 outline-none resize-none" />
            <button onClick={generate} disabled={loading} className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold flex justify-center gap-2 hover:bg-pink-600 transition-colors">
                {loading ? <Icon name="loader" className="animate-spin"/> : <Icon name="heart"/>} Get Advice
            </button>
            {result && (
                <div className="bg-pink-50 p-6 rounded-xl space-y-6 max-h-96 overflow-y-auto border border-pink-100">
                    <h3 className="text-lg font-bold text-pink-800">{result.title}</h3>
                    <p className="text-pink-900/80 leading-relaxed">{result.introduction}</p>
                    <div className="space-y-4">
                        {result.steps?.map((step: any, i: number) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-pink-100">
                                <span className="text-xs font-bold text-pink-500 uppercase tracking-wide mb-1 block">Step {i+1}</span>
                                <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                                <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-pink-700 italic border-t border-pink-200 pt-4 font-medium">{result.closing}</p>
                </div>
            )}
        </div>
    );
};

// 7. Parenting Tools
export const ParentingTools = () => {
    const [chartType, setChartType] = useState('Chore Chart');
    const [age, setAge] = useState('5');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const generate = async () => {
        setLoading(true);
        try {
            const res = await generateLifestyleContent({ type: 'parenting', data: { chartType, age } });
            setResult(res);
        } catch(e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <select value={chartType} onChange={e => setChartType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-yellow-500 outline-none">
                    <option>Chore Chart</option><option>Reward System</option><option>Routine Checklist</option>
                </select>
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="Child Age" className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-yellow-500 outline-none" />
            </div>
            <button onClick={generate} disabled={loading} className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold flex justify-center gap-2 hover:bg-yellow-600 transition-colors">
                {loading ? <Icon name="loader" className="animate-spin"/> : <Icon name="baby"/>} Create Chart
            </button>
            {result && (
                <div className="bg-yellow-50 p-6 rounded-xl space-y-4 max-h-96 overflow-y-auto border border-yellow-200">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-yellow-800">{result.title}</h3>
                        <button onClick={() => exportToPNG('parent-chart', 'chart.png')} className="text-xs bg-white px-3 py-1.5 rounded-lg shadow-sm border border-yellow-200 text-yellow-700 font-bold hover:bg-yellow-50">Download</button>
                    </div>
                    <div id="parent-chart" className="bg-white p-6 rounded-xl shadow-lg border-4 border-yellow-100">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-yellow-50 text-yellow-800">
                                <tr>
                                    <th className="p-3 border-b border-yellow-100 rounded-tl-lg">Task</th>
                                    {result.columns.map((col: string, i: number) => <th key={i} className="p-3 border-b border-yellow-100 text-center">{col}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {result.rows.map((row: string, i: number) => (
                                    <tr key={i} className="hover:bg-yellow-50/50">
                                        <td className="p-3 border-b border-yellow-50 font-medium text-gray-700">{row}</td>
                                        {result.columns.map((_: any, j: number) => <td key={j} className="p-3 border-b border-yellow-50 border-l border-yellow-50 text-center"><div className="w-4 h-4 border-2 border-yellow-200 rounded-full mx-auto"></div></td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {result.tips && (
                        <div className="bg-white p-4 rounded-lg text-sm text-yellow-900 border border-yellow-200 shadow-sm">
                            <strong className="block mb-1 text-yellow-700">Parenting Tips:</strong> {result.tips.join(' • ')}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
