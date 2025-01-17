import SlideCard from "@/components/molecules/SlideCard";
import React from "react";

export default function Slide() {
  return (
    <div className="w-screen h-screen bg-[#7b5d54] flex justify-center items-center">
      <div className="w-1080 h-600 shadow-lg">
        <SlideCard />
      </div>
    </div>
  );
}
