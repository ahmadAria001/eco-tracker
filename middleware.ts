import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {supabase} from "@/lib/supabase";

declare module 'next/server' {
    interface NextRequest {
        user?: {
            id: string;
            email?: string;
        };
    }
}

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const {data: {session}} = await supabase.auth.getSession()

    // Apply middleware to all API routes
    if (!session && req.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.json(
            {error: 'Unauthorized'},
            {status: 401}
        )
    }

    const protectedRoutes = ['/dashboard', '/profile', '/transactions', '/settings'] // Add more protected routes here

    if (!session && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        const redirectUrl = new URL('/login', req.url)
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    if (session) {
        req.user = {
            id: session.user.id,
            email: session.user.email
        }
    }

    return res
}

// This middleware runs on every request
export const config = {
    matcher: [
        '/api/:path*',
        '/dashboard/:path*',
        '/profile/:path*',
        '/transactions/:path*',
        '/settings/:path*'
    ]
}