"use client";
import ModalBox from "@/components/atoms/ModalBox";
import AddressHeader from "@/components/molecules/AddressHeader";
import React from "react";

/**
 * authheader 중첩 레이아웃으로 인한 분리
 */
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ModalBox $direction="column" $height="500px" isExitBtn={false}>
      <AddressHeader />
      {children}
    </ModalBox>
  );
}
