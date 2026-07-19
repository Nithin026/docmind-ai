import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiTrash2, FiZap } from "react-icons/fi";
import api from "../services/api";
import ChatMessage from "./ChatMessage";

export default function ChatArea() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to DocMind AI!\n\nUpload your PDF documents on the left and ask me anything about them.",
      sources: [],
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const suggestions = [
    "Summarize this document's main points",
    "Identify the methodology and key findings",
    "Are there any limitations mentioned?",
  ];

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendPrompt = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await api.post("/chat/", {
        question: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer,
          sources: res.data.sources || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Unable to connect to backend. Please check connection.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    const q = question.trim();
    if (!q) return;
    setQuestion("");
    sendPrompt(q);
  };

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear this conversation?")) {
      try {
        await api.delete("/chat/history");
        setMessages([
          {
            role: "assistant",
            content: "👋 Welcome to DocMind AI!\n\nUpload your PDF documents on the left and ask me anything about them.",
            sources: [],
          },
        ]);
      } catch (err) {
        alert("Failed to clear chat history on server.");
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Clear Conversation Banner Button */}
      {messages.length > 1 && (
        <button
          onClick={handleClearHistory}
          className="absolute top-3 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 transition-all border border-rose-500/20"
        >
          <FiTrash2 size={13} />
          <span>Clear Chat</span>
        </button>
      )}

      {/* Message List area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 max-w-3xl shadow-sm">
              <div className="flex gap-1.5 items-center py-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested chips panel (shows only at start) */}
      {messages.length === 1 && !loading && (
        <div className="px-6 py-2 flex flex-wrap gap-2.5 justify-center">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => sendPrompt(s)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-800/60 hover:border-blue-500/30 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <FiZap className="text-blue-500" size={12} />
              <span>{s}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 p-4 bg-white dark:bg-slate-900 flex gap-3 items-center">
        
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question about your PDF..."
          disabled={loading}
          className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-slate-850 dark:text-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          className="p-3.5 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-blue-500/20 active:scale-95 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send Question"
        >
          <FiSend size={16} />
        </button>

      </div>
    </div>
  );
}