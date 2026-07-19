import { useState, useEffect } from "react";
import { FiSettings, FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
import api from "../services/api";

export default function StatusCard() {
  const [status, setStatus] = useState({
    FastAPI: "loading",
    Ollama: "loading",
    ChromaDB: "loading",
  });

  const checkStatus = async () => {
    try {
      const res = await api.get("/");
      if (res.status === 200) {
        setStatus({
          FastAPI: "online",
          Ollama: "online",
          ChromaDB: "online",
        });
      } else {
        setStatus({
          FastAPI: "offline",
          Ollama: "offline",
          ChromaDB: "offline",
        });
      }
    } catch (err) {
      setStatus({
        FastAPI: "offline",
        Ollama: "offline",
        ChromaDB: "offline",
      });
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm">
      
      <h2 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <FiSettings className="text-blue-500 animate-spin-slow" />
        <span>System Status</span>
      </h2>

      <div className="space-y-3.5">
        <StatusItem name="FastAPI Web Server" state={status.FastAPI} />
        <StatusItem name="Ollama Service (Llama)" state={status.Ollama} />
        <StatusItem name="ChromaDB Database" state={status.ChromaDB} />
      </div>

    </div>
  );
}

function StatusItem({ name, state }) {
  let badgeColor = "";
  let badgeText = "";
  let icon = null;

  if (state === "online") {
    badgeColor = "text-emerald-500 dark:text-emerald-400";
    badgeText = "Online";
    icon = (
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    );
  } else if (state === "offline") {
    badgeColor = "text-rose-500 dark:text-rose-400";
    badgeText = "Offline";
    icon = <div className="w-2 h-2 rounded-full bg-rose-500" />;
  } else {
    badgeColor = "text-amber-500 dark:text-amber-400";
    badgeText = "Checking...";
    icon = <FiLoader className="animate-spin text-amber-500" size={12} />;
  }

  return (
    <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
      <span>{name}</span>
      <div className="flex items-center gap-2">
        {icon}
        <span className={`text-xs font-semibold uppercase tracking-wider ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
    </div>
  );
}