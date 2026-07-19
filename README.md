📄 DocMind AI – Offline PDF Research Assistant
<div align="center">










An offline AI-powered PDF Research Assistant that lets you chat with your PDF documents using Retrieval-Augmented Generation (RAG), local embeddings, and Ollama—without relying on cloud AI APIs.

</div>
📖 Overview

DocMind AI is an intelligent offline PDF assistant that allows users to upload one or more PDF documents and ask natural language questions about their content.

Instead of sending documents to cloud services, the application processes PDFs locally, generates embeddings, stores them in ChromaDB, retrieves the most relevant information, and uses a local Large Language Model (LLM) running through Ollama to generate answers.

This ensures:

🔒 Complete privacy
🌐 Offline functionality
⚡ Fast semantic search
📄 Source citations
🤖 Local AI inference
✨ Features
📂 PDF Management
Upload one or multiple PDF documents
Automatic PDF validation
Local document storage
Extract text using PyMuPDF
🧠 AI-Powered Chat
Ask questions in natural language
Context-aware answers
Multi-document support
Conversation memory
Follow-up questions
🔍 Retrieval-Augmented Generation (RAG)
Text chunking
Sentence Transformer embeddings
ChromaDB vector storage
Semantic similarity search
Context retrieval
🤖 Local AI
Ollama integration
Qwen3 LLM
Completely offline inference
No external AI APIs required
📚 Source Citations

Each answer includes:

PDF filename
Page number
🎨 Modern Frontend
React + Vite
Responsive dashboard
Upload interface
Chat interface
Clean and modern UI
🛠 Tech Stack
Frontend
React
Vite
Axios
React Icons
CSS
Backend
FastAPI
Python
AI & Machine Learning
Ollama
Qwen3
Sentence Transformers
ChromaDB
PDF Processing
PyMuPDF
🏗 Architecture
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
🔄 Workflow
Upload PDF
      │
      ▼
Save PDF
      │
      ▼
Extract Text
      │
      ▼
Chunk Text
      │
      ▼
Generate Embeddings
      │
      ▼
Store in ChromaDB
      │
      ▼
User asks question
      │
      ▼
Generate Query Embedding
      │
      ▼
Retrieve Relevant Chunks
      │
      ▼
Build Context
      │
      ▼
Ollama (Qwen3)
      │
      ▼
Answer + Source Citations
📁 Project Structure
docmind-ai/

├── backend/
│
│   ├── app/
│   │
│   ├── api/
│   │   ├── upload.py
│   │   ├── chat.py
│   │   ├── documents.py
│   │   ├── compare.py
│   │   └── summary.py
│   │
│   ├── services/
│   │   ├── pdf_service.py
│   │   ├── chunk_service.py
│   │   ├── embedding_service.py
│   │   ├── vector_service.py
│   │   ├── retrieval_service.py
│   │   ├── llm_service.py
│   │   ├── chat_service.py
│   │   └── memory_service.py
│   │
│   ├── schemas/
│   ├── models/
│   ├── core/
│   └── main.py
│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── styles/
│
└── README.md
⚙ Installation
Clone Repository
git clone https://github.com/Nithin026/docmind-ai.git

cd docmind-ai
Backend Setup
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
Install Ollama

Download:

https://ollama.com

Pull the model

ollama pull qwen3

Run Ollama

ollama serve
Start Backend
uvicorn app.main:app --reload

Backend URL

http://127.0.0.1:8000

Swagger

http://127.0.0.1:8000/docs
Frontend Setup
cd frontend

npm install

npm run dev

Frontend

http://localhost:5173
API Endpoints
Upload PDFs
POST /upload/
Ask Questions
POST /chat/

Request

{
    "question":"Explain Python Lists"
}

Response

{
    "answer":"Lists are mutable sequences...",
    "sources":[
        {
            "filename":"python.pdf",
            "page":12
        }
    ]
}
Clear Conversation
DELETE /chat/history
RAG Pipeline
PDF Upload
Text Extraction
Chunking
Embedding Generation
Vector Storage
Semantic Search
Context Building
Prompt Generation
Local LLM Response
Future Enhancements
Multi-document comparison
AI-generated summaries
Document deletion
Search history
Export chat
Dark mode
Authentication
Docker support
Streaming responses
OCR support for scanned PDFs
Screenshots

Add screenshots here after completing the UI.

docs/

home.png

upload.png

chat.png
Contributing
Fork the repository
Create a new branch
git checkout -b feature/new-feature
Commit changes
git commit -m "Add new feature"
Push
git push origin feature/new-feature
Open a Pull Request
License

This project is licensed under the MIT License.

Author

Nithin Kumar

GitHub: https://github.com/Nithin026
LinkedIn: (Add your LinkedIn profile URL here)

⭐ If you found this project useful, consider giving it a star on GitHub!
