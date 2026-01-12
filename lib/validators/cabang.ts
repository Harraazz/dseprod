import { z } from 'zod'

export const createCabangSchema = z.object({
  daerah_id: z.coerce.number().int(),
  alamat: z.string().min(5),
  maps_iframe: z.string().optional().nullable(),
  status: z.enum(['Aktif', 'Nonaktif']),
  tanggal_dibuka: z.coerce.date(),
  nama_penanggung: z.string().min(3),
  email_kontak: z.string().email(),
  nomor_kontak: z.string().min(8),
  hari_operasional: z.string().optional().nullable(), // JSON string
  jam_buka: z.string(),
  jam_tutup: z.string(),
})
