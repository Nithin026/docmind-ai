import { useRef, useState } from "react";
import { FiUploadCloud, FiLoader } from "react-icons/fi";
import api from "../services/api";

export default function UploadCard({ setDocuments }) {
  const fileInput = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const processUpload = async (files) => {
    if (!files || !files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    setIsUploading(true);
    try {
      const res = await api.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDocuments(res.data);
      // Modern visual toast could go here, but simple alerts are functional. We'll use a polished dialog/prompt behavior or alert.
      alert("PDF Uploaded and indexed successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload or indexing failed. Please ensure the backend and Ollama are online.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    processUpload(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm">
      
      <h2 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-4">
        Upload Documents
      </h2>

      <div
        onClick={() => !isUploading && fileInput.current.click()}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 cursor-pointer text-center transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] ${
          dragActive 
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[1.02]" 
            : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50"
        } ${isUploading ? "cursor-not-allowed opacity-80" : ""}`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
              <FiLoader size={20} className="text-blue-500 absolute animate-pulse" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                Parsing & Indexing PDF...
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Creating text chunks and storing vector embeddings
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <FiUploadCloud size={30} />
            </div>

            <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
              {dragActive ? "Drop PDF file here" : "Click or Drag PDF here"}
            </p>

            <p className="text-xs text-slate-400 mt-1.5">
              Supports multiple files, up to 10MB each
            </p>
          </>
        )}
      </div>

      <input
        ref={fileInput}
        type="file"
        hidden
        multiple
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isUploading}
      />

    </div>
  );
}