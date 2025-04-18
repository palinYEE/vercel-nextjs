"use client";

import { Student } from "@/types/student";

interface TopRankingProps {
  students: Student[];
}

export default function TopRanking({ students }: TopRankingProps) {
  const topStudents = [...students]
    .sort((a, b) => b.스티커 - a.스티커)
    .slice(0, 3);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">🏆 TOP 3</h2>
      <div className="flex justify-center gap-4">
        {topStudents.map((student, index) => (
          <div
            key={student.이름}
            className="bg-white shadow-lg rounded-lg p-6 text-center flex-1 max-w-xs transform hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-2">
              {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
            </div>
            <div className="text-xl font-bold mb-1">{student.이름}</div>
            <div className="text-3xl mb-2">{student.캐릭터 || "👤"}</div>
            <div className="text-gray-600">
              <span className="font-bold text-lg">{student.스티커}</span> 스티커
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
