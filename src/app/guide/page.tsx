import React from "react";
import GuidePage from "@/components/template/GuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D 모델 사용 가이드",
  description: "3D 모델 사용 방법과 인터랙션 가이드를 확인하세요.",
};

export default function page() {
  return <GuidePage />;
}
