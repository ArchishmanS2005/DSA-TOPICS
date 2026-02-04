#include <stdio.h>
#include <math.h>

int binarySearch(int arr[], int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}

// Returns position of first occurrence of x in array
int exponentialSearch(int arr[], int n, int x) {
    // If x is present at first location itself
    if (arr[0] == x)
        return 0;

    // Find range for binary search by repeated doubling
    int i = 1;
    while (i < n && arr[i] <= x)
        i = i * 2;

    // Call binary search for the found range
    // Range is [i/2, min(i, n-1)]
    return binarySearch(arr, i / 2, (i < n) ? i : n - 1, x);
}

int main() {
    int arr[] = { 2, 3, 4, 10, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160 };
    int n = sizeof(arr) / sizeof(arr[0]);
    int x = 10;
    int result = exponentialSearch(arr, n, x);
    if (result == -1)
        printf("Element is not present in array\n");
    else
        printf("Element is present at index %d\n", result);
    return 0;
}
