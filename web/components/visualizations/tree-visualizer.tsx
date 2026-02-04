'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, RotateCcw, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TreeNode {
    value: number
    left: TreeNode | null
    right: TreeNode | null
    x?: number
    y?: number
    id: number
}

interface TreeVisualizerProps {
    type?: 'bst' | 'heap'
}

export function TreeVisualizer({ type = 'bst' }: TreeVisualizerProps) {
    const [root, setRoot] = useState<TreeNode | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedNodes, setHighlightedNodes] = useState<number[]>([])
    const [steps, setSteps] = useState<string[]>([])
    const [nextId, setNextId] = useState(0)
    const [searchResult, setSearchResult] = useState<string>('')

    const reset = () => {
        setRoot(null)
        setInputValue('')
        setHighlightedNodes([])
        setSteps([])
        setNextId(0)
        setSearchResult('')
        setIsAnimating(false)
    }

    const insertNode = (node: TreeNode | null, value: number, newSteps: string[]): TreeNode => {
        if (node === null) {
            newSteps.push(`Created new node with value ${value}`)
            return { value, left: null, right: null, id: nextId }
        }

        if (value < node.value) {
            newSteps.push(`${value} < ${node.value}, going left`)
            node.left = insertNode(node.left, value, newSteps)
        } else if (value > node.value) {
            newSteps.push(`${value} > ${node.value}, going right`)
            node.right = insertNode(node.right, value, newSteps)
        } else {
            newSteps.push(`Value ${value} already exists in tree`)
        }

        return node
    }

    const animateInsert = async () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert('Please enter a valid number!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        newSteps.push(`Inserting ${value} into BST...`)
        setSteps([...newSteps])
        await sleep(600)

        const newRoot = insertNode(root, value, newSteps)
        setRoot({ ...newRoot })
        setNextId(nextId + 1)

        newSteps.push(`✅ Inserted ${value} successfully!`)
        setSteps([...newSteps])

        setInputValue('')
        setIsAnimating(false)
    }

    const searchNode = async (node: TreeNode | null, value: number, newSteps: string[], path: number[]): Promise<boolean> => {
        if (node === null) {
            newSteps.push(`Reached null, ${value} not found`)
            return false
        }

        path.push(node.id)
        setHighlightedNodes([...path])
        newSteps.push(`Visiting node ${node.value}`)
        setSteps([...newSteps])
        await sleep(800)

        if (value === node.value) {
            newSteps.push(`✅ Found ${value}!`)
            setSteps([...newSteps])
            return true
        } else if (value < node.value) {
            newSteps.push(`${value} < ${node.value}, searching left subtree`)
            setSteps([...newSteps])
            await sleep(600)
            return await searchNode(node.left, value, newSteps, path)
        } else {
            newSteps.push(`${value} > ${node.value}, searching right subtree`)
            setSteps([...newSteps])
            await sleep(600)
            return await searchNode(node.right, value, newSteps, path)
        }
    }

    const animateSearch = async () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert('Please enter a valid number!')
            return
        }

        setIsAnimating(true)
        setHighlightedNodes([])
        const newSteps: string[] = [...steps]

        newSteps.push(`Searching for ${value} in BST...`)
        setSteps([...newSteps])
        await sleep(600)

        const found = await searchNode(root, value, newSteps, [])

        if (!found) {
            newSteps.push(`❌ ${value} not found in tree`)
            setSteps([...newSteps])
        }

        await sleep(1000)
        setHighlightedNodes([])
        setInputValue('')
        setIsAnimating(false)
    }

    const renderTree = (node: TreeNode | null, x: number, y: number, offset: number): React.ReactElement[] => {
        if (!node) return []

        const elements: React.ReactElement[] = []
        const nodeSize = 40

        // Draw lines to children first (so they appear behind nodes)
        if (node.left) {
            const leftX = x - offset
            const leftY = y + 80
            elements.push(
                <line
                    key={`line-left-${node.id}`}
                    x1={x}
                    y1={y + nodeSize / 2}
                    x2={leftX}
                    y2={leftY - nodeSize / 2}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                />
            )
            elements.push(...renderTree(node.left, leftX, leftY, offset / 2))
        }

        if (node.right) {
            const rightX = x + offset
            const rightY = y + 80
            elements.push(
                <line
                    key={`line-right-${node.id}`}
                    x1={x}
                    y1={y + nodeSize / 2}
                    x2={rightX}
                    y2={rightY - nodeSize / 2}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                />
            )
            elements.push(...renderTree(node.right, rightX, rightY, offset / 2))
        }

        // Draw node
        elements.push(
            <g key={`node-${node.id}`}>
                <circle
                    cx={x}
                    cy={y}
                    r={nodeSize / 2}
                    className={cn(
                        "transition-all duration-300",
                        highlightedNodes.includes(node.id)
                            ? "fill-primary stroke-primary"
                            : "fill-card stroke-border"
                    )}
                    strokeWidth="2"
                />
                <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                        "text-sm font-bold transition-colors",
                        highlightedNodes.includes(node.id)
                            ? "fill-primary-foreground"
                            : "fill-foreground"
                    )}
                >
                    {node.value}
                </text>
            </g>
        )

        return elements
    }

    const getTreeHeight = (node: TreeNode | null): number => {
        if (!node) return 0
        return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right))
    }

    const height = getTreeHeight(root)
    const svgHeight = Math.max(300, height * 80 + 50)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {type === 'bst' ? 'Binary Search Tree' : 'Max Heap'} Visualizer
                </CardTitle>
                <CardDescription>
                    {type === 'bst'
                        ? 'Left < Parent < Right - Hierarchical data structure'
                        : 'Parent ≥ Children - Complete binary tree'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                    <Input
                        type="number"
                        placeholder="Value"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-32"
                        disabled={isAnimating}
                        onKeyDown={(e) => e.key === 'Enter' && !isAnimating && animateInsert()}
                    />
                    <Button
                        onClick={animateInsert}
                        disabled={isAnimating}
                        size="sm"
                        className="gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Insert
                    </Button>
                    <Button
                        onClick={animateSearch}
                        disabled={isAnimating || !root}
                        size="sm"
                        variant="secondary"
                        className="gap-2"
                    >
                        <Search className="w-4 h-4" />
                        Search
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                {/* Tree Visualization */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">
                        Tree Structure {root && `(Height: ${height})`}
                    </h4>
                    <div className="bg-muted/20 rounded-lg p-4 overflow-auto">
                        {root ? (
                            <svg
                                width="100%"
                                height={svgHeight}
                                viewBox={`0 0 800 ${svgHeight}`}
                                className="mx-auto"
                            >
                                {renderTree(root, 400, 30, 150)}
                            </svg>
                        ) : (
                            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                                Tree is empty - Insert values to build the tree
                            </div>
                        )}
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
