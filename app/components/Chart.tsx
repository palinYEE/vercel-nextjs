"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Student } from "@/types/student";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  students: Student[];
}

export default function Chart({ students }: ChartProps) {
  const maxStickers = Math.max(...students.map((s) => s.스티커));
  const totalStickers = students.reduce((sum, s) => sum + s.스티커, 0);
  const averageStickers = Math.round(totalStickers / students.length) || 0;

  const distribution = Array.from({ length: 6 }, (_, i) => {
    const min = i * 10;
    const max = (i + 1) * 10 - 1;
    const count = students.filter(
      (s) => s.스티커 >= min && s.스티커 <= max
    ).length;
    return { min, max, count };
  });

  const maxCount = Math.max(...distribution.map((d) => d.count));

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">📊 통계</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">스티커 분포</h3>
          <div className="space-y-2">
            {distribution.map(({ min, max, count }) => (
              <div key={min} className="flex items-center gap-2">
                <div className="w-20 text-sm">
                  {min}~{max}개
                </div>
                <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${(count / maxCount) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-8 text-right text-sm">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">요약</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">총 스티커</div>
              <div className="text-2xl font-bold">{totalStickers}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">평균</div>
              <div className="text-2xl font-bold">{averageStickers}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">최고</div>
              <div className="text-2xl font-bold">{maxStickers}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">학생 수</div>
              <div className="text-2xl font-bold">{students.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
