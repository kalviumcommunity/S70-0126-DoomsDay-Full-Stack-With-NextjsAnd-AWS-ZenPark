"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, Building } from "lucide-react";

export default function OnboardingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleSize, setVehicleSize] = useState("STANDARD");
    const [orgName, setOrgName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [status, router]);

    const handleDriverSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // API call to create vehicle
        try {
            const res = await fetch("/api/vehicles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plate: vehiclePlate, model: vehicleModel, size: vehicleSize }),
            });
            if (res.ok) {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdminSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // API call to update user with org name (using name field for now)
        try {
            const res = await fetch("/api/user/org", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: orgName }),
            });
            if (res.ok) {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") return <div className="flex h-screen items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Complete Your Profile</h1>
                    <p className="text-muted-foreground text-sm">
                        {session?.user?.role === "ADMIN" ? "Tell us about your organization" : "Add your primary vehicle"}
                    </p>
                </div>

                {session?.user?.role === "ADMIN" ? (
                    <form onSubmit={handleAdminSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Organization Name</label>
                            <input
                                type="text"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                                className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                                placeholder="ZenPark Corp"
                                required
                            />
                        </div>
                        <Button className="w-full" disabled={loading}>Go to Dashboard</Button>
                    </form>
                ) : (
                    <form onSubmit={handleDriverSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">License Plate</label>
                            <input
                                type="text"
                                value={vehiclePlate}
                                onChange={(e) => setVehiclePlate(e.target.value)}
                                className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                                placeholder="ABC-1234"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Vehicle Model</label>
                            <input
                                type="text"
                                value={vehicleModel}
                                onChange={(e) => setVehicleModel(e.target.value)}
                                className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Toyota Prius"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Size</label>
                            <select
                                value={vehicleSize}
                                onChange={(e) => setVehicleSize(e.target.value)}
                                className="w-full p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                            >
                                <option value="COMPACT">Compact</option>
                                <option value="STANDARD">Standard</option>
                                <option value="LARGE">Large (SUV/Truck)</option>
                            </select>
                        </div>
                        <Button className="w-full" disabled={loading}>Finish Setup</Button>
                    </form>
                )}
            </div>
        </div>
    );
}
