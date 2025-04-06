'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/contexts/AuthContext'

export default function Home() {
    const router = useRouter()
    const {user, isLoading} = useAuth()

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/sign-in')
            } else {
                router.push('/dashboard')
            }
        }
    }, [user, isLoading, router])

    return null
}
