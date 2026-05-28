"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {

  const [repoUrl, setRepoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [repoData, setRepoData] = useState<any>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // ---------------- ANALYZE ----------------

  const analyzeRepo = async () => {

    if (!repoUrl) return;

    setLoading(true);

    setSummary("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            repo_url: repoUrl,
          }),
        }
      );

      const data = await response.json();

      setSummary(data.summary);

      setRepoData(data.repo_info);

    } catch (error) {

      setSummary("Failed to analyze repository.");
    }

    setLoading(false);
  };

  // ---------------- CHAT ----------------

  const askQuestion = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            repo_url: repoUrl,
            question: question,
          }),
        }
      );

      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {

      setAnswer("Failed to get answer.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}

        <div className="text-center mb-14">

          <h1 className="text-6xl font-extrabold">
            AI Repo Summarizer
          </h1>

          <p className="text-zinc-400 text-xl mt-5">
            Understand any GitHub repository instantly using AI.
          </p>

        </div>

        {/* INPUT */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="https://github.com/owner/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full rounded-2xl bg-black border border-zinc-700 px-6 py-5 text-lg outline-none focus:border-white"
            />

            <button
              onClick={analyzeRepo}
              disabled={loading}
              className="rounded-2xl bg-white text-black py-4 text-lg font-bold hover:bg-zinc-300 transition"
            >
              {loading ? "Analyzing..." : "Analyze Repository"}
            </button>

          </div>

        </div>

        {/* REPO STATS */}

        {repoData && (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-400 mb-2">Repository</p>
              <h3 className="text-2xl font-bold">
                {repoData.name}
              </h3>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-400 mb-2">Language</p>
              <h3 className="text-2xl font-bold">
                {repoData.language}
              </h3>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-400 mb-2">Stars</p>
              <h3 className="text-2xl font-bold">
                ⭐ {repoData.stars}
              </h3>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-400 mb-2">Forks</p>
              <h3 className="text-2xl font-bold">
                🍴 {repoData.forks}
              </h3>
            </div>

          </div>

        )}

        {/* SUMMARY */}

        {summary && (

          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-4xl font-bold">
                Repository Analysis
              </h2>

              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(summary);
                  alert("Summary copied!");
                }}
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl text-sm"
              >
                Copy
              </button>

            </div>

            <div className="max-w-none text-lg leading-10 tracking-wide text-zinc-300">

              <div className="space-y-6">

                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-bold text-white mb-6">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-3xl font-semibold text-cyan-400 mt-10 mb-5">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-2xl font-semibold text-purple-400 mt-8 mb-4">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="text-zinc-300 leading-9">
                        {children}
                      </p>
                    ),

                    li: ({ children }) => (
                      <li className="ml-6 list-disc text-zinc-200 py-1">
                        {children}
                      </li>
                    ),

                    strong: ({ children }) => (
                      <strong className="text-yellow-300 font-semibold">
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>

              </div>

            </div>

          </div>

        )}

        {/* CHAT */}

        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Chat With Repository
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Ask about repository..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-2xl bg-black border border-zinc-700 px-6 py-4 text-white outline-none"
            />

            <button
              onClick={askQuestion}
              className="bg-white text-black py-3 rounded-2xl font-semibold"
            >
              Ask AI
            </button>

            {answer && (

              <div className="bg-black border border-zinc-800 rounded-2xl p-6 text-zinc-300 leading-8">

                <ReactMarkdown>
                  {answer}
                </ReactMarkdown>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}