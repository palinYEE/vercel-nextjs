"use client";

import { useState, useEffect } from "react";
import {
  Student,
  StudentAction,
  Teacher,
  Level,
  REWARDS,
} from "@/types/student";
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
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Load students
      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("*")
        .order("id", { ascending: true });

      if (studentsError) throw studentsError;

      // Load teachers
      const { data: teachersData, error: teachersError } = await supabase
        .from("teachers")
        .select("*")
        .order("id", { ascending: true });

      if (teachersError) throw teachersError;

      // Load levels
      const { data: levelsData, error: levelsError } = await supabase
        .from("levels")
        .select("*")
        .order("id", { ascending: true });

      if (levelsError) throw levelsError;

      setStudents(studentsData || []);
      setFilteredStudents(studentsData || []);
      setTeachers(teachersData || []);
      setLevels(levelsData || []);
    } catch (error) {
      console.error("Error loading data:", error);
      setNotification({
        message: "데이터를 불러오는데 실패했습니다.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getNextId = (table: "students" | "teachers" | "levels"): number => {
    switch (table) {
      case "students":
        if (students.length === 0) return 1;
        return Math.max(...students.map((student) => student.id)) + 1;
      case "teachers":
        if (teachers.length === 0) return 1;
        return Math.max(...teachers.map((teacher) => teacher.id)) + 1;
      case "levels":
        if (levels.length === 0) return 1;
        return Math.max(...levels.map((level) => level.id)) + 1;
    }
  };

  const handleStudentAction = async (action: StudentAction) => {
    try {
      if (action.action === "set") {
        const nextId = getNextId("students");

        // Create new student with manual ID
        const { data, error } = await supabase
          .from("students")
          .insert({
            id: nextId,
            이름: action.이름,
            담당교사: action.담당교사,
            레벨: action.레벨,
            스티커: action.스티커,
            캐릭터: action.캐릭터,
          })
          .select()
          .single();

        if (error) throw error;

        // Add new student to the end of the list
        if (data) {
          setStudents((prevStudents) => [...prevStudents, data]);
          setFilteredStudents((prevStudents) => [...prevStudents, data]);
          setNotification({
            message: `${action.이름} 학생이 추가되었습니다.`,
            type: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error performing student action:", error);
      setNotification({ message: "학생 추가에 실패했습니다.", type: "error" });
    }
  };

  const handleAddTeacher = async (teacherName: string) => {
    try {
      const nextId = getNextId("teachers");

      const { data, error } = await supabase
        .from("teachers")
        .insert({
          id: nextId,
          이름: teacherName,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTeachers((prevTeachers) => [...prevTeachers, data]);
        setNotification({
          message: `${teacherName} 선생님이 추가되었습니다.`,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
      setNotification({
        message: "선생님 추가에 실패했습니다.",
        type: "error",
      });
    }
  };

  const handleAddLevel = async (levelName: string) => {
    try {
      const nextId = getNextId("levels");

      const { data, error } = await supabase
        .from("levels")
        .insert({
          id: nextId,
          이름: levelName,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setLevels((prevLevels) => [...prevLevels, data]);
        setNotification({
          message: `${levelName} 레벨이 추가되었습니다.`,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error adding level:", error);
      setNotification({ message: "레벨 추가에 실패했습니다.", type: "error" });
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
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}

      <StickerGuide />

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <StudentForm
          students={students}
          teachers={teachers}
          levels={levels}
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          onStudentAction={handleStudentAction}
          onAddTeacher={handleAddTeacher}
          onAddLevel={handleAddLevel}
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
