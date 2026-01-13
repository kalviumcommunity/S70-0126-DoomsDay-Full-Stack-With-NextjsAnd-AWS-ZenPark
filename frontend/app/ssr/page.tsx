
import Image from "next/image";

// SSR: Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function DynamicPage() {
    // We use 'no-store' to ensure it's fetched on every request
    const res = await fetch("https://dog.ceo/api/breeds/image/random", {
        cache: "no-store",
    });
    const data = await res.json();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 font-sans">
            <h1 className="text-4xl font-bold text-red-600">Server-Side Rendering (SSR)</h1>
            <p className="max-w-xl text-center text-lg text-gray-700 dark:text-gray-300">
                This page is <strong>generated on every request</strong>. The dog image below will change every time you refresh the page.
                <br />
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">cache: 'no-store'</span>
            </p>

            <div className="relative w-96 h-96 overflow-hidden rounded-xl shadow-2xl border-4 border-red-100">
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
            <a href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-black">
                ← Back Home
            </a>
        </div>
    );
}
