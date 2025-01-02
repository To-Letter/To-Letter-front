"use client";

import React from "react";
import { styled } from "styled-components";
import { SectionBox } from "@/components/atoms/Box";
import { CgPlayListCheck } from "react-icons/cg";
import { IoTrashBinSharp } from "react-icons/io5";

interface DeleteLetterButtonProps {
  handleSelectAllClick: () => void;
  handelDeleteConfirm: () => void;
}

export default function DeleteLetterButton({
  handleSelectAllClick,
  handelDeleteConfirm,
}: DeleteLetterButtonProps) {
  return (
    <SectionBox>
      <LetterAllCheckButton onClick={handleSelectAllClick}>
        <CgPlayListCheck />
      </LetterAllCheckButton>
      <LetterDeleteButton onClick={handelDeleteConfirm}>
        <IoTrashBinSharp />
      </LetterDeleteButton>
    </SectionBox>
  );
}

const LetterAllCheckButton = styled.button`
  position: absolute;
  bottom: 60px;
  right: 12px;
  width: 50px;
  height: 50px;
  background-color: #636363;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #8d8d8d;
  }
`;

const LetterDeleteButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 12px;
  width: 50px;
  height: 50px;
  background-color: #b84d4d;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #e75252;
  }
`;
