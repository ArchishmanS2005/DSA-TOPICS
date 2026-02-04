'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, RotateCcw, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function InsertionVisualizer() {
    const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50, 0, 0, 0]) // 0 represents empty space
    const [size, setSize] = useState(5)
    const [inputValue, setInputValue] = useState('')
    const [inputIndex, setInputIndex] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
    const [message, setMessage] = useState('Enter value and index to insert')

    const animateInsertion = async () => {
        const val = parseInt(inputValue)
        const idx = parseInt(inputIndex)

        if (isNaN(val) || isNaN(idx)) {
            setMessage('Invalid input')
            return
        }
        if (idx < 0 || idx > size) {
            setMessage('Index out of bounds')
            return
        }
        if (size >= array.length) {
            setMessage('Array is full!')
            return
        }

        setIsAnimating(true)
        setMessage(`Starting insertion of ${val} at index ${idx}`)
        await sleep(500)

        // Shift animation
        for (let i = size; i > idx; i--) {
            setMessage(`Shifting element at ${i - 1} to ${i}`)
            setHighlightedIndices([i, i - 1])
            await sleep(500)

            setArray(prev => {
                const newArr = [...prev]
                newArr[i] = newArr[i - 1]
                return newArr
            })
            await sleep(500)
        }

        setMessage(`Inserting ${val} at index ${idx}`)
        setHighlightedIndices([idx])
        await sleep(500)

        setArray(prev => {
            const newArr = [...prev]
            newArr[idx] = val
            return newArr
        })
        setSize(size + 1)

        setMessage('Insertion Complete!')
        setHighlightedIndices([])
        setIsAnimating(false)
        setInputValue('')
        setInputIndex('')
    }

    const reset = () => {
        setArray([10, 20, 30, 40, 50, 0, 0, 0])
        setSize(5)
        setIsAnimating(false)
        setHighlightedIndices([])
        setMessage('Ready to insert')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Array Insertion Visualizer</CardTitle>
                <CardDescription>Shift elements to make space for new data</CardDescription>
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
                                    highlightedIndices.includes(idx) ? "bg-yellow-500 border-yellow-700 text-white" : "bg-card border-primary",
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
                    <div className="flex gap-2">
                        <Input
                            placeholder="Val"
                            className="w-20"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            disabled={isAnimating}
                        />
                        <Input
                            placeholder="Idx"
                            className="w-20"
                            value={inputIndex}
                            onChange={e => setInputIndex(e.target.value)}
                            disabled={isAnimating}
                        />
                    </div>
                    <Button onClick={animateInsertion} disabled={isAnimating}>
                        <Plus className="w-4 h-4 mr-2" /> Insert
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
