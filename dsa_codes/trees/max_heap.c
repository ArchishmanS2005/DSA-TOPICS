// Max Heap Implementation
#include <stdio.h>
#define MAX 100

struct MaxHeap {
    int arr[MAX];
    int size;
};

void initHeap(struct MaxHeap* heap) {
    heap->size = 0;
}

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapifyUp(struct MaxHeap* heap, int index) {
    if (index == 0) return;
    
    int parent = (index - 1) / 2;
    
    if (heap->arr[index] > heap->arr[parent]) {
        swap(&heap->arr[index], &heap->arr[parent]);
        heapifyUp(heap, parent);
    }
}

void heapifyDown(struct MaxHeap* heap, int index) {
    int largest = index;
    int left = 2 * index + 1;
    int right = 2 * index + 2;
    
    if (left < heap->size && heap->arr[left] > heap->arr[largest]) {
        largest = left;
    }
    
    if (right < heap->size && heap->arr[right] > heap->arr[largest]) {
        largest = right;
    }
    
    if (largest != index) {
        swap(&heap->arr[index], &heap->arr[largest]);
        heapifyDown(heap, largest);
    }
}

void insert(struct MaxHeap* heap, int value) {
    if (heap->size >= MAX) {
        printf("Heap is full!\n");
        return;
    }
    
    heap->arr[heap->size] = value;
    heapifyUp(heap, heap->size);
    heap->size++;
}

int extractMax(struct MaxHeap* heap) {
    if (heap->size == 0) {
        printf("Heap is empty!\n");
        return -1;
    }
    
    int max = heap->arr[0];
    heap->arr[0] = heap->arr[heap->size - 1];
    heap->size--;
    heapifyDown(heap, 0);
    
    return max;
}

void display(struct MaxHeap* heap) {
    printf("Max Heap: ");
    for (int i = 0; i < heap->size; i++) {
        printf("%d ", heap->arr[i]);
    }
    printf("\n");
}

int main() {
    struct MaxHeap heap;
    initHeap(&heap);
    
    insert(&heap, 10);
    insert(&heap, 20);
    insert(&heap, 15);
    insert(&heap, 40);
    insert(&heap, 50);
    insert(&heap, 100);
    insert(&heap, 25);
    
    display(&heap);
    
    printf("Extracted max: %d\n", extractMax(&heap));
    display(&heap);
    
    return 0;
}
