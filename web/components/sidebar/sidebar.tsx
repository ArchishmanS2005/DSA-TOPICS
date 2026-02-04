'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo } from 'react'
import {
    Code2,
    Search,
    FileCode2,
    Folder,
    ChevronRight,
    Menu,
    PanelLeftClose,
    PanelLeftOpen,
    LayoutGrid
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Topic } from '@/types/dsa'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface SidebarContentProps {
    topics: Topic[]
    isCollapsed?: boolean
    toggleCollapse?: () => void
    isMobile?: boolean
}

function SidebarContent({ topics, isCollapsed = false, toggleCollapse, isMobile = false }: SidebarContentProps) {
    const pathname = usePathname()
    const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())

    // Auto-expand current topic
    useMemo(() => {
        if (pathname) {
            const parts = pathname.split('/').filter(Boolean)
            if (parts.length >= 1) {
                setExpandedTopics(prev => new Set(prev).add(parts[0]))
            }
        }
    }, [pathname])

    const toggleTopic = (topicName: string) => {
        setExpandedTopics(prev => {
            const next = new Set(prev)
            if (next.has(topicName)) {
                next.delete(topicName)
            } else {
                next.add(topicName)
            }
            return next
        })
    }

    const triggerSearch = () => {
        window.dispatchEvent(new CustomEvent('open-spotlight'))
    }

    return (
        <div className={cn("flex flex-col h-full bg-card border-r transition-all duration-300", isCollapsed ? "items-center" : "")}>
            {/* Header */}
            <div className={cn("p-4 shrink-0 flex items-center", isCollapsed ? "justify-center flex-col gap-4" : "justify-between")}>
                <Link href="/" className="block group">
                    <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Code2 className="w-5 h-5 text-primary" />
                        </div>
                        {!isCollapsed && (
                            <h1 className="text-xl font-extrabold tracking-tighter group-hover:text-primary transition-colors">
                                DSA<span className="text-muted-foreground">Viz</span>
                            </h1>
                        )}
                    </div>
                </Link>

                {toggleCollapse && !isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleCollapse}
                        className={cn("h-8 w-8 text-muted-foreground", isCollapsed && "mt-2")}
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                    </Button>
                )}
            </div>

            {/* Navigation Section */}
            <div className={cn("px-3 py-2 w-full space-y-1", isCollapsed ? "flex flex-col items-center" : "")}>
                {/* Search Trigger */}
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full gap-2 focus-ring text-muted-foreground hover:text-foreground",
                        isCollapsed ? "justify-center h-10 w-10 p-0" : "justify-start px-3 h-9 bg-muted/30"
                    )}
                    onClick={triggerSearch}
                    title="Search (Ctrl+K)"
                >
                    <Search className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="text-sm">Quick Search...</span>}
                    {!isCollapsed && <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">K</span>
                    </kbd>}
                </Button>

                <Button
                    variant={pathname === '/' ? 'secondary' : 'ghost'}
                    className={cn(
                        "w-full gap-2 focus-ring",
                        isCollapsed ? "justify-center h-10 w-10 p-0" : "justify-start"
                    )}
                    asChild
                    title="Home"
                >
                    <Link href="/">
                        <Code2 className="w-4 h-4 shrink-0" />
                        {!isCollapsed && "Home"}
                    </Link>
                </Button>
            </div>

            <Separator className="mx-4 my-2" />

            {/* Navigation Body */}
            <ScrollArea className="flex-1 px-3 py-2 scrollbar-thin w-full">
                <nav className="space-y-1" aria-label="DSA Topics">
                    {isCollapsed ? (
                        // Consolidated View when collapsed
                        <Button
                            variant="ghost"
                            onClick={toggleCollapse}
                            className="w-10 h-10 p-0 flex items-center justify-center hover:bg-accent group focus-ring"
                            title="Browse Topics"
                        >
                            <LayoutGrid className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Button>
                    ) : (
                        // Full topics list
                        topics.map((topic) => {
                            const isOpen = expandedTopics.has(topic.name)
                            const totalFiles = topic.files.length

                            return (
                                <div key={topic.name} className="space-y-0.5">
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleTopic(topic.name)}
                                        className="w-full hover:bg-accent group h-9 focus-ring transition-all justify-between"
                                        title={topic.name}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Folder className={cn(
                                                "w-4 h-4 transition-colors",
                                                isOpen ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                            )} />
                                            <span className="capitalize font-medium text-sm truncate">
                                                {topic.name.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-mono tabular-nums">
                                                {totalFiles}
                                            </Badge>
                                            <ChevronRight className={cn(
                                                "w-3.5 h-3.5 transition-transform text-muted-foreground",
                                                isOpen && "rotate-90"
                                            )} />
                                        </div>
                                    </Button>

                                    {isOpen && (
                                        <div className="ml-4 pl-2 border-l border-muted/50 space-y-0.5 animate-slide-in-left">
                                            {topic.files.map(file => {
                                                const href = `/${topic.name}/${file}`
                                                const isActive = pathname === href

                                                return (
                                                    <Link
                                                        key={file}
                                                        href={href}
                                                        className={cn(
                                                            "flex items-center gap-2 rounded-md transition-all font-medium group/file focus-ring px-3 py-2 text-sm",
                                                            isActive
                                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                        )}
                                                        title={file}
                                                        aria-current={isActive ? 'page' : undefined}
                                                    >
                                                        <FileCode2 className={cn(
                                                            "w-4 h-4",
                                                            isActive ? "opacity-100" : "opacity-70 group-hover/file:opacity-100"
                                                        )} />
                                                        <span className="truncate text-xs">{file}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </nav>
            </ScrollArea>

            {!isCollapsed && <Separator />}

            {/* Footer */}
            <div className={cn("p-4 shrink-0 transition-all", isCollapsed ? "flex justify-center" : "space-y-2")}>
                {!isCollapsed ? (
                    <>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Total Files</span>
                            <Badge variant="outline" className="font-mono tabular-nums">
                                {topics.reduce((acc, t) => acc + t.files.length, 0)}
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono">
                            © 2026 DSA Visualizer
                        </p>
                    </>
                ) : (
                    <Badge variant="outline" className="h-6 w-6 flex items-center justify-center p-0 rounded-full font-mono text-[10px]">
                        {topics.reduce((acc, t) => acc + t.files.length, 0)}
                    </Badge>
                )}
            </div>
        </div>
    )
}

// Main Sidebar component with mobile/desktop variants
export function Sidebar({ topics }: { topics: Topic[] }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col h-screen shrink-0 border-r bg-card transition-all duration-300 ease-in-out relative z-30",
                    isCollapsed ? "w-20" : "w-72"
                )}
            >
                <SidebarContent
                    topics={topics}
                    isCollapsed={isCollapsed}
                    toggleCollapse={() => setIsCollapsed(!isCollapsed)}
                />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden fixed top-4 left-4 z-50 shadow-lg focus-ring touch-target"
                        aria-label="Open navigation menu"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                    <SidebarContent topics={topics} isMobile={true} />
                </SheetContent>
            </Sheet>
        </>
    )
}
