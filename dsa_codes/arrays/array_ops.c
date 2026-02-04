#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

// Function to traverse and print the array
void traverse(int arr[], int size) {
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// Function to insert an element at a specific position
int insert(int arr[], int *size, int element, int pos) {
    if (*size >= MAX_SIZE) {
        printf("Array is full!\n");
        return -1;
    }
    if (pos < 0 || pos > *size) {
        printf("Invalid position!\n");
        return -1;
    }
    
    // Shift elements to the right
    for (int i = *size; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    
    arr[pos] = element;
    (*size)++;
    return 0;
}

// Function to delete an element at a specific position
int delete(int arr[], int *size, int pos) {
    if (*size <= 0) {
        printf("Array is empty!\n");
        return -1;
    }
    if (pos < 0 || pos >= *size) {
        printf("Invalid position!\n");
        return -1;
    }
    
    // Shift elements to the left
    for (int i = pos; i < *size - 1; i++) {
        arr[i] = arr[i + 1];
    }
    
    (*size)--;
    return 0;
}

int main() {
    int arr[MAX_SIZE] = {10, 20, 30, 40, 50};
    int size = 5;
    
    traverse(arr, size);
    
    printf("Inserting 25 at position 2...\n");
    insert(arr, &size, 25, 2);
    traverse(arr, size);
    
    printf("Deleting element at position 3...\n");
    delete(arr, &size, 3);
    traverse(arr, size);
    
    return 0;
}
