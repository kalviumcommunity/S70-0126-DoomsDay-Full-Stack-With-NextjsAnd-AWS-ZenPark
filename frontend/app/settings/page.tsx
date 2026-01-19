"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Car, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createWorker } from "tesseract.js"; // For client-side OCR if needed, using mock for speed

export default function SettingsPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [detectedPlate, setDetectedPlate] = useState("");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAnalyzing(true);

        // Mock AI Analysis delay
        setTimeout(() => {
            setDetectedPlate("ABC-9999");
            setAnalyzing(false);
        }, 2000);

        // Real implementation would use Tesseract.js or Cloud Vision API here
    };

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <header className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-6 h-6" /></Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Settings</h1>
                </header>

                {/* Profile */}
                <div className="bg-card p-6 rounded-xl border border-border space-y-4">
                    <h2 className="font-bold flex items-center gap-2"><User className="w-5 h-5" /> Profile</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="p-2 border rounded bg-background" defaultValue="Driver User" />
                        <input className="p-2 border rounded bg-background" defaultValue="user@example.com" disabled />
                    </div>
                </div>

                {/* Vehicles */}
                <div className="bg-card p-6 rounded-xl border border-border space-y-6">
                    <h2 className="font-bold flex items-center gap-2"><Car className="w-5 h-5" /> My Vehicles</h2>

                    <div className="flex items-center gap-4 p-4 border border-dashed rounded-xl bg-muted/50">
                        <div className="bg-background p-3 rounded-full border">
                            <Camera className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                            <label className="font-semibold block cursor-pointer hover:text-primary transition-colors">
                                <span>Upload Car Photo for AI Recognition</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                            <p className="text-xs text-muted-foreground">Auto-detect Make, Model, and Plate</p>
                        </div>
                        {analyzing && <div className="text-primary text-sm animate-pulse">Analyzing...</div>}
                    </div>

                    {detectedPlate && (
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">AI DETECTED</div>
                            <div>
                                <div className="font-bold text-lg">{detectedPlate}</div>
                                <div className="text-sm opacity-80">Toyota Camry (Black)</div>
                            </div>
                            <Button size="sm" className="ml-auto" onClick={() => { /* Add to list */ }}>Add Vehicle</Button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
