// Array Operations - Insertion
#include <stdio.h>
#define MAX 100

void insertAtPosition(int arr[], int *n, int pos, int value) {
    if (*n >= MAX) {
        printf("Array is full!\n");
        return;
    }
    if (pos < 0 || pos > *n) {
        printf("Invalid position!\n");
        return;
    }
    
    for (int i = *n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = value;
    (*n)++;
}

void display(int arr[], int n) {
    printf("Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[MAX] = {10, 20, 30, 40, 50};
    int n = 5;
    
    printf("Original ");
    display(arr, n);
    
    insertAtPosition(arr, &n, 2, 25);
    printf("After inserting 25 at position 2: ");
    display(arr, n);
    
    insertAtPosition(arr, &n, 0, 5);
    printf("After inserting 5 at position 0: ");
    display(arr, n);
    
    return 0;
}
