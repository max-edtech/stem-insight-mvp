"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecords, Record } from "@/app/utils/storage";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";

export default function AnalysisPage() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  // 📊 1. 技能雷達圖數據處理
  const skillStats = ["Knowledge", "Calculation", "Logic", "Observation"].map(skill => {
    const skillRecords = records.filter(r => r.skill === skill);
    const total = skillRecords.length;
    const correct = skillRecords.filter(r => r.isCorrect).length;
    // 如果沒做過題目，預設給 20 分避免雷達圖太醜
    const score = total === 0 ? 20 : Math.round((correct / total) * 100);
    return { subject: skill, score, fullMark: 100 };
  });

  // ⚠️ 2. 盲點誤區數據處理 (只算答錯的)
  const wrongRecords = records.filter(r => !r.isCorrect);
  const blindSpotCounts: { [key: string]: number } = {};
  wrongRecords.forEach(r => {
    blindSpotCounts[r.blindSpot] = (blindSpotCounts[r.blindSpot] || 0) + 1;
  });
  
  const blindSpotData = Object.keys(blindSpotCounts).map(key => ({
    name: key,
    count: blindSpotCounts[key]
  })).sort((a, b) => b.count - a.count); // 錯誤最多的排前面

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 font-mono flex flex-col items-center">
      
      {/* 導航 */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2">
          ⬅ Back to World
        </Link>
        <h1 className="text-2xl font-bold text-yellow-500 tracking-widest uppercase drop-shadow-md">
          Player Statistics
        </h1>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🕸️ 左側：技能雷達圖 (Skill Radar) */}
        <div className="bg-[#2c2c2c] border-4 border-gray-600 p-4 rounded-sm shadow-xl">
          <h2 className="text-center text-green-400 font-bold mb-4 uppercase text-lg border-b-2 border-gray-600 pb-2">
            Skill Proficiency
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillStats}>
                <PolarGrid stroke="#555" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ccc', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#82ca9d', color: '#fff' }}
                  itemStyle={{ color: '#82ca9d' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            *Based on quiz accuracy per skill type
          </p>
        </div>

        {/* ⚠️ 右側：盲點分析 (Blind Spot Analysis) */}
        <div className="bg-[#2c2c2c] border-4 border-gray-600 p-4 rounded-sm shadow-xl">
          <h2 className="text-center text-red-400 font-bold mb-4 uppercase text-lg border-b-2 border-gray-600 pb-2">
            Weakness Analysis
          </h2>
          
          {blindSpotData.length > 0 ? (
            <div className="h-64 w-full flex flex-col justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={blindSpotData} margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#fff', fontSize: 12 }} />
                  <Tooltip cursor={{fill: '#333'}} contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#f87171' }} />
                  <Bar dataKey="count" barSize={20} radius={[0, 4, 4, 0]}>
                    {blindSpotData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#fca5a5'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 text-center">
                 <p className="text-red-300 text-sm">
                   Main Threat: <span className="font-bold underline">{blindSpotData[0].name}</span>
                 </p>
                 <p className="text-gray-500 text-xs mt-1">
                   Fix this to boost your grade!
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500">
              <span className="text-4xl mb-2">🛡️</span>
              <p>No weaknesses detected yet.</p>
              <p className="text-xs">Go challenge some quizzes!</p>
            </div>
          )}
        </div>

      </div>

      {/* 底部建議 */}
      <div className="w-full max-w-4xl mt-8 bg-blue-900/30 border-2 border-blue-500/50 p-4 rounded text-center">
        <h3 className="text-blue-300 font-bold mb-1">🤖 AI Coach Tip</h3>
        <p className="text-gray-300 text-sm">
          {blindSpotData.length > 0 && blindSpotData[0].name === "Calculation" 
            ? "You are losing points on Math Calculation. Try double-checking your numbers before submitting!"
            : blindSpotData.length > 0 && blindSpotData[0].name === "Concept Error"
            ? "Concept Errors detected. Review the 'Biology' textbook in the Library before the next run."
            : "Your stats look balanced. Try the 'Desert' biome for a harder challenge!"}
        </p>
      </div>

    </div>
  );
}