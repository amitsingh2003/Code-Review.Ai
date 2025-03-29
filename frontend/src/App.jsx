import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Upload,
  Zap,
  Sparkles,
  FileText,
  Terminal,
  Eye,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";

const MinimalistLogo = () => {
  return (
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-500/20 rounded-full"></div>
      <Shield
        className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400"
        strokeWidth={1.5}
      />
    </div>
  );
};

const CodeReviewApp = () => {
  const [code, setCode] = useState(`// Paste or upload your code here
function exampleFunction() {
  return 'Hello, Code Review!';
}`);
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("split");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("code");
      } else {
        setViewMode("split");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const reviewCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://code-review-ai-1.onrender.com/ai/get-review",
        {
          code,
          detailed: true,
        }
      );
      setReview(response.data);

      if (window.innerWidth < 768) {
        setViewMode("review");
      }
    } catch (error) {
      setReview("Error generating review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-blue-400 font-mono"
        >
          Loading CodeReview.AI...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-gray-950 text-white flex flex-col">
      <header className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <MinimalistLogo />
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-blue-400">CodeReview</span>
            <span className="text-gray-400">.</span>
            <span className="text-violet-400">AI</span>
          </h1>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <label className="cursor-pointer">
            <div className="px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Upload File</span>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".js,.py,.ts,.jsx,.tsx,.html,.css"
              />
            </div>
          </label>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex flex-col space-y-3">
            <label className="cursor-pointer">
              <div className="px-4 py-2 bg-gray-800 text-white rounded border border-gray-700 hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Upload File</span>
                <input
                  type="file"
                  id="mobile-file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".js,.py,.ts,.jsx,.tsx,.html,.css"
                />
              </div>
            </label>

            <div className="flex rounded-md overflow-hidden border border-gray-700">
              <button
                onClick={() => setViewMode("code")}
                className={`flex-1 py-2 text-sm flex justify-center items-center space-x-1 
                  ${
                    viewMode === "code"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Code</span>
              </button>
              <button
                onClick={() => setViewMode("review")}
                className={`flex-1 py-2 text-sm flex justify-center items-center space-x-1
                  ${
                    viewMode === "review"
                      ? "bg-violet-600 text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
              >
                <Eye className="w-4 h-4" />
                <span>Review</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {(viewMode === "split" || viewMode === "code") && (
          <div
            className={`${
              viewMode === "split" ? "md:w-1/2" : "w-full"
            } h-full flex flex-col p-2`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">Code Editor</span>
              </div>
              {file && (
                <span className="text-xs text-blue-300 flex items-center space-x-1 px-2 py-1 rounded bg-gray-800">
                  <FileText className="w-3 h-3" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </span>
              )}
            </div>

            <div className="flex-grow relative rounded-md overflow-hidden shadow-lg border border-gray-800 bg-gray-900">
              <div className="absolute -inset-1 bg-blue-500/10 rounded-md blur-md opacity-50"></div>
              <div className="relative h-full w-full overflow-hidden">
                <CodeMirror
                  value={code}
                  height="100%"
                  width="100%"
                  theme={githubDark}
                  extensions={[javascript()]}
                  onChange={(value) => setCode(value)}
                  className="h-full w-full"
                />
              </div>
            </div>

            <button
              onClick={reviewCode}
              disabled={isLoading}
              className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex justify-center items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Review</span>
                </>
              )}
            </button>
          </div>
        )}

        {(viewMode === "split" || viewMode === "review") && (
          <div
            className={`${
              viewMode === "split" ? "md:w-1/2" : "w-full"
            } h-full flex flex-col p-2`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-4 h-4 text-violet-400" />
              <span className="text-violet-400 font-medium">AI Analysis</span>
            </div>

            <div className="flex-grow relative rounded-md overflow-hidden shadow-lg border border-gray-800 bg-gray-900">
              <div className="absolute -inset-1 bg-violet-500/10 rounded-md blur-md opacity-50"></div>
              <div className="relative h-full overflow-y-auto p-4">
                {review ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-xl font-bold text-violet-300 mb-3"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-lg font-semibold text-violet-200 mt-4 mb-2"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-gray-300 mb-3 leading-relaxed"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside text-gray-300 pl-4 mb-3 space-y-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-gray-300 mb-1" {...props} />
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-gray-800 text-violet-300 px-1 py-0.5 rounded text-sm font-mono"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {review}
                  </ReactMarkdown>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <Sparkles className="w-10 h-10 text-violet-400 mb-3 opacity-70" />
                    <p className="text-violet-300 font-medium">
                      Awaiting Code Submission
                    </p>
                    <p className="text-sm mt-2 text-gray-400 max-w-sm">
                      Submit your code to receive AI-powered insights and
                      optimizations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                <span className="truncate">Optimizations</span>
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-violet-500 mr-1"></div>
                <span className="truncate">Best Practices</span>
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal-500 mr-1"></div>
                <span className="truncate">Security Issues</span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block md:lg:hidden fixed bottom-4 right-4 z-10">
        <div className="flex rounded-md overflow-hidden border border-gray-700 shadow-lg">
          <button
            onClick={() => setViewMode("code")}
            className={`px-3 py-2 text-sm flex items-center space-x-1 
              ${
                viewMode === "code"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Code</span>
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`px-3 py-2 text-sm flex items-center space-x-1
              ${
                viewMode === "split"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
          >
            <span>Split</span>
          </button>
          <button
            onClick={() => setViewMode("review")}
            className={`px-3 py-2 text-sm flex items-center space-x-1
              ${
                viewMode === "review"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
          >
            <Eye className="w-4 h-4" />
            <span>Review</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Make the app fill the entire viewport */
        html,
        body,
        #root,
        #__next {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        /* Enhanced Custom Scrollbar */
        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          border-radius: 4px;
        }

        *::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.8);
          border-radius: 4px;
        }

        *::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.8),
            rgba(124, 58, 237, 0.8)
          );
          border-radius: 4px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(96, 165, 250, 0.9),
            rgba(139, 92, 246, 0.9)
          );
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }

        *::-webkit-scrollbar-corner {
          background: rgba(30, 41, 59, 0.8);
        }

        /* CodeMirror enhanced styling */
        .cm-editor {
          font-family: "JetBrains Mono", monospace !important;
          background-color: rgb(17, 24, 39) !important;
          height: 100% !important;
          width: 100% !important;
        }

        .cm-scroller {
          overflow: auto !important;
          height: 100% !important;
          width: 100% !important;
        }

        .cm-content {
          min-height: 100% !important;
        }

        .cm-gutters {
          background-color: rgba(17, 24, 39, 1) !important;
          border-right: 1px solid rgba(59, 130, 246, 0.2) !important;
        }

        .cm-activeLineGutter {
          background-color: rgba(59, 130, 246, 0.1) !important;
        }

        .cm-activeLine {
          background-color: rgba(59, 130, 246, 0.07) !important;
        }

        /* Make React Markdown fill available space */
        .markdown-body {
          height: 100%;
          width: 100%;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default CodeReviewApp;
