// Algorithm metadata and explanations
export interface AlgorithmExplanation {
    title: string
    description: string
    timeComplexity: {
        best: string
        average: string
        worst: string
    }
    spaceComplexity: string
    howItWorks: string[]
    useCase: string
    visualization?: {
        type: 'array' | 'tree' | 'graph' | 'stack' | 'queue' | 'linkedlist' | 'hash' | 'sorting'
        interactive: boolean
    }
}

export const algorithmExplanations: Record<string, AlgorithmExplanation> = {
    // ==================== ARRAYS ====================
    'array_ops': {
        title: 'Array Operations',
        description: 'Basic array operations including traversal, insertion, deletion, and searching.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Traversal: Visit each element sequentially',
            '2. Insertion: Add element at specific position',
            '3. Deletion: Remove element and shift remaining',
            '4. Search: Find element by value or index',
            '5. Update: Modify element at given position'
        ],
        useCase: 'Foundation for understanding array manipulation and memory management',
        visualization: { type: 'array', interactive: true }
    },
    'array_insertion': {
        title: 'Array Insertion',
        description: 'Insert an element at a specific position in an array by shifting elements to the right.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Check if array has space (not full)',
            '2. Validate the insertion position',
            '3. Shift all elements from position to end, one step right',
            '4. Insert the new element at the specified position',
            '5. Increment the array size'
        ],
        useCase: 'Useful when you need to maintain order while adding elements to a collection',
        visualization: { type: 'array', interactive: true }
    },
    'array_deletion': {
        title: 'Array Deletion',
        description: 'Remove an element from a specific position by shifting remaining elements to the left.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Check if array is not empty',
            '2. Validate the deletion position',
            '3. Shift all elements after position, one step left',
            '4. Decrement the array size',
            '5. The last element is effectively removed'
        ],
        useCase: 'Used when removing elements while maintaining the order of remaining elements',
        visualization: { type: 'array', interactive: true }
    },
    'array_reversal': {
        title: 'Array Reversal',
        description: 'Reverse an array in-place using two-pointer technique.',
        timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Initialize two pointers: start at beginning, end at last element',
            '2. Swap elements at start and end positions',
            '3. Move start pointer forward, end pointer backward',
            '4. Repeat until pointers meet in the middle',
            '5. Array is now reversed in-place'
        ],
        useCase: 'String reversal, palindrome checking, array manipulation problems',
        visualization: { type: 'array', interactive: true }
    },
    'array_rotation': {
        title: 'Array Rotation',
        description: 'Rotate array elements to the left by d positions.',
        timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(d)',
        howItWorks: [
            '1. Store first d elements in temporary array',
            '2. Shift remaining elements d positions to the left',
            '3. Copy temporary elements to the end',
            '4. Alternative: Use reversal algorithm (3 reversals)',
            '5. Result: Array rotated left by d positions'
        ],
        useCase: 'Circular arrays, scheduling algorithms, game development',
        visualization: { type: 'array', interactive: true }
    },

    // ==================== LINKED LISTS ====================
    'linked_lists': {
        title: 'Linked Lists',
        description: 'Dynamic linear data structure where elements are stored in nodes with pointers.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Each node contains data and pointer to next node',
            '2. Head pointer points to first node',
            '3. Last node points to NULL',
            '4. Insert at beginning: O(1) operation',
            '5. Insert at end: O(n) without tail pointer',
            '6. Delete: Update previous node\'s next pointer'
        ],
        useCase: 'Dynamic memory allocation, implementing stacks/queues, undo functionality',
        visualization: { type: 'linkedlist', interactive: true }
    },
    'singly_linked_list': {
        title: 'Singly Linked List',
        description: 'Linear data structure where each element points to the next element.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Each node contains data and a next pointer',
            '2. Head points to first node',
            '3. Insert at beginning: Create node, point to head, update head',
            '4. Insert at end: Traverse to last node, update its next',
            '5. Delete: Find node, update previous node\'s next pointer',
            '6. Traverse: Follow next pointers until NULL'
        ],
        useCase: 'Dynamic memory allocation, implementing stacks/queues, polynomial arithmetic',
        visualization: { type: 'linkedlist', interactive: true }
    },
    'doubly_linked_list': {
        title: 'Doubly Linked List',
        description: 'Each node has pointers to both next and previous nodes, allowing bidirectional traversal.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Each node has data, next pointer, and prev pointer',
            '2. Can traverse forward and backward',
            '3. Insert: Update both next and prev pointers',
            '4. Delete: Update prev and next of adjacent nodes',
            '5. More memory per node but easier deletion',
            '6. Useful for navigation (browser history)'
        ],
        useCase: 'Browser history, music players, undo/redo functionality, LRU cache',
        visualization: { type: 'linkedlist', interactive: true }
    },
    'circular_linked_list': {
        title: 'Circular Linked List',
        description: 'Last node points back to the first node, forming a circle.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Last node\'s next points to head (not NULL)',
            '2. Can start traversal from any node',
            '3. Insert: Update pointers to maintain circular structure',
            '4. Delete: Ensure circular link is maintained',
            '5. Useful for round-robin scheduling',
            '6. No NULL checks needed for traversal'
        ],
        useCase: 'Round-robin scheduling, circular buffers, multiplayer games',
        visualization: { type: 'linkedlist', interactive: true }
    },
    'reverse_linked_list': {
        title: 'Reverse Linked List',
        description: 'Reverse the direction of pointers in a linked list.',
        timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Use three pointers: prev, current, next',
            '2. Initialize prev = NULL, current = head',
            '3. While current is not NULL:',
            '4. Store next node, reverse current\'s pointer',
            '5. Move prev and current one step forward',
            '6. Update head to prev (new first node)'
        ],
        useCase: 'Interview problems, reversing data flow, palindrome checking',
        visualization: { type: 'linkedlist', interactive: true }
    },

    // ==================== STACKS ====================
    'stack': {
        title: 'Stack (Basic)',
        description: 'LIFO (Last In First Out) data structure with push and pop operations.',
        timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Elements added and removed from top only',
            '2. Push: Add element to top',
            '3. Pop: Remove element from top',
            '4. Peek: View top without removing',
            '5. Check overflow before push',
            '6. Check underflow before pop'
        ],
        useCase: 'Function calls, expression evaluation, backtracking, undo operations',
        visualization: { type: 'stack', interactive: true }
    },
    'stack_array': {
        title: 'Stack (Array Implementation)',
        description: 'LIFO (Last In First Out) data structure implemented using an array.',
        timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Maintain a "top" pointer (initially -1)',
            '2. Push: Increment top, add element at arr[top]',
            '3. Pop: Return arr[top], decrement top',
            '4. Peek: Return arr[top] without removing',
            '5. Check overflow (top == MAX-1) before push',
            '6. Check underflow (top == -1) before pop'
        ],
        useCase: 'Function calls, undo/redo, expression evaluation, backtracking',
        visualization: { type: 'stack', interactive: true }
    },
    'stack_linked_list': {
        title: 'Stack (Linked List Implementation)',
        description: 'Dynamic stack using linked list, no size limit.',
        timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Top pointer points to first node',
            '2. Push: Create new node, point to current top, update top',
            '3. Pop: Store top data, move top to next, free old node',
            '4. No overflow condition (dynamic memory)',
            '5. Underflow when top is NULL',
            '6. More flexible than array implementation'
        ],
        useCase: 'When stack size is unknown, dynamic memory requirements',
        visualization: { type: 'stack', interactive: true }
    },

    // ==================== QUEUES ====================
    'queue_array': {
        title: 'Queue (Array Implementation)',
        description: 'FIFO (First In First Out) data structure implemented using an array.',
        timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Maintain front and rear pointers (initially -1)',
            '2. Enqueue: Increment rear, add element at arr[rear]',
            '3. Dequeue: Return arr[front], increment front',
            '4. Check overflow (rear == MAX-1) before enqueue',
            '5. Check underflow (front > rear) before dequeue',
            '6. Reset when queue becomes empty'
        ],
        useCase: 'Task scheduling, breadth-first search, printer queue, buffering',
        visualization: { type: 'queue', interactive: true }
    },
    'circular_queue': {
        title: 'Circular Queue',
        description: 'Queue where last position connects back to first, utilizing space efficiently.',
        timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Use modulo arithmetic: (rear + 1) % MAX',
            '2. Enqueue: rear = (rear + 1) % MAX, add element',
            '3. Dequeue: front = (front + 1) % MAX, return element',
            '4. Full when (rear + 1) % MAX == front',
            '5. Empty when front == -1',
            '6. Reuses freed space efficiently'
        ],
        useCase: 'CPU scheduling, memory management, traffic systems, buffering',
        visualization: { type: 'queue', interactive: true }
    },

    // ==================== SORTING ====================
    'sorting': {
        title: 'Sorting Algorithms',
        description: 'Various algorithms to arrange elements in order.',
        timeComplexity: { best: 'O(n log n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1) to O(n)',
        howItWorks: [
            '1. Comparison-based: Compare and swap elements',
            '2. Divide and conquer: Split, sort, merge',
            '3. Selection: Find min/max, place in position',
            '4. Insertion: Build sorted array incrementally',
            '5. Choose based on data size and characteristics'
        ],
        useCase: 'Data organization, searching optimization, database operations',
        visualization: { type: 'sorting', interactive: true }
    },
    'bubble_sort': {
        title: 'Bubble Sort',
        description: 'A simple sorting algorithm that repeatedly swaps adjacent elements if they are in wrong order.',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Start from the first element',
            '2. Compare adjacent elements',
            '3. Swap if they are in wrong order (left > right)',
            '4. Move to next pair and repeat',
            '5. After each pass, largest element "bubbles up" to the end',
            '6. Repeat until no swaps are needed (array is sorted)'
        ],
        useCase: 'Educational purposes, small datasets, nearly sorted data',
        visualization: { type: 'sorting', interactive: true }
    },
    'selection_sort': {
        title: 'Selection Sort',
        description: 'Find minimum element and place it at the beginning, repeat for remaining array.',
        timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Find minimum element in unsorted portion',
            '2. Swap it with first element of unsorted portion',
            '3. Move boundary of sorted portion one step right',
            '4. Repeat until entire array is sorted',
            '5. Makes minimum number of swaps',
            '6. Not stable but simple to implement'
        ],
        useCase: 'When memory writes are expensive, small datasets, educational purposes',
        visualization: { type: 'sorting', interactive: true }
    },
    'insertion_sort': {
        title: 'Insertion Sort',
        description: 'Build sorted array one element at a time by inserting elements in correct position.',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Start with second element (first is "sorted")',
            '2. Compare with elements in sorted portion',
            '3. Shift larger elements one position right',
            '4. Insert current element in correct position',
            '5. Repeat for all elements',
            '6. Efficient for nearly sorted data'
        ],
        useCase: 'Small datasets, nearly sorted data, online sorting, stable sorting',
        visualization: { type: 'sorting', interactive: true }
    },
    'merge_sort': {
        title: 'Merge Sort',
        description: 'Divide and conquer sorting algorithm that divides array into halves, sorts them, and merges.',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Divide: Split array into two halves',
            '2. Recursively sort both halves',
            '3. Merge: Combine two sorted halves',
            '4. Compare first elements of both halves',
            '5. Place smaller element in result array',
            '6. Repeat until all elements merged',
            '7. Base case: Array of size 1 is already sorted'
        ],
        useCase: 'External sorting, stable sorting, linked list sorting, guaranteed O(n log n)',
        visualization: { type: 'sorting', interactive: true }
    },
    'quick_sort': {
        title: 'Quick Sort',
        description: 'Divide and conquer algorithm that picks a pivot and partitions array around it.',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
        spaceComplexity: 'O(log n)',
        howItWorks: [
            '1. Choose a pivot element (usually last element)',
            '2. Partition: Rearrange array so elements < pivot are left, > pivot are right',
            '3. Pivot is now in its final sorted position',
            '4. Recursively apply to left and right subarrays',
            '5. Base case: Subarray of size ≤ 1',
            '6. In-place sorting with minimal extra space'
        ],
        useCase: 'General purpose sorting, when average case is acceptable, cache-friendly',
        visualization: { type: 'sorting', interactive: true }
    },


    // ==================== SEARCHING ====================
    'linear_search': {
        title: 'Linear Search',
        description: 'Sequential search through array elements one by one.',
        timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Start from first element',
            '2. Compare each element with target',
            '3. If match found, return index',
            '4. If end reached without match, return -1',
            '5. Works on unsorted arrays',
            '6. Simple but inefficient for large datasets'
        ],
        useCase: 'Small datasets, unsorted data, one-time searches',
        visualization: { type: 'array', interactive: true }
    },
    'binary_search': {
        title: 'Binary Search',
        description: 'Efficient search on sorted array by repeatedly dividing search interval in half.',
        timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Requires sorted array',
            '2. Find middle element',
            '3. If target equals middle, found!',
            '4. If target < middle, search left half',
            '5. If target > middle, search right half',
            '6. Repeat until found or search space empty'
        ],
        useCase: 'Large sorted datasets, dictionaries, database indexing',
        visualization: { type: 'array', interactive: true }
    },
    'jump_search': {
        title: 'Jump Search',
        description: 'Searching in sorted arrays by jumping ahead by fixed steps.',
        timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Works on sorted arrays',
            '2. Jump ahead by fixed block size (usually √n)',
            '3. Once value at jump point > target, step back',
            '4. Perform linear search in the identified block',
            '5. Better than linear search, worse than binary search'
        ],
        useCase: 'Sorted arrays where binary search is costly (e.g. jumping backward is slow)',
        visualization: { type: 'array', interactive: true }
    },
    'interpolation_search': {
        title: 'Interpolation Search',
        description: 'Optimized search for uniformly distributed sorted arrays.',
        timeComplexity: { best: 'O(1)', average: 'O(log(log n))', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Works on sorted, uniformly distributed data',
            '2. Estimates position using formula: lo + ((x-arr[lo])*(hi-lo)/(arr[hi]-arr[lo]))',
            '3. Like finding a word in dictionary (you estimate page)',
            '4. Recurse or iterate on the estimated position'
        ],
        useCase: 'Uniformly distributed sorted data (e.g., phone book)',
        visualization: { type: 'array', interactive: true }
    },
    'exponential_search': {
        title: 'Exponential Search',
        description: 'Finds range where element is present, then performs binary search.',
        timeComplexity: { best: 'O(1)', average: 'O(log i)', worst: 'O(log i)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Find range [2^(i-1), 2^i] containing x',
            '2. Start with i=1, double i while arr[i] < x',
            '3. Perform Binary Search in found range',
            '4. Useful for unbounded/infinite arrays'
        ],
        useCase: 'Unbounded or infinite arrays, or when target is near beginning',
        visualization: { type: 'array', interactive: true }
    },
    'fibonacci_search': {
        title: 'Fibonacci Search',
        description: 'Search using Fibonacci numbers to divide the array.',
        timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Uses Fibonacci numbers to divide array',
            '2. Similar to Binary Search but avoids division operator',
            '3. Works by narrowing down range using Fib numbers'
        ],
        useCase: 'Systems where division is expensive, or access is sequential',
        visualization: { type: 'array', interactive: true }
    },
    'ternary_search': {
        title: 'Ternary Search',
        description: 'Divide and conquer algorithm splitting array into three parts.',
        timeComplexity: { best: 'O(1)', average: 'O(log3 n)', worst: 'O(log3 n)' },
        spaceComplexity: 'O(1)',
        howItWorks: [
            '1. Divide array into 3 parts using mid1 and mid2',
            '2. If target matches mid1 or mid2, return',
            '3. Else recurse into one of the 3 segments',
            '4. More comparisons per step than Binary Search'
        ],
        useCase: 'Finding max/min in unimodal functions, or when 3-way split is beneficial',
        visualization: { type: 'array', interactive: true }
    },

    // ==================== TREES ====================
    'trees': {
        title: 'Trees',
        description: 'Hierarchical data structure with nodes connected by edges.',
        timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Root node at top',
            '2. Each node can have children',
            '3. Leaf nodes have no children',
            '4. Binary tree: Max 2 children per node',
            '5. BST: Left < Parent < Right',
            '6. Traversals: Inorder, Preorder, Postorder, Level-order'
        ],
        useCase: 'File systems, DOM, databases, decision trees, expression parsing',
        visualization: { type: 'tree', interactive: true }
    },
    'binary_search_tree': {
        title: 'Binary Search Tree (BST)',
        description: 'A tree data structure where each node has at most two children, with left < parent < right.',
        timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Start at root node',
            '2. For insertion: Compare value with current node',
            '3. If smaller, go left; if larger, go right',
            '4. Repeat until finding empty spot',
            '5. For search: Same process until value found or null reached',
            '6. Inorder traversal gives sorted sequence'
        ],
        useCase: 'Fast searching, dynamic sorted data, range queries, autocomplete',
        visualization: { type: 'tree', interactive: true }
    },
    'bst': {
        title: 'Binary Search Tree (BST)',
        description: 'A tree data structure where each node has at most two children, with left < parent < right.',
        timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Start at root node',
            '2. For insertion: Compare value with current node',
            '3. If smaller, go left; if larger, go right',
            '4. Repeat until finding empty spot',
            '5. For search: Same process until value found or null reached',
            '6. Inorder traversal gives sorted sequence'
        ],
        useCase: 'Fast searching, dynamic sorted data, range queries, autocomplete',
        visualization: { type: 'tree', interactive: true }
    },
    'level_order_traversal': {
        title: 'Level Order Traversal (BFS)',
        description: 'Visit tree nodes level by level from left to right.',
        timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(w)',
        howItWorks: [
            '1. Use queue for level-by-level traversal',
            '2. Start with root in queue',
            '3. Dequeue node, process it',
            '4. Enqueue its left and right children',
            '5. Repeat until queue is empty',
            '6. Visits all nodes at depth d before depth d+1'
        ],
        useCase: 'Finding shortest path, level-wise processing, serialization',
        visualization: { type: 'tree', interactive: true }
    },
    'max_heap': {
        title: 'Max Heap',
        description: 'Complete binary tree where parent is always greater than or equal to children.',
        timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Parent at index i, children at 2i+1 and 2i+2',
            '2. Insert: Add at end, heapify up',
            '3. Heapify up: Swap with parent if larger',
            '4. Extract max: Remove root, move last to root',
            '5. Heapify down: Swap with larger child',
            '6. Maintains heap property after operations'
        ],
        useCase: 'Priority queues, heap sort, finding k largest elements, scheduling',
        visualization: { type: 'tree', interactive: true }
    },

    // ==================== GRAPHS ====================
    'graphs': {
        title: 'Graphs',
        description: 'Non-linear data structure with vertices connected by edges.',
        timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V²)' },
        spaceComplexity: 'O(V + E)',
        howItWorks: [
            '1. Vertices (nodes) and edges (connections)',
            '2. Directed or undirected',
            '3. Weighted or unweighted',
            '4. Adjacency matrix: O(V²) space',
            '5. Adjacency list: O(V + E) space',
            '6. Traversals: BFS, DFS'
        ],
        useCase: 'Social networks, maps, web crawling, dependency resolution',
        visualization: { type: 'graph', interactive: true }
    },
    'bfs': {
        title: 'Breadth-First Search (BFS)',
        description: 'Graph traversal algorithm that explores all neighbors at current depth before moving deeper.',
        timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
        spaceComplexity: 'O(V)',
        howItWorks: [
            '1. Start at source vertex, mark as visited',
            '2. Add source to queue',
            '3. While queue is not empty:',
            '4. Dequeue a vertex and process it',
            '5. Enqueue all unvisited neighbors',
            '6. Mark neighbors as visited',
            '7. Repeat until queue is empty'
        ],
        useCase: 'Shortest path in unweighted graphs, level-order traversal, web crawling',
        visualization: { type: 'graph', interactive: true }
    },
    'dfs': {
        title: 'Depth-First Search (DFS)',
        description: 'Graph traversal that explores as far as possible along each branch before backtracking.',
        timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
        spaceComplexity: 'O(V)',
        howItWorks: [
            '1. Start at source vertex, mark as visited',
            '2. Process current vertex',
            '3. For each unvisited neighbor:',
            '4. Recursively call DFS on that neighbor',
            '5. Backtrack when no unvisited neighbors remain',
            '6. Continue until all reachable vertices visited'
        ],
        useCase: 'Cycle detection, topological sorting, maze solving, pathfinding',
        visualization: { type: 'graph', interactive: true }
    },

    // ==================== HASHING ====================
    'hash_table_chaining': {
        title: 'Hash Table with Chaining',
        description: 'Hash table using linked lists to handle collisions.',
        timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
        spaceComplexity: 'O(n)',
        howItWorks: [
            '1. Hash function maps keys to indices',
            '2. Each index has a linked list',
            '3. Insert: Hash key, add to list at that index',
            '4. Search: Hash key, traverse list at that index',
            '5. Collisions handled by chaining',
            '6. Load factor affects performance'
        ],
        useCase: 'Dictionaries, caches, symbol tables, database indexing',
        visualization: { type: 'hash', interactive: true }
    }
}

// Get explanation for a file
export function getAlgorithmExplanation(filename: string): AlgorithmExplanation | null {
    const key = filename.replace('.c', '')
    return algorithmExplanations[key] || null
}
