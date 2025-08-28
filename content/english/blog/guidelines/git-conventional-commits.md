---
title: "Git Conventional Commits"
meta_title: "Git Conventional Commits"
description: "Git Conventional Commits for programming"
date: 2025-08-28T17:17:20-06:00
image: "/images/posts/guidelines/image.jpeg"
categories: ["Guidelines"]
author: "Daniel Pichardo"
tags: ["git"]
draft: false
---

## Introduction

Git Conventional Commits provide a standardized way of writing commit messages to make them more readable and machine-parsable. The format is **`<type>[optional scope]: <description>`**. Here are some common examples and variations:

### Basic Commits

- **`feat`**: A new feature.
    - `feat: add user authentication`
- **`fix`**: A bug fix.
    - `fix: correct login button alignment on mobile`
- **`docs`**: Documentation changes.
    - `docs: update README with new installation instructions`
- **`style`**: Code style changes (whitespace, formatting, semicolons, etc.).
    - `style: format code with Prettier`
- **`refactor`**: A code change that neither fixes a bug nor adds a feature.
    - `refactor: restructure API routes`
- **`test`**: Adding or correcting tests.
    - `test: add unit tests for user service`
- **`chore`**: Maintenance tasks, build process changes, or library updates.
    - `chore: update dependencies`


---

### Commits with a Scope

The **`[optional scope]`** provides additional context. It is usually a component, module, or file affected by the change.

- `feat(api): add new endpoint for user data`
- `fix(frontend): resolve rendering issue in user profile page`
- `docs(ci): add documentation for CI pipeline`
    

---

### Commits with a Breaking Change

A **breaking change** is indicated by an exclamation mark (`!`) immediately after the type or scope. It signifies an incompatible API change. The body of the commit message should also explain the breaking change.

- `feat!: remove old user database schema`
- `feat(api)!: migrate to a new authentication method`
    - **Body:** `BREAKING CHANGE: The 'oldAuth' endpoint is no longer supported. Clients must now use the 'newAuth' endpoint with the new token format.`
        

---

### Commits with a Body and Footer

The **body** of the commit message can provide a more detailed explanation. A **footer** can be used to reference issues, pull requests, or other related work using keywords like `Closes`, `Refs`, or `Fixes`.

- **Example with Body:**
    
    ```shell
    feat(api): add a new search functionality
    
    This commit adds a new search feature to the API, allowing users to search by username or email. The search is case-insensitive and supports partial matches.
    ```
    
- **Example with Footer:**
    
    ```shell
    fix: fix user registration bug
    
    Corrected a bug where new user registrations would fail due to an incorrect database entry.
    
    Fixes #123
    Closes #124
    ```
    

---

### Summary of Rules

| Part            | Rule                                                           | Example                         |
| --------------- | -------------------------------------------------------------- | ------------------------------- |
| **Type**        | Must be one of the specified types (`feat`, `fix`, etc.).      | `feat:`                         |
| **Scope**       | Optional. A component or module.                               | `feat(api):`                    |
| **Breaking**    | Optional. An exclamation mark `!` to denote a breaking change. | `feat(api)!:`                   |
| **Description** | A short, concise summary of the change.                        | `feat: add user authentication` |
| **Body**        | Optional. A detailed explanation.                              | `This change adds...`           |
| **Footer**      | Optional. References to issues, PRs, etc.                      | `Fixes #123`                    |

