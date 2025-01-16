"use client";

import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useModelLoadingStore } from "@/store/recoil/zustand/modelLoadingStore";
import dynamic from "next/dynamic";

// Canvas 관련 컴포넌트들을 동적으로 import
const PreloadScene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

const GuidePage = () => {
  const router = useRouter();
  const { progress, isComplete } = useModelLoadingStore();

  return (
    <>
      {/* 숨겨진 캔버스에서 모델 프리로딩 */}
      <div>
        <Canvas>
          <PreloadScene />
        </Canvas>
      </div>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 기존 가이드 내용 */}

          {/* 로딩 상태 표시 */}
          <div className="space-y-4">
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                3D 모델 로딩중... ({Math.round(progress)}%)
              </p>

              <button
                onClick={() => isComplete && router.push("/")}
                disabled={!isComplete}
                className={`
                w-full max-w-md py-3 px-6 rounded-lg font-medium transition-all
                ${
                  isComplete
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
              >
                {isComplete ? "3D 모델 보기" : "모델 로딩 중..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
