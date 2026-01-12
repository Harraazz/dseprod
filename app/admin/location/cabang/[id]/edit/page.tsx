"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Zod schema ---
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] as const;

const schema = z.object({
  namaKota: z.string().min(1, "Nama kota wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  mapsIframe: z.string().optional().or(z.literal("")),
  status: z.string().min(1, "Status wajib diisi"),
  tanggalDibuka: z.date({ message: "Tanggal dibuka wajib dipilih" }),
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
  const params = useParams();
  const cabangId = params.id as string;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [iframePreview, setIframePreview] = useState<string | null>(null);

  const [daerahList, setDaerahList] = useState<{ id: number; nama_daerah: string }[]>([]);const [loading, setLoading] = useState(true);
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
      jamBuka: "",
      jamTutup: "",
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

useEffect(() => {
  const loadDaerah = async () => {
    try {
      const res = await fetch("/api/daerah");
      if (!res.ok) {
        console.error("Gagal load daerah:", res.status);
        setDaerahList([]);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setDaerahList(data);
      } else if (Array.isArray(data.data)) {
        setDaerahList(data.data);
      } else {
        console.error("Format data daerah tidak valid:", data);
        setDaerahList([]);
      }
    } catch (err) {
      console.error("Error fetch daerah:", err);
      setDaerahList([]);
    }
  };

  loadDaerah();
}, []);

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

    useEffect(() => {
    const load = async () => {
      const [cabangRes, daerahRes] = await Promise.all([
        fetch(`/api/cabang/${cabangId}`),
        fetch("/api/daerah"),
      ]);

      const cabang = await cabangRes.json();
      const daerah = await daerahRes.json();

      setDaerahList(Array.isArray(daerah) ? daerah : daerah.data);

      setValue("namaKota", String(cabang.daerah_id));
      setValue("alamat", cabang.alamat);
      setValue("mapsIframe", cabang.maps_iframe || "");
      setValue("status", cabang.status);
      setValue("tanggalDibuka", new Date(cabang.tanggal_dibuka));
      setValue("namaPenanggung", cabang.nama_penanggung);
      setValue("emailKontak", cabang.email_kontak);
      setValue("nomorKontak", cabang.nomor_kontak);
      setValue("hariOperasional", cabang.hari_operasional ? JSON.parse(cabang.hari_operasional) : []);
      setValue("jamBuka", cabang.jam_buka);
      setValue("jamTutup", cabang.jam_tutup);

      if (cabang.gambar_url) {
        setPreviewUrl(cabang.gambar_url);
      }

      setLoading(false);
    };

    load();
  }, [cabangId, setValue]);


  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append("daerah_id", values.namaKota);
    formData.append("alamat", values.alamat);
    formData.append("maps_iframe", values.mapsIframe ?? "");
    formData.append("status", values.status);
    formData.append("tanggal_dibuka", values.tanggalDibuka.toISOString());
    formData.append("nama_penanggung", values.namaPenanggung);
    formData.append("email_kontak", values.emailKontak);
    formData.append("nomor_kontak", values.nomorKontak);
    formData.append("hari_operasional", JSON.stringify(values.hariOperasional));
    formData.append("jam_buka", values.jamBuka);
    formData.append("jam_tutup", values.jamTutup);

    if (values.gambar instanceof File) {
      formData.append("gambar", values.gambar);
    }

    const res = await fetch(`/api/cabang/${cabangId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/location/cabang");
    }
  };
  if (loading) return <div className="p-8">Loading...</div>;

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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kota / daerah" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(daerahList) && daerahList.map((d) => (
                          <SelectItem key={d.id} value={String(d.id)}>
                            {d.nama_daerah}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Nonaktif">Tidak Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
                  <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                  render={({ field }) => (
                    <div className="contents">
                      {days.map((d) => {
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
                      })}
                    </div>
                  )}
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
                    <FormMessage />
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
                    <FormMessage />
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
                  <FormMessage />

                  {selectedFileName && previewUrl && (
                    <div className="mt-3 flex items-center gap-3">
                      <Image src={previewUrl} alt="preview" className="h-20 w-20 object-cover rounded-md border" />
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