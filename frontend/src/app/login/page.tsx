"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4">
      <div className="w-full max-w-md bg-white border border-[#e9ecef] rounded-2xl shadow-xl p-8 animate-fade-in">
        {/* Logo and Company Info */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#5e72e4] rounded-full p-3 text-white shadow-lg">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-[#344767] mb-2 tracking-tight drop-shadow">
            PT. Yamatogomu
          </h1>
          <p className="text-[#5e72e4] text-base font-medium">
            Pabrik Karet Part Mobil
          </p>
          <p className="text-[#8392ab] text-xs mt-1">Indonesia</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-[#f5365c]/10 border border-[#f5365c] text-[#f5365c] px-4 py-3 rounded-lg text-sm font-semibold shadow">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#344767] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              className="w-full px-4 py-2 bg-[#f8f9fa] border border-[#5e72e4] rounded-lg text-[#344767] focus:ring-2 focus:ring-[#5e72e4] focus:border-transparent outline-none transition placeholder:text-[#8392ab]"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#344767] mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              className="w-full px-4 py-2 bg-[#f8f9fa] border border-[#5e72e4] rounded-lg text-[#344767] focus:ring-2 focus:ring-[#5e72e4] focus:border-transparent outline-none transition placeholder:text-[#8392ab]"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5e72e4] to-[#825ee4] hover:from-[#233dd2] hover:to-[#5e72e4] text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t border-[#e9ecef]">
          <p className="text-[#5e72e4] text-sm font-semibold mb-3">
            Akun Demo:
          </p>
          <div className="space-y-2 text-xs text-[#8392ab]">
            <div>
              <p className="font-semibold text-[#344767]">Admin IT:</p>
              <p>Email: admin@yamatogomu.com</p>
              <p>Password: password123</p>
            </div>
            <div className="pt-2">
              <p className="font-semibold text-[#344767]">Operator:</p>
              <p>Email: operator@yamatogomu.com</p>
              <p>Password: password123</p>
            </div>
            <div className="pt-2">
              <p className="font-semibold text-[#344767]">Admin Press:</p>
              <p>Email: admin.press@yamatogomu.com</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
