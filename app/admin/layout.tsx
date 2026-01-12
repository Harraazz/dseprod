'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    async function fetchToken() {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      if (!json.user) {
        return router.push("/login")
      };
    }
    fetchToken();
  }, []);

  // const res = await fetch("/api/auth/me");
  // const json = await res.json();
  // if (!json.user) router.push("/login");

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="bg-slate-100 w-full overflow-hidden">
        <SidebarTrigger className="absolute top-5 md:hidden mb-4" />
        {children}
      </main>
    </SidebarProvider>
  )
}