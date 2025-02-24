// Purpose: Schemas for filtering sales details.
import { z } from "zod";


export const filterSalesDetailSchema = z.object({
    startDate: z.string().min(1, { message: "Tanggal mulai tidak boleh kosong" }).refine((val) => !isNaN(Date.parse(val)), {
        message: "Start date must be a valid date",
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "End date must be a valid date",
    }),
    div: z.string().optional(),
    dept: z.string().optional(),
    kat: z.string().optional(),
    tag: z.string().optional(),
    prdcd: z
        .string()
        .max(7, { message: "Kode barang tidak boleh lebih dari 7 digit" })
        .transform((v) => (v ? v.trim().padStart(7, "0") : v))
        .refine((v) => !v || /^\d+$/.test(v), { message: "PLU harus berupa angka" }) // Validasi hanya jika ada nilai
        .optional(),
    prdcdGrup: z.array(z.string()).optional().default([]),
    barcode: z.string().optional(),
    monitoringPlu: z.string().transform((val) => val.toUpperCase()).optional(),
    struk: z.string().transform((val) => val.toUpperCase()).optional(),
    namaBarang: z.string().transform((val) => val.toUpperCase()).optional(),
    pluLarangan: z.string().optional(),
    noMember: z.string().transform((val) => val.toUpperCase()).optional(),
    namaMember: z
        .string()
        .optional()
        .transform((val) => (val && val.trim() ? val.toUpperCase().replace(/\s+/g, "%") : undefined)),
    memberKhusus: z.string().transform((val) => val.toUpperCase()).optional(),
    outlet: z.string().transform((val) => val.toUpperCase()).optional(),
    subOutlet: z.string().transform((val) => val.toUpperCase()).optional(),
    kategori: z.string().optional(),
    subKategori: z.string().optional(),
    cashback: z.array(z.string()).optional().default([]),
    cbAktif: z.string().transform((val) => val.toUpperCase()).optional(),
    cbUc: z.string().transform((val) => val.toUpperCase()).optional(),
    cbredempoin: z.string().transform((val) => val.toUpperCase()).optional(),
    promo: z.array(z.string()).optional().default([]),
    gift: z.string().transform((val) => val.toUpperCase()).optional(),
    tipeMember: z.string().toUpperCase().optional(),
    groupMember: z.string().toUpperCase().optional(),
    kasirType: z.string().optional(),
    methodType: z.string().optional(),
    kasir: z.array(z.string()).optional().default([]),
    kode_supplier: z.array(z.string()).optional().default([]),
    namaSupplier: z
        .string()
        .optional()
        .transform((val) => (val && val.trim() ? val.toUpperCase().replace(/\s+/g, "%") : undefined)),
    monitoringSupplier: z.string().transform((val) => val.toUpperCase()).optional(),
    selectedReport: z.string().default("perdivisi"),

}).refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be before or equal to end date",
    path: ["startDate"],
});
