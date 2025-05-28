---
title: "Selection Sort Algorithm"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-17T00:02:39-06:00
image: "/images/algorithms.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","sorting-algorithms"]
draft: false
---

Selection Sort is a simple comparison-based sorting algorithm. It works by dividing the input list into two parts: the sublist of items already sorted, which is built up from left to right, and the sublist of items remaining to be sorted that occupy the rest of the list. The algorithm proceeds by finding the smallest (or largest, depending on the sorting order) element from the unsorted sublist and swapping it with the leftmost unsorted element, moving the sublist boundaries one element to the right.


Pseudo Code
```shell
SelectionSort(A):
  for i from 0 to length(A) - 1:
    minIndex = i
    for j from i + 1 to length(A):
      if A[j] < A[minIndex]:
        minIndex = j
    if minIndex != i:
      swap A[i] and A[minIndex]
```


## Time and Space Complexity

* **Best Case Time Complexity:** \(\mathcal{O}(n^2)\)
* **Average Case Time Complexity:** \(\mathcal{O}(n^2)\)
* **Worst Case Time Complexity:** \(\mathcal{O}(n^2)\)
* **Space Complexity:** \(\mathcal{O}(1)\) (in-place sorting)

Selection Sort does not adapt to the data and performs the same number of comparisons regardless of the initial order of the elements.

## Example Implementation

### Python

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_index = i
        for j in range(i+1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr

# Example usage
arr = [64, 25, 12, 22, 11]
print("Sorted array:", selection_sort(arr))
```

## Java

```java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.print("Sorted array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

## Related Algorithms

* **Bubble Sort:** Another simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.

* **Insertion Sort:** Builds the sorted array one element at a time by repeatedly taking the next element and inserting it into the correct position.

* **Heap Sort:** A more efficient comparison-based sorting algorithm that uses a binary heap data structure.

* **Quick Sort:** A divide-and-conquer algorithm with better average-case performance.

## Summary

Selection Sort is easy to understand and implement, making it a useful algorithm for educational purposes. However, due to its quadratic time complexity, it is inefficient on large lists compared to more advanced algorithms like Merge Sort and Quick Sort. It is notable for its simplicity and for performing sorting in place without additional memory usage.

![Selection sort](/blog/images/posts/algorithms/selection-sort.png)
