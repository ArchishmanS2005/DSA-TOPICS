'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, RotateCcw, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArrayVisualizerProps {
    algorithm: 'insertion' | 'deletion' | 'reversal' | 'rotation' | 'bubble_sort' | 'selection_sort' | 'insertion_sort' | 'linear_search' | 'binary_search'
}

export function ArrayVisualizer({ algorithm }: ArrayVisualizerProps) {
    const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50])
    const [inputValue, setInputValue] = useState('')
    const [position, setPosition] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
    const [step, setStep] = useState(0)
    const [steps, setSteps] = useState<string[]>([])

    const reset = () => {
        setArray([10, 20, 30, 40, 50])
        setInputValue('')
        setPosition('')
        setHighlightedIndices([])
        setStep(0)
        setSteps([])
        setIsAnimating(false)
    }

    const animateInsertion = async () => {
        const value = parseInt(inputValue)
        const pos = parseInt(position)

        if (isNaN(value) || isNaN(pos) || pos < 0 || pos > array.length) {
            alert('Please enter valid value and position!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = []

        // Step 1: Highlight position
        newSteps.push(`Step 1: Inserting ${value} at position ${pos}`)
        setSteps(newSteps)
        setHighlightedIndices([pos])
        await sleep(800)

        // Step 2: Shift elements
        newSteps.push(`Step 2: Shifting elements from position ${pos} to the right`)
        setSteps([...newSteps])
        for (let i = array.length; i > pos; i--) {
            setHighlightedIndices([i - 1, i])
            await sleep(500)
        }

        // Step 3: Insert
        const newArray = [...array]
        newArray.splice(pos, 0, value)
        setArray(newArray)
        newSteps.push(`Step 3: Inserted ${value} at position ${pos}`)
        setSteps([...newSteps])
        setHighlightedIndices([pos])
        await sleep(800)

        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const animateDeletion = async () => {
        const pos = parseInt(position)

        if (isNaN(pos) || pos < 0 || pos >= array.length) {
            alert('Please enter valid position!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = []

        // Step 1: Highlight element to delete
        newSteps.push(`Step 1: Deleting element at position ${pos} (value: ${array[pos]})`)
        setSteps(newSteps)
        setHighlightedIndices([pos])
        await sleep(800)

        // Step 2: Shift elements
        newSteps.push(`Step 2: Shifting elements from position ${pos + 1} to the left`)
        setSteps([...newSteps])
        for (let i = pos; i < array.length - 1; i++) {
            setHighlightedIndices([i, i + 1])
            await sleep(500)
        }

        // Step 3: Remove
        const newArray = [...array]
        newArray.splice(pos, 1)
        setArray(newArray)
        newSteps.push(`Step 3: Element deleted successfully`)
        setSteps([...newSteps])
        setHighlightedIndices([])
        await sleep(800)

        setIsAnimating(false)
    }

    const animateBubbleSort = async () => {
        setIsAnimating(true)
        const newSteps: string[] = []
        let arr = [...array]
        const n = arr.length

        newSteps.push('Starting Bubble Sort...')
        setSteps([...newSteps])
        await sleep(800)

        for (let i = 0; i < n - 1; i++) {
            newSteps.push(`Pass ${i + 1}: Comparing adjacent elements`)
            setSteps([...newSteps])

            for (let j = 0; j < n - i - 1; j++) {
                // Highlight comparing elements
                setHighlightedIndices([j, j + 1])
                newSteps.push(`Comparing ${arr[j]} and ${arr[j + 1]}`)
                setSteps([...newSteps])
                await sleep(600)

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                    setArray([...arr])
                    newSteps.push(`Swapped: ${arr[j + 1]} and ${arr[j]}`)
                    setSteps([...newSteps])
                    await sleep(600)
                }
            }
        }

        newSteps.push('✅ Array is now sorted!')
        setSteps([...newSteps])
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const animateReversal = async () => {
        setIsAnimating(true)
        const newSteps: string[] = []
        let arr = [...array]
        let start = 0
        let end = arr.length - 1

        newSteps.push('Starting array reversal using two pointers...')
        setSteps([...newSteps])
        await sleep(800)

        while (start < end) {
            // Highlight pointers
            setHighlightedIndices([start, end])
            newSteps.push(`Swapping elements at positions ${start} and ${end}`)
            setSteps([...newSteps])
            await sleep(800)

            // Swap
            const temp = arr[start]
            arr[start] = arr[end]
            arr[end] = temp
            setArray([...arr])
            await sleep(600)

            start++
            end--
        }

        newSteps.push('✅ Array reversed successfully!')
        setSteps([...newSteps])
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const animateSelectionSort = async () => {
        setIsAnimating(true)
        const newSteps: string[] = []
        let arr = [...array]
        const n = arr.length

        newSteps.push('Starting Selection Sort...')
        setSteps([...newSteps])
        await sleep(800)

        for (let i = 0; i < n - 1; i++) {
            // Find minimum in unsorted portion
            let minIdx = i
            setHighlightedIndices([i])
            newSteps.push(`Pass ${i + 1}: Finding minimum in remaining array`)
            setSteps([...newSteps])
            await sleep(600)

            for (let j = i + 1; j < n; j++) {
                setHighlightedIndices([minIdx, j])
                await sleep(400)

                if (arr[j] < arr[minIdx]) {
                    minIdx = j
                    newSteps.push(`New minimum found: ${arr[j]} at index ${j}`)
                    setSteps([...newSteps])
                }
            }

            // Swap if needed
            if (minIdx !== i) {
                setHighlightedIndices([i, minIdx])
                newSteps.push(`Swapping ${arr[i]} and ${arr[minIdx]}`)
                setSteps([...newSteps])
                const temp = arr[i]
                arr[i] = arr[minIdx]
                arr[minIdx] = temp
                setArray([...arr])
                await sleep(800)
            }
        }

        newSteps.push('✅ Array is now sorted!')
        setSteps([...newSteps])
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const animateInsertionSort = async () => {
        setIsAnimating(true)
        const newSteps: string[] = []
        let arr = [...array]
        const n = arr.length

        newSteps.push('Starting Insertion Sort...')
        setSteps([...newSteps])
        await sleep(800)

        for (let i = 1; i < n; i++) {
            const key = arr[i]
            setHighlightedIndices([i])
            newSteps.push(`Inserting ${key} into sorted portion`)
            setSteps([...newSteps])
            await sleep(600)

            let j = i - 1

            // Shift elements
            while (j >= 0 && arr[j] > key) {
                setHighlightedIndices([j, j + 1])
                newSteps.push(`Shifting ${arr[j]} to the right`)
                setSteps([...newSteps])

                arr[j + 1] = arr[j]
                setArray([...arr])
                await sleep(500)
                j--
            }

            // Insert key
            arr[j + 1] = key
            setArray([...arr])
            setHighlightedIndices([j + 1])
            newSteps.push(`Inserted ${key} at position ${j + 1}`)
            setSteps([...newSteps])
            await sleep(600)
        }

        newSteps.push('✅ Array is now sorted!')
        setSteps([...newSteps])
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const animateLinearSearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            alert('Please enter a value to search!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = []

        newSteps.push(`Starting Linear Search for ${target}...`)
        setSteps([...newSteps])
        await sleep(800)

        for (let i = 0; i < array.length; i++) {
            setHighlightedIndices([i])
            newSteps.push(`Step ${i + 1}: Checking index ${i}, value = ${array[i]}`)
            setSteps([...newSteps])
            await sleep(600)

            if (array[i] === target) {
                newSteps.push(`✅ Found ${target} at index ${i}!`)
                setSteps([...newSteps])
                await sleep(1200)
                setHighlightedIndices([])
                setIsAnimating(false)
                return
            }
        }

        newSteps.push(`❌ ${target} not found in array`)
        setSteps([...newSteps])
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const animateBinarySearch = async () => {
        const target = parseInt(inputValue)
        if (isNaN(target)) {
            alert('Please enter a value to search!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = []

        newSteps.push(`Starting Binary Search for ${target}... (Array must be sorted!)`)
        setSteps([...newSteps])
        await sleep(800)

        let left = 0
        let right = array.length - 1
        let iteration = 1

        while (left <= right) {
            const mid = Math.floor((left + right) / 2)

            setHighlightedIndices([left, mid, right])
            newSteps.push(`Iteration ${iteration}: Checking middle element at index ${mid}`)
            newSteps.push(`  Left = ${left}, Mid = ${mid}, Right = ${right}`)
            newSteps.push(`  Array[${mid}] = ${array[mid]}`)
            setSteps([...newSteps])
            await sleep(1000)

            if (array[mid] === target) {
                setHighlightedIndices([mid])
                newSteps.push(`✅ Found ${target} at index ${mid}!`)
                setSteps([...newSteps])
                await sleep(1200)
                setHighlightedIndices([])
                setIsAnimating(false)
                return
            } else if (array[mid] < target) {
                newSteps.push(`  ${array[mid]} < ${target}, search right half`)
                setSteps([...newSteps])
                left = mid + 1
            } else {
                newSteps.push(`  ${array[mid]} > ${target}, search left half`)
                setSteps([...newSteps])
                right = mid - 1
            }

            await sleep(800)
            iteration++
        }

        newSteps.push(`❌ ${target} not found in array`)
        setSteps([...newSteps])
        setHighlightedIndices([])
        setIsAnimating(false)
    }

    const handleExecute = () => {
        switch (algorithm) {
            case 'insertion':
                animateInsertion()
                break
            case 'deletion':
                animateDeletion()
                break
            case 'bubble_sort':
                animateBubbleSort()
                break
            case 'selection_sort':
                animateSelectionSort()
                break
            case 'insertion_sort':
                animateInsertionSort()
                break
            case 'linear_search':
                animateLinearSearch()
                break
            case 'binary_search':
                animateBinarySearch()
                break
            case 'reversal':
                animateReversal()
                break
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Interactive Visualization</CardTitle>
                <CardDescription>
                    Enter values and watch the algorithm execute step-by-step
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Input Controls */}
                <div className="flex flex-wrap gap-3">
                    {(algorithm === 'insertion' || algorithm === 'deletion') && (
                        <>
                            {algorithm === 'insertion' && (
                                <Input
                                    type="number"
                                    placeholder="Value to insert"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-40"
                                    disabled={isAnimating}
                                />
                            )}
                            <Input
                                type="number"
                                placeholder="Position (0-based)"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="w-40"
                                disabled={isAnimating}
                            />
                        </>
                    )}
                    <Button
                        onClick={handleExecute}
                        disabled={isAnimating}
                        className="gap-2"
                    >
                        <Play className="w-4 h-4" />
                        Execute
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        className="gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                {/* Array Visualization */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Current Array:</h4>
                    <div className="flex flex-wrap gap-2">
                        {array.map((value, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative flex flex-col items-center justify-center w-16 h-16 rounded-lg border-2 transition-all duration-300",
                                    highlightedIndices.includes(index)
                                        ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg"
                                        : "bg-card border-border hover:border-primary/50"
                                )}
                            >
                                <span className="text-xs text-muted-foreground absolute -top-5">
                                    {index}
                                </span>
                                <span className="text-lg font-bold">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Steps Display */}
                {steps.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Execution Steps:</h4>
                        <div className="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto scrollbar-thin">
                            {steps.map((stepText, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "text-sm py-1",
                                        index === steps.length - 1 && "font-semibold text-primary"
                                    )}
                                >
                                    {stepText}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
