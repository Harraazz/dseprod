"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"

import TiptapEditor from "@/components/TiptapEditor"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

// --- Zod schema ---
const formSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  isi: z.string().min(1, "Isi berita wajib diisi"),
  tanggal: z.date(),
  status: z.string().min(1, "Status wajib diisi"),
  gambar: z.any().optional(),
})

export default function FormBerita() {
  const [date, setDate] = useState<Date>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: "",
      isi: "",
      status: "",
    },
  })

  // --- Tiptap setup ---
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: "",
    immediatelyRender: false, // penting untuk Next.js SSR
    onUpdate: ({ editor }) => {
      form.setValue("isi", editor.getHTML())
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="px-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Detail Berita</h2>

            {/* Judul Berita */}
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Berita<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul berita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Isi Berita - Tiptap */}
            <FormField
              control={form.control}
              name="isi"
              render={(field) => (
                <FormItem>
                  <FormLabel>Isi Berita<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="">
                      <TiptapEditor value={field.value} onChange={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tanggal Berita */}
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Berita<span className="text-red-500">*</span></FormLabel>
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

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Draft / Publish" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Upload Gambar */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Gambar</h2>
            <Input type="file" {...form.register("gambar")} />
          </div>

          <Button type="submit" className="w-full bg-teal-600 text-white">
            Selesai
          </Button>
        </form>
      </Form>
    </div>
  )
}
