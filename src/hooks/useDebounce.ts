import { useState, useEffect } from "react";

/**
 * 연속된 호출에서 마지막 호출 이후 일정 시간(delay)이 지난 후에만 값을 업데이트하는 커스텀 훅
 * @param value 디바운스 처리할 값
 * @param delay 디바운스 지연시간 (ms)
 * @returns 디바운스된 값
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
