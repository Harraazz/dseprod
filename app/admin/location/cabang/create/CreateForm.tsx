"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Zod schema ---
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] as const;

const schema = z.object({
  namaKota: z.string().min(1, "Nama kota wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  mapsIframe: z.string().optional().or(z.literal("")),
  status: z.string().min(1, "Status wajib diisi"),
  tanggalDibuka: z.date({ required_error: "Tanggal dibuka wajib dipilih" }),
  namaPenanggung: z.string().min(1, "Nama penanggung jawab wajib diisi"),
  emailKontak: z.string().email("Masukkan email yang valid"),
  nomorKontak: z.string().min(4, "Nomor kontak terlalu pendek"),
  hariOperasional: z.array(z.string()).min(1, "Pilih minimal 1 hari operasional"),
  jamBuka: z.string().min(1, "Jam buka wajib diisi"),
  jamTutup: z.string().min(1, "Jam tutup wajib diisi"),
  gambar: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file instanceof File;
    }, { message: "File tidak valid" }),
});

type FormValues = z.infer<typeof schema>;

// --- Component ---
export default function AdminLocationForm() {
  const router = useRouter();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [iframePreview, setIframePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      namaKota: "",
      alamat: "",
      mapsIframe: "",
      status: "",
      tanggalDibuka: new Date(),
      namaPenanggung: "",
      emailKontak: "",
      nomorKontak: "",
      hariOperasional: [],
      jamBuka: "08:00",
      jamTutup: "17:00",
      gambar: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const watchTanggal = watch("tanggalDibuka");
  const watchGambar = watch("gambar");
  const watchMaps = watch("mapsIframe");

  // preview image when file chosen
  useEffect(() => {
    if (watchGambar && watchGambar instanceof File) {
      const url = URL.createObjectURL(watchGambar);
      setPreviewUrl(url);
      setSelectedFileName(watchGambar.name);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
      setSelectedFileName(null);
    }
  }, [watchGambar]);

  // iframe preview sanitization note:
  // We simply render provided iframe string via dangerouslySetInnerHTML.
  // Make sure only trusted admins can use this input in production.
  useEffect(() => {
    if (watchMaps && typeof watchMaps === "string" && watchMaps.trim() !== "") {
      setIframePreview(watchMaps);
    } else {
      setIframePreview(null);
    }
  }, [watchMaps]);

  const onSubmit = async (values: FormValues) => {
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append("namaKota", values.namaKota);
      formData.append("alamat", values.alamat);
      formData.append("mapsIframe", values.mapsIframe ?? "");
      formData.append("status", values.status);
      formData.append("tanggalDibuka", values.tanggalDibuka.toISOString());
      formData.append("namaPenanggung", values.namaPenanggung);
      formData.append("emailKontak", values.emailKontak);
      formData.append("nomorKontak", values.nomorKontak);
      formData.append("hariOperasional", JSON.stringify(values.hariOperasional));
      formData.append("jamBuka", values.jamBuka);
      formData.append("jamTutup", values.jamTutup);
      if (values.gambar instanceof File) {
        formData.append("gambar", values.gambar);
      }

      // Demo: print entries (replace with fetch('/api/location'...) in production)
      console.log("Submitting Location (FormData):");
      for (const pair of (formData as any).entries()) {
        console.log(pair[0], pair[1]);
      }

      // Here you would call your API, e.g.:
      // await fetch('/api/location', { method: 'POST', body: formData });

      // On success redirect to /admin/location/daerah
      router.push("/admin/location/daerah");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full mx-auto p-8 space-y-6 font-regular">

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informasi Lokasi */}
          <Card className="p-6 space-y-1">
            <h2 className="text-2xl font-semibold">Informasi Lokasi</h2>

            <FormField
              control={control}
              name="namaKota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kota <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Jakarta" {...field} />
                  </FormControl>
                  <FormMessage>{errors.namaKota?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Lengkap <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Alamat lengkap lokasi" {...field} rows={4} />
                  </FormControl>
                  <FormMessage>{errors.alamat?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="mapsIframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps (iframe embed)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tempel code iframe Google Maps, contoh: <iframe src="..." />'
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage>{errors.mapsIframe?.message}</FormMessage>
                  {iframePreview && (
                    <div className="mt-3 border w-150 rounded overflow-hidden">
                      <div
                        className=" h-full"
                        dangerouslySetInnerHTML={{ __html: iframePreview }}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Nonaktif" defaultChecked>Tidak Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{errors.status?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="tanggalDibuka"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Dibuka <span className="text-red-500">*</span></FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <button
                            type="button"
                            className="w-full rounded-md border px-3 py-2 text-left flex items-center justify-between"
                          >
                            <span className={!watchTanggal ? "text-muted-foreground" : ""}>
                              {watchTanggal
                                ? format(new Date(watchTanggal), "dd MMMM yyyy", { locale: id })
                                : "Pilih tanggal"}
                            </span>
                            <CalendarIcon className="h-4 w-4 opacity-60" />
                          </button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={watchTanggal}
                          onSelect={(date) => {
                            setValue("tanggalDibuka", date as Date);
                            setCalendarOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>{errors.tanggalDibuka?.message?.toString()}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Data Lokasi */}
          <Card className="p-6 space-y-1">
            <h2 className="text-2xl font-semibold">Data Lokasi</h2>

            <FormField
              control={control}
              name="namaPenanggung"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Penanggung Jawab <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Nama penanggung jawab" {...field} />
                  </FormControl>
                  <FormMessage>{errors.namaPenanggung?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="emailKontak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Kontak <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="email@contoh.com" {...field} />
                    </FormControl>
                    <FormMessage>{errors.emailKontak?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="nomorKontak"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Kontak <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+62..." {...field} />
                    </FormControl>
                    <FormMessage>{errors.nomorKontak?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Hari operasional */}
            <FormItem>
              <FormLabel>Hari Operasional <span className="text-red-500">*</span></FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {/* Controller reuse: handle array of strings */}
                <Controller
                  control={control}
                  name="hariOperasional"
                  render={({ field }) =>
                    days.map((d) => {
                      const checked = field.value?.includes(d);
                      return (
                        <Label
                          key={d}
                          className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer select-none ${
                            checked ? "bg-primary/10 border-primary" : "hover:border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!checked}
                            onChange={(e) => {
                              const next = new Set(field.value || []);
                              if (e.target.checked) next.add(d);
                              else next.delete(d);
                              field.onChange(Array.from(next));
                            }}
                            className="h-4 w-4"
                          />
                          <span className="text-sm">{d}</span>
                        </Label>
                      );
                    })
                  }
                />
              </div>
              {errors.hariOperasional && (
                <p className="text-sm text-red-500 mt-1">{(errors.hariOperasional as any).message}</p>
              )}
            </FormItem>

            {/* Jam operasional (single range) */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="jamBuka"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Buka<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage>{errors.jamBuka?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="jamTutup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Tutup<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage>{errors.jamTutup?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Gambar */}
          <Card className="p-6 space-y-0">
            <h2 className="text-2xl font-semibold">Gambar</h2>
            <FormField
              control={control}
              name="gambar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Gambar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        field.onChange(f);
                      }}
                      className="w-full h-14 font-regular text-2xl text-gray-500 text-center items-center justify-center p-3 border-2"
                    />
                  </FormControl>
                  <FormMessage>{errors.gambar?.message}</FormMessage>

                  {selectedFileName && previewUrl && (
                    <div className="mt-3 flex items-center gap-3">
                      <img src={previewUrl} alt="preview" className="h-20 w-20 object-cover rounded-md border" />
                      <div>
                        <p className="text-sm font-medium">{selectedFileName}</p>
                        <p className="text-xs text-muted-foreground">Preview gambar yang akan diupload</p>
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
          </Card>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/location/cabang")} className="hover:cursor-pointer hover:text-red-500">
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="hover:cursor-pointer">
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}