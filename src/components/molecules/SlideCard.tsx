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
    <main className="tw-w-full tw-h-full tw-flex tw-rounded-sm tw-border tw-border-solid tw-border-zinc-700">
      <Image
        width={540}
        height={600}
        src={imgSrc}
        alt={imgAlt}
        className="tw-object-cover"
      />
      <section className="tw-w-[540px] tw-h-[600px] tw-bg-[#eedbcf] tw-border-l-2 tw-border-solid tw-border-zinc-400 tw-p-[24px]">
        <div className="tw-w-full tw-h-[60px] tw-border-b-2 tw-border-solid tw-border-zinc-700 tw-flex tw-items-center">
          <h1 className="tw-text-2xl tw-text-black tw-font-bold">
            {guideHeader}
          </h1>
        </div>
        <div className="tw-w-full tw-h-full tw-pt-[24px] tw-text-black tw-whitespace-pre-line">
          {guideContents}
        </div>
      </section>
    </main>
  );
}
