'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export function InterpolationSearchVisualizer() {
    // Uniformly distributed array
    const [array] = useState<number[]>([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)

    const [low, setLow] = useState<number | null>(null)
    const [high, setHigh] = useState<number | null>(null)
    const [pos, setPos] = useState<number | null>(null)
    const [formula, setFormula] = useState('')
    const [message, setMessage] = useState('Enter value to search')

    const animateSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            setMessage('Please enter a valid number')
            return
        }

        setIsAnimating(true)
        let lo = 0
        let hi = array.length - 1

        setLow(lo)
        setHigh(hi)
        await sleep(500)

        while (lo <= hi && target >= array[lo] && target <= array[hi]) {
            if (lo === hi) {
                if (array[lo] === target) {
                    setMessage('Found at single element range!')
                    setPos(lo)
                    setIsAnimating(false)
                    return
                }
                break
            }

            // pos = lo + ((target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo]))
            const numerator = (target - array[lo]) * (hi - lo)
            const denominator = array[hi] - array[lo]
            const position = lo + Math.floor(numerator / denominator)

            setFormula(`pos = ${lo} + ((${target}-${array[lo]}) * (${hi}-${lo}) / (${array[hi]}-${array[lo]})) = ${position}`)
            setPos(position)
            setMessage(`Estimating position...`)
            await sleep(1500)

            if (array[position] === target) {
                setMessage(`Found ${target} at index ${position}!`)
                setIsAnimating(false)
                return
            }

            if (array[position] < target) {
                setMessage(`${array[position]} < ${target}, look higher`)
                lo = position + 1
                setLow(lo)
            } else {
                setMessage(`${array[position]} > ${target}, look lower`)
                hi = position - 1
                setHigh(hi)
            }
            await sleep(1000)
        }

        setMessage('Target not found')
        setPos(null)
        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setLow(null)
        setHigh(null)
        setPos(null)
        setFormula('')
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Interpolation Search Visualizer</CardTitle>
                <CardDescription>O(log(log n)) - Probing position based on value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                    {/* Formula Display */}
                    {formula && (
                        <div className="bg-muted p-2 rounded text-xs font-mono break-all text-center border overflow-hidden max-w-full">
                            {formula}
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-2 bg-muted/20 p-6 rounded-lg w-full">
                        {array.map((val, idx) => (
                            <motion.div
                                key={idx}
                                animate={{
                                    scale: pos === idx ? 1.2 : 1,
                                    opacity: (low !== null && high !== null && (idx < low || idx > high)) ? 0.3 : 1
                                }}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-sm relative transition-colors duration-300",
                                    pos === idx ? "bg-blue-500 border-blue-700 text-white" :
                                        (idx === low || idx === high) ? "border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30" :
                                            "bg-card border-primary"
                                )}
                            >
                                {val}
                                <span className="absolute -bottom-5 text-[10px] text-muted-foreground font-normal">
                                    {idx}
                                </span>
                                {idx === low && <span className="absolute -top-5 text-[10px] font-bold text-yellow-600">LO</span>}
                                {idx === high && <span className="absolute -top-5 text-[10px] font-bold text-yellow-600">HI</span>}
                            </motion.div>
                        ))}
                    </div>
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
