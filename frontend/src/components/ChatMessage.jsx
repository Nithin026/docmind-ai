import ReactMarkdown from "react-markdown";
import SourceCard from "./SourceCard";
import { FiUser, FiCpu } from "react-icons/fi";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3.5 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      
      {/* Avatar Icons */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
        isUser 
          ? "bg-gradient-to-tr from-blue-600 to-indigo-600 border-blue-500 text-white" 
          : "bg-slate-100 dark:bg-slate-850 border-slate-200/40 dark:border-slate-805 text-blue-600 dark:text-blue-400"
      }`}>
        {isUser ? <FiUser size={15} /> : <FiCpu size={15} />}
      </div>

      {/* Message Bubbles */}
      <div
        className={`max-w-3xl rounded-2xl px-5 py-3.5 shadow-sm border transition-all ${
          isUser
            ? "bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white border-blue-650/40 rounded-tr-none"
            : "bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 rounded-tl-none"
        }`}
      >
        <div className="text-sm leading-relaxed">
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="markdown-body whitespace-pre-wrap">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceCard sources={message.sources} />
        )}
      </div>

    </div>
  );
}