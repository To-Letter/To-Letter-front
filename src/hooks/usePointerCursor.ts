"use client";

import { useThree } from "@react-three/fiber";
import axiosInterceptor from "@/lib/api/axiosInterceptor";

/**
 * 마우스 커서 스타일을 제어하는 커스텀 훅
 * @returns {Object} handlePointerOver, handlePointerOut 함수를 포함한 객체
 */
const usePointerCursor = () => {
  const { gl } = useThree();
  const handlePointerOver = () => {
    gl.domElement.style.cursor =
      axiosInterceptor.defaults.headers.common["Authorization"] !== undefined
        ? "pointer"
        : "auto";
    gl.domElement.style.cursor = "auto";
  };
  const handlePointerOut = () => {
    gl.domElement.style.cursor = "auto";
  };
  return { handlePointerOver, handlePointerOut };
};

export default usePointerCursor;
