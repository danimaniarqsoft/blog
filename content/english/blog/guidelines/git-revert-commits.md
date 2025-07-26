---
title: "How to Revert Commits in Git"
meta_title: "How to Revert Commits in Git"
description: "this is meta description"
date: 2024-06-08T00:34:01-06:00
image: "/images/posts/guidelines/image.jpeg"
categories: ["Guidelines"]
author: "Daniel Pichardo"
tags: ["git"]
draft: false
---

## Introduction

In this guide I explain how to revert commits in Git with differents methods.

---

## 🧠 First: Understand Your Goal

| Goal | Method |
|------|--------|
| Undo commit but keep changes | `git reset --soft` |
| Undo commit and discard changes | `git reset --hard` |
| Undo commit and keep changes staged | `git reset --mixed` (default) |
| Create a new commit that reverses previous one | `git revert` |
| Remove commit from history permanently | `git rebase -i` or `git reset` (for local branches only) |

---

## 1. ✅ Safe: `git revert` (Public history)

Creates a new commit that undoes a specific commit without altering history.

### Example
```bash
git log --oneline
# e.g., 4a5e6d7 Fix login button alignment

git revert 4a5e6d7
```

---

## 2. 🧼 Clean Up: `git reset` (Local history rewrite)

Use only on local branches.

### 2.1. `--soft`: Undo commit, keep changes in staging
```bash
git reset --soft HEAD~1
```

### 2.2. `--mixed` (default): Undo commit, keep changes unstaged
```bash
git reset HEAD~1
```

### 2.3. `--hard`: Undo commit and discard all changes
```bash
git reset --hard HEAD~1
```

---

## 3. 🔍 Revert Specific Commit in History

```bash
git log --oneline
git revert abc1234
```

---

## 4. ⏪ Revert Multiple Commits

### A. Revert a range:
```bash
git revert HEAD~3..HEAD
```

### B. Revert them individually:
```bash
git revert <hash1> <hash2> <hash3>
```

---

## 5. 🧨 Danger Zone: `git rebase -i` to delete commits

Only for local, unpushed commits.

```bash
git rebase -i HEAD~3
```

Change `pick` to `drop` to delete commits.

---

## 6. 🧭 Use `git reflog` for Recovery

```bash
git reflog
git checkout <hash>
# or to hard reset:
git reset --hard <hash>
```

---

## 🔄 Summary Cheat Sheet

| Command | Effect |
|--------|--------|
| `git revert <hash>` | Undo commit with a new inverse commit |
| `git reset --soft HEAD~1` | Undo last commit, keep staged changes |
| `git reset --mixed HEAD~1` | Undo last commit, keep changes |
| `git reset --hard HEAD~1` | Undo last commit, discard changes |
| `git rebase -i HEAD~n` | Modify or remove older commits |
| `git reflog` | Recover lost commits or HEADs |

---

> Use these tools wisely depending on whether you're dealing with local or shared history.