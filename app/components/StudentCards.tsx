"use client";

import { Student, StudentAction } from "@/types/student";

interface StudentCardsProps {
  students: Student[];
  onStudentAction: (action: StudentAction) => void;
  getReward: (count: number) => string;
}

export default function StudentCards({
  students,
  onStudentAction,
  getReward,
}: StudentCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{student.캐릭터}</div>
            <div className="text-xl font-bold">{student.이름}</div>
            <div className="text-sm text-gray-600">
              {student.담당교사} | {student.레벨}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mb-4">
            <button
              onClick={() =>
                onStudentAction({
                  id: student.id,
                  이름: student.이름,
                  담당교사: student.담당교사,
                  레벨: student.레벨,
                  스티커: 1,
                  캐릭터: student.캐릭터,
                  action: "subtract",
                })
              }
              className="bg-red-100 hover:bg-red-200 text-red-600 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              -
            </button>
            <div className="text-2xl font-bold w-16 text-center">
              {student.스티커}
            </div>
            <button
              onClick={() =>
                onStudentAction({
                  id: student.id,
                  이름: student.이름,
                  담당교사: student.담당교사,
                  레벨: student.레벨,
                  스티커: 1,
                  캐릭터: student.캐릭터,
                  action: "add",
                })
              }
              className="bg-green-100 hover:bg-green-200 text-green-600 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              +
            </button>
          </div>

          {student.스티커 > 0 && (
            <div className="text-center text-gray-600 mt-auto">
              <div className="text-sm mb-1">현재 보상</div>
              <div className="text-2xl">{getReward(student.스티커)}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
