---
title: "Timeline with latex"
meta_title: "Timeline latex"
description: "this is meta description"
date: 2025-04-22T21:21:54-08:00
image: "/images/image-placeholder.png"
categories: ["Latex"]
author: "Daniel Pichardo"
tags: ["timeline"]
draft: false
---

In this post we explain how to create a simple timeline using latex

## Latex example

The next latex code create a timeline


```latex
\documentclass{beamer}
\usetheme{Berlin}
\usecolortheme{beaver}
\setbeamertemplate{footline}[frame number]
\setbeamertemplate{itemize item}[circle]
\setbeamertemplate{enumerate item}[circle]

\setbeamertemplate{navigation symbols}{}
\setbeamertemplate{footline}[frame number]
\usepackage{multicol}
\usepackage{tikz}

\begin{document}
\begin{frame}{Literature}
\begin{tikzpicture}[scale=0.5,every node/.style={outer sep=5pt}]
    %Notation: {year, the title of the event}
    %NOTE! Everyting is zero-based
    \def\ourInfo{{
        {"2016","Sometext here and there"},
        {"2017","long sometext here and there \\ sometext here and there sometext here and there"},
        {"2018","Another timline event that is in black"},
        {"2019","The last timline event that is also in black"},
    }}
    \pgfmathsetmacro{\length}{3}% Zero based.

    % Loop through the array containing all events.
    \foreach \i in {0, ..., \length}{
        \pgfmathsetmacro{\year}{\ourInfo[\i][0]}% Get the left cell (year)
        \pgfmathsetmacro{\eventName}{\ourInfo[\i][1]}% Get the right cell (event name)
        \draw[thick,red] (0,-2*\i-2)--(0,-2*\i);% Draw vertical line
        \ifnum \i=1 % Should be in red text
          \draw(0,-2*\i-1) node[red, right, align = left]{\eventName};% Display the event name
          \draw(0,-2*\i-1) node[red, left] {\year};
        \else % Should be in black text
           \draw(0,-2*\i-1) node[right, black]{\eventName};% Display the event name
           \draw(0,-2*\i-1) node[left] {\year};% Display the year
        \fi
    }
    % Draw the bullet with the dash
    \foreach \i in {0, ..., \length}{
        \filldraw[draw = white, fill = red,thick] (0,-2*\i-1) circle (5pt);
        \draw[thick,red] (-12pt,-2*\i-1)--(0,-2*\i-1);
    }
\end{tikzpicture}
\end{frame}
\end{document}
```