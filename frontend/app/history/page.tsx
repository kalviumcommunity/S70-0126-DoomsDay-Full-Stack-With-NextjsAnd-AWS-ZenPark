"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import Link from "next/link";

const HISTORY = [
    { id: "TICK-8801", site: "Tech Park Plaza", date: "Jan 18, 2026", duration: "2h", price: "$20", status: "COMPLETED" },
    { id: "TICK-8750", site: "City Mall Basement", date: "Jan 15, 2026", duration: "4h", price: "$40", status: "COMPLETED" },
    { id: "TICK-8700", site: "Tech Park Plaza", date: "Jan 12, 2026", duration: "1h", price: "$10", status: "CANCELLED" },
];

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <header className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon"><ArrowLeft className="w-6 h-6" /></Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Booking History</h1>
                </header>

                <div className="space-y-4">
                    {HISTORY.map(item => (
                        <div key={item.id} className="bg-card p-6 rounded-xl border border-border flex items-center justify-between group">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold">{item.site}</h3>
                                    {item.status === 'CANCELLED' && <span className="text-[10px] bg-red-500/10 text-red-500 px-2 rounded-full">Cancelled</span>}
                                </div>
                                <p className="text-sm text-muted-foreground">{item.date} • {item.duration} • {item.price}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost"><Download className="w-4 h-4 mr-2" /> Receipt</Button>
                                <Button size="sm" variant="outline"><RefreshCw className="w-4 h-4 mr-2" /> Rebook</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
