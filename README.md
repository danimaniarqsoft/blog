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
hugo new content content/english/blog/[TOPIC]/my-new-post.md
```

## Blog site

This project is published at `https://danimaniarqsoft.github.io/blog/`
