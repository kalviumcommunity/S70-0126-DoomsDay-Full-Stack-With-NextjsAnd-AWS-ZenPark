import Link from "next/link";
import Image from "next/image";

// ISR: Revalidate every 10 seconds
export const revalidate = 10;

export default async function ISRPage() {
  // We use revalidate to allow cached data to update periodically
  const res = await fetch("https://dog.ceo/api/breeds/image/random", {
    next: { revalidate: 10 },
  });
  const data = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 font-sans">
      <h1 className="text-4xl font-bold text-green-600">
        Incremental Static Regeneration (ISR)
      </h1>
      <p className="max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
        This page is <strong>regenerated every 10 seconds</strong>. Refresh
        quickly and the image stays the same. Wait 10s using the same shared
        cache, and it updates.
        <br />
        <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          next: {"{ revalidate: 10 }"}
        </span>
      </p>

      <div className="relative w-96 h-96 overflow-hidden rounded-xl shadow-2xl border-4 border-green-100">
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
