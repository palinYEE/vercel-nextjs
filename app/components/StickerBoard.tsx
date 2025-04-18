"use client";

import { useState, useEffect } from "react";
import { Student, StudentAction, REWARDS } from "@/types/student";
import StickerGuide from "./StickerGuide";
import StudentForm from "./StudentForm";
import Controls from "./Controls";
import TopRanking from "./TopRanking";
import Chart from "./Chart";
import StudentCards from "./StudentCards";
import Papa from "papaparse";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1LIDAJQG5YzPnkMKvua4q0KFJkf_lqdbFxEioeboVgDg/gviz/tq?tqx=out:csv";
const POST_URL =
  "https://script.google.com/macros/s/AKfycbxs24oMJ8KbcFnG_4y56nJ_-vy3nk-b9KXLtBqtHEjjm-vFqtXQK_XzylmqgYau6yRd/exec";

export default function StickerBoard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch(SHEET_URL);
      const text = await response.text();
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      const loadedStudents = parsed.data.map((s: any) => ({
        ...s,
        스티커: parseInt(s.스티커 || "0"),
      }));

      setStudents(loadedStudents);
      setFilteredStudents(loadedStudents);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const handleStudentAction = async (action: StudentAction) => {
    try {
      await fetch(POST_URL, {
        method: "POST",
        body: JSON.stringify(action),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      });
      loadStudents();
    } catch (error) {
      console.error("Error performing student action:", error);
    }
  };

  const getReward = (count: number): string => {
    const reward = REWARDS.find((r) => count >= r.count);
    return reward ? reward.reward : "";
  };

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
