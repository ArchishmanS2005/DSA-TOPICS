'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function DeletionVisualizer() {
    const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50, 0, 0, 0])
    const [size, setSize] = useState(5)
    const [inputIndex, setInputIndex] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
    const [message, setMessage] = useState('Enter index to delete')

    const animateDeletion = async () => {
        const idx = parseInt(inputIndex)

        if (isNaN(idx) || idx < 0 || idx >= size) {
            setMessage('Index out of bounds')
            return
        }

        setIsAnimating(true)
        setMessage(`Deleting element at index ${idx}`)
        setHighlightedIndices([idx])
        await sleep(600)

        // Shift animation
        for (let i = idx; i < size - 1; i++) {
            setMessage(`Shifting element at ${i + 1} to ${i}`)
            setHighlightedIndices([i, i + 1])
            await sleep(500)

            setArray(prev => {
                const newArr = [...prev]
                newArr[i] = newArr[i + 1]
                return newArr
            })
            await sleep(500)
        }

        setArray(prev => {
            const newArr = [...prev]
            newArr[size - 1] = 0
            return newArr
        })
        setSize(size - 1)

        setMessage('Deletion Complete!')
        setHighlightedIndices([])
        setIsAnimating(false)
        setInputIndex('')
    }

    const reset = () => {
        setArray([10, 20, 30, 40, 50, 0, 0, 0])
        setSize(5)
        setIsAnimating(false)
        setHighlightedIndices([])
        setMessage('Ready to delete')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Array Deletion Visualizer</CardTitle>
                <CardDescription>Shift elements left to fill the gap</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center h-32 items-end gap-2 bg-muted/20 p-6 rounded-lg">
                    <AnimatePresence>
                        {array.map((val, idx) => (
                            <motion.div
                                key={idx}
                                layout
                                className={cn(
                                    "w-12 h-12 flex items-center justify-center border-2 rounded-md font-bold text-lg relative",
                                    highlightedIndices.includes(idx) ? "bg-red-500 border-red-700 text-white" : "bg-card border-primary",
                                    idx >= size && "opacity-30 bg-muted border-dashed"
                                )}
                            >
                                {val}
                                <span className="absolute -bottom-6 text-xs text-muted-foreground font-normal">
                                    {idx}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="text-center font-mono text-sm h-6">
                    {message}
                </div>

                <div className="flex gap-4 justify-center">
                    <Input
                        placeholder="Idx"
                        className="w-24"
                        value={inputIndex}
                        onChange={e => setInputIndex(e.target.value)}
                        disabled={isAnimating}
                    />
                    <Button onClick={animateDeletion} disabled={isAnimating} variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                    <Button variant="outline" onClick={reset} disabled={isAnimating}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }
