---
title: "Hash Tables: A Comprehensive Overview"
meta_title: "Hash Tables"
description: "this is meta description"
date: 2025-06-02T13:05:33-06:00
image: "/images/posts/data-structures/hash-table-data-structure.png"
categories: ["Data structures"]
author: "Daniel Pichardo"
tags: ["data-structure"]
draft: false
---

A **hash table** (also known as a **hash map**) is a data structure that provides an efficient way of storing and retrieving data using a key-value pair model. The efficiency of hash tables lies in their ability to provide constant time complexity \(\mathcal{O}(1)\), on average, for insertion, deletion, and lookup operations.

The core idea behind hash tables is the use of a **hash function**, which computes an index (also called a hash code) from the key. This index determines where the key-value pair should be stored in an internal array.


## Concept of Hash Function and Collisions

### Hash Function

A **hash function** transforms a key (e.g., a string or number) into an integer known as a hash code. This code is then mapped to an index in the underlying array using modular arithmetic. A well-designed hash function distributes keys uniformly across the array to minimize collisions.

### Collisions

A **collision** occurs when two different keys produce the same array index. Collisions are handled using:

* **Chaining**: Each bucket contains a list or another data structure that stores all entries with the same hash.
* **Open Addressing**: When a collision occurs, a probe sequence (e.g., linear probing, quadratic probing) finds another empty slot.


## Operations and Complexities

The following table summarizes the primary operations of hash tables and their associated time complexities in Big $\mathcal{O}$ notation:

| Operation | Average Case \(\mathcal{O}\) | Worst Case \(\mathcal{O}\) | Description                               |
| --------- | -------------------------- | ------------------------ | ----------------------------------------- |
| Insert    | \(\mathcal{O}(1)\)           | \(\mathcal{O}(n)\)         | Adds a key-value pair                     |
| Search    | \(\mathcal{O}(1)\)           | \(\mathcal{O}(n)\)         | Finds a value by key                      |
| Delete    | \(\mathcal{O}(1)\)           | \(\mathcal{O}(n)\)         | Removes the key-value pair from the table |

Worst-case occurs due to collisions leading to a list of elements (e.g., in separate chaining). Good hash functions and resizing strategies mitigate this.

## Pseudo Code

### Insert Operation

```plaintext
function insert(hashTable, key, value):
    index = hashFunction(key) % size
    if hashTable[index] is empty:
        hashTable[index] = new LinkedList()
    hashTable[index].add((key, value))
```

### Search Operation

```plaintext
function search(hashTable, key):
    index = hashFunction(key) % size
    for each (k, v) in hashTable[index]:
        if k == key:
            return v
    return null
```

### Delete Operation

```plaintext
function delete(hashTable, key):
    index = hashFunction(key) % size
    for each (k, v) in hashTable[index]:
        if k == key:
            hashTable[index].remove((k, v))
            return
```

## Implementations

{{< tabs >}}
{{< tab "Python" >}}
### Python

```python
table_size = 10
hash_table = [[] for _ in range(table_size)]

def hash_function(key):
    return hash(key) % table_size

def insert(key, value):
    index = hash_function(key)
    for i, (k, v) in enumerate(hash_table[index]):
        if k == key:
            hash_table[index][i] = (key, value)
            return
    hash_table[index].append((key, value))

def search(key):
    index = hash_function(key)
    for (k, v) in hash_table[index]:
        if k == key:
            return v
    return None

def delete(key):
    index = hash_function(key)
    for i, (k, v) in enumerate(hash_table[index]):
        if k == key:
            del hash_table[index][i]
            return
```
{{< /tab >}}
{{< tab "Java" >}}
### Java

```java
import java.util.*;

class HashTable {
    private LinkedList<Entry>[] table;
    private int size = 10;

    public HashTable() {
        table = new LinkedList[size];
    }

    private int hash(String key) {
        return Math.abs(key.hashCode()) % size;
    }

    public void put(String key, String value) {
        int index = hash(key);
        if (table[index] == null) table[index] = new LinkedList<>();
        for (Entry e : table[index]) {
            if (e.key.equals(key)) {
                e.value = value;
                return;
            }
        }
        table[index].add(new Entry(key, value));
    }

    public String get(String key) {
        int index = hash(key);
        if (table[index] == null) return null;
        for (Entry e : table[index]) {
            if (e.key.equals(key)) return e.value;
        }
        return null;
    }

    private static class Entry {
        String key, value;
        Entry(String k, String v) { key = k; value = v; }
    }
}
```
{{< /tab >}}
{{< tab "JavaScript" >}}
### JavaScript

```javascript
class HashTable {
  constructor(size = 10) {
    this.table = new Array(size);
  }

  hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) this.table[index] = [];
    for (let pair of this.table[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let pair of bucket) {
        if (pair[0] === key) return pair[1];
      }
    }
    return undefined;
  }

  delete(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      this.table[index] = bucket.filter(pair => pair[0] !== key);
    }
  }
}
```
{{< /tab >}}

{{< /tabs >}}

## Algorithms That Use Hash Tables

* **Hashing** in data retrieval and lookup
* **Symbol tables** in compilers
* **Caching** mechanisms (e.g., LRU cache)
* **Sets and Maps** in programming languages (e.g., `HashSet`, `HashMap`)
* **Anagram detection**
* **Counting frequencies**
* **Memoization** in dynamic programming
* **Dictionaries** in natural language processing

## Limitations of Hash Tables

* Inefficiency in maintaining order
* Performance degradation due to poor hash functions (more collisions)
* Fixed size in static implementations
* Not suitable for range queries (like binary search trees)
* Requires good resizing strategy to maintain $\mathcal{O}(1)$ operations

## References

1. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
2. Weiss, M. A. (2014). *Data Structures and Algorithm Analysis in Java* (3rd ed.). Pearson.
3. Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2014). *Data Structures and Algorithms in Python*. Wiley.
4. Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*. Addison-Wesley.
