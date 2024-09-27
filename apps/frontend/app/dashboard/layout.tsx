"use client";
import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/ui/loading";
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") return <LoadingSpinner />;
  if (status === "unauthenticated") {
    router.push("/auth");
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
