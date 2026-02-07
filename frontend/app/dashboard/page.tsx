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
        if (status === "unauthenticated") {
            router.replace("/auth/signin");
            return;
        }

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-6 md:p-12 transition-colors duration-500">
            <div className="max-w-5xl mt-10 mx-auto space-y-10">
                <header className="flex justify-between items-center backdrop-blur-sm bg-white/30 dark:bg-black/30 p-4 rounded-2xl border border-white/20 shadow-sm sticky top-4 z-50">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <div className="flex gap-3">
                        <Link href="/history">
                            <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-md border-white/40 hover:bg-white/80 dark:bg-black/50 dark:border-white/10 dark:hover:bg-black/70">
                                <History className="w-4 h-4 mr-2" /> History
                            </Button>
                        </Link>
                        <Link href="/settings">
                            <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-md border-white/40 hover:bg-white/80 dark:bg-black/50 dark:border-white/10 dark:hover:bg-black/70">
                                <Settings className="w-4 h-4 mr-2" /> Settings
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Active Ticket Card - Enhanced */}
                <div className="group relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-primary via-violet-500 to-orange-400 shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                    <div className="absolute inset-0 bg-white dark:bg-slate-950 rounded-3xl opacity-10" />
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[22px] p-8 text-white relative overflow-hidden h-full">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                            <QrCode className="w-64 h-64" />
                        </div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />

                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                        Active Session
                                    </div>
                                    <h2 className="text-5xl font-extrabold tracking-tight mb-2">{activeTicket.siteName}</h2>
                                    <p className="text-2xl text-white/80 font-light flex items-center gap-2">
                                        <span className="font-semibold text-primary">{activeTicket.slotLabel}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                        B1 Level
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex-1">
                                        <div className="text-[10px] uppercase opacity-60 mb-1 font-semibold tracking-widest">Entry Time</div>
                                        <div className="font-mono text-2xl font-bold tracking-tight">14:30</div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex-1">
                                        <div className="text-[10px] uppercase opacity-60 mb-1 font-semibold tracking-widest">Exit Time</div>
                                        <div className="font-mono text-2xl font-bold tracking-tight">16:30</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link href="/sites/tech-park-plaza">
                                        <Button className="h-12 px-6 rounded-xl bg-white text-slate-900 hover:bg-white/90 font-bold border-0 shadow-lg shadow-white/10">
                                            <Navigation className="w-4 h-4 mr-2" /> Navigate
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="h-12 px-6 rounded-xl border-white/20 hover:bg-white/10 text-white hover:text-white backdrop-blur-sm">
                                        Extend Time
                                    </Button>
                                </div>
                            </div>

                            <div className="hidden md:flex flex-col items-center justify-center bg-white p-6 rounded-3xl shadow-xl transform rotate-3 group-hover:rotate-0 transition-all duration-500">
                                <QrCode className="w-40 h-40 text-slate-900" />
                                <p className="text-slate-500 text-[10px] mt-4 font-mono tracking-widest uppercase">Scan at Gate</p>
                                <p className="text-slate-900 text-xs font-bold font-mono">{activeTicket.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div>
                    <h3 className="text-xl font-bold mb-6 text-foreground/80 flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <Link href="/search" className="contents">
                            <div className="group bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="bg-blue-50 dark:bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <ExternalLink className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">Book New Spot</h3>
                                <p className="text-sm text-muted-foreground">Find parking nearby</p>
                            </div>
                        </Link>

                        <div className="group bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className="bg-purple-50 dark:bg-purple-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Navigation className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">Nearest Spot</h3>
                            <p className="text-sm text-muted-foreground">Auto-route to closest</p>
                        </div>

                        <Link href="/history" className="contents">
                            <div className="group bg-white dark:bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="bg-orange-50 dark:bg-orange-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <History className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">Past Bookings</h3>
                                <p className="text-sm text-muted-foreground">View receipts & history</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
