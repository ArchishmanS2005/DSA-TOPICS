'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function LinearSearchVisualizer() {
    const [array] = useState<number[]>([15, 8, 23, 42, 4, 16, 30])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [currentIndex, setCurrentIndex] = useState<number | null>(null)
    const [foundIndex, setFoundIndex] = useState<number | null>(null)
    const [message, setMessage] = useState('Enter value to search')

    const animateSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            setMessage('Please enter a valid number')
            return
        }

        setIsAnimating(true)
        setFoundIndex(null)

        for (let i = 0; i < array.length; i++) {
            setCurrentIndex(i)
            setMessage(`Checking index ${i}: Is ${array[i]} == ${target}?`)
            await sleep(600)

            if (array[i] === target) {
                setMessage(`Found ${target} at index ${i}!`)
                setFoundIndex(i)
                setIsAnimating(false)
                return
            }
        }

        setMessage(`${target} not found in array.`)
        setCurrentIndex(null)
        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setFoundIndex(null)
        setCurrentIndex(null)
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Linear Search Visualizer</CardTitle>
                <CardDescription>O(n) - Sequentially check each element</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center h-32 items-end gap-2 bg-muted/20 p-6 rounded-lg">
                    {array.map((val, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                scale: currentIndex === idx || foundIndex === idx ? 1.1 : 1,
                            }}
                            className={cn(
                                "w-12 h-12 flex items-center justify-center border-2 rounded-md font-bold text-lg relative transition-colors duration-300",
                                foundIndex === idx ? "bg-green-500 border-green-700 text-white" :
                                    currentIndex === idx ? "bg-yellow-500 border-yellow-700 text-white" :
                                        "bg-card border-primary"
                            )}
                        >
                            {val}
                            <span className="absolute -bottom-6 text-xs text-muted-foreground font-normal text-black dark:text-white">
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
