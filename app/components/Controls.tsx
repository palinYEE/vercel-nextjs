"use client";

import { Student } from "@/types/student";
import { useEffect, useState } from "react";

interface ControlsProps {
  students: Student[];
  filteredStudents: Student[];
  setFilteredStudents: (students: Student[]) => void;
}

export default function Controls({
  students,
  filteredStudents,
  setFilteredStudents,
}: ControlsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "stickers">("stickers");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    let result = [...students];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((student) =>
        student.이름.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.이름.localeCompare(b.이름)
          : b.이름.localeCompare(a.이름);
      } else {
        return sortOrder === "asc" ? a.스티커 - b.스티커 : b.스티커 - a.스티커;
      }
    });

    setFilteredStudents(result);
  }, [students, searchTerm, sortBy, sortOrder, setFilteredStudents]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="학생 이름으로 검색..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "stickers")}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="stickers">스티커 순</option>
          <option value="name">이름 순</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <div className="text-gray-600">총 {filteredStudents.length}명의 학생</div>
    </div>
  );
}
