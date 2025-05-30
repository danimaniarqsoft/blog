---
title: "Insertion Sort Algorithm"
meta_title: "insertion sort"
description: "this is meta description"
date: 2025-05-17T12:28:05-06:00
image: "/images/algorithms.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","sorting-algorithms"]
draft: false
---

Insertion Sort is a simple and intuitive comparison-based sorting algorithm. It builds the final sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it has advantages in simplicity and efficiency for small datasets.

## Reference

This explanation is based on *"Introduction to Algorithms"* by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein (CLRS), with additional insights from Donald Knuth's *"The Art of Computer Programming"*.


## How It Works

Insertion Sort iterates over each element in the array and inserts it into its correct position among the previously sorted elements. It resembles the method of sorting playing cards in your hands.


### Step-by-Step Explanation

1. **Start with the second element** (element at index 1). This is because a single element (first one) is trivially sorted.
2. **Compare it with elements before it**, and shift larger elements one position to the right.
3. **Insert the current element** into its correct position.
4. **Repeat** for all elements in the array.


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
| Best Case  | \(\mathcal{O}(n)\)            |
| Average    | \(\mathcal{O}(n^2)\)          |
| Worst Case | \(\mathcal{O}(n^2)\)          |

* **Space Complexity**: \(\mathcal{O}(1)\) (in-place sorting)
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

### JavaScript

```javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
```

## Limitations

* Inefficient for large datasets due to \(\mathcal{O}(n^2)\) time complexity.
* Good for small arrays or arrays that are already mostly sorted.

## Related Algorithms

* **Bubble Sort**: Also a simple comparison-based algorithm but compares adjacent elements.
* **Selection Sort**: Selects the minimum element and places it at the beginning.
* **Shell Sort**: A generalization of insertion sort that allows the exchange of items that are far apart.
* **Merge Sort**: A divide-and-conquer algorithm offering better time complexity for large datasets.
* **Quick Sort**: Another divide-and-conquer algorithm known for its fast average-case performance.

## Conclusion

Insertion Sort is a fundamental algorithm suitable for small datasets and educational purposes. Despite its quadratic time complexity, its simplicity and stability make it useful in particular scenarios.


## References

* Cormen, Thomas H., et al. *Introduction to Algorithms*. 3rd ed., MIT Press, 2009.
* Knuth, Donald E. *The Art of Computer Programming*, Volume 3: Sorting and Searching.
