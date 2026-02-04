// Array Operations - Deletion
#include <stdio.h>
#define MAX 100

void deleteAtPosition(int arr[], int *n, int pos) {
    if (*n <= 0) {
        printf("Array is empty!\n");
        return;
    }
    if (pos < 0 || pos >= *n) {
        printf("Invalid position!\n");
        return;
    }
    
    for (int i = pos; i < *n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    (*n)--;
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
    
    deleteAtPosition(arr, &n, 2);
    printf("After deleting at position 2: ");
    display(arr, n);
    
    deleteAtPosition(arr, &n, 0);
    printf("After deleting at position 0: ");
    display(arr, n);
    
    return 0;
}
