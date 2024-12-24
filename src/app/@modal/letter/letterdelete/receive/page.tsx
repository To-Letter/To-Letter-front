"use client";
import LetterDeleteContents from "@/components/organisms/letter/LetterDeleteContents";
import { ReceiveLetters } from "@/components/organisms/letter/ReceiveLetters";

export default function ReceivePage() {
  return (
    <LetterDeleteContents>
      <ReceiveLetters />
    </LetterDeleteContents>
  );
}
