'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCw, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function RotationVisualizer() {
    const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5, 6])
    const [rotationSteps, setRotationSteps] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const [message, setMessage] = useState('Enter rotation steps (K)')

    const animateRotation = async () => {
        const k = parseInt(rotationSteps)
        if (isNaN(k) || k <= 0) {
            setMessage('Please enter valid K > 0')
            return
        }

        setIsAnimating(true)
        const effectiveK = k % array.length
        setMessage(`Rotating right by ${effectiveK} steps`)

        // Simulating right rotation one by one
        for (let step = 0; step < effectiveK; step++) {
            await sleep(500)
            setMessage(`Step ${step + 1}: Moving last element to front`)

            // Highlight last element
            setHighlightedIndex(array.length - 1)
            await sleep(500)

            setArray(prev => {
                const newArr = [...prev]
                const last = newArr.pop()!
                newArr.unshift(last)
                return newArr
            })
            setHighlightedIndex(0) // It's now at 0
            await sleep(500)
        }

        setMessage('Rotation Complete!')
        setHighlightedIndex(null)
        setIsAnimating(false)
        setRotationSteps('')
    }

    const reset = () => {
        setArray([1, 2, 3, 4, 5, 6])
        setIsAnimating(false)
        setHighlightedIndex(null)
        setMessage('Ready to rotate')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Array Rotation Visualizer</CardTitle>
                <CardDescription>Visualizing Cyclical Rotation (Right Shift)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center h-32 items-end gap-2 bg-muted/20 p-6 rounded-lg">
                    <AnimatePresence>
                        {array.map((val, idx) => (
                            <motion.div
                                key={val} // Key is value to track element movement permanently
                                layout
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={cn(
                                    "w-12 h-12 flex items-center justify-center border-2 rounded-md font-bold text-lg relative bg-card border-primary",
                                    highlightedIndex === idx && "bg-blue-500 text-white border-blue-700"
                                )}
                            >
                                {val}
                                <span className="absolute -bottom-6 text-xs text-muted-foreground font-normal text-black dark:text-white">
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
                        placeholder="K Steps"
                        className="w-24"
                        value={rotationSteps}
                        onChange={e => setRotationSteps(e.target.value)}
                        disabled={isAnimating}
                    />
                    <Button onClick={animateRotation} disabled={isAnimating}>
                        <RotateCw className="w-4 h-4 mr-2" /> Rotate
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
