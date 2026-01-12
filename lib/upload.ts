import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/cabang')

export async function saveCabangImage(file: File) {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })

  const ext = file.name.split('.').pop()
  const filename = `${nanoid()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)

  return `/uploads/cabang/${filename}`
}
