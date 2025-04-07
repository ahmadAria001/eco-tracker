'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { GithubIcon, ArrowRightIcon, LeafIcon, BarChartIcon, TreesIcon } from 'lucide-react'

export default function Home() {
    const router = useRouter()
    const { user, isLoading } = useAuth()
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            if (user) {
                // Short delay to allow the landing page to be seen
                const timer = setTimeout(() => {
                    setIsRedirecting(true)
                    router.push('/sign-in')
                }, 5000)
                return () => clearTimeout(timer)
            }
        }
    }, [user, isLoading, router])

    return (
        <div className="flex min-h-screen flex-col">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LeafIcon className="h-6 w-6 text-green-500" />
                    <h1 className="text-xl font-bold">EcoTracker</h1>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {!isLoading && !user && (
                        <Button asChild variant="outline">
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    )}
                </div>
            </header>

            <AnimatedGradient className="absolute inset-0 -z-10 opacity-20" />

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
                    <div className="container px-4 md:px-6 flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            Track Your Environmental Impact
                        </h1>
                        <p className="max-w-[700px] mt-4 text-muted-foreground md:text-xl">
                            Monitor, analyze, and improve your carbon footprint with our intuitive tools and insights.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            {!isLoading && !user ? (
                                <>
                                    <Button asChild size="lg">
                                        <Link href="/sign-in">Get Started <ArrowRightIcon className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild>
                                        <Link href="/about">Learn More</Link>
                                    </Button>
                                </>
                            ) : (
                                <Button size="lg" disabled={isRedirecting}>
                                    {isRedirecting ? "Redirecting..." : "Going to Dashboard"}
                                </Button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <LeafIcon className="h-6 w-6 text-green-500 mb-2" />
                                    <CardTitle>Track Usage</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Monitor your daily energy and resource consumption with our simple tracking tools.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <BarChartIcon className="h-6 w-6 text-blue-500 mb-2" />
                                    <CardTitle>Analyze Impact</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Get detailed insights and analytics on your environmental footprint over time.</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <TreesIcon className="h-6 w-6 text-green-700 mb-2" />
                                    <CardTitle>Improve Habits</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Receive personalized recommendations to help reduce your carbon footprint.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full py-6 bg-background border-t">
                <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <LeafIcon className="h-5 w-5 text-green-500" />
                        <p className="text-sm text-muted-foreground">© 2024 EcoTracker. All rights reserved.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="#" target="_blank" rel="noreferrer">
                                <GithubIcon className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
