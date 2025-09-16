
import {  StatusBarangValue, StatusPinjamanValue, visibilityValue} from "@/config/enum-type";
import * as z from "zod";


const imageSchema = z.union([
  // File object untuk upload baru
  z.instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/svg+xml", "image/gif"].includes(
          file.type
        ),
      {
        message: "Only JPEG, PNG, SVG, and GIF files are allowed",
      }
    ),
  z.string().min(1, "Picture is required"),
])


export const FileMetadata = z.object({
  name:  z.coerce.string().min(1, "File name is required"),
  size: z.coerce.number().min(1, "File size is required"),
  type: z.coerce.string().min(1, "File type is required"),
});

export const FileWithPreview = z.object({
  file: FileMetadata,
  id: z.coerce.string().min(1, "File ID is required"),
  preview: z.coerce.string().optional(),
  base64Data: z.coerce.string().min(1, "File data is required") // Tambahkan base64Data sebagai required
})




export const pinjamanSchemas = z.object({
  id: z.number().optional(),
  barang_id: z.number().min(1),
  nama: z.string().min(4, "Name is required"),
  tanggal_dipinjam: z.coerce.date(),
  tanggal_dikembalikan: z.coerce.date(),


jumlah_pinjaman: z.coerce.number().min(1, "Harga is required"),
status: z.enum(StatusPinjamanValue).optional(),

created_at: z.coerce.date().optional(),
updated_at: z.coerce.date().optional(),


});


export const barangSchema = z.object({
    id: z.number().optional(),
  nama: z.string().min(4, "Name is required"),
  gambar: imageSchema,
  deskripsi: z.string().optional(),
  quantity: z.coerce.number().min(2, "Harga is required"),
  
  visibility: z.enum(visibilityValue).optional(),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),

   pinjaman: pinjamanSchemas.array().optional(),
   status: z.enum(StatusBarangValue).optional(),


});




export const  userSchema = z.object ({
    id:  z.number().optional(),
    name:  z.coerce.string().min(1, "File name is required"),
    email: z.coerce.string().min(1, "File name is required"),
    avatar:  z.coerce.string().optional(),
    email_verified_at:  z.coerce.string().min(1, "File name is required"),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
})

export const pinjamanSchema = z.object({
    id: z.number().optional(),
    barang_id: z.number().min(1),
    nama: z.string().min(4, "Name is required"),
    tanggal_dipinjam: z.coerce.date(),
    tanggal_dikembalikan: z.coerce.date(),


  jumlah_pinjaman: z.coerce.number().min(1, "Harga is required"),
  status: z.enum(StatusPinjamanValue).optional(),
  barang: barangSchema.optional(),
  peminjam: userSchema.optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),


});



export type PinjamanSchema = z.infer<typeof pinjamanSchema>;
export type BarangsSchema = z.infer<typeof barangSchema>;
