---
title: "Git Troubleshooting Guide"
meta_title: "Git Troubleshooting Guide"
description: "this is meta description"
date: 2024-06-08T00:10:09-06:00
image: "/images/posts/guidelines/image.jpeg"
categories: ["Guidelines"]
author: "Daniel Pichardo"
tags: ["troubleshooting", "git"]
draft: false
---

## Introduction

A detailed guide to resolve common Git issues, including merge conflicts, rebase errors, deleting commits, and more.

---

## 🔄 1. Merge Conflicts

### ❌ Problem
You try to merge two branches and get a conflict.

### 💡 Solution
```bash
git merge feature-branch
# Conflict occurs

# Step 1: Open and resolve conflicts in the files manually
# Step 2: Mark the file as resolved
git add conflicted-file.js

# Step 3: Complete the merge
git commit
```

### ✅ Tip
Use a visual tool to help:
```bash
git mergetool
```

---

## 🌿 2. Rebase Issues

### ❌ Problem
You run `git rebase` and hit a conflict or want to abort the rebase.

### 💡 Solution

#### To continue after fixing a conflict:
```bash
# Resolve conflicts manually
git add conflicted-file.js
git rebase --continue
```

#### To skip a commit:
```bash
git rebase --skip
```

#### To abort the rebase:
```bash
git rebase --abort
```

---

## ⏪ 3. Undo Local Commits

### 3.1. Undo Last Commit (keep changes)
```bash
git reset --soft HEAD~1
```

### 3.2. Undo Last Commit (discard changes)
```bash
git reset --hard HEAD~1
```

### 3.3. Undo Specific Commit (by hash)
```bash
git revert <commit-hash>
```

---

## 🗑️ 4. Delete Commits from History

### ❌ Problem
Need to remove sensitive or incorrect commits.

### 💡 Solution

#### Rewriting history (Dangerous!):
```bash
git rebase -i HEAD~n  # where n is number of commits back
# Change 'pick' to 'drop' for commits to delete
```

#### Delete commit by hash:
```bash
git rebase -i <base-commit-hash>
```

---

## 🗃️ 5. Stash and Restore Changes

### 5.1. Stash Uncommitted Work
```bash
git stash
```

### 5.2. Apply Stash
```bash
git stash apply
```

### 5.3. Drop or Clear Stashes
```bash
git stash drop
git stash clear
```

---

## 🧹 6. Clean Working Directory

### ❌ Problem
Too many untracked files.

### 💡 Solution
```bash
# Preview
git clean -n

# Delete untracked files
git clean -f

# Delete untracked directories too
git clean -fd
```

---

## 🧭 7. Detached HEAD State

### ❌ Problem
You're in a detached HEAD state.

### 💡 Solution
```bash
# Create a branch from current state
git checkout -b new-branch-name
```

---

## 🚫 8. Accidentally Deleted a Branch

### ❌ Problem
You deleted a branch and want to recover it.

### 💡 Solution
```bash
# Find commit hash
git reflog

# Recover the branch
git checkout -b recovered-branch <commit-hash>
```

---

## 📌 9. Fix Mistaken Push

### ❌ Problem
You pushed something wrong to the remote.

### 💡 Solution

#### Force push to fix
```bash
git push origin HEAD --force
```

> ⚠️ Use with caution! Only when you're sure this won't affect others.

---

## 🔍 10. Inspect Logs and History

### 10.1. View Commit History
```bash
git log --oneline
```

### 10.2. Who Changed What Line?
```bash
git blame file.js
```

### 10.3. Search Git History
```bash
git log -S'someFunction'
```

---

## 🧼 11. Remove a File from Git but Keep It Locally

```bash
git rm --cached filename
```

---

## 🚀 12. Misc Recovery Tips

### Recover Deleted Files
```bash
git checkout HEAD -- path/to/file
```

### Recover From Reflog
```bash
git reflog
git checkout <old-commit>
```

---

## 📚 Additional Tips

| Command | Description |
|--------|-------------|
| `git status` | See what’s going on |
| `git reflog` | View recent HEAD positions |
| `git bisect` | Find bugs through binary search |
| `git fsck` | Check repository for errors |

---

## 🧠 Pro Tips

- Use aliases for frequent commands:
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.cm commit
```

- Never force push to shared branches like `main` or `develop` without team consensus.

---

> This guide is for emergency troubleshooting and recovery. Always backup your work and communicate with your team when handling shared repositories.