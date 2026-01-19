"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, BarChart3, Bot, Map, Smartphone } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Parking made <br /> <span className="text-foreground">Intelligent.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground md:max-w-[600px]">
              The world's most advanced AI-powered parking management system.
              Seamless for drivers, powerful for admins.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-12">Get Started</Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-12">Sign In</Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full max-w-[600px] relative"
          >
            {/* Animated Car SVG */}
            <svg viewBox="0 0 500 400" className="w-full h-auto drop-shadow-2xl">
              <motion.path
                d="M50,300 L450,300 L450,320 L50,320 Z"
                fill="currentColor"
                className="text-muted"
              />
              <motion.g
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                {/* Car Body */}
                <path d="M100,250 L350,250 L380,200 L300,150 L150,150 L80,200 Z" fill="currentColor" className="text-primary" />
                <path d="M160,160 L290,160 L340,200 L120,200 Z" fill="currentColor" className="text-primary-foreground/90" />
                <circle cx="140" cy="250" r="30" fill="currentColor" className="text-foreground" />
                <circle cx="310" cy="250" r="30" fill="currentColor" className="text-foreground" />
              </motion.g>

              {/* AI Signal */}
              <motion.circle
                cx="225" cy="100" r="10"
                fill="currentColor"
                className="text-purple-500"
                animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.path
                d="M225,100 L225,150"
                stroke="currentColor"
                strokeWidth="2"
                className="text-purple-500"
                strokeDasharray="5,5"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<Map className="w-10 h-10 text-primary" />}
              title="Global Search"
              description="Find parking spots anywhere with our interactive map and real-time availability filters."
            />
            <FeatureCard
              icon={<Smartphone className="w-10 h-10 text-purple-500" />}
              title="Digital Twin"
              description="Visualize parking lots in detail. See exactly which spot you're booking."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-yellow-500" />}
              title="Instant Booking"
              description="Book in seconds. seamless payments and digital tickets right on your phone."
            />
            <FeatureCard
              icon={<Bot className="w-10 h-10 text-green-500" />}
              title="ZenBot AI"
              description="Your personal parking assistant. Ask about availability, pricing, or directions."
            />
            <FeatureCard
              icon={<BarChart3 className="w-10 h-10 text-blue-500" />}
              title="Admin Analytics"
              description="Deep insights into occupancy, revenue, and peak hours for lot managers."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
              title="Secure & Reliable"
              description="Enterprise-grade security with role-based access and encrypted data."
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
