import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "../components/custom/dashboard/DashboardLayout"

export default function Home() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="max-w-2xl mb-8">
                    <h1 className="text-3xl font-bold mb-4">Theme Switcher Demo</h1>
                    <p className="text-muted-foreground mb-4">
                        This demo shows how to implement a theme switcher with custom themes using next-themes. Click on the theme
                        button in the top right to switch between themes or create your own custom theme.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>Separate Theme Mode & Color Scheme:</strong> You can independently select:
                    </p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground mt-2">
                        <li>
                            <strong>Theme Mode:</strong> Light, Dark, or System
                        </li>
                        <li>
                            <strong>Color Scheme:</strong> Default or any custom color scheme you create
                        </li>
                    </ul>
                    <p className="text-muted-foreground mt-2">
                        Custom color schemes are applied in light mode, while dark mode uses the default dark theme styling for
                        consistency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Primary Colors</CardTitle>
                            <CardDescription>These are the primary colors of the current theme</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-md bg-primary text-foreground">Primary</div>
                            <div className="p-4 rounded-md bg-secondary text-foreground">Secondary</div>
                            <div className="p-4 rounded-md bg-accent text-foreground">Accent</div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Primary Button</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Background Colors</CardTitle>
                            <CardDescription>These are the background colors of the current theme</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-md bg-background text-foreground border">Background</div>
                            <div className="p-4 rounded-md bg-muted text-muted-foreground">Muted</div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Outline Button
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Theme</CardTitle>
                            <CardDescription>Create your own theme by clicking on the theme button in the header</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Your custom theme will be saved in localStorage and can be applied anytime. You can create multiple custom
                                themes with different names.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="destructive">Destructive</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

