---

# AI Repo Summarizer

AI Repo Summarizer is a web app that uses AI to analyze and summarize GitHub repositories. Enter a repo URL and get a beginner-friendly overview, tech stack, architecture, and more.

---

## Features

- **Summarize any public GitHub repo**: Get an instant, readable summary.
- **Beginner-friendly explanations**: Understand complex projects easily.
- **Ask questions**: Chat with the AI about the repo.
- **Modern UI**: Built with Next.js, React, and Tailwind CSS.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python 3.10+](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)

### 1. Install dependencies

In the project folder, run:

```bash
npm install
```

### 2. Start the backend (FastAPI)

1. Go to the backend folder:
    ```bash
    cd backend
    ```
2. Install Python dependencies:
    ```bash
    pip install fastapi uvicorn requests groq pydantic
    ```
3. Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

### 3. Start the frontend (Next.js)

Open a new terminal in the project root and run:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Enter a GitHub repository URL (e.g., `https://github.com/vercel/next.js`).
2. Click "Analyze" to get a summary.
3. Ask questions about the repo for more details.

---

## Project Structure

- app — Next.js frontend
- backend — FastAPI backend (Python)
- public — Static assets (icons, images)
- README.md — This file

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, React-Markdown
- **Backend:** FastAPI, Python, Groq AI

---

## Troubleshooting

- Make sure both backend and frontend servers are running.
- The backend runs on port 8000 by default.
- The frontend runs on port 3000 by default.
- If you see CORS errors, check that the backend allows requests from the frontend.

---

## License

MIT

---
