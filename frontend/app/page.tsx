
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 p-8 font-sans">
      <main className="max-w-4xl w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Next.js Rendering Strategies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore the three main rendering patterns in Next.js App Router.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: SSG */}
          <Link
            href="/ssg"
            className="group block p-8 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4 group-hover:translate-x-1 transition-transform">
              Static Rendering (SSG) &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Generated at <strong>build time</strong>. Great for marketing pages, blogs, and content that doesn't change often.
            </p>
            <div className="mt-6 inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-800 bg-blue-100 rounded-full">
              FASTEST
            </div>
          </Link>

          {/* Card 2: SSR */}
          <Link
            href="/ssr"
            className="group block p-8 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-red-500 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-red-600 mb-4 group-hover:translate-x-1 transition-transform">
              server-Side Rendering (SSR) &rarr;
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Generated at <strong>request time</strong>. Essential for personalized dashboards and real-time data.
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
              Static initially, updated <strong>periodically</strong>. Best of both worlds for news feeds and product listings.
            </p>
            <div className="mt-6 inline-block px-3 py-1 text-xs font-semibold tracking-wider text-green-800 bg-green-100 rounded-full">
              BALANCED
            </div>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 text-center max-w-2xl">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Pro Tip:</strong> Open your browser's Network tab and observe the difference in loading speed. Notice how SSG is instant!
          </p>
        </div>
      </main>
    </div>
  );
}
