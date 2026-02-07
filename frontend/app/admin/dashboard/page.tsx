"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Activity, CreditCard, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DATA = [
    { name: 'Mon', revenue: 4000, occupancy: 2400 },
    { name: 'Tue', revenue: 3000, occupancy: 1398 },
    { name: 'Wed', revenue: 2000, occupancy: 9800 },
    { name: 'Thu', revenue: 2780, occupancy: 3908 },
    { name: 'Fri', revenue: 1890, occupancy: 4800 },
    { name: 'Sat', revenue: 2390, occupancy: 3800 },
    { name: 'Sun', revenue: 3490, occupancy: 4300 },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-slate-950 dark:via-black dark:to-slate-900 p-8 transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                            Command Center
                        </h1>
                        <p className="text-muted-foreground mt-2">Real-time system monitoring and analytics</p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="bg-white dark:bg-white/10 text-foreground border border-border shadow-sm hover:bg-muted">
                            Export Report
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30">
                            + Add Site
                        </Button>
                    </div>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                            <CreditCard className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">$45,231.89</div>
                            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                                <span className="bg-emerald-500/20 rounded px-1 mr-1">↑ 20.1%</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Parkings</CardTitle>
                            <Activity className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">2,350</div>
                            <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center">
                                <span className="bg-blue-500/20 rounded px-1 mr-1">↑ 180</span> since last hour
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
                            <Users className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-slate-900 dark:text-white">85%</div>
                            <p className="text-xs text-orange-600 font-semibold mt-1">Approaching Capacity</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-0 shadow-xl shadow-indigo-500/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white/80">AI Insight</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-white animate-pulse" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Peak: 18:00</div>
                            <p className="text-xs text-indigo-200 mt-1">Suggest enabling "Early Bird" pricing</p>
                            <Button size="sm" variant="secondary" className="mt-3 w-full h-8 text-xs bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md">
                                Apply Action
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Charts Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-0 shadow-lg bg-white dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
                            <CardHeader>
                                <CardTitle>Revenue Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={DATA}>
                                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                                cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                            />
                                            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-lg bg-white dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
                            <CardHeader>
                                <CardTitle>Real-Time Occupancy Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={DATA}>
                                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                            />
                                            <Line type="monotone" dataKey="occupancy" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* System Activity Column */}
                    <div className="lg:col-span-1">
                        <Card className="h-full border-0 shadow-lg bg-white dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
                            <CardHeader>
                                <CardTitle>Live System Logs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                                    {[
                                        { time: '10:42 AM', msg: 'New booking at Tech Park', type: 'success' },
                                        { time: '10:38 AM', msg: 'System backup completed', type: 'info' },
                                        { time: '10:15 AM', msg: 'High latency detected in Zone B', type: 'warning' },
                                        { time: '09:55 AM', msg: 'User registered: John Doe', type: 'success' },
                                        { time: '09:40 AM', msg: 'Payment gateway sync', type: 'info' },
                                    ].map((log, i) => (
                                        <div key={i} className="relative pl-8">
                                            <div className={`absolute left-[11px] top-1.5 w-2 h-2 rounded-full ring-4 ring-background ${log.type === 'success' ? 'bg-green-500' :
                                                log.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                                                }`} />
                                            <p className="text-sm font-medium">{log.msg}</p>
                                            <p className="text-xs text-muted-foreground">{log.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-6">View All Logs</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
