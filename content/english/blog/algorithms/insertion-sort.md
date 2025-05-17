---
title: "Insertion Sort Algorithm"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-17T12:28:05-06:00
image: "/images/image-placeholder.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","sorting-algorithms"]
draft: false
---


Insertion Sort is a simple and intuitive comparison-based sorting algorithm. It builds the final sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it has advantages in simplicity and efficiency for small datasets.

## How It Works

Insertion Sort iterates over each element in the array and inserts it into its correct position among the previously sorted elements. It resembles the method of sorting playing cards in your hands.

## Pseudocode

```shell
InsertionSort(array)
  for i from 1 to length(array) - 1
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key
      array[j + 1] = array[j]
      j = j - 1
    array[j + 1] = key
```

## Time and Space Complexity

| Case       | Time Complexity |
| ---------- | --------------- |
| Best Case  | O(n)            |
| Average    | O(n^2)          |
| Worst Case | O(n^2)          |

* **Space Complexity**: O(1) (in-place sorting)
* **Stable**: Yes

## Example Implementations

### Python

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Example usage
arr = [12, 11, 13, 5, 6]
print(insertion_sort(arr))
```

### Java

```java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        insertionSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

## Related Algorithms

* **Bubble Sort**: Also a simple comparison-based algorithm but compares adjacent elements.
* **Selection Sort**: Selects the minimum element and places it at the beginning.
* **Shell Sort**: A generalization of insertion sort that allows the exchange of items that are far apart.
* **Merge Sort**: A divide-and-conquer algorithm offering better time complexity for large datasets.
* **Quick Sort**: Another divide-and-conquer algorithm known for its fast average-case performance.

## Conclusion

Insertion Sort is a fundamental algorithm suitable for small datasets and educational purposes. Despite its quadratic time complexity, its simplicity and stability make it useful in particular scenarios.
