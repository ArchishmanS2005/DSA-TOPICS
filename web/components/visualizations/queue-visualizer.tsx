'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QueueVisualizerProps {
    type?: 'linear' | 'circular'
    maxSize?: number
}

export function QueueVisualizer({ type = 'linear', maxSize = 8 }: QueueVisualizerProps) {
    const [queue, setQueue] = useState<(number | null)[]>(Array(maxSize).fill(null))
    const [front, setFront] = useState(-1)
    const [rear, setRear] = useState(-1)
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
    const [steps, setSteps] = useState<string[]>([])
    const [dequeuedValue, setDequeuedValue] = useState<number | null>(null)

    const reset = () => {
        setQueue(Array(maxSize).fill(null))
        setFront(-1)
        setRear(-1)
        setInputValue('')
        setHighlightedIndices([])
        setSteps([])
        setDequeuedValue(null)
        setIsAnimating(false)
    }

    const isEmpty = () => front === -1
    const isFull = () => {
        if (type === 'circular') {
            return (rear + 1) % maxSize === front
        }
        return rear === maxSize - 1
    }

    const animateEnqueue = async () => {
        const value = parseInt(inputValue)
        if (isNaN(value)) {
            alert('Please enter a valid number!')
            return
        }

        if (isFull()) {
            const newSteps = [...steps, '❌ Queue Overflow! Cannot enqueue - queue is full']
            setSteps(newSteps)
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        // Step 1: Check if empty
        if (isEmpty()) {
            newSteps.push('Step 1: Queue is empty, initializing front and rear to 0')
            setSteps([...newSteps])
            await sleep(600)

            const newQueue = [...queue]
            newQueue[0] = value
            setQueue(newQueue)
            setFront(0)
            setRear(0)
            setHighlightedIndices([0])
            newSteps.push(`Step 2: Enqueued ${value} at index 0`)
            setSteps([...newSteps])
            await sleep(800)
        } else {
            // Step 1: Increment rear
            const newRear = type === 'circular' ? (rear + 1) % maxSize : rear + 1
            newSteps.push(`Step 1: Incrementing rear from ${rear} to ${newRear}`)
            setSteps([...newSteps])
            await sleep(600)

            // Step 2: Add element
            const newQueue = [...queue]
            newQueue[newRear] = value
            setQueue(newQueue)
            setRear(newRear)
            setHighlightedIndices([newRear])
            newSteps.push(`Step 2: Enqueued ${value} at index ${newRear}`)
            setSteps([...newSteps])
            await sleep(800)
        }

        newSteps.push(`✅ Enqueue successful! Front = ${front}, Rear = ${type === 'circular' ? (rear + 1) % maxSize : rear + 1}`)
        setSteps([...newSteps])

        setHighlightedIndices([])
        setInputValue('')
        setIsAnimating(false)
    }

    const animateDequeue = async () => {
        if (isEmpty()) {
            const newSteps = [...steps, '❌ Queue Underflow! Cannot dequeue - queue is empty']
            setSteps(newSteps)
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        // Step 1: Get front element
        const frontValue = queue[front]
        setHighlightedIndices([front])
        newSteps.push(`Step 1: Getting front element: ${frontValue} at index ${front}`)
        setSteps([...newSteps])
        await sleep(800)

        // Step 2: Show dequeued value
        setDequeuedValue(frontValue)
        await sleep(400)

        // Step 3: Remove and update front
        const newQueue = [...queue]
        newQueue[front] = null

        if (front === rear) {
            // Queue becomes empty
            setQueue(newQueue)
            setFront(-1)
            setRear(-1)
            newSteps.push('Step 2: Queue is now empty, resetting front and rear to -1')
        } else {
            const newFront = type === 'circular' ? (front + 1) % maxSize : front + 1
            setQueue(newQueue)
            setFront(newFront)
            newSteps.push(`Step 2: Dequeued ${frontValue}, incrementing front to ${newFront}`)
        }

        setSteps([...newSteps])
        await sleep(800)

        newSteps.push(`✅ Dequeue successful! Returned: ${frontValue}`)
        setSteps([...newSteps])

        setHighlightedIndices([])
        setDequeuedValue(null)
        setIsAnimating(false)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {type === 'circular' ? 'Circular Queue' : 'Queue'} Visualizer (FIFO)
                </CardTitle>
                <CardDescription>
                    First In First Out - Enqueue at rear, Dequeue from front
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                    <Input
                        type="number"
                        placeholder="Value to enqueue"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-40"
                        disabled={isAnimating}
                        onKeyDown={(e) => e.key === 'Enter' && !isAnimating && animateEnqueue()}
                    />
                    <Button
                        onClick={animateEnqueue}
                        disabled={isAnimating || isFull()}
                        className="gap-2"
                    >
                        <ArrowRight className="w-4 h-4" />
                        Enqueue
                    </Button>
                    <Button
                        onClick={animateDequeue}
                        disabled={isAnimating || isEmpty()}
                        variant="secondary"
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Dequeue
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

                {/* Queue Status */}
                <div className="flex items-center gap-4 text-sm">
                    <span className={cn("font-semibold", isEmpty() ? "text-muted-foreground" : "text-foreground")}>
                        Front: {front}
                    </span>
                    <span className={cn("font-semibold", isEmpty() ? "text-muted-foreground" : "text-foreground")}>
                        Rear: {rear}
                    </span>
                    <span className="text-muted-foreground">
                        Size: {isEmpty() ? 0 : (rear >= front ? rear - front + 1 : maxSize - front + rear + 1)} / {maxSize}
                    </span>
                </div>

                {/* Dequeued value animation */}
                {dequeuedValue !== null && (
                    <div className="flex justify-center">
                        <div className="animate-bounce bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-bold text-lg">
                            Dequeued: {dequeuedValue}
                        </div>
                    </div>
                )}

                {/* Queue Visualization */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Queue Array:</h4>
                    <div className={cn(
                        "flex gap-2 p-4 bg-muted/20 rounded-lg overflow-x-auto",
                        type === 'circular' && "flex-wrap justify-center"
                    )}>
                        {queue.map((value, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative flex flex-col items-center justify-center min-w-[80px] h-20 rounded-lg border-2 transition-all duration-300",
                                    value !== null
                                        ? highlightedIndices.includes(index)
                                            ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg"
                                            : "bg-card border-border"
                                        : "bg-muted/50 border-dashed border-muted-foreground/30"
                                )}
                            >
                                <span className="text-xs text-muted-foreground absolute -top-6">
                                    [{index}]
                                </span>
                                <span className="text-xl font-bold">
                                    {value !== null ? value : '-'}
                                </span>
                                {index === front && front !== -1 && (
                                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded absolute -bottom-6">
                                        FRONT
                                    </span>
                                )}
                                {index === rear && rear !== -1 && (
                                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded absolute -bottom-6">
                                        REAR
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {type === 'circular' && !isEmpty() && (
                        <div className="text-xs text-center text-muted-foreground">
                            ↻ Circular: When rear reaches end, it wraps to beginning
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
