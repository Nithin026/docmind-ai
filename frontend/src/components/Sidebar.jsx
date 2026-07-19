import { useState } from "react";
import UploadCard from "./UploadCard";
import StatusCard from "./StatusCard";
import StatsCard from "./StatsCard";
import { FiFolder, FiFileText } from "react-icons/fi";

export default function Sidebar() {
  const [documents, setDocuments] = useState([]);

  return (
    <div className="space-y-5 flex flex-col">
      
      <StatusCard />

      <UploadCard setDocuments={setDocuments} />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm">
        
        <h2 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <FiFolder className="text-blue-500" />
          <span>Index Queue</span>
        </h2>

        {documents.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/30 dark:bg-slate-950/20">
            <FiFileText size={24} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
              No documents active
            </p>
          </div>
        ) : (
          <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 rounded-xl p-3 flex flex-col gap-1 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <FiFileText className="text-blue-500 mt-0.5 shrink-0" size={16} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate" title={doc.filename}>
                    {doc.filename}
                  </span>
                </div>
                
                {/* PDF details returned from backend */}
                {(doc.size_kb || doc.pages) && (
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 font-semibold pl-6 mt-0.5">
                    {doc.size_kb && <span>{doc.size_kb} KB</span>}
                    {doc.pages && <span>{doc.pages} Pages</span>}
                    {doc.chunks && <span>{doc.chunks} Chunks</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      <StatsCard count={documents.length} />

    </div>
  );
}