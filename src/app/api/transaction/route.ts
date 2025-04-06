import {NextRequest, NextResponse} from 'next/server'
import {PostTransactionRequest} from '@/lib/types/requests/TransactionRequest'
import {createTransaction, getTransactions} from "@/lib/services/transaction-service";

export async function GET(request: NextRequest) {
    const user = request.user;
    if (!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const result = await getTransactions(request, user);

    if (!result.success) {
        return NextResponse.json({error: result.error}, {status: 400});
    }

    return NextResponse.json({
        data: result.data.transactions,
        pagination: result.data.pagination
    }, {status: 200});
}

export async function POST(request: NextRequest) {
    const user = request.user;
    if (!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body: PostTransactionRequest = await request.json();
    const result = await createTransaction(body, user.id);

    if (!result.success) {
        return NextResponse.json({error: result.error}, {status: 400});
    }

    return NextResponse.json({data: result.data}, {status: 200});
}
