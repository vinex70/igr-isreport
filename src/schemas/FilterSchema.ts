import * as z from "zod";

export const filterKlikSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.string().optional(),
    trxPb: z.string().optional(),
    obi_shippingservice: z.string().optional(),
    ekspedisi: z.string().toUpperCase().optional(),
})