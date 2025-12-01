"use client"
import { LoginForm } from "@/components/LoginForm"
import Image from "next/image"

export default function LoginPage() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center font-regular">
      <Image
        src="/login.png"
        alt="logo"
        width={1920}
        height={1080}
        className="absolute h-screen object-cover z-0 brightness-70"
      />
      <div className="flex flex-col items-center justify-center z-20">
        <LoginForm />
      </div>
    </div>
  )
}