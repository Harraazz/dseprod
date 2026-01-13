"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { MapPinned, Home, Newspaper, Blocks, ChevronDown, DoorOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const items = [
  { title: "Beranda", url: "/admin/dashboard", icon: Home },
  { title: "Berita", url: "/admin/news", icon: Newspaper },
  {
    title: "Lokasi", url: "/admin/location", icon: MapPinned,
    items: [
      { title: "Lokasi Daerah", url: "/admin/location/daerah" },
      { title: "Lokasi Cabang", url: "/admin/location/cabang" },
    ]
  },
  { title: "Quiz", url: "/admin/quiz", icon: Blocks },
]

export default function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [openLokasi, setOpenLokasi] = useState(false)
  const isActive = (path: string) => pathname.startsWith(path)

  //Handle Logout
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        router.push("/login")
        console.log("✅ Logout successful")
    } catch (error) {
      console.log("❌ Logout Failed")
      console.error(error)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Image src="/DSE Logo 1.png" width={1920} height={1080} alt="logo" className="w-40 py-6 mx-auto object-contain" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton onClick={() => setOpenLokasi(!openLokasi)} className={`font-bold hover:bg-primary hover:text-white py-6 ${isActive(item.url) ? 'bg-primary text-white' : ''}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronDown className={`ml-auto transition-transform ${openLokasi ? '-rotate-180' : ''}`} />
                      </SidebarMenuButton>
                      {openLokasi && (
                        <div className="ml-6 mt-3 space-y-1 text-sm font-semibold font-regular">
                          {item.items.map((sub) => (
                            <Link key={sub.url} href={sub.url} className={`block px-2 py-1 rounded-md ${isActive(sub.url) ? 'text-primary' : 'hover:bg-gray-100'}`}>{sub.title}</Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild className={`font-bold py-6 ${isActive(item.url) ? 'bg-primary text-white hover:bg-primary hover:text-white' : 'hover:bg-gray-100'}`}>
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* LOGOUT */}
        <Button
        className="font-bold items-center ml-2 bg-transparent text-red-500 hover:bg-transparent border-0 shadow-none"
        onClick={handleLogout}
        >
          <DoorOpen className="h-20 w-20" size={20}/>
          Keluar
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}