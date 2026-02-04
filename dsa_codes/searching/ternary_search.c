#include <stdio.h>

// A recursive ternary search function. It returns location of x in
// given array arr[l..r] is present, otherwise -1
int ternarySearch(int l, int r, int x, int arr[]) {
    if (r >= l) {
        int mid1 = l + (r - l) / 3;
        int mid2 = r - (r - l) / 3;

        // If x is present at the mid1
        if (arr[mid1] == x)
            return mid1;

        // If x is present at the mid2
        if (arr[mid2] == x)
            return mid2;

        // If x is present in left one-third
        if (arr[mid1] > x)
            return ternarySearch(l, mid1 - 1, x, arr);

        // If x is present in right one-third
        if (arr[mid2] < x)
            return ternarySearch(mid2 + 1, r, x, arr);

        // If x is present in middle one-third
        return ternarySearch(mid1 + 1, mid2 - 1, x, arr);
    }

    // We reach here when element is not present in array
    return -1;
}

int main() {
    int arr[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int l = 0;
    int r = 9;
    int x = 5;
    int result = ternarySearch(l, r, x, arr);
    if (result == -1)
        printf("Element is not present in array\n");
    else
        printf("Element is present at index %d\n", result);
}
