import React from "react";
import Image from "next/image";

export default function SlideCard() {
  return (
    <main className="w-full h-full flex rounded-sm border-1 border-solid border-zinc-700 ">
      <Image
        width={540}
        height={600}
        src={"/images/guide/roomDesk.png"}
        alt="room-desk-chair"
      />
      <section className="w-[540px] h-[600px] bg-[#eedbcf] border-s-2 border-s-solid border-s-zinc-400 p-[24px]">
        <div className="w-full h-[60px] border-b-2 border-b-solid border-b-zinc-700 flex justify-start items-center">
          <h1 className="text-2xl font-bold">login, signup</h1>
        </div>
        <div className="w-full h-full pt-[24px]">
          책상 앞 의자를 클릭하여 계정을 만들고 로그인을 할 수 있어요.
        </div>
      </section>
    </main>
  );
}
