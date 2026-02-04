#include <stdio.h>
#include <math.h>

// Function to perform Jump Search
int jumpSearch(int arr[], int n, int x) {
    // Finding block size to be jumped
    int step = sqrt(n);
    int prev = 0;

    // Finding the block where element is present (if it is present)
    while (arr[(int)fmin(step, n) - 1] < x) {
        prev = step;
        step += sqrt(n);
        if (prev >= n)
            return -1;
    }

    // Doing a linear search for x in block beginning with prev
    while (arr[prev] < x) {
        prev++;
        // If we reached next block or end of array, element is not present.
        if (prev == fmin(step, n))
            return -1;
    }

    // If element is found
    if (arr[prev] == x)
        return prev;

    return -1;
}

int main() {
    int arr[] = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 };
    int x = 55;
    int n = sizeof(arr) / sizeof(arr[0]);

    // Find the index of 'x' using Jump Search
    int index = jumpSearch(arr, n, x);

    if (index != -1)
        printf("Number %d found at index %d\n", x, index);
    else
        printf("Number %d not found\n", x);

    return 0;
}
