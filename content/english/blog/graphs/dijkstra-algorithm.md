---
title: "Shortest Path Using Dijkstra's Algorithm"
meta_title: "Dijkstra's Algorithm"
description: "Dijkstra's Algorithm"
date: 2024-05-12T16:19:16-06:00
image: "/images/posts/graphs/dijkstra.png"
categories: ["Graphs"]
author: "Daniel Pichardo"
tags: ["shortest-path"]
draft: false
---

Finding the shortest path in a graph is a foundational problem in computer science and operations research. It is crucial in network routing, geographical mapping, artificial intelligence, and logistics. One of the most well-known and efficient algorithms for finding the shortest path from a source node to all other nodes in a graph with non-negative edge weights is **Dijkstra's Algorithm**.

## Dijkstra's Algorithm: Step-by-Step Explanation

Dijkstra's algorithm solves the single-source shortest path problem for a graph with non-negative edge weights.

### Step-by-Step Procedure

1. **Initialization**

   * Assign a tentative distance value to every node: set it to zero for the initial node and to infinity for all others.
   * Mark all nodes unvisited. Set the initial node as the current node.

2. **Visit the Current Node**

   * For the current node, consider all its unvisited neighbors and calculate their tentative distances through the current node. Compare the newly calculated tentative distance with the current assigned value and assign the smaller one.

3. **Mark the Current Node as Visited**

   * Once all neighbors have been considered, mark the current node as visited. A visited node will not be checked again.

4. **Select the Next Current Node**

   * Select the unvisited node that is marked with the smallest tentative distance and repeat steps 2–4 until all nodes are visited or the smallest tentative distance among the unvisited nodes is infinity.


Consider the following weighted graph:

```text
       (A)
      /   \
    1/     \4
    /       \
  (B)-------(C)
    \       /
    2\     /5
      \   /
       (D)
```

Using Dijkstra's algorithm starting from node A:

* Initial distances: A=0, B=∞, C=∞, D=∞
* Visit A, update B=1, C=4
* Visit B, update D=3
* Visit D, update C=4 (no change)
* Visit C (done)

Final shortest paths:

* A to B: 1
* A to D: 3
* A to C: 4

## Time Complexity

The time complexity of Dijkstra's algorithm depends on the data structures used:

* Using a **min-priority queue** with a **binary heap**:

  * Time complexity: \(\mathcal{O}((V + E) \log V)\)

* Using a **simple array**:

  * Time complexity: \(\mathcal{O}(V^2)\)

Where:

* \(V\) is the number of vertices
* \(E\) is the number of edges

## Pseudo Code

```text
function Dijkstra(Graph, source):
    dist[source] := 0
    for each vertex v in Graph:
        if v ≠ source:
            dist[v] := ∞
        add v to priority queue Q

    while Q is not empty:
        u := vertex in Q with smallest dist[u]
        remove u from Q

        for each neighbor v of u:
            alt := dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] := alt
                update v in Q

    return dist
```

## Example Implementations

{{< tabs >}}
{{< tab "Python" >}}
### Python

```python
import heapq

def dijkstra(graph, start):
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        current_distance, current_vertex = heapq.heappop(pq)

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances
```

{{< /tab >}}
{{< tab "Java" >}}
### Java

```java
import java.util.*;

class Dijkstra {
    static class Node implements Comparable<Node> {
        int vertex, cost;
        Node(int v, int c) { vertex = v; cost = c; }
        public int compareTo(Node other) { return this.cost - other.cost; }
    }

    public static int[] dijkstra(List<List<Node>> graph, int start) {
        int[] dist = new int[graph.size()];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(start, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();

            for (Node neighbor : graph.get(current.vertex)) {
                int newDist = dist[current.vertex] + neighbor.cost;
                if (newDist < dist[neighbor.vertex]) {
                    dist[neighbor.vertex] = newDist;
                    pq.add(new Node(neighbor.vertex, newDist));
                }
            }
        }
        return dist;
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript

```javascript
function dijkstra(graph, start) {
    const distances = {};
    const pq = new MinPriorityQueue({ priority: x => x[1] });

    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    pq.enqueue([start, 0]);

    while (!pq.isEmpty()) {
        const [currentVertex, currentDistance] = pq.dequeue().element;

        for (let neighbor in graph[currentVertex]) {
            let distance = currentDistance + graph[currentVertex][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.enqueue([neighbor, distance]);
            }
        }
    }

    return distances;
}
```
{{< /tab >}}

{{< /tabs >}}

## Related Algorithms

* **Bellman-Ford Algorithm**: Handles graphs with negative edge weights.
* **A\* Algorithm**: Uses heuristics for faster shortest path finding.
* **Floyd-Warshall Algorithm**: Finds shortest paths between all pairs of vertices.
* **Johnson's Algorithm**: All-pairs shortest path for sparse graphs with negative weights.

## Limitations

* Cannot handle **negative edge weights**.
* Less efficient for **dense graphs** compared to other algorithms.
* Does not scale well for extremely large graphs without optimization.

## Scientific References

* Dijkstra, E. W. (1959). A note on two problems in connexion with graphs. *Numerische Mathematik*, 1, 269–271.
* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
* Ahuja, R. K., Magnanti, T. L., & Orlin, J. B. (1993). *Network Flows: Theory, Algorithms, and Applications*. Prentice Hall.
