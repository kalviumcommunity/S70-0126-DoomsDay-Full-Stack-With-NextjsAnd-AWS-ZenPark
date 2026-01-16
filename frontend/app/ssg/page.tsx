import Link from "next/link";
import Image from "next/image";

// SSG: Force static rendering
export const dynamic = "force-static";

export default async function StaticPage() {
  // We use 'force-cache' to ensure it's cached at build time
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "force-cache",
  });
  const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 font-sans">
      <h1 className="text-4xl font-bold text-blue-600">
        Static Site Generation (SSG)
      </h1>
      <p className="max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
        This page is statically generated at build time. The dog image below is
        fetched once and won&apos;t change until the next build. It uses
        Next.js&apos; default caching behavior.
        <br />
        <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          cache: &apos;force-cache&apos;
        </span>
      </p>

      <div className="relative w-96 h-96 overflow-hidden rounded-xl shadow-2xl border-4 border-blue-100">
        <Image
          src={data.message}
          alt="Random Dog"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="text-sm text-gray-500">
        Refreshed at: {new Date().toLocaleTimeString()} (Client Time)
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-black"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
