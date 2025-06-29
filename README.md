# The pragmatic programmer blog


## ⚙️ Prerequisites

1. [Install Hugo](https://gohugo.io/installation/) v0.145 o newer 
2. [Node v22+](https://nodejs.org/en/download/)
3. [Go v1.24+](https://go.dev/doc/install)
4. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Run the server

```shell
npm run dev
# or
hugo server
```
## Include Draft content

```shell
hugo server --buildDrafts
hugo server -D
```

Open your browser at `http://localhost:1313` to see the blog

## Add new content

```shell
# Default post
hugo new content content/english/blog/[TOPIC]/my-new-post.md

# For data structure post
hugo new content --kind data-structure content/english/blog/data-structures/[FILE_NAME].md

# For Graphs
hugo new content --kind graphs content/english/blog/graphs/[FILE_NAME].md

# For algorithm post
hugo new content --kind algorithm content/english/blog/algorithm/[FILE_NAME].md

# For software development post
hugo new content --kind software-development content/english/blog/software-development/[FILE_NAME].md

# For software architecture
hugo new content --kind software-architecture content/english/blog/software-architecture/[FILE_NAME].md

# For learning paths
hugo new content --kind learning-paths content/english/blog/learning-paths/[FILE_NAME].md

# For Data science
hugo new content --kind data-science content/english/blog/data-science/[FILE_NAME].md

# For Natural Language Processing
hugo new content --kind natural-language-processing content/english/blog/natural-language-processing/[FILE_NAME].md
```

## Blog site

This project is published at `https://danimaniarqsoft.github.io/blog/`
