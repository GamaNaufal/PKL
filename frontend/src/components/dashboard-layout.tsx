"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5e72e4] via-[#825ee4] to-[#6a82fb] text-[#344767] font-sans">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/90 border-b border-[#e9ecef] shadow-lg rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#5e72e4] to-[#825ee4] rounded-xl p-2 text-white shadow-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#5e72e4" />
                <rect x="7" y="11" width="10" height="2" rx="1" fill="#fff" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#344767] tracking-tight drop-shadow">
                PT. Yamatogomu
              </h1>
              <p className="text-xs text-[#8392ab] font-medium">
                Modern Manufacturing System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-base font-semibold text-[#344767] drop-shadow">
                {user?.name}
              </p>
              <p className="text-xs text-[#8392ab]">
                {user?.role?.display_name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#5e72e4] to-[#825ee4] hover:from-[#4e5ed3] hover:to-[#6a82fb] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-80px)] bg-white/90 border-r border-[#e9ecef] shadow-2xl rounded-3xl m-4 ml-0 flex flex-col">
          <div className="flex items-center gap-2 px-6 py-6 mb-2">
            <span className="text-2xl font-bold text-[#5e72e4]">
              PT. Yamatogomu
            </span>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f9fc] text-[#344767] font-semibold transition-all duration-150 group"
            >
              <span className="text-xl">🏠</span>
              <span className="group-hover:underline">Dashboard</span>
            </Link>
            {/* Operator only: Press History Form */}
            {user?.role?.name === "operator" && (
              <Link
                href="/dashboard/press-history"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f9fc] text-[#344767] font-semibold transition-all duration-150 group"
              >
                <span className="text-xl">📝</span>
                <span className="group-hover:underline">
                  Laporan Historis Press
                </span>
              </Link>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12">{children}</main>
      </div>
    </div>
  );
}
