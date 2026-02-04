import Link from 'next/link'
import { ArrowRight, Code2, Zap, Eye, BarChart3, Layers, BookOpen } from 'lucide-react'
import { getTopics } from '@/lib/dsa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TOPIC_LABELS, TOPIC_DESCRIPTIONS } from '@/lib/constants'

export default function HomePage() {
    const topics = getTopics()
    const totalFiles = topics.reduce((acc, topic) => acc + topic.files.length, 0)

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background opacity-50" />

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-fade-in">
                            <Code2 className="w-10 h-10 text-primary" />
                        </div>

                        {/* Title */}
                        <div className="space-y-4 animate-fade-in">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
                                Data Structures &<br />
                                <span className="gradient-text">Algorithms in C</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                                Learn through code and interactive visualizations. Explore {totalFiles} implementations across {topics.length} topics.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                            <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all focus-ring touch-target" asChild>
                                <Link href={topics[0] ? `/${topics[0].name}/${topics[0].files[0]}` : "#"}>
                                    Explore Code
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2 focus-ring touch-target" asChild>
                                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    <Code2 className="w-4 h-4" />
                                    View on GitHub
                                </Link>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in">
                            <div className="text-center">
                                <div className="text-4xl font-bold tabular-nums">{totalFiles}</div>
                                <div className="text-sm text-muted-foreground">Code Files</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold tabular-nums">{topics.length}</div>
                                <div className="text-sm text-muted-foreground">Topics</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold">100%</div>
                                <div className="text-sm text-muted-foreground">Open Source</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why DSA Visualizer?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A modern approach to learning data structures and algorithms through clean code and interactive visualizations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Code2,
                            title: 'Clean Architecture',
                            description: 'Well-structured C code following best practices and industry standards.'
                        },
                        {
                            icon: Zap,
                            title: 'Dynamic Loading',
                            description: 'Fast, optimized code viewer with syntax highlighting and instant navigation.'
                        },
                        {
                            icon: Eye,
                            title: 'Live Visualizations',
                            description: 'Interactive visual representations of data structures and algorithms in action.'
                        },
                        {
                            icon: BarChart3,
                            title: 'Complexity Analysis',
                            description: 'Time and space complexity breakdowns for every algorithm implementation.'
                        },
                        {
                            icon: Layers,
                            title: 'Minimalist Design',
                            description: 'Clean black & white interface that puts focus on the code and concepts.'
                        },
                        {
                            icon: BookOpen,
                            title: 'Educational',
                            description: 'Perfect for students, educators, and anyone learning DSA fundamentals.'
                        }
                    ].map((feature, i) => (
                        <Card
                            key={i}
                            className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 relative overflow-hidden content-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Topics Preview */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Topics</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Browse through comprehensive implementations of fundamental data structures and algorithms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic) => {
                        const firstFile = topic.files[0]
                        const href = firstFile ? `/${topic.name}/${firstFile}` : '#'
                        const label = TOPIC_LABELS[topic.name] || topic.name.replace(/_/g, ' ')
                        const description = TOPIC_DESCRIPTIONS[topic.name] || 'Explore implementations'

                        return (
                            <Link key={topic.name} href={href} className="group focus-ring rounded-lg">
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50">
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <CardTitle className="text-2xl capitalize group-hover:text-primary transition-colors">
                                                {label}
                                            </CardTitle>
                                            <Badge variant="secondary" className="tabular-nums">
                                                {topic.files.length}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-sm">
                                            {description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                            <span>View implementations</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
