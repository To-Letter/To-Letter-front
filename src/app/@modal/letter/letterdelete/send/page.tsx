"use client";
import LetterDeleteContents from "@/components/organisms/letter/LetterDeleteContents";
import { SendLetters } from "@/components/organisms/letter/SendLetters";

export default function SendPage() {
  return (
    <LetterDeleteContents>
      <SendLetters />
    </LetterDeleteContents>
  );
}
