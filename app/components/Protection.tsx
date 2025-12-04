"use client";

import { useEffect } from "react";

export default function Protection() {
  useEffect(() => {
    // 🚫 禁止右鍵
    const handleContext = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 🚫 禁止特定鍵盤快捷鍵 (選用)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" || 
        (e.ctrlKey && e.key === "u") || 
        (e.ctrlKey && e.shiftKey && e.key === "i")
      ) {
        // e.preventDefault(); 
      }
    };

    document.addEventListener("contextmenu", handleContext);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContext);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden opacity-10 select-none">
      <div className="rotate-[-30deg] text-4xl md:text-9xl font-black text-gray-500 whitespace-nowrap">
        STEM INSIGHT MVP • CONFIDENTIAL
      </div>
    </div>
  );
}