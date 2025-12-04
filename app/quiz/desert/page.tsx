"use client";

import { questions } from "@/app/data/questions"; 
import QuestionCard from "@/app/components/QuestionCard";
import Link from "next/link"; // ✅ 引入連結

export default function DesertQuizPage() {
  const quizData = questions.filter((q) => q.biome === "desert");

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
      
      {/* ⬅️ 返回 Dashboard 按鈕 */}
      <div className="w-full max-w-2xl mb-6">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-orange-700">Desert Biome Quiz</h1>
      
      {quizData.length > 0 ? (
        quizData.map((question) => (
          <QuestionCard key={question.id} data={question} />
        ))
      ) : (
        <p className="text-slate-500">No questions found for this category.</p>
      )}
    </div>
  );
}