import { useState, useEffect } from "react";
import { FiRefreshCw, FiSun, FiMoon, FiCpu, FiMessageSquare } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import api from "../services/api";

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isOnline, setIsOnline] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const checkStatus = async () => {
    setCheckingStatus(true);
    try {
      const res = await api.get("/");
      if (res.status === 200) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (err) {
      setIsOnline(false);
    } finally {
      setTimeout(() => setCheckingStatus(false), 600); // Small delay to show animation
    }
  };

  useEffect(() => {
    checkStatus();
    // Persist dark mode class on root body element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/60 px-6 py-4 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-500/20 text-white">
            <FiCpu size={24} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              DocMind AI
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
              Offline PDF Research Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm border border-slate-200/30 dark:border-slate-700/30"
            title="Toggle theme"
          >
            {darkMode ? <FiSun size={20} className="text-amber-400" /> : <FiMoon size={20} className="text-slate-600" />}
          </button>

          {/* Connection Status Badge */}
          <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-sm border shadow-sm transition-all duration-300 ${
            isOnline 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" 
              : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full relative flex ${isOnline ? "bg-emerald-500" : "bg-rose-500"}`}>
              {isOnline && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />}
            </span>
            <span>{isOnline ? "Ollama Connected" : "Connection Offline"}</span>
          </div>

          {/* Refresh Connection Status */}
          <button 
            onClick={checkStatus}
            disabled={checkingStatus}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all text-slate-500 dark:text-slate-400"
            title="Check connection"
          >
            <FiRefreshCw className={`w-5 h-5 ${checkingStatus ? "animate-spin text-blue-500" : ""}`} />
          </button>
        </div>

      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
        
        {/* Sidebar Container */}
        <section className="col-span-1 md:col-span-4 lg:col-span-3 flex flex-col gap-6">
          <Sidebar />
        </section>

        {/* Chat Area Container */}
        <section className="col-span-1 md:col-span-8 lg:col-span-9">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 h-[calc(100vh-140px)] flex flex-col shadow-sm overflow-hidden">
            
            {/* Chat header */}
            <div className="border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-4 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FiMessageSquare size={20} />
              </div>
              <div>
                <h2 className="font-bold text-lg dark:text-slate-100">
                  Research Workspace
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ask questions and retrieve semantic details from uploaded documents
                </p>
              </div>
            </div>

            <ChatArea />

          </div>
        </section>

      </main>

    </div>
  );
}