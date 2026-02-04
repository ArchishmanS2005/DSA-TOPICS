'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function JumpSearchVisualizer() {
    const [array] = useState<number[]>([1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const [blockStart, setBlockStart] = useState<number | null>(null)
    const [blockEnd, setBlockEnd] = useState<number | null>(null)
    const [message, setMessage] = useState('Enter sorted value to search')

    const animateSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            setMessage('Please enter a valid number')
            return
        }

        setIsAnimating(true)
        const n = array.length
        let step = Math.floor(Math.sqrt(n))
        let prev = 0
        let curr = step

        setMessage(`Block size = √${n} = ${step}`)
        await sleep(1000)

        // Finding the block
        while (array[Math.min(step, n) - 1] < target) {
            setMessage(`Target ${target} > ${array[Math.min(step, n) - 1]} (at index ${Math.min(step, n) - 1})`)
            setBlockStart(prev)
            setBlockEnd(Math.min(step, n))

            await sleep(800)

            prev = step
            step += Math.floor(Math.sqrt(n))

            setMessage(`Jumping ahead to index ${prev}`)
            if (prev >= n) {
                setMessage('Target not found (passed end of array)')
                setIsAnimating(false)
                return
            }
        }

        setMessage(`Target is in block [${prev}, ${Math.min(step, n)}]`)
        setBlockStart(prev)
        setBlockEnd(Math.min(step, n))
        await sleep(800)

        // Linear Search inside block
        setMessage('Performing Linear Search in block...')
        while (array[prev] < target) {
            setHighlightedIndex(prev)
            setMessage(`Checking index ${prev}: ${array[prev]} < ${target}`)
            await sleep(500)

            prev++
            if (prev === Math.min(step, n)) {
                setMessage('Target not found in block')
                setIsAnimating(false)
                return
            }
        }

        setHighlightedIndex(prev)
        if (array[prev] === target) {
            setMessage(`Found ${target} at index ${prev}!`)
        } else {
            setMessage('Target not found')
        }

        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setHighlightedIndex(null)
        setBlockStart(null)
        setBlockEnd(null)
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Jump Search Visualizer</CardTitle>
                <CardDescription>O(√n) - Jumping fixed steps then linear search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap justify-center gap-2 bg-muted/20 p-6 rounded-lg">
                    {array.map((val, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                scale: highlightedIndex === idx ? 1.2 : 1,
                                opacity: (blockStart !== null && blockEnd !== null && (idx < blockStart || idx >= blockEnd)) ? 0.3 : 1
                            }}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-sm relative transition-colors duration-300",
                                highlightedIndex === idx ? "bg-green-500 border-green-700 text-white" :
                                    (idx % Math.floor(Math.sqrt(array.length)) === 0) ? "border-purple-500 bg-purple-100 dark:bg-purple-900/30" : // Mark jump points
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
