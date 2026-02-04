'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Pause, RotateCcw, Shuffle, StepForward, StepBack, SkipForward } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SortingVisualizerProps {
    algorithm: 'bubble_sort' | 'selection_sort' | 'insertion_sort' | 'merge_sort' | 'quick_sort'
}

type SortStep = {
    array: number[]
    comparing: number[] // Indices being compared
    swapping: number[] // Indices being swapped
    sorted: number[]   // Indices known to be sorted
    pivot?: number     // Pivot index for Quick Sort
    description: string
}

export function SortingVisualizer({ algorithm }: SortingVisualizerProps) {
    const [array, setArray] = useState<number[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [steps, setSteps] = useState<SortStep[]>([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [arraySize, setArraySize] = useState(8)

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Initialize array
    useEffect(() => {
        resetArray()
    }, [arraySize])

    // Reset checking when algorithm changes
    useEffect(() => {
        resetArray()
    }, [algorithm])

    const resetArray = () => {
        stop()
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 90) + 10)
        setArray(newArray)
        setSteps([])
        setCurrentStep(0)
    }

    const generateSteps = () => {
        const newSteps: SortStep[] = []
        const arr = [...array]

        // Initial state
        newSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            description: 'Initial State'
        })

        switch (algorithm) {
            case 'bubble_sort':
                bubbleSort(arr, newSteps)
                break
            case 'selection_sort':
                selectionSort(arr, newSteps)
                break
            case 'insertion_sort':
                insertionSort(arr, newSteps)
                break
            case 'merge_sort':
                mergeSort(arr, 0, arr.length - 1, newSteps)
                break
            case 'quick_sort':
                quickSort(arr, 0, arr.length - 1, newSteps)
                break
        }

        // Final state - all sorted
        newSteps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: arr.map((_, i) => i),
            description: 'Sorting Complete!'
        })

        setSteps(newSteps)
        setCurrentStep(1) // Start from first step
        play()
    }

    // --- Algorithms ---

    const bubbleSort = (arr: number[], steps: SortStep[]) => {
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Compare
                steps.push({
                    array: [...arr],
                    comparing: [j, j + 1],
                    swapping: [],
                    sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
                    description: `Comparing ${arr[j]} and ${arr[j + 1]}`
                })

                if (arr[j] > arr[j + 1]) {
                    // Swap
                    const temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    steps.push({
                        array: [...arr],
                        comparing: [],
                        swapping: [j, j + 1],
                        sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
                        description: `Swapping ${arr[j]} and ${arr[j + 1]}`
                    })
                }
            }
            // Element at n-1-i is now sorted
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
                description: `${arr[n - 1 - i]} is now in sorted position`
            })
        }
    }

    const selectionSort = (arr: number[], steps: SortStep[]) => {
        const n = arr.length
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i
            for (let j = i + 1; j < n; j++) {
                steps.push({
                    array: [...arr],
                    comparing: [minIdx, j],
                    swapping: [],
                    sorted: Array.from({ length: i }, (_, k) => k),
                    description: `Finding minimum: Comparing current min ${arr[minIdx]} with ${arr[j]}`
                })
                if (arr[j] < arr[minIdx]) {
                    minIdx = j
                }
            }
            if (minIdx !== i) {
                const temp = arr[i]
                arr[i] = arr[minIdx]
                arr[minIdx] = temp
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [i, minIdx],
                    sorted: Array.from({ length: i }, (_, k) => k),
                    description: `Swapped minimum ${arr[i]} to position ${i}`
                })
            }
        }
    }

    const insertionSort = (arr: number[], steps: SortStep[]) => {
        const n = arr.length
        for (let i = 1; i < n; i++) {
            const key = arr[i]
            let j = i - 1

            steps.push({
                array: [...arr],
                comparing: [i],
                swapping: [],
                sorted: Array.from({ length: i }, (_, k) => k),
                description: `Selected ${key} to insert into sorted portion`
            })

            while (j >= 0 && arr[j] > key) {
                steps.push({
                    array: [...arr],
                    comparing: [j, j + 1],
                    swapping: [],
                    sorted: Array.from({ length: i }, (_, k) => k),
                    description: `${arr[j]} > ${key}, shifting ${arr[j]} right`
                })

                arr[j + 1] = arr[j]
                j = j - 1

                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [j + 1, j + 2], // Visually showing the shift
                    sorted: Array.from({ length: i }, (_, k) => k),
                    description: `Shifted`
                })
            }
            arr[j + 1] = key
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: Array.from({ length: i + 1 }, (_, k) => k),
                description: `Inserted ${key} at position ${j + 1}`
            })
        }
    }

    const mergeSort = (arr: number[], left: number, right: number, steps: SortStep[]) => {
        if (left >= right) return

        const mid = Math.floor(left + (right - left) / 2)
        mergeSort(arr, left, mid, steps)
        mergeSort(arr, mid + 1, right, steps)
        merge(arr, left, mid, right, steps)
    }

    const merge = (arr: number[], left: number, mid: number, right: number, steps: SortStep[]) => {
        const n1 = mid - left + 1
        const n2 = right - mid

        // Create temp arrays
        const L = arr.slice(left, mid + 1)
        const R = arr.slice(mid + 1, right + 1)

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            description: `Merging subarrays: [${L.join(',')}] and [${R.join(',')}]`
        })

        let i = 0, j = 0, k = left

        while (i < n1 && j < n2) {
            steps.push({
                array: [...arr],
                comparing: [left + i, mid + 1 + j],
                swapping: [],
                sorted: [],
                description: `Comparing ${L[i]} and ${R[j]}`
            })

            if (L[i] <= R[j]) {
                arr[k] = L[i]
                i++
            } else {
                arr[k] = R[j]
                j++
            }
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k], // Highlight change
                sorted: [],
                description: `Placed ${arr[k]} at position ${k}`
            })
            k++
        }

        while (i < n1) {
            arr[k] = L[i]
            i++
            k++
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k - 1],
                sorted: [],
                description: `Placed remaining ${arr[k - 1]} at position ${k - 1}`
            })
        }

        while (j < n2) {
            arr[k] = R[j]
            j++
            k++
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k - 1],
                sorted: [],
                description: `Placed remaining ${arr[k - 1]} at position ${k - 1}`
            })
        }
    }

    const quickSort = (arr: number[], low: number, high: number, steps: SortStep[]) => {
        if (low < high) {
            const pi = partition(arr, low, high, steps)
            quickSort(arr, low, pi - 1, steps)
            quickSort(arr, pi + 1, high, steps)
        }
    }

    const partition = (arr: number[], low: number, high: number, steps: SortStep[]): number => {
        const pivot = arr[high]
        let i = low - 1

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            pivot: high,
            description: `Partitioning with pivot ${pivot} at index ${high}`
        })

        for (let j = low; j < high; j++) {
            steps.push({
                array: [...arr],
                comparing: [j, high],
                swapping: [],
                sorted: [],
                pivot: high,
                description: `Comparing ${arr[j]} with pivot ${pivot}`
            })

            if (arr[j] < pivot) {
                i++
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [i, j],
                    sorted: [],
                    pivot: high,
                    description: `Swapping ${arr[i]} and ${arr[j]}`
                })
            }
        }

        const temp = arr[i + 1]
        arr[i + 1] = arr[high]
        arr[high] = temp

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i + 1, high],
            sorted: [],
            pivot: i + 1,
            description: `Placed pivot ${pivot} at correct position ${i + 1}`
        })

        return i + 1
    }

    // --- Playback Control ---

    const play = () => {
        setIsPlaying(true)
    }

    const stop = () => {
        setIsPlaying(false)
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }

    useEffect(() => {
        if (isPlaying && steps.length > 0) {
            if (currentStep < steps.length - 1) {
                timerRef.current = setTimeout(() => {
                    setCurrentStep(prev => prev + 1)
                }, 1000 - speed) // Reverse speed: higher value = faster (lower delay)
            } else {
                setIsPlaying(false)
            }
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [isPlaying, currentStep, steps, speed])

    const currentSnapshot = steps[currentStep] || {
        array,
        comparing: [],
        swapping: [],
        sorted: [],
        description: 'Ready to sort'
    }

    const getBarColor = (index: number) => {
        const step = currentSnapshot
        if (step.swapping.includes(index)) return 'bg-red-500' // Swapping = Red
        if (step.comparing.includes(index)) return 'bg-yellow-500' // Comparing = Yellow
        if (step.sorted.includes(index)) return 'bg-green-500' // Sorted = Green
        if (step.pivot === index) return 'bg-purple-500' // Pivot = Purple
        return 'bg-primary' // Default = Primary
    }

    const getTitle = () => {
        switch (algorithm) {
            case 'bubble_sort': return 'Bubble Sort'
            case 'selection_sort': return 'Selection Sort'
            case 'insertion_sort': return 'Insertion Sort'
            case 'merge_sort': return 'Merge Sort'
            case 'quick_sort': return 'Quick Sort'
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    {getTitle()}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={resetArray}><Shuffle className="w-4 h-4 mr-2" /> New Array</Button>
                    </div>
                </CardTitle>
                <CardDescription>{currentSnapshot.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Visualization Area */}
                <div className="h-64 flex items-end justify-center gap-1 bg-muted/20 rounded-lg p-4 mb-4">
                    <AnimatePresence mode='popLayout'>
                        {currentSnapshot.array.map((value, index) => (
                            <motion.div
                                layout
                                key={`${index}-${value}`} // Key ensures framer motion tracks position
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    height: `${value}%`,
                                    backgroundColor: '' // Handled by class
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={cn(
                                    "w-8 rounded-t-md flex items-center justify-center text-xs font-bold text-white transition-colors duration-200",
                                    getBarColor(index)
                                )}
                            >
                                {value < 20 ? '' : value} {/* Hide text if bar too small */}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4">

                    {/* Playback Controls */}
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                stop()
                                setCurrentStep(0)
                            }}
                            disabled={steps.length === 0}
                        >
                            <RotateCcw className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                stop()
                                setCurrentStep(Math.max(0, currentStep - 1))
                            }}
                            disabled={currentStep === 0}
                        >
                            <StepBack className="w-5 h-5" />
                        </Button>

                        <Button
                            size="icon"
                            className="w-12 h-12 rounded-full"
                            onClick={() => isPlaying ? stop() : (steps.length === 0 ? generateSteps() : play())}
                        >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                stop()
                                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                            }}
                            disabled={currentStep === steps.length - 1}
                        >
                            <StepForward className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                stop()
                                setCurrentStep(steps.length - 1)
                            }}
                            disabled={steps.length === 0 || currentStep === steps.length - 1}
                        >
                            <SkipForward className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center gap-4 px-4 w-full">
                        <span className="text-sm font-medium w-12">Speed</span>
                        <input
                            type="range"
                            min="100"
                            max="900"
                            step="50"
                            value={speed}
                            onChange={(e) => setSpeed(parseInt(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="flex items-center gap-4 px-4 w-full">
                        <span className="text-sm font-medium w-12">Size</span>
                        <input
                            type="range"
                            min="5"
                            max="20"
                            step="1"
                            value={arraySize}
                            onChange={(e) => setArraySize(parseInt(e.target.value))}
                            disabled={isPlaying}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
                        />
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center gap-6 text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div> Compare
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded"></div> Swap
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div> Sorted
                        </div>
                        {algorithm === 'quick_sort' && (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded"></div> Pivot
                            </div>
                        )}
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
