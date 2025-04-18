export interface Student {
  id: number;
  이름: string;
  담당교사: string;
  레벨: string;
  스티커: number;
  캐릭터: string;
}

export interface Teacher {
  id: number;
  이름: string;
}

export interface Level {
  id: number;
  이름: string;
}

export interface StudentAction {
  id?: number;
  이름: string;
  담당교사: string;
  레벨: string;
  스티커: number;
  캐릭터: string;
  action: "add" | "subtract" | "set";
}

export interface Reward {
  count: number;
  reward: string;
}

export const REWARDS: Reward[] = [
  { count: 50, reward: "🎮 게임기" },
  { count: 40, reward: "🎨 그림도구" },
  { count: 30, reward: "📚 책" },
  { count: 20, reward: "🍫 초콜릿" },
  { count: 10, reward: "🍬 사탕" },
];
