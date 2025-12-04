// app/utils/progress.tsx
import { questions } from "@/app/data/questions";
import { getRecords } from "./storage"; // ✅ 改用新的 storage 工具

// 自動抓出所有科目 (這段邏輯不變，但建議擴充抓 biome)
export function getSubjectList() {
  const subjects = new Set<string>();
  questions.forEach((q) => subjects.add(q.subject));
  return Array.from(subjects);
}

// 📊 計算某科目的進度 (大幅升級)
export function getSubjectProgress(identifier: string, type: 'subject' | 'biome' = 'subject') {
  // 1. 先找出該範圍內的所有「題目總數」
  const targetQuestions = questions.filter((q) => 
    type === 'subject' ? q.subject === identifier : q.biome === identifier
  );

  const total = targetQuestions.length;

  // 2. 讀取使用者所有「作答紀錄」
  const allRecords = getRecords();

  let correct = 0;
  let wrong = 0;

  // 3. 比對每一題
  targetQuestions.forEach((q) => {
    // 在紀錄中找這題
    const record = allRecords.find((r) => r.questionId === q.id);

    if (record) {
      if (record.isCorrect) {
        correct++;
      } else {
        wrong++;
      }
    }
  });

  const completed = correct + wrong;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { identifier, total, correct, wrong, completed, percentage };
}