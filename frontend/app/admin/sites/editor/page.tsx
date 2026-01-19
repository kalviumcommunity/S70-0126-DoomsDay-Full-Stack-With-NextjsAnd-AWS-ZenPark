"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus } from "lucide-react";

// Simple grid editor
export default function SiteEditorPage() {
    const [grid, setGrid] = useState<any[]>(
        Array(5).fill(null).map((_, y) =>
            Array(5).fill(null).map((_, x) => ({ x, y, type: 'EMPTY', label: '' }))
        ).flat()
    );
    const [selectedType, setSelectedType] = useState('STANDARD');

    const toggleCell = (x: number, y: number) => {
        setGrid(prev => prev.map(cell => {
            if (cell.x === x && cell.y === y) {
                // Determine new state
                if (cell.type === 'EMPTY') return { ...cell, type: selectedType, label: `${String.fromCharCode(65 + y)}${x + 1}` };
                else return { ...cell, type: 'EMPTY', label: '' };
            }
            return cell;
        }));
    };

    return (
        <div className="min-h-screen p-8 bg-muted/30">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Site Layout Editor</h1>
                <div className="flex gap-4">
                    <Button variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Row</Button>
                    <Button><Save className="w-4 h-4 mr-2" /> Save Layout</Button>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Tools */}
                <div className="w-64 bg-card p-6 rounded-xl border border-border space-y-4">
                    <h3 className="font-semibold mb-4">Tools</h3>
                    <div className="space-y-2">
                        {['STANDARD', 'VIP', 'EV', 'HANDICAP', 'WALL'].map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${selectedType === type ? 'bg-primary text-white border-primary' : 'bg-background hover:bg-muted'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-card rounded-xl border border-border p-12 flex items-center justify-center overflow-auto">
                    <div
                        className="grid gap-2"
                        style={{
                            gridTemplateColumns: 'repeat(5, 80px)', // dynamic based on grid size
                        }}
                    >
                        {grid.map((cell, i) => (
                            <div
                                key={i}
                                onClick={() => toggleCell(cell.x, cell.y)}
                                className={`
                                    w-20 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors
                                    ${cell.type === 'EMPTY' ? 'border-border hover:bg-muted/50' :
                                        cell.type === 'WALL' ? 'bg-slate-800 border-slate-800' :
                                            'bg-green-500/10 border-green-500 text-green-600 font-bold'
                                    }
                                `}
                            >
                                {cell.type !== 'EMPTY' && cell.type !== 'WALL' && cell.label}
                                {cell.type === 'WALL' && <div className="w-full h-full bg-slate-800 opacity-50"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
