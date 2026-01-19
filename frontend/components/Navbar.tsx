"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, Car, User, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Car className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        ZenPark
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {session ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                            </Link>
                            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
                                Find Parking
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
                                Find Parking
                            </Link>
                            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                                Features
                            </Link>
                            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                                About
                            </Link>
                        </>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                        <p className="text-xs font-mono text-primary mt-1">
                                            {/* @ts-ignore */}
                                            Role: {session.user?.role}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-red-500 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/auth/signin">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button>Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-foreground">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
