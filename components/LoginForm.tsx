"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { useRouter } from "next/navigation"

export function LoginForm({className,...props}: React.ComponentProps<"div">) {
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const email = (document.getElementById("email") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert("Login gagal!")
      return
    }

    // Simpan JWT ke localStorage
    localStorage.setItem("token", data.token)

    console.log("Login berhasil!")
    router.push("/admin/dashboard")
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-150 rounded-3xl py-8 px-8">
        <CardHeader className="text-center ">
            <Image
            src="/DSE Logo 1.png"
            alt="logo"
            width={9258}
            height={3743}
            className="w-65 py-5 mx-auto object-contain self-centerx"
            />
            <CardTitle className="text-3xl font-semibold my-3">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-12 border-1 border-black"
                    required
                  />
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-12 border-1 border-black"
                  required />
                <a
                href="#"
                className="text-sm mt-2 underline-offset-4 hover:underline"
                >
                    Forgot your password?
                </a>
                </div>
                <Button type="submit" className="w-full bg-primary h-12 text-xl mt-3 mb-3">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

