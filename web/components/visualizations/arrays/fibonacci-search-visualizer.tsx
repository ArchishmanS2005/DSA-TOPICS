'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function FibonacciSearchVisualizer() {
    const [array] = useState<number[]>([10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100, 235])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const [eliminatedOffset, setEliminatedOffset] = useState<number>(-1)
    const [message, setMessage] = useState('Enter value to search')
    const [fibInfo, setFibInfo] = useState('')

    const animateSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            setMessage('Please enter a valid number')
            return
        }

        setIsAnimating(true)
        const n = array.length
        setEliminatedOffset(-1)

        // Initialize Fibonacci numbers
        let fib2 = 0 // (m-2)
        let fib1 = 1 // (m-1)
        let fibM = fib2 + fib1 // m

        while (fibM < n) {
            fib2 = fib1
            fib1 = fibM
            fibM = fib2 + fib1
        }

        setFibInfo(`Initialized FibM=${fibM}, Fib1=${fib1}, Fib2=${fib2}`)
        await sleep(1000)

        let offset = -1

        while (fibM > 1) {
            const i = Math.min(offset + fib2, n - 1)
            setHighlightedIndex(i)
            setMessage(`Comparing at index ${i} (offset ${offset} + fib2 ${fib2})`)
            await sleep(1000)

            if (array[i] < target) {
                setMessage(`${array[i]} < ${target}. Eliminate left part. Shift specific Fibs down.`)
                fibM = fib1
                fib1 = fib2
                fib2 = fibM - fib1
                offset = i
                setEliminatedOffset(offset)
            } else if (array[i] > target) {
                setMessage(`${array[i]} > ${target}. Eliminate right part. Shift Fibs down by 2 steps.`)
                fibM = fib2
                fib1 = fib1 - fib2
                fib2 = fibM - fib1
            } else {
                setMessage(`Found ${target} at index ${i}!`)
                setIsAnimating(false)
                return
            }
            setFibInfo(`Updated FibM=${fibM}, Fib1=${fib1}, Fib2=${fib2}`)
            await sleep(1000)
        }

        if (fib1 && array[offset + 1] === target) {
            setHighlightedIndex(offset + 1)
            setMessage(`Found ${target} at index ${offset + 1}!`)
        } else {
            setMessage('Target not found')
        }

        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setHighlightedIndex(null)
        setEliminatedOffset(-1)
        setFibInfo('')
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Fibonacci Search Visualizer</CardTitle>
                <CardDescription>O(log n) - Division using Fibonacci numbers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Fib Info Display */}
                {fibInfo && (
                    <div className="bg-muted p-2 rounded text-xs font-mono text-center mb-2">
                        {fibInfo}
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-2 bg-muted/20 p-6 rounded-lg">
                    {array.map((val, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                scale: highlightedIndex === idx ? 1.2 : 1,
                                opacity: idx <= eliminatedOffset ? 0.3 : 1
                            }}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-sm relative transition-colors duration-300",
                                highlightedIndex === idx ? "bg-orange-500 border-orange-700 text-white" :
                                    "bg-card border-primary"
                            )}
                        >
                            {val}
                            <span className="absolute -bottom-5 text-[10px] text-muted-foreground font-normal">
                                {idx}
                            </span>
                        </motion.div>
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
