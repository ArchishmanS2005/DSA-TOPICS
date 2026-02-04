// Array Rotation
#include <stdio.h>

void rotateLeft(int arr[], int n, int d) {
    d = d % n;
    int temp[d];
    
    // Store first d elements
    for (int i = 0; i < d; i++) {
        temp[i] = arr[i];
    }
    
    // Shift remaining elements
    for (int i = d; i < n; i++) {
        arr[i - d] = arr[i];
    }
    
    // Put temp elements at end
    for (int i = 0; i < d; i++) {
        arr[n - d + i] = temp[i];
    }
}

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    int d = 2;
    
    printf("Original array: ");
    display(arr, n);
    
    rotateLeft(arr, n, d);
    
    printf("Array after %d left rotations: ", d);
    display(arr, n);
    
    return 0;
}
