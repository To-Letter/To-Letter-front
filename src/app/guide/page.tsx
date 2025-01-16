import React from "react";
import GuidePage from "@/components/template/GuidePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TO. Letter - 가이드",
  description:
    "계정 관리, 편지 쓰기, 편지 읽기, 편지 버리기 기능 등 To. Letter의 사용 방법을 확인하세요!",
};

export default function page() {
  return <GuidePage />;
}
