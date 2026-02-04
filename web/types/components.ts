export interface SidebarState {
    isOpen: boolean
    searchQuery: string
    expandedTopics: Set<string>
}

export interface SidebarActions {
    toggle: () => void
    setSearch: (query: string) => void
    toggleTopic: (topic: string) => void
    close: () => void
    open: () => void
}

export interface SidebarContextValue {
    state: SidebarState
    actions: SidebarActions
}

export interface CodeViewerState {
    theme: 'light' | 'dark'
    activeTab: 'code' | 'analysis'
}

export interface CodeViewerActions {
    toggleTheme: () => void
    setActiveTab: (tab: 'code' | 'analysis') => void
    copyCode: () => Promise<void>
    downloadCode: () => void
}

export interface CodeViewerMeta {
    code: string
    language: string
    filename: string
}

export interface CodeViewerContextValue {
    state: CodeViewerState
    actions: CodeViewerActions
    meta: CodeViewerMeta
}
