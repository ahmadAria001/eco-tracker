'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import {supabase} from '@/lib/supabase'
import {Session, User} from '@supabase/supabase-js'

type AuthContextType = {
    session: Session | null
    user: User | null
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        const initializeAuth = async () => {
            try {
                const {data: {session}} = await supabase.auth.getSession()
                setSession(session)
                setUser(session?.user ?? null)
            } catch (error) {
                console.error('Error initializing auth:', error)
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()

        // Listen for auth changes
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signInWithGoogle = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) console.error('Error signing in with Google:', error.message)
    }

    const signOut = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) console.error('Error signing out:', error.message)
    }

    return (
        <AuthContext.Provider value={{session, user, signInWithGoogle, signOut, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 