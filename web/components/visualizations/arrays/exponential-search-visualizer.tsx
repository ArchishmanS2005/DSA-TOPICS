'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ExponentialSearchVisualizer() {
    const [array] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 56, 72, 91, 100, 120, 140, 160, 180, 200])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [currentRange, setCurrentRange] = useState<[number, number] | null>(null) // [start, end]
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [message, setMessage] = useState('Enter value to search')

    // For Binary part
    const [bsLeft, setBsLeft] = useState<number | null>(null)
    const [bsRight, setBsRight] = useState<number | null>(null)
    const [bsMid, setBsMid] = useState<number | null>(null)

    const animateSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            setMessage('Please enter a valid number')
            return
        }

        setIsAnimating(true)
        const n = array.length

        // Step 1: Check index 0
        if (array[0] === target) {
            setMessage('Found at index 0!')
            setCurrentIndex(0)
            setIsAnimating(false)
            return
        }

        // Step 2: Find range
        let i = 1
        setMessage('Starting Exponential Range Finding...')
        setCurrentIndex(i)
        await sleep(800)

        while (i < n && array[i] <= target) {
            setMessage(`Index ${i} (${array[i]}) <= ${target}, doubling index...`)
            setCurrentRange([i / 2, i]) // Just showing previous coverage
            await sleep(800)

            i = i * 2
            if (i < n) setCurrentIndex(i)
        }

        // Range found: [i/2, min(i, n-1)]
        const left = i / 2
        const right = Math.min(i, n - 1)

        setCurrentRange([left, right])
        setCurrentIndex(null)
        setMessage(`Target is in range [${left}, ${right}]. Starting Binary Search...`)
        await sleep(1500)

        // Step 3: Binary Search
        let l = left
        let r = right
        setBsLeft(l)
        setBsRight(r)

        while (l <= r) {
            const mid = Math.floor((l + r) / 2)
            setBsMid(mid)
            setBsLeft(l)
            setBsRight(r)

            setMessage(`Binary Search: L=${l}, R=${r}, Mid=${mid} (${array[mid]})`)
            await sleep(1000)

            if (array[mid] === target) {
                setMessage(`Found ${target} at index ${mid}!`)
                setIsAnimating(false)
                return
            }

            if (array[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        setMessage('Target not found')
        setBsLeft(null)
        setBsRight(null)
        setBsMid(null)
        setCurrentRange(null)
        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setCurrentRange(null)
        setCurrentIndex(null)
        setBsLeft(null)
        setBsRight(null)
        setBsMid(null)
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Exponential Search Visualizer</CardTitle>
                <CardDescription>Find range exponentially, then Binary Search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap justify-center gap-2 bg-muted/20 p-6 rounded-lg">
                    {array.map((val, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                scale: bsMid === idx || currentIndex === idx ? 1.2 : 1,
                                opacity: (currentRange && (idx < currentRange[0] || idx > currentRange[1])) ? 0.3 :
                                    (bsLeft !== null && bsRight !== null && (idx < bsLeft || idx > bsRight)) ? 0.3 : 1
                            }}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-sm relative transition-colors duration-300",
                                bsMid === idx ? "bg-green-500 border-green-700 text-white" :
                                    currentIndex === idx ? "bg-purple-500 border-purple-700 text-white" :
                                        (currentRange && idx >= currentRange[0] && idx <= currentRange[1]) ? "bg-blue-100 dark:bg-blue-900/20 border-blue-500" :
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
