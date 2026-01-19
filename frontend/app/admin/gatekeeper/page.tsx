"use client";

import { Button } from "@/components/ui/button";
import { Camera, CheckCircle, XCircle, ScanLine, Car } from "lucide-react";
import { useState } from "react";

export default function GatekeeperPage() {
    const [scanning, setScanning] = useState(true);
    const [gateStatus, setGateStatus] = useState<"CLOSED" | "OPENING" | "OPEN">("CLOSED");
    const [lastScan, setLastScan] = useState<any>(null);

    const triggerMockScan = () => {
        // Simulate finding a car
        setLastScan({
            plate: "XYZ-1234",
            status: "AUTHORIZED",
            user: "Alice Smith",
            bookingId: "B-1029"
        });
        setGateStatus("OPENING");
        setTimeout(() => setGateStatus("OPEN"), 2000);
        setTimeout(() => {
            setGateStatus("CLOSED");
            setLastScan(null);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Mock Camera Feed Background */}
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-50">
                <div className="text-zinc-700 animate-pulse">Camera Feed Disconnected (Mock Mode)</div>
            </div>

            {/* Overlay UI */}
            <div className="relative z-10 w-full max-w-2xl bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <ScanLine className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Smart Gatekeeper</h1>
                            <p className="text-xs text-white/60">System Online • Entry Gate A</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${scanning ? 'bg-green-500/20 text-green-400 animate-pulse' : 'bg-red-500/20 text-red-400'}`}>
                        {scanning ? 'SCANNING...' : 'PAUSED'}
                    </div>
                </header>

                <div className="aspect-video bg-black rounded-xl border-2 border-dashed border-white/20 relative flex flex-col items-center justify-center mb-8 group cursor-pointer" onClick={triggerMockScan}>
                    <Camera className="w-12 h-12 text-white/20 mb-4 group-hover:text-blue-500 transition-colors" />
                    <p className="text-sm text-white/40">Tap to simulate ALPR Scan</p>

                    {/* Scan Line Animation */}
                    {scanning && <div className="absolute top-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-[scan_2s_ease-in-out_infinite]"></div>}
                </div>

                {/* Scan Result */}
                {lastScan && (
                    <div className="bg-zinc-800 rounded-xl p-6 border border-white/10 animate-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Car className="w-5 h-5 text-blue-400" /> {lastScan.plate}
                            </h3>
                            <div className="flex items-center gap-2 text-green-400">
                                <CheckCircle className="w-5 h-5" /> {lastScan.status}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
                            <div>
                                <p className="text-xs uppercase tracking-wider mb-1">Driver</p>
                                <p className="text-white">{lastScan.user}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider mb-1">Booking Ref</p>
                                <p className="text-white font-mono">{lastScan.bookingId}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Gate Control */}
                <div className="mt-8 flex gap-4">
                    <Button
                        className={`flex-1 h-14 text-lg font-bold transition-all ${gateStatus === 'OPEN' ? 'bg-green-600 hover:bg-green-700' :
                                gateStatus === 'OPENING' ? 'bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        onClick={() => setGateStatus(gateStatus === 'CLOSED' ? 'OPEN' : 'CLOSED')}
                    >
                        {gateStatus === 'OPEN' ? 'GATE OPEN' : gateStatus === 'OPENING' ? 'OPENING...' : 'OPEN GATE'}
                    </Button>
                    <Button variant="outline" className="h-14 aspect-square border-white/20" onClick={() => setScanning(!scanning)}>
                        {scanning ? <XCircle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
