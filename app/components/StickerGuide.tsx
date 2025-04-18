import { REWARDS } from "@/types/student";

export default function StickerGuide() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">스티커 보상 안내</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {REWARDS.map(({ count, reward }) => (
          <div key={count} className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-4xl mb-2">{reward}</div>
            <div className="text-gray-600">
              <span className="font-bold">{count}</span> 스티커
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
