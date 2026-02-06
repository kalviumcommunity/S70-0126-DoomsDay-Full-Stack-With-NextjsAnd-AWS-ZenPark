"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, BarChart3, Bot, Map, Smartphone, Car, Clock, CreditCard, ChevronDown } from 'lucide-react';
import { useRef } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Dynamic Scroll Sections */}
      <HowItWorksSection />
      <FeaturesSection />
      <StatsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

// --- Components ---

function HeroSection() {
  const targetRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={targetRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Live Parking Analytics
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Parking, <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto md:mx-0 leading-relaxed">
            Experience the future of urban mobility with accurate, AI-powered real-time parking availability.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/auth/signup">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2">
                Live Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated SVG Model */}
        <motion.div
          style={{ y: y1, opacity }}
          className="flex-1 w-full max-w-[700px] relative perspective-1000"
        >
          <IsometricParkingSVG />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

function IsometricParkingSVG() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto drop-shadow-2xl overflow-visible">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.05 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base Platform */}
      <motion.path
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        d="M400,100 L750,300 L400,500 L50,300 Z"
        fill="url(#grad1)"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeOpacity="0.5"
      />

      {/* Grid Lines */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.path
          key={i}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 1.5 }}
          d={`M${50 + i * 60},${300 + i * 35} L${400 + i * 60},${100 + i * 35}`}
          stroke="var(--primary)"
          strokeWidth="1"
          strokeOpacity="0.2"
        />
      ))}

      {/* Floating Elements (Slots) */}
      <SlotCube x={200} y={350} delay={1} status="occupied" />
      <SlotCube x={300} y={400} delay={1.2} status="free" />
      <SlotCube x={400} y={450} delay={1.4} status="occupied" />
      <SlotCube x={500} y={300} delay={1.6} status="free" />

      {/* Dynamic Car Animation */}
      <motion.g
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 400, y: 220, opacity: 1 }}
        transition={{ duration: 3, delay: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      >
        <path d="M0,20 L40,0 L80,20 L40,40 Z" fill="var(--accent)" filter="url(#glow)" />
        <path d="M0,20 L0,35 L40,55 L40,40 Z" fill="var(--accent)" opacity="0.6" />
        <path d="M80,20 L80,35 L40,55 L40,40 Z" fill="var(--accent)" opacity="0.8" />
      </motion.g>
    </svg>
  );
}

function SlotCube({ x, y, delay, status }: { x: number, y: number, delay: number, status: 'free' | 'occupied' }) {
  const color = status === 'free' ? 'var(--primary)' : 'var(--destructive)';
  return (
    <motion.g
      initial={{ y: y - 50, opacity: 0 }}
      animate={{ y: y, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: y - 20, transition: { duration: 0.3 } }}
    >
      {/* Top Face */}
      <path d={`M${x},${y} L${x + 40},${y - 20} L${x + 80},${y} L${x + 40},${y + 20} Z`} fill={color} opacity="0.8" />
      {/* Left Face */}
      <path d={`M${x},${y} L${x},${y + 15} L${x + 40},${y + 35} L${x + 40},${y + 20} Z`} fill={color} opacity="0.5" />
      {/* Right Face */}
      <path d={`M${x + 80},${y} L${x + 80},${y + 15} L${x + 40},${y + 35} L${x + 40},${y + 20} Z`} fill={color} opacity="0.6" />

      {status === 'free' && (
        <text x={x + 40} y={y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">FREE</text>
      )}
    </motion.g>
  )
}

function HowItWorksSection() {
  return (
    <section className="py-32 bg-secondary/30 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-xl">Three simple steps to seamless parking.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          <WorkStep
            icon={<Map size={48} />}
            step="01"
            title="Find"
            desc="Search for available spots near your destination using our real-time map."
            delay={0.2}
          />
          <WorkStep
            icon={<CreditCard size={48} />}
            step="02"
            title="Book"
            desc="Reserve your spot in advance with secure digital payments."
            delay={0.4}
          />
          <WorkStep
            icon={<Car size={48} />}
            step="03"
            title="Park"
            desc="Navigate directly to your reserved spot. No circling, no stress."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  )
}

function WorkStep({ icon, step, title, desc, delay }: { icon: any, step: string, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="text-center group"
    >
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
        <div className="relative bg-background p-6 rounded-full border-2 border-secondary group-hover:border-primary transition-colors duration-500">
          <div className="text-primary">{icon}</div>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
          {step}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 p-32 bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-xl">Everything you need for smart parking management.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Smartphone className="w-8 h-8 text-primary" />}
            title="Digital Twin"
            description="Visualize parking lots in detail with 2D/3D mapping."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Instant Booking"
            description="Seamless payments and digital tickets."
          />
          <FeatureCard
            icon={<Bot className="w-8 h-8 text-green-500" />}
            title="ZenBot AI"
            description="Your personal parking assistant for real-time help."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
            title="Analytics"
            description="Deep insights into revenue and peak hours."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-red-500" />}
            title="Secure"
            description="Enterprise-grade security and role-based access."
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-purple-500" />}
            title="Real-time"
            description="Updates in milliseconds using advanced WebSockets."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300"
    >
      <div className="mb-6 p-4 bg-muted/50 rounded-xl w-fit">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-foreground/20">
          <StatItem value="50+" label="Parking Sites" />
          <StatItem value="10k+" label="Happy Drivers" />
          <StatItem value="99.9%" label="Uptime" />
          <StatItem value="24/7" label="Support" />
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4"
    >
      <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{value}</div>
      <div className="text-primary-foreground/80 font-medium">{label}</div>
    </motion.div>
  )
}

function CTASection() {
  return (
    <section className="py-32 container px-4 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to park smarter?</h2>
        <p className="text-xl text-muted-foreground">Join thousands of drivers saving time and money with ZenPark today.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full">Sign Up Now</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
