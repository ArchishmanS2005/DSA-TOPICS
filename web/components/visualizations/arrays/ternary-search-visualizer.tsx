'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function TernarySearchVisualizer() {
    const [array] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)

    const [mid1, setMid1] = useState<number | null>(null)
    const [mid2, setMid2] = useState<number | null>(null)
    const [left, setLeft] = useState<number | null>(null)
    const [right, setRight] = useState<number | null>(null)
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

        let l = 0
        let r = array.length - 1
        setLeft(l)
        setRight(r)

        while (r >= l) {
            const m1 = l + Math.floor((r - l) / 3)
            const m2 = r - Math.floor((r - l) / 3)

            setMid1(m1)
            setMid2(m2)
            setLeft(l)
            setRight(r)

            setMessage(`Range [${l}, ${r}]. Mid1=${m1}, Mid2=${m2}`)
            await sleep(1000)

            if (array[m1] === target) {
                setMessage(`Found ${target} at mid1 (${m1})!`)
                setFoundIndex(m1)
                setIsAnimating(false)
                return
            }
            if (array[m2] === target) {
                setMessage(`Found ${target} at mid2 (${m2})!`)
                setFoundIndex(m2)
                setIsAnimating(false)
                return
            }

            if (target < array[m1]) {
                setMessage(`${target} < ${array[m1]}. Search left third.`)
                r = m1 - 1
            } else if (target > array[m2]) {
                setMessage(`${target} > ${array[m2]}. Search right third.`)
                l = m2 + 1
            } else {
                setMessage(`In between ${array[m1]} and ${array[m2]}. Search middle third.`)
                l = m1 + 1
                r = m2 - 1
            }
            await sleep(1000)
        }

        setMessage('Target not found')
        setIsAnimating(false)
    }

    const reset = () => {
        setInputValue('')
        setMid1(null)
        setMid2(null)
        setLeft(null)
        setRight(null)
        setFoundIndex(null)
        setMessage('Ready to search')
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Ternary Search Visualizer</CardTitle>
                <CardDescription>O(log3 n) - Divide into 3 parts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap justify-center gap-2 bg-muted/20 p-6 rounded-lg pt-10">
                    {array.map((val, idx) => (
                        <div key={idx} className="relative">
                            {/* Pointers Labels */}
                            {left === idx && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-500">L</div>}
                            {right === idx && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-500">R</div>}
                            {mid1 === idx && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-500">M1</div>}
                            {mid2 === idx && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-orange-500">M2</div>}

                            <motion.div
                                animate={{
                                    scale: mid1 === idx || mid2 === idx || foundIndex === idx ? 1.2 : 1,
                                    opacity: (left !== null && right !== null && (idx < left || idx > right)) ? 0.3 : 1
                                }}
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold text-sm relative transition-colors duration-300",
                                    foundIndex === idx ? "bg-green-500 border-green-700 text-white" :
                                        mid1 === idx ? "bg-purple-500 border-purple-700 text-white" :
                                            mid2 === idx ? "bg-orange-500 border-orange-700 text-white" :
                                                "bg-card border-primary"
                                )}
                            >
                                {val}
                                <span className="absolute -bottom-5 text-[10px] text-muted-foreground font-normal">
                                    {idx}
                                </span>
                            </motion.div>
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
