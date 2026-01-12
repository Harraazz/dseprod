"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import TiptapEditor from "@/components/TiptapEditor"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRouter } from "next/navigation"

// --- Zod schema ---
const formSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  isi: z.string().min(1, "Isi berita wajib diisi"),
  tanggal: z.date(),
  status: z.string().min(1, "Status wajib diisi"),
  gambar: z.any().optional(),
})

export default function FormBerita() {
  const router = useRouter()

  const [date, setDate] = useState<Date>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      isi: "",
      status: "",
    },
  })

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const formData = new FormData()
    formData.append("judul", values.judul)
    formData.append("isi", values.isi)
    formData.append("tanggal", values.tanggal.toISOString())
    formData.append("status", values.status)

    if (values.gambar && values.gambar[0]) {
      formData.append("gambar", values.gambar[0])
    }

    const res = await fetch("/api/berita", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || "Gagal menyimpan berita")
    }

    // reset form atau redirect
    router.push("/admin/news") // jika mau redirect
  } catch (err: any) {
    console.error(err)
    alert(err.message || "Terjadi kesalahan")
  }
}

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* SECTION: Detail Berita */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">Detail Berita</h2>

            {/* Judul */}
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Judul Berita <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul berita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Isi - Tiptap */}
            <FormField
              control={form.control}
              name="isi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Isi Berita <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <TiptapEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tanggal */}
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tanggal Berita <span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              !date && "text-muted-foreground"
                            }`}
                          >
                            {date ? format(date, "PPP") : "Pilih tanggal"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => {
                            setDate(d)
                            field.onChange(d)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Publish">Publish</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Gambar */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Gambar</h2>
            <Input type="file" {...form.register("gambar")}
            className="py-2 h-12"
            />
          </div>

          <Button type="submit" className="w-full text-white">
            Selesai
          </Button>
        </form>
      </Form>
    </div>
  )
}
