import Link from "next/link";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 p-8 font-sans">
      <main className="max-w-4xl w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            This project demonstrates Next.js rendering strategies. Check out
            the&nbsp;
            <Link href="/ssg" className="text-blue-500 hover:underline">
              SSG
            </Link>
            ,&nbsp;
            <Link href="/ssr" className="text-blue-500 hover:underline">
              SSR
            </Link>
            , and&nbsp;
            <Link href="/isr" className="text-blue-500 hover:underline">
              ISR
            </Link>
            &nbsp;pages to see them in action. We&apos;re also adding AWS
            integration soon!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore the three main rendering patterns in Next.js App Router.
          </p>
        </div>

        <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left space-y-6"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4 group-hover:translate-x-1 transition-transform">
              Static Rendering (SSG) &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Generated at <strong>build time</strong>. Great for marketing
              pages, blogs, and content that doesn&apos;t change often.
            </p>
            <div className="mt-6 inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-800 bg-blue-100 rounded-full">
              FASTEST
            </div>
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full max-w-[600px] relative"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4 group-hover:translate-x-1 transition-transform">
              server-Side Rendering (SSR) &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Generated at <strong>request time</strong>. Essential for
              personalized dashboards and real-time data.
            </p>
            <div className="mt-6 inline-block px-3 py-1 text-xs font-semibold tracking-wider text-red-800 bg-red-100 rounded-full">
              REAL-TIME
            </div>
          </Link>

          {/* Card 3: ISR */}
          <Link
            href="/isr"
            className="group block p-8 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-green-500 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-4 group-hover:translate-x-1 transition-transform">
              Hybrid Rendering (ISR) &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Static initially, updated <strong>periodically</strong>. Best of
              both worlds for news feeds and product listings.
            </p>
            <div className="mt-6 inline-block px-3 py-1 text-xs font-semibold tracking-wider text-green-800 bg-green-100 rounded-full">
              BALANCED
            </div>
          </Link>
        </div>
      </section>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 text-center max-w-2xl">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Pro Tip:</strong> We&apos;re building something amazing just
            for you. Sit tight!
          </p>
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
