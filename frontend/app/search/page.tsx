"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, BatteryCharging, Shield, DollarSign } from "lucide-react";

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-2xl flex items-center justify-center">Loading Map...</div>
});

// Mock data until API is connected
const MOCK_SITES = [
    { id: "1", name: "Tech Park Plaza", address: "123 Innovation Blvd" },
    { id: "2", name: "City Mall Basement", address: "45 Shopping Ctr" },
];

export default function SearchPage() {
    const [sites, setSites] = useState(MOCK_SITES);
    const [filter, setFilter] = useState("ALL");

    // Fetch sites from API later
    // useEffect(() => { fetch('/api/sites').... }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-64px)]"> {/* Adjust height for navbar */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                {/* Sidebar / List View */}
                <div className="w-full md:w-1/3 lg:w-1/4 bg-card border-r border-border flex flex-col z-10 shadow-xl">
                    <div className="p-4 border-b border-border space-y-4">
                        <h1 className="text-xl font-bold">Find Parking</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search location..."
                                className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                            />
                        </div>
                        {/* Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <button className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium whitespace-nowrap flex items-center gap-1">
                                <Filter className="w-3 h-3" /> All
                            </button>
                            <button className="px-3 py-1 rounded-full border border-border text-muted-foreground hover:bg-muted text-xs font-medium whitespace-nowrap flex items-center gap-1">
                                <BatteryCharging className="w-3 h-3" /> EV
                            </button>
                            <button className="px-3 py-1 rounded-full border border-border text-muted-foreground hover:bg-muted text-xs font-medium whitespace-nowrap flex items-center gap-1">
                                <Shield className="w-3 h-3" /> Covered
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {sites.map(site => (
                            <div key={site.id} className="p-4 rounded-xl border border-border hover:border-primary/50 transition-all cursor-pointer bg-background hover:shadow-md group">
                                <h3 className="font-semibold group-hover:text-primary transition-colors">{site.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{site.address}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full"><DollarSign className="w-3 h-3" /> $10/hr</span>
                                    <span className="flex items-center gap-1"><BatteryCharging className="w-3 h-3" /> EV</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map View */}
                <div className="flex-1 relative bg-muted/20">
                    <Map sites={sites} />

                    {/* AI Recommendation Floating Widget */}
                    <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-primary/20 shadow-2xl z-[400] animate-in slide-in-from-bottom-10 fade-in duration-700">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Smart Recommendation</h4>
                                <p className="text-xs text-muted-foreground mt-1">Based on your SUV size, <strong>Tech Park Plaza (Slot A3)</strong> is the best fit with 98% availability probability.</p>
                                <Button size="sm" className="mt-2 text-xs w-full h-8">Reserve Now</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
