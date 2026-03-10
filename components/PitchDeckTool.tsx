
import React, { useState } from 'react';
import { generatePitchDeck } from '../services/geminiService.ts';
import { Icon } from './Icon.tsx';
import { PitchDeckParams, PitchDeckResult, PitchDeckSlide } from '../types.ts';

const PitchDeckTool = () => {
    const [companyName, setCompanyName] = useState('');
    const [rawData, setRawData] = useState('');
    const [result, setResult] = useState<PitchDeckResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!rawData) {
            alert("Please provide some raw content or notes about your business.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await generatePitchDeck({ companyName, rawData });
            setResult(data);
        } catch (err: any) {
            setError(err.message || "Failed to generate pitch deck.");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!result) return;
        // @ts-ignore
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
        const margin = 15;
        
        const navy = [0, 31, 63];
        const indigo = [79, 70, 229];
        const gray = [80, 80, 80];

        result.slides.forEach((slide: PitchDeckSlide, index: number) => {
            if (index > 0) doc.addPage();

            // --- COVER SLIDE ---
            if (index === 0) {
                // Full Dark Background
                doc.setFillColor(navy[0], navy[1], navy[2]);
                doc.rect(0, 0, width, height, 'F');
                
                // Decorative Line
                doc.setDrawColor(indigo[0], indigo[1], indigo[2]);
                doc.setLineWidth(2);
                doc.line(margin, height / 2, width - margin, height / 2);

                // Title
                doc.setTextColor(255, 255, 255);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(36);
                
                // Extract content for cover logic
                const coverTitle = companyName || slide.content[0] || "Company Name";
                const tagline = slide.content.length > 1 ? slide.content[1] : "Investor Presentation";
                
                doc.text(coverTitle.toUpperCase(), width / 2, height / 2 - 15, { align: 'center' });
                
                doc.setFont("helvetica", "normal");
                doc.setFontSize(16);
                doc.setTextColor(200, 200, 200);
                doc.text(tagline, width / 2, height / 2 + 15, { align: 'center' });

                // Footer Presenter Info
                doc.setFontSize(12);
                doc.text("Confidential Investor Deck", width / 2, height - 20, { align: 'center' });
                
                return; // Done with cover
            }

            // --- STANDARD SLIDE ---
            
            // Header Bar
            doc.setFillColor(navy[0], navy[1], navy[2]);
            doc.rect(0, 0, width, 22, 'F');

            // Slide Title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.text(slide.title.toUpperCase(), margin, 15);
            
            // Accent Line under title
            doc.setDrawColor(indigo[0], indigo[1], indigo[2]);
            doc.setLineWidth(1);
            doc.line(margin, 22, width - margin, 22);

            // Footer
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.2);
            doc.line(margin, height - 12, width - margin, height - 12);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(companyName || "Confidential", margin, height - 7);
            doc.text(`${index + 1} / ${result.slides.length}`, width - margin, height - 7, { align: "right" });

            // Layout
            let startY = 32;
            let contentWidth = width - (margin * 2);
            let hasVisual = !!slide.visualIdea;
            
            if (hasVisual) {
                const boxWidth = 85;
                const boxX = width - margin - boxWidth;
                contentWidth = boxX - margin - 10; // Space between text and box

                doc.setFont("helvetica", "italic");
                doc.setFontSize(9);
                const visualLines = doc.splitTextToSize(slide.visualIdea, boxWidth - 10);
                // Tighter box height calculation
                const boxHeight = 15 + (visualLines.length * 4);

                // Visual Box Background
                doc.setFillColor(248, 250, 252);
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.3);
                doc.roundedRect(boxX, startY, boxWidth, boxHeight, 2, 2, 'FD');

                // Label
                doc.setFont("helvetica", "bold");
                doc.setFontSize(8);
                doc.setTextColor(indigo[0], indigo[1], indigo[2]);
                doc.text("VISUAL CONCEPT", boxX + 5, startY + 6);

                // Content
                doc.setFont("helvetica", "italic");
                doc.setFontSize(9);
                doc.setTextColor(gray[0], gray[1], gray[2]);
                doc.text(visualLines, boxX + 5, startY + 12);
            }

            // Main Content Bullets
            doc.setTextColor(20, 20, 20);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            
            let cursorY = startY;
            
            slide.content.forEach(point => {
                const bullet = "•";
                const indent = 5;
                const lines = doc.splitTextToSize(point, contentWidth - indent);
                
                // Bullet
                doc.text(bullet, margin, cursorY);
                
                // Text
                doc.text(lines, margin + indent, cursorY);
                
                // Tighter spacing between bullets
                cursorY += (lines.length * 5) + 2; 
            });
        });

        doc.save(`${companyName.replace(/\s+/g, '_')}_PitchDeck.pdf`);
    };

    if (result) {
        return (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <button 
                        onClick={() => setResult(null)}
                        className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2"
                    >
                        <Icon name="arrow-right" className="rotate-180" size={16} /> Edit Input
                    </button>
                    <button 
                        onClick={downloadPDF}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium"
                    >
                        <Icon name="download" size={18} />
                        Export Slides as PDF
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {result.slides.map((slide, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                            <div className="bg-slate-900 px-4 py-3 text-white flex justify-between items-center shrink-0">
                                <h3 className="font-bold text-base truncate pr-2">{slide.title}</h3>
                                <span className="text-xs font-mono opacity-50 shrink-0">Slide {i + 1}</span>
                            </div>
                            
                            <div className="p-5 flex flex-col gap-4">
                                <ul className="space-y-2 text-sm text-slate-700">
                                    {slide.content.map((point, j) => (
                                        <li key={j} className="flex gap-2 leading-relaxed items-start">
                                            <span className="text-indigo-500 font-bold mt-1 text-[10px]">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                {slide.visualIdea && (
                                    <div className="bg-slate-50 border border-slate-200 border-dashed p-3 rounded-lg mt-2">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                            <Icon name="layout" size={12} /> Visual Concept
                                        </div>
                                        <p className="text-xs text-slate-600 italic leading-snug">{slide.visualIdea}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4 text-indigo-600">
                    <Icon name="presentation" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Pitch Deck Architect</h2>
                <p className="text-slate-500 mt-2">
                    Paste your raw notes, metrics, and ideas. We'll structure them into a compelling 12-slide investor deck.
                </p>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Company / Project Name</label>
                        <input 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900"
                            placeholder="e.g. Stratify AI"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            Raw Content & Data 
                            <span className="ml-2 text-xs font-normal text-slate-400">(Paste anything: problem, solution, metrics, team info...)</span>
                        </label>
                        <textarea 
                            value={rawData}
                            onChange={(e) => setRawData(e.target.value)}
                            rows={6} 
                            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-white text-gray-900"
                            placeholder="Paste your rough notes here. Don't worry about formatting.&#10;&#10;Example:&#10;We solve the problem of slow hiring. Our solution is an AI agent. Market size is $50B. We have 100 users. Team is ex-Google. We need $1M."
                        />
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                            <Icon name="alert-triangle" size={16} /> {error}
                        </div>
                    )}

                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Icon name="loader" className="animate-spin" /> : <Icon name="sparkles" />}
                        {loading ? 'Structuring Deck...' : 'Generate Pitch Deck'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PitchDeckTool;
