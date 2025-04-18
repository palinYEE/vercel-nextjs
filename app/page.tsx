import { Metadata } from "next";
import StickerBoard from "./components/StickerBoard";

export const metadata: Metadata = {
  title: "칭찬 스티커판",
  description: "학생들의 칭찬 스티커를 관리하는 웹 애플리케이션",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">칭찬 스티커판</h1>
      <StickerBoard />
    </main>
  );
}
