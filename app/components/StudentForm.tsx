"use client";

import { useState } from "react";
import { Student, StudentAction, Teacher, Level } from "@/types/student";

interface StudentFormProps {
  students: Student[];
  teachers: Teacher[];
  levels: Level[];
  selectedCharacter: string;
  setSelectedCharacter: (character: string) => void;
  onStudentAction: (action: StudentAction) => void;
  onAddTeacher: (teacherName: string) => void;
  onAddLevel: (levelName: string) => void;
}

export default function StudentForm({
  students,
  teachers,
  levels,
  selectedCharacter,
  setSelectedCharacter,
  onStudentAction,
  onAddTeacher,
  onAddLevel,
}: StudentFormProps) {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [level, setLevel] = useState("");
  const [stickerCount, setStickerCount] = useState(1);
  const [newTeacher, setNewTeacher] = useState("");
  const [newLevel, setNewLevel] = useState("");

  const handleSubmit = () => {
    if (!name || !teacher || !level || !selectedCharacter) return;

    const studentAction: StudentAction = {
      이름: name,
      담당교사: teacher,
      레벨: level,
      스티커: stickerCount,
      캐릭터: selectedCharacter,
      action: "set",
    };

    onStudentAction(studentAction);
    setName("");
    setLevel("");
    setStickerCount(1);
  };

  const handleAddNewTeacher = () => {
    if (!newTeacher) return;
    onAddTeacher(newTeacher);
    setNewTeacher("");
  };

  const handleAddNewLevel = () => {
    if (!newLevel) return;
    onAddLevel(newLevel);
    setNewLevel("");
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
          담당교사
        </label>
        <div className="flex gap-2">
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">선생님을 선택하세요</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.이름}>
                {t.이름}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTeacher}
              onChange={(e) => setNewTeacher(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="새 선생님"
            />
            <button
              onClick={handleAddNewTeacher}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              추가
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          레벨
        </label>
        <div className="flex gap-2">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">레벨을 선택하세요</option>
            {levels.map((l) => (
              <option key={l.id} value={l.이름}>
                {l.이름}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="새 레벨"
            />
            <button
              onClick={handleAddNewLevel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              추가
            </button>
          </div>
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
        />
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

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        학생 추가
      </button>
    </div>
  );
}
