import {Transaction} from "@/lib/types/models/Transaction";
import {PaginationMeta} from "@/lib/types/responses/response";

export type GetTransactionsResponse = {
    transactions: Transaction[];
    pagination: PaginationMeta;
};