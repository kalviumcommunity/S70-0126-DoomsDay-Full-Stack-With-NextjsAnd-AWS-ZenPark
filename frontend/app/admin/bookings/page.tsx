"use client";

import { Button } from "@/components/ui/button";
import { Search, Filter, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const BOOKINGS = [
    { id: "B-1029", user: "Alice Smith", slot: "A3", duration: "2h", status: "ACTIVE", price: "$20" },
    { id: "B-1028", user: "John Doe", slot: "B1", duration: "1h", status: "COMPLETED", price: "$15" },
    { id: "B-1027", user: "Mike Ross", slot: "C2", duration: "4h", status: "ACTIVE", price: "$40" },
    { id: "B-1026", user: "Rachel Green", slot: "A1", duration: "-", status: "CANCELLED", price: "$0" },
    { id: "B-1025", user: "Ross G.", slot: "A2", duration: "3h", status: "COMPLETED", price: "$30" },
];

export default function BookingsManagementPage() {
    const [filter, setFilter] = useState("ALL");

    return (
        <div className="min-h-screen p-8 bg-muted/30">
            <h1 className="text-3xl font-bold mb-8">Bookings Management</h1>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-border flex justify-between items-center gap-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            className="w-full pl-9 p-2 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Search booking ID or user..."
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setFilter("ALL")}>All</Button>
                        <Button variant="outline" size="sm" onClick={() => setFilter("ACTIVE")}>Active</Button>
                        <Button variant="outline" size="sm" onClick={() => setFilter("COMPLETED")}>History</Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Booking ID</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Slot</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {BOOKINGS.filter(b => filter === "ALL" || b.status === filter).map((booking) => (
                                <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium">{booking.id}</td>
                                    <td className="px-6 py-4">{booking.user}</td>
                                    <td className="px-6 py-4">{booking.slot}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${booking.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
                                    `}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{booking.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                                        {/* Action items like Cancel or Refund */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                    <span>Showing 1-5 of 128 bookings</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
