import { FiBookOpen } from "react-icons/fi";

export default function SourceCard({ sources }) {
  return (
    <div className="mt-4 pt-3.5 border-t border-slate-200/50 dark:border-slate-800/60">
      
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 mb-2.5 uppercase tracking-wider">
        <FiBookOpen size={13} className="text-blue-500" />
        <span>Sources Retrieved</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sources.map((src, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 p-2.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/80 rounded-xl hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-colors"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350 truncate" title={src.filename}>
                {src.filename}
              </span>
              <span className="text-[10px] font-semibold text-slate-450 dark:text-slate-500 mt-0.5">
                Page {src.page}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}