'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUp, ArrowDown, Eye, RotateCcw, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface StackVisualizerProps {
    maxSize?: number
    mode?: 'array' | 'linked-list'
}

export function StackVisualizer({ maxSize = 8, mode = 'array' }: StackVisualizerProps) {
    const [stack, setStack] = useState<number[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const [steps, setSteps] = useState<string[]>([])
    const [poppedValue, setPoppedValue] = useState<number | null>(null)

    const reset = () => {
        setStack([])
        setInputValue('')
        setHighlightedIndex(null)
        setSteps([])
        setPoppedValue(null)
        setIsAnimating(false)
    }

    const animatePush = async () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert('Please enter a valid number!')
            return
        }

        if (mode === 'array' && stack.length >= maxSize) {
            const newSteps = [...steps, '❌ Stack Overflow! Cannot push - stack is full']
            setSteps(newSteps)
            return
        }
        // Linked list stack usually dynamic, but we can limit for visuals if needed.
        // Let's allow slightly more for linked list or same.
        if (mode === 'linked-list' && stack.length >= maxSize) {
            const newSteps = [...steps, '❌ Stack limit reached for visualization']
            setSteps(newSteps)
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        if (mode === 'array') {
            // ... existing array animation logic ...
            newSteps.push(`Step 1: Checking if stack is full...`)
            setSteps([...newSteps])
            await sleep(400)

            newSteps.push(`Step 2: Incrementing top pointer...`)
            setSteps([...newSteps])
            await sleep(400)

            const newStack = [...stack, value]
            setStack(newStack)
            setHighlightedIndex(newStack.length - 1)
            newSteps.push(`Step 3: Pushed ${value} to index ${newStack.length - 1}`)
            setSteps([...newSteps])
            await sleep(600)

            setHighlightedIndex(null)
        } else {
            // Linked List Logic
            // Create new node -> Point to current top -> Update top
            newSteps.push(`Step 1: Create new node with value ${value}`)
            setSteps([...newSteps])
            await sleep(400)

            newSteps.push(`Step 2: Set new node's next pointer to current Top`)
            setSteps([...newSteps])
            await sleep(400)

            const newStack = [...stack, value] // We still store as array for state simplicity
            setStack(newStack)
            setHighlightedIndex(newStack.length - 1) // Highlight new head

            newSteps.push(`Step 3: Update Top pointer to new node`)
            setSteps([...newSteps])
            await sleep(600)

            setHighlightedIndex(null)
        }

        newSteps.push(`✅ Push successful!`)
        setSteps([...newSteps])
        setInputValue('')
        setIsAnimating(false)
    }

    const animatePop = async () => {
        if (stack.length === 0) {
            const newSteps = [...steps, '❌ Stack Underflow! Cannot pop - stack is empty']
            setSteps(newSteps)
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]
        const topValue = stack[stack.length - 1]

        if (mode === 'array') {
            // ... existing array animation ...
            setHighlightedIndex(stack.length - 1)
            newSteps.push(`Step 1: Accessing top element: ${topValue}`)
            setSteps([...newSteps])
            await sleep(500)

            setPoppedValue(topValue)
            await sleep(400)

            const newStack = stack.slice(0, -1)
            setStack(newStack)
            newSteps.push(`Step 2: Decrementing top pointer`)
            setSteps([...newSteps])
            await sleep(500)
        } else {
            // Linked List Pop
            setHighlightedIndex(stack.length - 1)
            newSteps.push(`Step 1: Accessing Top node: ${topValue}`)
            setSteps([...newSteps])
            await sleep(500)

            newSteps.push(`Step 2: Move Top pointer to next node (second node)`)
            setSteps([...newSteps])
            await sleep(500)

            setPoppedValue(topValue)
            const newStack = stack.slice(0, -1)
            setStack(newStack)
            newSteps.push(`Step 3: Free memory of old Top node`)
            setSteps([...newSteps])
            await sleep(500)
        }

        newSteps.push(`✅ Pop successful! Returned: ${topValue}`)
        setSteps([...newSteps])
        setHighlightedIndex(null)
        setPoppedValue(null)
        setIsAnimating(false)
    }

    const animatePeek = async () => {
        if (stack.length === 0) {
            const newSteps = [...steps, '❌ Stack is empty! Nothing to peek']
            setSteps(newSteps)
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        const topValue = stack[stack.length - 1]
        setHighlightedIndex(stack.length - 1)
        newSteps.push(`👁️ Peek: Top element is ${topValue}`)
        setSteps([...newSteps])
        await sleep(1000)

        setHighlightedIndex(null)
        setIsAnimating(false)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {mode === 'linked-list' ? 'Linked List Stack (Dynamic)' : 'Array Stack (Fixed Size)'}
                </CardTitle>
                <CardDescription>
                    {mode === 'linked-list'
                        ? 'Dynamic implementation using nodes and pointers. Push adds to head.'
                        : 'Static implementation using an array. Push adds to index.'}
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
                        onKeyDown={(e) => e.key === 'Enter' && !isAnimating && animatePush()}
                    />
                    <Button
                        onClick={animatePush}
                        disabled={isAnimating || (mode === 'array' && stack.length >= maxSize)}
                        className="gap-2"
                        size="sm"
                    >
                        <ArrowUp className="w-4 h-4" />
                        Push
                    </Button>
                    <Button
                        onClick={animatePop}
                        disabled={isAnimating || stack.length === 0}
                        variant="secondary"
                        className="gap-2"
                        size="sm"
                    >
                        <ArrowDown className="w-4 h-4" />
                        Pop
                    </Button>
                    <Button
                        onClick={animatePeek}
                        disabled={isAnimating || stack.length === 0}
                        variant="outline"
                        className="gap-2"
                        size="sm"
                    >
                        <Eye className="w-4 h-4" />
                        Peek
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        className="gap-2"
                        size="sm"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                {/* Visualization Area */}
                <div className="space-y-4 min-h-[300px] p-6 bg-muted/20 rounded-lg border-2 border-dashed flex flex-col justify-center">

                    {/* Popped Value Animation */}
                    <AnimatePresence>
                        {poppedValue !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex justify-center mb-4"
                            >
                                <div className="animate-bounce bg-destructive text-destructive-foreground px-6 py-2 rounded-full font-bold shadow-lg">
                                    Popped: {poppedValue}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {stack.length === 0 && (
                        <div className="text-center text-muted-foreground italic">
                            {mode === 'linked-list' ? 'Head -> NULL' : 'Stack is Empty'}
                        </div>
                    )}

                    {mode === 'array' ? (
                        /* Array Mode: Vertical Stack */
                        <div className="flex flex-col-reverse gap-1 items-center">
                            <AnimatePresence>
                                {stack.map((value, index) => (
                                    <motion.div
                                        key={`${index}-arr`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                        animate={{
                                            opacity: 1,
                                            scale: highlightedIndex === index ? 1.1 : 1,
                                            y: 0,
                                            backgroundColor: highlightedIndex === index ? 'var(--primary)' : 'var(--card)'
                                        }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className={cn(
                                            "w-64 h-12 flex items-center justify-between px-4 rounded border-2 shadow-sm transition-colors",
                                            highlightedIndex === index ? "text-primary-foreground border-primary" : "bg-card border-border"
                                        )}
                                    >
                                        <span className="text-xs opacity-50">Index {index}</span>
                                        <span className="font-bold">{value}</span>
                                        {index === stack.length - 1 && <span className="text-xs font-bold">TOP</span>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        /* Linked List Mode: Vertical Nodes with Arrows */
                        <div className="flex flex-col items-center gap-2">
                            {/* Top Pointer */}
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-sm mb-1">TOP</span>
                                <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
                            </div>

                            <AnimatePresence mode='popLayout'>
                                {[...stack].reverse().map((value, reversedIndex) => {
                                    // Real index in stack array is (length - 1 - reversedIndex)
                                    const realIndex = stack.length - 1 - reversedIndex
                                    return (
                                        <motion.div
                                            key={`${realIndex}-node`}
                                            layout
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                scale: highlightedIndex === realIndex ? 1.05 : 1
                                            }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className={cn(
                                                "flex items-center gap-0 border-2 rounded-lg overflow-hidden shadow-md bg-card",
                                                highlightedIndex === realIndex ? "border-primary ring-2 ring-primary/30" : "border-border"
                                            )}>
                                                {/* Data Part */}
                                                <div className="p-3 w-20 flex justify-center border-r-2 border-border bg-card">
                                                    <span className="font-bold text-lg">{value}</span>
                                                </div>
                                                {/* Pointer Part */}
                                                <div className="p-3 w-16 flex justify-center bg-muted/50">
                                                    <div className="w-2 h-2 rounded-full bg-foreground/50"></div>
                                                </div>
                                            </div>

                                            {/* Arrow to next node (which is actually previous in array/below visually) */}
                                            {reversedIndex < stack.length - 1 ? (
                                                <ArrowDown className="w-6 h-6 my-1 text-muted-foreground/50" />
                                            ) : (
                                                <div className="flex flex-col items-center mt-2 group">
                                                    <ArrowDown className="w-6 h-6 text-muted-foreground/30 mb-1" />
                                                    <span className="text-xs font-mono text-muted-foreground border border-dashed border-muted-foreground/50 px-2 py-1 rounded">NULL</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>

                            {stack.length === 0 && (
                                <div className="mt-2 border border-dashed border-muted-foreground/50 px-3 py-2 rounded text-muted-foreground font-mono text-sm">
                                    NULL
                                </div>
                            )}
                        </div>
                    )}
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
                                        "text-sm py-1 font-mono",
                                        index === steps.length - 1 && "font-bold text-primary"
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
