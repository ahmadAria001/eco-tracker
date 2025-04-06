import {NextRequest} from "next/server";
import {TransactionCategory} from "@/lib/types/enums/TransactionCategory";
import {supabase} from "@/lib/supabase";
import {PostTransactionRequest} from "@/lib/types/requests/TransactionRequest";
import {TransactionSchema} from "@/lib/types/schemas/TransactionSchema";
import {ApiResponse} from "@/lib/types/responses/response";
import {GetTransactionsResponse} from "@/lib/types/responses/TransactionResponse";
import {Transaction} from "@/lib/types/models/Transaction";

export async function getTransactions(request: NextRequest, user: {
    id: string
}): Promise<ApiResponse<GetTransactionsResponse>> {
    try {
        const {searchParams} = request.nextUrl
        const filters = {
            amountMin: parseFloat(searchParams.get('amount_min') || ''),
            amountMax: parseFloat(searchParams.get('amount_max') || ''),
            category: searchParams.get('category') as TransactionCategory | null,
            year: searchParams.get('year'),
            month: searchParams.get('month'),
            day: searchParams.get('day')
        }

        const pagination = {
            page: Math.max(1, parseInt(searchParams.get('page') || '1')),
            limit: Math.max(1, parseInt(searchParams.get('limit') || '10')),
            get offset() {
                return (this.page - 1) * this.limit
            }
        }

        let query = supabase
            .from('transactions')
            .select('*', {count: 'exact'})
            .eq('user_id', user.id)
            .order('created_at', {ascending: false})
            .range(pagination.offset, pagination.offset + pagination.limit - 1)

        if (!isNaN(filters.amountMin)) query = query.gte('amount', filters.amountMin)
        if (!isNaN(filters.amountMax)) query = query.lte('amount', filters.amountMax)
        if (filters.category) query = query.eq('category', filters.category)

        if (filters.year) {
            const dateFilter = filters.day && filters.month
                ? `${filters.year}-${filters.month.padStart(2, '0')}-${filters.day.padStart(2, '0')}%`
                : filters.month
                    ? `${filters.year}-${filters.month.padStart(2, '0')}-%`
                    : `${filters.year}-%`
            query = query.ilike('created_at', dateFilter)
        }

        const {data, error, count} = await query

        if (error) {
            return {success: false, error: error.message}
        }

        return {
            success: true,
            data: {
                transactions: data ?? [],
                pagination: {
                    ...pagination,
                    total: count ?? 0,
                    totalPages: Math.ceil((count ?? 0) / pagination.limit)
                }
            },
        }
    } catch (err) {
        return {success: false, error: (err as Error).message}
    }
}

export async function createTransaction(
    body: PostTransactionRequest,
    userId: string
): Promise<ApiResponse<Transaction>> {
    try {
        const parsed = TransactionSchema.POST.parse(body);

        const {data, error} = await supabase
            .from('transactions')
            .insert({
                ...parsed,
                user_id: userId
            })
            .select()
            .single();

        if (error) {
            return {success: false, error: error.message};
        }

        return {data: data, success: true};
    } catch (err) {
        return {success: false, error: (err as Error).message};
    }
}
