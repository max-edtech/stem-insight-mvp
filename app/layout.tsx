import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ 引入元件 (使用相對路徑 ./ 以避免路徑錯誤)
import Protection from "./components/Protection";
import Footer from "./components/Footer";
import BackgroundMusic from "./components/BackgroundMusic"; // 🎵 新增音樂元件

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STEM INSIGHT",
  description: "Interactive Bio-Math Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ 加入 'select-none' 禁止文字被反白選取
    <html lang="en" className="select-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🛡️ 全域防護罩 (浮水印 + 禁右鍵) */}
        <Protection />
        
        {/* 🎵 全域背景音樂 (懸浮按鈕) */}
        <BackgroundMusic />

        {/* 頁面主要內容結構 */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          
          {/* 🦶 全域版權頁尾 */}
          <Footer />
        </div>
      </body>
    </html>
  );
}