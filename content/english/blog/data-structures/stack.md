---
title: "Stack Data Structure"
meta_title: "Stack"
description: "this is meta description"
date: 2025-06-02T17:21:34-06:00
image: "/images/posts/data-structures/stack.png"
categories: ["Data structures"]
author: "Daniel Pichardo"
tags: ["data-structure"]
draft: true
---

A **Stack** is a linear data structure that follows the **Last In, First Out (LIFO)** principle. This means that the last element added to the stack is the first one to be removed. It is analogous to a stack of plates where only the top plate can be removed at a time.

Stacks are widely used in programming due to their simplicity and efficiency in scenarios such as function call management, expression evaluation, and backtracking algorithms.

## Operations and Time Complexities

The table below summarizes the primary operations on a stack with their respective time complexities in Big \(\mathcal{O}\) notation:

| Operation | Time Complexity               | Description                                 |
| --------- | ----------------------------- | ------------------------------------------- |
| Push      | \(\mathcal{O}(1)\)            | Adds an element to the top of the stack     |
| Pop       | \(\mathcal{O}(1)\)            | Removes the top element from the stack      |
| Peek/Top  | \(\mathcal{O}(1)\)            | Returns the top element without removing it |
| isEmpty   | \(\mathcal{O}(1)\)            | Checks if the stack is empty                |

## Pseudo Code

### Push Operation

```plaintext
function push(stack, item):
    stack.append(item)
```

### Pop Operation

```plaintext
function pop(stack):
    if stack is not empty:
        return stack.pop()
    else:
        return error "Stack Underflow"
```

### Peek Operation

```plaintext
function peek(stack):
    if stack is not empty:
        return stack[-1]
    else:
        return error "Stack is empty"
```

## Implementation Examples

### Java

```java
import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        System.out.println("Top element: " + stack.peek());
        System.out.println("Popped element: " + stack.pop());
        System.out.println("Is stack empty? " + stack.isEmpty());
    }
}
```

### Python

```python
stack = []

# Push
stack.append(1)
stack.append(2)
stack.append(3)

# Peek
print("Top element:", stack[-1])

# Pop
print("Popped element:", stack.pop())

# Check empty
print("Is stack empty?", len(stack) == 0)
```

### JavaScript

```javascript
let stack = [];

// Push
stack.push(1);
stack.push(2);
stack.push(3);

// Peek
console.log("Top element:", stack[stack.length - 1]);

// Pop
console.log("Popped element:", stack.pop());

// Check empty
console.log("Is stack empty?", stack.length === 0);
```

## Algorithms That Use Stacks

* **Depth-First Search (DFS)**
* **Backtracking algorithms** (e.g., maze solving, Sudoku)
* **Function call stack in recursion**
* **Expression evaluation and conversion** (infix to postfix)
* **Undo features in applications**

## Limitations of the Data Structure

* Limited access: only the top element is accessible
* Not suitable for random access of elements
* Stack overflow can occur if memory is exhausted (especially in recursive calls)

## Scientific References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2. Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
3. Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2014). *Data Structures and Algorithms in Python*. Wiley.
4. Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms*. Addison-Wesley.
