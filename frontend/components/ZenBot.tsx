"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ZenBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi! I'm ZenBot. How can I help you find parking today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            let reply = "I can help with that. Please verify your vehicle details first.";
            if (userMsg.toLowerCase().includes("price")) reply = "The average rate here is $10/hr. Dynamic pricing applies during peak hours.";
            if (userMsg.toLowerCase().includes("extend")) reply = "You can extend your booking from the Dashboard > Active Ticket > Extend.";
            if (userMsg.toLowerCase().includes("map")) reply = "Navigate to the Search tab to view the live map.";

            setMessages(prev => [...prev, { role: "bot", content: reply }]);
        }, 1000);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-16 right-0 w-80 md:w-96 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col mb-4"
                        >
                            <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-white/20 rounded-full">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">ZenBot Assistant</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/10">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-xl p-3 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted border border-border rounded-bl-none'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-card border-t border-border flex gap-2">
                                <input
                                    className="flex-1 bg-muted/50 border border-border rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button size="icon" className="rounded-full w-10 h-10 shrink-0" onClick={handleSend}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    size="icon"
                    className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-accent hover:scale-110 transition-transform"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
                </Button>
            </div>
        </>
    );
}
