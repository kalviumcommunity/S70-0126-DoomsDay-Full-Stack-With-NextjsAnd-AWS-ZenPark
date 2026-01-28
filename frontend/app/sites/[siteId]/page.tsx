"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Info, Zap } from "lucide-react";
import Link from "next/link";
import { ParkingLayout } from "@/components/ParkingLayout";

const MOCK_SLOTS = [
    { label: "A1", type: "STANDARD", pricePerHour: 10, x: 0, y: 0, status: "FREE" },
    { label: "A2", type: "STANDARD", pricePerHour: 10, x: 1, y: 0, status: "OCCUPIED" },
    { label: "A3", type: "VIP", pricePerHour: 20, x: 2, y: 0, status: "FREE" },
    { label: "B1", type: "EV", pricePerHour: 15, x: 0, y: 1, status: "FREE" },
    { label: "B2", type: "HANDICAP", pricePerHour: 10, x: 1, y: 1, status: "MAINTENANCE" },
    // Add more for grid
    { label: "C1", type: "STANDARD", pricePerHour: 8, x: 0, y: 2, status: "FREE" },
    { label: "C2", type: "STANDARD", pricePerHour: 8, x: 1, y: 2, status: "RESERVED" },
    { label: "C3", type: "STANDARD", pricePerHour: 8, x: 2, y: 2, status: "FREE" },
];

export default function SitePage() {
    const params = useParams();
    const siteId = params?.siteId as string;
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    // In real app, fetch site and slots by siteId

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
            {/* Header */}
            <div className="bg-card border-b border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/search">
                        <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">Tech Park Plaza</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center"><Zap className="w-3 h-3 text-green-500 mr-1" /> LiveView Active</span>
                            <span>•</span>
                            <span>Level B1</span>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="hidden md:flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> FREE</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> OCCUPIED</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> RESERVED</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> EV</div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Canvas Area */}
                <div className="flex-1 bg-muted/30 relative overflow-hidden flex items-center justify-center p-8">
                    <ParkingLayout slots={MOCK_SLOTS} onSlotClick={setSelectedSlot} selectedSlotId={selectedSlot?.label} />
                </div>

                {/* Side Detail Panel */}
                <div className={`w-80 bg-card border-l border-border p-6 flex flex-col transition-all duration-300 absolute right-0 h-full md:relative ${selectedSlot ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                    {selectedSlot ? (
                        <div className="space-y-6">
                            <div>
                                <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold mb-2
                                ${selectedSlot.status === 'FREE' ? 'bg-green-500/10 text-green-500' :
                                        selectedSlot.status === 'OCCUPIED' ? 'bg-red-500/10 text-red-500' : 'bg-muted text-muted-foreground'
                                    }
                            `}>{selectedSlot.status}</span>
                                <h2 className="text-3xl font-bold">Slot {selectedSlot.label}</h2>
                                <p className="text-muted-foreground">{selectedSlot.type} ZONE</p>
                            </div>

                            <div className="space-y-4 border-t border-border pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Price</span>
                                    <span className="font-bold text-xl">${selectedSlot.pricePerHour}/hr</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Amenities</span>
                                    <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Charger</span>
                                </div>
                            </div>

                            {selectedSlot.status === 'FREE' ? (
                                <Link href={`/booking/checkout?slot=${selectedSlot.label}&price=${selectedSlot.pricePerHour}`}>
                                    <Button className="w-full h-12 text-lg">Book This Spot</Button>
                                </Link>
                            ) : (
                                <Button disabled className="w-full bg-muted text-muted-foreground">Unavailable</Button>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4">
                            <div className="p-4 bg-muted rounded-full">
                                <Car className="w-8 h-8 opacity-50" />
                            </div>
                            <p>Select a parking slot <br />to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
