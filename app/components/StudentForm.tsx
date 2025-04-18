"use client";

import { useState } from "react";
import { Student, StudentAction } from "@/types/student";

interface StudentFormProps {
  students: Student[];
  selectedCharacter: string;
  setSelectedCharacter: (character: string) => void;
  onStudentAction: (action: StudentAction) => void;
}

export default function StudentForm({
  students,
  selectedCharacter,
  setSelectedCharacter,
  onStudentAction,
}: StudentFormProps) {
  const [name, setName] = useState("");
  const [stickerCount, setStickerCount] = useState(1);

  const handleSubmit = (action: "add" | "subtract" | "set") => {
    if (!name) return;

    const studentAction: StudentAction = {
      이름: name,
      스티커: stickerCount,
      캐릭터: selectedCharacter,
      action,
    };

    onStudentAction(studentAction);
    setName("");
    setStickerCount(1);
  };

  const characters = [
    "🐶",
    "🐱",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐸",
  ];

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          캐릭터 선택
        </label>
        <div className="grid grid-cols-5 gap-2">
          {characters.map((char) => (
            <button
              key={char}
              onClick={() => setSelectedCharacter(char)}
              className={`text-2xl p-2 rounded ${
                selectedCharacter === char
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          학생 이름
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="이름을 입력하세요"
          list="student-names"
        />
        <datalist id="student-names">
          {students.map((student) => (
            <option key={student.이름} value={student.이름} />
          ))}
        </datalist>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          스티커 개수
        </label>
        <input
          type="number"
          value={stickerCount}
          onChange={(e) =>
            setStickerCount(Math.max(1, parseInt(e.target.value) || 0))
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          min="1"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleSubmit("add")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1"
        >
          추가
        </button>
        <button
          onClick={() => handleSubmit("subtract")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1"
        >
          차감
        </button>
        <button
          onClick={() => handleSubmit("set")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1"
        >
          설정
        </button>
      </div>
    </div>
  );
}
