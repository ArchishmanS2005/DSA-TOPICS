'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, RotateCcw, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Node {
    data: number
    id: number
}

interface LinkedListVisualizerProps {
    type?: 'singly' | 'doubly' | 'circular'
}

export function LinkedListVisualizer({ type = 'singly' }: LinkedListVisualizerProps) {
    const [list, setList] = useState<Node[]>([])
    const [inputValue, setInputValue] = useState('')
    const [position, setPosition] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
    const [steps, setSteps] = useState<string[]>([])
    const [nextId, setNextId] = useState(0)

    const reset = () => {
        setList([])
        setInputValue('')
        setPosition('')
        setHighlightedIndices([])
        setSteps([])
        setNextId(0)
        setIsAnimating(false)
    }

    const animateInsertAtBeginning = async () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert('Please enter a valid number!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        // Step 1: Create new node
        newSteps.push(`Step 1: Creating new node with data = ${value}`)
        setSteps([...newSteps])
        await sleep(600)

        // Step 2: Point new node to head
        if (list.length > 0) {
            newSteps.push(`Step 2: New node's next points to current head (${list[0].data})`)
        } else {
            newSteps.push("Step 2: List is empty, new node's next points to NULL")
        }
        setSteps([...newSteps])
        await sleep(600)

        // Step 3: Update head
        const newNode: Node = { data: value, id: nextId }
        const newList = [newNode, ...list]
        setList(newList)
        setNextId(nextId + 1)
        setHighlightedIndices([0])
        newSteps.push(`Step 3: Updated head to point to new node`)
        setSteps([...newSteps])
        await sleep(800)

        newSteps.push(`✅ Inserted ${value} at beginning! List size: ${newList.length}`)
        setSteps([...newSteps])

        setHighlightedIndices([])
        setInputValue('')
        setIsAnimating(false)
    }

    const animateInsertAtEnd = async () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert('Please enter a valid number!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        if (list.length === 0) {
            // Same as insert at beginning
            newSteps.push('List is empty, inserting at beginning')
            setSteps([...newSteps])
            await animateInsertAtBeginning()
            return
        }

        // Step 1: Traverse to end
        newSteps.push('Step 1: Traversing to the last node...')
        setSteps([...newSteps])

        for (let i = 0; i < list.length; i++) {
            setHighlightedIndices([i])
            await sleep(300)
        }
        await sleep(400)

        // Step 2: Create new node
        newSteps.push(`Step 2: Creating new node with data = ${value}`)
        setSteps([...newSteps])
        await sleep(600)

        // Step 3: Link last node to new node
        const newNode: Node = { data: value, id: nextId }
        const newList = [...list, newNode]
        setList(newList)
        setNextId(nextId + 1)
        setHighlightedIndices([newList.length - 1])
        newSteps.push(`Step 3: Last node's next now points to new node`)
        setSteps([...newSteps])
        await sleep(800)

        newSteps.push(`✅ Inserted ${value} at end! List size: ${newList.length}`)
        setSteps([...newSteps])

        setHighlightedIndices([])
        setInputValue('')
        setIsAnimating(false)
    }

    const animateDelete = async () => {
        const pos = parseInt(position)
        if (isNaN(pos) || pos < 0 || pos >= list.length) {
            alert('Please enter a valid position!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        if (pos === 0) {
            // Delete head
            newSteps.push(`Step 1: Deleting head node (${list[0].data})`)
            setSteps([...newSteps])
            setHighlightedIndices([0])
            await sleep(800)

            newSteps.push('Step 2: Moving head to next node')
            setSteps([...newSteps])
            const newList = list.slice(1)
            setList(newList)
            await sleep(600)

            newSteps.push(`✅ Deleted node at position 0`)
        } else {
            // Traverse to position
            newSteps.push(`Step 1: Traversing to position ${pos}...`)
            setSteps([...newSteps])

            for (let i = 0; i <= pos; i++) {
                setHighlightedIndices([i])
                await sleep(300)
            }

            // Delete node
            newSteps.push(`Step 2: Deleting node with data = ${list[pos].data}`)
            setSteps([...newSteps])
            await sleep(600)

            newSteps.push(`Step 3: Updating previous node's next pointer`)
            setSteps([...newSteps])
            const newList = list.filter((_, index) => index !== pos)
            setList(newList)
            await sleep(600)

            newSteps.push(`✅ Deleted node at position ${pos}`)
        }

        setSteps([...newSteps])
        setHighlightedIndices([])
        setPosition('')
        setIsAnimating(false)
    }

    const animateReverse = async () => {
        if (list.length <= 1) {
            const newSteps = [...steps, 'List has 0 or 1 node, nothing to reverse']
            setSteps(newSteps)
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        newSteps.push('Starting reversal using 3 pointers: prev, current, next')
        setSteps([...newSteps])
        await sleep(800)

        const reversedList = [...list].reverse()

        for (let i = 0; i < list.length; i++) {
            setHighlightedIndices([i])
            newSteps.push(`Reversing pointer at position ${i}`)
            setSteps([...newSteps])
            await sleep(500)
        }

        setList(reversedList)
        newSteps.push('✅ List reversed successfully!')
        setSteps([...newSteps])

        setHighlightedIndices([])
        setIsAnimating(false)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {type === 'singly' ? 'Singly' : type === 'doubly' ? 'Doubly' : 'Circular'} Linked List Visualizer
                </CardTitle>
                <CardDescription>
                    Dynamic data structure with nodes and pointers
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
                    />
                    <Button
                        onClick={animateInsertAtBeginning}
                        disabled={isAnimating}
                        size="sm"
                        className="gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Insert at Head
                    </Button>
                    <Button
                        onClick={animateInsertAtEnd}
                        disabled={isAnimating}
                        size="sm"
                        variant="secondary"
                        className="gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Insert at Tail
                    </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Input
                        type="number"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-32"
                        disabled={isAnimating}
                    />
                    <Button
                        onClick={animateDelete}
                        disabled={isAnimating || list.length === 0}
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete at Position
                    </Button>
                    <Button
                        onClick={animateReverse}
                        disabled={isAnimating || list.length <= 1}
                        size="sm"
                        variant="outline"
                        className="gap-2"
                    >
                        Reverse List
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

                {/* List Visualization */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">Linked List (size: {list.length})</h4>
                        {list.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                                Head: {list[0].data} → Tail: {list[list.length - 1].data}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-muted/20 rounded-lg overflow-x-auto min-h-[120px]">
                        {list.length === 0 ? (
                            <div className="flex items-center justify-center w-full text-muted-foreground text-sm">
                                List is empty (HEAD → NULL)
                            </div>
                        ) : (
                            <>
                                <span className="text-xs font-semibold text-blue-500">HEAD →</span>
                                {list.map((node, index) => (
                                    <div key={node.id} className="flex items-center gap-2">
                                        <div
                                            className={cn(
                                                "flex flex-col items-center gap-1 p-4 rounded-lg border-2 transition-all duration-300 min-w-[100px]",
                                                highlightedIndices.includes(index)
                                                    ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg"
                                                    : "bg-card border-border"
                                            )}
                                        >
                                            <span className="text-xs text-muted-foreground">Node {index}</span>
                                            <span className="text-2xl font-bold">{node.data}</span>
                                            <span className="text-xs text-muted-foreground">
                                                next →
                                            </span>
                                        </div>
                                        {index < list.length - 1 && (
                                            <ArrowRight className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                                <span className="text-xs font-semibold text-muted-foreground">
                                    {type === 'circular' ? '↻ HEAD' : 'NULL'}
                                </span>
                            </>
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
