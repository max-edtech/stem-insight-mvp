import { questions } from "@/app/data/questions";
// ✅ 改為引入我們剛寫好的 getStoredSubjectStats
import { getStoredSubjectStats } from "@/app/utils/storage";

export const getSubjectProgress = (targetId: string, type: 'biome' | 'subject') => {
  
  // 1. 找出這個目標 (Biome 或 Subject) 總共有多少題目
  let targetQuestions = [];
  
  if (type === 'biome') {
    // 如果是算世界的進度 (例如 grass)
    targetQuestions = questions.filter(q => q.biome === targetId);
  } else {
    // 如果是算單科的進度 (例如 math)
    targetQuestions = questions.filter(q => q.subject === targetId);
  }

  const totalGoal = targetQuestions.length;
  
  // 如果沒有題目，進度就是 0
  if (totalGoal === 0) return { total: 0, percentage: 0 };

  // 2. 找出這個範圍內包含哪些科目
  const involvedSubjects = Array.from(new Set(targetQuestions.map(q => q.subject)));
  
  // 3. 從 Storage 讀取這些科目的當前進度
  let currentTotal = 0;
  
  involvedSubjects.forEach(subject => {
     // 呼叫新的儲存讀取函式
     const stats = getStoredSubjectStats(subject);
     
     // 這裡做一個簡單的累加：如果我們在這個世界有 Math，就把 Math 的做題數加進來
     // (這是一個 MVP 的簡化算法，讓進度條能動起來)
     if (type === 'subject') {
         currentTotal = stats.total; // 如果是查單科，直接用該科總數
     } else {
         // 如果是查 Biome，我們把該 Biome 相關科目的做題數加總
         // 為了避免別的世界做的題也算進來導致超過 100%，我們後面會取 min
         currentTotal += stats.total;
     }
  });
  
  // 4. 計算百分比 (限制最大 100%)
  // 如果你在 Forest 做了 Math，回到 Plains (也有 Math) 進度也會增加，這是符合 RPG 技能共通的邏輯
  const percentage = totalGoal > 0 ? Math.min(100, Math.round((currentTotal / totalGoal) * 100)) : 0;

  return {
    total: currentTotal,
    percentage: percentage
  };
};