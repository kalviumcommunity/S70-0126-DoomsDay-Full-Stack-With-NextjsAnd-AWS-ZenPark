"use client";

import { motion } from "framer-motion";

interface Slot {
    label: string;
    type: string;
    pricePerHour: number;
    x: number;
    y: number;
    status: string;
}

interface ParkingLayoutProps {
    slots: Slot[];
    onSlotClick: (slot: Slot) => void;
    selectedSlotId?: string;
}

export function ParkingLayout({ slots, onSlotClick, selectedSlotId }: ParkingLayoutProps) {
    // Determine grid dimensions
    const maxX = Math.max(...slots.map(s => s.x)) + 1;
    const maxY = Math.max(...slots.map(s => s.y)) + 1;

    return (
        <div className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-2xl p-8 border-4 border-zinc-700 aspect-square max-h-[80vh]">
            <div
                className="grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(${maxX}, minmax(80px, 1fr))`,
                    gridTemplateRows: `repeat(${maxY}, minmax(120px, 1fr))`
                }}
            >
                {slots.map((slot) => {
                    const isSelected = selectedSlotId === slot.label;
                    const isOccupied = slot.status === 'OCCUPIED';
                    const isReserved = slot.status === 'RESERVED';
                    const isMaintenance = slot.status === 'MAINTENANCE';
                    const isEV = slot.type === 'EV';

                    let bgColor = "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300";
                    if (isOccupied) bgColor = "bg-red-500/20 border-red-500 text-red-700 dark:text-red-300";
                    else if (isReserved) bgColor = "bg-yellow-500/20 border-yellow-500 text-yellow-700 dark:text-yellow-300";
                    else if (isMaintenance) bgColor = "bg-gray-500/20 border-gray-500 text-gray-500";
                    else if (isSelected) bgColor = "bg-blue-500/30 border-blue-500 ring-2 ring-blue-500";

                    return (
                        <motion.button
                            key={slot.label}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSlotClick(slot)}
                            className={`
                                relative rounded-lg border-2 flex flex-col items-center justify-center p-2 transition-all
                                ${bgColor}
                                ${isSelected ? 'z-10 shadow-lg scale-105' : ''}
                                ${isMaintenance ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            style={{
                                gridColumnStart: slot.x + 1,
                                gridRowStart: slot.y + 1,
                            }}
                        >
                            <span className="font-bold text-lg">{slot.label}</span>
                            <span className="text-[10px] uppercase font-semibold opacity-70">{slot.type}</span>

                            {isOccupied && (
                                <motion.div
                                    layoutId={`car-${slot.label}`}
                                    className="absolute inset-2 bg-red-500/80 rounded flex items-center justify-center shadow-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <span className="text-white text-xs font-mono">XYZ-123</span>
                                </motion.div>
                            )}
                        </motion.button>
                    )
                })}
            </div>

            {/* Architecture Elements (Walls/Pillars) can be added here absolute positioned */}
        </div>
    );
}
