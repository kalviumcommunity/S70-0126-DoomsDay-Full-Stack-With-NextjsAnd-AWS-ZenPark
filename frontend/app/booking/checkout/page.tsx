"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slotId = searchParams?.get("slot") || "A1";
    const pricePerHour = parseFloat(searchParams?.get("price") || "10");

    const [duration, setDuration] = useState(2);
    const [loading, setLoading] = useState(false);

    const total = duration * pricePerHour;
    const fees = 2; // Service fee
    const grandTotal = total + fees;

    const handlePayment = async () => {
        setLoading(true);
        // Mock payment delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-12 flex justify-center">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Column: Details */}
                <div className="space-y-6">
                    <Link href="/search" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Cancel and return
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
                        <p className="text-muted-foreground">Review your booking details</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-border">
                            <span className="font-semibold">Parking Slot</span>
                            <span className="font-mono text-lg">{slotId}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-border">
                            <span className="font-semibold">Location</span>
                            <span className="text-right">Tech Park Plaza<br /><span className="text-xs text-muted-foreground">123 Innovation Blvd</span></span>
                        </div>

                        <div className="space-y-2">
                            <label className="font-semibold text-sm">Duration</label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setDuration(Math.max(1, duration - 1))}
                                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted font-bold text-xl"
                                >-</button>
                                <div className="flex-1 text-center font-mono text-2xl">{duration} Hours</div>
                                <button
                                    onClick={() => setDuration(duration + 1)}
                                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-muted font-bold text-xl"
                                >+</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-xl flex gap-3 items-start border border-blue-500/20">
                        <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-300">Secure Booking</h4>
                            <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Your spot is guaranteed. Free cancellation up to 15 mins before.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment & Summary */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-xl border border-border">
                        <h3 className="font-bold text-lg mb-6">Payment Summary</h3>

                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between text-muted-foreground">
                                <span>{duration} hours x ${pricePerHour}</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Service Fee</span>
                                <span>${fees.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-dashed my-2 pt-2 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                className="w-full h-12 text-lg relative overflow-hidden"
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2"
                                    >
                                        Processing...
                                    </motion.div>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5" /> Pay ${grandTotal.toFixed(2)}
                                    </span>
                                )}
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                Powered by Stripe (Mock Mode)
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
