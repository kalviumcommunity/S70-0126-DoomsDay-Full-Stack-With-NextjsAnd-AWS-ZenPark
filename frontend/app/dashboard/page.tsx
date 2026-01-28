"use client";

import { Button } from "@/components/ui/button";
import { QrCode, Navigation, History, Settings, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // @ts-ignore
        if (status === "authenticated" && session?.user?.role === "ADMIN") {
            router.replace("/admin");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const activeTicket = {
        id: "TICK-8842",
        siteName: "Tech Park Plaza",
        slotLabel: "A3",
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        status: "ACTIVE"
    };

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-12">
            <div className="max-w-4xl mt-10 mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="flex gap-2">
                        <Link href="/history">
                            <Button variant="outline" size="sm"><History className="w-4 h-4 mr-2" /> History</Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                        </Link>
                    </div>
                </header>

                {/* Active Ticket Card */}
                <div className="bg-gradient-to-br from-primary to-violet-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <QrCode className="w-64 h-64" />
                    </div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">Active Parking</div>
                                <h2 className="text-4xl font-bold">{activeTicket.siteName}</h2>
                                <p className="text-xl opacity-90">{activeTicket.slotLabel} • B1 Level</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                                    <div className="text-xs uppercase opacity-70 mb-1">Entry Time</div>
                                    <div className="font-mono text-lg font-bold">14:30</div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                                    <div className="text-xs uppercase opacity-70 mb-1">Exit Time</div>
                                    <div className="font-mono text-lg font-bold">16:30</div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Link href="/sites/tech-park-plaza">
                                    <Button className="bg-white text-primary hover:bg-white/90 border-0">
                                        <Navigation className="w-4 h-4 mr-2" /> Navigate to Slot
                                    </Button>
                                </Link>
                                <Button variant="outline" className="border-white/30 hover:bg-white/10 text-white">
                                    Extend Time
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl md:w-64 md:ml-auto">
                            <QrCode className="w-48 h-48 text-black" />
                            <p className="text-black text-xs mt-2 font-mono">{activeTicket.id}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/search" className="contents">
                        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all cursor-pointer group">
                            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ExternalLink className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-bold">Book New</h3>
                            <p className="text-xs text-muted-foreground mt-1">Find a spot nearby</p>
                        </div>
                    </Link>
                    {/* Add more quick actions if needed */}
                </div>
            </div>
        </div>
    );
}
