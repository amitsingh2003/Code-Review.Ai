import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  javascript,
  python,
  typescript,
  jsx,
  css,
} from "react-syntax-highlighter/dist/esm/languages/prism";
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Code,
  AlertOctagon,
  Zap,
  Flame,
  ArrowUp,
  Star,
} from "lucide-react";

SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("tsx", jsx);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("html", html);

const ReviewOutput = ({ review }) => {
  if (!review) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <Star className="w-10 h-10 text-violet-400 mb-3 opacity-70" />
        <p className="text-violet-300 font-medium">Awaiting Code Submission</p>
        <p className="text-sm mt-2 text-gray-400 max-w-sm">
          Submit your code to receive AI-powered insights and optimizations.
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-full overflow-y-auto p-6 text-gray-300"
    >
      <ReactMarkdown
        components={{
          h1: ({ node, children, ...props }) => (
            <motion.h1
              variants={itemVariants}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent py-2 border-b border-gray-700 mb-4"
              {...props}
            >
              {children}
            </motion.h1>
          ),
          h2: ({ node, children, ...props }) => {
            let Icon = Info;
            let colorClass = "text-blue-400";

            if (children[0]?.toLowerCase().includes("improvement")) {
              Icon = ArrowUp;
              colorClass = "text-green-400";
            } else if (
              children[0]?.toLowerCase().includes("issue") ||
              children[0]?.toLowerCase().includes("warning")
            ) {
              Icon = AlertTriangle;
              colorClass = "text-yellow-400";
            } else if (
              children[0]?.toLowerCase().includes("error") ||
              children[0]?.toLowerCase().includes("critical")
            ) {
              Icon = AlertOctagon;
              colorClass = "text-red-400";
            } else if (children[0]?.toLowerCase().includes("performance")) {
              Icon = Zap;
              colorClass = "text-cyan-400";
            } else if (children[0]?.toLowerCase().includes("best practice")) {
              Icon = CheckCircle;
              colorClass = "text-violet-400";
            } else if (children[0]?.toLowerCase().includes("optimization")) {
              Icon = Flame;
              colorClass = "text-orange-400";
            }

            return (
              <motion.h2
                variants={itemVariants}
                className={`text-lg font-bold mt-6 mb-3 flex items-center gap-2 ${colorClass}`}
                {...props}
              >
                <Icon className="w-5 h-5" />
                {children}
              </motion.h2>
            );
          },
          h3: ({ node, children, ...props }) => (
            <motion.h3
              variants={itemVariants}
              className="text-md font-semibold text-blue-300 mt-4 mb-2"
              {...props}
            >
              {children}
            </motion.h3>
          ),
          p: ({ node, children, ...props }) => (
            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-4 leading-relaxed"
              {...props}
            >
              {children}
            </motion.p>
          ),
          ul: ({ node, children, ...props }) => (
            <motion.ul
              variants={itemVariants}
              className="list-disc pl-5 text-gray-300 mb-4 space-y-2"
              {...props}
            >
              {children}
            </motion.ul>
          ),
          ol: ({ node, children, ...props }) => (
            <motion.ol
              variants={itemVariants}
              className="list-decimal pl-5 text-gray-300 mb-4 space-y-2"
              {...props}
            >
              {children}
            </motion.ol>
          ),
          li: ({ node, children, ...props }) => (
            <li className="text-gray-300 mb-1 pl-1" {...props}>
              {children}
            </li>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "javascript";

            return !inline ? (
              <motion.div
                variants={itemVariants}
                className="relative my-4 rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <Code className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-mono text-gray-300">
                    {language}
                  </span>
                </div>
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  className="rounded-b-lg text-sm shadow-inner border border-gray-800"
                  wrapLines={false}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "rgb(22, 27, 34)",
                    whiteSpace: "pre",
                    lineBreak: "auto",
                    wordBreak: "normal",
                    overflowWrap: "normal",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </motion.div>
            ) : (
              <code
                className="bg-gray-800 text-violet-300 px-1 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ node, children, ...props }) => (
            <motion.blockquote
              variants={itemVariants}
              className="border-l-4 border-blue-500 pl-4 pr-2 py-1 bg-gray-800/50 rounded-r my-4"
              {...props}
            >
              {children}
            </motion.blockquote>
          ),

          hr: ({ node, ...props }) => (
            <motion.hr
              variants={itemVariants}
              className="my-6 border-gray-700"
              {...props}
            />
          ),

          table: ({ node, children, ...props }) => (
            <motion.div
              variants={itemVariants}
              className="overflow-x-auto my-4"
            >
              <table
                className="min-w-full border border-gray-700 rounded-lg overflow-hidden"
                {...props}
              >
                {children}
              </table>
            </motion.div>
          ),
          thead: ({ node, children, ...props }) => (
            <thead className="bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ node, children, ...props }) => (
            <tbody className="divide-y divide-gray-700" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ node, children, ...props }) => (
            <tr className="hover:bg-gray-800/50" {...props}>
              {children}
            </tr>
          ),
          th: ({ node, children, ...props }) => (
            <th
              className="px-4 py-3 text-left text-sm font-medium text-blue-300"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ node, children, ...props }) => (
            <td className="px-4 py-3 text-sm" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {review}
      </ReactMarkdown>
    </motion.div>
  );
};

export default ReviewOutput;
