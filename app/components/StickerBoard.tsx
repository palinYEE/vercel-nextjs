"use client";

import { useState, useEffect } from "react";
import { Student, StudentAction, REWARDS } from "@/types/student";
import { supabase } from "@/lib/supabase";
import StickerGuide from "./StickerGuide";
import StudentForm from "./StudentForm";
import Controls from "./Controls";
import TopRanking from "./TopRanking";
import Chart from "./Chart";
import StudentCards from "./StudentCards";

export default function StickerBoard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("스티커", { ascending: false });

      if (error) throw error;

      setStudents(data || []);
      setFilteredStudents(data || []);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentAction = async (action: StudentAction) => {
    try {
      if (action.action === "add" || action.action === "subtract") {
        const { data: student } = await supabase
          .from("students")
          .select("*")
          .eq("이름", action.이름)
          .single();

        if (!student) throw new Error("Student not found");

        const newStickerCount =
          action.action === "add"
            ? student.스티커 + action.스티커
            : Math.max(0, student.스티커 - action.스티커);

        const { error } = await supabase
          .from("students")
          .update({ 스티커: newStickerCount })
          .eq("id", student.id);

        if (error) throw error;
      } else if (action.action === "set") {
        const { error } = await supabase.from("students").insert({
          이름: action.이름,
          담당교사: action.담당교사,
          레벨: action.레벨,
          스티커: action.스티커,
          캐릭터: action.캐릭터,
        });

        if (error) throw error;
      }

      loadStudents();
    } catch (error) {
      console.error("Error performing student action:", error);
    }
  };

  const getReward = (count: number): string => {
    const reward = REWARDS.find((r) => count >= r.count);
    return reward ? reward.reward : "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <StickerGuide />

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StudentForm
          students={students}
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          onStudentAction={handleStudentAction}
        />
      </div>

      <Controls
        students={students}
        filteredStudents={filteredStudents}
        setFilteredStudents={setFilteredStudents}
      />

      <TopRanking students={filteredStudents} />

      <Chart students={filteredStudents} />

      <StudentCards
        students={filteredStudents}
        onStudentAction={handleStudentAction}
        getReward={getReward}
      />
    </div>
  );
}
