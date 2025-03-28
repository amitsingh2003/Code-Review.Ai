import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Upload,
  Zap,
  Sparkles,
  FileText,
  Terminal,
  Eye,
  Code,
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";

// Advanced Logo Component with Animation
const AdvancedLogo = () => {
  return (
    <div className="relative w-16 h-16">
      {/* Holographic glow effect */}
      <div className="absolute inset-0 bg-cyan-500/30 rounded-full animate-pulse blur-2xl"></div>

      {/* Rotating quantum rings */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400/40 rounded-full"
        animate={{
          rotate: 360,
          borderColor: [
            "rgba(6,182,212,0.4)",
            "rgba(45,212,191,0.4)",
            "rgba(6,182,212,0.4)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          borderColor: { duration: 5, repeat: Infinity },
        }}
      ></motion.div>

      {/* Pulsing core */}
      <motion.div
        className="absolute inset-2 border-2 border-blue-500/60 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          borderColor: [
            "rgba(59,130,246,0.6)",
            "rgba(79,70,229,0.6)",
            "rgba(59,130,246,0.6)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Central core */}
      <div
        className="absolute inset-3 bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900 rounded-full 
        flex items-center justify-center 
        shadow-[0_0_30px_rgba(59,130,246,0.5)] 
        border border-cyan-400/30"
      >
        <Shield className="w-7 h-7 text-cyan-300" strokeWidth={1.5} />
      </div>

      {/* Quantum particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          animate={{
            x: [0, Math.sin((i * Math.PI) / 2) * 20, 0],
            y: [0, Math.cos((i * Math.PI) / 2) * 20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
// Floating Panel Component
const FloatingPanel = ({ children, intensity = 1, className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -5 * intensity, 0],
        x: [0, 3 * intensity, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Particle Background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Main App Component
const CodeReviewApp = () => {
  const [code, setCode] = useState(`// Paste or upload your code here
function exampleFunction() {
  return 'Hello, Code Review!';
}`);
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanLines, setScanLines] = useState(true);

  // Simulated typing effect for the initial loading
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2000);

    return () => clearTimeout(timer);
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
    } catch (error) {
      setReview("Error generating review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050713] text-white overflow-hidden relative">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] z-0 pointer-events-none"></div>

      {/* Scan lines effect */}
      {scanLines && (
        <div className="absolute inset-0 bg-scanlines opacity-[0.07] z-50 pointer-events-none"></div>
      )}

      {/* Ambient background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-purple-700/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-cyan-600/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Subtle moving particles */}
      <ParticleBackground />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-modern opacity-[0.07] z-0"></div>

      {/* Main content */}
      <AnimatePresence>
        {isInitializing ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#050713] z-50"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                Initializing CodeReview.AI System...
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="container mx-auto px-6 py-12 max-w-6xl relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <header className="flex flex-col sm:flex-row justify-between items-center mb-16 space-y-6 sm:space-y-0">
              <FloatingPanel
                intensity={0.4}
                className="flex items-center space-x-4"
              >
                <div className="relative">
                  <AdvancedLogo />
                </div>

                <motion.h1
                  className="text-4xl font-extrabold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                    CodeReview<span className="text-white font-light">.</span>AI
                  </span>
                </motion.h1>
              </FloatingPanel>

              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div
                  className="relative backdrop-blur-md bg-blue-900/20 text-white px-6 py-3 rounded-lg 
                  border-t border-l border-white/5 border-r-0 border-b-0
                  shadow-[0_10px_20px_rgba(8,12,24,0.8)] flex items-center space-x-3 
                  group-hover:shadow-[0_15px_30px_rgba(8,12,24,0.9)] transition-all duration-300"
                >
                  <Upload className="w-5 h-5 text-cyan-300" />
                  <span className="font-medium">Upload File</span>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".js,.py,.ts,.jsx,.tsx,.html,.css"
                  />
                </div>
              </motion.label>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Code Editor Panel */}
              <FloatingPanel intensity={0.2}>
                <div className="relative group h-full">
                  {/* Ambient glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/70 to-cyan-600/70 rounded-xl opacity-75 blur-md group-hover:opacity-100 transition duration-300"></div>

                  <div className="relative backdrop-blur-md bg-blue-950/30 rounded-xl overflow-hidden border-t border-l border-white/5 shadow-[0_20px_50px_rgba(8,12,24,0.9)]">
                    <div className="flex justify-between items-center p-4 border-b border-blue-800/20 bg-gradient-to-r from-blue-900/50 to-blue-800/30 backdrop-blur-md">
                      <h2 className="text-lg font-medium flex items-center space-x-2">
                        <Terminal className="w-5 h-5 text-cyan-400" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                          Code Terminal
                        </span>
                      </h2>
                      {file && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-cyan-300/80 flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-900/30 backdrop-blur-md border-t border-l border-white/5"
                        >
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>{file.name}</span>
                        </motion.span>
                      )}
                    </div>

                    <div className="p-5 bg-blue-950/20 backdrop-blur-md">
                      <div className="rounded-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] overflow-hidden border border-blue-900/30">
                        <CodeMirror
                          value={code}
                          height="380px"
                          theme={githubDark}
                          extensions={[javascript()]}
                          onChange={(value) => setCode(value)}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-900/50 to-blue-800/30 backdrop-blur-md border-t border-blue-800/20">
                      <motion.button
                        onClick={reviewCode}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group w-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 rounded-lg blur-sm group-hover:blur opacity-90 transition-all duration-300"></div>
                        <div
                          className="relative w-full backdrop-blur-md bg-gradient-to-r from-blue-600/80 to-blue-500/80 text-white py-3 rounded-lg
                          flex items-center justify-center space-x-3
                          border-t border-l border-white/10 shadow-lg hover:shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300"
                        >
                          {isLoading ? (
                            <div className="flex items-center space-x-2">
                              <Zap className="w-5 h-5 text-cyan-300 animate-pulse" />
                              <span className="font-medium tracking-wide">
                                Processing Code...
                              </span>
                            </div>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 text-cyan-300" />
                              <span className="font-medium tracking-wide">
                                Generate AI Review
                              </span>
                            </>
                          )}
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </FloatingPanel>

              {/* AI Review Panel */}
              <FloatingPanel intensity={0.3}>
                <div className="relative group h-full">
                  {/* Ambient glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600/70 to-purple-600/70 rounded-xl opacity-75 blur-md group-hover:opacity-100 transition duration-300"></div>

                  <div className="relative backdrop-blur-md bg-indigo-950/30 rounded-xl overflow-hidden border-t border-l border-white/5 shadow-[0_20px_50px_rgba(8,12,24,0.9)]">
                    <div className="flex items-center p-4 border-b border-indigo-800/20 bg-gradient-to-r from-indigo-900/50 to-purple-900/30 backdrop-blur-md">
                      <h2 className="text-lg font-medium flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          AI Analysis
                        </span>
                      </h2>
                    </div>

                    <div className="p-5 bg-indigo-950/20 backdrop-blur-md">
                      <div className="rounded-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] p-6 h-[380px] overflow-y-auto border border-indigo-900/30 bg-[#080a15]/80 backdrop-blur-md">
                        {review ? (
                          <ReactMarkdown
                            components={{
                              h1: ({ node, ...props }) => (
                                <h1
                                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4"
                                  {...props}
                                />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2
                                  className="text-xl font-semibold text-indigo-300 mt-6 mb-3"
                                  {...props}
                                />
                              ),
                              p: ({ node, ...props }) => (
                                <p
                                  className="text-gray-300 mb-4 leading-relaxed"
                                  {...props}
                                />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul
                                  className="list-disc list-inside text-gray-300 pl-6 mb-4 space-y-2"
                                  {...props}
                                />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="text-gray-300 mb-1" {...props} />
                              ),
                              code: ({ node, ...props }) => (
                                <code
                                  className="bg-indigo-900/30 text-indigo-300 px-1 py-0.5 rounded text-sm font-mono border-t border-l border-white/5"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {review}
                          </ReactMarkdown>
                        ) : (
                          <div className="text-center flex flex-col items-center justify-center h-full">
                            <motion.div
                              className="relative mb-6"
                              animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0, -5, 0],
                              }}
                              transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                              }}
                            >
                              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-60"></div>
                              <Sparkles className="relative w-16 h-16 text-purple-300" />
                            </motion.div>
                            <p className="text-lg text-indigo-300 font-medium">
                              Awaiting Code Submission
                            </p>
                            <p className="text-sm mt-2 text-gray-400 max-w-sm">
                              Submit your code to receive AI-powered insights
                              and optimizations.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/30 backdrop-blur-md border-t border-indigo-800/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-cyan-500"
                            animate={{
                              boxShadow: [
                                "0 0 5px 0px #06b6d4",
                                "0 0 10px 2px #06b6d4",
                                "0 0 5px 0px #06b6d4",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.div>
                          <span className="text-sm text-cyan-300">
                            Optimizations
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-purple-500"
                            animate={{
                              boxShadow: [
                                "0 0 5px 0px #a855f7",
                                "0 0 10px 2px #a855f7",
                                "0 0 5px 0px #a855f7",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.5,
                            }}
                          ></motion.div>
                          <span className="text-sm text-purple-300">
                            Best Practices
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-blue-500"
                            animate={{
                              boxShadow: [
                                "0 0 5px 0px #3b82f6",
                                "0 0 10px 2px #3b82f6",
                                "0 0 5px 0px #3b82f6",
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1,
                            }}
                          ></motion.div>
                          <span className="text-sm text-blue-300">
                            Security Issues
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingPanel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Modern grid pattern background */
        .bg-grid-modern {
          background-image: radial-gradient(
              circle,
              rgba(59, 130, 246, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to right,
              rgba(59, 130, 246, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(59, 130, 246, 0.05) 1px,
              transparent 1px
            );
          background-size: 40px 40px, 20px 20px, 20px 20px;
          background-position: 0 0, 10px 10px, 10px 10px;
        }

        /* Noise texture */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Scan lines effect */
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(59, 130, 246, 0.1) 50%
          );
          background-size: 100% 4px;
        }

        /* Custom Scrollbar */
        *::-webkit-scrollbar {
          width: 6px;
          border-radius: 3px;
        }
        *::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.05);
          border-radius: 3px;
        }
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.7),
            rgba(109, 40, 217, 0.7)
          );
          border-radius: 3px;
          border: 1px solid rgba(59, 130, 246, 0.1);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.8),
            rgba(109, 40, 217, 0.8)
          );
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }

        /* CodeMirror enhancements */
        .cm-editor {
          font-family: "JetBrains Mono", monospace !important;
          background-color: rgba(8, 10, 21, 0.7) !important;
        }
        .cm-gutters {
          background-color: rgba(17, 24, 39, 0.4) !important;
          border-right: 1px solid rgba(59, 130, 246, 0.2) !important;
        }
        .cm-activeLineGutter {
          background-color: rgba(59, 130, 246, 0.1) !important;
        }
        .cm-activeLine {
          background-color: rgba(59, 130, 246, 0.07) !important;
        }
      `}</style>
    </div>
  );
};

export default CodeReviewApp;
