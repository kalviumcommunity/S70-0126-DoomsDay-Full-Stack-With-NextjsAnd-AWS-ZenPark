"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SLOT_DATA = [
    { name: 'Standard', value: 400 },
    { name: 'VIP', value: 100 },
    { name: 'EV', value: 50 },
    { name: 'Handicap', value: 20 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HEATMAP_DATA = Array.from({ length: 50 }, (_, i) => ({
    x: i % 10,
    y: Math.floor(i / 10),
    value: Math.floor(Math.random() * 100)
}));

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen p-8 bg-muted/30">
            <h1 className="text-3xl font-bold mb-8">Detailed Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Slot Usage Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Slot Type Usage Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={SLOT_DATA}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: { name: string, percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {SLOT_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Heatmap Visualization */}
                <Card>
                    <CardHeader>
                        <CardTitle>Zone Heatmap (Occupancy Density)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <div className="grid grid-cols-10 gap-1 p-4 bg-muted/50 rounded-xl">
                                {HEATMAP_DATA.map((cell, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-sm"
                                        style={{
                                            backgroundColor: `rgba(239, 68, 68, ${cell.value / 100})`, // Red opacity based on usage
                                            border: '1px solid rgba(0,0,0,0.05)'
                                        }}
                                        title={`Slot ${i}: ${cell.value}% Usage`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
