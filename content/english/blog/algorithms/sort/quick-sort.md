---
title: "Quick Sort Algorithm: An In-depth Guide"
meta_title: "quick sort"
description: "this is meta description"
date: 2025-05-27T22:07:05-06:00
image: "/images/algorithms.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","javascript","sorting-algorithms"]
draft: false
---

Quick Sort is one of the most efficient and widely used sorting algorithms. Introduced by Tony Hoare in 1960, it employs a divide-and-conquer strategy to sort elements. It is particularly known for its performance in practice, often outperforming other sorting algorithms such as merge sort and bubble sort for large datasets.

According to *Introduction to Algorithms* by Thomas H. Cormen et al., Quick Sort's strength lies in its in-place sorting and average-case efficiency, making it a staple in programming and computer science curricula.

---

## How Quick Sort Works: Step-by-Step

Quick Sort follows these primary steps:

1. **Choose a Pivot**: Select an element from the array as a pivot.
2. **Partitioning**: Rearrange the array so that elements less than the pivot go to the left, elements greater than the pivot go to the right.
3. **Recursion**: Recursively apply the above steps to the sub-arrays formed by partitioning.

### Step-by-step Example:
Given an array `[10, 7, 8, 9, 1, 5]`:
- Choose pivot: 5
- Partition: `[1] [5] [10, 7, 8, 9]`
- Recursively sort `[1]` and `[10, 7, 8, 9]`

Continue until the array is fully sorted.

---

## Pseudo Code

```plaintext
QUICKSORT(A, low, high):
  if low < high:
    pi = PARTITION(A, low, high)
    QUICKSORT(A, low, pi - 1)
    QUICKSORT(A, pi + 1, high)

PARTITION(A, low, high):
  pivot = A[high]
  i = low - 1
  for j = low to high - 1:
    if A[j] < pivot:
      i = i + 1
      swap A[i] and A[j]
  swap A[i + 1] and A[high]
  return i + 1
```

---

## Time and Space Complexity

| Case       | Time Complexity             |
|------------|-----------------------------|
| Best Case  | \( \mathcal{O}(n \log n) \) |
| Average    | \( \mathcal{O}(n \log n) \) |
| Worst Case | \( \mathcal{O}(n^2) \)      |
| Space      | \( \mathcal{O}(\log n) \)   |

- Worst-case occurs when pivot selection results in unbalanced partitions (e.g., already sorted arrays).
- In-place sorting ensures minimal auxiliary space.

---

## Code Examples

### Python
```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3,6,8,10,1,2,1]))
```

### Java
```java
public class QuickSort {
    int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    void quickSort(int arr[], int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
}
```

### JavaScript
```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[arr.length - 1];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([10, 5, 2, 3]));
```

---

## Related Algorithms

- **Merge Sort**: Also uses divide-and-conquer but not in-place.
- **Heap Sort**: Uses a heap data structure.
- **Insertion Sort**: Efficient for small or nearly sorted data.
- **IntroSort**: Hybrid of Quick Sort and Heap Sort (used in C++ STL).

---

## Limitations

- **Worst-case Time Complexity**: \( \mathcal{O}(n^2) \) when pivot choices lead to unbalanced partitions.
- **Unstable Sort**: Relative order of equal elements may not be preserved.
- **Recursive Depth**: Deep recursion can lead to stack overflow for large arrays if not optimized (e.g., using tail call elimination or iterative version).

---

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
- Hoare, C. A. R. (1961). Algorithm 64: Quicksort. *Communications of the ACM*, 4(7), 321.
- Knuth, D. E. (1998). *The Art of Computer Programming*, Volume 3: *Sorting and Searching*.
- https://en.wikipedia.org/wiki/Quicksort

---