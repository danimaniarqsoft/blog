---
title: "Depth-First Search (DFS) Algorithm"
meta_title: "Depth-First Search (DFS)"
description: "Depth-First Search (DFS)"
date: 2025-02-10T23:32:02-06:00
image: "/images/posts/graphs/depth-first-search.png"
categories: ["Graphs"]
author: "Daniel Pichardo"
tags: ["depth-first-search", "graph-traversal"]
draft: false
---

Depth-First Search (DFS) is a classic algorithm used to explore nodes and edges of a graph. It proceeds by exploring as far along a branch as possible before backtracking, which contrasts with Breadth-First Search (BFS) that explores neighbors level by level. DFS can be implemented using either recursion or an explicit stack and is a fundamental tool in fields such as artificial intelligence, compiler design, and topological sorting.

## DFS Algorithm Step by Step

1. **Initialization**:

   * Use a stack (or recursion) to keep track of the nodes.
   * Maintain a visited set or array to record visited nodes.

2. **Traversal**:

   * Start from the root or any arbitrary node.
   * Push it onto the stack and mark it as visited.
   * While the stack is not empty:

     * Pop a node from the top.
     * Process the current node.
     * Push all unvisited adjacent nodes onto the stack and mark them as visited.

3. **Termination**:

   * The traversal ends when all reachable nodes are visited and the stack is empty.

## Pseudocode

```text
DFS(Graph, start_node):
    create a stack S
    create a set visited
    push start_node onto S

    while S is not empty:
        current = S.pop()
        if current not in visited:
            process(current)
            visited.add(current)

            for each neighbor in Graph.adjacent(current):
                if neighbor not in visited:
                    S.push(neighbor)
```

*Recursive Version:*

```text
DFS(Graph, node, visited):
    if node not in visited:
        process(node)
        visited.add(node)
        for each neighbor in Graph.adjacent(node):
            DFS(Graph, neighbor, visited)
```

## Time and Space Complexity

Let \(V\) be the number of vertices and \(E\) be the number of edges.

* **Time Complexity**: \(\mathcal{O}(V + E)\) – each vertex and edge is visited once.
* **Space Complexity**: \(\mathcal{O}(V)\) for the visited set and recursion stack (in the worst case).

## DFS Example Implementations

{{< tabs >}}
{{< tab "Python" >}}
### Python (Recursive)

```python
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    if node not in visited:
        print(node)
        visited.add(node)
        for neighbor in graph[node]:
            dfs(graph, neighbor, visited)
```

{{< /tab >}}
{{< tab "Java" >}}
### Java (Iterative)

```java
import java.util.*;

public class DFS {
    public static void dfs(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        Stack<String> stack = new Stack<>();
        stack.push(start);

        while (!stack.isEmpty()) {
            String vertex = stack.pop();
            if (!visited.contains(vertex)) {
                System.out.println(vertex);
                visited.add(vertex);

                for (String neighbor : graph.get(vertex)) {
                    if (!visited.contains(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }
}
```

{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript (Recursive)

```javascript
function dfs(graph, node, visited = new Set()) {
    if (!visited.has(node)) {
        console.log(node);
        visited.add(node);

        for (let neighbor of graph[node]) {
            dfs(graph, neighbor, visited);
        }
    }
}
```
{{< /tab >}}

{{< /tabs >}}

## Related Algorithms

* **Breadth-First Search (BFS)**: Explores neighbors level by level rather than deep-first.
* **Topological Sort**: Uses DFS to order nodes in a directed acyclic graph.
* **Tarjan’s Algorithm**: For finding strongly connected components.
* **Kosaraju’s Algorithm**: Another method for strongly connected components based on DFS.

## Limitations

* DFS may get trapped in cycles unless visited nodes are tracked.
* Not guaranteed to find the shortest path in unweighted graphs.
* Deep recursion can lead to stack overflow for very large graphs.

## Scientific References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2. Aho, A. V., Hopcroft, J. E., & Ullman, J. D. (1983). *Data Structures and Algorithms*. Addison-Wesley.
3. Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley.
4. Knuth, D. E. (1997). *The Art of Computer Programming, Volume 1: Fundamental Algorithms* (3rd ed.). Addison-Wesley.
