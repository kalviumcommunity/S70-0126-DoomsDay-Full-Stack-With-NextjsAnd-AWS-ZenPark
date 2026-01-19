"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Something went wrong");
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
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">Sign in to your ZenPark account</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Button className="w-full" size="lg">Sign In</Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
