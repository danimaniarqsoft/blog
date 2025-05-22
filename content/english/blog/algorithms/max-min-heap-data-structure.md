---
title: "Max Heap and Min Heap Algorithms"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-20T04:19:10-06:00
image: "/images/posts/algorithms/max-min-heap-data-structure.png"
categories: ["Data structures"]
author: "Daniel Pichardo"
tags: ["max-heap", "min-heap"]
draft: false
---

Heaps are specialized tree-based data structures that satisfy the *heap property*. In a **max heap**, the parent node is always greater than or equal to its children, while in a **min heap**, the parent is always less than or equal to its children. Heaps are commonly used to implement **priority queues** and **heap sort**.

Heaps are usually implemented as **binary heaps** using arrays for efficiency. The root element is stored at index 0, and for any element at index \(i\) , its children are at indices \(2i +1 \) and \(2i + 2 \), and its parent is at index \( \frac{(i - 1)}{2} \).


## Heap Algorithms and Operations

### 1. Insertion

**Algorithm:**

* Insert the element at the end of the array.
* Bubble up (heapify up) to restore the heap property.

**Time Complexity:** \(\mathcal{O}(\log n)\)

### 2. Extract Max / Min

**Algorithm:**

* Remove the root.
* Move the last element to the root.
* Bubble down (heapify down) to restore the heap property.

**Time Complexity:** \(\mathcal{O}(\log n)\)

### 3. Build a Max or Min Heap

**Algorithm:**

* Transform an unordered array into a heap.
* Start from the last non-leaf node and heapify each node downwards.

**Time Complexity:** \(\mathcal{O}(n)\)

### 4. Heapify

**Heapify** is an operation used to maintain the **max-heap property** in a binary heap. In a **max heap**, every parent node must be **greater than or equal to** its children.

**Algorithm:**

* Transform an unordered array into a heap.
* Start from the last non-leaf node and heapify each node downwards.


Given an array `A` and an index `i`, the goal is to ensure that the subtree rooted at `i` becomes a max heap.

1. Let \(l = 2i + 1\)  → left child index
2. Let \(r = 2i + 2\)  → right child index
3. Identify the largest among \(A[i]\), \(A[l]\), and \(A[r]\)
4. If \(A[i]\) is not the largest:
   - Swap \(A[i]\) with the largest child
   - Recursively call `MAX-HEAPIFY(A, largest)`

**Time Complexity:** \(\mathcal{O}(\log n)\)

### Pseudocode

```text
MAX-HEAPIFY(A, i):
    l = LEFT(i)
    r = RIGHT(i)
    largest = i
    if l < A.length and A[l] > A[i]:
        largest = l
    if r < A.length and A[r] > A[largest]:
        largest = r
    if largest != i:
        swap A[i] with A[largest]
        MAX-HEAPIFY(A, largest)

BUILD-MAX-HEAP(A):
    for i = floor(A.length / 2) - 1 downto 0:
        MAX-HEAPIFY(A, i)
```

## Example Implementations

### Java

```java
import java.util.PriorityQueue;

public class MinHeap {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(10);
        minHeap.add(5);
        minHeap.add(20);

        while (!minHeap.isEmpty()) {
            System.out.println(minHeap.poll());
        }
    }
}
```

### Python

```python
import heapq

min_heap = []
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 20)

while min_heap:
    print(heapq.heappop(min_heap))
```

### JavaScript

```javascript
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        return min;
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;
            if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
```

## Related Algorithms

* **Heap Sort**: Uses a max heap to sort an array in \(\mathcal{O}(n\log n)\) time.
* **Priority Queue**: Abstract data type often implemented using a heap.
* **Dijkstra's Algorithm**: Uses a min heap (priority queue) to find shortest paths.

## Limitations

* Heaps do not support efficient searching  \(\mathcal{O}(n)\).
* Heaps are not suitable for ordered traversal.
* Not optimal for dynamic operations like deletions of arbitrary elements.

## References

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). The MIT Press.
* Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
* Python `heapq` module: [https://docs.python.org/3/library/heapq.html](https://docs.python.org/3/library/heapq.html)
* Java `PriorityQueue`: [https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html](https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html)
