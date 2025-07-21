---
title: "Counting Sort Algorithm"
meta_title: "counting sort"
description: "this is meta description"
date: 2024-08-18T11:58:00-06:00
image: "/images/posts/algorithms/counting-sort.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","javascript","sorting-algorithms"]
draft: false
---

## Introduction

Counting Sort is a non-comparison-based sorting algorithm that operates with integer keys within a known, limited range. Unlike typical comparison sorts such as QuickSort or MergeSort, Counting Sort leverages the frequency of each element to achieve linear time sorting under suitable conditions. It is especially effective when the range of input values (k) is not significantly larger than the number of elements (n).

## Reference

This explanation is based on the authoritative text *"Introduction to Algorithms"* by Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein (often abbreviated as CLRS), along with insights from Donald Knuth's *"The Art of Computer Programming"*.

---

## Step-by-Step Explanation

1. **Determine Range**: Identify the maximum value `k` in the input array. This will determine the size of the auxiliary count array.
2. **Initialize Count Array**: Create an array `C` of size `k + 1` and initialize all elements to 0. This will store the frequency of each element.
3. **Count Occurrences**: Traverse the input array `A` and for each value `A[j]`, increment `C[A[j]]`.
4. **Compute Prefix Sums**: Modify the count array `C` such that each `C[i]` contains the number of elements less than or equal to `i`.
5. **Build Output Array**: Traverse the input array from the end and place each element `A[j]` into its sorted position in the output array `B`, using the count in `C` to find the correct index.
6. **Copy Output (if in-place is needed)**: Copy the sorted elements from `B` back to `A` if required.

---

## Pseudocode

```text
COUNTING-SORT(A, B, k)
1  let C[0..k] be a new array
2  for i = 0 to k
3      C[i] = 0
4  for j = 1 to length[A]
5      C[A[j]] = C[A[j]] + 1
6  for i = 1 to k
7      C[i] = C[i] + C[i - 1]
8  for j = length[A] downto 1
9      B[C[A[j]]] = A[j]
10     C[A[j]] = C[A[j]] - 1
```

---

## Time and Space Complexity

| Case    | Time Complexity |
| ------- | --------------- |
| Best    | \(\mathcal{O}(n + k)\)        |
| Average | \(\mathcal{O}(n + k)\)        |
| Worst   | \(\mathcal{O}(n + k)\)        |

**Space Complexity**: \(\mathcal{O}(k + n)\)

* **n**: number of elements in the input array
* **k**: range of the input (maximum value of input elements)

---

## Example Implementations

{{< tabs >}}
{{< tab "Python" >}}
### Python

```python
def counting_sort(arr):
    if not arr:
        return []

    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * len(arr)

    for num in arr:
        count[num] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    for num in reversed(arr):
        output[count[num] - 1] = num
        count[num] -= 1

    return output
```

{{< /tab >}}
{{< tab "Java" >}}
### Java

```java
public class CountingSort {
    public static void countingSort(int[] arr) {
        if (arr.length == 0) return;

        int max = Integer.MIN_VALUE;
        for (int num : arr) {
            if (num > max) max = num;
        }

        int[] count = new int[max + 1];
        for (int num : arr) {
            count[num]++;
        }

        for (int i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }

        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }

        System.arraycopy(output, 0, arr, 0, arr.length);
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript

```javascript
function countingSort(arr) {
    if (arr.length === 0) return [];

    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    const output = new Array(arr.length);

    for (let num of arr) {
        count[num]++;
    }

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    return output;
}
```

{{< /tab >}}

{{< /tabs >}}


---

## Related Algorithms

* **Radix Sort**: Uses Counting Sort as a subroutine to sort large integers digit by digit.
* **Bucket Sort**: Similar in spirit but distributes elements into buckets; good for uniformly distributed input.
* **Pigeonhole Sort**: Conceptually similar, based on categorizing items into "holes."

---

## Limitations

* Not suitable for large ranges where k >> n, due to high space usage.
* Only works on non-negative integers unless modified.

---

## Conclusion

Counting Sort is a powerful linear-time sorting algorithm under specific constraints. Its deterministic nature and stability make it a strong candidate in scenarios where input data characteristics align with its strengths.

---

**References**:

* Cormen, Thomas H., et al. *Introduction to Algorithms*. 3rd ed., MIT Press, 2009.
* Knuth, Donald E. *The Art of Computer Programming*, Volume 3: Sorting and Searching.
