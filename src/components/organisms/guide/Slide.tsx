"use client";
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { guideValue } from "@/lib/constants/guideValue";
import SlideCard from "@/components/molecules/SlideCard"; // Server Component
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useThrottle from "@/hooks/useThrottle";

export default function Slide() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = guideValue.length;

  // useCallback을 사용하여 핸들러 함수 메모이제이션
  const handleArrowButton = useThrottle((route: "right" | "left") => {
    if (sliderRef.current) {
      if (route === "left") {
        sliderRef.current.scrollBy({ left: -1080, behavior: "smooth" });
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else {
        sliderRef.current.scrollBy({ left: 1080, behavior: "smooth" });
        setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
      }
    }
  }, 600);

  // 스크롤 이벤트 핸들러를 useCallback으로 메모이제이션
  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / 1080);
      setCurrentIndex(newIndex);
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // 슬라이드 아이템을 useMemo로 메모이제이션
  const slideItems = useMemo(
    () =>
      guideValue.map((item, index) => (
        <div
          key={index}
          className="tw-flex-shrink-0 tw-w-full tw-h-full tw-overflow-hidden"
        >
          <SlideCard
            imgSrc={item.imgSrc}
            imgAlt={item.imgAlt}
            guideHeader={item.guideHeader}
            guideSubtitle={item.guideSubtitle}
            guideContents={item.guideContents}
          />
        </div>
      )),
    []
  );

  return (
    <div className="tw-w-screen tw-h-screen tw-bg-[#7b5d54] tw-flex tw-justify-center tw-items-center">
      <div className="tw-relative tw-w-[1080px] tw-h-[600px] tw-shadow-lg tw-overflow-hidden">
        <div
          ref={sliderRef}
          className="tw-flex tw-w-full tw-h-full tw-overflow-x-scroll tw-scroll-smooth tw-no-scrollbar"
        >
          {slideItems}
        </div>
      </div>
      {/* 왼쪽 버튼 */}
      {currentIndex > 0 && (
        <button
          onClick={() => handleArrowButton("left")}
          className="tw-absolute tw-left-[12px] tw-top-1/2 tw-transform tw-translate-y-1/2 tw-bg-black tw-bg-opacity-50 tw-text-white tw-w-12 tw-h-12 tw-flex tw-border-none tw-justify-center tw-items-center tw-rounded-full hover:tw-bg-opacity-75"
        >
          <FaArrowLeft />
        </button>
      )}
      {/* 오른쪽 버튼 */}
      {currentIndex < totalSlides - 1 && (
        <button
          onClick={() => handleArrowButton("right")}
          className="tw-absolute tw-right-[12px] tw-top-1/2 tw-transform tw-translate-y-1/2 tw-bg-black tw-bg-opacity-50 tw-text-white tw-w-12 tw-h-12 tw-flex tw-border-none tw-justify-center tw-items-center tw-rounded-full hover:tw-bg-opacity-75"
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}
