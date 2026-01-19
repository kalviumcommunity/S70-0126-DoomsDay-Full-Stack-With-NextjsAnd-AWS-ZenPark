"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mb-8"
            >
                <svg
                    viewBox="0 0 400 300"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-2xl"
                >
                    {/* Background Elements */}
                    <circle cx="200" cy="150" r="120" fill="currentColor" className="text-secondary/20" />

                    {/* Animated Car */}
                    <motion.g
                        animate={{
                            x: [-10, 10, -10],
                            y: [-2, 2, -2],
                            rotate: [-1, 1, -1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Car Body */}
                        <path
                            d="M120,180 L280,180 L290,150 L250,120 L150,120 L110,150 Z"
                            fill="currentColor"
                            className="text-primary"
                        />
                        {/* Windows */}
                        <path
                            d="M155,125 L245,125 L275,150 L125,150 Z"
                            fill="currentColor"
                            className="text-primary-foreground/90"
                        />
                        {/* Wheels */}
                        <circle cx="150" cy="180" r="15" fill="currentColor" className="text-foreground" />
                        <circle cx="250" cy="180" r="15" fill="currentColor" className="text-foreground" />
                    </motion.g>

                    {/* Confused Character / Search Pin */}
                    <motion.g
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        transform="translate(220, 80)"
                    >
                        <path
                            d="M0,0 C-15,-20 -20,-40 0,-60 C20,-40 15,-20 0,0 Z"
                            fill="currentColor"
                            className="text-destructive"
                            transform="scale(1.5)"
                        />
                        <circle cx="0" cy="-45" r="5" fill="white" />
                        <text x="0" y="-80" textAnchor="middle" fill="currentColor" className="text-foreground font-bold text-2xl">?</text>
                    </motion.g>

                    {/* 404 Text */}
                    <text x="70" y="250" fontSize="40" fontWeight="bold" fill="currentColor" className="text-muted-foreground opacity-50">404</text>
                    <text x="330" y="250" fontSize="40" fontWeight="bold" fill="currentColor" className="text-muted-foreground opacity-50">404</text>
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Lost in the Lot?
                </h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    The parking spot you are looking for seems to be occupied by... nothingness.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg" variant="default">Return Home</Button>
                    </Link>
                    <Link href="/search">
                        <Button size="lg" variant="outline">Find Parking</Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
