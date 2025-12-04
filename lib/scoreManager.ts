// /lib/scoreManager.ts

export function getScores() {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem("skillScores");
  return saved ? JSON.parse(saved) : {};
}

export function updateScore(skill: string, isCorrect: boolean) {
  if (typeof window === "undefined") return;

  const scores = getScores();

  // 若沒有分數 → 給預設 50 分
  if (!scores[skill]) {
    scores[skill] = 50;
  }

  // 答對 +10，答錯 -5
  if (isCorrect) {
    scores[skill] = Math.min(100, scores[skill] + 10);
  } else {
    scores[skill] = Math.max(0, scores[skill] - 5);
  }

  localStorage.setItem("skillScores", JSON.stringify(scores));
}
