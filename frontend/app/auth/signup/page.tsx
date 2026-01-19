"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Building2, User } from "lucide-react";

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"DRIVER" | "MANAGER">("DRIVER");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            });

            if (res.ok) {
                router.push("/auth/signin");
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-border">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Car className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Create an Account</h1>
                    <p className="text-muted-foreground text-sm">Join ZenPark today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Toggle */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setRole("DRIVER")}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${role === "DRIVER"
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-border bg-background hover:bg-muted"
                                }`}
                        >
                            <User className="w-6 h-6" />
                            <span className="text-xs font-semibold">I'm a Driver</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("MANAGER")}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${role === "MANAGER"
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-border bg-background hover:bg-muted"
                                }`}
                        >
                            <Building2 className="w-6 h-6" />
                            <span className="text-xs font-semibold">I own a Parking Lot</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button className="w-full" size="lg" disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
