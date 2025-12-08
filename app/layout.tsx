// 檔案： app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; 
import "./globals.css"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Hao Hao School",
  description: "Advanced STEM Learning",
};

// ⚠️ 這裡絕對不能有任何 UI 或 BackgroundMusic
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black`}>
        {/* 這個 children 會變成你現在訪問的頁面 (例如 Quiz) */}
        {children}
      </body>
    </html>
  );
}