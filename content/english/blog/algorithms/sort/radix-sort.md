---
title: "Radix Sort Algorithm: A Detailed Overview"
meta_title: "Radix Sort"
description: "this is meta description"
date: 2024-03-31T13:29:26-06:00
image: "/images/posts/algorithms/radix-sort.png"
categories: ["Algorithms"]
author: "Daniel Pichardo"
tags: ["java","python","javascript","sorting-algorithms"]
draft: false
---

## Introduction

Radix Sort is a non-comparative, integer sorting algorithm that sorts data with integer keys by grouping the keys by individual digits which share the same position and value. It processes each digit of the numbers, starting from the least significant digit (LSD) or most significant digit (MSD), depending on the implementation.

Unlike comparison-based algorithms like Quick Sort or Merge Sort, Radix Sort exploits the structure of numbers to achieve efficient sorting, particularly when the range of digits is limited.

## Step-by-Step Explanation of Radix Sort

### 1. Determine the Maximum Number

Find the maximum number in the list to determine the number of digits in the longest number.

### 2. Iterate Over Each Digit

Sort the numbers based on each digit, starting from the least significant digit (for LSD radix sort) or most significant digit (for MSD radix sort).

### 3. Use a Stable Sort (e.g., Counting Sort)

A stable sort is used for each digit to ensure that numbers with the same digit remain in the same relative order.

### Example Workflow (LSD)

1. Input array: \[170, 45, 75, 90, 802, 24, 2, 66]
2. Sort by 1s place: \[170, 90, 802, 2, 24, 45, 75, 66]
3. Sort by 10s place: \[802, 2, 24, 45, 66, 170, 75, 90]
4. Sort by 100s place: \[2, 24, 45, 66, 75, 90, 170, 802]

## Complexity Analysis

* **Time Complexity:**

  * Best: \(\mathcal{O}(n \cdot k)\)
  * Average: \(\mathcal{O}(n \cdot k)\)
  * Worst: \(\mathcal{O}(n \cdot k)\)
  * Where \(n\) is the number of elements and \(k\) is the number of digits in the maximum number.

* **Space Complexity:** \(\mathcal{O}(n + k)\)

## Pseudo Code

```plaintext
function radixSort(array)
    maxNumber = getMax(array)
    digitPlace = 1
    while maxNumber / digitPlace > 0
        countingSort(array, digitPlace)
        digitPlace *= 10

function countingSort(array, digitPlace)
    count[0..9] = {0}
    output = array of same length
    for number in array
        digit = (number / digitPlace) % 10
        count[digit] += 1
    for i = 1 to 9
        count[i] += count[i - 1]
    for i = len(array) - 1 to 0
        digit = (array[i] / digitPlace) % 10
        output[count[digit] - 1] = array[i]
        count[digit] -= 1
    copy output to array
```

## Implementations

{{< tabs >}}
{{< tab "Python" >}}
### Python

```python
def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in arr:
        index = i // exp
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort(arr, exp)
        exp *= 10
```

{{< /tab >}}
{{< tab "Java" >}}
### Java

```java
public class RadixSort {
    public static void radixSort(int[] arr) {
        int max = getMax(arr);
        for (int exp = 1; max / exp > 0; exp *= 10)
            countingSort(arr, exp);
    }

    private static int getMax(int[] arr) {
        int max = arr[0];
        for (int i : arr) if (i > max) max = i;
        return max;
    }

    private static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        for (int i : arr)
            count[(i / exp) % 10]++;

        for (int i = 1; i < 10; i++)
            count[i] += count[i - 1];

        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        for (int i = 0; i < n; i++)
            arr[i] = output[i];
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript

```javascript
function countingSort(arr, exp) {
    let output = new Array(arr.length).fill(0);
    let count = new Array(10).fill(0);

    arr.forEach(num => count[Math.floor(num / exp) % 10]++);
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
        let digit = Math.floor(arr[i] / exp) % 10;
        output[--count[digit]] = arr[i];
    }

    for (let i = 0; i < arr.length; i++)
        arr[i] = output[i];
}

function radixSort(arr) {
    let max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
        countingSort(arr, exp);
}
```
{{< /tab >}}

{{< /tabs >}}

## Related Algorithms

* **Counting Sort:** Used as a subroutine in Radix Sort.
* **Bucket Sort:** Groups elements into buckets; often compared to Radix Sort.
* **MSD Radix Sort:** Processes the most significant digit first; more complex.
* **Bitwise Radix Sort:** Variation for binary integers.

## Limitations

* Not suitable for floating-point numbers without modifications.
* Space complexity can be high due to use of auxiliary arrays.
* Only effective for data with bounded integer ranges.
* Not a comparison-based sort, thus less flexible for generic objects.

## Scientific References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2. Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*. Addison-Wesley.
3. Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.

