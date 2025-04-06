import {TransactionCategory} from "@/lib/types/enums/TransactionCategory";

export type Transaction = {
    id: string
    user_id: string
    amount: number
    category: TransactionCategory
    description: string
    created_at: string
}