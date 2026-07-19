# 📄 DocMind AI — Offline PDF Research Assistant

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-Qwen3-000000?logo=ollama&logoColor=white)
![ChromaDB](https://img.shields.io/badge/ChromaDB-VectorDB-6B4FBB)
![License](https://img.shields.io/badge/License-MIT-green)

**An offline, privacy-first AI assistant that lets you chat with your PDF documents using Retrieval-Augmented Generation (RAG), local embeddings, and Ollama — no cloud AI APIs required.**

[Overview](#-overview) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

DocMind AI is an intelligent, fully offline PDF research assistant. Upload one or more PDFs and ask natural language questions about their content — documents never leave your machine.

Under the hood, DocMind AI extracts and chunks PDF text, generates local embeddings, stores them in **ChromaDB**, retrieves the most relevant context for a query, and generates an answer using a local LLM (**Qwen3**) served through **Ollama**.

This gives you:

| | |
|---|---|
| 🔒 | Complete privacy — nothing sent to the cloud |
| 🌐 | Fully offline functionality |
| ⚡ | Fast semantic search |
| 📄 | Answers with source citations (file + page) |
| 🤖 | Local AI inference end-to-end |

---

## ✨ Features

### 📂 PDF Management
- Upload one or multiple PDF documents
- Automatic PDF validation
- Local document storage
- Text extraction via PyMuPDF

### 🧠 AI-Powered Chat
- Natural language question answering
- Context-aware, multi-document support
- Conversation memory with follow-up questions

### 🔍 Retrieval-Augmented Generation (RAG)
- Text chunking
- Sentence-Transformer embeddings
- ChromaDB vector storage
- Semantic similarity search + context retrieval

### 🤖 Local AI
- Ollama integration running Qwen3
- Fully offline inference — no external AI APIs

### 📚 Source Citations
Every answer includes the source **PDF filename** and **page number**.

### 🎨 Modern Frontend
- React + Vite
- Responsive dashboard with upload and chat interfaces
- Clean, modern UI

---

## 🛠 Tech Stack

**Frontend:** React · Vite · Axios · React Icons · CSS
**Backend:** FastAPI · Python
**AI / ML:** Ollama · Qwen3 · Sentence Transformers · ChromaDB
**PDF Processing:** PyMuPDF

---

## 🏗 Architecture

```
                    User
                      │
                      ▼
              React Frontend
                      │
          HTTP REST API (Axios)
                      │
                      ▼
                FastAPI Backend
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
 PDF Processing               Chat Pipeline
        │                           │
        ▼                           ▼
  Extract Text                Retrieve Context
        │                           │
        ▼                           ▼
 Chunk Documents            ChromaDB Search
        │                           │
        ▼                           ▼
 Generate Embeddings         Build Prompt
        │                           │
        ▼                           ▼
    ChromaDB                Ollama (Qwen3)
        │                           │
        └─────────────┬─────────────┘
                       ▼
              AI Generated Answer
```

## 🔄 Workflow

```
Upload PDF → Save PDF → Extract Text → Chunk Text
    → Generate Embeddings → Store in ChromaDB

User asks question → Generate Query Embedding
    → Retrieve Relevant Chunks → Build Context
    → Ollama (Qwen3) → Answer + Source Citations
```

---

## 📁 Project Structure

```
docmind-ai/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload.py
│   │   │   ├── chat.py
│   │   │   ├── documents.py
│   │   │   ├── compare.py
│   │   │   └── summary.py
│   │   ├── services/
│   │   │   ├── pdf_service.py
│   │   │   ├── chunk_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── vector_service.py
│   │   │   ├── retrieval_service.py
│   │   │   ├── llm_service.py
│   │   │   ├── chat_service.py
│   │   │   └── memory_service.py
│   │   ├── schemas/
│   │   ├── models/
│   │   └── core/
│   └── main.py
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── styles/
└── README.md
```

---

## ⚙ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Nithin026/docmind-ai.git
cd docmind-ai
```

### 2. Backend setup
```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### 3. Install and run Ollama
```bash
# Download from https://ollama.com

ollama pull qwen3
ollama serve
```

### 4. Start the backend
```bash
uvicorn app.main:app --reload
```
- Backend: `http://127.0.0.1:8000`
- Swagger docs: `http://127.0.0.1:8000/docs`

### 5. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
- Frontend: `http://localhost:5173`

---

## 📡 API Endpoints

### Upload PDFs
```
POST /upload/
```

### Ask a question
```
POST /chat/
```
**Request**
```json
{
  "question": "Explain Python Lists"
}
```
**Response**
```json
{
  "answer": "Lists are mutable sequences...",
  "sources": [
    {
      "filename": "python.pdf",
      "page": 12
    }
  ]
}
```

### Clear conversation history
```
DELETE /chat/history
```

---

## 🧩 RAG Pipeline

1. PDF upload
2. Text extraction
3. Chunking
4. Embedding generation
5. Vector storage (ChromaDB)
6. Semantic search
7. Context building
8. Prompt generation
9. Local LLM response (Qwen3 via Ollama)

---

## 🚀 Future Enhancements

- [ ] Multi-document comparison
- [ ] AI-generated summaries
- [ ] Document deletion
- [ ] Search history
- [ ] Export chat
- [ ] Dark mode
- [ ] Authentication
- [ ] Docker support
- [ ] Streaming responses
- [ ] OCR support for scanned PDFs

---

## 📸 Screenshots

> Add screenshots to `docs/` and reference them here once the UI is finalized.

```
docs/home.png
docs/upload.png
docs/chat.png
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Nithin Kumar**
- GitHub: [@Nithin026](https://github.com/Nithin026)
- LinkedIn: *(add your profile URL here)*

---

<div align="center">

⭐ If you found this project useful, consider giving it a star on GitHub!

</div>
