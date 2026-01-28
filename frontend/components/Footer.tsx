import Link from "next/link";
import { Car, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-auto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Car className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold">ZenPark</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Smart parking solutions powered by AI.
                            Find your spot, instantly.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/search" className="hover:text-primary">Find Parking</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
                            <li><Link href="/mobile" className="hover:text-primary">Mobile App</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex gap-4 text-muted-foreground">
                            <a href="#" className="hover:text-primary"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary"><Github className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} ZenPark. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
