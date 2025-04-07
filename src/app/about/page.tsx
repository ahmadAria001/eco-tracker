'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { GithubIcon, ArrowRightIcon, LeafIcon, BarChartIcon, TreesIcon, UsersIcon, LightbulbIcon, HeartIcon } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LeafIcon className="h-6 w-6 text-green-500" />
          <h1 className="text-xl font-bold">EcoTracker</h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </header>
      
      <AnimatedGradient className="absolute inset-0 -z-10 opacity-20" />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              About EcoTracker
            </h1>
            <p className="max-w-[700px] mt-4 text-muted-foreground md:text-xl">
              Our mission is to help individuals and organizations reduce their environmental impact through data-driven insights.
            </p>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="text-muted-foreground text-lg">
                  EcoTracker was founded in 2024 with a simple goal: make environmental impact tracking accessible to everyone. 
                  We believe that small changes, when multiplied across millions of people, can create significant positive change for our planet.
                </p>
                <p className="text-muted-foreground text-lg">
                  Our team of environmental scientists, data analysts, and developers work together to create tools that provide actionable insights 
                  based on your daily activities, helping you make more sustainable choices without sacrificing convenience.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <LightbulbIcon className="h-6 w-6 text-yellow-500 mb-2" />
                      <CardTitle>Data-Driven</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>We use scientific research and robust data models to accurately calculate environmental impact.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <UsersIcon className="h-6 w-6 text-blue-500 mb-2" />
                      <CardTitle>User-Focused</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Our tools are designed with you in mind, making sustainability tracking simple and engaging.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <HeartIcon className="h-6 w-6 text-red-500 mb-2" />
                      <CardTitle>Purpose-Driven</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>We're committed to creating a healthier planet through technology and community action.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Impact</h2>
                <p className="text-muted-foreground text-lg">
                  Since our launch, EcoTracker users have collectively:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <li className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </li>
                  <li className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-4xl font-bold text-primary mb-2">25 tons</div>
                    <div className="text-sm text-muted-foreground">CO₂ Reduced</div>
                  </li>
                  <li className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                    <div className="text-sm text-muted-foreground">Trees Planted</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of environmentally conscious individuals and start tracking your impact today.
            </p>
            <Button asChild size="lg">
              <Link href="/sign-in">Get Started <ArrowRightIcon className="ml-2 h-4 w-4" /></Link>
            </Button>
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