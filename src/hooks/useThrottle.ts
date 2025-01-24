"use client";

import { useCallback, useRef } from "react";

/**
 * 일정 시간(limit) 동안 함수 호출을 한 번으로 제한하여 과도한 실행을 방지하는 커스텀 훅
 * @param func 실행할 콜백 함수
 * @param limit 실행 제한 시간 (ms)
 * @returns 쓰로틀링이 적용된 함수
 */
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);
  const timeoutId = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        // 이전 대기중인 타임아웃이 있다면 취소
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        // 남은 시간만큼 지연 후 실행
        timeoutId.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - (now - lastRun.current));
      }
    },
    [callback, delay]
  ) as T;
}

export default useThrottle;
