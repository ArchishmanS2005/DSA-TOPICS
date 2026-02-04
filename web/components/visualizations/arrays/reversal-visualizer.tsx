'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeftRight, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ReversalVisualizer() {
    const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50, 60])
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
    const [message, setMessage] = useState('Click to reverse array')

    const animateReversal = async () => {
        setIsAnimating(true)
        let start = 0
        let end = array.length - 1

        while (start < end) {
            setMessage(`Swapping index ${start} and ${end}`)
            setHighlightedIndices([start, end])
            await sleep(800)

            setArray(prev => {
                const newArr = [...prev]
                const temp = newArr[start]
                newArr[start] = newArr[end]
                newArr[end] = temp
                return newArr
            })
            await sleep(800)

            start++
            end--
        }

        setMessage('Reversal Complete!')
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const reset = () => {
        setArray([10, 20, 30, 40, 50, 60])
        setIsAnimating(false)
        setHighlightedIndices([])
        setMessage('Ready to reverse')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Array Reversal Visualizer</CardTitle>
                <CardDescription>Two-pointer approach: Swap ends and move inward</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center h-32 items-end gap-2 bg-muted/20 p-6 rounded-lg">
                    <AnimatePresence>
                        {array.map((val, idx) => (
                            <motion.div
                                key={`${idx}-${val}`} // Key change triggers animation
                                layout
                                className={cn(
                                    "w-12 h-12 flex items-center justify-center border-2 rounded-md font-bold text-lg relative",
                                    highlightedIndices.includes(idx) ? "bg-orange-500 border-orange-700 text-white" : "bg-card border-primary"
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
                    <Button onClick={animateReversal} disabled={isAnimating}>
                        <ArrowLeftRight className="w-4 h-4 mr-2" /> Reverse
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
