---
title: "Deep Learning Project: Named Entity Recognition (NER) with LLaMA Embeddings"
meta_title: "meta title"
description: "this is meta description"
date: 2025-05-16T10:22:07-06:00
image: "/images/image-placeholder.png"
categories: ["Artificial Intelligence"]
author: "Daniel Pichardo"
tags: ["ner", "deep-learning", "nlp"]
draft: false
---

Named Entity Recognition (NER) is a key task in Natural Language Processing (NLP) where the goal is to locate and classify named entities in text into predefined categories such as person names, organizations, locations, time expressions, etc. In this project, we leverage **LLaMA (Large Language Model Meta AI)** for generating high-quality embeddings and train a deep learning model on top for the NER task.

---

## Project Architecture

### Components:
- **Text Embedding**: Using **LLaMA model** to convert raw text into embeddings.
- **NER Model**: A **BiLSTM-CRF** model trained on top of the embeddings.
- **Dataset**: CoNLL-2003 NER dataset.
- **Frameworks**: PyTorch, Hugging Face Transformers

---

## Step-by-Step Implementation

### Step 1: Environment Setup

Install required packages:

```bash
pip install torch transformers datasets seqeval
```

---

### Step 2: Dataset Preparation

We'll use the **CoNLL-2003** dataset available via Hugging Face:

```python
from datasets import load_dataset

dataset = load_dataset("conll2003")
```

Inspect the data:

```python
print(dataset["train"][0])
```

---

### Step 3: Tokenization & Embedding with LLaMA

Use LLaMA via Hugging Face's `transformers`:

```python
from transformers import LlamaTokenizer, LlamaModel

tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-2-7b-hf")
model = LlamaModel.from_pretrained("meta-llama/Llama-2-7b-hf")

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model(**inputs)
    return outputs.last_hidden_state
```

⚠️ LLaMA models are large and require a GPU with significant VRAM (e.g., ≥24GB).

---

### Step 4: Model Architecture – BiLSTM + CRF

The next code implements the model architecture with BiLSTM + CRF. All with the library of PyTorch

```python
import torch.nn as nn
import torchcrf

class BiLSTM_CRF(nn.Module):
    def __init__(self, embedding_dim, hidden_dim, tagset_size):
        super().__init__()
        self.lstm = nn.LSTM(embedding_dim, hidden_dim // 2, num_layers=1,
                            bidirectional=True, batch_first=True)
        self.hidden2tag = nn.Linear(hidden_dim, tagset_size)
        self.crf = torchcrf.CRF(tagset_size, batch_first=True)

    def forward(self, embeddings, tags=None, mask=None):
        lstm_out, _ = self.lstm(embeddings)
        emissions = self.hidden2tag(lstm_out)
        if tags is not None:
            loss = -self.crf(emissions, tags, mask=mask, reduction='mean')
            return loss
        else:
            return self.crf.decode(emissions, mask=mask)
```

---

### Step 5: Training Loop

Train the model using a batch-wise approach:

```python
from torch.utils.data import DataLoader

optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

for epoch in range(epochs):
    model.train()
    total_loss = 0
    for batch in dataloader:
        optimizer.zero_grad()
        embeddings = get_embeddings(batch["tokens"])
        tags = batch["ner_tags"]
        loss = model(embeddings, tags, mask=batch["attention_mask"])
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch+1}: Loss = {total_loss}")
```

---

### Step 6: Evaluation

Use `seqeval` for evaluation:

```python
from seqeval.metrics import classification_report

true_labels = [...]
pred_labels = [...]

print(classification_report(true_labels, pred_labels))
```

---

## Challenges

- **GPU memory**: LLaMA models are large and resource-intensive.
- **Token alignment**: Mapping tokenized outputs back to original words is non-trivial.
- **Inference speed**: LLaMA-based embedding generation is slow compared to BERT-based models.

---

## Conclusion

Using LLaMA for NER is promising due to the richness of the embeddings, but computationally demanding. This architecture can be further improved using smaller or quantized LLaMA models and optimized batching techniques.

---

## References

1. T. Mikolov et al., "Efficient Estimation of Word Representations in Vector Space", 2013. arXiv:1301.3781  
2. Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", 2018.  
3. Meta AI, "LLaMA: Open and Efficient Foundation Language Models", 2023.  
4. Lample et al., "Neural Architectures for Named Entity Recognition", NAACL 2016.  
5. Hugging Face Transformers: https://github.com/huggingface/transformers  
6. CoNLL-2003 Dataset: https://huggingface.co/datasets/conll2003