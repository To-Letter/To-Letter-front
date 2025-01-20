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
    <div className="tw-w-screen tw-h-screen tw-bg-[#7b5d54] tw-flex tw-justify-center tw-items-center">
      <div className="tw-relative tw-w-[1080px] tw-h-[600px] tw-shadow-lg tw-overflow-hidden">
        <div
          ref={sliderRef}
          className="tw-flex tw-w-full tw-h-full tw-overflow-x-scroll tw-scroll-smooth tw-no-scrollbar"
        >
          {guideValue.map((item, index) => (
            <div key={index} className="tw-flex-shrink-0 tw-w-full tw-h-full">
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
          className="tw-absolute tw-left-[12px] tw-top-1/2 tw-transform tw-translate-y-1/2 tw-bg-black tw-bg-opacity-50 tw-text-white tw-w-12 tw-h-12 tw-flex tw-justify-center tw-items-center tw-rounded-full tw-hover:tw-bg-opacity-75"
        >
          <FaArrowLeft />
        </button>
      )}
      {/* 오른쪽 버튼 */}
      {currentIndex < totalSlides - 1 && (
        <button
          onClick={handleNext}
          className="tw-absolute tw-right-[12px] tw-top-1/2 tw-transform tw-translate-y-1/2 tw-bg-black tw-bg-opacity-50 tw-text-white tw-w-12 tw-h-12 tw-flex tw-justify-center tw-items-center tw-rounded-full tw-hover:tw-bg-opacity-75"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}
