---
title: "Trie Data Structure"
meta_title: "Trie"
description: "this is meta description"
date: 2025-05-31T14:33:36-06:00
image: "/images/posts/data-structures/trie-data-structure.png"
categories: ["Data structures"]
author: "Daniel Pichardo"
tags: ["data-structure"]
draft: false
---

A **Trie** (pronounced as "try"), also known as a *prefix tree* or *digital tree*, is a type of search tree used to store associative data structures, typically strings. Tries are especially useful for solving problems involving dynamic sets of strings, such as dictionary management, autocomplete systems, and IP routing.

Each node in a Trie represents a single character of a string. Strings are stored in a top-down manner, with common prefixes shared among nodes. Unlike hash tables, Tries allow efficient searching with prefix matching.

## Trie Operations

The core operations of a Trie include:

* **Insertion:** Add a word to the Trie.
* **Search:** Check if a word exists in the Trie.
* **StartsWith:** Check if there exists any word that starts with a given prefix.

### Time and Space Complexities


| Operation  | Time Complexity  | Space Complexity  |
| ---------- | ---------------- | ----------------- |
| Insert     | \(\mathcal{O}(L)\) | \(\mathcal{O}(AL)\) |
| Search     | \(\mathcal{O}(L)\) | \(\mathcal{O}(1)\)  |
| StartsWith | \(\mathcal{O}(L)\) | \(\mathcal{O}(1)\)  |

Where:

* \(L\) is the length of the string
* \(A\) is the alphabet size

## Pseudocode

```plaintext
function insert(word):
    node = root
    for char in word:
        if char not in node.children:
            node.children[char] = new TrieNode()
        node = node.children[char]
    node.isEndOfWord = true

function search(word):
    node = root
    for char in word:
        if char not in node.children:
            return false
        node = node.children[char]
    return node.isEndOfWord

function startsWith(prefix):
    node = root
    for char in prefix:
        if char not in node.children:
            return false
        node = node.children[char]
    return true
```

## Implementations

### Python

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

### Java

```java
class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEndOfWord = false;
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (node.children[index] == null)
                node.children[index] = new TrieNode();
            node = node.children[index];
        }
        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (node.children[index] == null)
                return false;
            node = node.children[index];
        }
        return node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char ch : prefix.toCharArray()) {
            int index = ch - 'a';
            if (node.children[index] == null)
                return false;
            node = node.children[index];
        }
        return true;
    }
}
```

### JavaScript

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }
}
```

## Algorithms That Use Trie

* **Autocomplete and Autocorrect Systems**
* **Spell Checkers**
* **IP Routing (Longest Prefix Matching)**
* **T9 Predictive Text Input**
* **DNA Sequence Matching**
* **Word Games and Puzzle Solvers**

## Limitations

* **High Memory Usage:** Each node stores multiple references, making Tries memory-intensive.
* **Alphabet Dependence:** Performance can degrade with large alphabets (e.g., Unicode).
* **Overhead for Short Keys:** Not efficient for datasets with short keys or a small number of entries.

## Scientific References

1. Fredkin, E. (1960). Trie Memory. *Communications of the ACM*, 3(9), 490-499.
2. Morrison, D. R. (1968). PATRICIA -- Practical Algorithm To Retrieve Information Coded in Alphanumeric. *Journal of the ACM*, 15(4), 514-534.
3. Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
4. Knuth, D. E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*. Addison-Wesley.
