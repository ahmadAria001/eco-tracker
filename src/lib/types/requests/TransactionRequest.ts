import {TransactionCategory} from "@/lib/types/enums/TransactionCategory";

export type PostTransactionRequest = {
    user_id: string;
    amount: number;
    description: string;
    category?: TransactionCategory;
}