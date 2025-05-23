---
title: "Bubble Sort Algorithm"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-23T10:23:54-06:00
image: "/images/image-placeholder.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","javascript","sorting-algorithms"]
draft: false
---

Bubble Sort is one of the simplest sorting algorithms often taught as an introductory algorithm due to its intuitive approach. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until the list is sorted.

While not suitable for large datasets due to its inefficiency, Bubble Sort remains a useful educational tool for learning about sorting concepts, algorithmic thinking, and complexity analysis.

## Step-by-Step Explanation

1. **Start at the beginning of the array.**
2. **Compare the first two elements.**
3. **If the first is greater than the second, swap them.**
4. **Move to the next pair of elements, and repeat the comparison and swap if necessary.**
5. **Continue this process to the end of the array.**
6. **Repeat the entire process for all elements except the last one (which is now correctly placed).**
7. **Repeat until no swaps are needed, indicating the array is sorted.**

This repetitive "bubbling" of the largest unsorted element to the end of the list gives the algorithm its name.

## Pseudo Code

```text
procedure bubbleSort(A : list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped = true
            end if
        end for
        n = n - 1
    until not swapped
end procedure
```

## Time and Space Complexity

| Case          | Time Complexity |
|---------------|-----------------|
| Best Case     | \(\mathcal{O}(n)\)            |
| Average Case  | \(\mathcal{O}(n^2)\)           |
| Worst Case    | \(\mathcal{O}(n^2)\)           |

- **Space Complexity:** O(1) – In-place sorting.

## Example Implementations

### Python

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

### Java

```java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}
```

### JavaScript

```javascript
function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return arr;
}
```

## Related Algorithms

- **Insertion Sort**: Also simple and efficient for small data sets.
- **Selection Sort**: Similar in simplicity, but different in approach.
- **Merge Sort**: A more complex algorithm offering \(\mathcal{O}(n \log n)\) time complexity.
- **Quick Sort**: Generally faster with average time complexity of \(\mathcal{O}(n \log n)\).

## Limitations

- Inefficient for large datasets due to \(\mathcal{O}(n^2)\) time complexity.
- More practical algorithms like Merge Sort or Quick Sort are recommended for real-world applications.
- Even improved variants like Cocktail Shaker Sort have limited use cases.

## References

- Cormen, Thomas H., et al. *Introduction to Algorithms*. MIT Press, 3rd Edition.
- Knuth, Donald E. *The Art of Computer Programming, Volume 3: Sorting and Searching*. Addison-Wesley.
- Wikipedia contributors. "Bubble sort." *Wikipedia, The Free Encyclopedia*. 