'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function BinarySearchVisualizer() {
    // Array MUST be sorted for Binary Search
    const [array] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 56, 72, 91])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)

    // Pointers
    const [left, setLeft] = useState<number | null>(null)
    const [right, setRight] = useState<number | null>(null)
    const [mid, setMid] = useState<number | null>(null)
    const [foundIndex, setFoundIndex] = useState<number | null>(null)

    const [message, setMessage] = useState('Enter value to search (Sorted Array)')

    const animateSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            setMessage('Please enter a valid number')
            return
        }

        setIsAnimating(true)
        setFoundIndex(null)

        let l = 0
        let r = array.length - 1

        setLeft(l)
        setRight(r)
        setMessage(`Initialize Left = 0, Right = ${r}`)
        await sleep(800)

        while (l <= r) {
            const m = Math.floor((l + r) / 2)
            setMid(m)
            setLeft(l) // Update visual state for loop
            setRight(r)

            setMessage(`Calculate Mid = floor((${l} + ${r}) / 2) = ${m}`)
            await sleep(800)

            const midVal = array[m]
            setMessage(`Comparing Target ${target} with Mid ${midVal}`)
            await sleep(800)

            if (midVal === target) {
                setMessage(`Found ${target} at index ${m}!`)
                setFoundIndex(m)
                setIsAnimating(false)
                return
            }

            if (midVal < target) {
                setMessage(`${midVal} < ${target}, searching Right half (Left = Mid + 1)`)
                l = m + 1
            } else {
                setMessage(`${midVal} > ${target}, searching Left half (Right = Mid - 1)`)
                r = m - 1
            }
            await sleep(800)
        }

        setLeft(null)
        setRight(null)
        setMid(null)
        setMessage(`${target} not found in array.`)
        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setFoundIndex(null)
        setLeft(null)
        setRight(null)
        setMid(null)
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Binary Search Visualizer</CardTitle>
                <CardDescription>O(log n) - Efficient search by dividing interval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center h-40 items-end gap-2 bg-muted/20 p-6 rounded-lg overflow-x-auto">
                    {array.map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            {/* Pointers above */}
                            <div className="h-8 flex items-end mb-1 space-x-1 text-[10px] font-bold">
                                {left === idx && <span className="text-blue-500">L↓</span>}
                                {mid === idx && <span className="text-purple-500">M↓</span>}
                                {right === idx && <span className="text-red-500">R↓</span>}
                            </div>

                            <motion.div
                                animate={{
                                    scale: mid === idx || foundIndex === idx ? 1.1 : 1,
                                    opacity: (left !== null && right !== null && (idx < left || idx > right)) ? 0.3 : 1
                                }}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-lg transition-colors duration-300",
                                    foundIndex === idx ? "bg-green-500 border-green-700 text-white" :
                                        mid === idx ? "bg-purple-500 border-purple-700 text-white" :
                                            (idx >= (left ?? 0) && idx <= (right ?? array.length - 1)) ? "bg-card border-primary" :
                                                "bg-muted border-muted-foreground/30"
                                )}
                            >
                                {val}
                            </motion.div>

                            <span className="text-xs text-muted-foreground mt-1">{idx}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center font-mono text-sm h-6 font-bold">
                    {message}
                </div>

                <div className="flex gap-4 justify-center">
                    <Input
                        placeholder="Target"
                        className="w-24"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        disabled={isAnimating}
                    />
                    <Button onClick={animateSearch} disabled={isAnimating}>
                        <Search className="w-4 h-4 mr-2" /> Search
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
