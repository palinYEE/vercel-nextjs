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

  useEffect(() => {
    let result = [...students];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((student) =>
        student.이름.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(result);
  }, [students, searchTerm, setFilteredStudents]);

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
      <div className="text-gray-600">총 {filteredStudents.length}명의 학생</div>
    </div>
  );
}
