export interface Topic {
    name: string
    files: string[]
}

export interface FileData {
    name: string
    topic: string
    content: string
    path: string
}

export interface VisualizationData {
    type: 'array' | 'linked-list' | 'stack' | 'tree' | 'sort'
    data: unknown
}
