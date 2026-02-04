'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import {
    Search,
    FileCode2,
    Folder,
    Hash,
    Binary,
    LayoutGrid,
    ChevronRight,
    SearchX
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Topic } from '@/types/dsa'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface SpotlightSearchProps {
    topics: Topic[]
    children?: React.ReactNode
}

export function SpotlightSearch({ topics, children }: SpotlightSearchProps) {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        const handleOpen = () => setOpen(true)

        document.addEventListener('keydown', down)
        window.addEventListener('open-spotlight', handleOpen)

        return () => {
            document.removeEventListener('keydown', down)
            window.removeEventListener('open-spotlight', handleOpen)
        }
    }, [])

    const onSelect = (value: string) => {
        setOpen(false)
        router.push(value)
    }

    return (
        <>
            {children}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="overflow-hidden p-0 shadow-2xl border-none sm:max-w-[600px] bg-background/95 backdrop-blur-xl">
                    <DialogTitle className="sr-only">Search Algorithms and Data Structures</DialogTitle>
                    <Command className="flex flex-col h-full max-h-[450px]">
                        <div className="flex items-center border-b px-4 py-3 gap-2" cmdk-input-wrapper="">
                            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                            <Command.Input
                                placeholder="Search algorithms, files, or topics..."
                                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-base placeholder:text-muted-foreground py-1"
                            />
                            <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded border bg-muted/50 text-[10px] font-mono font-medium text-muted-foreground select-none">
                                <span className="text-xs">ESC</span>
                            </div>
                        </div>

                        <Command.List className="overflow-y-auto px-2 py-2 scrollbar-thin">
                            <Command.Empty className="py-12 flex flex-col items-center justify-center gap-2">
                                <SearchX className="w-8 h-8 text-muted-foreground opacity-20" />
                                <p className="text-sm text-muted-foreground">No matches found.</p>
                            </Command.Empty>

                            {/* Quick Actions / Categories */}
                            <Command.Group heading="Categories" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2">
                                <div className="grid grid-cols-2 gap-1 mt-1">
                                    {topics.map(topic => (
                                        <Command.Item
                                            key={topic.name}
                                            onSelect={() => onSelect(`/${topic.name}/${topic.files[0]}`)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-md cursor-default select-none group aria-selected:bg-primary aria-selected:text-primary-foreground transition-colors"
                                        >
                                            <Folder className="w-4 h-4 shrink-0 opacity-70 group-aria-selected:opacity-100" />
                                            <span className="text-sm capitalize">{topic.name.replace(/_/g, ' ')}</span>
                                        </Command.Item>
                                    ))}
                                </div>
                            </Command.Group>

                            <Separator className="my-2" />

                            {/* Files */}
                            <Command.Group heading="Files" className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-2">
                                {topics.flatMap(topic =>
                                    topic.files.map(file => (
                                        <Command.Item
                                            key={`${topic.name}-${file}`}
                                            onSelect={() => onSelect(`/${topic.name}/${file}`)}
                                            className="flex items-center justify-between px-3 py-2.5 rounded-md cursor-default select-none group aria-selected:bg-primary aria-selected:text-primary-foreground transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center group-aria-selected:bg-primary-foreground/10 transition-colors">
                                                    <FileCode2 className="w-4 h-4 opacity-70 group-aria-selected:opacity-100" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{file}</span>
                                                    <span className="text-[10px] opacity-60 capitalize group-aria-selected:opacity-80">
                                                        {topic.name.replace(/_/g, ' ')}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-3.5 h-3.5 opacity-30 group-aria-selected:opacity-100" />
                                        </Command.Item>
                                    ))
                                )}
                            </Command.Group>
                        </Command.List>

                        <div className="flex items-center justify-between border-t px-4 py-3 bg-muted/30 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                    <kbd className="rounded border bg-background px-1.5 py-0.5">Enter</kbd>
                                    <span>to select</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                    <kbd className="rounded border bg-background px-1.5 py-0.5">↓↑</kbd>
                                    <span>to navigate</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground italic">
                                Spotlight Search beta
                            </div>
                        </div>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    )
}

// Utility Components needed for Dialog
function Separator({ className }: { className?: string }) {
    return <div className={cn("h-px bg-border", className)} />
}
