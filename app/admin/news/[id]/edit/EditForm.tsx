"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useParams } from "next/navigation"
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

const formSchema = z.object({
  judul: z.string().min(1),
  isi: z.string().min(1),
  tanggal: z.date(),
  status: z.string().min(1),
  gambar: z.any().optional(),
})

function LoadingSkeletonBerita() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div className="h-5 w-40 bg-gray-200 rounded" />

        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-[260px] w-full bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-12 w-full bg-gray-200 rounded" />
      </div>

      <div className="h-11 w-full bg-gray-300 rounded" />
    </div>
  )
}

export default function EditBeritaPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/berita/${id}`)
      const data = await res.json()

      const tanggal = new Date(data.tanggal)
      setDate(tanggal)

      form.reset({
        judul: data.judul,
        isi: data.isi,
        tanggal,
        status: data.status,
      })

      setLoading(false)
    }

    fetchData()
  }, [id])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append("judul", values.judul)
    formData.append("isi", values.isi)
    formData.append("tanggal", values.tanggal.toISOString())
    formData.append("status", values.status)

    if (values.gambar?.[0]) {
      formData.append("gambar", values.gambar[0])
    }

    await fetch(`/api/berita/${id}`, {
      method: "PUT",
      body: formData,
    })

    router.push("/admin/news")
  }

  if (loading) return <LoadingSkeletonBerita />

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">Detail Berita</h2>

            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Berita</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isi Berita</FormLabel>
                  <FormControl>
                    <TiptapEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full justify-start">
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
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
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
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Gambar</h2>
            <Input type="file" {...form.register("gambar")}
            className="p-2 h-12"
            />
          </div>

          <Button type="submit" className="w-full">
            Simpan Perubahan
          </Button>
        </form>
      </Form>
    </div>
  )
}
