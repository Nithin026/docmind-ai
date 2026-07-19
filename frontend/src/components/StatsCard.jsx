import { FiFileText, FiCpu } from "react-icons/fi";

export default function StatsCard({ count }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm">
      
      <h2 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-4">
        Library Overview
      </h2>

      <div className="grid grid-cols-2 gap-3.5">
        
        <div className="bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 rounded-xl p-4 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform text-center">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg mb-2">
            <FiFileText size={18} />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {count}
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            PDFs
          </span>
        </div>

        <div className="bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/40 rounded-xl p-4 flex flex-col items-center justify-center hover:scale-[1.02] transition-transform text-center">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg mb-2 animate-pulse">
            <FiCpu size={18} />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Ready
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            Embeddings
          </span>
        </div>

      </div>

    </div>
  );
}