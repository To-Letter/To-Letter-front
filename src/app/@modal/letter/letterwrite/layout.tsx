"use client";
import React from "react";
import ModalBox from "@/components/atoms/ModalBox";

export default function LetterWriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalBox isExitBtn={false}>{children}</ModalBox>;
}
