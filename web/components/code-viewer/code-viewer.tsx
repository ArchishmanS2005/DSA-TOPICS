'use client'

import { useState, useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import {
    Copy,
    Download,
    Check,
    FileCode2,
    BarChart3,
    Sun,
    Moon,
    Laptop,
    Play,
    BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { getAlgorithmExplanation } from '@/lib/algorithm-explanations'
import { ArrayVisualizer } from '@/components/visualizations/array-visualizer'
import { StackVisualizer } from '@/components/visualizations/stack-visualizer'
import { QueueVisualizer } from '@/components/visualizations/queue-visualizer'
import { LinkedListVisualizer } from '@/components/visualizations/linkedlist-visualizer'
import { TreeVisualizer } from '@/components/visualizations/tree-visualizer'
import { GraphVisualizer } from '@/components/visualizations/graph-visualizer'
import { HashVisualizer } from '@/components/visualizations/hash-visualizer'
import { SortingVisualizer } from '@/components/visualizations/sorting-visualizer'
import { InsertionVisualizer } from '@/components/visualizations/arrays/insertion-visualizer'
import { DeletionVisualizer } from '@/components/visualizations/arrays/deletion-visualizer'
import { ReversalVisualizer } from '@/components/visualizations/arrays/reversal-visualizer'
import { RotationVisualizer } from '@/components/visualizations/arrays/rotation-visualizer'
import { LinearSearchVisualizer } from '@/components/visualizations/arrays/linear-search-visualizer'
import { BinarySearchVisualizer } from '@/components/visualizations/arrays/binary-search-visualizer'
import { JumpSearchVisualizer } from '@/components/visualizations/arrays/jump-search-visualizer'
import { InterpolationSearchVisualizer } from '@/components/visualizations/arrays/interpolation-search-visualizer'
import { ExponentialSearchVisualizer } from '@/components/visualizations/arrays/exponential-search-visualizer'
import { FibonacciSearchVisualizer } from '@/components/visualizations/arrays/fibonacci-search-visualizer'
import { TernarySearchVisualizer } from '@/components/visualizations/arrays/ternary-search-visualizer'

interface CodeViewerProps {
    code: string
    filename: string
    topic: string
}

export function CodeViewer({ code, filename, topic }: CodeViewerProps) {
    const { theme, setTheme } = useTheme()
    const [activeTab, setActiveTab] = useState<'code' | 'explanation' | 'interactive'>('code')
    const explanation = useMemo(() => getAlgorithmExplanation(filename), [filename])
    const [copied, setCopied] = useState(false)

    const lines = useMemo(() => code.split('\n').length, [code])
    const bytes = useMemo(() => new Blob([code]).size, [code])

    const copyCode = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const downloadCode = () => {
        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        URL.revokeObjectURL(url)
    }

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark')
        else if (theme === 'dark') setTheme('system')
        else setTheme('light')
    }

    const getThemeIcon = () => {
        if (theme === 'light') return <Sun className="w-4 h-4" />
        if (theme === 'dark') return <Moon className="w-4 h-4" />
        return <Laptop className="w-4 h-4" />
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b bg-card shrink-0">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FileCode2 className="w-5 h-5 text-muted-foreground" />
                                <h1 className="text-2xl font-bold tracking-tight">{filename}</h1>
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">
                                {topic.replace(/_/g, ' ')} Implementation
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={copyCode}
                                className="gap-2 focus-ring"
                                aria-label={copied ? 'Copied!' : 'Copy code'}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={downloadCode}
                                className="gap-2 focus-ring"
                                aria-label="Download file"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={cycleTheme}
                                className="gap-2 focus-ring"
                                aria-label="Toggle theme"
                            >
                                {getThemeIcon()}
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-6 border-b">
                        <button
                            onClick={() => setActiveTab('code')}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors border-b-2 focus-ring rounded-t-md",
                                activeTab === 'code'
                                    ? "border-primary text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                            )}
                            aria-selected={activeTab === 'code'}
                            role="tab"
                        >
                            <div className="flex items-center gap-2">
                                <FileCode2 className="w-4 h-4" />
                                Code
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('explanation')}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors border-b-2 focus-ring rounded-t-md",
                                activeTab === 'explanation'
                                    ? "border-primary text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                            )}
                            aria-selected={activeTab === 'explanation'}
                            role="tab"
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Explanation
                            </div>
                        </button>
                        {explanation?.visualization?.interactive && (
                            <button
                                onClick={() => setActiveTab('interactive')}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium transition-colors border-b-2 focus-ring rounded-t-md",
                                    activeTab === 'interactive'
                                        ? "border-primary text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                                )}
                                aria-selected={activeTab === 'interactive'}
                                role="tab"
                            >
                                <div className="flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    Interactive
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-muted/30">
                <div className="max-w-7xl mx-auto p-6">
                    {activeTab === 'code' ? (
                        <Card className="overflow-hidden">
                            <div className="bg-muted/50 px-4 py-2 flex items-center justify-between border-b">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                                    <span className="tabular-nums">{lines} lines</span>
                                    <Separator orientation="vertical" className="h-4" />
                                    <span className="tabular-nums">{bytes} bytes</span>
                                    <Separator orientation="vertical" className="h-4" />
                                    <span>C</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto scrollbar-thin">
                                <SyntaxHighlighter
                                    language="c"
                                    style={theme === 'dark' ? oneDark : oneLight}
                                    showLineNumbers
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        fontSize: '0.875rem',
                                        background: 'transparent'
                                    }}
                                    lineNumberStyle={{
                                        minWidth: '3em',
                                        paddingRight: '1em',
                                        color: 'hsl(var(--muted-foreground))',
                                        opacity: 0.5,
                                        userSelect: 'none'
                                    }}
                                    codeTagProps={{
                                        style: {
                                            fontFamily: 'var(--font-mono), monospace'
                                        }
                                    }}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        </Card>
                    ) : activeTab === 'explanation' ? (
                        <div className="space-y-6">
                            {explanation ? (
                                <>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{explanation.title}</CardTitle>
                                            <CardDescription>{explanation.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Complexity Analysis */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-semibold">Complexity Analysis</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <h5 className="text-sm font-medium text-muted-foreground">Time Complexity</h5>
                                                        <div className="space-y-1">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm">Best Case:</span>
                                                                <Badge variant="secondary" className="font-mono">{explanation.timeComplexity.best}</Badge>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm">Average Case:</span>
                                                                <Badge variant="secondary" className="font-mono">{explanation.timeComplexity.average}</Badge>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm">Worst Case:</span>
                                                                <Badge variant="secondary" className="font-mono">{explanation.timeComplexity.worst}</Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h5 className="text-sm font-medium text-muted-foreground">Space Complexity</h5>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm">Total Space:</span>
                                                            <Badge variant="secondary" className="font-mono">{explanation.spaceComplexity}</Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />

                                            {/* How It Works */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-semibold">How It Works</h4>
                                                <ol className="space-y-2">
                                                    {explanation.howItWorks.map((step, index) => (
                                                        <li key={index} className="text-sm leading-relaxed">
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>

                                            <Separator />

                                            {/* Use Case */}
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-semibold">When to Use</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {explanation.useCase}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            ) : (
                                <Card>
                                    <CardContent className="py-12 text-center">
                                        <p className="text-muted-foreground">
                                            No detailed explanation available for this algorithm yet.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Interactive Visualization */}
                            {explanation?.visualization?.type === 'sorting' && (
                                <SortingVisualizer
                                    algorithm={
                                        filename === 'bubble_sort.c' || filename === 'bubble_sort' ? 'bubble_sort' :
                                            filename === 'selection_sort.c' || filename === 'selection_sort' ? 'selection_sort' :
                                                filename === 'insertion_sort.c' || filename === 'insertion_sort' ? 'insertion_sort' :
                                                    filename === 'merge_sort.c' || filename === 'merge_sort' ? 'merge_sort' :
                                                        filename === 'quick_sort.c' || filename === 'quick_sort' ? 'quick_sort' :
                                                            'bubble_sort'
                                    }
                                />
                            )}

                            {explanation?.visualization?.type === 'array' && (
                                <>
                                    {(filename === 'array_insertion.c' || filename === 'array_insertion') && <InsertionVisualizer />}
                                    {(filename === 'array_deletion.c' || filename === 'array_deletion') && <DeletionVisualizer />}
                                    {(filename === 'array_reversal.c' || filename === 'array_reversal') && <ReversalVisualizer />}
                                    {(filename === 'array_rotation.c' || filename === 'array_rotation') && <RotationVisualizer />}
                                    {(filename === 'linear_search.c' || filename === 'linear_search') && <LinearSearchVisualizer />}
                                    {(filename === 'binary_search.c' || filename === 'binary_search') && <BinarySearchVisualizer />}
                                    {(filename === 'jump_search.c' || filename === 'jump_search') && <JumpSearchVisualizer />}
                                    {(filename === 'interpolation_search.c' || filename === 'interpolation_search') && <InterpolationSearchVisualizer />}
                                    {(filename === 'exponential_search.c' || filename === 'exponential_search') && <ExponentialSearchVisualizer />}
                                    {(filename === 'fibonacci_search.c' || filename === 'fibonacci_search') && <FibonacciSearchVisualizer />}
                                    {(filename === 'ternary_search.c' || filename === 'ternary_search') && <TernarySearchVisualizer />}
                                    {/* Fallback for others if any */}
                                    {![
                                        'array_insertion', 'array_deletion', 'array_reversal', 'array_rotation',
                                        'linear_search', 'binary_search', 'jump_search', 'interpolation_search',
                                        'exponential_search', 'fibonacci_search', 'ternary_search'
                                    ].some(name => filename.includes(name)) && (
                                            <ArrayVisualizer algorithm="insertion" />
                                        )}
                                </>
                            )}

                            {explanation?.visualization?.type === 'stack' && (
                                <StackVisualizer
                                    maxSize={8}
                                    mode={filename.includes('linked') ? 'linked-list' : 'array'}
                                />
                            )}

                            {explanation?.visualization?.type === 'queue' && (
                                <QueueVisualizer
                                    type={filename.includes('circular') ? 'circular' : 'linear'}
                                    maxSize={8}
                                />
                            )}

                            {explanation?.visualization?.type === 'linkedlist' && (
                                <LinkedListVisualizer
                                    type={
                                        filename.includes('doubly') ? 'doubly' :
                                            filename.includes('circular') ? 'circular' :
                                                'singly'
                                    }
                                />
                            )}

                            {explanation?.visualization?.type === 'tree' && (
                                <TreeVisualizer
                                    type={filename.includes('heap') ? 'heap' : 'bst'}
                                />
                            )}

                            {explanation?.visualization?.type === 'graph' && (
                                <GraphVisualizer
                                    type={filename.includes('dfs') ? 'dfs' : 'bfs'}
                                />
                            )}

                            {explanation?.visualization?.type === 'hash' && (
                                <HashVisualizer />
                            )}

                            {!explanation?.visualization && (
                                <Card>
                                    <CardContent className="py-12 text-center">
                                        <p className="text-muted-foreground">
                                            Interactive visualization coming soon for this algorithm!
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
