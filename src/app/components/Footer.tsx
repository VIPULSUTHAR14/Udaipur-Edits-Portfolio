"use client";
import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";

export default function Footer() {
  const [hasCopied, sethasCopied] = useState(false);
  const handlecopy = () => {
    navigator.clipboard.writeText("DevendraSuthar@gmail.com");
    sethasCopied(true);
    setTimeout(() => {
      sethasCopied(false);
    }, 2000);
  };

  return (
    <footer className="flex flex-col min-h-[30vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-inner rounded-t-2xl border-t border-gray-700">
      <div className="flex justify-center p-6">
        <p className="font-mono text-lg md:text-xl text-gray-100 text-center max-w-2xl drop-shadow">
          Thank you for taking the time to review my portfolio. I look forward
          to the opportunity to work with you
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="flex gap-3 items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 shadow-lg group"
          onClick={handlecopy}
          aria-label="Copy email address"
        >
          <Mail className="text-cyan-400 group-hover:text-cyan-300 w-6 h-6" />
          <span className="xl:text-lg md:text-xl font-mono text-cyan-300 group-hover:text-cyan-200 select-all">
            DevendraSuthar@gmail.com
          </span>
          {hasCopied ? (
            <Check className="w-6 h-6 text-green-400 animate-bounce" />
          ) : (
            <Copy className="w-6 h-6 text-gray-400 group-hover:text-cyan-200" />
          )}
          <span className="ml-2 text-xs text-green-400 font-mono transition-opacity duration-300" style={{ opacity: hasCopied ? 1 : 0 }}>
            Copied!
          </span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-6">
        <a
          href="https://www.instagram.com/udaipur.editz"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 text-xl font-mono rounded-lg bg-gradient-to-r from-pink-400 via-orange-300 to-pink-400 text-transparent bg-clip-text hover:from-pink-500 hover:to-orange-400 transition-all"
        >
          Instagram
        </a>
        <a
          href="https://www.youtube.com/@udaipureditz"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 text-xl font-mono rounded-lg bg-gradient-to-r from-red-500 via-white to-red-400 text-transparent bg-clip-text hover:from-red-600 hover:to-white transition-all"
        >
          Youtube
        </a>
      </div>
    </footer>
  );
}
