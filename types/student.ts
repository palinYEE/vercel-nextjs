export interface Student {
  이름: string;
  스티커: number;
  캐릭터?: string;
}

export interface StudentAction {
  이름: string;
  스티커: number;
  캐릭터?: string;
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
