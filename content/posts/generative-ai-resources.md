---
date: 2025-02-19T21:21:54-08:00
draft: false
title: "Generative AI Resources"
author: Daniel Pichardo
---


Here we have greate generative ai resources for beginners


What is a language model?

A language model is a machine learning model that aims to predict and generate plausible language. Autocomplete is a language model, for example.

What is a large language model?

Early language models could predict the probability of a single word; modern large language models can predict the probability of sentences, paragraphs, or even entire documents.

How large is large?

The definition is fuzzy, but "large" has been used to describe BERT (110M parameters) as well as PaLM 2 (up to 340B parameters).

Parameters are the weights the model learned during training, used to predict the next token in the sequence. "Large" can refer either to the number of parameters in the model, or sometimes the number of words in the dataset.


Transformers

A key development in language modeling was the introduction in 2017 of Transformers, an architecture designed around the idea of attention. This made it possible to process longer sequences by focusing on the most important part of the input, solving memory issues encountered in earlier models.

Transformers are the state-of-the-art architecture for a wide variety of language model applications, such as translators.

Full Transformers consist of an encoder and a decoder. An encoder converts input text into an intermediate representation, and a decoder converts that intermediate representation into useful text.