"use client";

import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/lib/protected-route";
import Link from "next/link";

function DashboardContent() {
  const { user } = useAuth();

  const roleDescriptions: { [key: string]: string } = {
    operator: "Operator Pabrik",
    admin_press: "Administrator Press Department",
    qc: "Quality Control",
    supervisi_press: "Supervisi Press Department",
    mixing_depart: "Mixing Department",
    admin_it: "Administrator IT System",
  };

  const getRoleIcon = (roleName: string) => {
    const icons: { [key: string]: string } = {
      operator: "",
      admin_press: "",
      qc: "",
      supervisi_press: "",
      mixing_depart: "",
      admin_it: "",
    };
    return icons[roleName] || "";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Card - Glassmorphism */}
      <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/70 to-gray-900/60 border border-blue-800/40 shadow-2xl rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in">
        <h2 className="text-4xl font-extrabold mb-2 text-white drop-shadow-lg tracking-tight">
          Selamat Datang, <span className="text-blue-400">{user?.name}</span>!{" "}
          <span className="animate-wave inline-block">👋</span>
        </h2>
        <p className="text-blue-200 text-lg font-medium flex items-center justify-center gap-2">
          <span className="text-2xl">
            {getRoleIcon(user?.role?.name || "")}
          </span>
          {roleDescriptions[user?.role?.name || "operator"]}
        </p>
      </div>

      {/* Info Cards - Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/40 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <div className="text-gray-400 text-sm font-medium mb-2 tracking-wide uppercase">
            Departemen
          </div>
          <div className="text-2xl font-bold text-white drop-shadow">
            {user?.department || "-"}
          </div>
        </div>
        <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/40 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <div className="text-gray-400 text-sm font-medium mb-2 tracking-wide uppercase">
            Email
          </div>
          <div className="text-lg font-semibold text-white drop-shadow">
            {user?.email}
          </div>
        </div>
        <div className="backdrop-blur-md bg-gray-800/60 border border-gray-700/40 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <div className="text-gray-400 text-sm font-medium mb-2 tracking-wide uppercase">
            No. Telepon
          </div>
          <div className="text-lg font-semibold text-white drop-shadow">
            {user?.phone || "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
