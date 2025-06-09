---
title: "Git Guidelines with Gitflow & Trunk-Based Development"
meta_title: "Git Guidelines"
description: "this is meta description"
date: 2024-06-08T00:02:44-06:00
image: "/images/posts/guidelines/image.png"
categories: ["Guidelines"]
author: "Daniel Pichardo"
tags: ["git"]
draft: false
---

A detailed guide Git issues, including Git Flow and Trunk-Based development

---

## 🔧 1. Core Git Usage Guidelines

### 1.1. Clone a Repository
```bash
git clone https://github.com/your-org/your-repo.git
```

### 1.2. Configure Git (global)
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 1.3. Create a New Branch
```bash
git checkout -b feature/your-feature-name
```

### 1.4. Check Current Status
```bash
git status
```

### 1.5. Stage & Commit
```bash
git add .
git commit -m "Add login API"
```

### 1.6. Push Changes
```bash
git push origin feature/your-feature-name
```

### 1.7. Pull Latest Changes
```bash
git pull origin main
```

### 1.8. Merge Branches
```bash
git checkout main
git merge feature/your-feature-name
```

### 1.9. Resolve Merge Conflicts
```bash
# Edit the conflicting files, then:
git add conflicted-file.js
git commit
```

---

## 🔀 2. Gitflow Workflow

### Gitflow Branches
- `main`: Production-ready
- `develop`: Integration of features before release
- `feature/*`: New features
- `release/*`: Pre-release stabilization
- `hotfix/*`: Emergency production fixes

### 2.1. Start a Feature
```bash
git checkout develop
git checkout -b feature/my-new-feature
```

### 2.2. Finish a Feature
```bash
git checkout develop
git merge feature/my-new-feature
git branch -d feature/my-new-feature
```

### 2.3. Start a Release
```bash
git checkout develop
git checkout -b release/1.2.0
```

### 2.4. Finish a Release
```bash
git checkout main
git merge release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
git checkout develop
git merge release/1.2.0
git branch -d release/1.2.0
```

### 2.5. Start a Hotfix
```bash
git checkout main
git checkout -b hotfix/1.2.1
```

### 2.6. Finish a Hotfix
```bash
git checkout main
git merge hotfix/1.2.1
git tag -a v1.2.1 -m "Hotfix 1.2.1"
git checkout develop
git merge hotfix/1.2.1
git branch -d hotfix/1.2.1
```

---

## 🌳 3. Trunk-Based Development

### 3.1. Create a Short-Lived Feature Branch
```bash
git checkout main
git pull
git checkout -b feat/login-button
```

### 3.2. Make Changes & Push
```bash
git add .
git commit -m "Add login button to header"
git push origin feat/login-button
```

### 3.3. Open a Pull Request (PR) and Merge Quickly
```bash
git checkout main
git pull
git merge --squash feat/login-button
git commit -m "feat: Add login button"
git push origin main
git branch -d feat/login-button
```

### 3.4. Feature Toggles
```js
if (isFeatureEnabled('loginButton')) {
  renderLoginButton();
}
```

---

## 🧪 4. Testing and CI Guidelines
```bash
npm run test
```

---

## 🧼 5. Clean Up Stale Branches
```bash
git branch --merged main
git branch -d old-branch
git push origin --delete old-branch
```

---

## 📌 6. Tags and Releases
```bash
git tag -a v2.0.0 -m "Major release"
git push origin v2.0.0
```

---

## 🧭 7. General Best Practices

| Guideline | Description |
|----------|-------------|
| Commit Often | Small commits with meaningful messages |
| Pull First | Always `git pull` before pushing |
| Rebase Carefully | Only rebase local commits |
| PR Size | Keep pull requests under 300 LOC if possible |
| Code Review | Use code review tools, approve only tested code |
| Tags | Use semver tags for releases |
| Hooks | Use pre-commit hooks to enforce standards |

### Example Pre-commit Setup
```bash
npm install --save-dev husky
npx husky install
```