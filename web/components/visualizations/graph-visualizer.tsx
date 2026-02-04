'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GraphVisualizerProps {
    type?: 'bfs' | 'dfs'
}

interface Node {
    id: number
    x: number
    y: number
    label: string
}

interface Edge {
    from: number
    to: number
}

export function GraphVisualizer({ type = 'bfs' }: GraphVisualizerProps) {
    // Sample graph structure
    const nodes: Node[] = [
        { id: 0, x: 200, y: 50, label: 'A' },
        { id: 1, x: 100, y: 150, label: 'B' },
        { id: 2, x: 300, y: 150, label: 'C' },
        { id: 3, x: 50, y: 250, label: 'D' },
        { id: 4, x: 150, y: 250, label: 'E' },
        { id: 5, x: 350, y: 250, label: 'F' },
    ]

    const edges: Edge[] = [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 2, to: 5 },
    ]

    const [visitedNodes, setVisitedNodes] = useState<number[]>([])
    const [currentNode, setCurrentNode] = useState<number | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [steps, setSteps] = useState<string[]>([])
    const [queue, setQueue] = useState<number[]>([])

    const reset = () => {
        setVisitedNodes([])
        setCurrentNode(null)
        setSteps([])
        setQueue([])
        setIsAnimating(false)
    }

    const animateBFS = async () => {
        setIsAnimating(true)
        const newSteps: string[] = []
        const visited: number[] = []
        const q: number[] = [0]

        newSteps.push('Starting BFS from node A...')
        setSteps([...newSteps])
        await sleep(800)

        while (q.length > 0) {
            const current = q.shift()!

            if (visited.includes(current)) continue

            setCurrentNode(current)
            setQueue([...q])
            newSteps.push(`Visiting node ${nodes[current].label}`)
            setSteps([...newSteps])
            await sleep(1000)

            visited.push(current)
            setVisitedNodes([...visited])

            // Add neighbors to queue
            const neighbors = edges
                .filter(e => e.from === current)
                .map(e => e.to)
                .filter(n => !visited.includes(n))

            if (neighbors.length > 0) {
                newSteps.push(`Adding neighbors of ${nodes[current].label} to queue: ${neighbors.map(n => nodes[n].label).join(', ')}`)
                setSteps([...newSteps])
            }

            q.push(...neighbors)
            setQueue([...q])
            await sleep(800)
        }

        newSteps.push('✅ BFS traversal complete!')
        setSteps([...newSteps])
        setCurrentNode(null)
        setQueue([])
        setIsAnimating(false)
    }

    const animateDFS = async (nodeId: number, visited: number[], newSteps: string[]) => {
        if (visited.includes(nodeId)) return

        setCurrentNode(nodeId)
        newSteps.push(`Visiting node ${nodes[nodeId].label}`)
        setSteps([...newSteps])
        await sleep(1000)

        visited.push(nodeId)
        setVisitedNodes([...visited])

        const neighbors = edges
            .filter(e => e.from === nodeId)
            .map(e => e.to)
            .filter(n => !visited.includes(n))

        if (neighbors.length > 0) {
            newSteps.push(`Exploring neighbors of ${nodes[nodeId].label}: ${neighbors.map(n => nodes[n].label).join(', ')}`)
            setSteps([...newSteps])
            await sleep(600)
        }

        for (const neighbor of neighbors) {
            await animateDFS(neighbor, visited, newSteps)
        }
    }

    const startDFS = async () => {
        setIsAnimating(true)
        const newSteps: string[] = []
        const visited: number[] = []

        newSteps.push('Starting DFS from node A...')
        setSteps([...newSteps])
        await sleep(800)

        await animateDFS(0, visited, newSteps)

        newSteps.push('✅ DFS traversal complete!')
        setSteps([...newSteps])
        setCurrentNode(null)
        setIsAnimating(false)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {type === 'bfs' ? 'Breadth-First Search (BFS)' : 'Depth-First Search (DFS)'} Visualizer
                </CardTitle>
                <CardDescription>
                    {type === 'bfs'
                        ? 'Level-by-level graph traversal using a queue'
                        : 'Explore as far as possible along each branch'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={type === 'bfs' ? animateBFS : startDFS}
                        disabled={isAnimating}
                        className="gap-2"
                    >
                        <Play className="w-4 h-4" />
                        Start {type === 'bfs' ? 'BFS' : 'DFS'}
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        className="gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                {/* Queue Display for BFS */}
                {type === 'bfs' && queue.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Queue:</h4>
                        <div className="flex gap-2 p-3 bg-muted/30 rounded-lg">
                            {queue.map((nodeId, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 bg-blue-500/20 border-2 border-blue-500 rounded-lg font-bold"
                                >
                                    {nodes[nodeId].label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Graph Visualization */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Graph Structure</h4>
                    <div className="bg-muted/20 rounded-lg p-4">
                        <svg width="400" height="300" className="mx-auto">
                            {/* Draw edges */}
                            {edges.map((edge, idx) => (
                                <line
                                    key={idx}
                                    x1={nodes[edge.from].x}
                                    y1={nodes[edge.from].y}
                                    x2={nodes[edge.to].x}
                                    y2={nodes[edge.to].y}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-muted-foreground"
                                />
                            ))}

                            {/* Draw nodes */}
                            {nodes.map((node) => (
                                <g key={node.id}>
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="25"
                                        className={cn(
                                            "transition-all duration-300",
                                            currentNode === node.id
                                                ? "fill-primary stroke-primary"
                                                : visitedNodes.includes(node.id)
                                                    ? "fill-green-500 stroke-green-500"
                                                    : "fill-card stroke-border"
                                        )}
                                        strokeWidth="3"
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className={cn(
                                            "text-lg font-bold transition-colors",
                                            currentNode === node.id || visitedNodes.includes(node.id)
                                                ? "fill-white"
                                                : "fill-foreground"
                                        )}
                                    >
                                        {node.label}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-card border-2 border-border"></div>
                            <span>Unvisited</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                            <span>Current</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span>Visited</span>
                        </div>
                    </div>
                </div>

                {/* Steps Display */}
                {steps.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Execution Steps:</h4>
                        <div className="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto scrollbar-thin">
                            {steps.map((stepText, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "text-sm py-1",
                                        index === steps.length - 1 && "font-semibold text-primary"
                                    )}
                                >
                                    {stepText}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
