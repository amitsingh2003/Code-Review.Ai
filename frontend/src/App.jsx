import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Sparkles,
  BookOpen,
  ScrollText,
  Upload,
  Zap,
  FileText,
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";

const CodeReviewApp = () => {
  const [code, setCode] = useState(`// Paste or upload your code here
function exampleFunction() {
  return 'Hello, Code Review!';
}`);
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await axios.post("https://code-review-ai-1.onrender.com/ai/get-review", {
        code,
        detailed: true,
      });
      setReview(response.data);
    } catch (error) {
      setReview("Error generating review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1128] via-[#0F1A3D] to-[#050920] text-white selection:bg-blue-500/30 overflow-hidden">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <header className="flex justify-between items-center mb-8 animate-fade-in-down">
          <div className="flex items-center space-x-4">
            <Code className="w-10 h-10 text-blue-400 animate-pulse" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-[0_4px_3px_rgba(59,130,246,0.3)] hover:scale-[1.02] transition-transform duration-300">
              CodeReview.AI
            </h1>
          </div>
          <motion.label
            htmlFor="file-upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-blue-700 to-purple-800 text-white px-6 py-3 rounded-xl flex items-center space-x-3 shadow-xl hover:shadow-blue-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <Upload className="w-5 h-5" />
            <span className="font-medium">Upload File</span>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".js,.py,.ts,.jsx,.tsx,.html,.css"
            />
          </motion.label>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1A2140] to-[#161A2E] rounded-2xl p-6 border border-[#2C3A5A]/30 shadow-2xl backdrop-blur-sm animate-fade-in-left relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Code Editor
                </span>
              </h2>
              {file && (
                <span className="text-sm text-gray-400 flex items-center space-x-1">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>{file.name}</span>
                </span>
              )}
            </div>

            <div className="relative group">
              <CodeMirror
                value={code}
                height="400px"
                theme={githubDark}
                extensions={[javascript()]}
                onChange={(value) => setCode(value)}
                className="rounded-lg overflow-hidden border border-[#2C3A5A]/30 relative z-10"
              />
            </div>

            <motion.button
              onClick={reviewCode}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full bg-gradient-to-r from-blue-700 to-purple-800 text-white py-3.5 rounded-xl flex items-center justify-center space-x-3 disabled:opacity-50 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 animate-pulse" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>Generate AI Review</span>
                </>
              )}
            </motion.button>
          </div>

         
          <div className="bg-gradient-to-br from-[#1A2140] to-[#161A2E] rounded-2xl p-6 border border-[#2C3A5A]/30 shadow-2xl backdrop-blur-sm animate-fade-in-right relative overflow-hidden group">
            <div className="flex items-center mb-4 relative z-10">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  AI Review
                </span>
              </h2>
            </div>

            <div className="relative group">
              <div className="bg-[#0A1128]/60 rounded-lg p-4 h-[440px] overflow-y-auto relative z-10 border border-[#2C3A5A]/30">
                {review ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-3 hover:scale-[1.02] transition-transform duration-300"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400 mt-4 mb-2 hover:scale-[1.01] transition-transform duration-300"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-gray-300 mb-3 leading-relaxed hover:text-gray-200 transition-colors duration-300 selection:bg-blue-500/50"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-inside text-gray-300 pl-4 mb-3 marker:text-blue-500 hover:marker:text-blue-400 transition-colors duration-300"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {review}
                  </ReactMarkdown>
                ) : (
                  <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
                    <Sparkles className="w-12 h-12 text-blue-500 mb-4 animate-pulse" />
                    <p>Your AI review will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <style jsx global>{`
        /* Custom Scrollbar for ALL scrollable elements */
        *::-webkit-scrollbar {
          width: 12px;
          border-radius: 10px;
        }
        *::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.05);
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.5),
            rgba(109, 40, 217, 0.5)
          );
          border-radius: 10px;
          border: 2px solid rgba(59, 130, 246, 0.1);
          transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.7),
            rgba(109, 40, 217, 0.7)
          );
          border: 2px solid rgba(59, 130, 246, 0.2);
        }

        /* CodeMirror Specific Adjustments */
        .cm-scroller {
          overflow-y: auto !important;
        }

        /* Keyframe Animations */
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.7s ease-out;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.7s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CodeReviewApp;
