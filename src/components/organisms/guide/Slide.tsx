"use client";
import React, { useRef, useState, useEffect } from "react";
import { guideValue } from "@/lib/constants/guideValue";
import SlideCard from "@/components/molecules/SlideCard"; // Server Component
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Slide() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const totalSlides = guideValue.length;

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -1080, behavior: "smooth" });
      setCurrentIndex((prev) => Math.max(prev - 1, 0)); // 인덱스 감소
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 1080, behavior: "smooth" });
      setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1)); // 인덱스 증가
    }
  };

  // 스크롤 상태를 추적하여 현재 인덱스를 동기화
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const scrollPosition = sliderRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / 1080); // 슬라이드 하나의 너비를 기준으로 계산
        setCurrentIndex(newIndex);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#7b5d54] flex justify-center items-center">
      <div className="relative w-[1080px] h-[600px] shadow-lg overflow-hidden">
        <div
          ref={sliderRef}
          className="flex w-full h-full overflow-x-scroll scroll-smooth no-scrollbar"
        >
          {guideValue.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <SlideCard
                imgSrc={item.imgSrc}
                imgAlt={item.imgAlt}
                guideHeader={item.guideHeader}
                guideContents={item.guideContents}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 왼쪽 버튼 */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[12px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 flex justify-center items-center rounded-full hover:bg-opacity-75"
        >
          <FaArrowLeft />
        </button>
      )}
      {/* 오른쪽 버튼 */}
      {currentIndex < totalSlides - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-[12px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 flex justify-center items-center rounded-full hover:bg-opacity-75"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}
