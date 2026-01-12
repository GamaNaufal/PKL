"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface HealthResponse {
  status: string;
  message: string;
  timestamp?: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        setLoading(true);
        const response = await api.get<HealthResponse>("/health");
        setHealth(response.data);
        setError("");
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to connect to backend");
        setHealth(null);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-center">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          PKL-Yamatogomu
        </h1>

        <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 p-8 bg-zinc-50 dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
            Backend Status
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded">
              ❌ {error}
            </div>
          ) : health ? (
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded">
              ✅ {health.message}
            </div>
          ) : null}
        </div>

        <p className="mt-8 text-center text-zinc-600 dark:text-zinc-400 text-sm">
          Frontend is running on http://localhost:3000
          <br />
          Backend is running on http://localhost:8000
        </p>
      </main>
    </div>
  );
}
