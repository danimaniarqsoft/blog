---
title: "Heap Sort Algorithm"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-18T12:19:20-06:00
image: "/images/posts/algorithms/heap-sort.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","javascript","sorting-algorithms"]
draft: false
---

Heap Sort is a comparison-based sorting technique based on a Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place it at the end. We repeat the same process for the remaining elements.

Heap Sort is not a stable sort, but it is an in-place algorithm with a time complexity of O(n log n), making it efficient for large datasets. It is well-covered in *"Introduction to Algorithms"* by Cormen et al. (CLRS).

---

## Step-by-Step Explanation

1. **Build a Max Heap** from the input data.
2. **Extract the maximum element** (the root of the heap) and place it at the end of the array.
3. **Reduce the size** of the heap by one and heapify the root element.
4. **Repeat** the above steps until the heap is reduced to one element.

---

## Pseudocode

```text
HEAPSORT(A)
1  BUILD-MAX-HEAP(A)
2  for i = length(A) downto 2
3      exchange A[1] with A[i]
4      heap-size = heap-size - 1
5      MAX-HEAPIFY(A, 1)

BUILD-MAX-HEAP(A)
1  heap-size = length(A)
2  for i = floor(length(A)/2) downto 1
3      MAX-HEAPIFY(A, i)

MAX-HEAPIFY(A, i)
1  l = LEFT(i)
2  r = RIGHT(i)
3  if l <= heap-size and A[l] > A[i]
4      largest = l
5  else largest = i
6  if r <= heap-size and A[r] > A[largest]
7      largest = r
8  if largest ≠ i
9      exchange A[i] with A[largest]
10     MAX-HEAPIFY(A, largest)
```

---

## Time and Space Complexity

| Case    | Time Complexity |
| ------- | --------------- |
| Best    | \(\mathcal{O}(n \log n)\)      |
| Average | \(\mathcal{O}(n \log n)\)      |
| Worst   | \(\mathcal{O}(n \log n)\)      |

**Space Complexity**: \(\mathcal{O}(1\)

Heap Sort is an in-place algorithm but not stable.

---

## Example Implementations

### Python

```python
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[largest] < arr[left]:
        largest = left

    if right < n and arr[largest] < arr[right]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
```

### Java

```java
public class HeapSort {
    public void sort(int arr[]) {
        int n = arr.length;

        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        for (int i = n - 1; i >= 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }

    void heapify(int arr[], int n, int i) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && arr[l] > arr[largest])
            largest = l;

        if (r < n && arr[r] > arr[largest])
            largest = r;

        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}
```

### JavaScript

```javascript
function heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return arr;
}
```

---

## Related Algorithms

* **Selection Sort**: Also repeatedly selects the maximum (or minimum) element.
* **Binary Heap**: The data structure underlying Heap Sort.
* **Heaps (Min/Max)**: Useful in priority queues.

---

## Limitations

* Not a stable sort (relative order of equal elements is not preserved).
* Performance can be slower than quicksort in practice due to more data movement.

---

## Conclusion

Heap Sort is an efficient, in-place, comparison-based sorting algorithm with a guaranteed time complexity of O(n log n). Though not stable, it is a useful algorithm when memory space is limited and predictability is required.

---

## References

* Cormen, Thomas H., et al. *Introduction to Algorithms*. 3rd ed., MIT Press, 2009.
* Knuth, Donald E. *The Art of Computer Programming*, Volume 3: Sorting and Searching.
* Sedgewick, Robert. *Algorithms in Java*, Parts 1-4.
