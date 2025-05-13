---
date: 2025-02-19T21:21:54-08:00
draft: false
title: "How to add timestamp in each page"
author: Daniel Pichardo
---


# 📅 How to Add a Date Stamp at the Bottom of Each Page in LaTeX

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