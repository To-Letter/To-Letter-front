// useThrottle.ts
const useThrottle = <T extends any[]>(
  func: (...args: T) => void,
  limit: number
) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (...args: T) {
    if (!lastRan) {
      func(...args); // .apply() 대신 스프레드 연산자 사용
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args); // .apply() 대신 스프레드 연산자 사용
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default useThrottle;
