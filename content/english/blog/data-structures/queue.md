---
title: "Queue Data Structure"
meta_title: "Queue"
description: "this is meta description"
date: 2025-06-02T17:27:55-06:00
image: "/images/posts/data-structures/queue.png"
categories: ["Data structures"]
author: "Daniel Pichardo"
tags: ["data-structure"]
draft: true
---


A **Queue** is a linear data structure that follows the **First In, First Out (FIFO)** principle. This means that the first element added to the queue will be the first one to be removed. It is analogous to a line of people waiting for a service: the person who arrives first gets served first.

Queues are widely used in various computing applications, including process scheduling, buffering, and breadth-first search algorithms.

## Operations and Time Complexities

The table below summarizes the primary operations on a queue and their respective time complexities in Big $\mathcal{O}$ notation:

| Operation  | Time Complexity               | Description                                   |
| ---------- | ----------------------------- | --------------------------------------------- |
| Enqueue    | \(\mathcal{O}(1)\)            | Adds an element to the rear of the queue      |
| Dequeue    | \(\mathcal{O}(1)\)            | Removes an element from the front             |
| Peek/Front | \(\mathcal{O}(1)\)            | Returns the front element without removing it |
| isEmpty    | \(\mathcal{O}(1)\)            | Checks if the queue is empty                  |

## Pseudo Code

### Enqueue Operation

```plaintext
function enqueue(queue, item):
    queue.append(item)
```

### Dequeue Operation

```plaintext
function dequeue(queue):
    if queue is not empty:
        return queue.pop(0)
    else:
        return error "Queue Underflow"
```

### Peek Operation

```plaintext
function peek(queue):
    if queue is not empty:
        return queue[0]
    else:
        return error "Queue is empty"
```

## Implementation Examples

### Java

```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();

        queue.offer(1);
        queue.offer(2);
        queue.offer(3);

        System.out.println("Front element: " + queue.peek());
        System.out.println("Dequeued element: " + queue.poll());
        System.out.println("Is queue empty? " + queue.isEmpty());
    }
}
```

### Python

```python
from collections import deque

queue = deque()

# Enqueue
queue.append(1)
queue.append(2)
queue.append(3)

# Peek
print("Front element:", queue[0])

# Dequeue
print("Dequeued element:", queue.popleft())

# Check empty
print("Is queue empty?", len(queue) == 0)
```

### JavaScript

```javascript
let queue = [];

// Enqueue
queue.push(1);
queue.push(2);
queue.push(3);

// Peek
console.log("Front element:", queue[0]);

// Dequeue
console.log("Dequeued element:", queue.shift());

// Check empty
console.log("Is queue empty?", queue.length === 0);
```

## Algorithms That Use Queues

* **Breadth-First Search (BFS)**
* **Level-order traversal in trees**
* **CPU and disk scheduling algorithms**
* **Handling requests in web servers**
* **Print queue management**

## Limitations of the Data Structure

* Random access is not allowed
* Inefficient implementation using arrays due to shifting elements (unless circular or deque is used)
* Fixed size in static implementations

## Scientific References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2. Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
3. Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2014). *Data Structures and Algorithms in Python*. Wiley.
4. Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms*. Addison-Wesley.
