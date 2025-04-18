export interface Student {
  이름: string;
  담당교사: string;
  레벨: string;
  스티커: number;
  캐릭터: string;
}

export interface StudentAction {
  action: "newStudent" | "sticker_plus" | "sticker_minus";
  student?: {
    이름: string;
  };
  이름?: string;
  담당교사?: string;
  레벨?: string;
  스티커?: number;
  캐릭터?: string;
}

export interface Reward {
  count: number;
  reward: string;
}

export const REWARDS: Reward[] = [
  { count: 50, reward: "알뜰매장 상품 구매" },
  { count: 40, reward: "랜덤박스 1개 획득" },
  { count: 30, reward: "3D 프린팅 랜덤뽑기" },
  { count: 20, reward: "뽑기 2번 돌리기" },
  { count: 10, reward: "3D 프린팅 1개" },
  { count: 5, reward: "뽑기 1번 돌리기" },
];
