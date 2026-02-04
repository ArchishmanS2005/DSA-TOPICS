export const APP_NAME = 'DSA Visualizer'
export const APP_DESCRIPTION = 'Interactive Data Structures & Algorithms visualization in C'

export const TOPICS_ORDER = [
    'arrays',
    'linked_lists',
    'stacks',
    'queues',
    'trees',
    'graphs',
    'sorting',
    'searching',
    'hashing'
] as const

export const TOPIC_LABELS: Record<string, string> = {
    arrays: 'Arrays',
    linked_lists: 'Linked Lists',
    stacks: 'Stacks',
    queues: 'Queues',
    trees: 'Trees',
    graphs: 'Graphs',
    sorting: 'Sorting',
    searching: 'Searching',
    hashing: 'Hashing'
}

export const TOPIC_DESCRIPTIONS: Record<string, string> = {
    arrays: 'Contiguous memory allocation with O(1) random access',
    linked_lists: 'Dynamic memory with pointer-based navigation',
    stacks: 'Last In, First Out (LIFO) data structure',
    queues: 'First In, First Out (FIFO) data structure',
    trees: 'Hierarchical data structure with nodes',
    graphs: 'Network of vertices and edges',
    sorting: 'Algorithms for ordering elements',
    searching: 'Algorithms for finding elements',
    hashing: 'Key-value mapping with hash functions'
}
