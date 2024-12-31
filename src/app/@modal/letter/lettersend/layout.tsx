"use client";
import ModalBox from "@/components/atoms/ModalBox";
import React from "react";

export default function UserConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalBox isExitBtn={false} $width="400px">
      {children}
    </ModalBox>
  );
}
