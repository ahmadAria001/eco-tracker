import {NextRequest, NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase'
import {TransactionCategory} from '@/lib/types/enums/TransactionCategory'
import {PostTransactionRequest} from '@/lib/types/request/TransactionRequest'
import {TransactionSchema} from '@/lib/types/schema/TransactionSchema'

export async function GET(request: NextRequest) {
    try {
        const user = request.user
        if (!user) return NextResponse.json({error: 'Unauthorized'}, {status: 401})

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

        // Apply amount filters
        if (!isNaN(filters.amountMin)) query = query.gte('amount', filters.amountMin)
        if (!isNaN(filters.amountMax)) query = query.lte('amount', filters.amountMax)

        // Apply category filter
        if (filters.category) query = query.eq('category', filters.category)

        // Apply date filters
        if (filters.year) {
            const dateFilter = filters.day && filters.month
                ? `${filters.year}-${filters.month.padStart(2, '0')}-${filters.day.padStart(2, '0')}%`
                : filters.month
                    ? `${filters.year}-${filters.month.padStart(2, '0')}-%`
                    : `${filters.year}-%`
            query = query.ilike('created_at', dateFilter)
        }

        const {data, error, count} = await query

        if (error) return NextResponse.json({error: error.message}, {status: 400})

        return NextResponse.json({
            data,
            pagination: {
                ...pagination,
                total: count ?? 0,
                totalPages: Math.ceil((count ?? 0) / pagination.limit)
            }
        })
    } catch (error) {
        return NextResponse.json({error}, {status: 400})
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: PostTransactionRequest = await request.json()
        const parsed = TransactionSchema.POST.parse(body)

        const {data, error} = await supabase
            .from('transactions')
            .insert({
                ...parsed,
                user_id: request.user?.id
            })
            .select()
            .single()

        if (error) return NextResponse.json({error}, {status: 400})
        return NextResponse.json({data}, {status: 200})
    } catch (error) {
        return NextResponse.json({error}, {status: 400})
    }
}