import React from "react";
import Image from "next/image";

interface SlideCardProps {
  imgSrc: string;
  imgAlt: string;
  guideHeader: string;
  guideContents: string;
}

export default function SlideCard({
  imgSrc,
  imgAlt,
  guideHeader,
  guideContents,
}: SlideCardProps) {
  return (
    <main className="w-full h-full flex rounded-sm border border-solid border-zinc-700">
      <Image
        width={540}
        height={600}
        src={imgSrc}
        alt={imgAlt}
        className="object-cover"
      />
      <section className="w-[540px] h-[600px] bg-[#eedbcf] border-l-2 border-solid border-zinc-400 p-[24px]">
        <div className="w-full h-[60px] border-b-2 border-solid border-zinc-700 flex items-center">
          <h1 className="text-2xl font-bold">{guideHeader}</h1>
        </div>
        <div className="w-full h-full pt-[24px] whitespace-pre-line">
          {guideContents}
        </div>
      </section>
    </main>
  );
}
