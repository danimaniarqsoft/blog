---
title: "Merge Sort Algorithm"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-19T10:14:35-06:00
image: "/images/posts/algorithms/merge-sort.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","javascript","sorting-algorithms"]
draft: false
---


Merge Sort is a classical divide-and-conquer algorithm that efficiently sorts an array by recursively dividing it into two halves, sorting them independently, and then merging the sorted halves. It is one of the fundamental algorithms in computer science, often discussed in depth in books such as *Introduction to Algorithms* by Thomas H. Cormen et al.

## Algorithm Overview

The core idea behind Merge Sort is to divide the problem of sorting an array into smaller subproblems:

1. **Divide**: Split the array into two halves.
2. **Conquer**: Recursively sort each half.
3. **Combine**: Merge the two sorted halves into a single sorted array.

## Step-by-Step Explanation

1. **Base Case**: If the array has zero or one element, it is already sorted.
2. **Recursive Case**:

   * Find the midpoint of the array.
   * Recursively sort the left and right halves.
   * Merge the two sorted halves using the merge procedure.

## Pseudocode

```shell
MERGE-SORT(A, left, right)
    if left < right
        mid = (left + right) / 2
        MERGE-SORT(A, left, mid)
        MERGE-SORT(A, mid + 1, right)
        MERGE(A, left, mid, right)

MERGE(A, left, mid, right)
    create leftSubarray = A[left..mid]
    create rightSubarray = A[mid+1..right]
    i = 0, j = 0, k = left
    while i < length(leftSubarray) and j < length(rightSubarray)
        if leftSubarray[i] <= rightSubarray[j]
            A[k] = leftSubarray[i]
            i = i + 1
        else
            A[k] = rightSubarray[j]
            j = j + 1
        k = k + 1
    copy any remaining elements of leftSubarray to A
    copy any remaining elements of rightSubarray to A
```

## Time and Space Complexity

| Case             | Time Complexity |
| ---------------- | --------------- |
| Best Case        | \(\mathcal{O}(n \log n)\)      |
| Average Case     | \(\mathcal{O}(n \log n)\)      |
| Worst Case       | \(\mathcal{O}(n \log n)\)      |
| Space Complexity | \(\mathcal{O}(n)\)            |

Merge Sort consistently performs at O(n log n) time complexity due to the logarithmic number of levels (from divide) and linear time to merge at each level. It requires O(n) additional space for the temporary arrays.

## Example Implementations

### Python

```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]

        merge_sort(left)
        merge_sort(right)

        i = j = k = 0

        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1

        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1
```

### Java

```java
public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] leftArray = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArray = Arrays.copyOfRange(arr, mid + 1, right + 1);

        int i = 0, j = 0, k = left;

        while (i < leftArray.length && j < rightArray.length) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k++] = leftArray[i++];
            } else {
                arr[k++] = rightArray[j++];
            }
        }

        while (i < leftArray.length) arr[k++] = leftArray[i++];
        while (j < rightArray.length) arr[k++] = rightArray[j++];
    }
}
```

### JavaScript

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}
```

## Related Algorithms

* **Quick Sort**: Another divide-and-conquer algorithm but does not guarantee \(\mathcal{O}(n \log n)\) in the worst case.
* **Heap Sort**: Uses a binary heap structure and sorts in \(\mathcal{O}(n \log n)\) time without extra memory.
* **Insertion Sort**: More efficient for small arrays but has \(\mathcal{O}(n^2)\) time complexity.
* **Timsort**: Hybrid of merge sort and insertion sort, used in Python's and Java's built-in sort functions.

## Limitations

* **Space Usage**: Merge Sort requires additional space, which can be a constraint in memory-limited environments.
* **Not In-Place**: Traditional implementations are not in-place due to use of temporary arrays.
* **Slower for Small Data**: Simpler algorithms like Insertion Sort are often faster for small datasets.

## References

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). The MIT Press.
* Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*.
* Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Pearson.
