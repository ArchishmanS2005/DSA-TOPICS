'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Trash2, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HashNode {
    key: string
    value: number
    next: HashNode | null
}

export function HashVisualizer() {
    const TABLE_SIZE = 7
    const [hashTable, setHashTable] = useState<(HashNode | null)[]>(Array(TABLE_SIZE).fill(null))
    const [inputKey, setInputKey] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [isAnimating, setIsAnimating] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
    const [steps, setSteps] = useState<string[]>([])

    const hashFunction = (key: string): number => {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % TABLE_SIZE
        }
        return hash
    }

    const reset = () => {
        setHashTable(Array(TABLE_SIZE).fill(null))
        setInputKey('')
        setInputValue('')
        setHighlightedIndex(null)
        setSteps([])
        setIsAnimating(false)
    }

    const animateInsert = async () => {
        const key = inputKey.trim()
        const value = parseInt(inputValue)

        if (!key || isNaN(value)) {
            alert('Please enter a valid key and value!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        // Calculate hash
        const index = hashFunction(key)
        newSteps.push(`Step 1: Hash("${key}") = ${index}`)
        setSteps([...newSteps])
        setHighlightedIndex(index)
        await sleep(800)

        // Insert into chain
        const newTable = [...hashTable]
        const newNode: HashNode = { key, value, next: null }

        if (newTable[index] === null) {
            newSteps.push(`Step 2: Index ${index} is empty, inserting directly`)
            newTable[index] = newNode
        } else {
            newSteps.push(`Step 2: Collision at index ${index}! Adding to chain`)
            setSteps([...newSteps])
            await sleep(600)

            // Add to end of chain
            let current = newTable[index]!
            let chainLength = 1
            while (current.next !== null) {
                current = current.next
                chainLength++
            }
            current.next = newNode
            newSteps.push(`Step 3: Added to chain (chain length: ${chainLength + 1})`)
        }

        setHashTable(newTable)
        setSteps([...newSteps])
        await sleep(600)

        newSteps.push(`✅ Inserted "${key}" = ${value} successfully!`)
        setSteps([...newSteps])

        setInputKey('')
        setInputValue('')
        setHighlightedIndex(null)
        setIsAnimating(false)
    }

    const animateSearch = async () => {
        const key = inputKey.trim()

        if (!key) {
            alert('Please enter a key to search!')
            return
        }

        setIsAnimating(true)
        const newSteps: string[] = [...steps]

        // Calculate hash
        const index = hashFunction(key)
        newSteps.push(`Step 1: Hash("${key}") = ${index}`)
        setSteps([...newSteps])
        setHighlightedIndex(index)
        await sleep(800)

        // Search in chain
        let current = hashTable[index]
        let position = 0

        newSteps.push(`Step 2: Searching in chain at index ${index}...`)
        setSteps([...newSteps])
        await sleep(600)

        while (current !== null) {
            newSteps.push(`  Checking node ${position}: key="${current.key}"`)
            setSteps([...newSteps])
            await sleep(500)

            if (current.key === key) {
                newSteps.push(`✅ Found! "${key}" = ${current.value}`)
                setSteps([...newSteps])
                setInputKey('')
                setHighlightedIndex(null)
                setIsAnimating(false)
                return
            }

            current = current.next
            position++
        }

        newSteps.push(`❌ Key "${key}" not found in hash table`)
        setSteps([...newSteps])

        setInputKey('')
        setHighlightedIndex(null)
        setIsAnimating(false)
    }

    const getChainLength = (node: HashNode | null): number => {
        let count = 0
        let current = node
        while (current !== null) {
            count++
            current = current.next
        }
        return count
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Hash Table with Chaining Visualizer</CardTitle>
                <CardDescription>
                    Collision resolution using linked lists - Each bucket contains a chain of entries
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                    <Input
                        type="text"
                        placeholder="Key (string)"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        className="w-40"
                        disabled={isAnimating}
                    />
                    <Input
                        type="number"
                        placeholder="Value"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-32"
                        disabled={isAnimating}
                    />
                    <Button
                        onClick={animateInsert}
                        disabled={isAnimating}
                        size="sm"
                        className="gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Insert
                    </Button>
                    <Button
                        onClick={animateSearch}
                        disabled={isAnimating}
                        size="sm"
                        variant="secondary"
                        className="gap-2"
                    >
                        <Search className="w-4 h-4" />
                        Search
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </Button>
                </div>

                {/* Hash Function Info */}
                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    <strong>Hash Function:</strong> Sum of character codes modulo {TABLE_SIZE}
                </div>

                {/* Hash Table Visualization */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Hash Table (Size: {TABLE_SIZE})</h4>
                    <div className="space-y-2">
                        {hashTable.map((bucket, index) => {
                            const chainLength = getChainLength(bucket)
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300",
                                        highlightedIndex === index
                                            ? "bg-primary/10 border-primary"
                                            : "bg-muted/20 border-border"
                                    )}
                                >
                                    {/* Index */}
                                    <div className="flex-shrink-0 w-12 text-center">
                                        <div className="text-xs text-muted-foreground">Index</div>
                                        <div className="text-lg font-bold">{index}</div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="text-muted-foreground">→</div>

                                    {/* Chain */}
                                    <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                                        {bucket === null ? (
                                            <div className="text-sm text-muted-foreground italic">NULL</div>
                                        ) : (
                                            <>
                                                {(() => {
                                                    const nodes: React.ReactElement[] = []
                                                    let current: HashNode | null = bucket
                                                    let nodeIndex = 0

                                                    while (current !== null) {
                                                        nodes.push(
                                                            <div
                                                                key={nodeIndex}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <div className="flex flex-col items-center gap-1 px-3 py-2 bg-card border-2 border-border rounded-lg min-w-[80px]">
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {current.key}
                                                                    </div>
                                                                    <div className="text-lg font-bold">
                                                                        {current.value}
                                                                    </div>
                                                                </div>
                                                                {current.next && (
                                                                    <div className="text-muted-foreground">→</div>
                                                                )}
                                                            </div>
                                                        )
                                                        current = current.next
                                                        nodeIndex++
                                                    }

                                                    return nodes
                                                })()}
                                                <div className="text-sm text-muted-foreground">NULL</div>
                                            </>
                                        )}
                                    </div>

                                    {/* Chain length indicator */}
                                    {chainLength > 0 && (
                                        <div className="flex-shrink-0 text-xs text-muted-foreground">
                                            Chain: {chainLength}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground">Total Entries</div>
                        <div className="text-2xl font-bold">
                            {hashTable.reduce((sum, bucket) => sum + getChainLength(bucket), 0)}
                        </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground">Used Buckets</div>
                        <div className="text-2xl font-bold">
                            {hashTable.filter(bucket => bucket !== null).length}
                        </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-muted-foreground">Load Factor</div>
                        <div className="text-2xl font-bold">
                            {(hashTable.reduce((sum, bucket) => sum + getChainLength(bucket), 0) / TABLE_SIZE).toFixed(2)}
                        </div>
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
