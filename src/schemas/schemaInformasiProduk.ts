import { z } from "zod";

export const promoSchema = z.object({
    plu: z
        .string()
        .max(7, { message: "Kode barang tidak boleh lebih dari 7 digit" })
        .transform((v) => (v ? v.trim().padStart(7, "0") : v))
        .refine((v) => !v || /^\d+$/.test(v), { message: "PLU harus berupa angka" }) // Validasi hanya jika ada nilai
        .optional(),

    barcode: z.string().transform((val) => val.toUpperCase()).optional(),
    namaBarang: z.string().transform((val) => val.toUpperCase()).optional(),
    serchProduk: z.string().transform((val) => val.toUpperCase()).optional(),
});

export type PromoFormValues = z.infer<typeof promoSchema>;
