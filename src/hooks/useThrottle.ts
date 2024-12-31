/**
 * 일정 시간(limit) 동안 함수 호출을 한 번으로 제한하여 과도한 실행을 방지하는 커스텀 훅
 * @param func 실행할 콜백 함수
 * @param limit 실행 제한 시간 (ms)
 * @returns 쓰로틀링이 적용된 함수
 */
const useThrottle = <T extends any[]>(
  func: (...args: T) => void,
  limit: number
) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (...args: T) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default useThrottle;
