---
title: "How to add timestamp in each page"
meta_title: "Timestamp"
description: "this is meta description"
date: 2024-09-19T21:21:54-08:00
image: "/images/image-placeholder.png"
categories: ["Latex"]
author: "Daniel Pichardo"
tags: ["timestamp"]
draft: false
---


You can add a **date stamp** at the bottom of each page using the `fancyhdr` package. Here's how:

---

## ✅ Basic Setup

Include the following in your LaTeX document **preamble**:

```latex
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{} % Clear existing header/footer
\fancyfoot[C]{\today} % Date centered in the footer
```

To align the date to the **left** or **right** instead, use:

```latex
\fancyfoot[L]{\today} % Left-aligned
\fancyfoot[R]{\today} % Right-aligned
```

---

## 🛠️ Custom Date Format (Optional)

To customize the date format, include:

```latex
\usepackage{datetime}

\newdateformat{myformat}{\THEDAY~\monthname[\THEMONTH], \THEYEAR}

\fancyfoot[C]{\myformat\today} % Custom format in the footer
```

---

## 📝 Full Example

```latex
\documentclass{article}
\usepackage{fancyhdr}
\usepackage{datetime}

\newdateformat{myformat}{\THEDAY~\monthname[\THEMONTH], \THEYEAR}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot[C]{\myformat\today}

\begin{document}

Hello, this document shows the date at the bottom of each page.

\newpage

Another page to show footer consistency.

\end{document}
```

---

Let me know if you want to include time or make it appear only on certain pages!