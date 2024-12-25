"use client";
import ModalBox from "@/components/atoms/ModalBox";
import React from "react";

export default function UserConfirmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalBox $width="400px" $padding="4px">
      {children}
    </ModalBox>
  );
}
