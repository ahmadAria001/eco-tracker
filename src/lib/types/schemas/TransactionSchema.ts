import {z, ZodType} from "zod";
import {TransactionCategory} from "@/lib/types/enums/TransactionCategory";

export class TransactionSchema {
    static POST: ZodType = z.object({
        amount: z.number().positive(),
        description: z.string().min(1).max(255),
        category: z.nativeEnum(TransactionCategory).optional(),
    });
}